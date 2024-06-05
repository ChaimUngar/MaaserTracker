using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class IncomeRepo
    {
        private readonly string _connectionString;
        public IncomeRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddIncome(Income income)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Incomes.Add(income);
            context.SaveChanges();
        }

        public List<Income> GetAllIncomes()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Incomes.ToList();
        }
    }
}
