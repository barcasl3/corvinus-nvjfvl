using System;
using System.Collections.Generic;

#nullable disable

namespace HajosTeszt.TrainModels
{
    public partial class Train
    {
        public int Id { get; set; }
        public int Trainnumber { get; set; }
        public string StartStation { get; set; }
        public string EndStation { get; set; }
        public string Type { get; set; }
        public string DepTime { get; set; }
        public string ArrTime { get; set; }
    }
}
