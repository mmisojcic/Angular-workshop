using Budget.DBAccess.Interfaces;
using Budget.Models.Entities;
using Budget.Models.IdentityAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    { 
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        { 
            _categoryService = categoryService;
        }

        [HttpPost]
        [Authorize]
        [Route("Add")]
        public async Task<IActionResult> AddAsync([FromBody] Category categoryDTO)
        {
            return Ok(await _categoryService.Add(categoryDTO));
        }

        [HttpGet("Get/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAsync(int id)
        {
            return Ok(await _categoryService.Get(id));
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await _categoryService.GetAll());
        }

        [HttpPut]
        [Authorize]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Category category)
        {
            await _categoryService.Update(category);
            return Ok();
        }

        [HttpDelete]
        [Authorize]
        [Route("Delete")]
        public async Task<IActionResult> DeleteAsync([FromBody] List<int> ids)
        {
            await _categoryService.Delete(ids);
            return Ok();
        }
    }
}
