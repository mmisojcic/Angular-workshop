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
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; } 
        public int CategoryId { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Note { get; set; } 
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}
