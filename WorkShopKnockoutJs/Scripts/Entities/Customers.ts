module Entities {
    export class Customer {
        CustomerID: string
        CompanyName: string;
        ContactName: string;
        ContactTitle: string;
        Address: string;
        City: string;
        Region: string;
        PostalCode: string;
        Country: string;
        Phone: string;
        Fax: string;
        Id: string;
        public constructor() {
            let that = this;
            that.Id = "";
            that.CustomerID = "";
            that.CompanyName = "";
            that.ContactName = "";
            that.ContactTitle = "";
            that.Address = "";
            that.City = "";
            that.Region = "";
            that.PostalCode = "";
            that.Country = "";
            that.Phone = "";
            that.Fax = "";            
        }
    }
}