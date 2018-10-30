var WebTraining;
(function (WebTraining) {
    //import Category = Entities.Category;
    //import CrudCategoryViewModel = CategoryModalPopup.CrudCategoryViewModel;
    var CategoriesViewModel = /** @class */ (function () {
        function CategoriesViewModel() {
            var that = this;
            that.selectedTemplate = undefined;
            that.getAllCategories(that);
            that.crudCategoryVM = ko.observable(new CategoryModalPopup.CrudCategoryViewModel());
        }
        /*
         * Add Category
         */
        CategoriesViewModel.prototype.openAddCategoryModal = function () {
            //that.crudCategoryVM.shouldShowAdd(true);
            //that.crudCategoryVM.shouldShowEdit(false);
            //that.crudCategoryVM.shouldShowDelete(false);
            //that.crudCategoryVM.CategoryName = ko.observable("");
            //that.crudCategoryVM.CategoryDescription = ko.observable("");
            //$("#category-crud-modal").modal('show');
            var parent = this;
            parent.openModalWithData(null, parent, true, false, false);
        };
        CategoriesViewModel.prototype.addCategory = function (categoryVM) {
            var that = this;
            var actionName = "Create";
            var dataObj = {
                CategoryName: categoryVM.crudCategoryVM().CategoryName(),
                Description: categoryVM.crudCategoryVM().CategoryDescription()
            };
            that.postCrudAction(actionName, dataObj, true);
        };
        /*
         * Edit Category
         */
        CategoriesViewModel.prototype.openEditCategoryModal = function (data, event) {
            var that = data;
            var parent = this;
            parent.selectedTemplate = data;
            parent.openModalWithData(that, parent, false, true, false);
        };
        CategoriesViewModel.prototype.editCategory = function (categoryVM) {
            var that = this;
            var actionName = "Edit";
            var dataObj = {
                CategoryId: that.selectedTemplate.CategoryId(),
                CategoryName: categoryVM.crudCategoryVM().CategoryName(),
                Description: categoryVM.crudCategoryVM().CategoryDescription()
            };
            that.postCrudAction(actionName, dataObj, false);
        };
        /*
         * Delete Category
         */
        CategoriesViewModel.prototype.openDeleteCategoryModal = function (data, event) {
            var that = data;
            var parent = this;
            parent.selectedTemplate = data;
            parent.openModalWithData(that, parent, false, false, true);
        };
        CategoriesViewModel.prototype.deleteCategory = function (category) {
            var that = this;
            var actionName = "Delete";
            var dataObj = {
                id: that.selectedTemplate.CategoryId()
            };
            that.postCrudAction(actionName, dataObj, false);
        };
        // Close modal
        CategoriesViewModel.prototype.closeModal = function () {
            var that = this;
            that.selectedTemplate = undefined;
            $("#category-crud-modal").modal('hide');
        };
        /*
         * Private Functions
         */
        CategoriesViewModel.prototype.getAllCategories = function (that) {
            that.lstCategories = ko.observableArray([]);
            $.ajax({
                url: '/Categories/GetAllCategories/',
                type: 'Get',
                contentType: 'application/json',
                success: function (data) {
                    ko.mapping.fromJS(data.data, {}, that.lstCategories);
                    $('#categoriesList').DataTable({
                        responsive: true
                    });
                },
                error: function () {
                }
            });
        };
        CategoriesViewModel.prototype.openModalWithData = function (data, viewModel, isAdd, isEdit, isDelete) {
            var crudCategoryItem = new CategoryModalPopup.CrudCategoryViewModel();
            crudCategoryItem.shouldShowAdd(isAdd);
            crudCategoryItem.shouldShowEdit(isEdit);
            crudCategoryItem.shouldShowDelete(isDelete);
            if (!isAdd && data != null) {
                crudCategoryItem.CategoryName(data.CategoryName());
                crudCategoryItem.CategoryDescription(data.CategoryDescription());
            }
            viewModel.crudCategoryVM(crudCategoryItem);
            $("#category-crud-modal").modal("show");
        };
        CategoriesViewModel.prototype.postCrudAction = function (actionName, dataObject, isCreate) {
            var that = this;
            $.ajax({
                url: "/Categories/" + actionName + "/",
                async: false,
                contentType: 'application/json',
                type: "POST",
                data: JSON.stringify(dataObject),
                success: function (result) {
                    debugger;
                    if (result.success.toString() === "true") {
                        if (isCreate) {
                            that.lstCategories.push(result.data);
                        }
                        window.location.href = '/Categories';
                    }
                    //categoryVM.lstCategories.push(result.data);
                },
                error: function (result) {
                }
            });
            //$.ajax({
            //    url: "/Categories/Create/",
            //    async: false,
            //    contentType: 'application/json',
            //    type: "POST",
            //    data: JSON.stringify(dataObj),
            //    success(result) {
            //        window.location.href = '/Categories';
            //    },
            //    error(result) {
            //    }
            //});
        };
        return CategoriesViewModel;
    }());
    WebTraining.CategoriesViewModel = CategoriesViewModel;
})(WebTraining || (WebTraining = {}));
//# sourceMappingURL=CategoriesViewModel.js.map