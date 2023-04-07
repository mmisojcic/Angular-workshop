using Budget.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Interfaces
{
    public interface ITransactionService
    {
        public Task<List<Transaction>> GetAll();

        public Task<List<Transaction>> GetAllInDateRange(int day);

        public Task<Transaction> Get(int id);

        public Task<Transaction> Add(Transaction transactionDTO);

        public Task Update(Transaction transactionDTO);
        public Task<bool> Delete(List<int> ids);
    }
}
