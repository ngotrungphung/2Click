$(function () {
    ko.applyBindings(modelView);    
    modelView.viewEmployees();
});

var modelView = {
    Employees: ko.observableArray([]),
    viewEmployees: function () {
        var thisObj = this;
        try {
            $.ajax({
                url: '/Employee/ListEmployees',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    thisObj.Employees(data);//Here we are assigning values to KO Observable array
                },
                error: function (err) {
                    alert(err.status + " : " + err.statusText);
                }

            });
        } catch (e) {
            window.location.href = '/Employee/Index';
        }
    },
    //Create
    EmployeeID: ko.observable(),
    FirstName: ko.observable(),
    LastName: ko.observable(),
    Address: ko.observable(),
    createEmployee: function () {
        try {
            $.ajax({
                url: '/Employee/CreateEmployee',
                type: 'POST',
                dataType: 'json',
                data: ko.toJSON(this), //Here the data wil be converted to JSON
                contentType: 'application/json',
                success: successCallback,
                error: errorCallback
            });
        } catch (e) {
            window.location.href = '/Employee';
        }
    }//End create  
};

function successCallback(data) {
    window.location.href = '/Employee';
}
function errorCallback(err) {
    window.location.href = '/Employee';
}