using DataPlayer.Base;
using DataPlayer.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace DataPlayer.Repository
{
    public class EmployeeRepository : DPGenericRepository<Employees>
    {
        public EmployeeRepository()
        {
            PrimaryId = "EmployeeID";
        }

        public virtual WindowsIdentity Identity
        {
            get
            {
                return HttpContext.Current.Request.LogonUserIdentity;
            }
        }
        public static Employees HelloUser
        {
            get
            {
                return HttpContext.Current.Session != null ? HttpContext.Current.Session["HelloCurrentUser"] as Employees : null;
            }
            set
            {
                HttpContext.Current.Session["HelloCurrentUser"] = value;
            }
        }

        public bool Login(string username, string password)
        {
            var employee = FindByUserNamePassword(username, EncodePassword(password));
            HttpContext.Current.Session["HelloCurrentUser"] = employee;
            return employee != null;
        }

        public string EncodePassword(string password)
        {
            // Use input string to calculate MD5 hash
            using(System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = UTF8Encoding.ASCII.GetBytes(password);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for(int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }

        public string GetWindowsLogin()
        {
       
            string name = HttpContext.Current.User.Identity.Name;
            if(string.IsNullOrEmpty(name))
            {
                name = Identity.Name;
            }
            if(string.IsNullOrEmpty(name))
            {
                throw new Exception("Can't retrieve Windows Login , make sur your application is in windows authenth mode");
            }
            return name;
        }

        public void SetRegister(bool isAuthenticated = false)
        {
            HttpContext.Current.Session["RegisterUser"] = !isAuthenticated;
        }

        public void Logout()
        {             
            HttpContext.Current.Session["RegisterUser"] = null;
            HttpContext.Current.Session["HelloCurrentUser"] = null;
            HttpContext.Current.Session.RemoveAll();
            HttpContext.Current.Session.Abandon();
        }

        public bool IsAuthenticated(string username = null, string password = null)
        {
            var isWindow = false;
            SetRegister(true);
            if(string.IsNullOrEmpty(username))
            {
                username = GetWindowsLogin();
                isWindow = true;
            }                     
            if(isWindow)
            {
                var employee = FindByName(username);
                HttpContext.Current.Session["HelloCurrentUser"] = employee;
                if(employee == null)
                {
                    AddCurrentUser(username);
                }              
                return true;
            }
            else
            {
                return Login(username, password);
            }
        }

        public bool IsAccountDomain()
        {

            if(Identity.User.AccountDomainSid.Value == WebConfigurationManager.AppSettings["AccountDomainSid"])
            {
                return true;
            } 
            return false;
        }

        public int AddCurrentUser(string name)
        {
            var employee = new Employees
            {
                FirstName = name,
                UserName = name,
                LastName = name,
                Address = Identity.NameClaimType,
                AccountDomainSid = Identity.User.AccountDomainSid.Value
            };
            var id = Add(employee);
            employee.EmployeeID = id;
            HttpContext.Current.Session["HelloCurrentUser"] = employee;
            return id;
        }

    }
}
