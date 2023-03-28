using Budget.Models.IdentityAuth;
using System.Security.Claims;

namespace Budget.DBAccess.Interfaces
{
    public interface IUserHelperService
    { 
        string GetUserId();
        Task<ApplicationUser> GetUser();
    }
}
