using Budget.DBAccess.Interfaces;
using Budget.Models.DTO;
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc; 

namespace BudgetApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : Controller 
    { 
        private readonly ISettingsService _settingsService;

        public SettingsController( ISettingsService service)
        { 
            
            _settingsService = service;
        }


        [HttpGet("Get")]
        [Authorize]
        public async Task<IActionResult> GetAsync()
        {   
            return Ok(await _settingsService.Get());
        }
         

        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Update( [FromBody] SettingsDTO settingsDTO)
        {
            return Ok(await _settingsService.Update(settingsDTO));
        }
    }
}
