using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalApiFinal.Models
{
    public class GetFile
    {
        public int PatientId { get; set;}
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Mobile { get; set; }
        public string Emailid { get; set; }
        public string Adate { get; set; }
        public string Atime { get; set; }
        public string Adesc { get; set; }
        public int Did { get; set; }
        public string Dname { get; set; }
        public int Aid { get; set; }
        public int Fid { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Bp { get; set; }
        public string Heartrate { get; set; }
        public string Medicinepres { get; set; }
        public string Bill { get; set; }
    }
}
