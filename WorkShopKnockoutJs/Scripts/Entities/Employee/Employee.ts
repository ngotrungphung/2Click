module Entities {

    export class Employee {

        EmployeeID: string;
        UserName: string;
        Password: string;
        FirstName: string;
        LastName: string;
        Address: string;
        EditUrl: string;
        DeleteUrl: string;
        constructor() {
            let that = this;
            that.EmployeeID = "";
            that.UserName = "";
            that.Password = "";
            that.LastName = "";
            that.Address = "";
            that.EditUrl = "";
            that.DeleteUrl = "";
        }
    }
}