using DataPlayer.Entity;
using DataPlayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WorkShopKnockoutJs.Controllers
{

    public class HomeController : Controller
    {
        private ProductsRepository productrepo;
        public HomeController()
        {
            productrepo = new ProductsRepository();
        }
        [AllowAnonymous]
        public ActionResult Index()
        {           
          
            //productrepo.Add(new Products()
            //{
            //    ProductID=0,
            //    CategoryID = 1,
            //    SupplierID = 1,
            //    ProductName = "test",
            //    QuantityPerUnit = "111",
            //    UnitPrice = 111
            //});
            return View();
        }
        [AllowAnonymous]
        public JsonResult GetProducts()
        {
            var result = productrepo.GetData();
            return Json(new { success = true, productList = result.ToList() }, JsonRequestBehavior.AllowGet);
        }


        [AllowAnonymous]
        public JsonResult GetProductsById(int productId)
        {
            var obj = productrepo.Find(productId);
            var result = new List<Products>();
            result.Add(obj);        
            return Json(new { success = true, product = obj }, JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        [HttpPost]
        public JsonResult SaveProducts(Products data)
        {          
            if(data.ProductID==0)
                productrepo.Add(data);
            else
                productrepo.Update(data);

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        [HttpPost]
        public JsonResult DeleteProducts(int productId)
        {
           try
            {
                productrepo.Remove(productId);
            }
            catch(Exception ex)
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true}, JsonRequestBehavior.AllowGet);
        }
    }
}
