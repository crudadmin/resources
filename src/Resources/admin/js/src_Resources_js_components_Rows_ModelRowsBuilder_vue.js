"use strict";
(self["webpackChunkcrudadmin"] = self["webpackChunkcrudadmin"] || []).push([["src_Resources_js_components_Rows_ModelRowsBuilder_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['model', 'row'],
  computed: {
    loadingRow: function loadingRow() {
      return this.model.getData('loadingRow');
    },
    history: function history() {
      return this.model.getData('history');
    },
    isEnabledHistory: function isEnabledHistory() {
      //Check if history is enabled, and user has acces to read data from history
      return this.model.history == true && this.getFreshModel('models_histories').hasAccess('read');
    },
    canShowGettext: function canShowGettext() {
      if (['languages', 'admin_languages'].indexOf(this.model.slug) > -1 && this.$root.gettext == true && this.model.hasAccess('update')) {
        return true;
      }

      return false;
    },
    canShowInfo: function canShowInfo() {
      if (this.model.getSettings('dates') == true) {
        return true;
      }

      return false;
    }
  },
  methods: {
    getDateByField: function getDateByField(row, key) {
      if (key in this.model.fields) {
        return row[key];
      }

      return moment(row[key]).format('DD.MM.Y HH:mm');
    },
    showInfo: function showInfo(row) {
      var data = '';
      if (row.created_at != null) data += this.trans('created-at') + ': <strong>' + this.getDateByField(row, 'created_at') + '</strong><br>';
      if (row.updated_at != null && this.model.editable != false) data += this.trans('last-change') + ': <strong>' + this.getDateByField(row, 'updated_at') + '</strong><br>';
      if (row.published_at != null) data += this.trans('published-at') + ': <strong>' + this.getDateByField(row, 'published_at') + '</strong>';
      this.openModal({
        title: this.trans('row-info-n') + ' ' + row.id,
        message: data,
        type: 'primary'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['model'],
  computed: {
    canShow: function canShow() {
      //Don't show for zero rows
      if (!this.model.getData('rows').count) {
        return false;
      }

      return this.model.getSettings('table.switchcolumns', true);
    },
    enabled_columns: function enabled_columns() {
      return this.model.getData('enabled_columns');
    },
    isDefaultColumnsList: function isDefaultColumnsList() {
      var _this = this;

      var defaultColumns = this.model.getData('default_columns'),
          defaultColumnsKeys = Object.keys(_.cloneDeep(defaultColumns));
      return defaultColumnsKeys.filter(function (column) {
        return defaultColumns[column].enabled != (_this.enabled_columns[column] || {}).enabled;
      }).length == 0;
    }
  },
  methods: {
    canShowColumn: function canShowColumn(column, key) {
      if (!column.name) return false;
      if (key in this.model.fields && this.model.fields[key].type == 'password') return false;
      return true;
    },
    toggleColumnEnabled: function toggleColumnEnabled(column) {
      this.model.setColumnVisibility(column, !this.enabled_columns[column].enabled);
      this.model.loadRows();
    },
    toggleColumnsList: function toggleColumnsList() {
      if (this.isDefaultColumnsList) {
        var defaultColumns = this.model.getData('default_columns');

        for (var key in defaultColumns) {
          this.model.setColumnVisibility(key, true);
        }

        this.model.loadRows();
      } else {
        this.model.resetAllowedColumns();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['model'],
  mounted: function mounted() {},
  computed: {
    rows: function rows() {
      return this.model.getData('rows');
    },
    paginateItems: function paginateItems() {
      if (!this.rows.limit) {
        return [];
      }

      var items = [];

      for (var i = 1; i <= Math.ceil(this.rows.count / this.rows.limit); i++) {
        if (this.showLimit(i)) {
          items.push(i);
        } else if (items[items.length - 1] != 0) {
          items.push(0);
        }
      }

      return items;
    }
  },
  methods: {
    showLimit: function showLimit(i) {
      var max = Math.ceil(this.rows.count / this.rows.limit); //If is first or last page, then show it

      if (i == 1 || i == max) return true; //Middle range

      var radius = max < 1000 ? 3 : max < 1500 ? 2 : 1,
          interval = [[100, 0.3], [100, 0.7], [1000, 0.1], [1000, 0.85]],
          in_middle_active = 0;

      for (var a = 0; a < interval.length; a++) {
        if (max > interval[a][0]) {
          var level = parseInt(max * interval[a][1]);
          if (i >= level && i < level + radius) return true;
          in_middle_active++;
        }
      }

      var maxpages = this.rows.maxpages - in_middle_active * radius,
          maxpages = maxpages < 6 ? 6 : maxpages;
      var offset = this.rows.page < maxpages / 2 ? maxpages / 2 - this.rows.page : 0,
          offset = max - this.rows.page < maxpages / 2 ? maxpages / 2 - (max - this.rows.page) : offset;
      var disabledFromLeft = this.rows.page - offset >= i + Math.ceil(maxpages / 2) - 1,
          disabledFromRight = this.rows.page < i - maxpages / 2 - offset;

      if (disabledFromLeft || disabledFromRight) {
        return false;
      }

      return true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    model: {},
    rows: {},
    visibleIfMinRows: {
      "default": 0
    }
  },
  computed: {
    canShow: function canShow() {
      //Unlock for heavier table rows
      return this.rows.data.length >= this.visibleIfMinRows || this.rows.count >= 100;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TableRows_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRows.vue */ "./src/Resources/js/components/Rows/TableRows.vue");
/* harmony import */ var _Partials_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Partials/Pagination.vue */ "./src/Resources/js/components/Partials/Pagination.vue");
/* harmony import */ var _Partials_PaginationLimit_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Partials/PaginationLimit.vue */ "./src/Resources/js/components/Partials/PaginationLimit.vue");
/* harmony import */ var _Partials_ColumnsList_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Partials/ColumnsList.vue */ "./src/Resources/js/components/Partials/ColumnsList.vue");
/* harmony import */ var _components_Partials_ModelBuilder_CustomComponents_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/Partials/ModelBuilder/CustomComponents.vue */ "./src/Resources/js/components/Partials/ModelBuilder/CustomComponents.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    model: {},
    rows: {},
    insertButton: {
      "default": false
    }
  },
  components: {
    TableRows: _TableRows_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Pagination: _Partials_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    PaginationLimit: _Partials_PaginationLimit_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    CustomComponents: _components_Partials_ModelBuilder_CustomComponents_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    ColumnsList: _Partials_ColumnsList_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      table: null,
      refresh: this.model.setData('refresh', {
        refreshing: true,
        count: 0,
        interval: this.getRefreshInterval()
      }).getData('refresh')
    };
  },
  created: function created() {
    var _this = this;

    //For file paths
    this.root = window.crudadmin.root; //Set default order rows

    this.setOrder();
    this.setDefaultModelLimit(); //Refresh rows refreshInterval

    this.model.loadRows();
    /*
     *
     * When row is added, then push it into table
     * TODO: REFACTOR THIS
     */

    eventHub.$on('onCreate', this.onCreateEvent = function (data) {
      if (data.table != _this.model.slug || data.depth_level != _this.model.getData('depth_level')) {
        return;
      }

      var array = data.request,
          pages = Math.ceil(_this.rows.count / _this.rows.limit); //If last page is full, and need to add new page

      if (_this.model.isReversed(true) && _this.rows.count > 0 && !_this.model.isWithoutExistingParentRow() && pages == _this.rows.count / _this.rows.limit) {
        _this.model.setPage(pages + 1, _this.model.isWithoutExistingParentRow() ? true : null);
      } //If user is not on lage page, then change page into last, for see added rows
      else if (_this.model.isReversed(true) && _this.rows.page < pages && !_this.model.isWithoutExistingParentRow()) {
        _this.model.setPage(pages);
      } //If row can be pushed without reloading rows into first or last page
      else if (_this.rows.page == 1 || _this.model.isReversed(true) && _this.rows.page == pages || _this.model.isWithoutExistingParentRow()) {
        var rows = array.rows.concat(_this.rows.data);

        if (_this.model.isPaginationEnabled() && rows.length > _this.rows.limit) {
          rows = rows.slice(0, _this.rows.limit);
        } //Insert buttons of new created row


        for (var key in array.buttons) {
          Vue.set(_this.rows.buttons, key, array.buttons[key]);
        }

        _this.rows.data = rows;
        _this.rows.count += array.rows.length;
      } else {
        _this.model.loadRows();
      }
    });
    /*
     * When row is updated, then change data into table for changed rows
     */

    eventHub.$on('onUpdate', this.onUpdateEvent = function (data) {
      if (data.table != _this.model.slug || data.depth_level != _this.model.getData('depth_level')) return; //Reset history on update row

      _this.model.closeHistory(); //Reload rows on row update event


      if (_this.model.getSettings('reloadOnUpdate') == true) {
        _this.model.loadRows();
      }
    });
    /*
     * Reload table rows on request
     */

    eventHub.$on('reloadRows', this.onReloadRows = function (table) {
      if (_this.model.slug != table) return;

      _this.model.loadRows();
    });
    this.refreshOnParentStore();
  },
  destroyed: function destroyed() {
    this.model.disableRowsRefreshing();
    eventHub.$off('onCreate', this.onCreateEvent);
    eventHub.$off('onUpdate', this.onUpdateEvent);
    eventHub.$off('reloadRows', this.onReloadRows);
  },
  watch: {
    progress: function progress(state) {
      if (state == true) {
        this.model.disableRowsRefreshing();
      } else {
        this.model.enableRowsRefreshing(false);
      }
    },
    langid: function langid(_langid) {
      if (this.model.localization == true) {
        this.model.setPage(1);
      }
    },
    model: function model() {
      this.updateModelOptions();
    },
    modelOptions: {
      deep: true,
      handler: function handler() {
        this.updateModelOptions();
      }
    },
    'scopes': {
      handler: function handler(a, b) {
        //If scopes has been changed
        if (_.isEqual(a, b) === false) {
          this.model.setPage(1, {
            force: true
          });
        }
      }
    },
    'search.queries': {
      deep: true,
      handler: function handler(queries) {
        var was_searching = this.model.getData('searching');
        var searching = false;

        for (var i = 0; i < queries.length; i++) {
          var item = queries[i],
              query = !_.isNil(item.query) && item.query !== '' ? item.query : item.query_to;

          if (searching === false && !_.isNil(query) && query !== '') {
            if (query.length >= 3 || $.isNumeric(query)) {
              searching = true;
            }

            if (item.column && item.column in this.model.fields && ['select', 'option', 'checkbox'].indexOf(this.model.fields[item.column].type) > -1) {
              searching = true;
            }
          }
        }

        this.model.setData('searching', searching); //On first search query reset pagination

        if (this.model.getData('searching') == true && was_searching == false) {
          this.model.setPage(1);
        } //If is normal searching, then search in every char, or if is turned searching from on to off state, then show normal rows
        else if (this.model.getData('searching') || this.model.getData('searching') == false && was_searching == true) {
          this.model.loadRows();
        }
      }
    },
    paginationEnabled: function paginationEnabled(state, oldstate) {
      if (oldstate == false && state == true) {
        this.setDefaultModelLimit();
      }
    },
    parentRowId: function parentRowId(rowId, oldRowId) {
      if (rowId != oldRowId) {
        //We need reload all rows, because parent has been changed
        this.model.cleanRows(); //Set allowed columns

        this.model.resetAllowedColumns();
      }
    }
  },
  computed: {
    scopes: function scopes() {
      //We need clone scopes, otherwise watcher data for refreshing rows will be always same value.
      return _.cloneDeep(this.model.getData('scopes'));
    },
    paginationEnabled: function paginationEnabled() {
      return this.model.isPaginationEnabled();
    },
    progress: function progress() {
      return this.model.getData('progress');
    },
    modelOptions: function modelOptions() {
      return this.model.getData('modelOptions');
    },
    langid: function langid() {
      return this.model.getSelectedLanguageId();
    },
    row: function row() {
      return this.model.getRow();
    },
    search: function search() {
      return this.model.getData('search');
    },
    availableActionButtons: function availableActionButtons() {
      return this.model.getAllButtons(['multiple', 'action']);
    },
    hasButtons: function hasButtons() {
      return Object.keys(this.availableActionButtons).length > 0;
    },
    title: function title() {
      var title;

      if (title = this.model.getSettings('title.rows')) {
        return title;
      }

      if (this.model.getParentModel()) {
        return this.model.name;
      }

      return this.trans('rows');
    },
    parentRowId: function parentRowId() {
      var _this$model$getData, _this$model$getParent, _this$model$getParent2;

      var idFromGivenModel = (_this$model$getData = this.model.getData('parentRow')) === null || _this$model$getData === void 0 ? void 0 : _this$model$getData.id; // This id is given by manually passing parent model
      // Eg. if ModelBuilder is not working

      if (idFromGivenModel) {
        return idFromGivenModel;
      } //Passing from fyzicaly existing parent model


      return (_this$model$getParent = this.model.getParentModel()) === null || _this$model$getParent === void 0 ? void 0 : (_this$model$getParent2 = _this$model$getParent.getRow()) === null || _this$model$getParent2 === void 0 ? void 0 : _this$model$getParent2.id;
    }
  },
  methods: {
    setDefaultModelLimit: function setDefaultModelLimit() {
      this.rows.limit = this.model.getLimitFromStorage();
    },
    //We need update modelOptions all the time model or modelOptions has been changed
    //because if model property in base $root models will change. options will dissapear.
    //This is buggy behaviour when data are set in beforeInitialAdminRequest model property
    updateModelOptions: function updateModelOptions() {
      for (var key in this.modelOptions) {
        if (!_.isNil(this.model.fields[key].options)) {
          this.model.fields[key].options = this.modelOptions[key];
        }
      }
    },
    exportXlsTable: function exportXlsTable() {
      this.model.loadRows({
        indicator: true,
        download: true,
        limit: -1
      });
    },

    /*
     * Sets default order after loading compoennt
     */
    setOrder: function setOrder() {
      //Set order by settings parameter
      if (this.model.getData('orderBy') == null) {
        var orderBy = this.model.getSettings('orderBy');

        if (orderBy) {
          var keys = Object.keys(orderBy);
          this.model.setData('orderBy', [keys[0], parseFloat(orderBy[keys[0]].toLowerCase().replace('asc', 0).replace('desc', 1))]);
          return;
        }
      } //Set order by field parameter


      for (var key in this.model.fields) {
        var field = this.model.fields[key];

        if ('orderBy' in field) {
          var order = 1;
          this.model.setData('orderBy', [key, field['orderBy'].toLowerCase().replace('asc', 0).replace('desc', 1)]);
          return;
        }
      }

      var defaultOrder = [this.model.orderBy[0], this.model.orderBy[1].toLowerCase().replace('asc', 0).replace('desc', 1)]; //Add default order of rows

      this.model.setData('orderBy', defaultOrder);
    },
    getRefreshInterval: function getRefreshInterval() {
      var interval = this.model.getSettings('refresh_interval', 10000); //Infinity interval

      if (interval == false) {
        interval = 3600 * 1000;
      }

      return interval;
    },
    removeRow: function removeRow(row) {
      var _this2 = this;

      var ids = row ? [row.id] : this.model.getChecked();
      this.model.removeRow(ids, function (response, requestData) {
        //After remove reset checkbox
        if (!row) {
          //We need set length to zero, to keep array reference in admin model
          _this2.model.resetChecked();
        }
      });
    },
    refreshOnParentStore: function refreshOnParentStore() {
      var _this3 = this;

      var parentModel = this.model.getParentModel();

      if (parentModel) {
        parentModel.on('create', function (row) {
          if (_this3.model.isWithoutExistingParentRow() && parentModel.isWithoutExistingParentRow() === false) {
            _this3.model.cleanRows();
          }
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Partials/File.vue */ "./src/Resources/js/components/Partials/File.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['model', 'item', 'field', 'name', 'image', 'columns', 'settings'],
  components: {
    File: _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  created: function created() {
    if (this.settings.component) {
      this.registerModelComponents(this.model, this.settings.component);
    } //Performance tests
    //this.$a = window.startTest();

  },
  // mounted(){
  //     window.endTest(this.$a);
  // },
  computed: {
    isFile: function isFile() {
      if (this.settings.isRealField && this.settings.field.isFile() && this.settings.encode) {
        return true;
      }

      return false;
    },
    isColor: function isColor() {
      return this.settings.isRealField && this.settings.field.isColor();
    },
    getFiles: function getFiles() {
      var value = this.fieldValue || [];

      if ($.isArray(value)) {
        return value;
      }

      return [value];
    },
    hasFieldValue: function hasFieldValue() {
      return _.isNil(this.fieldValue) === false;
    },
    fieldValue: function fieldValue() {
      var field = this.settings.field,
          row = this.item,
          rowValue = this.field in row ? this.getMutatedValue(row[this.field], field) : ''; //Get select original value

      if (field) {
        var isRadio = field.isRadio();

        if (field.isSelect() || isRadio) {
          if ('multiple' in field && field.multiple == true && $.isArray(rowValue) && !isRadio) {
            var values = [],
                rows = rowValue,
                related_table = this.getRelatedModelTable(field),
                options = !related_table && !field.option ? field.options : this.getLanguageSelectOptions(field.options, this.getRelatedModelTable(field));

            for (var i = 0; i < rows.length; i++) {
              var searched = options.filter(function (item) {
                return item[0] == rows[i];
              }.bind(this));

              if (searched.length > 0) {
                values.push(searched[0][1]);
              }
            }

            return values.join(', ');
          } else {
            var related_table = this.getRelatedModelTable(field),
                options = isRadio || !related_table && !field.option ? field.options : this.getLanguageSelectOptions(field.options, related_table); //Check if key exists in options

            if (!options) return rowValue;

            for (var i = 0; i < options.length; i++) {
              if (rowValue == options[i][0]) {
                return options[i][1];
              }
            }
          }
        } else if (field.isCheckbox()) {
          if (rowValue === null) {
            return;
          }

          return rowValue == 1 ? this.trans('yes') : this.trans('no');
        } //Multi date format values
        else if (field.isDatepicker()) {
          rowValue = this.returnDateFormat(rowValue, this.field);
        }
      } else if (['created_at', 'updated_at'].indexOf(this.field) > -1) {
        return this.returnDateFormat(rowValue, this.field);
      }

      var add_before = this.settings.add_before,
          add_after = this.settings.add_after; //If is object

      if (_typeof(rowValue) == 'object') {
        return rowValue;
      }

      return rowValue || rowValue == 0 ? (add_before || '') + rowValue + (add_after || '') : null;
    },
    onlyEncodedTitle: function onlyEncodedTitle() {
      //If is not encoded column, then return empty value
      if (this.settings.encode === false) {
        return '';
      }

      return this.fieldValue;
    },
    fieldValueLimitedAndEncoded: function fieldValueLimitedAndEncoded() {
      return this.encodeValue(this.stringLimit(this.fieldValue));
    },
    hasComponent: function hasComponent() {
      return this.settings.component ? true : false;
    }
  },
  methods: {
    returnDateFormat: function returnDateFormat(rowValue, field) {
      var _this = this;

      return _.castArray(rowValue || []).map(function (item) {
        var date = moment(item),
            format = _this.fromPHPFormatToMoment(_this.model.getFieldFormat(field) || 'd.m.Y H:i');

        return date.isValid() ? date.format(format) : item;
      }).join(', ');
    },
    stringLimit: function stringLimit(string) {
      var limit = this.settings.string_limit;

      if (limit != 0 && string.length > limit && this.settings.encode !== false) {
        return string.substr(0, limit) + '...';
      }

      return string;
    },
    encodeValue: function encodeValue(string) {
      var field = this.settings.field;

      if (this.settings.isRealField) {
        //Check if column can be encoded
        if (this.settings.encode == true) {
          string = $(document.createElement('div')).text(string).html();
        }

        if (field.isText() && parseInt(field.limit) === 0) {
          return string.replace(/\n/g, '<br>');
        } //Is phone number


        if (field.isText() && ('phone' in field || 'phone_link' in field) || field.isPhone()) {
          return '<a href="tel:' + string + '">' + string + '</a>';
        }
      }

      return string;
    },
    getRelatedModelTable: function getRelatedModelTable(field) {
      var table = field.belongsTo || field.belongsToMany;

      if (!table) {
        return false;
      }

      return table.split(',')[0];
    },
    getMutatedValue: function getMutatedValue(value, field) {
      if (field && 'locale' in field) {
        //Get default language
        var dslug = this.settings.default_slug;
        value = this.getLocaleFieldValue(value, dslug);
      } //Return correct zero value


      if (value === 0) {
        return 0;
      }

      return value;
    },
    getLanguageSelectOptions: function getLanguageSelectOptions(array, model) {
      model = this.$root.models[model];
      var filter = model && model.localization ? {
        language_id: this.$root.language_id
      } : {};
      return this.$root.languageOptions(array, this.settings.field, filter, false);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TableRowValue_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRowValue.vue */ "./src/Resources/js/components/Rows/TableRowValue.vue");
/* harmony import */ var _components_Partials_Actions_Actions_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/Partials/Actions/Actions.vue */ "./src/Resources/js/components/Partials/Actions/Actions.vue");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['rows', 'buttons', 'count', 'field', 'model'],
  components: {
    TableRowValue: _TableRowValue_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Actions: _components_Partials_Actions_Actions_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    draggable: (vuedraggable__WEBPACK_IMPORTED_MODULE_2___default())
  },
  data: function data() {
    return {
      autoSize: false
    };
  },
  created: function created() {
    //If table has foreign column, will be hidden
    if (this.model.foreign_column != null) {
      this.hidden.push(this.model.foreign_column);
    } //Set allowed columns


    this.model.resetAllowedColumns(this.defaultColumns); //Automaticaly choose size of tables

    if (this.autoSize == false) {
      this.model.checkActiveGridSize(this.columns);
    }
  },
  watch: {
    columns: function columns() {
      this._cacheColumnSettings = {};
    }
  },
  computed: {
    button_loading: function button_loading() {
      return this.model.getData('button_loading');
    },
    loadingRow: function loadingRow() {
      return this.model.getData('loadingRow');
    },
    enabled_columns: function enabled_columns() {
      return this.model.getData('enabled_columns');
    },
    sortedRows: function sortedRows() {
      return this.model.getRows();
    },
    row: function row() {
      return this.model.getRow();
    },
    orderBy: function orderBy() {
      return this.model.getData('orderBy');
    },
    hasCheckingEnabled: function hasCheckingEnabled() {
      if (this.model.getSettings('checking', true) === false) {
        return false;
      }

      return true;
    },
    isSmallTable: function isSmallTable() {
      if (this.model.getSettings('table.small', false) == true) {
        return true;
      }

      var limit = 30,
          columnsCount = Object.keys(this.columns).length;
      return this.rows.limit >= limit && this.rows.count >= limit || columnsCount > 10;
    },
    multipleCheckbox: function multipleCheckbox() {
      return this.model.getChecked().length > 0;
    },
    defaultColumns: function defaultColumns() {
      var data = {},
          key; //Get columns from row

      for (var key in this.model.fields) {
        //We want skip inacessible fields
        if (this.model.tryAttribute(this.model.fields[key], 'inaccessible') || this.model.tryAttribute(this.model.fields[key], 'inaccessible_column')) {
          continue;
        }

        var enabled = (this.model.columns.includes(key) === true || this.model.fields[key].column_visible === true) && this.model.getSettings('columns.' + key + '.hidden') !== true && this.hidden.includes(key) === false && this.avaliableColumns.includes(key) === true && ( //Is virtual column
        !(key in this.model.fields) || //Is not hidden field
        this.model.fields[key].hidden != true && !this.model.tryAttribute(this.model.fields[key], 'invisible') || this.model.fields[key].column_visible == true);
        data[key] = {
          name: this.fieldName(key),
          enabled: enabled
        };
      }

      data = this.addVirtualColumns(data);
      this.model.setData('default_columns', data);
      return data;
    },
    columns: function columns() {
      var columns = {}; //Disable changed fields

      for (var key in this.enabled_columns) {
        if (this.enabled_columns[key].enabled == true) {
          columns[key] = this.enabled_columns[key].name;
        }
      }

      return columns;
    },
    avaliableColumns: function avaliableColumns() {
      return _.uniq([this.model.getKeyName()].concat(Object.keys(this.model.fields)));
    },
    availableButtons: function availableButtons() {
      return this.$parent.availableButtons;
    },
    isCheckedAll: function isCheckedAll() {
      var ids = this.rows.data.map(function (item) {
        return item.id;
      }),
          checked = this.model.getChecked();

      if (checked.length == 0) {
        return false;
      }

      return _.isEqual(_.sortBy(ids), _.sortBy(checked));
    },
    canOpenRowOnClick: function canOpenRowOnClick() {
      return this.model.getSettings('table.onclickopen', false) == true;
    },
    isTableClickable: function isTableClickable() {
      //if table cannot be opened
      if (!(this.model.isEditable() || this.model.isDisplayable())) {
        return false;
      } //If table has disabled clicks for opening rows


      if (this.model.getSettings('table.clickable', true) === false) {
        return false;
      }

      return true;
    },
    hasIndicatorInTable: function hasIndicatorInTable() {
      return (this.sortedRows[0] || {}).$indicator ? true : false;
    },
    hidden: function hidden() {
      var _this = this;

      return ['language_id', '_order', 'slug', 'published_at', 'updated_at', 'created_at'].filter(function (column) {
        var _this$model$fields$co;

        if (((_this$model$fields$co = _this.model.fields[column]) === null || _this$model$fields$co === void 0 ? void 0 : _this$model$fields$co.column_visible) === true) {
          return false;
        }

        if (_this.model.getSettings('columns.' + column + '.hidden') == true) {
          return false;
        }

        return true;
      });
    },
    hasTablePadding: function hasTablePadding() {
      if (this.model.isDragEnabled() || this.hasCheckingEnabled || this.hasIndicatorInTable || this.model.getSettings('increments', true) == true) {
        return false;
      }

      return true;
    }
  },
  methods: {
    fieldType: function fieldType(field) {
      var _this$model$fields$fi;

      return ((_this$model$fields$fi = this.model.fields[field]) === null || _this$model$fields$fi === void 0 ? void 0 : _this$model$fields$fi.type) || 'static';
    },
    addVirtualColumns: function addVirtualColumns(data) {
      //Add increment on the first place
      if (this.model.getSettings('increments', true) == true) {
        var newData = {};
        newData[this.model.getKeyName()] = {
          name: this.model.fieldName(this.model.getKeyName()),
          enabled: true
        };
        data = _objectSpread(_objectSpread({}, newData), data);
      }
      /*
       * Check if can be added column after other column
       */


      var except = [],
          columns = this.model.getSettings('columns'); //Add before and after column values

      if (columns) {
        for (var vKey in columns) {
          var modifiedData = {};

          for (var parentKey in data) {
            var parentColumnEnabled = this.model.getSettings('columns.' + parentKey + '.hidden') !== true; //Add custom column before actual column

            for (var k in columns) {
              var _enabled = parentColumnEnabled === false ? false : this.model.getSettings('columns.' + k + '.hidden') != true;

              modifiedData = this.addColumn(modifiedData, k, parentKey, 'before', columns, except, _enabled);
            }

            modifiedData[parentKey] = data[parentKey]; //Add custom column after actual column

            for (var k in columns) {
              var _enabled2 = parentColumnEnabled === false ? false : this.model.getSettings('columns.' + k + '.hidden') != true;

              modifiedData = this.addColumn(modifiedData, k, parentKey, 'after', columns, except, _enabled2);
            }
          }

          data = modifiedData;
        }

        for (var key in columns) {
          if (!(key in data)) {
            var field_key = this.getColumnRightKey(key),
                enabled = columns[key].hidden != true && columns[key].invisible != true || columns[key].column_visible == true;
            data[key] = {
              name: this.model.fieldName(field_key),
              enabled: enabled
            };
          }
        }
      }

      return data;
    },

    /*
     * We need cache all settings for columns, for better performance
     */
    getCachableColumnsSettings: function getCachableColumnsSettings(field) {
      if (!this._cacheColumnSettings) {
        this._cacheColumnSettings = {};
      }

      if (field in this._cacheColumnSettings) {
        return this._cacheColumnSettings[field];
      }

      var isRealField = (field in this.model.fields),
          realField = isRealField ? this.model.fields[field] : null;
      var settings = {
        isRealField: isRealField,
        field: realField,
        string_limit: this.getFieldLimit(field),
        default_slug: this.$root.languages.length ? this.$root.languages[0].slug : null,
        add_before: this.model.getSettings('columns.' + field + '.add_before'),
        add_after: this.model.getSettings('columns.' + field + '.add_after'),
        encode: this.model.getSettings('columns.' + field + '.encode', true),
        limit: this.model.getSettings('columns.' + field + '.limit'),
        component: this.model.getSettings('columns.' + field + '.component', realField ? realField.column_component : null)
      };
      return this._cacheColumnSettings[field] = settings;
    },
    getFieldLimit: function getFieldLimit(fieldKey) {
      var defaultLimit = Object.keys(this.columns).length < 5 ? 40 : 20,
          settingsLimit = this.model.getSettings('columns.' + fieldKey + '.limit');

      if (this.model.getSettings('columns.' + fieldKey + '.encode', true) === false) {
        return 0;
      }

      if (fieldKey in this.model.fields) {
        var field = this.model.fields[fieldKey],
            limit;

        if ('limit' in field) {
          limit = field.limit;
        } else {
          limit = settingsLimit || defaultLimit;
        }

        return limit || limit === 0 ? limit : defaultLimit;
      }

      return settingsLimit || defaultLimit;
    },
    addColumn: function addColumn(modifiedData, k, key, where, columns, except, enabled) {
      if (where in columns[k] && (columns[k][where] == key || columns[k][where] + '_id' == key)) {
        var field_key = this.getColumnRightKey(k); //We can't add column which has been added, because we reorder array

        if (except.indexOf(field_key) > -1) return modifiedData;
        except.push(field_key);
        if (k in modifiedData) delete modifiedData[k];
        if (field_key in modifiedData) delete modifiedData[field_key];
        modifiedData[field_key] = {
          name: this.model.fieldName(field_key),
          enabled: enabled
        };
      }

      return modifiedData;
    },
    toggleAllCheckboxes: function toggleAllCheckboxes() {
      var ids = this.rows.data.map(function (item) {
        return item.id;
      });
      this.model.setChecked(this.isCheckedAll ? [] : ids);
    },
    checkRow: function checkRow(id, $event) {
      var _this2 = this;

      if (this.hasCheckingEnabled === false) {
        return;
      } //Check multiple with shift


      var checked = this.model.getData('checked'),
          lastChecked = checked[checked.length - 1];

      if ($event && $event.shiftKey && checked.length >= 1 && checked[0] != id) {
        var rows = this.model.getRows(),
            checkedCloned = _.cloneDeep(checked);

        rows.forEach(function (row) {
          if (id > lastChecked && row.id > lastChecked && row.id <= id) {
            _this2.model.toggleChecked(row.id, checkedCloned);
          } else if (id < lastChecked && row.id <= lastChecked && row.id >= id) {
            _this2.model.toggleChecked(row.id, checkedCloned);
          }
        });
        var toState = checkedCloned.length >= checked.length;
        rows.forEach(function (row) {
          if (id > lastChecked && row.id >= lastChecked && row.id <= id) {
            _this2.model.setColumnChecked(row.id, toState);
          } else if (id < lastChecked && row.id <= lastChecked && row.id >= id) {
            _this2.model.setColumnChecked(row.id, toState);
          }
        });
      } //Check single
      else {
        this.model.toggleChecked(id);
      }
    },
    toggleSorting: function toggleSorting(key) {
      var sortable = this.model.getSettings('sortable'); //Disable sorting by columns

      if (sortable === false) {
        return;
      }

      var orderBy = this.model.getData('orderBy'),
          order = orderBy[0] == key ? 1 - orderBy[1] : 0;
      this.model.setData('orderBy', [key, order]);
    },
    fieldName: function fieldName(key) {
      return this.model.fieldName(key);
    },
    clickTree: function clickTree(target) {
      var path = [];
      var currentElem = target;

      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }

      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
      if (path.indexOf(window) === -1) path.push(window);
      return path;
    },
    selectRowFromTable: function selectRowFromTable(e, row, fieldKey) {
      if (this.isTableClickable === false) {
        return;
      }

      var field = this.model.fields[fieldKey];
      var tree = this.clickTree(e.target); //If user click on link or button, we does not want to open row

      for (var i = 0; i < tree.length; i++) {
        if (['A', 'BUTTON'].indexOf(tree[i].tagName) > -1) {
          return;
        }
      } //If column has disabled opening row on click


      if (this.model.getSettings('columns.' + fieldKey + '.clickable', true) == false) {
        return;
      }

      this.model.selectRow(row);
    },
    removeRow: function removeRow(row) {
      this.$parent.removeRow(row);
    },
    isImageField: function isImageField(field) {
      if (field in this.model.fields) {
        var field = this.model.fields[field];

        if ('image' in field) {
          return true;
        }
      }

      return false;
    },

    /*
     * Returns varians of column names
     */
    getColumnRightKey: function getColumnRightKey(k) {
      if (!(k in this.model.fields) && k + '_id' in this.model.fields) return k + '_id';
      return k;
    },
    //Add custom tr classes
    getRowClass: function getRowClass(row) {
      var classes = {
        '--active': this.model.getChecked().indexOf(row.id) > -1,
        '--loading': this.loadingRow == row.id
      },
          customClass = (row['$class'] || '').split(' ');
      customClass.forEach(function (name) {
        classes[name] = true;
      });
      return classes;
    }
  }
});

/***/ }),

/***/ "./src/Resources/js/components/Partials/Actions/Actions.vue":
/*!******************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Actions/Actions.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Actions_vue_vue_type_template_id_592ca184___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Actions.vue?vue&type=template&id=592ca184& */ "./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=template&id=592ca184&");
/* harmony import */ var _Actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Actions.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Actions_vue_vue_type_template_id_592ca184___WEBPACK_IMPORTED_MODULE_0__.render,
  _Actions_vue_vue_type_template_id_592ca184___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/Actions/Actions.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/ColumnsList.vue":
/*!**************************************************************!*\
  !*** ./src/Resources/js/components/Partials/ColumnsList.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ColumnsList_vue_vue_type_template_id_91d24358___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColumnsList.vue?vue&type=template&id=91d24358& */ "./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=template&id=91d24358&");
/* harmony import */ var _ColumnsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColumnsList.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ColumnsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ColumnsList_vue_vue_type_template_id_91d24358___WEBPACK_IMPORTED_MODULE_0__.render,
  _ColumnsList_vue_vue_type_template_id_91d24358___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/ColumnsList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/Pagination.vue":
/*!*************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Pagination.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.vue?vue&type=template&id=4733f9f1& */ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&");
/* harmony import */ var _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__.render,
  _Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/Pagination.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/PaginationLimit.vue":
/*!******************************************************************!*\
  !*** ./src/Resources/js/components/Partials/PaginationLimit.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaginationLimit_vue_vue_type_template_id_425030fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaginationLimit.vue?vue&type=template&id=425030fa& */ "./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=template&id=425030fa&");
/* harmony import */ var _PaginationLimit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaginationLimit.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PaginationLimit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PaginationLimit_vue_vue_type_template_id_425030fa___WEBPACK_IMPORTED_MODULE_0__.render,
  _PaginationLimit_vue_vue_type_template_id_425030fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/PaginationLimit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue":
/*!***************************************************************!*\
  !*** ./src/Resources/js/components/Rows/ModelRowsBuilder.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& */ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&");
/* harmony import */ var _ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModelRowsBuilder.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__.render,
  _ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Rows/ModelRowsBuilder.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRowValue.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRowValue.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRowValue.vue?vue&type=template&id=0e5a52b6& */ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&");
/* harmony import */ var _TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableRowValue.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__.render,
  _TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Rows/TableRowValue.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRows.vue":
/*!********************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRows.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRows.vue?vue&type=template&id=9a385a72& */ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&");
/* harmony import */ var _TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableRows.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__.render,
  _TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Rows/TableRows.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Actions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ColumnsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColumnsList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ColumnsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationLimit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaginationLimit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationLimit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModelRowsBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TableRowValue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TableRows.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=template&id=592ca184&":
/*!*************************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=template&id=592ca184& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Actions_vue_vue_type_template_id_592ca184___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Actions_vue_vue_type_template_id_592ca184___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Actions_vue_vue_type_template_id_592ca184___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Actions.vue?vue&type=template&id=592ca184& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=template&id=592ca184&");


/***/ }),

/***/ "./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=template&id=91d24358&":
/*!*********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=template&id=91d24358& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ColumnsList_vue_vue_type_template_id_91d24358___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ColumnsList_vue_vue_type_template_id_91d24358___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ColumnsList_vue_vue_type_template_id_91d24358___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ColumnsList.vue?vue&type=template&id=91d24358& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=template&id=91d24358&");


/***/ }),

/***/ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&":
/*!********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=template&id=4733f9f1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&");


/***/ }),

