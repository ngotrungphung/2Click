var Entity;
(function (Entity) {
    var Product = /** @class */ (function () {
        function Product() {
            var that = this;
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
        ;
        return Product;
    }());
    Entity.Product = Product;
})(Entity || (Entity = {}));
//# sourceMappingURL=Product.js.map