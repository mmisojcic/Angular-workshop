using Budget.DBAccess.Data;
using Budget.DBAccess.Interfaces;
using Budget.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context = null;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Add(Category category)
        {
            await _context.Category.AddAsync(category);
        }

        public async Task<Category> Get(int id)
        {
            return await _context.Category.FindAsync(id);
        }

        public async Task<List<Category>> GetAll(string userId)
        {
            return await _context.Category.Where(c => c.User.Id == userId).ToListAsync();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(Category category)
        {
            _context.Category.Update(category);
        }

        public void Delete(List<int> ids)
        {
            _context.Category.RemoveRange(_context.Category.Where(c => ids.Contains(c.Id)));
        }

        public async Task<bool> CategoriesExists(List<int> ids)
        {
            return await _context.Category.AnyAsync(c => ids.Contains(c.Id));
        }
    }
}
