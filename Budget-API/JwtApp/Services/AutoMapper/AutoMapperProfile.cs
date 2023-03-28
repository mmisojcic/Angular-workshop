using AutoMapper;
using Budget.Models.DTO;
using Budget.Models.Entities;

namespace BudgetApi.Services.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            //Settings
            CreateMap<Settings, SettingsDTO>();
            CreateMap<SettingsDTO, Settings>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
             
        }
    }
}