/***/ "./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=template&id=425030fa&":
/*!*************************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=template&id=425030fa& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationLimit_vue_vue_type_template_id_425030fa___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationLimit_vue_vue_type_template_id_425030fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationLimit_vue_vue_type_template_id_425030fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaginationLimit.vue?vue&type=template&id=425030fa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=template&id=425030fa&");


/***/ }),

/***/ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&":
/*!**********************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&");


/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TableRowValue.vue?vue&type=template&id=0e5a52b6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&");


/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TableRows.vue?vue&type=template&id=9a385a72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=template&id=592ca184&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Actions/Actions.vue?vue&type=template&id=592ca184& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "--active": _vm.model.isActiveRow(_vm.row),
        "--history-active":
          _vm.model.isActiveRow(_vm.row) && _vm.history.history_id,
      },
    },
    [
      _vm.model.isEditable() || _vm.model.isDisplayable()
        ? _c("div", { staticClass: "buttons-options__item" }, [
            _c(
              "button",
              {
                class: [
                  "btn",
                  "btn-sm",
                  {
                    "btn-primary": _vm.model.isActiveRow(_vm.row),
                    "btn-light-default": !_vm.model.isActiveRow(_vm.row),
                  },
                ],
                attrs: {
                  "data-button": "edit",
                  "data-id": _vm.row.id,
                  type: "button",
                  "data-toggle": "tooltip",
                  title: "",
                  "data-original-title":
                    _vm.model.hasAccess("update") && _vm.model.isEditable()
                      ? _vm.trans("edit")
                      : _vm.trans("show"),
                },
                on: {
                  click: function ($event) {
                    return _vm.model.selectRow(_vm.row)
                  },
                },
              },
              [
                _c("i", {
                  class: {
                    "fas fa-spinner fa-spin": _vm.loadingRow == _vm.row.id,
                    "far fa-edit": _vm.loadingRow != _vm.row.id,
                  },
                }),
              ]
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.canShowGettext
        ? _c("div", { staticClass: "buttons-options__item" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-sm btn-light-default",
                attrs: {
                  "data-button": "gettext",
                  type: "button",
                  "data-toggle": "tooltip",
                  title: "",
                  "data-original-title": _vm.trans("gettext-update"),
                },
                on: {
                  click: function ($event) {
                    return _vm.model.openGettextEditor(_vm.row)
                  },
                },
              },
              [_c("i", { staticClass: "fa fa-globe-americas" })]
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.canShowInfo
        ? _c("div", { staticClass: "buttons-options__item" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-sm btn-light-default",
                attrs: {
                  type: "button",
                  "data-button": "show",
                  "data-toggle": "tooltip",
                  title: "",
                  "data-original-title": _vm.trans("row-info"),
                },
                on: {
                  click: function ($event) {
                    return _vm.showInfo(_vm.row)
                  },
                },
              },
              [_c("i", { staticClass: "far fa-question-circle" })]
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.model.getButtonsForRow(_vm.row), function (button, buttonKey) {
        return _c(
          "div",
          { staticClass: "buttons-options__item" },
          [
            _c("buttons-action", {
              attrs: {
                button: button,
                row: _vm.row,
                buttonKey: buttonKey,
                model: _vm.model,
              },
            }),
          ],
          1
        )
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=template&id=91d24358&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/ColumnsList.vue?vue&type=template&id=91d24358& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.canShow
    ? _c(
        "div",
        { staticClass: "dropdown fields-list", attrs: { "fields-list": "" } },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "dropdown-menu menu-left dropdown-menu-right" },
            [
              _vm._l(_vm.enabled_columns, function (column, key) {
                return _vm.canShowColumn(column, key)
                  ? _c(
                      "li",
                      {
                        staticClass: "--no-item-padding",
                        class: { active: column.enabled },
                        on: {
                          click: function ($event) {
                            return $event.stopPropagation()
                          },
                        },
                      },
                      [
                        _c(
                          "label",
                          {
                            staticClass:
                              "--dropdown-item-padding --dropdown-item-vertical",
                          },
                          [
                            _c("div", { staticClass: "checkbox-box mr-1" }, [
                              _c("input", {
                                attrs: { type: "checkbox", "data-column": key },
                                domProps: { checked: column.enabled },
                                on: {
                                  click: function ($event) {
                                    return _vm.toggleColumnEnabled(key)
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "checkmark fa" }),
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _vm._v(_vm._s(_vm.model.fieldName(key))),
                            ]),
                          ]
                        ),
                      ]
                    )
                  : _vm._e()
              }),
              _vm._v(" "),
              _c("li", { staticClass: "default-reset" }, [
                _c(
                  "a",
                  {
                    attrs: { href: "#" },
                    on: {
                      click: function ($event) {
                        $event.preventDefault()
                        return _vm.toggleColumnsList.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _vm._v(
                      _vm._s(
                        _vm.isDefaultColumnsList
                          ? _vm._("Zobraziť všetky")
                          : _vm.trans("default")
                      )
                    ),
                  ]
                ),
              ]),
            ],
            2
          ),
        ]
      )
    : _vm._e()
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn dropdown-toggle",
        attrs: {
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "true",
        },
      },
      [
        _c("i", { staticClass: "fa fa-list" }),
        _vm._v(" "),
        _c("i", { staticClass: "--icon-right fa fa-angle-down" }),
      ]
    )
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.rows.count > _vm.rows.limit
      ? _c(
          "ul",
          { staticClass: "pagination", attrs: { "data-pagination": "" } },
          [
            _c(
              "li",
              {
                class: { disabled: _vm.rows.page <= 1 },
                attrs: { "data-pagination-prev": "" },
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "page-link",
                    on: {
                      click: function ($event) {
                        $event.preventDefault()
                        return _vm.model.setPage(_vm.rows.page - 1)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fa fa-chevron-left" })]
                ),
              ]
            ),
            _vm._v(" "),
            _vm._l(_vm.paginateItems, function (i) {
              return _c("li", { class: { active: _vm.rows.page == i } }, [
                _c(
                  "a",
                  {
                    staticClass: "page-link",
                    on: {
                      click: function ($event) {
                        $event.preventDefault()
                        return _vm.model.setPage(i)
                      },
                    },
                  },
                  [_vm._v(_vm._s(i == 0 ? "..." : i))]
                ),
              ])
            }),
            _vm._v(" "),
            _c(
              "li",
              {
                class: {
                  disabled: _vm.rows.page > _vm.rows.count / _vm.rows.limit,
                },
                attrs: { "data-pagination-next": "" },
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "page-link",
                    on: {
                      click: function ($event) {
                        $event.preventDefault()
                        return _vm.model.setPage(_vm.rows.page + 1)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fa fa-chevron-right" })]
                ),
              ]
            ),
          ],
          2
        )
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=template&id=425030fa&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Partials/PaginationLimit.vue?vue&type=template&id=425030fa& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.model.isPaginationEnabled() && _vm.canShow
    ? _c(
        "div",
        {
          staticClass: "pagination-limit",
          class: { "--hidden-limit": _vm.model.isHiddenMode() },
          attrs: { title: _vm.trans("rows-count") },
        },
        [
          _c(
            "div",
            {
              staticClass: "dropdown fields-list",
              attrs: { "fields-list": "" },
            },
            [
              _c(
                "button",
                {
                  staticClass: "btn dropdown-toggle",
                  attrs: {
                    type: "button",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "true",
                  },
                },
                [
                  _vm._v(
                    "\n            " + _vm._s(_vm.rows.limit) + "\n            "
                  ),
                  _c("i", { staticClass: "--icon-right fa fa-angle-down" }),
                ]
              ),
              _vm._v(" "),
              _c(
                "ul",
                { staticClass: "dropdown-menu menu-left dropdown-menu-right" },
                [
                  _c(
                    "li",
                    {
                      class: [
                        "--no-item-padding",
                        { active: _vm.rows.limit == 0 },
                      ],
                      on: {
                        click: function ($event) {
                          return _vm.model.setLimit(0)
                        },
                      },
                    },
                    [
                      _c(
                        "label",
                        {
                          staticClass:
                            "--dropdown-item-padding --dropdown-item-vertical",
                        },
                        [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm._("Skryť")) +
                              "\n                "
                          ),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.rows.limits, function (count) {
                    return _c(
                      "li",
                      {
                        class: [
                          "--no-item-padding",
                          { active: _vm.rows.limit == count },
                        ],
                        on: {
                          click: function ($event) {
                            return _vm.model.setLimit(count)
                          },
                        },
                      },
                      [
                        _c(
                          "label",
                          {
                            staticClass:
                              "--dropdown-item-padding --dropdown-item-vertical",
                          },
                          [
                            _vm._v(
                              "\n                    " +
                                _vm._s(count) +
                                "\n                "
                            ),
                          ]
                        ),
                      ]
                    )
                  }),
                ],
                2
              ),
            ]
          ),
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "box box-wrapper" },
    [
      _c(
        "div",
        { staticClass: "box-header" },
        [
          _c("div", { staticClass: "box-header__actions" }, [
            _c("div", { staticClass: "box-header__left" }, [
              _c("div", [
                _c("h3", { staticClass: "box-header__title" }, [
                  _vm._v(_vm._s(_vm.title) + " "),
                  _c("small", [_vm._v("(" + _vm._s(_vm.rows.count) + ")")]),
                ]),
                _vm._v(" "),
                _vm.model.isEnabledAutoSync() == false
                  ? _c(
                      "a",
                      {
                        staticClass: "box-header__actions--synchronize",
                        attrs: {
                          "data-toggle": "tooltip",
                          title: _vm._(
                            "Automatická synchronizácia záznamov v tabuľke je vypnutá"
                          ),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.model.loadRows(true)
                          },
                        },
                      },
                      [
                        _c("i", { staticClass: "fa fa-sync-alt" }),
                        _vm._v(" " + _vm._s(_vm._("Synchronizácia vypnutá"))),
                      ]
                    )
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "box-header__right" },
              [
                _c("custom-components", {
                  attrs: { model: _vm.model, type: "table-header-actions" },
                }),
                _vm._v(" "),
                _vm.model.getSettings("xls") == true && _vm.rows.count > 0
                  ? _c(
                      "button",
                      {
                        staticClass: "btn--icon btn btn-default",
                        attrs: { "data-export-xls": "", type: "button" },
                        on: {
                          click: function ($event) {
                            $event.preventDefault()
                            return _vm.exportXlsTable()
                          },
                        },
                      },
                      [
                        _c("i", { staticClass: "fa fa-file-excel" }),
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm._("Stiahnuť excel")) +
                            "\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("ColumnsList", { attrs: { model: _vm.model } }),
                _vm._v(" "),
                _vm.model.getChecked().length > 0 && _vm.hasButtons
                  ? _c(
                      "div",
                      {
                        staticClass: "dropdown actions-list fields-list",
                        attrs: { "data-action-list": "" },
                      },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "btn dropdown-toggle",
                            attrs: {
                              type: "button",
                              "data-toggle": "dropdown",
                              "aria-haspopup": "true",
                              "aria-expanded": "true",
                            },
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.trans("action")) +
                                "\n                        "
                            ),
                            _c("i", {
                              staticClass: "--icon-right fa fa-angle-down",
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "ul",
                          {
                            staticClass:
                              "dropdown-menu menu-left dropdown-menu-right",
                          },
                          _vm._l(_vm.availableActionButtons, function (button) {
                            return _c(
                              "li",
                              {
                                on: {
                                  click: function ($event) {
                                    return _vm.model.buttonAction(button.key)
                                  },
                                },
                              },
                              [
                                _c("i", {
                                  staticClass: "fa --icon-left",
                                  class: button.icon,
                                }),
                                _vm._v(
                                  _vm._s(button.name) +
                                    "\n                        "
                                ),
                              ]
                            )
                          }),
                          0
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.insertButton
                  ? _c("PaginationLimit", {
                      attrs: {
                        model: _vm.model,
                        rows: _vm.rows,
                        visibleIfMinRows: 20,
                      },
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.insertButton
                  ? _c("AddNewRowModal", {
                      attrs: { model: _vm.model },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function (ref) {
                              var open = ref.open
                              return [
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn--icon btn btn-primary",
                                    attrs: { type: "button" },
                                    on: { click: open },
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "fa fa-plus --icon-left",
                                    }),
                                    _vm._v(
                                      "\n\n                        " +
                                        _vm._s(
                                          _vm.model.getSettings(
                                            "buttons.create",
                                            _vm.trans("new-row")
                                          )
                                        ) +
                                        "\n                    "
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                        ],
                        null,
                        false,
                        1987946451
                      ),
                    })
                  : _vm._e(),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("custom-components", {
            attrs: { model: _vm.model, type: "table-header" },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.model.isHiddenMode(),
              expression: "!model.isHiddenMode()",
            },
          ],
          staticClass: "box-body box-body--table",
        },
        [
          _c("table-rows", {
            attrs: {
              model: _vm.model,
              buttons: _vm.rows.buttons,
              count: _vm.rows.count,
              rows: _vm.rows,
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.model.isHiddenMode(),
              expression: "!model.isHiddenMode()",
            },
          ],
          staticClass: "box-footer",
        },
        [
          _c("custom-components", {
            attrs: { model: _vm.model, type: "table-footer" },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "box-footer__actions" }, [
            _c("div", { staticClass: "box-footer__left" }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "box-footer__center" },
              [
                _vm.model.isPaginationEnabled()
                  ? _c("pagination", { attrs: { model: _vm.model } })
                  : _vm._e(),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "box-footer__right" },
              [
                _c("PaginationLimit", {
                  attrs: { model: _vm.model, rows: _vm.rows },
                }),
              ],
              1
            ),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _vm.rows.refreshing ? _c("refreshing") : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hasFieldValue || _vm.hasComponent
    ? _c(
        "div",
        [
          _vm.hasComponent
            ? _c(_vm.componentName(_vm.model, _vm.settings.component), {
                tag: "component",
                attrs: {
                  mutatedValue: _vm.fieldValue,
                  value: _vm.item[_vm.field],
                  field: _vm.settings.field,
                  row: _vm.item,
                  model: _vm.model,
                },
              })
            : _vm.isColor
            ? _c("div", { style: { color: _vm.fieldValueLimitedAndEncoded } }, [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.fieldValueLimitedAndEncoded) +
                    "\n    "
                ),
              ])
            : _vm.isFile
            ? _c(
                "div",
                { staticClass: "filesList" },
                _vm._l(_vm.getFiles, function (file, index) {
                  return _c(
                    "div",
                    [
                      _c("file", {
                        attrs: {
                          file: file,
                          field: _vm.field,
                          model: _vm.model,
                          image: _vm.image,
                        },
                      }),
                      _vm._v(" "),
                      index != _vm.getFiles.length - 1
                        ? _c("span", [_vm._v(", ")])
                        : _vm._e(),
                    ],
                    1
                  )
                }),
                0
              )
            : _c("span", {
                attrs: {
                  "data-toggle":
                    _vm.fieldValue.length > _vm.settings.string_limit
                      ? "tooltip"
                      : "",
                  "data-original-title": _vm.onlyEncodedTitle,
                },
                domProps: {
                  innerHTML: _vm._s(_vm.fieldValueLimitedAndEncoded),
                },
              }),
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      staticClass: "table",
      class: {
        sortable: _vm.model.sortable && _vm.orderBy[0] == "_order",
        "table-sm": _vm.isSmallTable,
        "--box-padding-left": _vm.hasTablePadding,
      },
      attrs: {
        id: "table-" + _vm.model.slug,
        "data-table-rows": _vm.model.slug,
        "data-depth": _vm.model.getData("depth_level"),
      },
    },
    [
      _c("thead", { attrs: { "data-table-head": "" } }, [
        _c(
          "tr",
          [
            _vm.model.isDragEnabled()
              ? _c("th", { staticClass: "row-draggable" })
              : _vm._e(),
            _vm._v(" "),
            _vm.hasCheckingEnabled
              ? _c(
                  "th",
                  {
                    staticClass: "select-row-checkbox",
                    on: { click: _vm.toggleAllCheckboxes },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "checkbox-box",
                        attrs: {
                          "data-toggle": "tooltip",
                          title: _vm.trans(
                            _vm.isCheckedAll ? "uncheck-all" : "check-all"
                          ),
                        },
                      },
                      [
                        _c("input", {
                          attrs: { type: "checkbox" },
                          domProps: { checked: _vm.isCheckedAll },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "checkmark fa" }),
                      ]
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.hasIndicatorInTable ? _c("th") : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.columns, function (name, field) {
              return _c(
                "th",
                {
                  class: [
                    "th-" + field,
                    { "th-increment": _vm.model.getKeyName() == field },
                  ],
                  on: {
                    click: function ($event) {
                      return _vm.toggleSorting(field)
                    },
                  },
                },
                [
                  _vm.orderBy[0] == field && _vm.orderBy[1] == 0
                    ? _c("i", { staticClass: "arrow-sorting fa fa-angle-up" })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.orderBy[0] == field && _vm.orderBy[1] == 1
                    ? _c("i", { staticClass: "arrow-sorting fa fa-angle-down" })
                    : _vm._e(),
                  _vm._v(
                    "\n                " + _vm._s(name) + "\n            "
                  ),
                ]
              )
            }),
            _vm._v(" "),
            _c("th", { staticClass: "th-options-buttons" }),
          ],
          2
        ),
      ]),
      _vm._v(" "),
      _c(
        _vm.model.isDragEnabled() ? "draggable" : "tbody",
        _vm._b(
          {
            tag: "component",
            attrs: { tag: "tbody", list: _vm.sortedRows },
            on: {
              start: function ($event) {
                return _vm.model.onDragStart($event)
              },
              change: function ($event) {
                return _vm.model.onDragChange($event)
              },
            },
          },
          "component",
          _vm.model.isDragEnabled() ? _vm.model.getDragOptions() : {},
          false
        ),
        _vm._l(_vm.sortedRows, function (item, key) {
          return _c(
            "tr",
            {
              key: item.id,
              class: _vm.getRowClass(item),
              attrs: { "data-id": item.id },
            },
            [
              _vm.model.isDragEnabled()
                ? _c(
                    "td",
                    {
                      staticClass: "row-draggable",
                      on: {
                        click: function ($event) {
                          return _vm.checkRow(item.id, $event)
                        },
                      },
                    },
                    [_c("i", { staticClass: "fa fa-grip-vertical" })]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.hasCheckingEnabled
                ? _c(
                    "td",
                    {
                      staticClass: "select-row-checkbox",
                      on: {
                        click: function ($event) {
                          return _vm.checkRow(item.id, $event)
                        },
                      },
                    },
                    [
                      item["$checkbox.slot"]
                        ? _c("span", {
                            staticClass: "checkbox-box-slot",
                            domProps: {
                              innerHTML: _vm._s(item["$checkbox.slot"]),
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "checkbox-box" }, [
                        _c("input", {
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked:
                              _vm.model.getChecked().indexOf(item.id) > -1,
                          },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "checkmark fa" }),
                      ]),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.hasIndicatorInTable
                ? _c(
                    "td",
                    {
                      staticClass: "row-indicator",
                      attrs: {
                        "data-toggle": "tooltip",
                        title: item.$indicator
                          ? item.$indicator.name || item.$indicator.title
                          : "",
                      },
                    },
                    [
                      item.$indicator
                        ? _c("i", {
                            class: item.$indicator.class,
                            style: { background: item.$indicator.color },
                          })
                        : _vm._e(),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.columns, function (name, field) {
                return _c(
                  "td",
                  {
                    key: item.id + "-" + field,
                    class: [
                      "td-" + field,
                      {
                        "--clickable": _vm.isTableClickable,
                        "td-increment": _vm.model.getKeyName() == field,
                      },
                    ],
                    attrs: {
                      "data-field": field,
                      "data-type": _vm.fieldType(field),
                    },
                    on: {
                      click: function ($event) {
                        return _vm.selectRowFromTable($event, item, field)
                      },
                    },
                  },
                  [
                    _c("table-row-value", {
                      attrs: {
                        settings: _vm.getCachableColumnsSettings(field),
                        columns: _vm.columns,
                        field: field,
                        name: name,
                        item: item,
                        model: _vm.model,
                      },
                    }),
                  ],
                  1
                )
              }),
              _vm._v(" "),
              _c(
                "td",
                {
                  staticClass: "buttons-options",
                  attrs: { "data-model": _vm.model.slug },
                },
                [_c("Actions", { attrs: { model: _vm.model, row: item } })],
                1
              ),
            ],
            2
          )
        }),
        0
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);