using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DataPlayer.Entity;
using DataPlayer.Repository;
using Newtonsoft.Json;

namespace WebApplication1.Controllers
{
    public class EmployeeController : Controller
    {
  
        private EmployeeRepository _db = new EmployeeRepository();
        // GET: Employee
        public ActionResult Index()
        {            
            return View();
        }

        [AllowAnonymous]
        public ActionResult HelloError()
        {
            return View("~/Views/Shared/_LoginPartial.cshtml");
        } 

        [AllowAnonymous]
        public ActionResult Register()
        {
            _db.SetRegister();
            return View("~/Views/Shared/_Register.cshtml");
        }
        [AllowAnonymous]
        public ActionResult LoginByWindow()
        {
            if(_db.IsAccountDomain())
            {      
                _db.IsAuthenticated();          
            }
            return RedirectToAction("Index","Home");
        }

        [HttpPost]
        public ActionResult Login()
        {  
           
            return RedirectToAction("Index", "Home");
        }

        public JsonResult ListEmployees()
        {
            var list = from obj in _db.GetData() select new { EmployeeID = obj.EmployeeID, FirstName = obj.FirstName, LastName = obj.LastName,
                Address = obj.Address,EditUrl= (Url.Action("Edit", "Employee",new { id = obj.EmployeeID })), DeleteUrl = Url.Action("Delete", "Employee", new { id = obj.EmployeeID }) };
            
            //return Json(_db.Employees.ToList(), JsonRequestBehavior.AllowGet);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            return View();
        }

        // POST: Employee/CreateEmployee
        [HttpPost]
        public string CreateEmployee(Employees employee)
        {
            //if (!ModelState.IsValid) return "Model is invalid";
            employee.Password=_db.EncodePassword(employee.Password);
            _db.Add(employee);  
            return "Employee is created";
        }

        [HttpPost] 
        public ActionResult Register(Employees employee)
        {
            //if (!ModelState.IsValid) return "Model is invalid";
            string password= employee.Password;
            employee.Password = _db.EncodePassword(password);
            _db.Add(employee);
            _db.IsAuthenticated(employee.UserName,password);
            return RedirectToAction("Index", "Home");
        }

        // GET: Employee/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var employee = _db.Find(id);
            if (employee == null)
                return HttpNotFound();
   
            ViewBag.SelectedEmployee = JsonConvert.SerializeObject(employee);
            return View();
        }

        // POST: Employee/Update/5
        [HttpPost]
        public string Update(Employees employee)
        {
            //if (!ModelState.IsValid) return "Invalid model";
            employee.Password = _db.EncodePassword(employee.Password);
            _db.Update(employee);
            return "Updated successfully";
        }

        // GET: Home/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var employee = _db.Find(id);
            if (employee == null)
                return HttpNotFound();                   
            ViewBag.SelectedEmployee = JsonConvert.SerializeObject(employee);
            return View();
        }

        // POST: Home/Delete/5
        [HttpPost, ActionName("Delete")]
        public string Delete(Employees employee)
        {
            if (employee == null) return "Invalid data";
            var getEmployee = _db.Find(employee.EmployeeID);
            _db.Remove(getEmployee); 
            return "Deleted successfully";
        }

        public ActionResult LogOut()
        {
            _db.Logout();
            return RedirectToAction("HelloError"); 
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}