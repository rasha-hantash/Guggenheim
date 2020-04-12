using Guggenheim.Models;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;

namespace Guggenheim.Tests.Controllers
{
    [TestFixture]
    public class Test
    {
        [Test]
        //Tests Weekday Surcharge
        //Tests Miles Less than 6mph
        //Tests Minutes at 0 or More Than 6mph 
        //No Late Night Surcharge
        public void TestPrimeExample()
        {
            string ExpectedTotal = "$9.75";
            string ExpectedDate = "10/8/2010 5:30:00 PM";
            Fare fare = new Fare();
            fare.StartFare = 3; // .5 NYC Surcharge
            fare.Miles = 2; //miles less than 6mph
            fare.Minutes = 5; //miles above 6pmh or 0
            fare.Date = "2010-10-08T17:30:00.000Z"; // +1.00
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            // convert out JsonResult into an IDictionary in order to easily access
            // json data
            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }


        [Test]
        //Tests Late Night Surcharge
        //Tests Miles Less than 6mph
        //Tests Minutes at 0 or More Than 6mph 
        //No Weekday Surcharge
        public void TestLateNightCharge()
        {
            string ExpectedTotal = "$9.25";
            string ExpectedDate = "10/8/2010 10:30:00 PM";
            Fare fare = new Fare();
            fare.StartFare = 3; // .5 NYC Surcharge
            fare.Miles = 2; //miles less than 6mph
            fare.Minutes = 5; //miles above 6pmh or 0
            fare.Date = "2010-10-08T22:30:00.000Z"; // +.50
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            // convert out JsonResult into an IDictionary in order to easily access
            // json data
            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }


        [Test]
        //Tests Miles Less than 6mph
        //Tests Minutes at 0 or More Than 6mph
        //No Weekday Surcharge
        //No Late Night Surcharge Edge Case
        public void TestNoNightChargeEdgeCase()
        {
            string ExpectedTotal = "$8.75";
            string ExpectedDate = "4/4/2020 6:01:00 AM";
            Fare fare = new Fare();
            fare.StartFare = 3; // + .5
            fare.Miles = 2; //miles less than 6mph // 3.5
            fare.Minutes = 5; //miles above 6pmh or 1.75
            fare.Date = "2020-04-04T06:01:00.000Z"; //Edge case: 6:01 AM
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }


        [Test]
        //Tests Miles Less than 6mph
        //Tests Minutes at 0 or More Than 6mph
        //No Late Night Surcharge
        //No Weekday Surcharge During Weekday Surcharge Hours (Weekend)
        public void TestNoWeekdayChargeOnWeekend()
        {
            string ExpectedTotal = "$8.75";
            string ExpectedDate = "4/4/2020 11:31:00 AM";
            Fare fare = new Fare();
            fare.StartFare = 3; // 3.5
            fare.Miles = 2; //miles less than 6mph 3.50
            fare.Minutes = 5; //miles above 6mph or 1.75
            fare.Date = "2020-04-04T11:31:00.000Z";//5:31 PM + 1 
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }


        [Test]
        //Tests Miles Less than 6mph
        //No Minutes at 0 or More Than 6mph
        //No Weekday Surcharge
        //No Late Night Surcharge
        public void TestNoWeekdayNightMinutesCharge()
        {
            string ExpectedTotal = "$7.00";
            string ExpectedDate = "4/4/2020 11:30:00 AM";
            Fare fare = new Fare();
            fare.StartFare = 3; // + .5
            fare.Miles = 2; //miles less than 6mph + 3.5
            fare.Minutes = 0; //miles above 6pmh or 0
            fare.Date = "2020-04-04T11:30:00.000Z";
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }


        [Test]
        //Tests Minutes at 0 or More Than 6mph
        //No Miles Less than 6mph
        //No Weekday Surcharge
        //No Late Night Surcharge
        public void TestNoWeekdayNightMilesCharge()
        {
            string ExpectedTotal = "$5.25";
            string ExpectedDate = "4/4/2020 11:30:00 AM";
            Fare fare = new Fare();
            fare.StartFare = 3; // + .5
            fare.Miles = 0; //miles less than 6mph
            fare.Minutes = 5; //miles above 6pmh or 1.75
            fare.Date = "2020-04-04T11:30:00.000Z"; 
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            
            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }

        [Test]
        //No Minutes at 0 or More Than 6mph
        //No Miles Less than 6mph
        //No Weekday Surcharge
        //No Late Night Surcharge
        public void TestNoWeekdayNightMilesMinutesCharge()
        {
            string ExpectedTotal = "$3.50";
            string ExpectedDate = "4/4/2020 11:30:00 AM";
            Fare fare = new Fare();
            fare.StartFare = 3;
            fare.Miles = 0; //miles less than 6mph
            fare.Minutes = 0; //miles above 6pmh or 0
            fare.Date = "2020-04-04T11:30:00.000Z";
            fare.Total = "";

            var controller = new Guggenheim.Controllers.TaxiFareController();
            JsonResult result = controller.SubmitFare(fare) as JsonResult;

            IDictionary<string, object> data = new RouteValueDictionary(result.Data);
            Assert.AreEqual(ExpectedTotal, data["Total"]);
            Assert.AreEqual(ExpectedDate, data["Date"]);
        }
    }
}
