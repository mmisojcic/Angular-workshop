using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Budget.Models.IdentityAuth;
using Microsoft.AspNetCore.Identity; 
using Budget.DBAccess.Interfaces.SupportForGlobalCatalogs;

namespace BudgetApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportForGlobalCatalogsController<T> : Controller where T : class
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ISupportForGlobalCatalogsServices<T> _service;

        public SupportForGlobalCatalogsController(UserManager<ApplicationUser> userManager, ISupportForGlobalCatalogsServices<T> _service)
        {
            this.userManager = userManager;
            this._service = _service;
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("Get/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAsync(int id)
        {
            return Ok(await _service.Get(id));
        }

        [HttpPost]
        [Authorize]
        [Route("Add")]
        public async Task<IActionResult> AddAsync([FromBody] List<T> items)
        {
            return Ok(await _service.Add(items));
        }

        [HttpPut]
        [Authorize]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] List<T> items)
        {
            await _service.Update(items);
            return Ok();
        }

        [HttpDelete]
        [Authorize]
        [Route("Delete")]
        public async Task<IActionResult> DeleteAsync([FromBody] List<T> items)
        {
            await _service.Delete(items);
            return Ok();
        }
    }
}
