using Budget.Models.IdentityAuth; 
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace D4SApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration; 


        public AuthenticateController(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
             )
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
             
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            { 
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
             

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                if (!user.EmailConfirmed)
                { 
                    return BadRequest("User not accepted");
                }

                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim("Username", user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id)
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim("Role", userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));

                var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("changePassword")]
        [Authorize]

        //public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = await GetLoggedUser();

        //        if (user != null)
        //        {
        //            await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        //            return Ok();
        //        }
        //        else
        //        {
        //            return BadRequest("User does not exist");
        //        }
        //    }
        //    else
        //    {
        //        var errors = ModelState.Select(x => x.Value.Errors)
        //                       .Where(y => y.Count > 0)
        //                       .ToList();
        //        return UnprocessableEntity(errors);
        //    }
        //}

        [HttpPost]
        [Route("checkPassword/{password}")]
        [Authorize]
        public async Task<IActionResult> CheckPassword(string password)
        {
            if (ModelState.IsValid)
            {
                var user = await GetLoggedUser();
                if (user != null)
                {
                    return Ok(await userManager.CheckPasswordAsync(user, password));
                }
                else
                {
                    return BadRequest("User does not exist");
                }
            }
            else
            {
                var errors = ModelState.Select(x => x.Value.Errors)
                               .Where(y => y.Count > 0)
                               .ToList();
                return UnprocessableEntity(errors);
            }
        } 

        private async Task<ApplicationUser> GetLoggedUser()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await userManager.FindByIdAsync(userId);
        }
    }
}
