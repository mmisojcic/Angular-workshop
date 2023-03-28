using Budget.DBAccess.Data;
using Budget.DBAccess.Interfaces;
using Budget.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Repositories
{
    public class TransactionRepository:ITransactionRepository
    {
        private ApplicationDbContext _context = null;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        } 

        public async Task Add(Transaction transaction)
        {
            await _context.Transaction.AddAsync(transaction);
        }

        public async Task<Transaction> Get(int id)
        {
            return await _context.Transaction.FindAsync(id);
        }

        public async Task<List<Transaction>> GetAll(string userId)
        {
            return await _context.Transaction.Where(c => c.User.Id == userId).ToListAsync();
        } 

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(Transaction transaction)
        {
            _context.Transaction.Update(transaction);
        }

        public void Delete(List<int> ids)
        {
            _context.Transaction.RemoveRange(_context.Transaction.Where(t => ids.Contains(t.Id)));
        }

        public async Task<bool> TransactionsExists(List<int> ids)
        {
            return await _context.Transaction.AnyAsync(t => ids.Contains(t.Id));
        }
    }
}
