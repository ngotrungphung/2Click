/// <reference path="knockout-2.3.0.debug.js" />
viewModel = {
    lookupCollection : ko.observableArray()
};

$(document).ready(function () {
    
    $.ajax({
        type: "GET",
        url: "/Customer/GetIndex",
    }).done(function (data) {
        $(data).each(function (index, element) {
            var mappedItem = 
                {
                    Id: ko.observable(element.Id),
                    CustomerID: ko.observable(element.CustomerID),
                    CompanyName: ko.observable(element.CompanyName),
                    ContactName: ko.observable(element.ContactName),
                    Mode: ko.observable("display")
                };
            viewModel.lookupCollection.push(mappedItem);
        });
        ko.applyBindings(viewModel);
        $('#customerList').DataTable();
    }).error(function (ex) {
        alert("Error");
    });

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
            Id: ko.observable(0),
            CustomerID: ko.observable(),
            CompanyName: ko.observable(),
            ContactName: ko.observable(),
            Mode: ko.observable("edit")
        }
        viewModel.lookupCollection.push(current);
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
            data: JSON.stringify(submitData)
        }).done(function (id) {
            currentData.Id(id);
        }).error(function (ex) {
            alert("ERROR Saving");
        })
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
    //$('#customerList').DataTable({
    //    responsive: true        
    //});
});