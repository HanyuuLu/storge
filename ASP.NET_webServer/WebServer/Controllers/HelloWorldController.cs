using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace WebServer.Controllers
{
    public class HelloWorldController : Controller
    {
        public string Index()
        {
            return "Hanyuu's demo";
        }
        public string Welcome(String name,int numTime = 1)
        {
            return HtmlEncoder.Default.Encode($"Hello {name}, NumTime is:{numTime}");
            return "This is the welcome action method...";
        }

    }
}