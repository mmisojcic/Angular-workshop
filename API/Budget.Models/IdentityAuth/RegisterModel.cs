using System.ComponentModel.DataAnnotations;

namespace Budget.Models.IdentityAuth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; } 
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } 
    }
}
