using Budget.DBAccess.Interfaces;
using Budget.Models.IdentityAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity; 

namespace Budget.DBAccess.Services
{
    public class UserHelperService : IUserHelperService
    {

        public readonly IHttpContextAccessor _httpContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserHelperService(IHttpContextAccessor httpContext, UserManager<ApplicationUser> userManager)
        {
            _httpContext = httpContext;
            _userManager = userManager;
        }

        public async Task<ApplicationUser> GetUser( )
        {
            return await _userManager.GetUserAsync(_httpContext.HttpContext.User);
        }

        public string GetUserId()
        {
            return _userManager.GetUserId(_httpContext.HttpContext.User);
        }
    }
}
