using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Guggenheim.Models;

namespace Guggenheim.Controllers
{
    public class TaxiFareController : Controller
    {
        public JsonResult SubmitFare(Fare fare)
        {
            return Json(new { message = "Fare Submitted" });
        }
    }
}
