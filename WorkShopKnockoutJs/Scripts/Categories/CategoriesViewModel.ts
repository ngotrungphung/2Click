

module WebTraining {

    //import Category = Entities.Category;
    //import CrudCategoryViewModel = CategoryModalPopup.CrudCategoryViewModel;

    export class CategoriesViewModel {

        public lstCategories: KnockoutObservableArray<Entities.Category>;
        public crudCategoryVM: KnockoutObservable<CategoryModalPopup.CrudCategoryViewModel>;
        private selectedTemplate: any;

        constructor() {
            let that: CategoriesViewModel = this;

            that.selectedTemplate = undefined;

            that.getAllCategories(that);

            that.crudCategoryVM = ko.observable(new CategoryModalPopup.CrudCategoryViewModel());

        }

        /*
         * Add Category
         */
        openAddCategoryModal() {

            //that.crudCategoryVM.shouldShowAdd(true);
            //that.crudCategoryVM.shouldShowEdit(false);
            //that.crudCategoryVM.shouldShowDelete(false);
            //that.crudCategoryVM.CategoryName = ko.observable("");
            //that.crudCategoryVM.CategoryDescription = ko.observable("");

            //$("#category-crud-modal").modal('show');

            let parent: CategoriesViewModel = this;

            parent.openModalWithData(null, parent, true, false, false);
        }

        addCategory(categoryVM) {
            let that: CategoriesViewModel = this;
            let actionName: string = "Create";
            let dataObj = {
                CategoryName: categoryVM.crudCategoryVM().CategoryName(),
                Description: categoryVM.crudCategoryVM().CategoryDescription()
            }
            

            that.postCrudAction(actionName, dataObj, true);
            
        }

        /*
         * Edit Category
         */
        openEditCategoryModal(data, event): void {
            let that: any = data;
            let parent: CategoriesViewModel = this;

            parent.selectedTemplate = data;
            parent.openModalWithData(that, parent, false, true, false);
        }

        editCategory(categoryVM) {
            let that: CategoriesViewModel = this;
            let actionName: string = "Edit";
            let dataObj = {
                CategoryId: that.selectedTemplate.CategoryId(),
                CategoryName: categoryVM.crudCategoryVM().CategoryName(),
                Description: categoryVM.crudCategoryVM().CategoryDescription()
            }

            that.postCrudAction(actionName, dataObj, false);
        }

        /*
         * Delete Category
         */
        openDeleteCategoryModal(data, event): void {
            let that: any = data;
            let parent: CategoriesViewModel = this;

            parent.selectedTemplate = data;
            parent.openModalWithData(that, parent, false, false, true);
        }

        deleteCategory(category) {
            let that: CategoriesViewModel = this;
            let actionName: string = "Delete";
            let dataObj = {
                id: that.selectedTemplate.CategoryId()
            }

            that.postCrudAction(actionName, dataObj, false);

           
        }

        // Close modal
        public closeModal(): void {
            let that: CategoriesViewModel = this;
            that.selectedTemplate = undefined;
            $("#category-crud-modal").modal('hide');
        }

        /*
         * Private Functions
         */
        private getAllCategories(that) {
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
        }

        private openModalWithData(data: any, viewModel: CategoriesViewModel, isAdd: boolean, isEdit: boolean, isDelete: boolean) {

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
        }

        private postCrudAction(actionName: string, dataObject: any, isCreate: boolean): void {
            let that: CategoriesViewModel = this;
            $.ajax({
                url: `/Categories/${actionName}/`,
                async: false,
                contentType: 'application/json',
                type: "POST",
                data: JSON.stringify(dataObject),
                success(result) {
                    debugger;
                    if (result.success.toString() === "true") {

                        if (isCreate) {
                            that.lstCategories.push(result.data);
                        }

                        window.location.href = '/Categories';
                    }
                    //categoryVM.lstCategories.push(result.data);
                },
                error(result) {
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
        }
        
    }

    
}