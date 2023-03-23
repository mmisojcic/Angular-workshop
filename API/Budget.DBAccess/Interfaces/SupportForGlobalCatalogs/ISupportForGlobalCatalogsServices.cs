using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Interfaces.SupportForGlobalCatalogs
{
    public interface ISupportForGlobalCatalogsServices<T> where T : class
    {
        public Task<List<T>> GetAll();

        public Task<T> Get(int itemID);

        public Task<List<T>> Add(List<T> items);

        public Task<List<T>> Update(List<T> items);

        public Task<List<T>> Delete(List<T> items);
    }
}
