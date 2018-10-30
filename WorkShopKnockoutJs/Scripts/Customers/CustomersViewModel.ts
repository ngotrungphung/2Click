module Customers {
    import Customer = Entities.Customer;

    export class CustomersViewModel {
        public customerList: KnockoutObservableArray<Entities.Customer>;
        public GetListCustomer: Function;

        constructor() {
            let that = this;
            that.customerList = ko.observableArray([]);
            that.GetCustomerList(that);
        }

        private GetCustomerList(that) {                        
            $.ajax({
                url: '/Customers/GetIndex',
                type: 'Get',
                contentType: 'application/json',

                success: function (data) {
                    //ko.mapping.fromJS(data.customerList, {}, that.customerList);
                    
                    $(data.customerList).each(function (index, element) {
                        let item: Entities.Customer = <Entities.Customer><any>element;
                        var mappedItem =
                            {
                                Id: ko.observable(item.Id),
                                CustomerID: ko.observable(item.CustomerID),
                                CompanyName: ko.observable(item.CompanyName),
                                ContactName: ko.observable(item.ContactName),
                                Mode: ko.observable("display")
                            };
                        that.customerList.push(mappedItem);
                    });
                },
                error: function () {
                    alert("Error");
                }
            });
        }
    }
    
}

$(document).ready(function () {
    var customerViewModel = new Customers.CustomersViewModel(); 
    ko.applyBindings(customerViewModel);
    $('#customerList').DataTable();

    $(document).on("click", ".kout-edit", null, function (ev) {
        var current = ko.dataFor(this);
        current.Mode("edit");
    });

    $(document).on("click", ".kout-update", null, function (ev) {
        var current = ko.dataFor(this);
        saveData(current);
        current.Mode("display");
    });

    $(document).on("click", ".kout-cancel", null, function (ev) {
        var current = ko.dataFor(this);
        current.Mode("display");
    });

    $(document).on("click", ".kout-delete", null, function (ev) {
        var current = ko.dataFor(this);
        deleteData(current);
        current.Mode("display");
    });

    $(document).on("click", "#create", null, function (ev) {
        var current = {
            Id: ko.observable("0"),
            CustomerID: ko.observable(),
            CompanyName: ko.observable(),
            ContactName: ko.observable(),
            Mode: ko.observable("edit")
        }
        let item: Entities.Customer = <Entities.Customer><any>current;
        customerViewModel.customerList.push(item);
    });

    function saveData(currentData) {
        var postUrl = "";
        var submitData = {
            Id: currentData.Id(),
            CustomerID: currentData.CustomerID(),
            CompanyName: currentData.CompanyName(),
            ContactName: currentData.ContactName()

        };

        if (currentData.Id && currentData.Id() > 0) {
            postUrl = "/Customer/Edit"
        }
        else {
            postUrl = "/Customer/Create"
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: postUrl,
            data: JSON.stringify(submitData),
            success: function (id) {
                currentData.Id(id);
            },
            error: function (error) {
                alert("Delete Fail");
            }
        });
    }

    function deleteData(currentData) {
        var postUrl = "";
        var submitData = currentData.Id()

        if (currentData.Id && currentData.Id() > 0) {
            postUrl = "/Customer/Delete/"
        }

        //$.ajax({
        //    type: "POST",
        //    contentType: "application/json",
        //    url: postUrl,
        //    data: JSON.stringify(submitData)
        //}).done(function (id) {
        //    currentData.Id(id);
        //}).error(function (ex) {
        //    alert("ERROR Saving");
        //})
        $.ajax({
            url: postUrl + submitData,
            method: "POST",
            contentType: "application/JSON;odata=verbose",
            success: function (result) {
                //alert("Ok")
                window.location.reload(true);
            },
            error: function (error) {
                alert("Delete Fail");
            }
        });

    }

});