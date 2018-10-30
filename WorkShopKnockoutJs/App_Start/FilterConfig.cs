using System.Web;
using System.Web.Mvc;
using WorkShopKnockoutJs.Filters;

namespace WorkShopKnockoutJs
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AuthorizationFilter());
        }
    }
}
