using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalApiFinal.Interface;
using HospitalApiFinal.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using System.IO;
using System.Net;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using MailKit.Net.Smtp;

namespace HospitalApiFinal.Services
{
    public class EmailSenderService : IEmailSender
    {
        private readonly SmtpSettings _smtpSettings;
        public EmailSenderService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async void SendEmailAsync(string Emailid, string Name, string adate, string adesc, string atime,string dname)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_smtpSettings.SenderEmail));
            message.To.Add(new MailboxAddress(Emailid));
            message.Subject = "LTI Hospital";

            message.Body = new TextPart("html")
            {
                Text = "Hello <b>"+Name+"</b><br>You have successfully booked your appointment.<br>Details are below.<br>Name:"+Name+"<br>Emailid:"+Emailid+"<br>DrName:"+dname+"<br>Date:"+adate+"<br>Time:"+atime+"<br>Description:"+adesc+""
            };
           

            var client = new SmtpClient();

            await client.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, true);
            await client.AuthenticateAsync(new NetworkCredential(_smtpSettings.SenderEmail, _smtpSettings.Password));
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
