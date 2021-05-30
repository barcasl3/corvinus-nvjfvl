using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HajosTeszt.TrainModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/trains")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        // GET: api/<TrainController>
        [HttpGet]
        public IEnumerable<Train> Get()
        {
            bestdbContext context = new bestdbContext();

            return context.Trains.ToList();
        }

        // GET api/<TrainController>/5
        [HttpGet("{id}")]
        public Train Get(int id)
        {
            bestdbContext context = new bestdbContext();

            var train = (from x in context.Trains where x.Id == id select x).FirstOrDefault();

            return train;
        }

        [HttpGet("count")]
        public int GetCount()
        {
            bestdbContext context = new bestdbContext();

            return context.Trains.Count();
        }

        // POST api/<TrainController>
        [HttpPost]
        public void Post([FromBody] Train newTrain)
        {
            bestdbContext context = new bestdbContext();
            context.Trains.Add(newTrain);
            context.SaveChanges();
        }   

        // PUT api/<TrainController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TrainController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            bestdbContext context = new bestdbContext();

            var deleteTrain = (from x in context.Trains where x.Id == id select x).FirstOrDefault();

            context.Trains.Remove(deleteTrain);
            context.SaveChanges();
        }
    }
}
