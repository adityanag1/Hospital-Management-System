using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalApiFinal.Interface
{
    public interface IEmailSender
    {
        void SendEmailAsync(string Emailid, string Name, string adate,string adesc,string atime,string dname);
    }
}
