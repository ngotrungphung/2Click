var WebTraining;
(function (WebTraining) {
    var product = Entity.Product;
    var ProductsViewModel = /** @class */ (function () {
        function ProductsViewModel() {
            var that = this;
            that.productList = ko.observableArray([]);
            that.productEnt = ko.observable(ko.mapping.fromJS(new product()));
            that.categoryOption = ko.observableArray([]);
            that.selectedCategory = ko.observable(null);
            that.suppilerOption = ko.observableArray([]);
            that.selectedSupplier = ko.observable(null);
            this.GetProductList(false);
            this.LoadSupplier();
            this.LoadCategory();
            that.AddProduct = function (data) {
                var that = this;
                that.productEnt().CategoryID = that.selectedCategory();
                that.productEnt().SupplierID = that.selectedSupplier();
                var saveData = ko.mapping.toJSON(data.productEnt());
                $.ajax({
                    url: '/Home/SaveProducts/',
                    type: 'POST',
                    contentType: 'application/json',
                    data: saveData,
                    success: function (data) {
                        if (data.success) {
                            $("#product-modal").modal('toggle');
                            that.GetProductList(true);
                        }
                    },
                    error: function () {
                    }
                });
            };
        }
        ProductsViewModel.prototype.GetProductList = function (isUpdate) {
            var that = this;
            $.ajax({
                url: '/Home/GetProducts/',
                type: 'Get',
                contentType: 'application/json',
                success: function (data) {
                    ko.mapping.fromJS(data.productList, {}, that.productList);
                    if (!isUpdate) {
                        $('#productList').DataTable({
                            responsive: true
                        });
                    }
                },
                error: function () {
                }
            });
        };
        ProductsViewModel.prototype.editProduct = function (data, event) {
            var that = this;
            $.ajax({
                url: '/Home/GetProductsById/?productId=' + data.ProductID(),
                type: 'Get',
                contentType: 'application/json',
                success: function (data) {
                    ko.mapping.fromJS(data.product, {}, that.productEnt);
                    that.selectedCategory(that.productEnt().CategoryID()); // = ko.observable(that.productEnt().CategoryID());
                    that.selectedSupplier(that.productEnt().SupplierID());
                    $("#product-modal").modal({ backdrop: 'static', keyboard: false });
                },
                error: function () {
                }
            });
        };
        ProductsViewModel.prototype.deleteProduct = function (element) {
            var that = this;
            $.ajax({
                url: '/Home/DeleteProducts?productId=' + element.ProductID(),
                type: 'Post',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success) {
                        alert("Delete Success");
                        this.GetProductList();
                    }
                    else {
                        alert("Delete fail");
                    }
                },
                error: function () {
                }
            });
        };
        ProductsViewModel.prototype.openAddProductModal = function () {
            var that = this;
            that.ResetData();
            $("#product-modal").modal({ backdrop: 'static', keyboard: false });
        };
        ProductsViewModel.prototype.ResetData = function () {
            var that = this;
            that.productEnt().ProductName("");
            that.productEnt().ProductName("");
        };
        ProductsViewModel.prototype.LoadCategory = function () {
            var that = this;
            $.ajax({
                url: "/Categories/GetAllCategories/",
                dataType: "json",
                cache: false
            }).then(function (data) {
                try {
                    if ($("#categoryControl") != null && data != null && data.data != null && data.data.length > 0) {
                        ko.mapping.fromJS(data.data, {}, that.categoryOption);
                        $("#categoryControl").prop('selectedIndex', 0).change();
                    }
                }
                catch (ex) {
                    toastr.error("SearchCurrentUserOrganizationUnits failed " + ex.message);
                }
            }).fail(function () {
                toastr.error("Can't find user organization units");
            });
        };
        ProductsViewModel.prototype.LoadSupplier = function () {
            var that = this;
            $.ajax({
                url: "/Suppliers/GetAll/",
                dataType: "json",
                cache: false
            }).then(function (data) {
                try {
                    if ($("#supplieryControl") != null && data != null && data.data != null && data.data.length > 0) {
                        debugger;
                        ko.mapping.fromJS(data.data, {}, that.suppilerOption);
                        $("#categoryControl").prop('selectedIndex', 0).change();
                    }
                }
                catch (ex) {
                    toastr.error("SearchCurrentUserOrganizationUnits failed " + ex.message);
                }
            }).fail(function () {
                toastr.error("Can't find user organization units");
            });
        };
        return ProductsViewModel;
    }());
    WebTraining.ProductsViewModel = ProductsViewModel;
})(WebTraining || (WebTraining = {}));
//# sourceMappingURL=ProductsViewModel.js.map