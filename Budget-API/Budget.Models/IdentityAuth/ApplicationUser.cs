using Budget.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Budget.Models.IdentityAuth
{
    public class ApplicationUser : IdentityUser
    {
        [JsonIgnore]
        public List<Category> Categories { get; set; }
        [JsonIgnore]
        public List<Transaction> Transactions { get; set; } 
    }

}
