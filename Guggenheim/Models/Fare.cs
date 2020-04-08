using System;
namespace Guggenheim.Models
{
    public class Fare
    {
        public double StartFare { get; set; }
        public int Minutes { get; set; }
        public int Miles { get; set; }
        public string Date { get; set; }
        public string Total { get; set; }
        public Fare()
        {
        }
    }
}
