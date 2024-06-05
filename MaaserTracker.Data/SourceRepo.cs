using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class SourceRepo
    {
        private readonly string _connectionString;
        public SourceRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Source> GetSources()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Sources.ToList();
        }

        public void AddSource(Source source)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Sources.Add(source);
            context.SaveChanges();
        }

        public void UpdateSource(Source source)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Update(source);
            context.SaveChanges();
        }

        public void DeleteSource(Source source)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Incomes WHERE SourceId = {source.Id}");
            context.Sources.Remove(source);
            context.SaveChanges();
        }
    }
}
