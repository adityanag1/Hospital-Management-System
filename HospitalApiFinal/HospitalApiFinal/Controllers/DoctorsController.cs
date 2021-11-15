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
    public class DoctorsController : ControllerBase
    {
        private readonly mydbContext _context;

        public DoctorsController(mydbContext context)
        {
            _context = context;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);

            if (doctor == null)
            {
                return NotFound();
            }

            return doctor;
        }

        // PUT: api/Doctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, Doctor doctor)
        {
            if (id != doctor.Did)
            {
                return BadRequest();
            }

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Doctors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoctor", new { id = doctor.Did }, doctor);
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorExists(int id)
        {
            return _context.Doctors.Any(e => e.Did == id);
        }

        [Route("/GetDoctorsById")]
        [HttpGet]
        public async Task<ActionResult<Doctor>> GetUsers(int id)
        {
            var users = await _context.Doctors.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [Route("/GetDoctorsByEmail")]
        [HttpGet]
        public Doctor GetDoctorsByEmail(string email)
        {
            Doctor log = _context.Doctors.Where(x => x.Demaildid.Equals(email)).FirstOrDefault();
            return log;
        }

        [Route("/GetDoctorsByName")]
        [HttpGet]
        public Doctor GetDoctorsByName(string name)
        {
            Doctor log = _context.Doctors.Where(x => x.Demaildid.Equals(name)).FirstOrDefault();
            return log;
        }

        [Route("/drLogin")]
        [HttpPost]
        public Responsedr Login(Doctor login)
        {
            var log = _context.Doctors.Where(x => x.Demaildid.Equals(login.Demaildid) && x.Dpassword.Equals(login.Dpassword)).FirstOrDefault();
            if (log == null)
            {
                return new Responsedr { Status = "Invalid", Message = "Invalid User.", Did = login.Did };
            }
            else
            {
                return new Responsedr { Status = "Success", Message = "Login Successfully", Did = login.Did };
            }
        }
    }
}
