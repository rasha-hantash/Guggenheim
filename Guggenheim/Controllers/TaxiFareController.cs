using System;
using System.Globalization;
using System.Web.Mvc;
using Guggenheim.Models;

namespace Guggenheim.Controllers
{
    public class TaxiFareController : Controller
    {
        public ActionResult SubmitFare(Fare fare)
        {
            
            //additional New York State surcharge
            fare.StartFare += .5;

            //add fare when car is not in motion or traveling more than 6mph
            fare.StartFare += fare.Minutes * .35;

            //add fare for every one-fifth of a mile traveling less than 6mph
            fare.StartFare += (fare.Miles / .2) * .35;


            //parses the UTC date and stores into the DateTime
            DateTime d = DateTimeOffset.Parse(fare.Date).UtcDateTime;

            //logic for parsing out the hour from DateTime
            fare.Date = d.ToString();
            string[] dateArr = fare.Date.Split(' ');
            string[] timeArr = dateArr[1].Split(':');
            int hour = Int32.Parse(timeArr[0]);



            //TODO: refactor into a method
            //check for a night surcharge at PM
            if (dateArr[2].Equals("PM") && hour >= 8)
            {
                fare.StartFare += .50;
            }

            //check for a night surcharge at AM
            if (dateArr[2].Equals("AM") && hour < 6)
            {
                    fare.StartFare += .5;
            }

            //adjust date format
            DateTime dtResult = DateTime.ParseExact(dateArr[0], "M/d/yyyy", CultureInfo.InvariantCulture);
            string s = dtResult.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
            dtResult = DateTime.ParseExact(s, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            DayOfWeek today = dtResult.DayOfWeek;

            //check for weekday surcharge
            if (today != DayOfWeek.Saturday && today != DayOfWeek.Sunday)
            {
                if (dateArr[2].Equals("PM"))

                {

                    if (hour >=  4  && hour < 8)
                    {
                        fare.StartFare += 1;
                    }
                }

            }

            //convert the fare to a US currency
            fare.Total = fare.StartFare.ToString("C",
                  CultureInfo.CurrentCulture);


            return Json(fare, JsonRequestBehavior.AllowGet);
        }
    }
}
