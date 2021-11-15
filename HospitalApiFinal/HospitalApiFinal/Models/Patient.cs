using System;
using System.Collections.Generic;

#nullable disable

namespace HospitalApiFinal.Models
{
    public partial class Patient
    {
        public Patient()
        {
            Apps = new HashSet<App>();
            Doctors = new HashSet<Doctor>();
            Tests = new HashSet<Test>();
        }

        public int PatientId { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Mobile { get; set; }
        public string Emailid { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Password { get; set; }

        public virtual ICollection<App> Apps { get; set; }
        public virtual ICollection<Doctor> Doctors { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
    }
}
