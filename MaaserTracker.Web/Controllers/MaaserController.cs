using MaaserTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;
        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("add")]
        public void AddMaaser(Maaser payment)
        {
            var repo = new MaaserRepo(_connectionString);
            repo.AddMaaser(payment);
        }

        [HttpGet("getallpayments")]
        public List<Maaser> GetAllMaasers()
        {
            var repo = new MaaserRepo(_connectionString);
            return repo.GetAll();
        }
    }
}
