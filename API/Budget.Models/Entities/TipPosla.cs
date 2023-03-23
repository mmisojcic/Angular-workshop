using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.Models.Entities
{
    public class TipPosla
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Naziv { get; set; }
        public string SkraceniNaziv { get; set; }

    }
}
