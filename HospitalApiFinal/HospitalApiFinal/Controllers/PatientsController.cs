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
    public class PatientsController : ControllerBase
    {
        private readonly mydbContext _context;

        public PatientsController(mydbContext context)
        {
            _context = context;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }
            return patient;
        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest();
            }
            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatient", new { id = patient.PatientId }, patient);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }
            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.PatientId == id);
        }

        [Route("/GetPatientsById")]
        [HttpGet]
        public async Task<ActionResult<Patient>> GetUsers(int id)
        {
            var users = await _context.Patients.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [Route("/GetPatientsByEmail")]
        [HttpGet]
        public Patient GetPatientsByEmail(string email)
        {
            Patient log = _context.Patients.Where(x => x.Emailid.Equals(email)).FirstOrDefault();
            return log;
        }

        [Route("/patientLogin")]
        [HttpPost]

        public Response Login(Patient login)

        {

            var log = _context.Patients.Where(x => x.Emailid.Equals(login.Emailid) && x.Password.Equals(login.Password)).FirstOrDefault();
            if (log == null)

            {
                return new Response { Status = "Invalid", Message = "Invalid User.", patientId = login.PatientId };
            }
            else
            {
                return new Response { Status = "Success", Message = "Login Successfully", patientId = login.PatientId };
            }
        }
    }
}
