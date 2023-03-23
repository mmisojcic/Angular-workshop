using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Interfaces.SupportForGlobalCatalogs
{
    public interface ISupportForGlobalCatalogsRepository<T> where T : class
    {
        public Task<List<T>> GetAll();
        public Task<T> Get(int itemID);
        public Task Add(List<T> items);
        public void Update(List<T> items);
        public void Delete(List<T> items);
        public Task Save();
        public Task<bool> ItemsExists(List<T> items);

    }
}
