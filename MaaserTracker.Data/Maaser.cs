using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public string Date { get; set; }
        public decimal Amount { get; set; }
    }
}
