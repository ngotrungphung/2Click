using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using DataPlayer.Base;

namespace DataPlayer.Entity
{
    public class Categories
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public Byte[] Picture { get; set; }
    }
}
