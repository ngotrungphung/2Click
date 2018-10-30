var parsedSelectedEmployee = $.parseJSON(selectedEmployee);

$(function () {
    ko.applyBindings(modelDelete);        
});

var modelDelete = {
    //Delete
    EmployeeID: ko.observable(parsedSelectedEmployee.EmployeeID),
    FirstName: ko.observable(parsedSelectedEmployee.FirstName),
    LastName: ko.observable(parsedSelectedEmployee.LastName),
    Address: ko.observable(parsedSelectedEmployee.Address),
    deleteEmployee: function () {
        try {
            $.ajax({
                url: '/Employee/Delete',
                type: 'POST',
                dataType: 'json',
                data: ko.toJSON(this),
                contentType: 'application/json',
                success: successCallback,
                error: errorCallback
            });
        } catch (e) {
            window.location.href = '/Employee/Index/';
        }
    }
    //End delete here   
}

function successCallback(data) {
    window.location.href = '/Employee/Index/';
}
function errorCallback(err) {
    window.location.href = '/Employee/Index/';
}