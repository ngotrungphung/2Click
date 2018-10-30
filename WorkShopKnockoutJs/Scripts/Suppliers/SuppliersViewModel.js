var ViewModel;
(function (ViewModel) {
    var SuppliersViewModel = /** @class */ (function () {
        function SuppliersViewModel() {
            this.dataPath = "/Suppliers/";
            var t = this;
            t.lstSuppliers = ko.observableArray([]);
            t.newSupplier = ko.observable(new Entities.Suppliers());
            t.GetAll();
        }
        SuppliersViewModel.prototype.ProcessCommon = function (item, kind, pos) {
            if (pos === void 0) { pos = 0; }
            switch (kind) {
                case "fc":
                    return item.ContactName() + " (" + item.ContactTitle() + ")";
                case "fa":
                    return item.Address() + " (" + item.City() + " / " + item.Country() + ")";
                case "hp":
                    if (item.HomePage() == null || item.HomePage().length == 0) {
                        return "";
                    }
                    var arrString = item.HomePage().split("#");
                    return arrString[pos];
            }
        };
        ;
        SuppliersViewModel.prototype.ExcSupplier = function (kind, id) {
            if (id === void 0) { id = -1; }
            var t = this;
            var currentSupplier;
            if (id != -1) {
                currentSupplier = t.lstSuppliers.forEach(function (item) {
                    return item.SupplierID == id;
                });
            }
            switch (kind) {
                case "ins":
                    t.InsSupplier();
                    break;
                case "upd":
                    t.UpdSupplier(currentSupplier);
                    break;
                case "del":
                    t.DelSupplier(currentSupplier);
                    break;
            }
        };
        ;
        SuppliersViewModel.prototype.InsSupplier = function () {
            var t = this;
            $.post(t.dataPath + "CreateSupplier/", ko.toJSON(t.newSupplier), function (data) {
                if (data.result == true) {
                    t.GetAll();
                }
                else {
                    alert("Error");
                }
            });
        };
        ;
        SuppliersViewModel.prototype.UpdSupplier = function (currentSupplier) {
            var t = this;
            $.post(t.dataPath + "UpdateSupplier/", ko.toJSON(currentSupplier), function (data) {
                if (data.result == true) {
                    t.GetAll();
                }
                else {
                    alert("Error");
                }
            });
        };
        ;
        SuppliersViewModel.prototype.DelSupplier = function (currentSupplier) {
            var t = this;
            $.post(t.dataPath + "DeleteSupplier/", ko.toJSON(currentSupplier), function (data) {
                if (data.result == true) {
                    t.GetAll();
                }
                else {
                    alert("Error");
                }
            });
        };
        ;
        SuppliersViewModel.prototype.GetAll = function () {
            var t = this;
            $.getJSON(t.dataPath + "GetAll/", function (data) {
                if (data.result == true) {
                    ko.mapping.fromJS(data.lstSuppliers, {}, t.lstSuppliers);
                    t.excDataTable();
                }
                else {
                    console.log(data.msg);
                }
            });
        };
        ;
        SuppliersViewModel.prototype.excDataTable = function () {
            var t = this;
            if (t.tblSuppliers == null) {
                t.tblSuppliers = $("#tblSuppliers").DataTable({
                    responsive: true,
                    bSort: false
                });
            }
            else {
                t.tblSuppliers.rows().invalidate('data').draw(false);
            }
            t.UICreate();
        };
        ;
        SuppliersViewModel.prototype.UICreate = function () {
            var t = this;
            //$("#supplier-modal").modal({ backdrop: 'static', keyboard: false });
            var UIBtnCreate = "<button data-bind=\"click: supplier-modal\" class=\"btn btn-primary fa fa-plus\" style=\"margin-left: 50px\"> New Supplier </button>";
            $("#tblSuppliers").parents().eq(2).find("div:first div:first div").append(UIBtnCreate);
        };
        ;
        return SuppliersViewModel;
    }());
    ViewModel.SuppliersViewModel = SuppliersViewModel;
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=SuppliersViewModel.js.map