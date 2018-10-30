var WebTraining;
(function (WebTraining) {
    var EmployeesViewModel = /** @class */ (function () {
        function EmployeesViewModel() {
            var that = this;
            that.viewEmployees(that);
        }
        /*
         * Add Employee
         */
        EmployeesViewModel.prototype.openAddEmployeeModal = function () {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        };
        EmployeesViewModel.prototype.addEmployee = function (Employee) {
        };
        /*
         * Edit Employee
         */
        EmployeesViewModel.prototype.openEditEmployeeModal = function (Employee) {
            alert("edit " + Employee.EmployeeId);
        };
        EmployeesViewModel.prototype.editEmployee = function (Employee) {
        };
        /*
         * Delete Employee
         */
        EmployeesViewModel.prototype.openDeleteEmployeeModal = function (Employee) {
            alert("delete " + Employee.EmployeeId);
        };
        EmployeesViewModel.prototype.deleteEmployee = function (Employee) {
        };
        /*
         * Private Functions
         */
        EmployeesViewModel.prototype.viewEmployees = function (that) {
            that.Employees = ko.observableArray([]);
            try {
                $.ajax({
                    url: '/Employee/ListEmployees',
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        ko.mapping.fromJS(data, {}, that.Employees);
                        //'href': '@Url.Action("Edit", "Employee")/' + EmployeeID
                        //that.Employees(data);//Here we are assigning values to KO Observable array
                    },
                    error: function (err) {
                        alert(err.status + " : " + err.statusText);
                    }
                });
            }
            catch (e) {
                window.location.href = '/Employee/Index';
            }
        };
        return EmployeesViewModel;
    }());
    WebTraining.EmployeesViewModel = EmployeesViewModel;
    var EmployeesCreateViewModel = /** @class */ (function () {
        function EmployeesCreateViewModel() {
            var that = this;
            that.EmployeeID = ko.observable("");
            that.FirstName = ko.observable("");
            that.LastName = ko.observable("");
            that.Address = ko.observable("");
            that.Password = ko.observable("");
            that.UserName = ko.observable("");
        }
        /*
         * Add Employee
         */
        EmployeesCreateViewModel.prototype.openAddEmployeeModal = function () {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        };
        EmployeesCreateViewModel.prototype.addEmployee = function (Employee) {
        };
        /*
         * Edit Employee
         */
        EmployeesCreateViewModel.prototype.openEditEmployeeModal = function (Employee) {
            alert("edit " + Employee.EmployeeId);
        };
        EmployeesCreateViewModel.prototype.editEmployee = function (Employee) {
        };
        /*
         * Delete Employee
         */
        EmployeesCreateViewModel.prototype.openDeleteEmployeeModal = function (Employee) {
            alert("delete " + Employee.EmployeeId);
        };
        EmployeesCreateViewModel.prototype.deleteEmployee = function (Employee) {
        };
        /*
         * Private Functions
         */
        EmployeesCreateViewModel.prototype.createEmployee = function () {
            //Create
            try {
                $.ajax({
                    url: '/Employee/CreateEmployee',
                    type: 'POST',
                    dataType: 'json',
                    data: ko.toJSON(this),
                    contentType: 'application/json',
                    success: successCallback,
                    error: errorCallback
                });
            }
            catch (e) {
                window.location.href = '/Employee';
            }
            function successCallback(data) {
                window.location.href = '/Employee';
            }
            function errorCallback(err) {
                window.location.href = '/Employee';
            }
        }; //End create 
        return EmployeesCreateViewModel;
    }());
    WebTraining.EmployeesCreateViewModel = EmployeesCreateViewModel;
    var EmployeesUpdateViewModel = /** @class */ (function () {
        function EmployeesUpdateViewModel(selectedEmployee) {
            debugger;
            var that = this;
            var parsedSelectedEmployee = $.parseJSON(selectedEmployee);
            that.Password = ko.observable("");
            that.UserName = ko.observable(parsedSelectedEmployee.UserName);
            that.EmployeeID = ko.observable(parsedSelectedEmployee.EmployeeID);
            that.FirstName = ko.observable(parsedSelectedEmployee.FirstName);
            that.LastName = ko.observable(parsedSelectedEmployee.LastName);
            that.Address = ko.observable(parsedSelectedEmployee.Address);
        }
        /*
         * Add Employee
         */
        EmployeesUpdateViewModel.prototype.openAddEmployeeModal = function () {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        };
        EmployeesUpdateViewModel.prototype.addEmployee = function (Employee) {
        };
        /*
         * Edit Employee
         */
        EmployeesUpdateViewModel.prototype.openEditEmployeeModal = function (Employee) {
            alert("edit " + Employee.EmployeeId);
        };
        EmployeesUpdateViewModel.prototype.editEmployee = function (Employee) {
        };
        /*
         * Delete Employee
         */
        EmployeesUpdateViewModel.prototype.openDeleteEmployeeModal = function (Employee) {
            alert("delete " + Employee.EmployeeId);
        };
        EmployeesUpdateViewModel.prototype.deleteEmployee = function (Employee) {
        };
        /*
         * Private Functions
         */
        EmployeesUpdateViewModel.prototype.updateEmployee = function () {
            //Update
            debugger;
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
            }
            catch (e) {
                window.location.href = '/Employee/Index/';
            }
            function successCallback(data) {
                window.location.href = '/Employee';
            }
            function errorCallback(err) {
                window.location.href = '/Employee';
            }
        }; //End create 
        return EmployeesUpdateViewModel;
    }());
    WebTraining.EmployeesUpdateViewModel = EmployeesUpdateViewModel;
    var EmployeesDeleteViewModel = /** @class */ (function () {
        function EmployeesDeleteViewModel(selectedEmployee) {
            debugger;
            var that = this;
            var parsedSelectedEmployee = $.parseJSON(selectedEmployee);
            that.Password = ko.observable(parsedSelectedEmployee.Password);
            that.UserName = ko.observable(parsedSelectedEmployee.UserName);
            that.EmployeeID = ko.observable(parsedSelectedEmployee.EmployeeID);
            that.FirstName = ko.observable(parsedSelectedEmployee.FirstName);
            that.LastName = ko.observable(parsedSelectedEmployee.LastName);
            that.Address = ko.observable(parsedSelectedEmployee.Address);
        }
        /*
         * Add Employee
         */
        EmployeesDeleteViewModel.prototype.openAddEmployeeModal = function () {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        };
        EmployeesDeleteViewModel.prototype.addEmployee = function (Employee) {
        };
        /*
         * Edit Employee
         */
        EmployeesDeleteViewModel.prototype.openEditEmployeeModal = function (Employee) {
            alert("edit " + Employee.EmployeeId);
        };
        EmployeesDeleteViewModel.prototype.editEmployee = function (Employee) {
        };
        /*
         * Delete Employee
         */
        EmployeesDeleteViewModel.prototype.openDeleteEmployeeModal = function (Employee) {
            alert("delete " + Employee.EmployeeId);
        };
        /*
         * Private Functions
         */
        EmployeesDeleteViewModel.prototype.deleteEmployee = function () {
            //deleteEmployee
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
            }
            catch (e) {
                window.location.href = '/Employee/Index/';
            }
            function successCallback(data) {
                window.location.href = '/Employee';
            }
            function errorCallback(err) {
                window.location.href = '/Employee';
            }
        }; //End create 
        return EmployeesDeleteViewModel;
    }());
    WebTraining.EmployeesDeleteViewModel = EmployeesDeleteViewModel;
})(WebTraining || (WebTraining = {}));
//# sourceMappingURL=EmployeesViewModel.js.map