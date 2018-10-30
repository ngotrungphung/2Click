module CategoryModalPopup {
    export class CrudCategoryViewModel {
        public CategoryId: KnockoutObservable<string>;
        public CategoryName: KnockoutObservable<string>;
        public CategoryDescription: KnockoutObservable<string>;

        public shouldShowAdd: KnockoutObservable<boolean>;
        public shouldShowEdit: KnockoutObservable<boolean>;
        public shouldShowDelete: KnockoutObservable<boolean>;

        constructor() {
            let that: CrudCategoryViewModel = this;

            that.CategoryId = ko.observable(undefined);
            that.CategoryName = ko.observable(undefined);
            that.CategoryDescription = ko.observable(undefined);

            that.shouldShowAdd = ko.observable(false);
            that.shouldShowEdit = ko.observable(false);
            that.shouldShowDelete = ko.observable(false);
        }
    }
}
