using System;
namespace Guggenheim.Models
{
    public class Fare
    {
        public int StartFare { get; set; }
        public int Minutes { get; set; }
        public int Miles { get; set; }
        public String Date { get; set; }
        public int Total { get; set; }
        public Fare()
        {
        }
    }
}
