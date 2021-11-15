using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalApiFinal.Models
{
    public class PatientApp
    {
        public int PatientId { get; set; }
        public string Name { get; set; }
        public string Adate { get; set; }
        public string Atime { get; set; }
        public string Adesc { get; set; }
        public int Did { get; set; }
        public string Dname { get; set; }
        public int Aid { get; set; }
    }
}
