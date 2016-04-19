System.register(['angular2/core', '../../bower_components/vaadin-grid/directives/vaadin-grid', '../search-filters/search_filters.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, vaadin_grid_1, search_filters_component_1;
    var ExpensesList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (vaadin_grid_1_1) {
                vaadin_grid_1 = vaadin_grid_1_1;
            },
            function (search_filters_component_1_1) {
                search_filters_component_1 = search_filters_component_1_1;
            }],
        execute: function() {
            ExpensesList = (function () {
                function ExpensesList() {
                    this.editExpense = new core_1.EventEmitter();
                    this.refreshItems();
                }
                ExpensesList.prototype.gridReady = function (grid) {
                    grid.cellClassGenerator = function (cell) {
                        if (cell.columnName === 'status') {
                            return 'status-' + cell.data.replace(/ /g, '-').toLowerCase();
                        }
                    };
                    grid.addEventListener('sort-order-changed', function () {
                        // if (Polymer && Polymer.isInstance(grid)) {
                        //   // grid.scrollToStart(0);
                        //   grid.refreshItems();
                        // }
                        // // _this._update(); //TODO hook up sorting
                    });
                    grid.columns[0].renderer = function (cell) {
                        cell.element.innerHTML = moment(cell.data).format('YYYY-MM-DD');
                    };
                    grid.columns[2].renderer = function (cell) {
                        cell.element.innerHTML = accounting.formatMoney(cell.data);
                    };
                    grid.columns[3].renderer = function (cell) {
                        var status = cell.data.replace(/_/g, ' ');
                        status = status.charAt(0).toUpperCase() + status.slice(1);
                        cell.element.textContent = status;
                    };
                };
                ExpensesList.prototype.expenses = function (params, callback) {
                    var filters = this.filters || {};
                    var url = './api/expenses?index=' + params.index +
                        '&count=' + params.count +
                        '&merchant=' + (filters.merchant || '') +
                        '&min=' + (filters.min || '') +
                        '&max=' + (filters.max || '') +
                        '&before=' + (filters.before || '') +
                        '&after=' + (filters.after || '') +
                        '&statuses=' + (filters.statuses || '');
                    //this.http.get(url)
                    //  .subscribe(response => {...});
                    // In this demo we'll use a dummy datasource instead of an actual xhr
                    var totalCount = 2000;
                    totalCount -= filters.merchant ? 1000 : 0;
                    totalCount -= filters.min ? 300 : 0;
                    totalCount -= filters.max ? 300 : 0;
                    window.getJSON(url, function (data) {
                        callback(data, totalCount);
                    });
                };
                ExpensesList.prototype.selected = function (grid) {
                    var _this = this;
                    var selection = grid.selection.selected();
                    if (selection.length === 1) {
                        grid.selection.clear();
                        grid.getItem(selection[0], function (err, item) {
                            _this.editExpense.emit(item);
                        });
                    }
                };
                ExpensesList.prototype.onFiltersChanged = function (grid) {
                    if (Polymer && Polymer.isInstance(grid)) {
                        grid.scrollToStart(0);
                        grid.refreshItems();
                    }
                };
                ExpensesList.prototype.refreshItems = function () {
                    var _this = this;
                    // This will make grid update it's items (since the datasource changes)
                    this.expenses = this.expenses.bind(this);
                    // Update merchant list
                    window.getJSON('./api/merchants', function (data) {
                        _this.merchants = data.sort();
                    });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ExpensesList.prototype, "editExpense", void 0);
                ExpensesList = __decorate([
                    core_1.Component({
                        selector: 'expenses-list',
                        templateUrl: './app/expenses-list/expenses_list.component.html',
                        styleUrls: ['./app/expenses-list/expenses_list.component.css'],
                        directives: [vaadin_grid_1.VaadinGrid, search_filters_component_1.SearchFilters]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ExpensesList);
                return ExpensesList;
            })();
            exports_1("ExpensesList", ExpensesList);
        }
    }
});
//# sourceMappingURL=expenses_list.component.js.map