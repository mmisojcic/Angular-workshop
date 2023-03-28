using Budget.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<List<Category>> GetAll(string userId);
        public Task<Category> Get(int id);
        public Task Add(Category category);
        public void Update(Category category);
        public Task Save();
        public void Delete(List<int> ids);
        public Task<bool> CategoriesExists(List<int> items);
    }
}
