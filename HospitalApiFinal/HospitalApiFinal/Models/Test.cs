using System;
using System.Collections.Generic;

#nullable disable

namespace HospitalApiFinal.Models
{
    public partial class Test
    {
        public int Tid { get; set; }
        public string Tname { get; set; }
        public string Treport { get; set; }
        public int? PatientId { get; set; }
        public int? Did { get; set; }

        public virtual Doctor DidNavigation { get; set; }
        public virtual Patient Patient { get; set; }
    }
}
