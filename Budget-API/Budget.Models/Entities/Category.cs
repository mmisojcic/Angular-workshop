using Budget.Models.IdentityAuth; 
using System.ComponentModel.DataAnnotations; 
using System.Text.Json.Serialization; 

namespace Budget.Models.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; } 
        public string Color { get; set; } 
        public string Name { get; set; } 
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}
