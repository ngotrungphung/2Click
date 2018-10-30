module WebTraining {

    import Employee = Entities.Employee;
  
    export class CredentialViewModel {

        EmployeeID: KnockoutObservable<Employee["EmployeeID"]>;
        Password: KnockoutObservable<Employee["Password"]>;
        UserName: KnockoutObservable<Employee["UserName"]>;
        FirstName: KnockoutObservable<Employee["FirstName"]>;
        LastName: KnockoutObservable<Employee["LastName"]>;
        Address: KnockoutObservable<Employee["Address"]>;
        constructor() {
            let that: CredentialViewModel = this;
            that.EmployeeID = ko.observable("");
            that.Password = ko.observable("");
            that.UserName = ko.observable("");
            that.FirstName = ko.observable("");
            that.LastName = ko.observable("");
            that.Address = ko.observable("");
            that.openAddEmployeeModal();
        }


        /*
         * Add Employee
         */
        private openAddEmployeeModal() {
            $("#showLogin").click();
        }

 

        /*
         * Private Functions
         */
        private createEmployee() {

            //Create
            debugger;
            try {
                $.ajax({
                    url: '/Employee/Register',
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

    
}