using System;
using System.Collections.Generic;

#nullable disable

namespace HospitalApiFinal.Models
{
    public partial class Filet
    {
        public int Fid { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Bp { get; set; }
        public string Heartrate { get; set; }
        public string Medicinepres { get; set; }
        public string Bill { get; set; }
        public int? Aid { get; set; }
        public int? PatientId { get; set; }
        public int? Did { get; set; }

        public virtual App AidNavigation { get; set; }
        public virtual Doctor DidNavigation { get; set; }
        public virtual Patient Patient { get; set; }
    }
}
