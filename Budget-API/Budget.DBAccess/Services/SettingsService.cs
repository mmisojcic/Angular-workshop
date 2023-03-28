using AutoMapper;
using Budget.DBAccess.Interfaces;
using Budget.Models.DTO;
using Budget.Models.Entities;
using Budget.Models.IdentityAuth;

namespace Budget.DBAccess.Services
{
    public class SettingsService : ISettingsService
    {
        
        private readonly ISettingsRepository _repository;
        private readonly IMapper _mapper;
        private readonly IUserHelperService _userService;

        public SettingsService(ISettingsRepository repository, IMapper mapper, IUserHelperService userService)
        {
            _repository = repository; 
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<SettingsDTO>Add(ApplicationUser user)
        {
            var settings = new Settings();
            settings.User = user;
            settings.Day = 28;
            settings.BudgetAmount = 0;
            await _repository.Add(settings);
            await _repository.Save();
            return _mapper.Map<SettingsDTO>(settings);
        }

        public async Task<Settings>  Get()
        {
            return await _repository.Get(_userService.GetUserId()); 
        }

        public async Task<SettingsDTO> Update(SettingsDTO settingsDTO)
        {
            var currentSettings = await Get();
            if(currentSettings != null) 
            {
                currentSettings.Day = settingsDTO.Day;
                currentSettings.BudgetAmount = settingsDTO.BudgetAmount;
                await _repository.Save();
                return _mapper.Map<SettingsDTO>(currentSettings);
            }
            else 
            { 
                return null;
            }
        }
    }
}
