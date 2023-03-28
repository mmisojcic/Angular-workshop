using Budget.Models.DTO;
using Budget.Models.Entities;
using Budget.Models.IdentityAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Interfaces
{
    public interface ICategoryService
    {
        public Task<List<Category>> GetAll();

        public Task<Category> Get(int id);

        public Task<Category> Add(Category categoryDTO);

        public Task Update(Category categoryDTO);
        public Task<bool> Delete(List<int> ids);
    }
}
