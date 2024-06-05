using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class MaaserRepo
    {
        private readonly string _connectionString;
        public MaaserRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddMaaser(Maaser payment)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Maaser.Add(payment);
            context.SaveChanges();
        }

        public List<Maaser> GetAll()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Maaser.ToList();
        }
    }
}
