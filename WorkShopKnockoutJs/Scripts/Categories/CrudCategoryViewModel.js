var CategoryModalPopup;
(function (CategoryModalPopup) {
    var CrudCategoryViewModel = /** @class */ (function () {
        function CrudCategoryViewModel() {
            var that = this;
            that.CategoryId = ko.observable(undefined);
            that.CategoryName = ko.observable(undefined);
            that.CategoryDescription = ko.observable(undefined);
            that.shouldShowAdd = ko.observable(false);
            that.shouldShowEdit = ko.observable(false);
            that.shouldShowDelete = ko.observable(false);
        }
        return CrudCategoryViewModel;
    }());
    CategoryModalPopup.CrudCategoryViewModel = CrudCategoryViewModel;
})(CategoryModalPopup || (CategoryModalPopup = {}));
//# sourceMappingURL=CrudCategoryViewModel.js.map