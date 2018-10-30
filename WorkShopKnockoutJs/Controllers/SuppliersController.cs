using DataPlayer.Entity;
using DataPlayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WorkShopKnockoutJs.Controllers
{
    public class SuppliersController : Controller
    {
        private SuppliersRepository dataSource = null;

        public SuppliersController()
        {
            this.dataSource = new SuppliersRepository();
        }

        public ActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpGet]
        public JsonResult GetAll()
        {
            try
            {
                var lstSuppliers = dataSource.GetData();
                return Json(new { result = true, data=lstSuppliers }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult CreateSupplier(Suppliers pSuppliers)
        {
            try
            {
                var result = dataSource.Add(pSuppliers);
                return Json(new { result = result > 0 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateSupplier(Suppliers pSuppliers)
        {
            try
            {
                var result = dataSource.Update(pSuppliers);
                return Json(new { result = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpDelete]
        public JsonResult DeleteSupplier(Suppliers pSuppliers)
        {
            try
            {
                dataSource.Remove(pSuppliers.SupplierID);
                return Json(new { result = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { result = false, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}