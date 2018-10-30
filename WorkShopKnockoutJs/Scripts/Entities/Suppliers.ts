module Entities {
    export class Suppliers {
        public SupplierID: KnockoutObservable<number>;
        public CompanyName: KnockoutObservable<string>;
        public ContactName: KnockoutObservable<string>;
        public ContactTitle: KnockoutObservable<string>;
        public Address: KnockoutObservable<string>;
        public City: KnockoutObservable<string>;
        public Region: KnockoutObservable<string>;
        public PostalCode: KnockoutObservable<string>;
        public Country: KnockoutObservable<string>;
        public Phone: KnockoutObservable<string>;
        public Fax: KnockoutObservable<string>;
        public HomePage: KnockoutObservable<string>;

        public constructor() {
            let t = this;
            t.SupplierID = ko.observable(0);
            t.CompanyName = ko.observable("");
            t.ContactName = ko.observable("");
            t.ContactTitle = ko.observable("");
            t.Address = ko.observable("");
            t.City = ko.observable("");
            t.Region = ko.observable("");
            t.PostalCode = ko.observable("");
            t.Country = ko.observable("");
            t.Phone = ko.observable("");
            t.Fax = ko.observable("");
            t.HomePage = ko.observable("");
        }
    }
}