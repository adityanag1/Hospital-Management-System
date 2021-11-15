using System;
using System.Collections.Generic;

#nullable disable

namespace HospitalApiFinal.Models
{
    public partial class Doctor
    {
        public Doctor()
        {
            Apps = new HashSet<App>();
            Tests = new HashSet<Test>();
        }

        public int Did { get; set; }
        public string Dname { get; set; }
        public string Dspecalization { get; set; }
        public string Dexp { get; set; }
        public string Dage { get; set; }
        public string Dgender { get; set; }
        public string Dmobile { get; set; }
        public string Demaildid { get; set; }
        public string Dcity { get; set; }
        public string Dstate { get; set; }
        public string Dpassword { get; set; }
        public int? PatientId { get; set; }

        public virtual Patient Patient { get; set; }
        public virtual ICollection<App> Apps { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
    }
}
