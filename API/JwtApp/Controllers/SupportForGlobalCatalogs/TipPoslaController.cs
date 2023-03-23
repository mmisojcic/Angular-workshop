using Budget.DBAccess.Interfaces.SupportForGlobalCatalogs; 
using Budget.Models.Entities;
using Budget.Models.IdentityAuth;
using BudgetApi.Controllers.SupportForGlobalCatalogs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;  

namespace BudgetApi.Controllers.SupportForGlobalCatalogs
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipPoslaController : SupportForGlobalCatalogsController<TipPosla>
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ISupportForGlobalCatalogsServices<TipPosla> _service;
        public TipPoslaController(UserManager<ApplicationUser> userManager, ISupportForGlobalCatalogsServices<TipPosla> service) 
            : base(userManager, service)
        {

        }
    }
}
