using Budget.Models.Entities; 

namespace Budget.DBAccess.Interfaces
{
    public interface ISettingsRepository
    {
        public Task<Settings> Get(string userId);
        public Task Add(Settings settings);
        public void Update(Settings settings);
        public Task Save();
    }
}
