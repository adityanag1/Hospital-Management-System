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
    public class AppsController : ControllerBase
    {
        private readonly mydbContext _context;

        public AppsController(mydbContext context)
        {
            _context = context;
        }

        // GET: api/Apps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<App>>> GetApps()
        {
            return await _context.Apps.ToListAsync();
        }

        [HttpGet]
        [Route("GetPatientApps")]
        public async Task<ActionResult<IEnumerable<PatientApp>>> GetPatientApps()
        {
            return await _context.Apps.Select(a => new PatientApp
            {
                Name = a.Patient.Name,
                Dname=a.DidNavigation.Dname,
                Did=a.Did.Value,
                PatientId=a.PatientId.Value,
                Aid=a.Aid,
                Adate = a.Adate,
                Adesc = a.Adesc,
                Atime = a.Atime
            }).ToListAsync();
        }

        // GET: api/Apps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<App>> GetApp(int id)
        {
            var app = await _context.Apps.FindAsync(id);

            if (app == null)
            {
                return NotFound();
            }

            return app;
        }

        // PUT: api/Apps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApp(int id, App app)
        {
            if (id != app.Aid)
            {
                return BadRequest();
            }

            _context.Entry(app).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppExists(id))
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

        // POST: api/Apps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<App>> PostApp(App app)
        {
            _context.Apps.Add(app);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AppExists(app.Aid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetApp", new { id = app.Aid }, app);
        }

        [Route("/GetAppById")]
        [HttpGet]
        public async Task<ActionResult<App>> GetSubject(int id)
        {
            var apps = await _context.Apps.FindAsync(id);

            if (apps == null)
            {
                return NotFound();
            }

            return apps;
        }

        // DELETE: api/Apps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApp(int id)
        {
            var app = await _context.Apps.FindAsync(id);
            if (app == null)
            {
                return NotFound();
            }

            _context.Apps.Remove(app);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppExists(int id)
        {
            return _context.Apps.Any(e => e.Aid == id);
        }
    }
}
