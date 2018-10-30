module ViewModel {

    import supplier = Entities.Suppliers;

    export class SuppliersViewModel {

        private dataPath: string = "/Suppliers/";
        private tblSuppliers: any;

        public lstSuppliers: KnockoutObservableArray<supplier>;
        public newSupplier: KnockoutObservable<supplier>;

        public constructor() {
            let t = this;
            t.lstSuppliers = ko.observableArray([]);
            t.newSupplier = ko.observable<supplier>(new Entities.Suppliers());
            t.GetAll();
        }

        public ProcessCommon(item: supplier, kind: string, pos: number = 0): string {
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

        public ExcSupplier(kind: string, id: number = -1): void {
            let t = this;
            var currentSupplier: supplier;
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

        private InsSupplier(): void {
            let t = this;
            $.post(t.dataPath + "CreateSupplier/", ko.toJSON(t.newSupplier), function (data) {
                if (data.result == true) {
                    t.GetAll();
                } else {
                    alert("Error");
                }
            });
        };

        private UpdSupplier(currentSupplier: supplier): void {
            let t = this;
            $.post(t.dataPath + "UpdateSupplier/", ko.toJSON(currentSupplier), function (data) {
                if (data.result == true) {
                    t.GetAll();
                } else {
                    alert("Error");
                }
            });
        };

        private DelSupplier(currentSupplier: supplier): void {
            let t = this;
            $.post(t.dataPath + "DeleteSupplier/", ko.toJSON(currentSupplier), function (data) {
                if (data.result == true) {
                    t.GetAll();
                } else {
                    alert("Error");
                }
            });
        };

        private GetAll(): void {
            let t = this;
            $.getJSON(t.dataPath + "GetAll/", function (data) {
                if (data.result == true) {
                    ko.mapping.fromJS(data.lstSuppliers, {}, t.lstSuppliers);
                    t.excDataTable();
                } else {
                    console.log(data.msg);
                }
            });
        };

        private excDataTable(): void {
            let t = this;
            if (t.tblSuppliers == null) {
                t.tblSuppliers = $("#tblSuppliers").DataTable({
                    responsive: true,
                    bSort: false
                });
            } else {
                t.tblSuppliers.rows().invalidate('data').draw(false);
            }
            t.UICreate();
        };

        private UICreate(): void {
            let t = this;
            //$("#supplier-modal").modal({ backdrop: 'static', keyboard: false });
            var UIBtnCreate = "<button data-bind=\"click: supplier-modal\" class=\"btn btn-primary fa fa-plus\" style=\"margin-left: 50px\"> New Supplier </button>";
            $("#tblSuppliers").parents().eq(2).find("div:first div:first div").append(UIBtnCreate);
        };
    }
}