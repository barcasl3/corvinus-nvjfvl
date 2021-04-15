using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HajosTeszt.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public IActionResult M1()
        {
            hajostesztContext context = new hajostesztContext();
            var kerdesek = from x in context.Questions select x.QuestionText;

            return new JsonResult(kerdesek);
        }
    }
}
