var parsedSelectedEmployee = $.parseJSON(selectedEmployee);

$(function () {
    ko.applyBindings(modelUpdate);        
});

var modelUpdate = {
    //Update
    EmployeeID: ko.observable(parsedSelectedEmployee.EmployeeID),
    FirstName: ko.observable(parsedSelectedEmployee.FirstName),
    LastName: ko.observable(parsedSelectedEmployee.LastName),
    Address: ko.observable(parsedSelectedEmployee.Address),
    updateEmployee: function () {
        try {
            $.ajax({
                url: '/Employee/Update',
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
    //End update here   
};

function successCallback(data) {
    window.location.href = '/Employee/Index/';
}
function errorCallback(err) {
    window.location.href = '/Employee/Index/';
}