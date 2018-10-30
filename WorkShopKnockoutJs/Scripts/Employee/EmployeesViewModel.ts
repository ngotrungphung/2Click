module WebTraining {

    import Employee = Entities.Employee;
  
    export class EmployeesViewModel {
        Employees: KnockoutObservableArray<Employee>;

        constructor() {
            let that: EmployeesViewModel = this;
           
            that.viewEmployees(that);     
        }

        /*
         * Add Employee
         */
        private openAddEmployeeModal() {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        }

        addEmployee(Employee) {

        }

        /*
         * Edit Employee
         */
        openEditEmployeeModal(Employee) {
            alert(`edit ${Employee.EmployeeId}`);
        }

        editEmployee(Employee) {

        }

        /*
         * Delete Employee
         */
        openDeleteEmployeeModal(Employee) {
            alert(`delete ${Employee.EmployeeId}`);
        }

        deleteEmployee(Employee) {

        }

        /*
         * Private Functions
         */
        private viewEmployees(that) {
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
            } catch (e) {
                window.location.href = '/Employee/Index';
            }

        }

    

    }

    export class EmployeesCreateViewModel {
        Password: KnockoutObservable<Employee["Password"]>;
        UserName: KnockoutObservable<Employee["UserName"]>;
        EmployeeID: KnockoutObservable<Employee["EmployeeID"]>;
        FirstName: KnockoutObservable<Employee["FirstName"]>;
        LastName: KnockoutObservable<Employee["LastName"]>;
        Address: KnockoutObservable<Employee["Address"]>;
        constructor() {
            let that: EmployeesCreateViewModel = this;
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
        openAddEmployeeModal() {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        }

        addEmployee(Employee) {

        }

        /*
         * Edit Employee
         */
        openEditEmployeeModal(Employee) {
            alert(`edit ${Employee.EmployeeId}`);
        }

        editEmployee(Employee) {

        }

        /*
         * Delete Employee
         */
        openDeleteEmployeeModal(Employee) {
            alert(`delete ${Employee.EmployeeId}`);
        }

        deleteEmployee(Employee) {

        }

        /*
         * Private Functions
         */
  

        private createEmployee() {

            //Create
        
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
            function successCallback(data) {
                window.location.href = '/Employee';
            }
            function errorCallback(err) {
                window.location.href = '/Employee';
            }
        }//End create 


    }

    export class EmployeesUpdateViewModel {
        Password: KnockoutObservable<Employee["Password"]>;
        UserName: KnockoutObservable<Employee["UserName"]>;
        EmployeeID: KnockoutObservable<Employee["EmployeeID"]>;
        FirstName: KnockoutObservable<Employee["FirstName"]>;
        LastName: KnockoutObservable<Employee["LastName"]>;
        Address: KnockoutObservable<Employee["Address"]>;
        constructor(selectedEmployee) {
            debugger;
            let that: EmployeesUpdateViewModel = this;
  
            let parsedSelectedEmployee = $.parseJSON(selectedEmployee);
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
        openAddEmployeeModal() {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        }

        addEmployee(Employee) {

        }

        /*
         * Edit Employee
         */
        openEditEmployeeModal(Employee) {
            alert(`edit ${Employee.EmployeeId}`);
        }

        editEmployee(Employee) {

        }

        /*
         * Delete Employee
         */
        openDeleteEmployeeModal(Employee) {
            alert(`delete ${Employee.EmployeeId}`);
        }

        deleteEmployee(Employee) {

        }

        /*
         * Private Functions
         */ 


        private updateEmployee() {
    
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
            } catch (e) {
                window.location.href = '/Employee/Index/';
            }
            function successCallback(data) {
                window.location.href = '/Employee';
            }
            function errorCallback(err) {
                window.location.href = '/Employee';
            }
        }//End create 


    }

    export class EmployeesDeleteViewModel {
        Password: KnockoutObservable<Employee["Password"]>;
        UserName: KnockoutObservable<Employee["UserName"]>;
        EmployeeID: KnockoutObservable<Employee["EmployeeID"]>;
        FirstName: KnockoutObservable<Employee["FirstName"]>;
        LastName: KnockoutObservable<Employee["LastName"]>;
        Address: KnockoutObservable<Employee["Address"]>;
        constructor(selectedEmployee) {
            debugger;
            let that: EmployeesDeleteViewModel = this;

            let parsedSelectedEmployee = $.parseJSON(selectedEmployee);
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
        private openAddEmployeeModal() {
            $("#test-modal").modal({ backdrop: 'static', keyboard: false });
        }

        addEmployee(Employee) {

        }

        /*
         * Edit Employee
         */
        openEditEmployeeModal(Employee) {
            alert(`edit ${Employee.EmployeeId}`);
        }

        editEmployee(Employee) {

        }

        /*
         * Delete Employee
         */
        openDeleteEmployeeModal(Employee) {
            alert(`delete ${Employee.EmployeeId}`);
        }

    

        /*
         * Private Functions
         */


        private deleteEmployee() {
         
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
            } catch (e) {
                window.location.href = '/Employee/Index/';
            }
            function successCallback(data) {
                window.location.href = '/Employee';
            }
            function errorCallback(err) {
                window.location.href = '/Employee';
            }
        }//End create 


    }
}