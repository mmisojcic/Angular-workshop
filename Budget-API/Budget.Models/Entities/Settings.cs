using Budget.Models.IdentityAuth;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Budget.Models.Entities
{
    public class Settings
    {
        [Key]
        public int Id { get; set; } 
        public double BudgetAmount { get; set; } 
        public int Day { get; set; } 
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}
