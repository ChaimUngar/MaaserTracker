using MaaserTracker.Data;
using MaaserTracker.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourceController : ControllerBase
    {
        private readonly string _connectionString;
        public SourceController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getallsources")]
        public List<SourceVM> GetSources()
        {
            var repo = new SourceRepo(_connectionString);
            return repo.GetSources().Select(s => new SourceVM { Id = s.Id, Title = s.Title }).ToList();
        }

        [HttpPost("add")]
        public void AddSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.AddSource(source);
        }

        [HttpPost("updatesource")]
        public void EditSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.UpdateSource(source);
        }

        [HttpPost("deletesource")]
        public void DeleteSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.DeleteSource(source);
        }

       
    }
}
