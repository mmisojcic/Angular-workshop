using AutoMapper;
using Budget.DBAccess.Interfaces;
using Budget.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository; 
        private readonly IUserHelperService _userService;

        public TransactionService(ITransactionRepository repository, IUserHelperService userService)
        {
            _repository = repository; 
            _userService = userService;
        }

        public async Task<Transaction> Add(Transaction transactionDTO)
        {
            var transaction = new Transaction(); 
            transaction.Type = transactionDTO.Type;
            transaction.Amount = transactionDTO.Amount;
            transaction.CategoryId = transactionDTO.CategoryId;
            transaction.Date = transactionDTO.Date;
            transaction.Note = transactionDTO.Note;
            transaction.User = await _userService.GetUser();
            await _repository.Add(transaction);
            await _repository.Save();
            return transaction;
        }

        public async Task<Transaction> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Transaction>> GetAll()
        {
            return await _repository.GetAll(_userService.GetUserId());
        }

        public async Task Update(Transaction transactionDTO)
        {
            _repository.Update(transactionDTO);
            await _repository.Save();
        }

        public async Task<bool> Delete(List<int> ids)
        {
            if (!await _repository.TransactionsExists(ids))
                return false;

            _repository.Delete(ids);
            await _repository.Save();
            return true;
        }
    }
}
