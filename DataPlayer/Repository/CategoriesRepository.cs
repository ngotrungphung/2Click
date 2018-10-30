using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataPlayer.Base;
using DataPlayer.Entity;

namespace DataPlayer.Repository
{
    public class CategoriesRepository : DPGenericRepository<Categories>
    {
        public CategoriesRepository()
        {
            this.PrimaryId = "CategoryId";
        }

    }
}
