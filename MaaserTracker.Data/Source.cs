﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class Source
    {
        public int Id { get; set; }
        public string Title { get; set; }
        
        public List<Income> Incomes { get; set; }
    }
}
