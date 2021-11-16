using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalApiFinal.Models;

namespace HospitalApiFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiletsController : ControllerBase
    {
        private readonly mydbContext _context;

        public FiletsController(mydbContext context)
        {
            _context = context;
        }

        // GET: api/Filets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filet>>> GetFilets()
        {
            return await _context.Filets.ToListAsync();
        }


        [HttpGet]
        [Route("GetFiles")]
        public async Task<ActionResult<IEnumerable<GetFile>>> GetFiles()
        {
            return await _context.Filets.Select(a => new GetFile
            {
                Name = a.Patient.Name,
                Age = a.Patient.Age,
                Gender = a.Patient.Gender,
                Mobile = a.Patient.Mobile,
                Emailid = a.Patient.Emailid,
                Dname = a.DidNavigation.Dname,
                Did = a.Did.Value,
                PatientId = a.PatientId.Value,
                Aid = a.AidNavigation.Aid,
                Adate = a.AidNavigation.Adate,
                Adesc = a.AidNavigation.Adesc,
                Atime = a.AidNavigation.Atime,
                Fid = a.Fid,
                Height = a.Height,
                Weight = a.Weight,
                Bp = a.Bp,
                Heartrate = a.Heartrate,
                Medicinepres = a.Medicinepres,
                Bill = a.Bill
            }).ToListAsync();
        }

        // GET: api/Filets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Filet>> GetFilet(int id)
        {
            var filet = await _context.Filets.FindAsync(id);

            if (filet == null)
            {
                return NotFound();
            }

            return filet;
        }

        // POST: api/Filets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Filet>> PostFilet(Filet filet)
        {
            _context.Filets.Add(filet);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FiletExists(filet.Fid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetFilet", new { id = filet.Fid },filet);
        }

        private bool FiletExists(int id)
        {
            return _context.Filets.Any(e => e.Fid == id);
        }
    }
}
