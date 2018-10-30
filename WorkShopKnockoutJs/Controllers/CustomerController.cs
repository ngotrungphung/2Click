using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataPlayer.Repository;
using DataPlayer.Entity;

namespace KnockoutSamples.Controllers
{
    public class CustomerController : Controller
    {
        private CustomerRepository db = new CustomerRepository();

        //
        // GET: /customer s/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetIndex()
        {
            return Json(db.GetData(), JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /customer s/Details/5
        public ActionResult Details(Int32 id)
        {
            Customers customer  = db.Find(id);
            if (customer  == null)
            {
                return HttpNotFound();
            }
            return View(customer );
        }

        //
        // GET: /customer s/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /customer s/Create
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create(Customers customer )
        {
            if (ModelState.IsValid)
            {
                db.Add(customer);                
                return Json(customer.Id);
            }

            return View(customer );
        }

        //
        // GET: /customer s/Edit/5
        public ActionResult Edit(Int32 id)
        {
            Customers customer  = db.Find(id);
            if (customer  == null)
            {
                return HttpNotFound();
            }
            return View(customer );
        }

        //
        // POST: /customer s/Edit/5
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Edit(Customers customer )
        {
            if (ModelState.IsValid)
            {
                db.Update(customer);
                return Json(customer.Id);
            }
            return View(customer.Id);
        }

        //
        // GET: /customer s/Delete/5
        public ActionResult Delete(object id)
        {
            Customers customer  = db.Find(id);
            if (customer  == null)
            {
                return HttpNotFound();
            }
            return View(customer );
        }

        //
        // POST: /customer s/Delete/5
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            Customers customer  = db.Find(id);
            db.Remove(customer.Id);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
