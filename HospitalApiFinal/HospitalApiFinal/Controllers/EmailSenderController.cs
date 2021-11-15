using HospitalApiFinal.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalApiFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSenderController : ControllerBase
    {
        IEmailSender _emailSender;
        public EmailSenderController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }
        [HttpPost, Route("SendEmail")]
        public void SendEmailAsync(string Emailid, string Name, string adate, string adesc, string atime, string dname)
        {
            try
            {
                _emailSender.SendEmailAsync(Emailid, Name,adate,adesc,atime,dname);
            }

            catch (Exception ex)
            {
                BadRequest(ex?.InnerException?.InnerException?.Message ?? ex?.InnerException?.Message ?? ex?.Message);
            }
        }
    }
}
