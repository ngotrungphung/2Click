using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataPlayer.Repository;
using DataPlayer.Entity;
using Newtonsoft.Json;
using WorkShopKnockoutJs.Models;
using Category = WorkShopKnockoutJs.Models.Category;

namespace WorkShopKnockoutJs.Controllers.Categories
{
    public class CategoriesController : Controller
    {
        private CategoriesRepository _categoriesRepo;

        public CategoriesController()
        {
            _categoriesRepo = new CategoriesRepository();
        }
        // GET: Categories
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetAllCategories()
        {
            var lstCategories = _categoriesRepo.GetData().ToList();

            var listCategoryModels = new List<Category>();
            foreach (var cate in lstCategories)
            {
                var newCategory = new Category()
                {
                    CategoryId = cate.CategoryId.ToString(),
                    CategoryName = cate.CategoryName,
                    CategoryDescription = cate.Description,
                    //CategoryPicture = $"data:image/png;base64,{Convert.ToBase64String(cate.Picture)}"
                };
                listCategoryModels.Add(newCategory);
            }

            return lstCategories.Count > 0 
                ? Json(new { success = true, message = "ok", data = listCategoryModels }, JsonRequestBehavior.AllowGet) 
                : Json(new { success = false, message = "nok" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Create(DataPlayer.Entity.Categories category)
        {
            if (ModelState.IsValid)
            {
                var newCategoryId = _categoriesRepo.Add(category);


                var newAddedCategory = new Category()
                {
                    CategoryId = newCategoryId.ToString(),
                    CategoryName = category.CategoryName,
                    CategoryDescription = category.Description,
                    //CategoryPicture = $"data:image/png;base64,{Convert.ToBase64String(cate.Picture)}"
                };
                return newCategoryId > 0
                    ? Json(new { success = true, message = "ok", data = newAddedCategory }, JsonRequestBehavior.AllowGet)
                    : Json(new { success = false, message = "nok" }, JsonRequestBehavior.AllowGet);
            }

            //return View(category);
            return null;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Edit(DataPlayer.Entity.Categories category)
        {
            if (ModelState.IsValid)
            {
                var result = _categoriesRepo.Update(category);

                return result
                    ? Json(new { success = true, message = "ok" }, JsonRequestBehavior.AllowGet)
                    : Json(new { success = false, message = "nok" }, JsonRequestBehavior.AllowGet);
            }

            return null;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Delete(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var category = _categoriesRepo.Find(id);
                    _categoriesRepo.Remove(category.CategoryId);

                    return Json(new {success = true, message = "ok", data = id}, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    return Json(new { success = false, message = "nok" }, JsonRequestBehavior.AllowGet);
                }
            }

            return null;
        }
    }
}