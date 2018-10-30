var WebTraining;
(function (WebTraining) {
    var CredentialViewModel = /** @class */ (function () {
        function CredentialViewModel() {
            var that = this;
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
        CredentialViewModel.prototype.openAddEmployeeModal = function () {
            $("#showLogin").click();
        };
        /*
         * Private Functions
         */
        CredentialViewModel.prototype.createEmployee = function () {
            //Create
            debugger;
            try {
                $.ajax({
                    url: '/Employee/Register',
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
        return CredentialViewModel;
    }());
    WebTraining.CredentialViewModel = CredentialViewModel;
})(WebTraining || (WebTraining = {}));
//# sourceMappingURL=CredentialViewModel.js.map