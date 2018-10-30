module Entity {
    export class Product {
        ProductID: KnockoutObservable<string>;
        ProductName: KnockoutObservable<string>;
        SupplierID: KnockoutObservable<string>;
        CategoryID: KnockoutObservable<string>;
        QuantityPerUnit: KnockoutObservable<string>;
        UnitPrice: KnockoutObservable<string>;;
        UnitsInStock: KnockoutObservable<string>;
        UnitsOnOrder: KnockoutObservable<string>;
        ReorderLevel: KnockoutObservable<string>;
        Discontinued: KnockoutObservable<string>;
        public constructor() {
            let that = this;
            that.ProductID = ko.observable("");
            that.ProductName = ko.observable("");
            that.SupplierID = ko.observable("");
            that.CategoryID = ko.observable("");
            that.QuantityPerUnit = ko.observable("");
            that.UnitPrice = ko.observable("");
            that.UnitsInStock = ko.observable("");
            that.UnitsOnOrder = ko.observable("");
            that.ReorderLevel = ko.observable("");
            that.Discontinued = ko.observable("");
        }

    }
}