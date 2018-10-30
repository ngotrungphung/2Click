using DataPlayer.Base;
using DataPlayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPlayer.Repository
{
    public class SuppliersRepository : DPGenericRepository<Suppliers>
    {
        public SuppliersRepository()
        {
            this.PrimaryId = "SupplierID";
        }
    }
}
