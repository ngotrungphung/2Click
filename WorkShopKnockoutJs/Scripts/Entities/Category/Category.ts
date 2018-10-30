module Entities {

    export class Category {
        CategoryId: string;
        CategoryName: string;
        CategoryDescription: string;
        CategoryPicture: string;

        constructor() {
            let that = this;
            that.CategoryId = "";
            that.CategoryName = "";
            that.CategoryDescription = "";
            that.CategoryPicture = "";
        }
    }
}