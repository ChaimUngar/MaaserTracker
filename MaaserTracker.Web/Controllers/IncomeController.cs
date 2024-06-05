using MaaserTracker.Data;
using MaaserTracker.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;
        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("add")]
        public void AddIncome(Income income)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.AddIncome(income);
        }

        [HttpGet("getall")]
        public List<ViewIncomeVM> GetAll()
        {
            var repo = new IncomeRepo(_connectionString);
            var repo2 = new SourceRepo(_connectionString);

            var sources = repo2.GetSources();
            var incomes = repo.GetAllIncomes();

            return incomes.Select(i => new ViewIncomeVM
            {
                Id = i.Id,
                Amount = i.Amount,
                Date = i.Date,
                Source = sources.FirstOrDefault(s => i.SourceId == s.Id).Title.ToString()
            }).ToList();
        }
    }
}
