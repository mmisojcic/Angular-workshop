using Budget.DBAccess.Interfaces;
using Budget.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : Controller
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        [Authorize]
        [Route("Add")]
        public async Task<IActionResult> AddAsync([FromBody] Transaction transactionDTO)
        {
            return Ok(await _transactionService.Add(transactionDTO));
        }

        [HttpGet("Get/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAsync(int id)
        {
            return Ok(await _transactionService.Get(id));
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await _transactionService.GetAll());
        }

        [HttpPut]
        [Authorize]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Transaction transaction)
        {
            await _transactionService.Update(transaction);
            return Ok();
        }

        [HttpDelete]
        [Authorize]
        [Route("Delete")]
        public async Task<IActionResult> DeleteAsync([FromBody] List<int> ids)
        {
            await _transactionService.Delete(ids);
            return Ok();
        }
    }
}
