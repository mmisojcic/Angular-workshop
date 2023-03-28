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

        public DbSet<Settings> Settings { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Transaction> Transaction { get; set; }

        private void UserSettingsRelationship(ModelBuilder builder)
        {
            builder.Entity<Settings>(entity =>
            {
                entity.ToTable("Settings");
                entity.HasOne(s => s.User);
            });
        }

        private void TransactionsCategoriesRelationship(ModelBuilder builder)
        {
            builder.Entity<Transaction>(entity =>
            {
                entity.ToTable("Transaction");
                entity.HasOne(t => t.Category);
            });
        }

        private void UserCategoriesRelationship(ModelBuilder builder)
        {
            builder.Entity<Category>()
           .HasOne(c => c.User)
           .WithMany(u => u.Categories);
        }

        private void UserTransactionsRelationship(ModelBuilder builder)
        {
            builder.Entity<Transaction>()
           .HasOne(t =>t.User)
           .WithMany(u => u.Transactions);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            UserTransactionsRelationship(builder);
            UserCategoriesRelationship(builder);
            TransactionsCategoriesRelationship(builder);
            UserSettingsRelationship(builder);

            base.OnModelCreating(builder);
        }

      
 
    }
}
