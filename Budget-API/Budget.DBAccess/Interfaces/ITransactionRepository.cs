using Budget.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Interfaces
{
    public interface ITransactionRepository
    {

        public Task<List<Transaction>> GetAll(string userId);
        public Task<Transaction> Get(int id);
        public Task Add(Transaction transaction);
        public void Update(Transaction transaction);
        public Task Save();
        public void Delete(List<int> ids);
        public Task<bool> TransactionsExists(List<int> items);
    }
}
