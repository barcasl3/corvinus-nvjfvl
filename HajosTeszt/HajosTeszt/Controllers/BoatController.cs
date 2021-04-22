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

        [HttpGet]
        [Route("questions/{id}")]
        public IActionResult M2(int id)
        {
            hajostesztContext context = new hajostesztContext();
            var kerdes = (from x in context.Questions where x.QuestionId == id select x).FirstOrDefault();

            if (kerdes == null)
            {
                return BadRequest("A kérdés nem található.");
            }

            return new JsonResult(kerdes);
        }
    }
}
