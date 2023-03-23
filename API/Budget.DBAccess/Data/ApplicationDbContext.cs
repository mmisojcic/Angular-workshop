using Budget.Models.Entities;
using Budget.Models.IdentityAuth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Budget.DBAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        //Support global catalogs
        public DbSet<TipPosla> TipoviPosla { get; set; }

       

        protected override void OnModelCreating(ModelBuilder builder)
        { 

            base.OnModelCreating(builder);
        }

      
 
    }
}
