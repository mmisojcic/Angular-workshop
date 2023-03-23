using Budget.DBAccess.Data;
using Budget.DBAccess.Interfaces.SupportForGlobalCatalogs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Repositories.SupportForGlobalCatalogs
{
    public class SupportForGlobalCatalogsRepository<T> : ISupportForGlobalCatalogsRepository<T> where T : class
    {
        private ApplicationDbContext _context = null;
        private DbSet<T> table = null;

        public SupportForGlobalCatalogsRepository(ApplicationDbContext context)
        {
            _context = context;
            table = context.Set<T>();
        }

        public async Task<List<T>> GetAll()
        {
            return await table.ToListAsync();
        }

        public async Task<T> Get(int itemID)
        {
            return await table.FindAsync(itemID);
        }

        public async Task Add(List<T> items)
        {
            await table.AddRangeAsync(items);
        }

        public void Update(List<T> items)
        {
            table.UpdateRange(items);
        }

        public void Delete(List<T> items)
        {
            table.RemoveRange(items);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ItemsExists(List<T> items)
        {
            return await table.AnyAsync(i => items.Contains(i));
        }
    }
}
