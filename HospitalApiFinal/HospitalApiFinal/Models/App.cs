using System;
using System.Collections.Generic;

#nullable disable

namespace HospitalApiFinal.Models
{
    public partial class App
    {
        public App()
        {
            Filets = new HashSet<Filet>();
        }

        public int Aid { get; set; }
        public string Adate { get; set; }
        public string Atime { get; set; }
        public string Adesc { get; set; }
        public int? PatientId { get; set; }
        public int? Did { get; set; }

        public virtual Doctor DidNavigation { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual ICollection<Filet> Filets { get; set; }
    }
}
