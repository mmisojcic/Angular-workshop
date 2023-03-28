using Budget.Models.DTO;
using Budget.Models.Entities;
using Budget.Models.IdentityAuth; 

namespace Budget.DBAccess.Interfaces
{
    public  interface ISettingsService
    {  
        public Task<Settings> Get();

        public Task<SettingsDTO> Add(ApplicationUser user);

        public Task<SettingsDTO> Update(SettingsDTO settingsDTO);
         
    }
}
