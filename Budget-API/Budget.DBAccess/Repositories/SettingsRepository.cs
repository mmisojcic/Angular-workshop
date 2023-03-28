using Budget.DBAccess.Data;
using Budget.DBAccess.Interfaces;
using Budget.Models.Entities;
using Microsoft.EntityFrameworkCore; 

namespace Budget.DBAccess.Repositories
{
    public class SettingsRepository : ISettingsRepository
    {
        private ApplicationDbContext _context = null;

        public SettingsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Settings> Get(string userId)
        {
           return await _context.Settings.Where(s=>s.User.Id == userId).FirstOrDefaultAsync();
        }

        async Task ISettingsRepository.Add(Settings  settings)
        {
            await _context.Settings.AddAsync(settings);
        }

       

        void ISettingsRepository.Update(Settings  item)
        {
            throw new NotImplementedException();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

      
    }
}
