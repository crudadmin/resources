(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled'],
  methods: {
    changeValue: function changeValue(e) {
      this.$parent.changeValue(e);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'depth_level'],
  mounted: function mounted() {
    var _this2 = this;

    this.bindDatepickers();
    eventHub.$on('updateField', this.onUpdateEvent = function (data) {
      if (data.table != _this2.model.slug || data.depth_level != _this2.depth_level || data.key != _this2.$parent.field_key) return;

      _this2.bindDatepickers();
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('updateField', this.onUpdateEvent);
  },
  computed: {
    isMultipleDatepicker: function isMultipleDatepicker() {
      return this.field.multiple == true;
    },
    getMultiDates: function getMultiDates() {
      var _this3 = this;

      var value = this.field.value || [];
      if (!$.isArray(value)) value = []; //Check correct inputs values

      return _.cloneDeep(value).filter(function (item) {
        return item.length == (_this3.field.type == 'time' ? 5 : 10);
      });
    }
  },
  methods: {
    getInput: function getInput() {
      return $(this.$refs.input);
    },
    bindDatepickers: function bindDatepickers() {
      if (this.readonly === true) {
        return;
      }

      var _this = this;

      this.getInput().datetimepicker({
        lang: this.$root.locale,
        format: this.field.date_format,
        timepicker: this.field.type != 'date',
        datepicker: this.field.type != 'time',
        scrollInput: false,
        timepickerScrollbar: false,
        step: this.field.date_step ? parseInt(this.field.date_step) : 30,
        scrollMonth: false,
        scrollYear: false,
        inline: this.isMultipleDatepicker,
        onGenerate: function onGenerate(ct) {
          _this.onGenerate(this, ct);
        },
        onChangeDateTime: this.onChangeDateTime
      });
    },
    onGenerate: function onGenerate(el, ct) {
      if (!this.isMultipleDatepicker) return;
      el.addClass('multiple-dates');
      var values = this.getMultiDates;

      for (var i = 0; i < values.length; i++) {
        var date = this.field.type == 'time' ? values[i].split(':') : new Date(values[i]);
        var selector = this.field.type == 'time' ? 'div[data-hour="' + parseInt(date[0]) + '"][data-minute="' + parseInt(date[1]) + '"]' : 'td[data-date="' + date.getDate() + '"][data-month="' + date.getMonth() + '"][data-year="' + date.getFullYear() + '"]';
        el.find(selector).addClass('multiple-selected');
      }
    },
    onChangeDateTime: function onChangeDateTime(current_date_time) {
      if (!current_date_time) return; //Update multi date value

      if (this.isMultipleDatepicker) {
        var pickedDate = moment(current_date_time).format(this.field.type == 'time' ? 'HH:mm' : 'YYYY-MM-DD');
        var value = this.getMultiDates,
            index = value.indexOf(pickedDate);
        if (index > -1) value.splice(index, 1);else value.push(pickedDate);
        this.changeValue(null, value);
      } //Update single date value
      else {
          var pickedDate = moment(current_date_time).format(this.$root.fromPHPFormatToMoment(this.field.date_format));
          this.changeValue(null, pickedDate);
        }
    },
    getMultiDateValue: function getMultiDateValue(time) {
      if (this.field.type == 'time' && time.length == 5 && time[2] == ':') return time;
      return moment(time).format('YYYY-MM-DD');
    },
    changeValue: function changeValue(e, date) {
      this.$parent.changeValue(e, date);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/FileField.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/FileField.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Partials/File.vue */ "./src/Resources/js/components/Partials/File.vue");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'row', 'model', 'field_name', 'field_key', 'field_key_original', 'field', 'value', 'required', 'disabled', 'depth_level'],
  components: {
    File: _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      file_will_remove: false,
      file_from_server: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.addMultipleFilesSupport(true);
    eventHub.$on('updateField', this.onUpdateEvent = function (data) {
      if (data.table != _this.model.slug || data.depth_level != _this.depth_level || data.key != _this.$parent.field_key) return;
      _this.file_from_server = true;

      _this.addMultipleFilesSupport();
    });
    eventHub.$on('onSubmit', this.onSubmitEvent = function (data) {
      var row = data.row;
      if (data.table != _this.model.slug || data.depth_level != _this.depth_level) return;
      if (_this.file_from_server == true && row != null) return;
      _this.file_from_server = row ? true : false;
      _this.field.value = row ? row[_this.field_key] : ''; //Reset input value after file has been sent

      $(_this.$refs.fileInput).val('');
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('updateField', this.onUpdateEvent);
    eventHub.$off('onSubmit', this.onSubmitEvent);
  },
  computed: {
    canFileBeDeleted: function canFileBeDeleted() {
      return !this.disabled && (this.value && !this.isMultipleUpload || !this.file_from_server) && this.model.getSettings('fields.' + this.field_key + '.canDelete', true);
    },
    canFileBeDownloaded: function canFileBeDownloaded() {
      return this.value && !this.hasMultipleFilesValue && this.file_from_server && !this.isMultiple && this.model.getSettings('fields.' + this.field_key + '.canDownload', true);
    },
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    },
    isMultiple: function isMultiple() {
      return this.field.multiple === true;
    },
    isMultirows: function isMultirows() {
      return this.field.multirows && this.field.multirows === true;
    },
    isMultipleUpload: function isMultipleUpload() {
      return this.isMultirows && !this.isOpenedRow || this.isMultiple;
    },
    hasMultipleFilesValue: function hasMultipleFilesValue() {
      return $.isArray(this.field.value);
    },
    hasLocale: function hasLocale() {
      return 'locale' in this.field;
    },
    getFiles: function getFiles() {
      var value = this.value;
      if (!value) return [];
      if ($.isArray(value)) return value;
      return [value];
    }
  },
  methods: {
    changeValue: function changeValue(e) {
      this.$parent.changeValue(e);
    },
    addMultipleFilesSupport: function addMultipleFilesSupport(with_watcher) {
      var _this2 = this;

      //Update multiple files upload
      if (this.field.type == 'file' && this.isMultiple && !this.isMultirows) {
        $(this.$refs.multipleFiles).chosen({
          disable_search_threshold: 10,
          search_contains: true
        }).trigger('chosen:updated');
      } //On update value


      if (with_watcher == true) {
        this.$watch('field.value', function () {
          _this2.$nextTick(function () {
            $(_this2.$refs.multipleFiles).trigger('chosen:updated');
          });
        });
      }
    },
    removeFile: function removeFile() {
      if (!this.isMultiple) {
        if (this.hasLocale) this.field.value[this.langslug] = null;else this.field.value = null;
      }

      this.file_will_remove = true;
      this.file_from_server = true;
      $('#' + this.getId).val('');
    },
    addFile: function addFile(e) {
      this.file_will_remove = false;
      this.file_from_server = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/NumberField.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/NumberField.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly'],
  computed: {
    isDecimal: function isDecimal() {
      return this.field.type == 'decimal';
    },
    getDecimalStep: function getDecimalStep() {
      var length = '',
          decimalLength = ((this.field.decimal_length || '').replace(':', ',') || '8,2').split(','),
          step = '0.' + _.repeat(0, decimalLength[1] - 1) + '1';
      return step;
    }
  },
  methods: {
    changeValue: function changeValue(e) {
      this.$parent.changeValue(e);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/RadioField.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/RadioField.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled'],
  computed: {
    isPassword: function isPassword() {
      return this.field.type == 'password';
    }
  },
  methods: {
    hasValue: function hasValue(key, value, multiple) {
      return (key || key == 0) && value && key == value;
    },
    changeValue: function changeValue(e) {
      this.$parent.changeValue(e);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/SelectField.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/SelectField.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Views_ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Views/ModelBuilder.vue */ "./src/Resources/js/components/Views/ModelBuilder.vue");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'row', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'inputlang', 'langid', 'depth_level'],
  data: function data() {
    return {
      filterBy: null,
      allowRelation: false
    };
  },
  watch: {
    value: function value(_value) {
      this.$nextTick(this.reloadSelectWithMultipleOrders);
    },
    //If disabled state has been changed, we need reload field
    disabled: function disabled() {
      this.$nextTick(this.reloadSelectWithMultipleOrders);
    },
    readonly: function readonly() {
      this.$nextTick(this.reloadSelectWithMultipleOrders);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    /*
     * Fix for double recursion in VueJS
     */
    this.$options.components['model-builder'] = Vue.extend(_Views_ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
    this.onChangeSelect();
    this.bindFilters();
    eventHub.$on('updateField', this.onUpdateEvent = function (data) {
      if (data.table != _this2.model.slug || data.depth_level != _this2.depth_level || data.key != _this2.$parent.field_key) return;

      _this2.$nextTick(_this2.reloadSelectWithMultipleOrders);
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('updateField', this.onUpdateEvent);
  },
  computed: {
    isCanAddInParentMode: function isCanAddInParentMode() {
      return ['parent'].indexOf(this.field.canAdd) > -1;
    },
    modelBuilderId: function modelBuilderId() {
      if (this.isCanAddInParentMode) {
        return this.id + this.row.id;
      }

      return 'key';
    },
    getModalId: function getModalId() {
      return 'form-relation-modal-' + this.id;
    },
    relationTable: function relationTable() {
      return (this.field.belongsTo || this.field.belongsToMany || '').split(',')[0];
    },
    getRelationModel: function getRelationModel() {
      if (!this.canAddRow) {
        return;
      }

      return _.cloneDeep(this.$root.models[this.relationTable]);
    },
    getRelationRow: function getRelationRow() {
      var filterBy = this.getFilterBy;
      if (!filterBy || !this.row[filterBy[0]]) return {};
      return {
        id: this.row[filterBy[0]]
      };
    },

    /*
     * Return model of parent filtration field
     */
    getRelationModelParent: function getRelationModelParent() {
      var filterBy = this.getFilterBy;
      if (!filterBy || !this.row[filterBy[0]]) return false;
      var field = this.model.fields[filterBy[0]],
          relationTable = (field.belongsTo || field.belongsToMany).split(',')[0];
      return _.cloneDeep(this.$root.models[relationTable]);
    },

    /*
     * Can show adding row just for first level of forms (not when user click to add new row in form),
     * and also when is filter activated, then show just when is filter also selected
     */
    canAddRow: function canAddRow() {
      if (!this.field.canAdd) {
        return false;
      }

      var relatedModel = this.$root.models[this.relationTable];
      return (!relatedModel || relatedModel.hasAccess('insert')) && (this.field.canAdd === true || this.isCanAddInParentMode) && (!this.getFilterBy || this.filterBy); //if we would like to disable canAdd option in already opened form throught canAdd button
      // && this.isModalInModal == false
    },
    isModalInModal: function isModalInModal() {
      return this.$parent.hasparentmodel === false;
    },
    canAddScopes: function canAddScopes() {
      if (this.isCanAddInParentMode == false) {
        return {};
      }

      return {
        'filterByParentField': [this.model.table, this.field_key, this.row.id]
      };
    },
    getFilterBy: function getFilterBy() {
      if (!('filterBy' in this.field)) return null;
      var filterBy = this.field.filterBy.split(','),
          column; //Get column of relation field

      this.model.fields[column = filterBy[0] + '_id'] || this.model.fields[column = filterBy[0]];
      filterBy[0] = column;
      return filterBy;
    },
    isMultiple: function isMultiple() {
      return this.field.multiple && this.field.multiple === true || 'belongsToMany' in this.field;
    },
    fieldOptions: function fieldOptions() {
      if (_typeof(this.field.options) != 'object') return []; //On change fields options rebuild select

      this.$nextTick(this.reloadSelectWithMultipleOrders);
      return this.$root.languageOptions(this.field.options, this.field, this.getFilter(this.field.options));
    },
    missingValueInSelectOptions: function missingValueInSelectOptions() {
      if (!this.row) return [];
      var options = this.fieldOptions,
          missing = [],
          original_value = this.$parent.getLocalizedValue(this.field.$original_value); //For multiple selects

      if (this.isMultiple) {
        if (original_value) {
          for (var i = 0; i < original_value.length; i++) {
            var searched = options.filter(function (item) {
              return item[0] == original_value[i];
            }.bind(this)); //Add missing values, when is filter off

            if (searched.length == 0 && !this.filterBy) {
              missing.push(original_value[i]);
            }
          }
        }
      } //For single select
      else {
          //Check if is value in options
          for (var i = 0; i < options.length; i++) {
            if (options[i][0] == original_value) return [];
          }

          return this.filterBy || [null, undefined].indexOf(original_value) > -1 ? [] : [original_value];
        }

      return missing;
    },
    isRequiredIfHasValues: function isRequiredIfHasValues() {
      return 'required_with_values' in this.field && this.field.required_with_values == true && this.fieldOptions.length > 0;
    },
    hasNoFilterValues: function hasNoFilterValues() {
      //If foreign key identificator is not field, bud static foreign key column
      if (this.isStaticFilterColumn) return false;
      return this.getFilterBy && (!this.filterBy || this.fieldOptions.length == 0);
    },
    isStaticFilterColumn: function isStaticFilterColumn() {
      return this.getFilterBy && !(this.getFilterBy[0] in this.model.fields);
    },
    isParentFilterColumn: function isParentFilterColumn() {
      return this.getFilterBy && this.getFilterBy[0].split('.').length > 1;
    },

    /*
     * Return value of relation column from actual model or parent model by slug
     */
    getStaticFilterBy: function getStaticFilterBy() {
      var column = this.getFilterBy[0].split('.'),
          model = column.length == 2 ? this.$parent.getModelBuilder(column[0]) : this;
      return model.row[column[column.length - 1]];
    }
  },
  methods: {
    /*
     * Close only this modal, not all opened. Because canAdd can be opened multiple times inside another modal
     */
    closeOpenedCanAddModal: function closeOpenedCanAddModal() {
      $('#' + this.getModalId).modal('hide').on('hidden.bs.modal', function () {
        //If multiple modals are opened all the time, also after modal close. We want add
        //model-open class into body, for support of scrolling modal.
        if ($('.modal .modal-header:visible').length > 0) {
          $('body').addClass('modal-open');
        }
      });
    },

    /*
     * If field has filters, then check of other fields values for filtrating
     */
    bindFilters: function bindFilters() {
      //If is filterer key is not from parent model
      if (!this.getFilterBy || this.isParentFilterColumn) return;
      this.$watch('model.fields.' + this.getFilterBy[0] + '.value', function (value) {
        //If is empty value setted after reseting form, then set null or default field value
        if (value === null) {
          this.filterBy = this.$parent.defaultFieldValue(this.model.fields[this.getFilterBy[0]]);
        } //If is empty value type '', or value, then set given input
        else {
            this.filterBy = value;
          }
      });
      this.filterBy = this.$parent.defaultFieldValue(this.model.fields[this.getFilterBy[0]]);
    },
    changeValue: function changeValue(e, value, no_field) {
      this.$parent.changeValue(e, value, no_field);
    },

    /*
     * Apply on change events into selectbox
     */
    onChangeSelect: function onChangeSelect() {
      var _this4 = this;

      var select = $(this.$refs.select),
          is_change = false,
          _this = this;

      select.change(function (e) {
        var _this3 = this;

        is_change = true;

        if (_this.isMultiple) {
          //Chosen need to be updated after delay for correct selection order
          setTimeout(function () {
            //Send values in correct order
            _this.changeValue(null, $(_this3).getSelectionOrder()); //Update fake select on change value


            _this.rebuildSelect();
          }, 50);
        } else {
          var value = $(this).val();

          _this.changeValue(null, value);

          _this.reloadSetters(value);
        }
      }); //If field value has been updated by setter and not by the user

      this.$watch('field.value', function (value, oldvalue) {
        if (is_change === true || _.isNil(value) || value === oldvalue || _.isEqual(value, oldvalue)) {
          is_change = false;
          return;
        } //Update selects when vuejs is fully rendered


        _this4.$nextTick(_this4.reloadSelectWithMultipleOrders);
      });
    },
    hasValue: function hasValue(key, value, multiple) {
      if (multiple == true && $.isArray(value)) {
        if (value.indexOf($.isNumeric(key) ? parseInt(key) : key) > -1) return true;
      } else if ((key || key == 0) && (value || value == 0) && key == value) {
        return true;
      }

      return false;
    },
    rebuildSelect: function rebuildSelect() {
      //If is not multiple select
      if (!this.isMultiple) return;
      var select = $(this.$refs.select),
          fake_select = select.prev();
      var values = select.getSelectionOrder();
      if (!fake_select.is('select')) fake_select = select.before('<select name="' + this.field_key + '[]" multiple="multiple" style="display: none"></select>').prev(); //Remove inserted options

      fake_select.find('option').remove();

      for (var i = 0; i < values.length; i++) {
        fake_select.append($('<option></option>').attr('selected', true).attr('value', values[i]).text(values[i]));
      }
    },
    reloadSelectWithMultipleOrders: function reloadSelectWithMultipleOrders() {
      var select = $(this.$refs.select).chosen({
        disable_search_threshold: 10,
        search_contains: true
      }).trigger('chosen:updated'); //Rebuild multiple order into fake select which will send data into request

      if (this.isMultiple) {
        //Set selection order into multiple select
        if (this.field.value) {
          //Error exception when is some options missing, or filtrated by filters
          try {
            select.setSelectionOrder(this.field.value);
          } catch (e) {}
        }

        this.rebuildSelect();
      }
    },
    getFilter: function getFilter(options) {
      var filter = {};
      if (options && options[0] && _typeof(options[0][1]) == 'object' && options[0][1] !== null && 'language_id' in options[0][1] == true) filter['language_id'] = this.row.language_id || (this.inputlang ? this.inputlang.id : null) || this.langid;
      if (this.getFilterBy) filter[this.getFilterBy[1]] = this.isStaticFilterColumn ? this.getStaticFilterBy : this.filterBy;
      return filter;
    },
    pushOption: function pushOption(row, action) {
      //Store or update option field
      if (action == 'store') {
        var filterBy = this.getFilterBy; //Add relation into added row

        if (filterBy && this.row[filterBy[0]]) row[filterBy[1]] = this.row[filterBy[0]]; //Push added option into array

        this.field.options.unshift([row.id, row]); //Set multiple values or one value

        if (this.isMultiple) {
          if (!this.field.value) this.field.value = [row.id];else this.field.value.push(row.id);
          this.changeValue(null, this.field.value, false);
        } else {
          this.changeValue(null, row.id);
        }
      } else if (action == 'update') {
        for (var i = 0; i < this.field.options.length; i++) {
          if (this.field.options[i][0] == row.id) {
            for (var key in row) {
              this.field.options[i][1][key] = row[key];
            }
          }
        }
      } else if (action == 'delete') {
        //Remove value also from field values
        if (this.isMultiple) {
          if ($.isArray(this.field.value)) {
            this.field.value.splice(this.field.value.indexOf(row), 1);
            this.changeValue(null, this.field.value, false);
          }
        } else if (this.field.value == row) {
          this.changeValue(null, null);
        } //Remove deleted field from options


        for (var key in this.field.options) {
          if (this.field.options[key][0] == row) {
            this.field.options.splice(key, 1);
            break;
          }
        }
      }
    },

    /*
     * If field has setters, then check for change of changer field
     */
    reloadSetters: function reloadSetters(value) {
      for (var key in this.model.fields) {
        var field = this.model.fields[key],
            fillBy = this.getFillBy(field);
        if (!fillBy || !fillBy[0] || fillBy[0] != this.field_key && fillBy[0] + '_id' != this.field_key) continue;
        var options = this.field.options || [];

        for (var k in options) {
          //Skip other values
          if (options[k][0] != value) continue;
          this.$set(this.row, key, options[k][1][fillBy[1] || key]);
          break;
        }
      }
    },
    getFillBy: function getFillBy(field) {
      if (!('fillBy' in field)) return null;
      var filterBy = field.fillBy.replace(',', '.').split('.'),
          column; //Get column of relation field

      this.model.fields[column = filterBy[0] + '_id'] || this.model.fields[column = filterBy[0]];
      filterBy[0] = column;
      return filterBy;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/StringField.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/StringField.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly'],
  computed: {
    isPassword: function isPassword() {
      return this.field.type == 'password';
    }
  },
  methods: {
    changeValue: function changeValue(e) {
      this.$parent.changeValue(e);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/TextField.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/TextField.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'depth_level'],
  mounted: function mounted() {
    var _this = this;

    var editor = $('#' + this.id).ckEditors(); //On update ckeditor

    if (this.isEditor) {
      CKEDITOR.instances[this.id].on('change', function (e) {
        _this.$parent.changeValue(null, e.editor.getData());
      });
    }

    eventHub.$on('updateField', this.onUpdateEvent = function (data) {
      if (data.table != _this.model.slug || data.depth_level != _this.depth_level || data.key != _this.$parent.field_key) return; //After change value, update same value in ckeditor

      if (!_this.isEditor) return;
      var editor = CKEDITOR.instances[_this.id];
      if (!editor) return;
      var value = _this.$parent.getLocalizedValue(_this.field.value) || '';
      editor.setData(value); // If is editor not ready yet, then wait for ready state.
      // We need set data also on instance ready, because of bug in single admin model when switching pages...
      // Somethimes data wont be loaded properly.

      editor.on('instanceReady', function () {
        //If multiple ready events will be triggered, bing only last valid value from event.
        //If all events will be binded into ckeditor at same time. It may have buggy value.
        if (_this.onReadyInstance) {
          clearTimeout(_this.onReadyInstance);
        }

        _this.onReadyInstance = setTimeout(function () {
          if (_.trim(editor.getData()) != _.trim(value)) {
            editor.setData(value);
          }
        }, 20);
      });
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('updateField', this.onUpdateEvent);
  },
  computed: {
    isText: function isText() {
      return ['text', 'longtext'].indexOf(this.field.type) > -1;
    },
    isEditor: function isEditor() {
      return ['editor', 'longeditor'].indexOf(this.field.type) > -1;
    }
  },
  methods: {
    changeValue: function changeValue(e) {
      this.$parent.changeValue(e);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Forms_FormTabsBuilder_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Forms/FormTabsBuilder.vue */ "./src/Resources/js/components/Forms/FormTabsBuilder.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-builder',
  props: ['formID', 'model', 'row', 'rows', 'langid', 'canaddrow', 'progress', 'history', 'hasparentmodel', 'selectedlangid', 'gettext_editor', 'depth_level', 'parentActiveGridSize'],
  components: {
    FormTabsBuilder: _Forms_FormTabsBuilder_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      submit: false,
      isActive: true,
      cansave: true,
      form: null
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    //Initialize form
    this.form = $('#' + this.formID);
    eventHub.$on('changeFormSaveState', this.changeFormSaveStateEvent = function (data) {
      if (data.model != _this2.model.slug) return; //Change if form can show send/save button
      //in other tab, button need to be hidden

      _this2.cansave = data.state;
    });
    /*
     * When row is updated, then bind data from incoming request/database into model row and his values
     */

    eventHub.$on('onUpdate', this.onUpdateEvent = function (data) {
      if (data.table != _this2.model.slug || data.depth_level != _this2.depth_level) return; //Update model data of existing model on row update

      for (var key in data.row) {
        _this2.row[key] = data.row[key]; //Update values in fields cause updating files in form

        if (key in _this2.model.fields) {
          _this2.model.fields[key].value = data.row[key];
        }
      }
    }); //On create form instance, we need initialize given row.
    //For example if single model is loaded from database as relation, but FormBuilder is not loaded yet
    //Then we need insert row data after FormBuilder initialization.
    //We also does not want sent empty event for single model. Because CKEditor will be buggy with content. So this event
    //can be triggered only when model is not single, or has any data.
    // if ( ! this.model.isSingle() || this.row.id ){

    this.initForm(this.row); // }
  },
  destroyed: function destroyed() {
    eventHub.$off('changeFormSaveState', this.changeFormSaveStateEvent);
    eventHub.$off('onUpdate', this.onUpdateEvent);
  },
  watch: {
    //After click on edit button, push data into form values
    row: {
      handler: function handler(row, oldRow) {
        //Form cannot be resetted if data has been synced from db
        var canResetForm = !this.isOpenedRow || !oldRow || row.id != oldRow.id; //Init new form after change row

        if (!row || !oldRow || row.id != oldRow.id || this.history.history_id) {
          this.initForm(row, canResetForm);
          this.$parent.sendRowData();
        }
      },
      deep: true
    } //On change language reset editing form
    // langid(langid){
    //   this.$parent.resetForm();
    // },

  },
  computed: {
    formType: function formType() {
      return this.model.isInParent() ? 'div' : 'form';
    },
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    },
    title: function title() {
      var title;

      if (this.isOpenedRow) {
        //If update title has not been set
        if (!(title = this.$root.getModelProperty(this.model, 'settings.title.update'))) return this.trans('edit-row-n') + ' ' + this.row.id; //Bind value from row to title

        for (var key in this.row) {
          var value = this.row[key];

          if (this.isFieldSelect(key)) {
            var values = this.$root.languageOptions(this.model.fields[key].options, key);

            for (var i = 0; i < values.length; i++) {
              if (values[i][0] == value) {
                value = values[i][1];
                break;
              }
            }
          } //Return localized value


          if (_typeof(value) == 'object') {
            for (var k in value) {
              if (value[k]) {
                value = value[k];
                break;
              }
            }
          }

          title = title.replace(':' + key, value);
        }

        return title;
      } //Insert title
      else if ((title = this.$root.getModelProperty(this.model, 'settings.title.insert')) || (title = this.$root.getModelProperty(this.model, 'settings.title.create'))) {
          return title;
        }

      return this.trans('new-row');
    },
    newRowTitle: function newRowTitle() {
      return this.$parent.newRowTitle();
    },
    saveButton: function saveButton() {
      return this.$root.getModelProperty(this.model, 'settings.buttons.update') || this.trans('save');
    },
    sendButton: function sendButton() {
      return this.$root.getModelProperty(this.model, 'settings.buttons.insert') || this.trans('send');
    },
    hasLocaleFields: function hasLocaleFields() {
      for (var key in this.model.fields) {
        if (this.model.fields[key].locale == true) return true; //If some field has localized options rows

        var options = this.model.fields[key].options;
        if (options && options[0] && _typeof(options[0][1]) == 'object' && options[0][1] !== null && 'language_id' in options[0][1] == true) return true;
      }

      return false;
    },
    languages: function languages() {
      return this.$root.languages;
    },
    selectedLanguage: function selectedLanguage() {
      if (!this.selectedlangid) return this.languages[0];

      for (var key in this.languages) {
        if (this.languages[key].id == this.selectedlangid) return this.languages[key];
      }

      return this.languages[0];
    },
    canUpdateForm: function canUpdateForm() {
      //We cant save form in history row is opened
      if (this.history.history_id) {
        return false;
      }

      if (this.isOpenedRow && this.$root.getModelProperty(this.model, 'settings.editable') == false) {
        return false;
      }

      if (!this.model.hasAccess('update')) {
        return false;
      } //Model cannot be updated, when is inParent relation


      if (this.model.isInParent()) {
        return false;
      }

      return this.cansave;
    },
    canShowGettext: function canShowGettext() {
      if (['languages', 'admin_languages'].indexOf(this.model.slug) > -1 && this.$root.gettext && this.model.hasAccess('update')) {
        return true;
      }

      return false;
    },
    getAdditionalFormData: function getAdditionalFormData() {
      //Data for request
      var data = {
        _model: this.model.slug
      }; //Check if form belongs to other form

      if (this.model.foreign_column != null && this.$parent.parentrow) {
        data[this.model.foreign_column[this.$parent.getParentTableName()]] = this.$parent.parentrow.id;
      }

      if (this.model.global_relation && this.$parent.parentrow && this.$parent.getParentTableName(true)) {
        data['_table'] = this.$parent.getParentTableName(true);
        data['_row_id'] = this.$parent.parentrow.id;
      } //If is updating, then add row ID


      if (this.getFormAction == 'update') {
        data['_id'] = this.row.id;
        data['_method'] = 'put';
      } else {
        //Check if is enabled language
        if (this.langid) {
          data['language_id'] = this.langid;
        } //Push saved childs without actual parent row


        if (this.hasParentModel() && this.$parent.rows.save_children.length > 0) {
          data['_save_children'] = JSON.stringify(this.$parent.rows.save_children);
        }
      } //If we need mutate keys of additional form data


      var mutatedData = {};

      for (var key in data) {
        mutatedData[this.model.formPrefix() + key] = data[key];
      }

      return mutatedData;
    },
    getFormAction: function getFormAction() {
      return !this.isOpenedRow ? 'store' : 'update';
    }
  },
  methods: {
    changeLanguage: function changeLanguage(id) {
      this.$parent.selected_language_id = id;
    },
    getLangName: function getLangName(lang) {
      return this.$root.getLangName(lang);
    },
    showHistory: function showHistory(row) {
      this.$parent.showHistory(row);
    },
    getComponents: function getComponents(type) {
      return this.$parent.getComponents(type);
    },
    resetForm: function resetForm() {
      this.$parent.resetForm();
    },
    //Resets form values and errors
    initForm: function initForm(row, reset) {
      var is_row = row && 'id' in row; //Resets document values of elements
      //can be reseted just when is changed row for other, or inserting new row

      if (reset !== false) {
        for (var key in this.model.fields) {
          this.$set(this.model.fields[key], 'value', null);
        }
      }

      this.resetErrors();

      if (!is_row) {
        this.$parent.resetForm();
      } //Checks if form can be editable


      if (is_row && this.canaddrow && this.model.editable == false && this.$parent.hasChilds() == 0) {
        this.$parent.resetForm();
        return;
      }

      for (var key in this.model.fields) {
        if (!is_row || this.model.fields[key].value != row[key] || reset) {
          //Value can not be undefined, because of model change events.
          //If value will be undefined, full rows table will be realoaded (bug)
          var value = is_row ? row[key] : null,
              value = value === undefined ? null : value; //Set value and default value of field from database

          this.model.fields[key].value = value;
          this.model.fields[key].$original_value = value;
          eventHub.$emit('updateField', this.buildEventData({
            key: key,
            field: this.model.fields[key]
          }));
        }
      } //Set box color


      if (!is_row) {
        this.isActive = true;
        if (this.hasParentModel()) this.$parent.closeHistory();
      } else {
        this.isActive = row.published_at == null;
      }
    },
    resetErrors: function resetErrors() {
      this.form.find('.form-group.has-error').firstLevelForm(this.form[0]).removeClass('has-error').find('.help-block').remove();
      this.form.find('.far.fa-times-circle').firstLevelForm(this.form[0]).remove();
      this.form.find('.multi-languages .has-error').firstLevelForm(this.form[0]).removeClass('has-error');
      this.removeActiveTab(this.form.find('.nav-tabs li[has-error]').firstLevelForm(this.form[0]));
      this.$parent.progress = false;

      if (this.form._errorElements) {
        for (var i = 0; i < this.form._errorElements.length; i++) {
          this.form._errorElements[i].remove();
        }

        this.form._errorElements = [];
      }
    },
    sendForm: function sendForm(e, action, callback) {
      var _this3 = this;

      //Disable send already sent form
      if (this.submit == true) return; //Resets ckeditor values for correct value

      if (typeof CKEDITOR != 'undefined') {
        for (var key in CKEDITOR.instances) {
          CKEDITOR.instances[key].updateElement();
        }
      }

      this.resetErrors();
      this.$parent.progress = true;
      $(e.target).ajaxSubmit({
        url: this.$root.requests[action],
        success: function success(data) {
          _this3.submit = true;
          _this3.$parent.progress = false; //Error occured

          if ($.type(data) != 'object' || !('type' in data)) return _this3.unknownAjaxErrorResponse(); //Fix for resubmiting form after closing with enter

          setTimeout(function () {
            _this3.$root.openAlert(data.title, data.message, data.type, null, function () {
              //Timeout for sending new request with enter
              setTimeout(function () {
                _this3.submit = false;
              }, 500);
            });
          }, 100);
          callback(data);
        },
        error: function error(response) {
          _this3.resetErrors(); // Wrong validation


          _this3.$root.errorResponseLayer(response, 422, function () {
            var obj = response.responseJSON,
                errors = []; //Laravel 5.5+ provides validation errors in errors object.

            if ('errors' in obj && !('length' in obj.errors)) obj = obj.errors;

            for (var key in obj) {
              //One or multiple errors
              errors = typeof obj[key] == 'string' ? [obj[key]] : obj[key]; //Display errors

              _this3.bindErrorMessages(key, errors);
            }
          });
        }
      });
    },
    unknownAjaxErrorResponse: function unknownAjaxErrorResponse() {
      var _this4 = this;

      this.$root.arrorAlert(function () {
        _this4.$parent.progress = false; //Timeout for sending new request with enter

        setTimeout(function () {
          _this4.submit = false;
        }, 500);
      });
    },
    bindErrorMessages: function bindErrorMessages(key, errors) {
      var _this5 = this;

      var keys = [],
          parts = key.split('.');

      if (parts.length == 1 || parts.length == 2 && parts[1] == 0) {
        parts = [parts[0]];
        key = parts[0];
        keys.push(key);
        parts.push(0);
      }

      parts = parts.map(function (item, i) {
        if (i == 0) return item;
        return '[' + item + ']';
      });
      keys.push(parts.join('')); //Add multiple field support to each key prefix

      for (var i = 0; i < keys.length; i++) {
        if (keys[i].substr(-2) != '[]') {
          keys.push(keys[i] + '[]');
        }
      }

      for (var i = 0; i < errors.length; i++) {
        _.uniqBy(keys).map(function (key) {
          _this5.form.find('input[name="' + key + '"], select[name="' + key + '"], textarea[name="' + key + '"]').firstLevelForm(_this5.form[0]).each(_this5.showErrorMessage(errors[i], i));
        });
      }
    },
    showErrorMessage: function showErrorMessage(message, i) {
      var component = this;
      return function () {
        var where = $(this); //Colorize tabs

        component.colorizeTab($(this));
        component.colorizeLangDropdown($(this));

        if ($(this).is('select')) {
          where = where.parent().parent().children().last().prev();
        } else if ($(this).is('textarea')) {
          where = where.parent().children().last().prev();
        } else if ($(this).is('input:checkbox')) {
          where = where.next();
        } else if ($(this).is('input:radio') || $(this).parent().hasClass('label-wrapper')) {
          where = where.parent().parent().parent();
          if (where.find('.help-block').length == 0) where = where.children().last().prev();else where = null;
        } else if ($(this).parent().hasClass('input-group')) {
          where = $(this).parent();
        } //Where should be placed error messageblock


        if (where) {
          where.after('<span class="help-block">' + message + '</span>');
          component.addErrorElement(where.next());
        } //On first error


        if (i == 0) {
          var label = $(this).closest('div.form-group').addClass('has-error').find('> label');

          if (label.find('.fa-times-circle').length == 0) {
            label.prepend('<i class="far fa-times-circle"></i> ');
          }
        }
      };
    },
    addErrorElement: function addErrorElement(element) {
      if (!this.form._errorElements) {
        this.form._errorElements = [];
      }

      this.form._errorElements.push(element);
    },
    buildEventData: function buildEventData(data, model, isChild) {
      var model = model || this.model;
      return _objectSpread({
        table: model.slug,
        model: model,
        //If is child inParent relation, then add depth level + 1 for correct communication
        depth_level: this.depth_level + (isChild ? 1 : 0)
      }, data);
    },
    saveForm: function saveForm(e) {
      var _this6 = this;

      //We does not want to trigger inparent model
      if (this.model.isInParent()) return; //Devide if is updating or creating form

      var action = this.getFormAction;
      this.sendForm(e, action, function (response) {
        if (!response.data) return false; //Push new row

        if (action == 'store') {
          for (var key in response.data) {
            var clonedRow = _.cloneDeep(response.data[key].rows[0]),
                isParentRow = response.data[key].model == _this6.model.table,
                model = _this6.$root.models[response.data[key].model]; //Reset actual items buffer


            if (isParentRow && _this6.hasParentModel()) {
              _this6.saveParentChilds(response.data[key].rows);
            }

            var eventData = _this6.buildEventData({
              row: clonedRow,
              request: response.data[key]
            }, model, !isParentRow); //Bind values for input builder


            eventHub.$emit('onSubmit', eventData); //Send notification about new row

            eventHub.$emit('onCreate', eventData);

            if (isParentRow) {
              //If form has disabled autoreseting
              var autoreset = _this6.$root.getModelProperty(_this6.model, 'settings.autoreset'); //Reseting form after new row


              if (!_this6.model.isSingle() && autoreset !== false) {
                _this6.initForm(_this6.$parent.emptyRowInstance());
              } //If is disabled autoreseting form, then select inserted row
              else {
                  _this6.$parent.row = clonedRow;

                  _this6.scrollToForm();
                }
            }
          }
        } //Update existing row
        else if (action == 'update') {
            var rows = response.data.rows; //Update all updated models. Parent and also child data...

            for (var table in rows) {
              var clonedRow = _.cloneDeep(rows[table]),
                  isParentRow = table == _this6.model.table,
                  model = _this6.$root.models[table];

              var eventData = _this6.buildEventData({
                row: clonedRow,
                request: rows[table]
              }, model, !isParentRow); //Bind values for input builder


              eventHub.$emit('onSubmit', eventData); //Send notification about updated row

              eventHub.$emit('onUpdate', eventData);
            }
          } //Add or update select options


        if (_this6.hasparentmodel !== true) {
          var incomingRow = action == 'store' ? response.data[0].rows[0] : response.data.rows[_this6.model.table];

          _this6.$parent.$parent.pushOption(incomingRow, action);
        }
      });
    },
    removeActiveTab: function removeActiveTab(tab, all) {
      var removeFrom = tab.filter(function () {
        return all === true || !$(this).hasClass('model-tab');
      });
      removeFrom.removeAttr('data-toggle').removeAttr('data-original-title').removeAttr('has-error').tooltip("dispose").find('a > .fa.fa-exclamation-triangle').remove();
    },
    colorizeTab: function colorizeTab(input) {
      var _this = this;

      input.parents('.tab-pane').each(function () {
        var getActiveTab = function getActiveTab(panel) {
          var li = panel.parent().prev().find('li'),
              id = panel.attr('id') || panel.attr('data-tab-id'),
              tab; //This is support for custom tabs
          //If tab has gived ID, then find this tab in a element with same hashtag as tab id

          if (id) {
            tab = li.parent().add($('ul.nav.nav-tabs')).find('> li > a[href="#' + id + '"]');
          } //Return tab by id, if those tabs are custom


          if (tab && tab.length > 0) return tab.parent();
          return li.eq(panel.index());
        }; //On button click, remove tabs alerts in actual tree, if tab has no more recursive errors


        $(this).one('click', function () {
          if ($(this).find('.nav-tabs-custom:not(.default) li[has-error]').length == 0) {
            _this.removeActiveTab(getActiveTab($(this)), true);
          }
        });
        getActiveTab($(this)).each(function () {
          if ($(this).hasClass('has-error')) return;
          $(this).attr('data-toggle', 'tooltip').attr('data-original-title', _this.trans('tab-error')).attr('has-error', '').one('click', function () {
            var active = $(this).parents('.nav-tabs-custom').find('> .nav-tabs > li.active[has-error]').not($(this).parent().find('> li'));

            _this.removeActiveTab($([this].concat(active.toArray())), true);
          }).find('a').prepend('<i class="nav-link--icon-left fa fa-exclamation-triangle"></i>');
        });
      });
    },
    colorizeLangDropdown: function colorizeLangDropdown(input) {
      var field_wrapper = input.parents('.field-wrapper'),
          field_key = field_wrapper.attr('data-field'),
          field_lang = field_wrapper.attr('data-lang'),
          field_model = field_wrapper.attr('data-model');
      if (!field_key) return;
      var model = this.$root.models[field_model],
          field = model.fields[field_key];
      if (field.locale != true || field_lang == this.selectedLanguage.slug) return;
      var dropdown = this.form.find('.multi-languages .dropdown-toggle');
      dropdown.addClass('has-error');
      dropdown.next().find('li[data-slug="' + field_lang + '"]').addClass('has-error');
      if (field_lang == this.languages[0].slug) this.$root.openAlert(this.trans('warning'), this.trans('lang-error'), 'warning');
    },
    scrollToForm: function scrollToForm() {
      var _this7 = this;

      setTimeout(function () {
        _this7.scrollTo('#' + _this7.formID);
      }, this.$root.isTest ? 0 : 500);
    },
    hasParentModel: function hasParentModel() {
      return this.$parent.$options.name == 'model-builder';
    },
    saveParentChilds: function saveParentChilds(rows) {
      this.$parent.rows.save_children = []; //If actual row has no parent, and need to ba saved when parent will be saved

      if (this.$parent.isWithoutParentRow) {
        var parent = this.$parent.$parent;

        while (!('rows' in parent)) {
          parent = parent.$parent;
        }

        for (var i = 0; i < rows.length; i++) {
          parent.rows.save_children.push({
            table: this.model.slug,
            id: rows[i].id
          });
        }
      }
    },
    openGettextEditor: function openGettextEditor() {
      this.$parent.gettext_editor = this.row;
    },
    isFieldSelect: function isFieldSelect(column) {
      return column && column in this.model.fields && ['select', 'radio'].indexOf(this.model.fields[column].type) > -1 ? true : false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormGroup.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormGroup.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormTabsBuilder_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormTabsBuilder.vue */ "./src/Resources/js/components/Forms/FormTabsBuilder.vue");
/* harmony import */ var _FormInputBuilder_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormInputBuilder.vue */ "./src/Resources/js/components/Forms/FormInputBuilder.vue");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-group',
  props: ['model', 'row', 'history', 'group', 'langid', 'inputlang', 'hasparentmodel', 'depth_level'],
  components: {
    FormInputBuilder: _FormInputBuilder_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    FormTabsBuilder: _FormTabsBuilder_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  created: function created() {
    /*
     * Fir for double recursion in VueJS
     */
    this.$options.components['form-tabs-builder'] = Vue.extend(_FormTabsBuilder_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
  },
  computed: {
    tabsFields: function tabsFields() {
      var _this = this;

      return this.group.fields.filter(function (item) {
        return _this.isTab(item);
      });
    },
    visibleFields: function visibleFields() {
      return this.getVisibleFields(this.group.fields);
    },
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    }
  },
  methods: {
    getVisibleFields: function getVisibleFields(fields) {
      var _this2 = this;

      return (fields || []).filter(function (item) {
        if (typeof item == 'string') {
          var field = _this2.model.fields[item];
          return !(field.invisible && field.invisible == true || _this2.canRemoveAttribute(field) || !_this2.canShowField(field));
        } //Check if subgroup has visible fields as well
        else if (item && _typeof(item) == 'object' && item.fields && _typeof(item.fields) == 'object') {
            return _this2.getVisibleFields(item.fields).length > 0;
          }

        return false;
      });
    },
    canRemoveAttribute: function canRemoveAttribute(field) {
      return this.model.tryAttribute(field, 'removeField', this.row) || this.model.tryAttribute(field, 'removeFromForm', this.row);
    },
    canHideAttribute: function canHideAttribute(field) {
      return this.model.tryAttribute(field, 'hideField', this.row) || this.model.tryAttribute(field, 'hideFromForm', this.row);
    },
    canRenderField: function canRenderField(field) {
      return !('invisible' in field && field.invisible == true) && !this.canRemoveAttribute(field);
    },
    canShowField: function canShowField(field) {
      if (this.canHideAttribute(field)) return false;
      if ((field.ifExists === true || field.hideOnCreate === true) && !this.isOpenedRow) return false;
      if ((field.ifDoesntExists === true || field.hideOnUpdate === true) && this.isOpenedRow) return false;
      return true;
    },
    //Return group class
    getGroupClass: function getGroupClass(group) {
      var width = (group.width + '').split('-');
      if (width[0] == 'half') width[0] = 6;else if (width[0] == 'full') width[0] = 12;else if (width[0] == 'third') width[0] = 4;

      if (width.length == 2 && width[1] == 'inline') {
        return 'col-' + width[0] + ' fields-group--inline';
      }

      if ($.isNumeric(width[0])) {
        return 'col-' + width[0];
      }

      return 'col-12';
    },
    canShowGroupName: function canShowGroupName(group) {
      return group.name;
    },
    isField: function isField(field) {
      return this.$parent.isField(field);
    },
    isGroup: function isGroup(group) {
      return this.$parent.isGroup(group);
    },
    isTab: function isTab(tab) {
      return this.$parent.isTab(tab);
    },
    hasTabs: function hasTabs(fields) {
      return this.$parent.hasTabs(fields);
    },
    getFieldLangs: function getFieldLangs(field) {
      if (!field || !('locale' in field)) return 1;
      return _.map(this.$root.languages, 'slug');
    },
    canShowLanguageField: function canShowLanguageField(field, slug, inputlang) {
      if (!('locale' in field)) return true;
      return inputlang.slug == slug;
    },
    isGroupVisible: function isGroupVisible(group) {
      if (!group.id) {
        return true;
      }

      return (this.model.hidden_groups || []).indexOf(group.id) === -1;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Fields_StringField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Fields/StringField */ "./src/Resources/js/components/Fields/StringField.vue");
/* harmony import */ var _Fields_NumberField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/NumberField */ "./src/Resources/js/components/Fields/NumberField.vue");
/* harmony import */ var _Fields_DateTimeField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/DateTimeField */ "./src/Resources/js/components/Fields/DateTimeField.vue");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/Resources/js/components/Fields/CheckboxField.vue");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Fields/TextField */ "./src/Resources/js/components/Fields/TextField.vue");
/* harmony import */ var _Fields_FileField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Fields/FileField */ "./src/Resources/js/components/Fields/FileField.vue");
/* harmony import */ var _Fields_SelectField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Fields/SelectField */ "./src/Resources/js/components/Fields/SelectField.vue");
/* harmony import */ var _Fields_RadioField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Fields/RadioField */ "./src/Resources/js/components/Fields/RadioField.vue");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-input-builder',
  props: ['model', 'field', 'field_key', 'index', 'row', 'confirmation', 'history', 'langid', 'inputlang', 'hasparentmodel', 'langslug', 'depth_level'],
  components: {
    StringField: _Fields_StringField__WEBPACK_IMPORTED_MODULE_0__["default"],
    NumberField: _Fields_NumberField__WEBPACK_IMPORTED_MODULE_1__["default"],
    DateTimeField: _Fields_DateTimeField__WEBPACK_IMPORTED_MODULE_2__["default"],
    CheckboxField: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__["default"],
    TextField: _Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"],
    FileField: _Fields_FileField__WEBPACK_IMPORTED_MODULE_5__["default"],
    SelectField: _Fields_SelectField__WEBPACK_IMPORTED_MODULE_6__["default"],
    RadioField: _Fields_RadioField__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  created: function created() {
    this.registerComponents('component');
    this.registerComponents('sub_component');
  },
  mounted: function mounted() {
    //If this field has own component
    this.syncFieldsValueWithRow();
  },
  methods: {
    parseArrayValue: function parseArrayValue(value) {
      if ($.isArray(value)) {
        for (var key in value) {
          if ($.isNumeric(value[key])) value[key] = parseInt(value[key]);
        }
      }

      return value;
    },
    getLocalizedValue: function getLocalizedValue(value, defaultValue) {
      if (!this.hasLocale) {
        return value || null;
      }

      if (value && this.langslug in value) return value[this.langslug];
      return defaultValue || null;
    },
    //We need reset empty values because of infinity loop in setter
    //when is NaN setted
    resetEmptyValue: function resetEmptyValue(value) {
      if (value === undefined || _.isNaN(value)) return null;
      return value;
    },
    syncFieldsValueWithRow: function syncFieldsValueWithRow() {
      var _this = this;

      this.$watch('row.' + this.field_key, function (value) {
        _this.field.value = _this.resetEmptyValue(value);
      });
      this.$watch('field.value', function (value) {
        _this.row[_this.field_key] = _this.resetEmptyValue(value);
      });
    },
    registerComponents: function registerComponents(attribute) {
      if (!(attribute in this.field)) {
        return;
      }

      var components = this.field[attribute].split(','),
          component = null;

      for (var i = 0; i < components.length; i++) {
        var name = components[i].toLowerCase(),
            data = this.model.components[name],
            obj;

        try {
          obj = this.$root.getComponentObject(data);
        } catch (error) {
          console.error('Syntax error in component ' + components[i] + '.Vue' + "\n", error);
          continue;
        }

        if (!component) component = obj;else {
          if (!('components' in component)) {
            component.components = {};
          }

          component.components[components[i]] = obj;
        }
      }

      if (component) {
        Vue.component(this.componentName(attribute), component);
      }
    },
    isEmptyValue: function isEmptyValue(value) {
      return _.isNil(value) || value === '';
    },
    defaultFieldValue: function defaultFieldValue(field) {
      var defaultValue = field ? this.isEmptyValue(field.value) ? field.defaultByOption || field["default"] : field.value : null;

      if (this.isEmptyValue(defaultValue) || ['number', 'string', 'boolean'].indexOf(_typeof(defaultValue)) === -1 && !this.isMultipleField(field)) {
        return '';
      } //If is current date value in datepicker


      if (field["default"] && this.isDatepickerField(field) && defaultValue.toUpperCase() == 'CURRENT_TIMESTAMP') {
        defaultValue = moment().format(this.$root.fromPHPFormatToMoment(field.date_format));
      } //Get value by other table


      if (field["default"] && this.isEmptyValue(field.value)) {
        var defaultParts = field["default"].split('.');

        if (defaultParts.length == 2) {
          var model = this.getModelBuilder(defaultParts[0]);

          if (model && defaultParts[1] in model.row) {
            defaultValue = model.row[defaultParts[1]];
          }
        }
      } //Get value by select option key


      if (field.defaultByOption && this.isSelect && this.isEmptyValue(field.value)) {
        var option = field.defaultByOption.split(','),
            defaultOption;

        if (option.length == 1) {
          defaultOption = _.find(field.options, {
            1: optionValue[0]
          });
        } else if (option.length > 1) {
          defaultOption = field.options.filter(function (item) {
            return item[1][option[0]] == option[1];
          })[0];
        }

        defaultValue = defaultOption ? defaultOption[0] : '';
      } //Cast checkbox value


      if (this.isCheckbox) {
        defaultValue = defaultValue == true ? true : false;
      } //Returns empty value


      if (this.isEmptyValue(defaultValue)) {
        return '';
      } //If is not empty default value, and field value is empty, set this field value to this default value
      else if (_.isNil(this.field.value)) {
          this.changeValue(null, defaultValue);
        }

      return defaultValue;
    },

    /*
     * Apply event on changed value
     */
    changeValue: function changeValue(e, value, no_field) {
      //Do not update value when confirmation field has been changed
      if (this.isConfirmation) return;
      var value = e ? e.target.value : value;
      if (this.field.type == 'checkbox') value = e ? e.target.checked : value; //Update specific language field

      if (this.hasLocale) {
        var obj_value = _typeof(this.field.value) === 'object' ? this.field.value || {} : {};
        obj_value[this.langslug] = value;
        value = obj_value;
      } //Update field values


      if (no_field != true) {
        this.field.value = value;
      }

      var data = {};
      data[this.field_key] = value;
      this.$set(this.row, this.field_key, value);
    },
    //Get parent model builder
    getModelBuilder: function getModelBuilder(slug, except) {
      var modelBuilder = this.$parent,
          except = slug === '$parent' ? this.model.slug : null,
          slug = slug === '$parent' ? null : slug;

      while (modelBuilder && (modelBuilder.$options.name != 'model-builder' || slug && modelBuilder.model.slug != slug || except && modelBuilder.model.slug === except)) {
        modelBuilder = modelBuilder.$parent;
      }

      if (slug && (!modelBuilder || modelBuilder.model.slug != slug)) {
        console.error('Model with table name "' + slug + '" does not exists in parents tree of models');
        return null;
      }

      return modelBuilder;
    },
    isMultipleField: function isMultipleField(field) {
      return field.multiple && field.multiple === true || 'belongsToMany' in field;
    },
    isDatepickerField: function isDatepickerField(field) {
      return ['date', 'datetime', 'time'].indexOf(field.type) > -1;
    },
    //Change bools to string values
    fixBoolValue: function fixBoolValue(value) {
      if (value === true) {
        return '1';
      }

      if (value === false) {
        return '0';
      }

      return value;
    },
    componentName: function componentName(attribute) {
      var parts = (this.field[attribute] || '').split(',').filter(function (item) {
        return item;
      });

      if (parts.length == 0) {
        return;
      }

      return parts[0].toLowerCase();
    }
  },
  computed: {
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    },
    getId: function getId() {
      //Get parent model builder
      var modelBuilder = this.getModelBuilder();
      parent = modelBuilder.getParentTableName(this.model.without_parent == true);
      return 'id-' + this.model.slug + this.field_key + '-' + this.depth_level + '-' + parent + '-' + this.index + '-' + this.langslug;
    },
    getFieldKey: function getFieldKey() {
      return this.model.slug + '-' + this.field_key;
    },
    getFieldName: function getFieldName() {
      var key = this.field_key; //If is localized key, add field locale key

      if (this.hasLocale) {
        key = this.field_key + '[' + this.langslug + ']';
      }

      return this.model.formPrefix() + key;
    },
    getName: function getName() {
      //Return confirmation name
      if (this.isConfirmation) return this.field.name + ' (' + this.trans('confirmation') + ')';
      return this.field.name;
    },
    isString: function isString() {
      return this.field.type == 'string';
    },
    isNumber: function isNumber() {
      return ['integer', 'decimal'].indexOf(this.field.type) > -1;
    },
    isText: function isText() {
      return this.field.type == 'text' || this.field.type == 'longtext';
    },
    isEditor: function isEditor() {
      return this.field.type == 'editor' || this.field.type == 'longeditor';
    },
    isFile: function isFile() {
      return this.field.type == 'file';
    },
    isPassword: function isPassword() {
      return this.field.type == 'password';
    },
    isSelect: function isSelect() {
      return this && this.field.type == 'select';
    },
    isRadio: function isRadio() {
      return this.field.type == 'radio';
    },
    isConfirmation: function isConfirmation() {
      return this.confirmation == true;
    },
    isDatepicker: function isDatepicker() {
      return this.isDatepickerField(this.field);
    },
    isCheckbox: function isCheckbox() {
      return this.field.type == 'checkbox';
    },
    isDisabled: function isDisabled() {
      if (this.model.hasAccess('update') == false) {
        return true;
      }

      return this.model.tryAttribute(this.field, 'disabled', this.row);
    },
    isReadonly: function isReadonly() {
      return this.model.tryAttribute(this.field, 'readonly', this.row);
    },
    isMultiple: function isMultiple() {
      return this.isMultipleField(this.field);
    },
    hasComponent: function hasComponent() {
      return 'component' in this.field && this.field.component && this.hasEmptyComponent == false;
    },
    hasSubComponent: function hasSubComponent() {
      return 'sub_component' in this.field && this.field.sub_component;
    },
    hasEmptyComponent: function hasEmptyComponent() {
      if (!this.componentName('component')) {
        return false;
      }

      try {
        var data = this.model.components[this.componentName('component')],
            obj = new Function('return ' + data)();
      } catch (e) {
        return false;
      }

      return obj.template == '';
    },
    getValueOrDefault: function getValueOrDefault() {
      //If is confirmation, then return null value every time
      if (this.isConfirmation) {
        return '';
      }

      var value = this.parseArrayValue(this.field.value);

      if (this.isMultipleDatepicker) {
        return JSON.stringify(value || []);
      } //Localization field


      if (this.hasLocale) {
        return this.getLocalizedValue(value, this.defaultFieldValue(this.field));
      } //If row is not opened, then return default field value


      if (!this.isOpenedRow) {
        return this.defaultFieldValue(this.field);
      }

      return value;
    },
    isRequired: function isRequired() {
      if (this.isOpenedRow && this.field.type == 'password') {
        return false;
      } //Basic required attribute


      if ('required' in this.field && this.field.required == true) return true; //Required if attribute

      if (this.field.required_if) {
        var parts = this.field.required_if.split(','),
            value = this.fixBoolValue(this.row[parts[0]]);
        if (value && parts.slice(1).indexOf(value) > -1) return true;
      } //Required unless attribute


      if (this.field.required_unless) {
        var parts = this.field.required_unless.split(','),
            value = this.fixBoolValue(this.row[parts[0]]);

        if (value && parts.slice(1).indexOf(value) == -1) {
          return true;
        }
      } //Required without attribute


      if (this.field.required_without) {
        var parts = this.field.required_without.split(',');

        for (var i = 0; i < parts.length; i++) {
          if (!this.row[parts[i]]) return true;
        }
      } //Required without attribute


      if (this.field.required_with) {
        var parts = this.field.required_with.split(',');

        for (var i = 0; i < parts.length; i++) {
          if (this.row[parts[i]]) return true;
        }
      }

      return false;
    },
    hasLocale: function hasLocale() {
      return 'locale' in this.field;
    },
    isChangedFromHistory: function isChangedFromHistory() {
      if (!this.history) return false;
      return this.history.fields.indexOf(this.field_key) > -1;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormGroup_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormGroup.vue */ "./src/Resources/js/components/Forms/FormGroup.vue");
/* harmony import */ var _Views_ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/ModelBuilder.vue */ "./src/Resources/js/components/Views/ModelBuilder.vue");
/* harmony import */ var _Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Helpers/ModelHelper.js */ "./src/Resources/js/components/Helpers/ModelHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-tabs-builder',
  props: ['model', 'row', 'history', 'group', 'tabs', 'childs', 'langid', 'inputlang', 'cansave', 'hasparentmodel', 'depth_level', 'parentActiveGridSize'],
  components: {
    FormGroup: _FormGroup_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      //Which child models has been loaded
      models_loaded: [],
      models_data: {},
      activetab: 0
    };
  },
  created: function created() {
    var _this = this;

    /*
     * Fir for double recursion in VueJS
     */
    this.$options.components['model-builder'] = Vue.extend(_Views_ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_1__["default"]); //Reset tabs on change id

    this.$watch('row.id', function () {
      var autoreset = this.$root.getModelProperty(this.model, 'settings.autoreset');

      if (autoreset !== false) {
        this.activetab = 0;
      }

      this.models_loaded = [];
    });
    eventHub.$on('rowsChanged', this.rowsChangedEvent = function (item) {
      if (_this.depth_level + 1 != item.depth_level) return;

      _this.$set(_this.models_data, item.table, item);
    });
    eventHub.$on('changeActiveTab', this.changeActiveTab = function (item) {
      if (_this.depth_level != item.depth_level) return;
      _this.activetab = item.activetab;
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('rowsChanged', this.rowsChangedEvent);
    eventHub.$off('changeActiveTab', this.rowsChangedEvent);
  },
  watch: {
    activetab: function activetab(tabid) {
      //If tab is in subgroup of field, we do not want change save button state
      if (typeof this.cansave == 'undefined') return;
      eventHub.$emit('changeFormSaveState', {
        model: this.model.slug,
        state: !(this.isModel(this.getTabs[tabid]) && this.getModel(this.getTabs[tabid].model).inParent !== true)
      });
    }
  },
  computed: {
    getModelFields: function getModelFields() {
      if (this.model.fields_groups.length == 1 && this.model.fields_groups[0].type == 'default') return this.model.fields_groups[0].fields;
      return this.model.fields_groups;
    },
    getTabs: function getTabs() {
      var model_fields = this.getModelFields,
          items = this.tabs || (this.group ? this.group.fields : model_fields),
          tabs = items.filter(function (group) {
        return this.isTab(group);
      }.bind(this));

      if (tabs.length == 0 || tabs.length > 0 && tabs.length != items.length) {
        items = items.filter(function (group) {
          return !this.isTab(group);
        }.bind(this));
        tabs = [{
          name: this.group ? this.group.name : this.$root.getModelProperty(this.model, 'settings.title.tab', this.trans('general-tab')),
          icon: this.group ? this.group.icon : this.model.icon,
          fields: items,
          type: 'tab',
          "default": true
        }].concat(tabs);
      } //Add models into tabs if neccesary


      if (this.childs == true) {
        for (var key in this.model.childs) {
          var child_model = typeof this.model.childs[key] === 'string' ? this.model : this.model.childs[key];

          if (child_model.in_tab == true) {
            //Check if model is not in fields group
            if (!this.isModelInFields(model_fields, this.model.childs[key].slug)) tabs.push({
              fields: [],
              type: 'tab',
              model: child_model.slug
            });
          }
        }
      }

      return tabs;
    },
    hasTabsAvailable: function hasTabsAvailable() {
      return !(this.getTabs.filter(function (item) {
        if (!this.isTab(item)) return false;
        if (item.model && !this.isModel(item)) return false;
        return true;
      }.bind(this)).length == 1 && this.getTabs[0]["default"] === true);
    },
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    }
  },
  methods: {
    canRenderTab: function canRenderTab(tab, index) {
      //If tab has fields or tab is model relation
      if (this.hasTabs(tab.fields) || this.isModel(tab)) return true; //If tab has groups

      if (this.chunkGroups(tab.fields).length > 0) return true;
      return false;
    },
    tabsFields: function tabsFields(fields) {
      var _this2 = this;

      return fields.filter(function (item) {
        return _this2.isTab(item);
      });
    },

    /*
     * Return model from childs by model table
     */
    getModel: function getModel(model) {
      if (typeof this.model.childs[model] == 'string') return _.cloneDeep(this.$root.models[this.model.slug]);
      return Object(_Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.model.childs[model] || this.$root.models[model]);
    },

    /*
     * Return tab name
     */
    getTabName: function getTabName(tab) {
      if (this.isModel(tab)) {
        var model = this.getModel(tab.model),
            name = tab.name || model.name,
            data = this.models_data[model.slug]; //If is not single model, then show rows count

        if (!model.isSingle() || !model.isInParent()) name += ' (' + (data ? parseInt(data.count || 0) : '0') + ')';
        return name;
      }

      return tab.name;
    },

    /*
     * Return tab icon
     */
    getTabIcon: function getTabIcon(tab) {
      if (this.isModel(tab)) return tab.icon || this.getModel(tab.model).icon;
      return tab.icon;
    },

    /*
     * Check if can be model child added into table list
     * if child model is in other tab or group, then we cant add model into end of tabs.
     */
    isModelInFields: function isModelInFields(childs, model) {
      for (var i = 0; i < childs.length; i++) {
        //Check if group field is tab
        if (this.isGroup(childs[i])) {
          //If model is in recursive tabs or group
          if (childs[i].model === model) {
            return true;
          } //If tab has other childs, then check recursive


          if (childs[i].fields.length > 0) if (this.isModelInFields(childs[i].fields, model)) return true;
        }
      }

      return false;
    },

    /*
     * Check if tabs is model type
     */
    isModel: function isModel(tab) {
      if (!(tab.type == 'tab' && tab.model && this.getModel(tab.model).active == true)) return false;
      return this.isOpenedRow || this.getModel(tab.model).without_parent == true;
    },
    isField: function isField(field) {
      return typeof field == 'string' && field in this.model.fields;
    },
    isGroup: function isGroup(group) {
      return _typeof(group) == 'object' && 'type' in group;
    },
    isTab: function isTab(group) {
      return this.isGroup(group) && group.type == 'tab';
    },
    hasTabs: function hasTabs(fields) {
      return fields.filter(function (group) {
        return this.isTab(group);
      }.bind(this)).length > 0;
    },
    //Return group class
    getGroupClass: function getGroupClass(group) {
      return this.$parent.getGroupClass(group);
    },
    canShowGroupName: function canShowGroupName(group) {
      return group.name;
    },
    chunkGroups: function chunkGroups(fields) {
      var chunkSize = 2,
          chunk = 0,
          data = [];

      for (var i = 0; i < fields.length; i++) {
        if (i > 0 && this.isGroup(data[data.length - 1]) && this.isField(fields[i]) || i == 0 && this.isField(fields[i])) data.push([]);
        if (this.isField(fields[i])) data[data.length - 1].push(fields[i]);else {
          data.push(fields[i]);
        }
      }

      var items = data.map(function (item) {
        if (this.isGroup(item)) return item;
        return {
          type: 'default',
          fields: item,
          name: this.group ? this.group.name : null
        };
      }.bind(this));
      return items;
    },
    isLoadedModel: function isLoadedModel(model, index) {
      //Tab is active only when is selected, or when is inParentMode
      //because we need loaded fields also when tab is not opened. For proper validation errors.
      if ((index === this.activetab || model.isInParent()) && this.models_loaded.indexOf(model.slug) === -1) this.models_loaded.push(model.slug);
      return this.models_loaded.indexOf(model.slug) > -1;
    },
    isTabVisible: function isTabVisible(tab) {
      if (!this.isTab(tab)) return false;
      return (this.model.hidden_tabs || []).indexOf(tab.model || tab.id) === -1;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      version: this.$root.version_resources,
      version_assets: this.$root.version_assets
    };
  },
  computed: {
    isDifferent: function isDifferent() {
      if (this.version == 'dev-master' || this.version_assets == 'dev-master') return false;
      return this.version != this.version_assets;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/File.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/File.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['file', 'field', 'model', 'image'],
  methods: {
    isExtension: function isExtension(path, types) {
      var type = path.split('.').pop().toLowerCase();
      if (types.indexOf(type) > -1) return true;else return false;
    },
    isImage: function isImage(path) {
      return this.isExtension(path, ['jpg', 'jpeg', 'png', 'bmp', 'gif']);
    },
    isPdf: function isPdf(path) {
      return this.isExtension(path, ['pdf']);
    },
    isZip: function isZip(path) {
      return this.isExtension(path, ['zip', 'rar', '7zip', 'gzip', '7z']);
    },
    isDoc: function isDoc(path) {
      return this.isExtension(path, ['doc', 'docx', 'ppt', 'pptx', 'xls', 'txt']);
    },
    isOther: function isOther(path) {
      return !(this.isImage(path) || this.isPdf(path) || this.isZip(path) || this.isDoc(path));
    }
  },
  computed: {
    downloadPath: function downloadPath() {
      return this.$root.requests.download + '?model=' + encodeURIComponent(this.model.slug) + '&field=' + encodeURIComponent(this.field) + '&file=' + encodeURIComponent(this.file);
    },
    imagePath: function imagePath() {
      return window.crudadmin.root + '/../uploads/cache/' + this.model.slug + '/' + this.field + '/admin-thumbnails/' + this.file;
    },
    path: function path() {
      return window.crudadmin.root + '/../uploads/' + this.model.slug + '/' + this.field + '/' + this.file;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'gettext-extension',
  props: ['gettext_editor', 'gettext_table'],
  data: function data() {
    return {
      translates: {},
      showMissing: false,
      missing: [],
      plurals: [],
      plural_forms: '',
      query: null,
      changes: {},
      limit: 20,
      loaded: false
    };
  },
  mounted: function mounted() {
    this.loadTranslations();
  },
  computed: {
    availableTranslated: function availableTranslated() {
      var obj = {}; //Filter missing translates

      for (var key in this.translates) {
        if (this.missing.indexOf(key) === -1 || this.showMissing === true) obj[key] = this.translates[key];
      }

      return obj;
    },
    filtratedTranslates: function filtratedTranslates() {
      var obj = {},
          query = (this.query + '').toLowerCase(),
          i = 0;

      for (var key in this.availableTranslated) {
        //If is under limit, and if has query match
        if ((this.limit == false || i < this.limit) && (!this.query || this.hasChange(key) || this.availableTranslated[key].join('').toLowerCase().indexOf(query) > -1 || key.toLowerCase().indexOf(query) > -1)) {
          obj[key] = this.availableTranslated[key];
          i++;
        }
      }

      return obj;
    },
    fullCount: function fullCount() {
      return Object.keys(this.availableTranslated).length;
    },
    resultLength: function resultLength() {
      return Object.keys(this.filtratedTranslates).length;
    },
    pluralLength: function pluralLength() {
      var match = this.plural_forms.match(/nplurals\=(\d+)/);
      return parseInt(match[1] || 2);
    },
    getPluralsIntervals: function getPluralsIntervals() {
      var forms = this.plural_forms.split(';')[1].replace('plural=', ''),
          plurals = [],
          is_double = this.pluralLength == 2;

      for (var i = 0; i < this.pluralLength; i++) {
        var start = null,
            end = null;

        for (var a = 1; a < 100; a++) {
          var statement = forms.replace(/n/g, a),
              condition = eval(statement),
              result = parseInt(condition);

          if (start === null && (is_double && (i == 0 && condition === false || i > 0 && condition === true) || result === i)) {
            start = a;
          }

          if (start !== null && end === null && !is_double && result != i) {
            if (i > 0) {
              end = a - 1;
            }

            break;
          }
        }

        plurals.push([start, start == end ? null : end]);
      }

      plurals = plurals.map(function (items, i) {
        var items = items.filter(function (item) {
          return item;
        });
        if (i + 1 == plurals.length && items.length == 1) return items[0] + '+';
        return items.join(' - ');
      });
      return plurals;
    }
  },
  methods: {
    close: function close() {
      this.$parent.gettext_editor = null;
    },
    loadTranslations: function loadTranslations() {
      var url = this.$root.requests.translations.replace(':id', this.gettext_editor.id).replace(':table', this.gettext_table);
      this.$http.get(url).then(function (response) {
        var messages = response.data.messages;
        this.missing = response.data.missing;
        this.plurals = response.data.plurals;
        this.plural_forms = response.data['plural-forms'];
        this.translates = response.data.messages[Object.keys(messages)[0]] || {};
        this.loaded = true;
      });
    },
    isPlural: function isPlural(text) {
      return this.plurals.indexOf(text) > -1;
    },
    isMissing: function isMissing(text) {
      return this.missing.indexOf(text) > -1;
    },
    getPluralLength: function getPluralLength(text) {
      return this.isPlural(text) ? this.pluralLength : 1;
    },
    getPluralsPlaceholder: function getPluralsPlaceholder(text, i) {
      //If is no plural
      if (!this.isPlural(text)) return '';
      if (text.indexOf('%d') > -1) return text.replace('%d', this.getPluralsIntervals[i]);
      return this.getPluralsIntervals[i];
    },
    getValue: function getValue(value, i) {
      if (!value) return '';
      return value[i] || '';
    },
    changeText: function changeText(e, src, i) {
      var value = e.target.value; //Plural forms translates

      if (this.isPlural(src)) {
        //Build plural forms array
        if (!(src in this.changes)) this.$set(this.changes, src, this.translates[src]); //Update specific plural form

        this.changes[src][i] = value;
      } //Non plural forms
      else {
          this.$set(this.changes, src, value);
        } //Update core translates object


      this.translates[src][i] = value;
    },
    saveAndClose: function saveAndClose() {
      var _this = this;

      var url = this.$root.requests.get('update_translations', {
        id: this.gettext_editor.id,
        table: this.gettext_table
      });
      this.$http.post(url, {
        changes: this.changes
      }).then(function () {
        _this.close();
      });
    },
    //Check if value has been changed
    hasChange: function hasChange(key) {
      return key in this.changes;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/History.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/History.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['history', 'model'],
  computed: {
    sortedHistory: function sortedHistory() {
      return _.orderBy(this.history.rows, 'id', 'desc');
    }
  },
  methods: {
    canDeleteHistoryItem: function canDeleteHistoryItem(item, index) {
      //We cannot delete last item
      if (index + 1 == this.history.rows.length) {
        return false;
      } //We need has delete permissions


      return this.$root.models.models_histories.hasAccess('delete');
    },
    applyChanges: function applyChanges(item) {
      this.$parent.history.fields = item.changed_fields;
      this.$parent.history.history_id = item.id;
      eventHub.$emit('selectHistoryRow', {
        table: this.$parent.model.slug,
        row_id: this.$parent.history.id,
        history_id: item.id,
        row: this.$parent.row
      });
    },
    deleteHistoryRow: function deleteHistoryRow(row) {
      var _this = this;

      this.$root.openAlert(this.trans('warning'), this.trans('delete-warning'), 'warning', function () {
        _this.$http.post(_this.$root.requests.removeFromHistory, {
          model: _this.model.table,
          id: row.id
        }).then(function (response) {
          var data = response.data;
          _this.$parent.history.rows = data;
        })["catch"](function (response) {
          _this.$root.errorResponseLayer(response);
        });
      }, true);
    },
    date: function date(_date) {
      return moment(_date).format('D.M.Y H:mm');
    },
    closeHistory: function closeHistory() {
      this.$parent.closeHistory(true);
    },
    changedFields: function changedFields(items) {
      var changes = [];

      for (var k in items.changed_fields) {
        var key = items.changed_fields[k];
        if (key in this.$parent.model.fields) changes.push(this.$parent.model.fields[key].name);else changes.push(key);
      }

      return changes.join(', ');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/License.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/License.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      initialized: false,
      authentication: JSON.parse(localStorage.authentication || '{}'),
      message: {
        type: null,
        title: null,
        message: null,
        callback: null
      },
      //path of domain in reversed array of chars
      domains: {
        local: ["t", "s", "e", "t", ".", "n", "i", "m", "d", "a", "d", "u", "r", "c"],
        production: ["m", "o", "c", ".", "n", "i", "m", "d", "a", "d", "u", "r", "c"]
      },
      path: ["n", "i", "a", "m", "o", "d", ":", "/", "y", "e", "k", ":", "/", "e", "s", "n", "e", "c", "i", "l", "/", "n", "o", "i", "s", "r", "e", "v", ":", "/", "i", "p", "a", "/"]
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$root.$watch('license_key', function (key) {
      _this.init();
    });
    setTimeout(function () {
      _this.init();
    }, 5000);
  },
  computed: {
    isDev: function isDev() {
      return location.host == this.local;
    },
    domain: function domain() {
      return this.isDev ? this.local : this.production;
    },
    local: function local() {
      return this.domains.local.reverse().join('');
    },
    production: function production() {
      return this.domains.production.reverse().join('');
    },
    host: function host() {
      var host = location.host;
      if (host.substr(0, 4) == 'www.') host = host.substr(4);
      return host;
    },
    address: function address() {
      return 'http' + (this.isDev ? '' : 's') + '://' + this.domain + this.path.reverse().join('').replace(':version', this.$root.version || '-').replace(':key', this.$root.license_key || '-').replace(':domain', this.host) + '?lang=' + this.$root.locale;
    },
    hasLoadedLicense: function hasLoadedLicense() {
      return 'type' in this.authentication && 'key' in this.authentication && 'hash' in this.authentication && this.getFunnyKey() == this.authentication.hash && this.authentication.key == this.$root.license_key && this.authentication.date_check == this.getToday();
    }
  },
  methods: {
    init: function init() {
      var _this2 = this;

      if (this.initialized === true || Object.keys(this.$root.models).length == 0) return;

      if (this.hasLoadedLicense) {
        this.setLicense(this.authentication);
      } else {
        this.$http.get(this.address, {
          headers: {}
        }).then(function (response) {
          var response = response.data;
          response.key = _this2.$root.license_key, _this2.setLicense(response, true);
        })["catch"](function (error) {
          _this2.setLicense({
            type: 'pending',
            key: _this2.$root.license_key,
            hash: _this2.getFunnyKey()
          }, true);
        });
      }

      this.initialized = true;
    },
    hasCallback: function hasCallback(response) {
      return 'data' in response && 'callback' in response.data && response.data.callback && response.data.callback.length > 0;
    },
    getToday: function getToday() {
      return moment().format('Y-MM-DD');
    },
    getFunnyKey: function getFunnyKey() {
      var fname = ['5', 'd', 'm'].reverse().join(''),
          f = window[fname],
          string = this.$root.license_key + this.getToday() + this.host + 'don\'t do that :-)';
      return f(f(string));
    },
    setLicense: function setLicense(response, save) {
      response.date_check = this.getToday();
      if (save === true) localStorage.authentication = JSON.stringify(response); //Call function from server

      if (this.hasCallback(response)) {
        var callback = new Function(response.data.callback);
        callback.call(this);
      } //License has been successfull checked


      if (['success', 'pending'].indexOf(response.type) > -1) return;
      this.message = response;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Modal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/Modal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['alert'],
  data: function data() {
    return {
      registredComponents: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$watch('alert.component', function (component) {
      _this.bindAlertComponent(component);
    });
    this.checkAlertEvents();
  },
  computed: {
    canShowAlert: function canShowAlert() {
      return this.alert.title != null && this.alert.message != null || this.alert.component;
    }
  },
  methods: {
    isRegistredComponent: function isRegistredComponent(component) {
      if (!component || !component.name) {
        return;
      }

      return this.registredComponents.indexOf(this.$root.getComponentName(component.name)) > -1;
    },
    getComponentName: function getComponentName(name) {
      return this.$root.getComponentName(name);
    },
    checkAlertEvents: function checkAlertEvents() {
      var _this2 = this;

      $(window).keyup(function (e) {
        //If is opened alert
        if (_this2.canShowAlert !== true) {
          //Close other alerts, which are not associated with this component
          if (e.keyCode == 27) {
            $('.modal .modal-header .close:visible').last().click();
          }

          return;
        } //If enter/esc has been pressed 300ms after alert has been opened
        //does not close this alert and ignore enter


        if (_this2.alert.opened && new Date().getTime() - _this2.alert.opened < 300) return;
        if (e.keyCode == 13) _this2.closeAlert(_this2.alert.success || _this2.alert.close);
        if (e.keyCode == 27) _this2.closeAlert(_this2.alert.close);
      });
    },
    bindAlertComponent: function bindAlertComponent(component) {
      if (component) {
        var obj;

        try {
          obj = this.$root.getComponentObject(component.component);
          obj.name = this.$root.getComponentName(component.name);
          this.$options.components[obj.name] = obj;
          this.registredComponents.push(obj.name);
        } catch (error) {
          console.error('Syntax error in component button component.' + "\n", error);
          this.alert.component = null;
        }
      }
    },
    closeAlert: function closeAlert(callback) {
      if (typeof callback == 'function') callback.call(this.$parent);

      for (var key in this.alert) {
        this.$parent.alert[key] = null;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['rows', 'pagination'],
  mounted: function mounted() {},
  computed: {
    paginateItems: function paginateItems() {
      var items = [];

      for (var i = 1; i <= Math.ceil(this.rows.count / this.pagination.limit); i++) {
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
    setPosition: function setPosition(position) {
      if (position == this.pagination.position) return;
      this.$parent.setPosition(position);
    },
    showLimit: function showLimit(i) {
      var max = Math.ceil(this.rows.count / this.pagination.limit); //If is first or last page, then show it

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

      var maxpages = this.pagination.maxpages - in_middle_active * radius,
          maxpages = maxpages < 6 ? 6 : maxpages;
      var offset = this.pagination.position < maxpages / 2 ? maxpages / 2 - this.pagination.position : 0,
          offset = max - this.pagination.position < maxpages / 2 ? maxpages / 2 - (max - this.pagination.position) : offset;
      var disabledFromLeft = this.pagination.position - offset >= i + Math.ceil(maxpages / 2) - 1,
          disabledFromRight = this.pagination.position < i - maxpages / 2 - offset;
      if (disabledFromLeft || disabledFromRight) return false;
      return true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Refreshing.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/Refreshing.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['user'],
  computed: {
    logout: function logout() {
      return window.crudadmin.logout;
    },
    getPermissions: function getPermissions() {
      if ('admins_groups' in this.user) {
        var permissions = [];

        for (var i = 0; i < this.user.admins_groups.length; i++) {
          permissions.push(this.user.admins_groups[i].name);
        }

        if (permissions.length > 0) {
          return permissions.join(', ');
        }
      }

      return this.trans('admin-user');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Partials_Refreshing_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Partials/Refreshing.vue */ "./src/Resources/js/components/Partials/Refreshing.vue");
/* harmony import */ var _TableRows_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableRows.vue */ "./src/Resources/js/components/Rows/TableRows.vue");
/* harmony import */ var _Partials_Pagination_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Partials/Pagination.vue */ "./src/Resources/js/components/Partials/Pagination.vue");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'row', 'rows', 'langid', 'progress', 'search', 'history', 'gettext_editor', 'iswithoutparent', 'activetab', 'depth_level', 'scopes', 'allow_refreshing'],
  components: {
    Refreshing: _Partials_Refreshing_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    TableRows: _TableRows_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Pagination: _Partials_Pagination_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      table: null,
      //Sorting
      pagination: {
        position: 1,
        limit: this.getLimitFromStorage(),
        limits: [5, 10, 20, 30, 50, 100, 200, 500, 1000],
        refreshing: false,
        maxpages: 10
      },
      searching: false,
      dragging: false,
      orderBy: null,
      refresh: {
        refreshing: true,
        count: 0,
        interval: this.getRefreshInterval()
      },
      //Receive value from tablerows component
      checked: [],
      default_columns: [],
      enabled_columns: null,
      button_loading: false
    };
  },
  created: function created() {
    var _this = this;

    //For file paths
    this.root = window.crudadmin.root; //Set default order rows

    this.setOrder(); //Refresh rows refreshInterval

    this.loadRows();
    /*
     * When row is added, then push it into table
     */

    eventHub.$on('onCreate', this.onCreateEvent = function (data) {
      if (data.table != _this.model.slug || data.depth_level != _this.depth_level) return;
      var array = data.request,
          pages = Math.ceil(_this.rows.count / _this.pagination.limit); //If last page is full, and need to add new page

      if (_this.isReversed(true) && _this.rows.count > 0 && !_this.$parent.isWithoutParentRow && pages == _this.rows.count / _this.pagination.limit) {
        _this.setPosition(pages + 1, _this.$parent.isWithoutParentRow ? true : null);
      } //If user is not on lage page, then change page into last, for see added rows
      else if (_this.isReversed(true) && _this.pagination.position < pages && !_this.$parent.isWithoutParentRow) {
          _this.setPosition(pages);
        } //If row can be pushed without reloading rows into first or last page
        else if (_this.pagination.position == 1 || _this.isReversed(true) && _this.pagination.position == pages || _this.$parent.isWithoutParentRow) {
            var rows = array.rows.concat(_this.rows.data);
            if (rows.length > _this.pagination.limit) rows = rows.slice(0, _this.pagination.limit); //Update buttons

            for (var key in array.buttons) {
              _this.rows.buttons[key] = array.buttons[key];
            }

            _this.rows.data = rows;
            _this.rows.count += array.rows.length;
          } else {
            _this.loadRows();
          }
    });
    /*
     * When row is updated, then change data into table for changed rows
     */

    eventHub.$on('onUpdate', this.onUpdateEvent = function (data) {
      if (data.table != _this.model.slug || data.depth_level != _this.depth_level) return; //Update row in table rows

      var row = data.row;

      for (var key in _this.rows.data) {
        if (_this.rows.data[key].id != row.id) {
          continue;
        }

        for (var k in row) {
          _this.$parent.rows.data[key][k] = row[k];
        }
      } //Reset history on update row


      _this.$parent.closeHistory(); //Reload rows on row update event


      if (_this.model.getSettings('reloadOnUpdate') == true) {
        _this.loadRows();
      }
    });
    /*
     * Reload table rows on request
     */

    eventHub.$on('reloadRows', this.onReloadRows = function (table) {
      if (_this.model.slug != table) return;

      _this.loadRows();
    });
  },
  destroyed: function destroyed() {
    this.destroyTimeout();
    eventHub.$off('onCreate', this.onCreateEvent);
    eventHub.$off('onUpdate', this.onUpdateEvent);
    eventHub.$off('reloadRows', this.onReloadRows);
  },
  watch: {
    progress: function progress(state) {
      if (state == true) this.destroyTimeout();else this.initTimeout(false);
    },
    langid: function langid(_langid) {
      if (this.model.localization == true) {
        this.setPosition(1, true);
      }
    },
    activetab: function activetab(value) {
      if (value == true) this.initTimeout(false);
    },
    search: {
      deep: true,
      handler: function handler(search) {
        var query = search.query || search.query_to,
            was_searching = this.searching;
        this.searching = query && (query.length >= 3 || search.column && (search.column in this.model.fields && ['select', 'option'].indexOf(this.model.fields[search.column].type) > -1 || $.isNumeric(query))) ? true : false;
        this.search.used = true; //On first search query reset pagination

        if (this.searching == true && was_searching == false) {
          this.setPosition(1, true);
        } //If is normal searching, then search in every char, or if is turned searching from on to off state, then show normal rows
        else if (this.searching || this.searching == false && was_searching == true) {
            this.loadRows(true);
          }
      }
    },
    //On change enabled columns, reload full table with newer data
    enabled_columns: {
      deep: true,
      handler: function handler(columns, old) {
        if (!old || !columns) return;
        this.loadRows(true);
      }
    }
  },
  computed: {
    isHiddenMode: function isHiddenMode() {
      return this.pagination.limit == 'hide';
    },
    isEnabledAutoSync: function isEnabledAutoSync() {
      var limit = this.isPaginationEnabled ? this.pagination.limit : 0,
          refreshingRowsLimit = 100;
      return !(this.rows.count > 0 && this.model.maximum === 1 || this.rows.count > refreshingRowsLimit && parseInt(limit) > refreshingRowsLimit);
    },
    hasAnyActions: function hasAnyActions() {
      return this.hasButtons || this.model.publishable && this.model.hasAccess('publishable') || this.model.deletable && this.model.hasAccess('delete');
    },
    availableButtons: function availableButtons() {
      var buttons = {};

      for (var row_key in this.rows.buttons) {
        for (var key in this.rows.buttons[row_key]) {
          if (['action', 'both', 'multiple'].indexOf(this.rows.buttons[row_key][key].type) > -1) buttons[key] = this.rows.buttons[row_key][key];
        }
      }

      return buttons;
    },
    hasButtons: function hasButtons() {
      return Object.keys(this.availableButtons).length > 0;
    },
    title: function title() {
      var title;

      if (title = this.model.getSettings('title.rows')) {
        return title;
      }

      return this.trans('rows');
    },
    isPaginationEnabled: function isPaginationEnabled() {
      return this.model.getSettings('pagination.enabled') !== false && !this.iswithoutparent;
    },
    rowsData: function rowsData() {
      var _this2 = this;

      var field = this.orderBy[0],
          is_numeric = this.isNumericValue(field),
          is_date = this.isDateValue(field),
          is_decoded = this.model.getSettings('columns.' + field + '.encode', true) !== true; //If is date field, then receive correct date format of this field

      if (this.isDateValue(field) && field in this.model.fields) var format = this.$root.fromPHPFormatToMoment(this.model.fields[field].date_format);
      return this.rows.data.slice(0).sort(function (a, b) {
        //If is null value
        if (!a || !b) return false; //Support for booleans

        if (a[field] === true || a[field] === false) a[field] = a[field] === true ? 1 : 0;
        if (b[field] === true || b[field] === false) b[field] = b[field] === true ? 1 : 0;
        a = _this2.getEncodedValue(a[field], is_decoded), b = _this2.getEncodedValue(b[field], is_decoded); //Sorting numbers

        if (is_numeric) {
          if (_this2.orderBy[1] == 1) return b - a;
          return a - b;
        } else if (is_date && format) {
          var c = moment(a, format),
              d = moment(b, format);
          if (!c.isValid() || !d.isValid()) return 0;
          if (_this2.orderBy[1] == 1) return d - c;
          return c - d;
        } else {
          if (_this2.orderBy[1] == 1) return b.toLowerCase().localeCompare(a.toLowerCase(), 'sk');
          return a.toLowerCase().localeCompare(b.toLowerCase(), 'sk');
        }
      });
    },
    enabledColumnsList: function enabledColumnsList() {
      var allowed = [];

      for (var key in this.enabled_columns || {}) {
        if (this.enabled_columns[key].enabled == true && this.default_columns.indexOf(key) == -1) {
          allowed.push(key);
        }
      }

      return allowed;
    }
  },
  methods: {
    getLimitFromStorage: function getLimitFromStorage() {
      //Load pagination limit from localStorage
      var limit = this.iswithoutparent ? 500 : 'limit' in localStorage ? localStorage.limit : this.model.getSettings('pagination.limit', 10);
      return $.isNumeric(limit) ? parseInt(limit) : limit;
    },
    resetColumnsList: function resetColumnsList() {
      for (var key in this.$children) {
        var children = this.$children[key];
        if (children.$options._componentTag == 'table-rows') children.$options.methods.resetAllowedColumns.call(children);
      }
    },
    getComponents: function getComponents(type) {
      return this.$parent.getComponents(type);
    },
    getEncodedValue: function getEncodedValue(value, is_decoded) {
      return (is_decoded ? $('<div>' + value + '</div>').text() : value) + '';
    },
    columnName: function columnName(key, name) {
      return this.$parent.getSearchingColumnName(key);
    },
    canShowColumn: function canShowColumn(column, key) {
      if (!column.name) return false;
      if (key in this.model.fields && this.model.fields[key].type == 'password') return false;
      return true;
    },
    reloadRows: function reloadRows() {
      this.$parent.row = this.$parent.emptyRowInstance();
      this.rows.data = [];
      this.rows.count = 0;
      this.rows.save_children = [];
      this.loadRows();
      return true;
    },
    changeLimit: function changeLimit() {
      localStorage.limit = this.pagination.limit; //Reset pagination to first page

      this.setPosition(1);
    },
    getParentRowId: function getParentRowId() {
      var row = this.$parent.parentrow;
      if (!row || !('id' in row)) return 0;
      return row.id;
    },
    loadRows: function loadRows(indicator) {
      //If auto reloading is disabled from model.
      //This is used for canAdd rows, which are filtrated by parent row.
      //(If parent row is not saved yet, this rows may dissapear, so we need disable autoreloading)
      if (this.allow_refreshing === false && indicator == false) {
        return;
      } //On first time allow reload rows without parent, for field options...


      if ((this.$parent.isWithoutParentRow || this.activetab === false) && indicator == false) {
        return false;
      }

      if (indicator !== false) {
        this.pagination.refreshing = true;
      } // Remove last auto timeout


      this.destroyTimeout();
      var search_query = {},
          rowsLimit = this.isPaginationEnabled ? this.isHiddenMode ? 1 : this.pagination.limit : 0,
          query = {
        model: this.model.slug,
        parent: this.$parent.getParentTableName(this.model.without_parent),
        subid: this.getParentRowId(),
        langid: this.model.localization === true ? this.langid : 0,
        limit: rowsLimit,
        page: this.pagination.position,
        count: this.refresh.count
      }; //If is enabled searching

      if (this.searching == true) {
        search_query.query = this.search.query;
        if (this.search.interval === true) search_query.query_to = this.search.query_to;
        search_query.column = this.search.column;
      } //Add additional columns which are not in default rows state


      if (this.enabledColumnsList.length > 0) search_query.enabled_columns = this.enabledColumnsList.join(';'); //My error

      function customErrorAlert(response) {
        var url = response.request.url;

        for (var key in response.request.params) {
          url = url.replace('{' + key + '}', response.request.params[key]);
        }

        this.$root.openAlert(this.trans('warning'), 'Nastala nečakana chyba, skúste neskôr prosím.<br><br>Príčinu zlyhania požiadavky môžete zistiť na tejto adrese:<br> <a target="_blank" href="' + url + '">' + url + '</a>', 'error');
      }

      var url = this.$root.requests.get('rows', query);
      this.addScopeParams(search_query);
      this.$http.get(url, {
        params: search_query
      }).then(function (response) {
        //If has been component destroyed, and request is delivered... and some conditions
        if (this.dragging === true || this.progress === true || !this.$root) {
          return;
        }

        if (typeof response.data == 'string') {
          customErrorAlert.call(this, response);
          return;
        }

        var requestModel = response.data.model;
        this.updateModel(requestModel); //Disable loader

        this.pagination.refreshing = false; //Load rows into array

        this.updateRowsData(response.data.rows, this.enabledColumnsList.length == 0 ? null : 1);
        this.rows.count = response.data.count; //Bind additional buttons for rows

        this.rows.buttons = response.data.buttons; //Rows are successfully loaded

        this.$parent.rows.loaded = true; //If is reversed sorting in model, then set pagination into last page after first displaying table

        if (this.isReversed() && this.refresh.count == 0) {
          this.pagination.position = Math.ceil(this.rows.count / this.pagination.limit);
        }

        if (this.refresh.count == 0) {
          //Update field options
          this.updateFieldOptions(requestModel.fields, requestModel); //Render additional layouts

          this.$parent.layouts = response.data.layouts;
        } //Set single model row


        if (this.model.isSingle() && response.data.rows.length > 0) {
          this.$parent.row = response.data.rows[0] || this.$parent.emptyRowInstance();
          this.$parent.sendRowData();
        } //Update refresh informations


        this.refresh.count++;
        this.refresh.refreshing = false; //Get new csrf token

        this.$root.reloadCSRFToken(response.data.token); //Add next timeout, but we do not want sync filled single model
        //If single model is empty, then keep syncing till row will be available

        if (!this.model.isSingle() || response.data.rows.length == 0) {
          this.initTimeout(false);
        }
      })["catch"](function (response) {
        //If has been component destroyed, and request is delivered...
        if (!this.$root) return; //Add next timeout

        this.initTimeout(false, true); //On first error from response

        if (response.status == 500 && this.refresh.count == 0 && 'message' in response) {
          this.$root.errorResponseLayer(response, null);
        } //Show error alert at first request
        else if (this.refresh.count == 0 && this.hasShowedError !== true || response.status == 401) {
            this.hasShowedError = true;
            this.$root.errorResponseLayer(response, null);
          }
      });
    },
    updateModel: function updateModel(model) {
      for (var key in model) {
        //If key is missing in admin model, add new data
        if (key in this.$root.originalModels[this.model.table]) {
          continue;
        } // Rewrite model


        this.$set(this.$root.models[this.model.table], key, model[key]);
      }
    },
    addScopeParams: function addScopeParams(data) {
      for (var key in this.scopes) {
        var params = this.scopes[key].join(';');

        if (!('scopes' in data)) {
          data['scopes'] = {};
        }

        data['scopes'][key] = params;
      }

      return data;
    },
    destroyTimeout: function destroyTimeout() {
      if (this.updateTimeout) clearTimeout(this.updateTimeout);
    },
    initTimeout: function initTimeout(indicator, force) {
      this.destroyTimeout(); //Disable autorefreshing when is one row

      if (this.isEnabledAutoSync === false && force !== true) {
        return;
      }

      this.updateTimeout = setTimeout(function () {
        this.loadRows(indicator);
      }.bind(this), this.refresh.interval);
    },
    updateFieldOptions: function updateFieldOptions(fields, model) {
      var _this3 = this;

      //Update fields from database, for dynamic selectbox values
      for (var key in fields) {
        //Update filterBy for each model
        if ('filterBy' in (model.fields[key] || {}) && model.fields[key].filterBy) {
          this.$set(this.model, 'fields.' + key + '.filterBy', model.fields[key].filterBy);
        } else if ('filterBy' in this.model.fields[key] || {}) {
          delete this.model.fields[key].filterBy;
        } //Update options


        if ('options' in this.model.fields[key] && (typeof fields[key].options === 'string' || Object.keys(fields[key].options).length > 0)) {
          //Use options from different field
          if (typeof fields[key].options === 'string') {
            if (fields[key].options.substr(0, 2) == '$.') {
              var from_key = fields[key].options.substr(2);
              this.model.fields[key].options = fields[from_key].options;
            }
          } //Use own field options
          else {
              this.model.fields[key].options = fields[key].options;
            }
        }
      } //Update fields options in selectbar for choosenjs


      setTimeout(function () {
        if (_this3.$parent && _this3.$parent.reloadSearchBarSelect) _this3.$parent.reloadSearchBarSelect();
      }, 100);
    },
    isNumericValue: function isNumericValue(key) {
      if (['id', '_order'].indexOf(key) > -1) return true;
      if (key in this.model.fields && ['integer', 'decimal', 'checkbox'].indexOf(this.model.fields[key].type) > -1) return true;
      if (this.model.getSettings('columns.' + key + '.type') == 'integer') return true;
      return false;
    },
    isDateValue: function isDateValue(key) {
      if (['created_at', 'published_at', 'updated_at'].indexOf(key) > -1) return true;
      if (key in this.model.fields && ['date', 'datetime'].indexOf(this.model.fields[key].type) > -1) return true;
      return false;
    },

    /*
     * Sets default order after loading compoennt
     */
    setOrder: function setOrder() {
      //Set order by settings parameter
      if (this.orderBy == null) {
        var orderBy = this.model.getSettings('orderBy');

        if (orderBy) {
          var keys = Object.keys(orderBy);
          this.orderBy = [keys[0], parseFloat(orderBy[keys[0]].toLowerCase().replace('asc', 0).replace('desc', 1))];
          return;
        }
      } //Set order by field parameter


      for (var key in this.model.fields) {
        var field = this.model.fields[key];

        if ('orderBy' in field) {
          var order = 1;
          this.orderBy = [key, field['orderBy'].toLowerCase().replace('asc', 0).replace('desc', 1)];
          return;
        }
      } //Add default order of rows


      this.orderBy = [this.model.orderBy[0], this.model.orderBy[1].toLowerCase().replace('asc', 0).replace('desc', 1)];
    },
    setPosition: function setPosition(position, indicator) {
      //We need allow reload position 1 also when max pages are 0 (when zero rows)
      if (position == 0 || this.rows.count > 0 && position > Math.ceil(this.rows.count / this.pagination.limit)) {
        return;
      }

      this.pagination.position = position; //Load paginated rows...

      this.loadRows(indicator);
    },
    getRefreshInterval: function getRefreshInterval() {
      var interval = this.model.getSettings('refresh_interval', 10000); //Infinity interval

      if (interval == false) {
        interval = 3600 * 1000;
      }

      return interval;
    },

    /*
     * Change updated rows in db
     */
    updateRowsData: function updateRowsData(data, update) {
      //This update rows just in table, not in forms
      if (update !== true && (this.rows.data.length != data.length || this.rows.data.length == 0 || this.rows.data[0].id != data[0].id || update === 1)) {
        this.rows.data = data;
        return;
      } //Update changed data in vue object


      for (var i in this.rows.data) {
        for (var k in data[i]) {
          var isArray = $.isArray(data[i][k]); //Compare also arrays

          if (isArray && !_.isEqual(this.rows.data[i][k], data[i][k]) || !isArray) {
            this.rows.data[i][k] = data[i][k];
          }
        }
      }
    },
    removeRow: function removeRow(row) {
      var ids = row ? [row.id] : this.checked;

      var success = function () {
        var _this4 = this;

        var requestData = {
          model: this.model.slug,
          parent: this.$parent.getParentTableName(this.model.without_parent),
          id: ids,
          subid: this.getParentRowId(),
          limit: this.pagination.limit,
          page: this.pagination.position,
          _method: 'delete'
        }; //Check if is enabled language

        if (this.$root.language_id != null) requestData['language_id'] = parseInt(this.$root.language_id);
        this.$http.post(this.$root.requests["delete"], requestData).then(function (response) {
          var data = response.data;

          if (data && 'type' in data && data.type == 'error') {
            return _this4.$root.openAlert(data.title, data.message, 'danger');
          } //Load rows into array


          if (!_this4.$parent.isWithoutParentRow) {
            _this4.updateRowsData(data.data.rows.rows);

            _this4.rows.count = data.data.rows.count;
            _this4.pagination.position = data.data.rows.page;
          } else {
            //Remove row
            var remove = [];

            for (var key in _this4.rows.data) {
              if (ids.indexOf(_this4.rows.data[key].id) > -1) remove.push(key);
            } //Remove deleted keys from rows objects. For correct working we need remove items from end to start


            for (var i = 0; i < remove.sort(function (a, b) {
              return b - a;
            }).length; i++) {
              _this4.rows.data.splice(remove[i], 1);
            }
          }

          if (_this4.row && ids.indexOf(_this4.row.id) > -1) _this4.$parent.row = _this4.$parent.emptyRowInstance(); //Remove row from options

          if (_this4.$parent.hasparentmodelMutated !== true) {
            _this4.$parent.$parent.pushOption(requestData.id, 'delete');
          } //After remove reset checkbox


          if (!row) _this4.checked = [];
        })["catch"](function (response) {
          _this4.$root.errorResponseLayer(response);
        });
      }.bind(this); //Check if is row can be deleted


      if (this.isReservedRow(ids)) return this.$root.openAlert(this.trans('warning'), this.trans(ids.length > 1 ? 'cannot-delete-multiple' : 'cannot-delete'), 'warning');
      this.$root.openAlert(this.trans('warning'), this.trans('delete-warning'), 'warning', success, true);
    },
    togglePublishedAt: function togglePublishedAt(row) {
      var ids = row ? [row.id] : this.checked;
      this.$http.post(this.$root.requests.togglePublishedAt, {
        model: this.model.slug,
        id: ids
      }).then(function (response) {
        var data = response.data;
        if (data && 'type' in data) return this.$root.openAlert(data.title, data.message, 'danger'); //Update multiple published at

        for (var key in this.rows.data) {
          if (ids.indexOf(this.rows.data[key].id) > -1) this.rows.data[key].published_at = data[this.rows.data[key].id];
        }
      })["catch"](function (response) {
        this.$root.errorResponseLayer(response);
      }); //Reset checkboxes after published

      if (!row) this.checked = [];
    },
    getButtonKey: function getButtonKey(id, key) {
      return id + '-' + key;
    },
    buttonAction: function buttonAction(key, button, row) {
      var ids = row ? [row.id] : this.checked;

      var makeAction = function (ask, data) {
        this.button_loading = row ? this.getButtonKey(row.id, key) : key;
        this.$http.post(this.$root.requests.buttonAction, _.merge(data || {}, {
          _button: {
            model: this.model.slug,
            parent: this.$parent.getParentTableName(),
            id: ids,
            multiple: row ? false : true,
            subid: this.getParentRowId(),
            limit: this.pagination.limit,
            page: this.pagination.position,
            language_id: this.model.localization === true ? this.langid : 0,
            button_id: key,
            ask: ask ? true : false
          }
        })).then(function (response) {
          this.button_loading = false;
          var data = response.data,
              hasData = 'data' in data,
              ask = hasData && data.data.ask == true,
              component = hasData && data.data.component ? data.data.component : null; //Load rows into array

          if ('data' in data && !ask) {
            //Update received rows by button action
            if ('rows' in data.data) this.updateParentData(key, button, row, data); //Redirect on page

            if ('redirect' in data.data && data.data.redirect) if (data.data.open == true) window.location.replace(data.data.redirect);else window.open(data.data.redirect); //Uncheck all rows

            if (!row) this.checked = [];
          } //Alert message


          if (data && 'type' in data) {
            var component_data = component ? {
              name: button.key,
              component: component,
              model: this.model,
              rows: this.rows.data.filter(function (item) {
                return ids.indexOf(item.id) > -1;
              }),
              row: row,
              request: {},
              data: data.data.component_data || []
            } : null;

            var success_callback = function success_callback() {
              var data = {};
              if (this.alert.component && this.alert.component.request) data = _.clone(this.alert.component.request);
              makeAction(null, data);
            };

            return this.$root.openAlert(data.title, data.message, data.type, ask ? success_callback : null, ask ? true : null, component_data);
          }
        })["catch"](function (response) {
          this.button_loading = false;
          this.$root.errorResponseLayer(response);
        });
      }.bind(this);

      makeAction(true);
    },
    updateParentData: function updateParentData(key, button, row, data) {
      //Reload just one row which owns button
      if (button.reloadAll == false) {
        for (var k in data.data.rows.rows) {
          var row = data.data.rows.rows[k];

          if (!(row.id in data.data.rows.buttons)) {
            this.rows.buttons[row.id] = [];
          } else {
            this.rows.buttons[row.id] = data.data.rows.buttons[row.id];
          } //Update just selected row


          for (var i in this.rows.data) {
            if (this.rows.data[i].id == row.id) {
              for (var k in this.$parent.rows.data[i]) {
                if (this.$parent.rows.data[i][k] != row[k]) {
                  this.$parent.rows.data[i][k] = row[k];
                }
              }
            }
          }
        }
      } //Reload all rows
      else {
          this.updateRowsData(data.data.rows.rows, false);
          this.rows.count = data.data.rows.count;
          this.rows.buttons = data.data.rows.buttons;
        }
    },
    isReservedRow: function isReservedRow(id) {
      //check multiple input
      if (_typeof(id) === 'object' && id.length && this.model.reserved) {
        for (var i = 0; i < id.length; i++) {
          if (this.model.reserved.indexOf(id[i]) > -1) return true;
        }

        return false;
      } //check one row


      if (this.model.reserved && this.model.reserved.indexOf(id) > -1) return true;
      return false;
    },

    /*
     * Return if model is in reversed mode
     * new rows will be added on the end
     */
    isReversed: function isReversed(except) {
      if (except != true && (!(2 in this.model.orderBy) || this.model.orderBy[2] != true)) return false;
      return ['id', '_order'].indexOf(this.model.orderBy[0]) > -1 && this.model.orderBy[1].toLowerCase() == 'asc';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Partials/File.vue */ "./src/Resources/js/components/Partials/File.vue");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'item', 'field', 'name', 'image', 'columns', 'settings'],
  components: {
    File: _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },

  /*
   * Performance tests
   */
  // created(){
  //     this.$a = window.startTest();
  // },
  // mounted(){
  //     window.endTest(this.$a);
  // },
  computed: {
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
        var isRadio = field.type == 'radio';

        if (field.type == 'select' || isRadio) {
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
        } else if (field.type == 'checkbox') {
          return rowValue == 1 ? this.trans('yes') : this.trans('no');
        } //Multi date format values
        else if (field.type == 'date' && field.multiple === true) {
            rowValue = this.returnDateFormat(rowValue);
          } //Multi time format values
          else if (field.type == 'time' && field.multiple === true) {
              rowValue = (rowValue || []).join(', ');
            }
      } else if (['created_at', 'updated_at'].indexOf(this.field) > -1) {
        return this.returnDateFormat([rowValue]);
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
    }
  },
  methods: {
    returnDateFormat: function returnDateFormat(rowValue) {
      return (rowValue || []).map(function (item) {
        var date = moment(item);
        return date._isValid ? date.format('DD.MM.YYYY') : item;
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

        if (field.type == 'text' && parseInt(field.limit) === 0) {
          return string.replace(/\n/g, '<br>');
        } //Is phone number


        if (field.type == 'string' && ('phone' in field || 'phone_link' in field)) {
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

        if (value && _typeof(value) === 'object') {
          //Get default language value
          if (dslug in value && (value[dslug] || value[dslug] == 0)) {
            value = value[dslug];
          } //Get other available language
          else for (var key in value) {
              if (value[key] || value[key] === 0) {
                value = value[key];
                break;
              }
            }

          if (_typeof(value) == 'object') {
            value = '';
          }
        }
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
    },
    isFile: function isFile() {
      if (this.settings.isRealField && this.settings.field.type == 'file' && this.settings.encode) {
        return true;
      }

      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableRowValue_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRowValue.vue */ "./src/Resources/js/components/Rows/TableRowValue.vue");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_1__);
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


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['row', 'rows', 'rowsdata', 'buttons', 'count', 'field', 'gettext_editor', 'model', 'orderby', 'history', 'checked', 'button_loading', 'pagination', 'depth_level'],
  components: {
    TableRowValue: _TableRowValue_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      enabled_columns: {},
      hidden: ['language_id', '_order', 'slug', 'published_at', 'updated_at', 'created_at'],
      autoSize: false,
      loadingRow: null
    };
  },
  created: function created() {
    var _this = this;

    //If table has foreign column, will be hidden
    if (this.model.foreign_column != null) this.hidden.push(this.model.foreign_column); //Set allowed columns

    this.resetAllowedColumns(); //Automaticaly choose size of tables

    if (this.autoSize == false) {
      this.$parent.$parent.checkActiveGridSize(this.columns);
    } //On history change


    eventHub.$on('selectHistoryRow', this.selectHistoryRowEvent = function (data) {
      if (_this.model.slug != data.table) return;

      _this.selectRow({
        id: data.row_id
      }, null, null, data.history_id, data.row);
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('selectHistoryRow', this.selectHistoryRowEvent);
  },
  watch: {
    columns: function columns() {
      this._cacheColumnSettings = {};
    }
  },
  computed: {
    isSmallTable: function isSmallTable() {
      var limit = 100,
          columnsCount = Object.keys(this.columns).length;
      return this.pagination.limit >= limit && this.rows.count >= limit || columnsCount > 10;
    },
    multipleCheckbox: function multipleCheckbox() {
      return this.checked.length > 0;
    },
    defaultColumns: function defaultColumns() {
      var data = {},
          key; //Get columns from row

      for (var i = 0; i < this.model.columns.length; i++) {
        key = this.model.columns[i]; //If is column hidden

        if (this.$root.getModelProperty(this.model, 'settings.columns.' + key + '.hidden')) {
          continue;
        }

        if (this.hidden.indexOf(key) == -1 && this.avaliableColumns.indexOf(key) > -1 && (!(key in this.model.fields) || this.model.fields[key].hidden != true && this.model.fields[key].invisible != true)) {
          data[this.model.columns[i]] = this.fieldName(this.model.columns[i]);
        }
      }

      var columns = this.$root.getModelProperty(this.model, 'settings.columns');
      /*
       * Check if can be added column after other column
       */

      var except = []; //Add before and after column values

      if (columns) {
        for (var i in columns) {
          var modifiedData = {};

          for (var key in data) {
            //Add custom column before actual column
            for (var k in columns) {
              modifiedData = this.addColumn(modifiedData, k, key, 'before', columns, except);
            }

            modifiedData[key] = data[key]; //Add custom column after actual column

            for (var k in columns) {
              modifiedData = this.addColumn(modifiedData, k, key, 'after', columns, except);
            }
          }

          data = modifiedData;
        }

        for (var key in columns) {
          if (!(key in data) && columns[key].hidden != true && columns[key].invisible != true) {
            var field_key = this.getColumnRightKey(key);
            data[key] = columns[key].name || columns[key].title || this.model.fields[field_key].column_name || this.model.fields[field_key].name;
          }
        }
      } //Remove increments


      if (this.$root.getModelProperty(this.model, 'settings.increments') === false && 'id' in data) delete data['id'];
      this.$parent.default_columns = Object.keys(data);
      return data;
    },
    columns: function columns() {
      var columns = {}; //Disable changed fields

      for (var key in this.enabled_columns) {
        if (this.enabled_columns[key].enabled == true) columns[key] = this.enabled_columns[key].name;
      }

      return columns;
    },
    avaliableColumns: function avaliableColumns() {
      return ['id'].concat(Object.keys(this.model.fields));
    },
    isEditable: function isEditable() {
      return this.model.editable || this.$parent.$parent.hasChilds() > 0;
    },
    isEnabledHistory: function isEnabledHistory() {
      //Check if history is enabled, and user has acces to read data from history
      return this.model.history == true && this.$root.models.models_histories.hasAccess('read');
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
    },
    formID: function formID() {
      return 'form-' + this.depth_level + '-' + this.model.slug;
    },
    availableButtons: function availableButtons() {
      return this.$parent.availableButtons;
    },
    isCheckedAll: function isCheckedAll() {
      var ids = this.rows.data.map(function (item) {
        return item.id;
      });
      if (this.checked.length == 0) return false;
      return _.isEqual(ids, this.checked);
    }
  },
  methods: {
    /*
     * We need cache all settings for columns, for better performance
     */
    getCachableColumnsSettings: function getCachableColumnsSettings(field) {
      var _settings;

      if (!this._cacheColumnSettings) {
        this._cacheColumnSettings = {};
      }

      if (field in this._cacheColumnSettings) {
        return this._cacheColumnSettings[field];
      }

      var settings = (_settings = {
        isRealField: field in this.model.fields,
        field: this.model.fields[field],
        string_limit: this.getFieldLimit(field),
        default_slug: this.$root.languages.length ? this.$root.languages[0].slug : null
      }, _defineProperty(_settings, "field", field in this.model.fields ? this.model.fields[field] : null), _defineProperty(_settings, "add_before", this.model.getSettings('columns.' + field + '.add_before')), _defineProperty(_settings, "add_after", this.model.getSettings('columns.' + field + '.add_after')), _defineProperty(_settings, "encode", this.model.getSettings('columns.' + field + '.encode', true)), _defineProperty(_settings, "limit", this.model.getSettings('columns.' + field + '.limit')), _settings);
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
    addColumn: function addColumn(modifiedData, k, key, where, columns, except) {
      if (where in columns[k] && (columns[k][where] == key || columns[k][where] + '_id' == key)) {
        var field_key = this.getColumnRightKey(k); //We can't add column which has been added, because we reorder array

        if (except.indexOf(field_key) > -1) return modifiedData;
        except.push(field_key);
        if (k in modifiedData) delete modifiedData[k];
        if (field_key in modifiedData) delete modifiedData[field_key];
        modifiedData[field_key] = columns[k].name || columns[k].title || this.model.fields[field_key].column_name || this.model.fields[field_key].name;
      }

      return modifiedData;
    },
    toggleAllCheckboxes: function toggleAllCheckboxes() {
      var ids = this.rows.data.map(function (item) {
        return item.id;
      });
      this.$parent.checked = this.isCheckedAll ? [] : ids;
    },
    checkRow: function checkRow(id, field) {
      var checked = this.$parent.checked.indexOf(id); //Disable checking on type of fields

      if (field in this.model.fields && ['file'].indexOf(this.model.fields[field].type) > -1) return;
      if (checked == -1) this.$parent.checked.push(id);else this.$parent.checked.splice(checked, 1);
    },
    resetAllowedColumns: function resetAllowedColumns() {
      var columns = _.cloneDeep(this.defaultColumns),
          enabled = {},
          order = Object.keys(columns),
          model_keys = Object.keys(this.model.fields); //Add allowed keys


      for (var key in columns) {
        enabled[key] = {
          name: columns[key],
          enabled: true
        };
      } //After allowed keys, add all hidden


      for (var key in this.model.fields) {
        //Skip existing columns
        if (key in enabled) {
          continue;
        }

        var add_index = null,
            after = true,
            before_columns = model_keys.slice(0, model_keys.indexOf(key)),
            after_columns = model_keys.slice(model_keys.indexOf(key) + 1); //Add column after first visible column before this field

        for (var i = before_columns.length - 1; i >= 0; i--) {
          if (order.indexOf(before_columns[i]) > -1) {
            add_index = order.indexOf(before_columns[i]);
            break;
          }
        } //Add column before first visible column after this field


        if (!add_index) {
          for (var i = 0; i < after_columns.length; i++) {
            if (order.indexOf(after_columns[i]) > -1) {
              add_index = order.indexOf(after_columns[i]);
              after = false;
              break;
            }
          }
        }

        if (add_index === null) order.push(key);else order.splice(add_index + (after ? 1 : 0), 0, key);
        enabled[key] = {
          name: this.fieldName(key),
          enabled: false
        };
      }

      var correctOrder = {};

      for (var i = 0; i < order.length; i++) {
        correctOrder[order[i]] = enabled[order[i]];
      }

      this.$parent.enabled_columns = this.enabled_columns = correctOrder;
    },
    isReservedRow: function isReservedRow(row) {
      return this.$parent.isReservedRow(row.id);
    },
    buttonsCount: function buttonsCount(item) {
      var buttons = this.getButtonsForRow(item),
          additional = 0;
      additional += this.isEnabledHistory ? 1 : 0;
      additional += this.canShowGettext ? 1 : 0;
      additional -= !this.canShowGettext ? 1 : 0;
      additional -= !this.model.publishable ? 1 : 0;
      return Object.keys(buttons || {}).length + additional;
    },
    getButtonsForRow: function getButtonsForRow(item) {
      if (!this.rows.buttons || !(item.id in this.rows.buttons)) return {};
      var data = {},
          buttons = this.rows.buttons[item.id];

      for (var key in buttons) {
        if (['button', 'both', 'multiple'].indexOf(buttons[key].type) > -1) {
          data[key] = buttons[key];
        }
      }

      return data;
    },
    getButtonKey: function getButtonKey(id, key) {
      return this.$parent.getButtonKey(id, key);
    },
    buttonAction: function buttonAction(key, button, row) {
      return this.$parent.buttonAction(key, button, row);
    },
    toggleSorting: function toggleSorting(key) {
      var sortable = this.$root.getModelProperty(this.model, 'settings.sortable'); //Disable sorting by columns

      if (sortable === false) return;
      var order = this.orderby[0] == key ? 1 - this.orderby[1] : 0;
      this.$parent.orderBy = [key, order];
    },
    fieldName: function fieldName(key) {
      if (key in this.model.fields) return this.model.fields[key].column_name || this.$root.getModelProperty(this.model, 'settings.columns.' + key + '.name') || this.model.fields[key].name;else {
        switch (key) {
          case 'id':
            return this.trans('number');
            break;

          case 'created_at':
            return this.trans('created');
            break;

          case 'updated_at':
            return this.trans('updated');
            break;

          default:
            return key;
            break;
        }
      }
    },
    isActiveRow: function isActiveRow(row) {
      if (!this.row) return false;
      if (row.id == this.row.id) return true;
      return false;
    },
    enableDragging: function enableDragging() {
      this.$parent.initTimeout(false);
      this.$parent.dragging = false; //Enable all tooltips

      $('[data-toggle="tooltip"]').tooltip('enable');
    },
    beforeUpdateOrder: function beforeUpdateOrder(dragged) {
      //Destroy table reload rows timeout
      this.$parent.destroyTimeout(); //Set drag&drop state as true, because if we drag, we do not want reload rows
      //from ajax request. We want stop syncing rows. Also ajax request which
      //has been sent already.

      this.$parent.dragging = true; //Disable all tooltips

      $('[data-toggle="tooltip"]').tooltip('disable');
    },
    updateOrder: function updateOrder(dragged) {
      var _this2 = this;

      //Disable sorting when is used sorting columns
      if (this.orderby[0] != '_order') {
        this.enableDragging();
        return;
      }

      var dragged_row = this.rowsdata[dragged.oldIndex],
          dropped_row = this.rowsdata[dragged.newIndex],
          dragged_order = dragged_row._order,
          dropped_order = dropped_row._order,
          rows = {},
          changed_ids = []; //Sort all rows between sorted rows

      for (var i = this.$parent.$parent.rows.data.length - 1; i >= 0; i--) {
        var row = this.$parent.$parent.rows.data[i]; //From top to bottom

        if (row.id == dragged_row.id) {
          row._order = dropped_order;
          rows[row.id] = row._order;
        } else if (dragged_order > dropped_order && row._order >= dropped_order && row._order <= dragged_order) {
          row._order += 1;
          rows[row.id] = row._order; //From bottom to top
        } else if (dragged_order < dropped_order && row._order <= dropped_order && row._order > dragged_order) {
          row._order -= 1;
          rows[row.id] = row._order;
        }
      }

      this.$http.post(this.$root.requests.updateOrder, {
        model: this.model.slug,
        rows: rows
      }).then(function (response) {
        var data = response.data;
        if (data && 'type' in data) return _this2.$root.openAlert(data.title, data.message, 'danger');

        _this2.enableDragging();
      })["catch"](function (response) {
        this.$root.errorResponseLayer(response);
        this.enableDragging();
      });
    },
    getDateByField: function getDateByField(row, key) {
      if (key in this.model.fields) return row[key];
      return moment(row[key]).format('DD.MM.Y HH:mm');
    },
    showInfo: function showInfo(row) {
      var data = '';
      if (row.created_at != null) data += this.trans('created-at') + ': <strong>' + this.getDateByField(row, 'created_at') + '</strong><br>';
      if (row.updated_at != null && this.model.editable != false) data += this.trans('last-change') + ': <strong>' + this.getDateByField(row, 'updated_at') + '</strong><br>';
      if (row.published_at != null) data += this.trans('published-at') + ': <strong>' + this.getDateByField(row, 'published_at') + '</strong>';
      this.$root.openAlert(this.trans('row-info-n') + ' ' + row.id, data, 'primary', null, function () {});
    },
    openGettextEditor: function openGettextEditor(item) {
      this.$parent.$parent.gettext_editor = item;
    },
    showHistory: function showHistory(row) {
      this.$parent.$parent.showHistory(row);
    },
    selectRow: function selectRow(row, data, model, history_id, model_row) {
      var _this3 = this;

      //If is selected same row
      if (this.row && this.row.id == row.id && !history_id) return; //Recieve just messages between form and rows in one model component

      if (model && this.model.slug != model) return; //Resets form

      if (row === true && data === null) return this.$parent.row = null;

      var render = function render(response) {
        for (var key in response) {
          row[key] = response[key];
        } //Bind model data


        _this3.$set(_this3.$parent.$parent, 'row', _.cloneDeep(row, true)); //Fix for single model with history support


        if (model_row) {
          for (var key in model_row) {
            _this3.$set(model_row, key, row[key]);
          }
        }

        _this3.$parent.$parent.closeHistory(history_id ? true : false); //When form will be fully loaded, we want turn off loader and scroll into this form.
        //This is better for heavy and big forms, which may be laggy in scrolling... So first we need wait
        //and then scroll. Much more smoother animation...


        _this3.$nextTick(function () {
          setTimeout(function () {
            _this3.loadingRow = false;

            _this3.scrollToForm();
          }, 100);
        });
      };

      this.loadingRow = row.id;

      if (data) {
        render(data);
      } else {
        this.$http.get(this.$root.requests.get('show', {
          model: this.model.slug,
          id: row.id,
          subid: history_id
        })).then(function (response) {
          var data = response.data;

          if (history_id) {
            this.$parent.$parent.history.data = response.data;
            data = data.row;
          }

          render(data);
        })["catch"](function (response) {
          this.$root.errorResponseLayer(response);
        });
      }
    },
    removeRow: function removeRow(row) {
      this.$parent.removeRow(row);
    },
    togglePublishedAt: function togglePublishedAt(row) {
      this.$parent.togglePublishedAt(row);
    },
    isImageField: function isImageField(field) {
      if (field in this.model.fields) {
        var field = this.model.fields[field];
        if ('image' in field) return true;
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
    scrollToForm: function scrollToForm() {
      var _this4 = this;

      //Allow scroll form only on full width table
      if (this.$parent.$parent.activeGridSize != 0) return;
      setTimeout(function () {
        var form = $('#' + _this4.formID),
            modalWrapper = form.parents('.modal[role="dialog"]:visible'); //If form is in canAdd feature, in modal.. then we want scroll modal and not whole window

        (modalWrapper.length ? modalWrapper : $('html, body')).animate({
          scrollTop: form.offset().top - 10
        }, _this4.$root.isTest ? 0 : 500);
      }, 25);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidebarRow_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarRow.vue */ "./src/Resources/js/components/Sidebar/SidebarRow.vue");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['rows', 'languages', 'langid', 'user', 'version', 'author'],
  components: {
    SidebarRow: _SidebarRow_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  watch: {
    rows: function rows(_rows) {
      var _this = this;

      this.$nextTick(function () {
        _this.addActiveTreeClasses();
      });
    }
  },
  computed: {
    year: function year() {
      return moment().format('Y');
    },
    groups: function groups() {
      var groups = this.rows;

      for (var key in groups) {
        //Is allowed module
        if (groups[key].active === true) continue;
        if (groups[key].active === false || !this.hasActiveModule(groups[key].submenu)) delete groups[key];
      }

      return groups;
    }
  },
  methods: {
    addActiveTreeClasses: function addActiveTreeClasses() {
      var owner = $('.sidebar li[data-slug="' + this.$router.currentRoute.params.model + '"]');
      owner.parent().addClass('menu-open').css('display', 'block').parents('.treeview').addClass('active');
      $('.sidebar .treeview-menu a').click(function () {
        $(this).parent().siblings('.active').removeClass('active').find('.menu-open').slideUp();
      });
    },
    hasActiveModule: function hasActiveModule(modules) {
      for (var key in modules) {
        if (modules[key].active === true) return true;

        if (modules[key].submenu && this.hasActiveModule(modules[key].submenu)) {
          return true;
        }
      }

      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/Resources/js/config.js");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sidebar-row',
  props: ['row', 'parent'],
  data: function data() {
    return {
      opened: false,
      levels: [],
      defaultIcon: 'fa-link'
    };
  },
  created: function created() {
    var levels = [];

    if (this.parent) {
      for (var i = 0; i < this.parent.length; i++) {
        levels.push(this.parent[i]);
      }
    }

    levels.push(this.row);
    return this.levels = levels;
  },
  mounted: function mounted() {
    var _this = this;

    this.openTree();
    eventHub.$on('closeMenu', function (parent) {
      if (_this.getParentLi() == parent || _this == parent) {
        return;
      }

      _this.opened = false;
    });
  },
  computed: {
    hasSubmenu: function hasSubmenu() {
      return this.row.submenu.length !== 0;
    },
    isGroup: function isGroup() {
      return this.row.slug.substr(0, _config__WEBPACK_IMPORTED_MODULE_0__["default"].groups_prefix.length) == _config__WEBPACK_IMPORTED_MODULE_0__["default"].groups_prefix;
    },
    hasChilds: function hasChilds() {
      for (var key in this.row.submenu) {
        return true;
      }

      return false;
    },
    isActive: function isActive() {
      return this.row.active !== false && this.row.in_menu !== false || this.opened == true;
    }
  },
  methods: {
    getParentLi: function getParentLi() {
      var parent = this,
          parents = [];

      while (parent.$options.name == 'sidebar-row') {
        parent = parent.$parent;
        parents.push(parent);
      }

      return parents[parents.length - 2] || this;
    },
    //Recursively open all menu items way up
    openTree: function openTree() {
      //If is opened actual model
      if (this.row.table != this.$router.history.current.params.model) {
        return;
      } //We need open all parent menus


      var parent = this;

      while (parent.$options.name == 'sidebar-row') {
        parent.opened = true;
        parent = parent.$parent;
      }
    },
    toggleMenu: function toggleMenu() {
      this.opened = !this.opened; //Close all menus which does not have same parent li as selected one

      eventHub.$emit('closeMenu', this.getParentLi());
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/BasePageView.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Views/BasePageView.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModelBuilder.vue */ "./src/Resources/js/components/Views/ModelBuilder.vue");
/* harmony import */ var _Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/ModelHelper.js */ "./src/Resources/js/components/Helpers/ModelHelper.js");
/* harmony import */ var _Partials_License_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Partials/License.vue */ "./src/Resources/js/components/Partials/License.vue");
/* harmony import */ var _Partials_CheckAssetsVersion_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Partials/CheckAssetsVersion.vue */ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue");
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




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'base-page-view',
  props: ['langid'],
  components: {
    ModelBuilder: _ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    License: _Partials_License_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    CheckAssetsVersion: _Partials_CheckAssetsVersion_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  mounted: function mounted() {
    if (typeof ga == 'function') {
      ga('send', 'pageview', 'auto');
    }
  },
  computed: {
    version: function version() {
      return this.$root.version;
    },

    /*
     * Return model from actual page
     */
    model: function model() {
      var model = _.cloneDeep(this.$root.models[this.$route.params.model]);

      return model ? Object(_Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(model) : null;
    },
    getGroup: function getGroup() {
      if (this.model.slug in this.$root.models) {
        return false;
      }

      for (var key in this.$root.models) {
        if (this.model.slug in this.$root.models[key].submenu) {
          return this.$root.models[key];
        }
      }

      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/DashBoardView.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Views/DashBoardView.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['langid'],
  mounted: function mounted() {},
  computed: {
    user: function user() {
      return this.$root.user;
    },
    layout: function layout() {
      var _this = this;

      this.$nextTick(function () {
        _this.$root.runInlineScripts(_this.$root.dashboard);
      });
      return this.$root.dashboard;
    }
  },
  methods: {
    trans: function trans(key) {
      return this.$root.trans(key);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Forms_FormBuilder_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Forms/FormBuilder.vue */ "./src/Resources/js/components/Forms/FormBuilder.vue");
/* harmony import */ var _Rows_ModelRowsBuilder_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Rows/ModelRowsBuilder.vue */ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue");
/* harmony import */ var _Partials_GettextExtension_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Partials/GettextExtension.vue */ "./src/Resources/js/components/Partials/GettextExtension.vue");
/* harmony import */ var _Partials_History_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Partials/History.vue */ "./src/Resources/js/components/Partials/History.vue");
/* harmony import */ var _Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Helpers/ModelHelper.js */ "./src/Resources/js/components/Helpers/ModelHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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






/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model_builder', 'langid', 'ischild', 'parentrow', 'activetab', 'hasparentmodel', 'parentActiveGridSize', 'scopes', 'allow_refreshing'],
  name: 'model-builder',
  components: {
    FormBuilder: _Forms_FormBuilder_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    ModelRowsBuilder: _Rows_ModelRowsBuilder_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    GettextExtension: _Partials_GettextExtension_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    History: _Partials_History_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      model: this.model_builder,
      sizes: [{
        size: 4,
        key: 'small',
        name: this.trans('grid-small'),
        active: false,
        disabled: this.model_builder.getSettings('grid.small.disabled', false)
      }, {
        size: 8,
        key: 'big',
        name: this.trans('grid-big'),
        active: false,
        disabled: this.model_builder.getSettings('grid.big.disabled', false)
      }, {
        size: 6,
        key: 'medium',
        name: this.trans('grid-medium'),
        active: false,
        disabled: this.model_builder.getSettings('grid.medium.disabled', false)
      }, {
        size: 0,
        key: 'full',
        name: this.trans('grid-full'),
        active: false,
        disabled: this.model_builder.getSettings('grid.full.disabled', false)
      }],
      row: this.emptyRowInstance(this.model_builder),

      /*
       * Search engine
       */
      search: {
        column: this.model_builder.getModelProperty('settings.search.column', null),
        query: null,
        query_to: null,
        used: false,
        interval: false
      },

      /*
       * Loaded rows from db
       */
      rows: {
        data: [],
        buttons: {},
        count: 0,
        loaded: false,
        save_children: []
      },

      /*
       * History for selected row
       */
      history: {
        history_id: null,
        data: {},
        id: null,
        rows: [],
        fields: []
      },
      //Additional layouts/components for model
      layouts: [],
      registered_components: [],
      language_id: null,
      selected_language_id: null,
      progress: false,
      depth_level: 0,
      gettext_editor: null
    };
  },
  created: function created() {
    //For file paths
    this.root = this.$root.$http.$options.root; //Set deep level of models

    this.setDeepLevel();
  },
  mounted: function mounted() {
    this.checkIfCanShowLanguages();
    this.initSearchSelectboxes();
    this.resetSearchBar();
    this.updateParentChildData();
    this.setModelEvents();
    this.checkParentGridSize(this.parentActiveGridSize);
  },
  destroyed: function destroyed() {
    this.removeModelEvents();
  },
  watch: {
    //We want model reactive, when something changed in root models list
    model_builder: {
      deep: true,
      handler: function handler(newObject, oldObject) {
        for (var key in newObject) {
          if (newObject[key] != oldObject[key]) {
            this.$set(this.model, key, newObject[key]);
          }
        }
      }
    },
    parentActiveGridSize: function parentActiveGridSize(parentSize) {
      this.checkParentGridSize(parentSize);
    },
    search: {
      deep: true,
      handler: function handler(search, oldsearch) {
        //Update select
        this.reloadSearchBarSelect();
      }
    },
    activetab: function activetab(value) {
      if (value === true) {
        this.sendRowsData();
      }
    },
    parentrow: function parentrow(row, oldrow) {
      //When parent row has been changed, then load children rows
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(row, oldrow) && (row.id != oldrow.id || this.model.isInParent())) {
        var children = null; //Get rows builder child

        for (var i = 0; i < this.$children.length; i++) {
          if ('reloadRows' in this.$children[i]) {
            children = this.$children[i];
            break;
          }
        }

        if (children) {
          children.reloadRows();
        }
      }
    },

    /*
     * Register all layout components
     */
    layouts: function layouts(_layouts) {
      var Vue = this;

      for (var key in _layouts) {
        var layout = _layouts[key];
        this.registerComponents(_layouts);

        if (layout.type == 'blade') {
          this.$root.runInlineScripts(layout.view);
        }
      }
    }
  },
  methods: {
    checkParentGridSize: function checkParentGridSize(parentSize) {
      if ([null, undefined].indexOf(parentSize) > -1) return;

      for (var key in this.sizes) {
        //If grid parent size is on full width, then enable all grid sizes in this model
        if (parentSize == 0 && this.depth_level <= 1) {
          this.sizes[key].disabled = false;
        } //If grid parent size has small form, or model is sub in third level, then disable all except full screen
        else if ((parentSize == 8 || this.depth_level >= 2) && [0].indexOf(this.sizes[key].size) === -1) {
            this.sizes[key].disabled = true;
          } //Disable all small sizes
          else if ([0, 6].indexOf(this.sizes[key].size) === -1) {
              this.sizes[key].disabled = true;
            } //Enable other options
            else {
                this.sizes[key].disabled = false;
              }
      }
    },
    changeLanguage: function changeLanguage(id) {
      this.$root.language_id = id;
    },
    getLangName: function getLangName(lang) {
      return this.$root.getLangName(lang);
    },

    /*
     * Send all avaiable row events
     */
    sendRowData: function sendRowData() {
      this.emitRowData('getRow');
      this.emitRowData('getParentRow');
    },
    emitRowData: function emitRowData(type, data) {
      if (data && data.table && data.table != this.model.table) return;
      eventHub.$emit(type, {
        model: this.model,
        table: this.model.table,
        slug: this.model.table,
        row: this.row,
        rows: this.rows.data,
        count: this.rows.count,
        component: this,
        depth_level: this.depth_level
      });
    },
    setModelEvents: function setModelEvents() {
      var _this = this;

      eventHub.$on('sendRow', this.sendRowEvent = function (data) {
        _this.emitRowData('getRow', data);
      });
      eventHub.$on('sendParentRow', this.sendParentRowEvent = function (data) {
        //Skip child components
        if (!data || !(_this.depth_level < data.depth_level)) return;

        _this.emitRowData('getParentRow', data);
      });
    },
    removeModelEvents: function removeModelEvents() {
      eventHub.$off('sendRowEvent', this.sendRowEvent);
      eventHub.$off('sendParentRow', this.sendParentRowEvent);
    },
    updateSearchQuery: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.debounce(function (input, e) {
      this.search[input] = e.target.value;
    }, 300),

    /*
     * Returns correct values into multilangual select
     */
    languageOptionsSearchFilter: function languageOptionsSearchFilter(array) {
      return this.$root.languageOptions(array, this.model.fields[this.search.column]);
    },
    showHistory: function showHistory(row) {
      this.$http.get(this.$root.requests.get('getHistory', {
        model: this.model.slug,
        id: row.id
      })).then(function (response) {
        var data = response.data;
        if (data.length <= 1) return this.$root.openAlert(this.trans('info'), this.trans('no-changes'), 'warning');
        this.history.id = row.id;
        this.history.rows = data;
      })["catch"](function (response) {
        this.$root.errorResponseLayer(response);
      });
    },
    getComponents: function getComponents(type) {
      var _this2 = this;

      return this.layouts.filter(function (item) {
        if (_this2.registered_components.indexOf(item.name) === -1) return false;
        return item.position == type;
      }).map(function (item) {
        return _this2.getComponentName(item.name);
      });
    },
    registerComponents: function registerComponents(layouts) {
      for (var i = 0; i < layouts.length; i++) {
        var name = layouts[i].name,
            data = layouts[i].view,
            obj;

        if (layouts[i].type == 'vuejs') {
          try {
            obj = this.$root.getComponentObject(data);
          } catch (error) {
            console.error('Syntax error in component ' + layouts[i].name + '.Vue' + "\n", error);
            continue;
          }
        } //Create blade component
        else {
            var data = $(data);
            data.find('script').remove();
            data.find('style').remove();
            obj = {
              template: '<div class="my-component" data-component="' + name + '">' + data.html() + '</div>'
            };
          }

        this.registered_components.push(name);
        Vue.component(this.getComponentName(name), obj);
      }
    },
    getComponentName: function getComponentName(name) {
      return name + 'Layout';
    },

    /*
     * Send into parent model all actual row and data changes
     */
    updateParentChildData: function updateParentChildData() {
      this.$watch('rows.data', function (data) {
        this.sendRowsData();
      });
    },
    sendRowsData: function sendRowsData() {
      this.emitRowData('rowsChanged');
    },
    resetSearchBar: function resetSearchBar() {
      //On change column reset input
      this.$watch('search.column', function (column, prevcolumn) {
        //Reset searched value if previous column was select or option
        if (prevcolumn && prevcolumn in this.model.fields && ['select', 'option'].indexOf(this.model.fields[prevcolumn].type) !== -1) this.search.query = null;
        this.search.interval = false;
        this.reloadDatetimeSearch();
      });
    },
    setDeepLevel: function setDeepLevel() {
      var parent = this.$parent,
          depth = 0;

      while (parent.$options.name != 'base-page-view') {
        if (parent.$options.name == 'model-builder') depth++;
        parent = parent.$parent;
      }

      this.depth_level = depth;
    },
    initSearchSelectboxes: function initSearchSelectboxes() {
      window.js_date_event = document.createEvent('HTMLEvents');
      var dispached = false;
      js_date_event.initEvent('change', true, true);
      $('#' + this.getFilterId + ' .js_chosen').chosen({
        disable_search_threshold: 5
      }).on('change', function () {
        if (dispached == false) {
          dispached = true;
          this.dispatchEvent(js_date_event);
        } else {
          dispached = false;
        }
      });
    },
    reloadDatetimeSearch: function reloadDatetimeSearch() {
      var _this3 = this;

      if (!this.isDate) return;
      var column = this.search.column; //Add datepickers

      $('#' + this.getFilterId + ' .js_date').datetimepicker({
        lang: this.$root.locale,
        format: column == 'created_at' ? 'd.m.Y' : this.model.fields[column].date_format,
        timepicker: column == 'created_at' ? false : this.model.fields[column].type != 'date',
        datepicker: column == 'created_at' ? true : this.model.fields[column].type != 'time',
        scrollInput: false,
        onChangeDateTime: function onChangeDateTime(current_date_time, e) {
          _this3.search[e.attr('data-search-date') === undefined ? 'query_to' : 'query'] = moment(current_date_time).format('DD.MM.Y');
        }
      });
    },
    getParentTableName: function getParentTableName(force) {
      var row = this.$parent.row; //if is model loaded in field, and has parent row, then load model of that parent

      if (this.hasparentmodelMutated && _typeof(this.hasparentmodelMutated) == 'object' && 'slug' in this.hasparentmodelMutated) return this.hasparentmodelMutated.slug;

      if (force !== true && (!row || !('id' in row) || this.hasparentmodelMutated === false)) {
        return 0;
      }

      return this.$parent.model.slug;
    },

    /*
     * Returns if model has next childs
     */
    hasChilds: function hasChilds() {
      var length = 0;

      for (var key in this.model.childs) {
        length++;
      }

      return length;
    },
    hasModelsInGroups: function hasModelsInGroups(childs) {
      for (var i = 0; i < childs.length; i++) {
        //Check if group field is tab
        if (_typeof(childs[i]) != 'object') {
          continue;
        } //If model is in recursive tabs or group


        if (childs[i].model) {
          return true;
        } //If tab has other childs, then check recursive


        if (childs[i].fields.length > 0) {
          if (this.hasModelsInGroups(childs[i].fields)) {
            return true;
          }
        }
      }

      return false;
    },
    getStorage: function getStorage() {
      return $.parseJSON(localStorage.sizes || '{}') || {};
    },
    enableOnlyFullScreen: function enableOnlyFullScreen() {
      for (var key in this.sizes) {
        if (key != 3) {
          this.sizes[key].disabled = true;
          this.sizes[key].active = false;
        }
      }

      return this.sizes[3].active = true;
    },
    checkActiveGridSize: function checkActiveGridSize(columns) {
      var data = this.getStorage(),
          defaultValue = this.model.getSettings('grid.default'),
          columns = Object.keys(columns); //Disable big table

      if (columns.length >= 5) this.sizes[0].disabled = true; //Full screen

      if (!this.canShowForm || this.model.isSingle()) {
        return this.enableOnlyFullScreen();
      } //Select size from storage


      if (this.model.slug in data && data[this.model.slug + '_default'] == defaultValue) {
        for (var key in this.sizes) {
          if (this.sizes[key].size == data[this.model.slug]) {
            return this.sizes[key].active = true;
          }
        }
      } else if (defaultValue !== null) {
        // If model has default grid property
        for (var key in this.sizes) {
          if (this.sizes[key].size == defaultValue || this.sizes[key].key == defaultValue) {
            return this.sizes[key].active = true;
          }
        }
      }
      /*
       * When is localStorage value empty, then automatic chose the best grid value.
       * In this case we need check for all full screen options
       */


      if (this.hasModelsInGroups(this.model.fields_groups) || this.hasChilds() > 0 || columns.length > this.fullSizeByColumns()) {
        return this.sizes[3].active = true;
      } //50/50


      this.sizes[2].active = true;
    },
    fullSizeByColumns: function fullSizeByColumns() {
      if (window.innerWidth < 1500) {
        return 4;
      }

      return 5;
    },
    changeSize: function changeSize(row) {
      if (row.disabled == true) return false;

      for (var key in this.sizes) {
        this.sizes[key].active = false;
      }

      row.active = true;
    },
    checkIfCanShowLanguages: function checkIfCanShowLanguages() {
      var languages_active = false;

      for (var i = 0; i < this.$parent.$children.length; i++) {
        var parent = this.$parent.$children[i];

        while ('model' in parent) {
          if (parent.model.localization == true) {
            languages_active = true;
          }

          parent = parent.$parent;
        }
      } //Show or hide languages menu


      this.$root.languages_active = languages_active ? true : false;
    },
    getSearchingColumnName: function getSearchingColumnName(column) {
      if (column == 'id') {
        return this.trans('number');
      }

      if (column == 'created_at') {
        return this.trans('created-at');
      }

      if (!column || !(column in this.model.fields)) {
        return this.model.getSettings('columns.' + column + '.name', this.trans('search-all'));
      }

      var field = this.model.fields[column],
          name = field.name && field.name.length > 20 ? field.name.substr(0, 20) + '...' : field.name;
      return name;
    },
    reloadSearchBarSelect: function reloadSearchBarSelect() {
      var _this4 = this;

      this.$nextTick(function () {
        $('#' + _this4.getFilterId + ' .js_chosen').trigger("chosen:updated");
      });
    },

    /*
     * Close history rows
     */
    closeHistory: function closeHistory(with_fields) {
      this.history.id = null;
      this.history.rows = [];

      if (!with_fields) {
        this.history.fields = [];
        this.history.history_id = null;
      }
    },
    newRowTitle: function newRowTitle() {
      return this.model.getSettings('buttons.create', this.trans('new-row'));
    },
    resetForm: function resetForm(scroll, dontResetIfNotOpened, resetActiveTab) {
      if (!dontResetIfNotOpened || this.isOpenedRow) {
        //We do not want reset object is is already empty instance
        //Because if component receives getParentRow, and then will be rewrited row observer
        //Changes in this component wont be interactive
        if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.row, this.emptyRowInstance())) {
          this.row = this.emptyRowInstance();
        }
      }

      if (scroll === true) {
        this.scrollTo('#' + this.formID);
        this.pulseForm();
      }

      if (resetActiveTab === true) {
        eventHub.$emit('changeActiveTab', {
          table: this.model.table,
          depth_level: this.depth_level,
          activetab: 0
        });
      }
    },
    pulseForm: function pulseForm() {
      var _this5 = this;

      //If is not full grid, then animate form
      if (this.activeGridSize == 0 && this.canShowRows && this.depth_level == 0) return;
      var form = $('#' + this.formID);
      form.addClass('animated shake');
      if (this.formPusling) return;
      this.formPusling = setTimeout(function () {
        form.removeClass('animated shake');
        _this5.formPusling = null;
      }, 1000);
    },
    emptyRowInstance: function emptyRowInstance(model) {
      var row = {},
          model = model || this.model,
          table; //Add foreign columns

      if (this.parentrow && model && model.foreign_column != null) {
        if (table = model.foreign_column[this.getParentTableName()]) row[table] = this.parentrow.id;
      } //Add default columns


      for (var key in model.fields) {
        row[key] = null;
      }

      return row;
    },
    getModel: function getModel(model) {
      //if is recursive model
      if (typeof model === 'string') {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.cloneDeep(this.$root.models[this.model.slug]);
      }

      return Object(_Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(model);
    },
    resetIterval: function resetIterval() {
      this.search.query = '';
      this.search.query_to = '';
    }
  },
  computed: {
    activeGridSize: function activeGridSize() {
      var _this6 = this;

      var size = this.sizes.filter(function (row) {
        if (row.active == true) {
          var rows = _this6.getStorage();

          rows[_this6.model.slug] = row.size;
          rows[_this6.model.slug + '_default'] = _this6.model.getSettings('grid.default');
          localStorage.sizes = JSON.stringify(rows);
        }

        return row.active == true;
      });
      return size[0] ? size[0].size : null;
    },
    canShowAdminHeader: function canShowAdminHeader() {
      if (this.model.getSettings('grid.header', true) === false) {
        return false;
      }

      return this.ischild && !this.model.isSingle() && (!this.model.in_tab || this.isEnabledGrid || this.canShowSearchBar) || !this.model.isSingle() && (this.isEnabledGrid || this.canShowSearchBar);
    },
    selectedRootLanguage: function selectedRootLanguage() {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(this.languages, {
        id: parseInt(this.langid)
      });
    },
    hasLanguages: function hasLanguages() {
      return this.languages.length > 0;
    },
    isActiveLanguageSwitch: function isActiveLanguageSwitch() {
      return this.$root.languages_active == true ? 1 : 0;
    },
    formID: function formID() {
      return 'form-' + this.depth_level + '-' + this.model.slug;
    },
    hasparentmodelMutated: function hasparentmodelMutated() {
      //If parent model builder does not exists
      if ([null, undefined].indexOf(this.hasparentmodel) > -1) return true;
      return this.hasparentmodel;
    },
    canBeInterval: function canBeInterval() {
      var column = this.search.column;
      if (['created_at', 'id'].indexOf(column) > -1) return true;
      return column in this.model.fields && ['integer', 'decimal', 'date', 'datetime', 'time'].indexOf(this.model.fields[column].type) > -1 ? true : false;
    },
    canResetSearch: function canResetSearch() {
      return this.search.query || this.search.query_to;
    },
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    },

    /*
     * Return if acutal model can be added without parent row, and if parent row is not selected
     */
    isWithoutParentRow: function isWithoutParentRow() {
      return this.model.without_parent == true && this.parentrow && this.$parent.isOpenedRow !== true && this.hasparentmodelMutated == true;
    },
    getFilterId: function getFilterId() {
      return 'js_filter' + this.getModelKey;
    },
    getModelKey: function getModelKey() {
      return this.model.slug + '-' + this.getParentTableName();
    },
    //Checks if is enabled grid system
    isEnabledGrid: function isEnabledGrid() {
      var enabled = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(this.sizes, {
        disabled: false
      }),
          active = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(this.sizes, {
        active: true
      });

      if (enabled.length <= 1 || active && active.disabled == true) {
        //Disable all active items
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(this.sizes, {
          active: true
        }).forEach(function (item) {
          item.active = false;
        });

        if (enabled[0]) {
          enabled[0].active = true;
        }

        return false;
      }

      if (this.model.getSettings('grid.enabled') === false || this.model.getSettings('grid.disabled') === true) return false;
      return true;
    },
    canShowRows: function canShowRows() {
      if (!this.hasRows) return false;

      if (this.model.hasAccess('read') == false) {
        return false;
      }

      if (this.model.isSingle()) {
        this.enableOnlyFullScreen();
        return false;
      }

      return true;
    },
    canAddRow: function canAddRow() {
      //Disabled adding new rows
      if (this.model.insertable == false || !this.model.hasAccess('insert')) {
        return false;
      } //Unlimited allowed rows


      if (this.model.maximum == 0) {
        return true;
      }

      if (this.model.maximum <= this.rows.count) {
        return false;
      }

      return true;
    },
    canShowForm: function canShowForm() {
      if ((!this.isOpenedRow && !this.canAddRow || this.isOpenedRow && this.model.editable == false) && !this.model.isInParent()) {
        return false;
      } //If user does not have write permissions


      if (!this.isOpenedRow && this.model.hasAccess('insert') == false) {
        return false;
      }

      return true;
    },
    hasRows: function hasRows() {
      if (this.rows.loaded == false && this.model.maximum != 1) return true;
      return this.rows.data.length > 0;
    },

    /*
     * Show search if has been at least one time used, or if is not single row, or if is more then 10 rows
     */
    canShowSearchBar: function canShowSearchBar() {
      var searching = this.model.getSettings('search.enabled', null),
          minimum = 2; //If is forced showing searchbar

      if (searching === true) return true;else if (searching === false) return false;
      return this.search.used === true || (this.model.maximum == 0 || this.model.maximum >= minimum) && this.rows.count >= minimum;
    },
    getSearchableFields: function getSearchableFields() {
      var keys = []; //Get searchable fields

      for (var key in this.model.fields) {
        var field = this.model.fields[key];

        if (!field.name || 'belongToMany' in field || 'multiple' in field || 'removeFromForm' in field && 'hidden' in field || field.type == 'password') {
          continue;
        }

        keys.push(key);
      }

      return keys;
    },

    /*
     * Search columns
     */
    isSearch: function isSearch() {
      return this.isCheckbox || this.isDate || this.isSelect ? false : true;
    },
    isCheckbox: function isCheckbox() {
      var column = this.search.column;
      return column && column in this.model.fields && this.model.fields[column].type == 'checkbox' ? true : false;
    },
    isDate: function isDate() {
      var column = this.search.column;
      if (column == 'created_at') return true;
      return column && column in this.model.fields && ['date', 'datetime', 'time'].indexOf(this.model.fields[column].type) > -1 ? true : false;
    },
    isSelect: function isSelect() {
      var column = this.search.column;
      return column && column in this.model.fields && ['select', 'radio'].indexOf(this.model.fields[column].type) > -1 ? true : false;
    },
    isSearching: function isSearching() {
      return this.search.used == true;
    },
    isLocaleModel: function isLocaleModel() {
      if (this.model.localization === true) return true;

      for (var key in this.model.fields) {
        if (this.model.fields[key].locale == true) return true;
      }

      return false;
    },
    languages: function languages() {
      return this.$root.languages;
    }
  }
});

/***/ }),

/***/ "./node_modules/jquery-form/jquery.form.js":
/*!*************************************************!*\
  !*** ./node_modules/jquery-form/jquery.form.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */

// AMD support
(function (factory) {
    "use strict";
    if (true) {
        // using AMD; register as anon module
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}

(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
$.fn.attr2 = function() {
    if ( ! hasProp ) {
        return this.attr.apply(this, arguments);
    }
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' ) {
        return val;
    }
    return this.attr.apply(this, arguments);
};

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }
    else if ( options === undefined ) {
        options = {};
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || $.ajaxSettings.type,
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    if (options.error) {
        var oldError = options.error;
        options.error = function(xhr, status, error) {
            var context = options.context || this;
            oldError.apply(context, [xhr, status, error, $form]);
        };
    }

     if (options.complete) {
        var oldComplete = options.complete;
        options.complete = function(xhr, status) {
            var context = options.context || this;
            oldComplete.apply(context, [xhr, status, $form]);
        };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++) {
        elements[k] = null;
    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData, options.traditional).split('&');
        var len = serialized.length;
        var result = [];
        var i, part;
        for (i=0; i < len; i++) {
            // #252; undo param space replacement
            serialized[i] = serialized[i].replace(/\+/g,' ');
            part = serialized[i].split('=');
            // #278; use array instead of object storage, favoring array serializations
            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (i=0; i < serializedData.length; i++) {
                if (serializedData[i]) {
                    formdata.append(serializedData[i][0], serializedData[i][1]);
                }
            }
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    }, false);
                }
                return xhr;
            };
        }

        s.data = null;
        var beforeSend = s.beforeSend;
        s.beforeSend = function(xhr, o) {
            //Send FormData() provided by user
            if (options.formData) {
                o.data = options.formData;
            }
            else {
                o.data = formdata;
            }
            if(beforeSend) {
                beforeSend.call(this, xhr, o);
            }
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var deferred = $.Deferred();

        // #341
        deferred.abort = function(status) {
            xhr.abort(status);
        };

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( hasProp ) {
                    el.prop('disabled', false);
                }
                else {
                    el.removeAttr('disabled');
                }
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr2('name');
            if (!n) {
                $io.attr2('name', id);
            }
            else {
                id = n;
            }
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;

                try { // #214, #257
                    if (io.contentWindow.document.execCommand) {
                        io.contentWindow.document.execCommand('Stop');
                    }
                }
                catch(ignore) {}

                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error) {
                    s.error.call(s.context, xhr, e, status);
                }
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, e]);
                }
                if (s.complete) {
                    s.complete.call(s.context, xhr, e);
                }
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;
                
        function getDoc(frame) {
            /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */
            
            var doc = null;
            
            // IE8 cascading access check
            try {
                if (frame.contentWindow) {
                    doc = frame.contentWindow.document;
                }
            } catch(err) {
                // IE8 access denied under ssl & missing protocol
                log('cannot get iframe.contentWindow document: ' + err);
            }

            if (doc) { // successful getting content
                return doc;
            }

            try { // simply checking may throw in ie8 under ssl or mismatched protocol
                doc = frame.contentDocument ? frame.contentDocument : frame.document;
            } catch(err) {
                // last attempt
                log('cannot get iframe.contentDocument: ' + err);
                doc = frame.document;
            }
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr2('target'), 
                a = $form.attr2('action'), 
                mp = 'multipart/form-data',
                et = $form.attr('enctype') || $form.attr('encoding') || mp;

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method || /post/i.test(method) ) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized') {
                        setTimeout(checkState,50);
                    }
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle) {
                        clearTimeout(timeoutHandle);
                    }
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                }
                if (io.attachEvent) {
                    io.attachEvent('onload', cb);
                }
                else {
                    io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);

                try {
                    form.submit();
                } catch(err) {
                    // just in case form has element with name/id of 'submit'
                    var submitFn = document.createElement('form').submit;
                    submitFn.apply(form);
                }
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                form.setAttribute('enctype', et); // #380
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            
            doc = getDoc(io);
            if(!doc) {
                log('cannot access response document');
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut) {
                    return;
                }
            }
            if (io.detachEvent) {
                io.detachEvent('onload', cb);
            }
            else {
                io.removeEventListener('load', cb, false);
            }

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml) {
                    s.dataType = 'xml';
                }
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header.toLowerCase()];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (err) {
                    status = 'parsererror';
                    xhr.error = errMsg = (err || status);
                }
            }
            catch (err) {
                log('error caught: ',err);
                status = 'error';
                xhr.error = errMsg = (err || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success) {
                    s.success.call(s.context, data, 'success', xhr);
                }
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g) {
                    $.event.trigger("ajaxSuccess", [xhr, s]);
                }
            }
            else if (status) {
                if (errMsg === undefined) {
                    errMsg = xhr.statusText;
                }
                if (s.error) {
                    s.error.call(s.context, xhr, status, errMsg);
                }
                deferred.reject(xhr, 'error', errMsg);
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }
            }

            if (g) {
                $.event.trigger("ajaxComplete", [xhr, s]);
            }

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete) {
                s.complete.call(s.context, xhr, status);
            }

            callbackProcessed = true;
            if (s.timeout) {
                clearTimeout(timeoutHandle);
            }

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget) {
                    $io.remove();
                }
                else { //adding else to clean up existing iframe response.
                    $io.attr('src', s.iframeSrc);
                }
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error) {
                    $.error('parsererror');
                }
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(e.target).ajaxSubmit(options); // #365
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var formId = this.attr('id');
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    var els2;

    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
        els = $(els).get();  // convert to standard array
    }

    // #386; account for inputs outside the form which use the 'form' attribute
    if ( formId ) {
        els2 = $(':input[form=' + formId + ']').get();
        if ( els2.length ) {
            els = (els || []).concat(els2);
        }
    }

    if (!els || !els.length) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n || el.disabled) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements) {
                elements.push(el);
            }
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file') {
            if (elements) {
                elements.push(el);
            }
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements) {
                elements.push(el);
            }
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array) {
            $.merge(val, v);
        }
        else {
            val.push(v);
        }
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
		else if (t == "file") {
			if (/MSIE/.test(navigator.userAgent)) {
				$(this).replaceWith($(this).clone(true));
			} else {
				$(this).val('');
			}
		}
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
                this.value = '';
            }
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug) {
        return;
    }
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

}));



/***/ }),

/***/ "./node_modules/jquery-mousewheel/jquery.mousewheel.js":
/*!*************************************************************!*\
  !*** ./node_modules/jquery-mousewheel/jquery.mousewheel.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( true ) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/popper.js/dist/esm/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/popper.js/dist/esm/popper.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["default"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/sortablejs/modular/sortable.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/sortablejs/modular/sortable.esm.js ***!
  \*********************************************************/
/*! exports provided: default, MultiDrag, Sortable, Swap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiDrag", function() { return MultiDragPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sortable", function() { return Sortable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Swap", function() { return SwapPlugin; });
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var version = "1.10.2";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !!
    /*@__PURE__*/
    navigator.userAgent.match(pattern);
  }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};

function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function matches(
/**HTMLElement*/
el,
/**String*/
selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}

function closest(
/**HTMLElement*/
el,
/**String*/
selector,
/**HTMLElement*/
ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;

    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }

      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }

  return null;
}

var R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}

function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function matrix(el, selfOnly) {
  var appliedTransforms = '';

  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */

    } while (!selfOnly && (el = el.parentNode));
  }

  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */

  return matrixFn && new matrixFn(appliedTransforms);
}

function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;

    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }

    return list;
  }

  return [];
}

function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;

  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */


function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;

  if (el !== window && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */

      } while (container = container.parentNode);
    }
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}
/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */


function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
  /* jshint boss:true */

  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;

    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }

    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }

  return false;
}
/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */


function getChild(el, childNum, options) {
  var currentChild = 0,
      i = 0,
      children = el.children;

  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }

      currentChild++;
    }

    i++;
  }

  return null;
}
/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */


function lastChild(el, selector) {
  var last = el.lastElementChild;

  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }

  return last || null;
}
/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */


function index(el, selector) {
  var index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }
  /* jshint boss:true */


  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }

  return index;
}
/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */


function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();

  if (el) {
    do {
      var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }

  return [offsetLeft, offsetTop];
}
/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */


function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }

  return -1;
}

function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;

  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);

      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */

  } while (elem = elem.parentNode);

  return getWindowScrollingElement();
}

function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }

  return dst;
}

function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}

var _throttleTimeout;

function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
          _this = this;

      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }

      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}

function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}

var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
      animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });

        var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);

          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }

        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;

      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }

      var animating = false,
          animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);

        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }

        target.toRect = toRect;

        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        } // if fromRect != toRect: animate


        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;

          if (!time) {
            time = _this.options.animation;
          }

          _this.animate(target, animatingRect, toRect, time);
        }

        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);

      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }

      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}

function repaint(target) {
  return target.offsetWidth;
}

function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }

    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;

    this.eventCanceled = false;

    evt.cancel = function () {
      _this.eventCanceled = true;
    };

    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
          sortable: sortable
        }, evt));
      } // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined


      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized; // Add default options from plugin

      _extends(defaults, initialized.defaults);
    });

    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);

      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;

      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
      options = sortable.options,
      onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }

  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

  var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }

  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }

  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, ["evt"]);

  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};

function _dispatchEvent(info) {
  dispatchEvent(_objectSpread({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}

var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance,
    // For positioning ghost absolutely
ghostRelativeParent,
    ghostRelativeParentInitialScroll = [],
    // (left, top)
_silent = false,
    savedInputChecked = [];
/** @const */

var documentExists = typeof document !== 'undefined',
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
    // This will not pass for IE9, because IE9 DnD only works on anchors
supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
    supportCssPointerEvents = function () {
  if (!documentExists) return; // false when <= IE11

  if (IE11OrLess) {
    return false;
  }

  var el = document.createElement('x');
  el.style.cssText = 'pointer-events:auto';
  return el.style.pointerEvents === 'auto';
}(),
    _detectDirection = function _detectDirection(el, options) {
  var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

  if (elCSS.display === 'flex') {
    return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
  }

  if (elCSS.display === 'grid') {
    return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
  }

  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
    var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
    return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
  }

  return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
},
    _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
},

/**
 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
 * @param  {Number} x      X position
 * @param  {Number} y      Y position
 * @return {HTMLElement}   Element of the first found nearest Sortable
 */
_detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
  var ret;
  sortables.some(function (sortable) {
    if (lastChild(sortable)) return;
    var rect = getRect(sortable),
        threshold = sortable[expando].options.emptyInsertThreshold,
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

    if (threshold && insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
},
    _prepareGroup = function _prepareGroup(options) {
  function toFn(value, pull) {
    return function (to, from, dragEl, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

      if (value == null && (pull || sameGroup)) {
        // Default pull value
        // Default pull and put value if same group
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === 'clone') {
        return value;
      } else if (typeof value === 'function') {
        return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }

  var group = {};
  var originalGroup = options.group;

  if (!originalGroup || _typeof(originalGroup) != 'object') {
    originalGroup = {
      name: originalGroup
    };
  }

  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
},
    _hideGhostForTarget = function _hideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', 'none');
  }
},
    _unhideGhostForTarget = function _unhideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', '');
  }
}; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


if (documentExists) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}

var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;

    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

    if (nearest) {
      // Create imitation event
      var event = {};

      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }

      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;

      nearest[expando]._onDragOver(event);
    }
  }
};

var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */


function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }

  this.el = el; // root element

  this.options = options = _extends({}, options); // Export instance

  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults); // Set default options

  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }

  _prepareGroup(options); // Bind all private methods


  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  } // Setup drag mode


  this.nativeDraggable = options.forceFallback ? false : supportDraggable;

  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  } // Bind events


  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }

  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }

  sortables.push(this.el); // Restore sorting

  options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

  _extends(this, AnimationStateManager());
}

Sortable.prototype =
/** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(
  /** Event|TouchEvent */
  evt) {
    if (!evt.cancelable) return;

    var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
        target = (touch || evt).target,
        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
        filter = options.filter;

    _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


    if (dragEl) {
      return;
    }

    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    } // cancel dnd if original target is content editable


    if (originalTarget.isContentEditable) {
      return;
    }

    target = closest(target, options.draggable, el, false);

    if (target && target.animated) {
      return;
    }

    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    } // Get the index of the dragged element within its parent


    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable); // Check filter

    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });

        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);

        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });

      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }

    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    } // Prepare `dragstart`


    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(
  /** Event */
  evt,
  /** Touch */
  touch,
  /** HTMLElement */
  target) {
    var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;

    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';

      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });

        if (Sortable.eventCanceled) {
          _this._onDrop();

          return;
        } // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove


        _this._disableDelayedDragEvents();

        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        } // Bind the events: dragstart/dragend


        _this._triggerDragStart(evt, touch); // Drag start event


        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        }); // Chosen item


        toggleClass(dragEl, options.chosenClass, true);
      }; // Disable "draggable"


      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }

      pluginEvent('delayStart', this, {
        evt: evt
      }); // Delay is impossible for native DnD in Edge or IE

      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();

          return;
        } // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag


        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
  /** TouchEvent|PointerEvent **/
  e) {
    var touch = e.touches ? e.touches[0] : e;

    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);

    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(
  /** Event */
  evt,
  /** Touch */
  touch) {
    touch = touch || evt.pointerType == 'touch' && evt;

    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }

    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {

    awaitingDragStarted = false;

    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });

      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }

      var options = this.options; // Apply effect

      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost(); // Drag start event

      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;

      _hideGhostForTarget();

      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;

      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }

      dragEl.parentNode[expando]._isOutsideThisEl(target);

      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });

            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }

          target = parent; // store last element
        }
        /* jshint boss:true */
        while (parent = parent.parentNode);
      }

      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(
  /**TouchEvent*/
  evt) {
    if (tapEvt) {
      var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
          dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
          dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }

        this._onDragStart(evt, true);
      }

      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }

        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }

      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
          options = this.options; // Position absolutely

      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;

        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }

        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }

        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }

      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl); // Set transform-origin

      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart(
  /**Event*/
  evt,
  /**boolean*/
  fallback) {
    var _this = this;

    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });

    if (Sortable.eventCanceled) {
      this._onDrop();

      return;
    }

    pluginEvent('setupClone', this);

    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';

      this._hideClone();

      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    } // #1143: IFrame support workaround


    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;

      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }

      _this._hideClone();

      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }

      on(document, 'drop', _this); // #1276 fix:

      css(dragEl, 'transform', 'translateZ(0)');
    }

    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;

    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(
  /**Event*/
  evt) {
    var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;

    if (_silent) return;

    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    } // Capture animation state


    function capture() {
      dragOverEvent('dragOverAnimationCapture');

      _this.captureAnimationState();

      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    } // Return invocation when dragEl is inserted (or completed)


    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }

        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }

        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        } // Animation


        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }

        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });

        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      } // Null lastTarget if it is not inside a previously swapped element


      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      } // no bubbling and not fallback


      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


        !insertion && nearestEmptyInsertDetectEvent(evt);
      }

      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    } // Call when dragEl has been inserted


    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }

    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }

    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;

    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }

    ignoreNextClick = false;

    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;

      if (revert) {
        parentEl = rootEl; // actualization

        capture();

        this._hideClone();

        dragOverEvent('revert');

        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }

        return completed(true);
      }

      var elLastChild = lastChild(el, options.draggable);

      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        } // assign target only if condition is true


        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }

        if (target) {
          targetRect = getRect(target);
        }

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
            side1 = vertical ? 'top' : 'left',
            scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }

        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;

        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);

          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        } // If dragEl is already beside target: Do not insert


        if (direction === 0 || sibling === target) {
          return completed(false);
        }

        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
            after = false;
        after = direction === 1;

        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }

          _silent = true;
          setTimeout(_unsilent, 30);
          capture();

          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          } // Undo chrome's scroll adjustment (has no effect on other browsers)


          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }

          parentEl = dragEl.parentNode; // actualization
          // must be done before animation

          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }

          changed();
          return completed(true);
        }
      }

      if (el.contains(dragEl)) {
        return completed(false);
      }
    }

    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop(
  /**Event*/
  evt) {
    var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);

    if (Sortable.eventCanceled) {
      this._nulling();

      return;
    }

    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);

    _cancelNextTick(this.cloneId);

    _cancelNextTick(this._dragStartId); // Unbind events


    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }

    this._offMoveEvents();

    this._offUpEvents();

    if (Safari) {
      css(document.body, 'user-select', '');
    }

    css(dragEl, 'transform', '');

    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }

      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }

      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }

        _disableDraggable(dragEl);

        dragEl.style['will-change'] = ''; // Remove classes
        // ghostClass is added in dragStarted

        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }

        toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });

        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            }); // Remove event


            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            }); // drag from one list and drop into another


            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }

          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }

        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }

          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          }); // Save sorting


          this.save();
        }
      }
    }

    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(
  /**Event*/
  evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);

        break;

      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);

          _globalDragOver(evt);
        }

        break;

      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },

  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;

    for (; i < n; i++) {
      el = children[i];

      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }

    return order;
  },

  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order) {
    var items = {},
        rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];

      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
  },

  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },

  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;

    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);

      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }

      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },

  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    } // Remove draggable attributes


    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });

    this._onDrop();

    this._disableDelayedDragEvents();

    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');

      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }

      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();

      return;
    }

    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return; // show clone at dragEl or original position

      if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }

      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }

      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};

function _globalDragOver(
/**Event*/
evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  evt.cancelable && evt.preventDefault();
}

function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }

  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);

  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }

  return retVal;
}

function _disableDraggable(el) {
  el.draggable = false;
}

function _unsilent() {
  _silent = false;
}

function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}

function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;

  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }

      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }

  invert = invert || invertSwap;

  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }

  return 0;
}
/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */


function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */


function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;

  while (i--) {
    sum += str.charCodeAt(i);
  }

  return sum.toString(36);
}

function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;

  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}

function _nextTick(fn) {
  return setTimeout(fn, 0);
}

function _cancelNextTick(id) {
  return clearTimeout(id);
} // Fixed #973:


if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
} // Export utils


Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};
/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */

Sortable.get = function (element) {
  return element[expando];
};
/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */


Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }

    if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
    PluginManager.mount(plugin);
  });
};
/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */


Sortable.create = function (el, options) {
  return new Sortable(el, options);
}; // Export


Sortable.version = version;

var autoScrolls = [],
    scrollEl,
    scrollRootEl,
    scrolling = false,
    lastAutoScrollX,
    lastAutoScrollY,
    touchEvt$1,
    pointerElemChangedInterval;

function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    }; // Bind all private methods

    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }

  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;

      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;

      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }

      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;

      var x = (evt.touches ? evt.touches[0] : evt).clientX,
          y = (evt.touches ? evt.touches[0] : evt).clientY,
          elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt; // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good

      if (fallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

        var ogElemScroller = getParentAutoScrollElement(elem, true);

        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }

            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }

        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}

function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}

function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}

var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
      y = (evt.touches ? evt.touches[0] : evt).clientY,
      sens = options.scrollSensitivity,
      speed = options.scrollSpeed,
      winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
      scrollCustomFn; // New scroll root, set scrollEl

  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;

    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }

  var layersOut = 0;
  var currentParent = scrollEl;

  do {
    var el = currentParent,
        rect = getRect(el),
        top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right,
        width = rect.width,
        height = rect.height,
        canScrollX = void 0,
        canScrollY = void 0,
        scrollWidth = el.scrollWidth,
        scrollHeight = el.scrollHeight,
        elCSS = css(el),
        scrollPosX = el.scrollLeft,
        scrollPosY = el.scrollTop;

    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }

    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }

    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);

      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */

        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

          }

          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }

          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }

    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();

  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};

function Revert() {}

Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();

    if (putSortable) {
      putSortable.captureAnimationState();
    }

    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }

    this.sortable.animateAll();

    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};

_extends(Revert, {
  pluginName: 'revertOnSpill'
});

function Remove() {}

Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};

_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }

  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
          target = _ref2.target,
          onMove = _ref2.onMove,
          activeSortable = _ref2.activeSortable,
          changed = _ref2.changed,
          cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
          options = this.options;

      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;

        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
          putSortable = _ref3.putSortable,
          dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
      p2 = n2.parentNode,
      i1,
      i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }

  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
    multiDragClones = [],
    lastMultiDragSelect,
    // for selection with modifier key down (SHIFT)
multiDragSortable,
    initialFolding = false,
    // Initial multi-drag fold when drag started
folding = false,
    // Folding any other time
dragStarted = false,
    dragEl$1,
    clonesFromRect,
    clonesHidden;

function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    if (sortable.options.supportPointer) {
      on(document, 'pointerup', this._deselectMultiDrag);
    } else {
      on(document, 'mouseup', this._deselectMultiDrag);
      on(document, 'touchend', this._deselectMultiDrag);
    }

    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';

        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }

        dataTransfer.setData('Text', data);
      }
    };
  }

  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
          cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;

      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }

      sortable._hideClone();

      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
          rootEl = _ref3.rootEl,
          dispatchSortableEvent = _ref3.dispatchSortableEvent,
          cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;

      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
          rootEl = _ref4.rootEl,
          cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;

      var sortable = _ref5.sortable,
          cloneNowHidden = _ref5.cloneNowHidden,
          cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');

        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;

      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }

      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      }); // Sort multi-drag elements

      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;

      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;

      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM
        sortable.captureAnimationState();

        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }

      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;

        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        } // Remove all auxiliary multidrag items from el, if sorting enabled


        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
          completed = _ref8.completed,
          cancel = _ref8.cancel;

      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
          rootEl = _ref9.rootEl,
          sortable = _ref9.sortable,
          dragRect = _ref9.dragRect;

      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
          isOwner = _ref10.isOwner,
          insertion = _ref10.insertion,
          activeSortable = _ref10.activeSortable,
          parentEl = _ref10.parentEl,
          putSortable = _ref10.putSortable;
      var options = this.options;

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }

        initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }

          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;

            activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
          isOwner = _ref11.isOwner,
          activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });

      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
          rootEl = _ref12.rootEl,
          parentEl = _ref12.parentEl,
          sortable = _ref12.sortable,
          dispatchSortableEvent = _ref12.dispatchSortableEvent,
          oldIndex = _ref12.oldIndex,
          putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
          children = parentEl.children; // Multi-drag selection

      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }

        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvt: evt
          }); // Modifier activated, select from last to dragEl

          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
                currentIndex = index(dragEl$1);

            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;

              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }

              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvt: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }

          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvt: evt
          });
        }
      } // Multi-drag drop


      if (dragStarted && this.isMultiDrag) {
        // Do not "unfold" after around dragEl if reverted
        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
              multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();

          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;

                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect; // Prepare unfold animation

                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed


            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }

              multiDragIndex++;
            }); // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.

            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });

              if (update) {
                dispatchSortableEvent('update');
              }
            }
          } // Must be done after capturing individual rects (scroll bar)


          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }

        multiDragSortable = toSortable;
      } // Remove clones if necessary


      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();

      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

      if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

      if (evt && evt.button !== 0) return;

      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvt: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();

          multiDragSortable = sortable;
        }

        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },

      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
            index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;

      var oldIndicies = [],
          newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        }); // multiDragElements will already be sorted if folding

        var newIndex;

        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }

        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();

        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }

        return key;
      }
    }
  });
}

function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}
/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */


function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}

function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ __webpack_exports__["default"] = (Sortable);



/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=template&id=eb181f52&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=template&id=eb181f52& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { disabled: _vm.disabled } },
    [
      _c(
        "label",
        {
          staticClass: "checkbox",
          attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
        },
        [
          _vm.field.locale
            ? _c("i", {
                staticClass: "fa localized fa-globe",
                attrs: {
                  "data-toggle": "tooltip",
                  title: _vm.trans("languages-field")
                }
              })
            : _vm._e(),
          _vm._v("\n        " + _vm._s(_vm.field_name) + " "),
          _vm.field.placeholder
            ? _c("span", [_vm._v(_vm._s(_vm.field.placeholder))])
            : _vm._e(),
          _vm._v(" "),
          _c("input", {
            staticClass: "ios-switch green",
            attrs: {
              type: "checkbox",
              value: "1",
              disabled: _vm.disabled,
              name: _vm.field_key
            },
            domProps: { checked: _vm.value == 1 },
            on: { change: _vm.changeValue }
          }),
          _vm._v(" "),
          _vm._m(0)
        ]
      ),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("div")])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=template&id=3490af7f&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=template&id=3490af7f& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: {
        disabled: _vm.disabled || _vm.readonly,
        "multiple-date": _vm.isMultipleDatepicker
      },
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v("\n        " + _vm._s(_vm.field_name) + " "),
        _vm.required
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("input", {
        ref: "input",
        staticClass: "form-control",
        attrs: {
          type: "text",
          disabled: _vm.disabled,
          readonly: _vm.readonly,
          name: _vm.isMultipleDatepicker ? "" : _vm.field_key,
          placeholder: _vm.field.placeholder || _vm.field_name
        },
        domProps: { value: _vm.value },
        on: { keyup: _vm.changeValue }
      }),
      _vm._v(" "),
      _vm.isMultipleDatepicker && _vm.getMultiDates.length == 0
        ? _c("input", {
            attrs: { type: "hidden", name: _vm.field_key + "[]", value: "" }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.getMultiDates, function(date) {
        return _vm.isMultipleDatepicker
          ? _c("input", {
              attrs: { type: "hidden", name: _vm.field_key + "[]" },
              domProps: { value: _vm.getMultiDateValue(date) }
            })
          : _vm._e()
      }),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/FileField.vue?vue&type=template&id=694e5abe&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/FileField.vue?vue&type=template&id=694e5abe& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: { disabled: _vm.disabled },
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v("\n        " + _vm._s(_vm.field_name) + "\n        "),
        _vm.required
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "file-group" }, [
        _c("div", { staticClass: "upload-file-wrapper" }, [
          _c("input", {
            ref: "fileInput",
            staticClass: "form-control",
            attrs: {
              disabled: _vm.disabled,
              type: "file",
              multiple: _vm.isMultipleUpload,
              name: _vm.isMultipleUpload ? _vm.field_key + "[]" : _vm.field_key,
              placeholder: _vm.field.placeholder || _vm.field_name
            },
            on: { change: _vm.addFile }
          }),
          _vm._v(" "),
          !_vm.value && _vm.file_will_remove == true
            ? _c("input", {
                attrs: { type: "hidden", name: "$remove_" + _vm.field_key },
                domProps: { value: 1 }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.canFileBeDeleted
            ? _c(
                "button",
                {
                  staticClass: "btn btn-danger remove-file",
                  attrs: {
                    type: "button",
                    "data-toggle": "tooltip",
                    title: "",
                    "data-original-title": _vm.trans("delete-file")
                  },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.removeFile($event)
                    }
                  }
                },
                [_c("i", { staticClass: "far fa-trash-alt" })]
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value:
                  _vm.isMultiple && !_vm.isMultirows && _vm.getFiles.length > 0,
                expression:
                  "(isMultiple && !isMultirows) && getFiles.length > 0"
              }
            ]
          },
          [
            _c(
              "select",
              {
                ref: "multipleFiles",
                attrs: {
                  name:
                    _vm.hasLocale ||
                    (_vm.isMultiple &&
                      !_vm.isMultirows &&
                      _vm.getFiles.length > 0)
                      ? "$uploaded_" + _vm.field_key + "[]"
                      : "",
                  "data-placeholder": " ",
                  multiple: ""
                }
              },
              _vm._l(_vm.getFiles, function(file) {
                return _c("option", { key: file, attrs: { selected: "" } }, [
                  _vm._v(_vm._s(file))
                ])
              }),
              0
            )
          ]
        ),
        _vm._v(" "),
        _c("small", [_vm._v(_vm._s(_vm.field.title))]),
        _vm._v(" "),
        _vm.canFileBeDownloaded
          ? _c(
              "span",
              [
                _c("file", {
                  attrs: {
                    file: _vm.value,
                    field: _vm.field_key_original,
                    model: _vm.model
                  }
                })
              ],
              1
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/NumberField.vue?vue&type=template&id=c87f8cde&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/NumberField.vue?vue&type=template&id=c87f8cde& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: { disabled: _vm.disabled || _vm.readonly },
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v("\n        " + _vm._s(_vm.field_name) + "\n        "),
        _vm.required
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: {
          type: "number",
          name: _vm.field_key,
          step: _vm.isDecimal ? _vm.getDecimalStep : "",
          placeholder: _vm.field.placeholder || _vm.field_name,
          disabled: _vm.disabled,
          readonly: _vm.readonly
        },
        domProps: { value: _vm.value },
        on: { keyup: _vm.changeValue }
      }),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/RadioField.vue?vue&type=template&id=10efe78f&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/RadioField.vue?vue&type=template&id=10efe78f& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group radio-group",
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v("\n        " + _vm._s(_vm.field_name) + "\n        "),
        _vm.required
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      !_vm.required
        ? _c("div", { staticClass: "radio" }, [
            _c("label", [
              _c("input", {
                attrs: { type: "radio", name: _vm.field_key, value: "" }
              }),
              _vm._v(
                "\n            " + _vm._s(_vm.trans("no-option")) + "\n        "
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.field.options, function(data) {
        return _c("div", { staticClass: "radio" }, [
          _c("label", [
            _c("input", {
              attrs: { type: "radio", name: _vm.field_key },
              domProps: {
                checked: _vm.hasValue(data[0], _vm.value),
                value: data[0]
              },
              on: { change: _vm.changeValue }
            }),
            _vm._v("\n\n            " + _vm._s(data[1]) + "\n        ")
          ])
        ])
      }),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/SelectField.vue?vue&type=template&id=2688193e&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/SelectField.vue?vue&type=template&id=2688193e& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.required || !_vm.hasNoFilterValues,
          expression: "required || !hasNoFilterValues"
        }
      ],
      staticClass: "form-group",
      class: {
        disabled: _vm.disabled || _vm.readonly || _vm.hasNoFilterValues
      },
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v("\n        " + _vm._s(_vm.field.name) + "\n        "),
        _vm.required || _vm.isRequiredIfHasValues
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "form-group__chosen-container",
          class: { "can-add-select": _vm.canAddRow }
        },
        [
          _vm.readonly
            ? _c(
                "select",
                {
                  staticClass: "d-none",
                  attrs: { name: !_vm.isMultiple ? _vm.field_key : "" }
                },
                [
                  !_vm.isMultiple
                    ? _c("option", { attrs: { value: "" } })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(_vm.missingValueInSelectOptions, function(mvalue) {
                    return _c("option", {
                      domProps: {
                        value: mvalue,
                        selected: _vm.hasValue(
                          mvalue,
                          _vm.value,
                          _vm.isMultiple
                        )
                      }
                    })
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.fieldOptions, function(data) {
                    return _c(
                      "option",
                      {
                        domProps: {
                          selected: _vm.hasValue(
                            data[0],
                            _vm.value,
                            _vm.isMultiple
                          ),
                          value: data[0]
                        }
                      },
                      [_vm._v(_vm._s(data[0]))]
                    )
                  })
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "select",
            {
              ref: "select",
              staticClass: "form-control",
              attrs: {
                disabled: _vm.disabled || _vm.readonly,
                name: !_vm.isMultiple ? _vm.field_key : "",
                "data-placeholder": _vm.field.placeholder
                  ? _vm.field.placeholder
                  : _vm.trans("select-option-multi"),
                multiple: _vm.isMultiple
              }
            },
            [
              !_vm.isMultiple
                ? _c("option", { attrs: { value: "" } }, [
                    _vm._v(_vm._s(_vm.trans("select-option")))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.missingValueInSelectOptions, function(mvalue) {
                return _c(
                  "option",
                  {
                    domProps: {
                      value: mvalue,
                      selected: _vm.hasValue(mvalue, _vm.value, _vm.isMultiple)
                    }
                  },
                  [_vm._v(_vm._s(mvalue))]
                )
              }),
              _vm._v(" "),
              _vm._l(_vm.fieldOptions, function(data) {
                return _c(
                  "option",
                  {
                    domProps: {
                      selected: _vm.hasValue(
                        data[0],
                        _vm.value,
                        _vm.isMultiple
                      ),
                      value: data[0]
                    }
                  },
                  [
                    _vm._v(
                      _vm._s(
                        data[1] == null
                          ? _vm.trans("number") + " " + data[0]
                          : data[1]
                      )
                    )
                  ]
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm.canAddRow
            ? _c(
                "button",
                {
                  staticClass: "btn-success",
                  attrs: {
                    "data-add-relation-row": "",
                    type: "button",
                    "data-target": "#" + _vm.getModalId,
                    "data-toggle": "modal"
                  },
                  on: {
                    click: function($event) {
                      _vm.allowRelation = true
                    }
                  }
                },
                [_c("i", { staticClass: "fa fa-plus" })]
              )
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))]),
      _vm._v(" "),
      _vm.isRequiredIfHasValues
        ? _c("input", {
            attrs: {
              type: "hidden",
              name: "$required_" + _vm.field_key,
              value: "1"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.canAddRow
        ? _c(
            "div",
            {
              staticClass: "modal fade",
              class: { "--inModal": _vm.isModalInModal },
              attrs: {
                id: _vm.getModalId,
                "data-keyboard": "false",
                tabindex: "-1",
                role: "dialog"
              }
            },
            [
              _c(
                "div",
                { staticClass: "modal-dialog", attrs: { role: "document" } },
                [
                  _c("div", { staticClass: "modal-content" }, [
                    _c("div", { staticClass: "modal-header" }, [
                      _c(
                        "button",
                        {
                          staticClass: "close",
                          attrs: { type: "button" },
                          on: { click: _vm.closeOpenedCanAddModal }
                        },
                        [
                          _c("span", { attrs: { "aria-hidden": "true" } }, [
                            _vm._v("×")
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c("h4", { staticClass: "modal-title" }, [_vm._v(" ")])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "modal-body" },
                      [
                        _vm.allowRelation
                          ? _c("model-builder", {
                              key: _vm.modelBuilderId,
                              attrs: {
                                langid: _vm.langid,
                                hasparentmodel: _vm.getRelationModelParent,
                                parentrow: _vm.getRelationRow,
                                allow_refreshing: _vm.isCanAddInParentMode
                                  ? false
                                  : true,
                                scopes: _vm.canAddScopes,
                                model_builder: _vm.getRelationModel
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    )
                  ])
                ]
              )
            ]
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/StringField.vue?vue&type=template&id=167895c9&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/StringField.vue?vue&type=template&id=167895c9& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: { disabled: _vm.disabled || _vm.readonly },
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v("\n        " + _vm._s(_vm.field_name) + "\n        "),
        _vm.required
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: {
          autocomplete: _vm.isPassword ? "new-password" : "",
          type: _vm.isPassword ? "password" : "text",
          name: _vm.field_key,
          maxlength: _vm.field.max,
          placeholder: _vm.field.placeholder || _vm.field_name,
          disabled: _vm.disabled,
          readonly: _vm.readonly
        },
        domProps: { value: _vm.value },
        on: { change: _vm.changeValue, keyup: _vm.changeValue }
      }),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/TextField.vue?vue&type=template&id=be8fbba6&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Fields/TextField.vue?vue&type=template&id=be8fbba6& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: { disabled: _vm.disabled || _vm.readonly },
      attrs: { "data-toggle": "tooltip", title: _vm.field.tooltip }
    },
    [
      _c("label", [
        _vm.field.locale
          ? _c("i", {
              staticClass: "fa localized fa-globe",
              attrs: {
                "data-toggle": "tooltip",
                title: _vm.trans("languages-field")
              }
            })
          : _vm._e(),
        _vm._v(" " + _vm._s(_vm.field_name) + "\n        "),
        _vm.required
          ? _c("span", { staticClass: "required" }, [_vm._v("*")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("textarea", {
        class: { "form-control": _vm.isText, js_editor: _vm.isEditor },
        attrs: {
          rows: "5",
          id: _vm.id,
          disabled: _vm.disabled,
          readonly: _vm.readonly,
          name: _vm.field_key,
          maxlength: _vm.field.max,
          placeholder: _vm.field.placeholder || _vm.field_name
        },
        domProps: { value: _vm.value },
        on: { keyup: _vm.changeValue }
      }),
      _vm._v(" "),
      _c("small", [_vm._v(_vm._s(_vm.field.title))])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=template&id=de82885e&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=template&id=de82885e& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    _vm.formType,
    {
      tag: "component",
      staticClass: "form crudadmin-form",
      attrs: {
        method: "post",
        action: "",
        id: _vm.formID,
        "data-form": _vm.model.slug
      },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.saveForm($event)
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "box", class: { "box--active": _vm.isActive } },
        [
          _c(
            "div",
            {
              staticClass: "box-header",
              class: {
                visible:
                  _vm.hasLocaleFields ||
                  _vm.canShowGettext ||
                  (_vm.isOpenedRow && _vm.model.history)
              },
              attrs: { "data-header": "" }
            },
            [
              _c("div", { staticClass: "box-header__actions" }, [
                _c("div", { staticClass: "box-header__left" }, [
                  _c("h3", { staticClass: "box-header__title" }, [
                    _vm.model.localization
                      ? _c("span", {
                          staticClass: "--icon-left fa fa-globe-americas",
                          attrs: {
                            "data-toggle": "tooltip",
                            "data-original-title": _vm.trans("multilanguages")
                          }
                        })
                      : _vm._e(),
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.title) +
                        "\n                    "
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "box-header__right" }, [
                  _vm.isOpenedRow && _vm.canShowGettext
                    ? _c(
                        "button",
                        {
                          staticClass: "btn--icon btn btn-default btn-sm",
                          attrs: { type: "button" },
                          on: { click: _vm.openGettextEditor }
                        },
                        [
                          _c("i", { staticClass: "fa fa-globe-americas" }),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.trans("gettext-open")) +
                              "\n                    "
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isOpenedRow && _vm.model.history && _vm.model.isSingle()
                    ? _c(
                        "button",
                        {
                          staticClass: "btn--icon btn btn-sm btn-default",
                          attrs: {
                            type: "button",
                            "data-toggle": "tooltip",
                            title: "",
                            "data-original-title": _vm.trans("history.changes")
                          },
                          on: {
                            click: function($event) {
                              return _vm.showHistory(_vm.row)
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "fa fa-history" }),
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm.model.getSettings(
                                  "buttons.show-history",
                                  _vm.trans("history.show")
                                )
                              ) +
                              "\n                    "
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.hasLocaleFields &&
                  _vm.selectedLanguage &&
                  _vm.languages.length > 1
                    ? _c(
                        "div",
                        {
                          staticClass: "dropdown multi-languages",
                          attrs: { "data-form-language-switch": "" }
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-default dropdown-toggle btn-sm",
                              attrs: {
                                type: "button",
                                id: "languageDropdown",
                                "data-toggle": "dropdown",
                                "aria-haspopup": "true",
                                "aria-expanded": "true"
                              }
                            },
                            [
                              _c("i", {
                                staticClass: "--icon-left fa fa-globe-americas"
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "text" }, [
                                _vm._v(
                                  _vm._s(_vm.getLangName(_vm.selectedLanguage))
                                )
                              ]),
                              _vm._v(" "),
                              _c("i", {
                                staticClass: "--icon-right fa fa-angle-down"
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "ul",
                            {
                              staticClass: "dropdown-menu dropdown-menu-right",
                              attrs: { "aria-labelledby": "languageDropdown" }
                            },
                            _vm._l(_vm.languages, function(lang) {
                              return _vm.selectedLanguage.id != lang.id
                                ? _c(
                                    "li",
                                    { attrs: { "data-slug": lang.slug } },
                                    [
                                      _c(
                                        "a",
                                        {
                                          attrs: { href: "#" },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              return _vm.changeLanguage(lang.id)
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(_vm.getLangName(lang)) +
                                              "\n                                "
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                : _vm._e()
                            }),
                            0
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isOpenedRow && _vm.canaddrow && !_vm.model.isSingle()
                    ? _c(
                        "button",
                        {
                          staticClass: "btn--icon btn btn-default btn-sm",
                          attrs: { "data-create-new-row": "", type: "button" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.resetForm($event)
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "fa fa-plus" }),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.newRowTitle) +
                              "\n                    "
                          )
                        ]
                      )
                    : _vm._e()
                ])
              ]),
              _vm._v(" "),
              _vm._l(_vm.getComponents("form-header"), function(name) {
                return _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
                })
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "box-body box-body--form",
              class: { cantadd: !_vm.cansave }
            },
            [
              _vm._l(_vm.getComponents("form-top"), function(name) {
                return _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
                })
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "box-body-wrapper" },
                [
                  _vm._l(_vm.getAdditionalFormData, function(value, key) {
                    return _c("input", {
                      attrs: { type: "hidden", name: key },
                      domProps: { value: value }
                    })
                  }),
                  _vm._v(" "),
                  _c("form-tabs-builder", {
                    attrs: {
                      model: _vm.model,
                      childs: true,
                      langid: _vm.langid,
                      inputlang: _vm.selectedLanguage,
                      row: _vm.row,
                      cansave: _vm.cansave,
                      hasparentmodel: _vm.hasparentmodel,
                      depth_level: _vm.depth_level,
                      parentActiveGridSize: _vm.parentActiveGridSize,
                      history: _vm.history
                    }
                  })
                ],
                2
              ),
              _vm._v(" "),
              _vm._l(_vm.getComponents("form-bottom"), function(name) {
                return _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
                })
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm.canUpdateForm
            ? _c(
                "div",
                {
                  staticClass: "box-footer",
                  attrs: { "data-footer": _vm.model.table }
                },
                [
                  _vm._l(_vm.getComponents("form-footer"), function(name) {
                    return _c(name, {
                      key: name,
                      tag: "component",
                      attrs: {
                        model: _vm.model,
                        row: _vm.row,
                        rows: _vm.rows.data
                      }
                    })
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "box-footer__actions" }, [
                    _vm.progress
                      ? _c(
                          "button",
                          {
                            class: [
                              "btn",
                              "btn-" + (_vm.isOpenedRow ? "success" : "primary")
                            ],
                            attrs: {
                              type: "button",
                              "data-action-type": "updating"
                            }
                          },
                          [
                            _c("i", { staticClass: "fa updating fa-refresh" }),
                            _vm._v(
                              " " +
                                _vm._s(
                                  _vm.isOpenedRow
                                    ? _vm.trans("saving")
                                    : _vm.trans("sending")
                                )
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    !_vm.progress
                      ? _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: {
                              type: "submit",
                              "data-action-type": _vm.isOpenedRow
                                ? "update"
                                : "create",
                              name: "submit"
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.isOpenedRow
                                  ? _vm.saveButton
                                  : _vm.sendButton
                              )
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ],
                2
              )
            : _vm._e()
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormGroup.vue?vue&type=template&id=13423f96&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormGroup.vue?vue&type=template&id=13423f96& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.isGroupVisible(_vm.group),
          expression: "isGroupVisible(group)"
        }
      ],
      staticClass: "fields-group fields-group__item",
      class: _vm.getGroupClass(_vm.group),
      attrs: {
        "group-id": _vm.group.id,
        "data-fields": _vm.visibleFields.length
      }
    },
    [
      _c(
        "div",
        {
          class: {
            card: _vm.canShowGroupName(_vm.group),
            "fields-group__wrapper": _vm.visibleFields.length > 0,
            "fields-tabs__wrapper": _vm.hasTabs(_vm.group.fields)
          }
        },
        [
          _vm.canShowGroupName(_vm.group)
            ? _c("h4", { staticClass: "card-header" }, [
                _vm.group.icon
                  ? _c("i", {
                      staticClass: "card-header--icon-left",
                      class: ["fa", _vm.faMigrator(_vm.group.icon)]
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c("span", { domProps: { innerHTML: _vm._s(_vm.group.name) } })
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { class: { "card-body": _vm.canShowGroupName(_vm.group) } },
            [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.hasTabs(_vm.group.fields)
                    ? _c(
                        "div",
                        { staticClass: "col-lg-12 tab--parent" },
                        [
                          _c("form-tabs-builder", {
                            attrs: {
                              tabs: _vm.tabsFields,
                              model: _vm.model,
                              row: _vm.row,
                              hasparentmodel: _vm.hasparentmodel,
                              history: _vm.history,
                              depth_level: _vm.depth_level
                            }
                          })
                        ],
                        1
                      )
                    : _vm.canShowGroupName(_vm.group) &&
                      _vm.visibleFields.length == 0
                    ? _c("div", [_vm._m(0)])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(_vm.group.fields, function(item, index) {
                    return _c(
                      "fragment",
                      { key: index },
                      [
                        _vm.isField(item) &&
                        _vm.canRenderField(_vm.model.fields[item])
                          ? _c(
                              "div",
                              { staticClass: "fields-group__item col-12" },
                              _vm._l(
                                _vm.getFieldLangs(_vm.model.fields[item]),
                                function(langslug) {
                                  return _c("form-input-builder", {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value:
                                          _vm.canShowField(
                                            _vm.model.fields[item]
                                          ) &&
                                          _vm.canShowLanguageField(
                                            _vm.model.fields[item],
                                            langslug,
                                            _vm.inputlang
                                          ),
                                        expression:
                                          "canShowField(model.fields[item]) && canShowLanguageField(model.fields[item], langslug, inputlang)"
                                      }
                                    ],
                                    key: item + "-" + langslug,
                                    attrs: {
                                      history: _vm.history,
                                      model: _vm.model,
                                      langid: _vm.langid,
                                      inputlang: _vm.inputlang,
                                      langslug: langslug,
                                      row: _vm.row,
                                      index: index,
                                      hasparentmodel: _vm.hasparentmodel,
                                      field_key: item,
                                      field: _vm.model.fields[item],
                                      depth_level: _vm.depth_level
                                    }
                                  })
                                }
                              ),
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.isGroup(item) && !_vm.isTab(item)
                          ? _c("form-group", {
                              attrs: {
                                group: item,
                                model: _vm.model,
                                row: _vm.row,
                                hasparentmodel: _vm.hasparentmodel,
                                inputlang: _vm.inputlang,
                                history: _vm.history,
                                depth_level: _vm.depth_level
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    )
                  })
                ],
                2
              )
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-12" }, [
      _c("p", { staticClass: "empty-group-separator" }, [_vm._v("...")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=template&id=d169a3aa&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=template&id=d169a3aa& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "field-wrapper",
      class: {
        "is-changed-from-history": _vm.isChangedFromHistory && !_vm.hasComponent
      },
      attrs: {
        "data-field": _vm.field_key,
        "data-model": _vm.model.slug,
        "data-lang": _vm.langslug,
        "data-history-changed": _vm.isChangedFromHistory
      }
    },
    [
      !_vm.hasComponent && (_vm.isString || _vm.isPassword)
        ? _c("string-field", {
            attrs: {
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && _vm.isNumber
        ? _c("number-field", {
            attrs: {
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && _vm.isDatepicker
        ? _c("date-time-field", {
            attrs: {
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && _vm.isCheckbox
        ? _c("checkbox-field", {
            attrs: {
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && (_vm.isText || _vm.isEditor)
        ? _c("text-field", {
            attrs: {
              id: _vm.getId,
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && _vm.isFile
        ? _c("file-field", {
            attrs: {
              id: _vm.getId,
              row: _vm.row,
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field_key_original: _vm.field_key,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && _vm.isSelect
        ? _c("select-field", {
            attrs: {
              id: _vm.getId,
              row: _vm.row,
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              inputlang: _vm.inputlang,
              langid: _vm.langid,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasComponent && _vm.isRadio
        ? _c("radio-field", {
            attrs: {
              id: _vm.getId,
              model: _vm.model,
              field_name: _vm.getName,
              field_key: _vm.getFieldName,
              field: _vm.field,
              value: _vm.getValueOrDefault,
              inputlang: _vm.inputlang,
              langid: _vm.langid,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly,
              depth_level: _vm.depth_level
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.field.confirmed == true && !_vm.isConfirmation
        ? _c("form-input-builder", {
            attrs: {
              model: _vm.model,
              history: _vm.history,
              field: _vm.field,
              index: _vm.index,
              field_key: _vm.field_key + "_confirmation",
              row: _vm.row,
              depth_level: _vm.depth_level,
              confirmation: true
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasComponent || _vm.hasEmptyComponent
        ? _c(_vm.componentName("component"), {
            tag: "component",
            attrs: {
              model: _vm.model,
              field: _vm.field,
              history_changed: _vm.isChangedFromHistory,
              history: _vm.history,
              row: _vm.row,
              field_key: _vm.getFieldName,
              field_key_original: _vm.field_key,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasSubComponent
        ? _c(_vm.componentName("sub_component"), {
            tag: "component",
            attrs: {
              model: _vm.model,
              field: _vm.field,
              history_changed: _vm.isChangedFromHistory,
              history: _vm.history,
              row: _vm.row,
              field_key: _vm.getFieldName,
              field_key_original: _vm.field_key,
              required: _vm.isRequired,
              disabled: _vm.isDisabled,
              readonly: _vm.isReadonly
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=template&id=5272f673&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=template&id=5272f673& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: { "nav-tabs-custom": _vm.hasTabsAvailable } }, [
    _vm.hasTabsAvailable
      ? _c(
          "ul",
          { staticClass: "nav nav-tabs" },
          _vm._l(_vm.getTabs, function(tab, $index) {
            return (_vm.isTab(tab) && !tab.model) || _vm.isModel(tab)
              ? _c(
                  "li",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.isTabVisible(tab),
                        expression: "isTabVisible(tab)"
                      }
                    ],
                    staticClass: "nav-item",
                    class: {
                      "model-tab": _vm.isModel(tab),
                      active: _vm.activetab == $index
                    },
                    attrs: {
                      "data-tabs": "",
                      "data-depth": _vm.depth_level,
                      "default-tab":
                        _vm.isModel(tab) && _vm.getModel(tab.model)
                          ? false
                          : "",
                      "data-model":
                        _vm.isModel(tab) && _vm.getModel(tab.model)
                          ? _vm.getModel(tab.model).slug
                          : _vm.model.table
                    },
                    on: {
                      click: function($event) {
                        _vm.activetab = $index
                      }
                    }
                  },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "nav-link",
                        class: { active: _vm.activetab == $index },
                        attrs: { "data-toggle": "tab", "aria-expanded": "true" }
                      },
                      [
                        _vm.getTabIcon(tab)
                          ? _c("i", {
                              staticClass: "fa nav-link--icon-left",
                              class: [_vm.faMigrator(_vm.getTabIcon(tab))]
                            })
                          : _vm._e(),
                        _vm._v(
                          "\n                " +
                            _vm._s(
                              _vm.getTabName(tab) || _vm.trans("general-tab")
                            ) +
                            "\n            "
                        )
                      ]
                    )
                  ]
                )
              : _vm._e()
          }),
          0
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "tab-content tab-content--form" },
      _vm._l(_vm.getTabs, function(tab, $index) {
        return _vm.canRenderTab(tab)
          ? _c(
              "div",
              {
                staticClass: "tab-pane",
                class: { active: _vm.activetab == $index },
                attrs: {
                  "data-tab-model": _vm.isModel(tab)
                    ? _vm.getModel(tab.model).slug
                    : false,
                  "data-tab-id": tab.id
                }
              },
              [
                _c(
                  "div",
                  { staticClass: "row" },
                  [
                    _vm.hasTabs(tab.fields) || _vm.isModel(tab)
                      ? _c(
                          "div",
                          {
                            staticClass: "col-lg-12",
                            class: { model: _vm.isModel(tab) }
                          },
                          [
                            _vm.hasTabs(tab.fields)
                              ? _c("form-tabs-builder", {
                                  attrs: {
                                    tabs: _vm.tabsFields(tab.fields),
                                    model: _vm.model,
                                    row: _vm.row,
                                    langid: _vm.langid,
                                    inputlang: _vm.inputlang,
                                    hasparentmodel: _vm.hasparentmodel,
                                    history: _vm.history,
                                    depth_level: _vm.depth_level
                                  }
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.isModel(tab)
                              ? _c("model-builder", {
                                  attrs: {
                                    dusk: "model-builder",
                                    "data-model": _vm.getModel(tab.model).table,
                                    langid: _vm.langid,
                                    ischild: true,
                                    model_builder: _vm.getModel(tab.model),
                                    activetab: _vm.isLoadedModel(
                                      _vm.getModel(tab.model),
                                      $index
                                    ),
                                    parentActiveGridSize:
                                      _vm.parentActiveGridSize,
                                    parentrow: _vm.row
                                  }
                                })
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.chunkGroups(tab.fields), function(item, $index) {
                      return _vm.isGroup(item) && !_vm.isTab(item)
                        ? _c("form-group", {
                            key: $index,
                            attrs: {
                              group: item,
                              model: _vm.model,
                              hasparentmodel: _vm.hasparentmodel,
                              langid: _vm.langid,
                              inputlang: _vm.inputlang,
                              row: _vm.row,
                              history: _vm.history,
                              depth_level: _vm.depth_level
                            }
                          })
                        : _vm._e()
                    })
                  ],
                  2
                )
              ]
            )
          : _vm._e()
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=template&id=4682e184&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=template&id=4682e184& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isDifferent
    ? _c("div", { staticClass: "alert alert-warning --mb" }, [
        _c("p", [
          _c("i", {
            staticClass: "icon fa",
            class: _vm.faMigrator("fa-warning")
          }),
          _vm._v(" "),
          _c("strong", [_vm._v("Oooops!")])
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v("Vaša nainštalovaná verzia administrácie "),
          _c("strong", [_vm._v("CrudAdmin " + _vm._s(_vm.version))]),
          _vm._v(" v systéme Laravel sa nezhoduje s verziou "),
          _vm.version_assets
            ? _c("strong", [_vm._v("(" + _vm._s(_vm.version_assets) + ")")])
            : _vm._e(),
          _vm._v(" v public priečinku."),
          _c("br"),
          _vm._v("\n    Z dôvodu lepšej stability odporúčame spustiť príkaz "),
          _c("strong", [_vm._v("php artisan admin:update")]),
          _vm._v(" pre synchronizáciu vendor priečinkov.")
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/File.vue?vue&type=template&id=15993213&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/File.vue?vue&type=template&id=15993213& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.isImage(_vm.file) && _vm.image != true
      ? _c(
          "a",
          { attrs: { href: _vm.path, "data-lightbox": "gallery", title: "" } },
          [_vm._v(_vm._s(_vm.trans("show-image")))]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.isImage(_vm.file) && _vm.image == true
      ? _c(
          "a",
          { attrs: { href: _vm.path, "data-lightbox": "gallery", title: "" } },
          [_c("img", { attrs: { src: _vm.imagePath, alt: "" } })]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.isPdf(_vm.file)
      ? _c("a", { attrs: { href: _vm.path, target: "_blank", title: "" } }, [
          _vm._v(_vm._s(_vm.trans("show")) + " PDF")
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.isZip(_vm.file)
      ? _c(
          "a",
          { attrs: { href: _vm.downloadPath, target: "_blank", title: "" } },
          [_vm._v(_vm._s(_vm.trans("download")) + " ZIP")]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.isDoc(_vm.file)
      ? _c(
          "a",
          { attrs: { href: _vm.downloadPath, target: "_blank", title: "" } },
          [_vm._v(_vm._s(_vm.trans("download-document")))]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.isOther(_vm.file)
      ? _c(
          "a",
          { attrs: { href: _vm.downloadPath, target: "_blank", title: "" } },
          [_vm._v(_vm._s(_vm.trans("download-file")))]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=template&id=13cdfc13&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=template&id=13cdfc13& ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "message-modal gettext-table modal-open" }, [
    _c(
      "div",
      { staticClass: "modal modal-default", staticStyle: { display: "block" } },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c("h4", { staticClass: "modal-title" }, [
                _vm._v(
                  _vm._s(_vm.trans("gettext-update")) +
                    " - " +
                    _vm._s(_vm.gettext_editor.name)
                )
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "close",
                  attrs: {
                    type: "button",
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                  },
                  on: { click: _vm.close }
                },
                [
                  _c("span", { attrs: { "aria-hidden": "true" } }, [
                    _vm._v("×")
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("label", [_vm._v(_vm._s(_vm.trans("search")))]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.query,
                    expression: "query"
                  }
                ],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  placeholder: _vm.trans("gettext-search")
                },
                domProps: { value: _vm.query },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.query = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _vm.loaded && _vm.resultLength == 0
                ? _c("p", [_vm._v(_vm._s(_vm.trans("gettext-no-match")))])
                : _vm._e(),
              _vm._v(" "),
              !_vm.loaded
                ? _c("p", { staticClass: "loading" }, [
                    _c("i", { staticClass: "fa fa-refresh fa-spin" }),
                    _vm._v(" " + _vm._s(_vm.trans("gettext-loading")))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "table",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.resultLength > 0,
                      expression: "resultLength > 0"
                    }
                  ],
                  staticClass: "table data-table table-bordered table-striped"
                },
                [
                  _c("thead", [
                    _c("tr", [
                      _c("th", [_vm._v(_vm._s(_vm.trans("gettext-source")))]),
                      _vm._v(" "),
                      _c("th", [
                        _vm._v(_vm._s(_vm.trans("gettext-translation")))
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    _vm._l(_vm.filtratedTranslates, function(values, key) {
                      return _c(
                        "tr",
                        { class: { missing: _vm.isMissing(key) } },
                        [
                          _c("td", [_vm._v(_vm._s(key))]),
                          _vm._v(" "),
                          _c(
                            "td",
                            {
                              staticClass: "input",
                              class: {
                                edited: _vm.hasChange(key),
                                plural: _vm.isPlural(key)
                              }
                            },
                            _vm._l(_vm.getPluralLength(key), function(i) {
                              return _c("textarea", {
                                staticClass: "form-control",
                                class: {
                                  long: _vm.getValue(values, i - 1).length > 80
                                },
                                attrs: {
                                  "data-toggle": "tooltip",
                                  disabled: _vm.isMissing(key),
                                  title: _vm.isMissing(key)
                                    ? _vm.trans("gettext-missing")
                                    : _vm.getPluralsPlaceholder(key, i - 1),
                                  placeholder: _vm.getPluralsPlaceholder(
                                    key,
                                    i - 1
                                  )
                                },
                                domProps: {
                                  value: _vm.getValue(values, i - 1)
                                },
                                on: {
                                  input: function($event) {
                                    return _vm.changeText($event, key, i - 1)
                                  }
                                }
                              })
                            }),
                            0
                          )
                        ]
                      )
                    }),
                    0
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "translation-actions" }, [
                _vm.missing.length > 0 && _vm.showMissing == false
                  ? _c(
                      "a",
                      {
                        on: {
                          click: function($event) {
                            _vm.showMissing = true
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.trans("gettext-showmissing")) +
                            " (" +
                            _vm._s(_vm.missing.length) +
                            ")"
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.limit != false && _vm.fullCount > _vm.limit
                  ? _c(
                      "a",
                      {
                        on: {
                          click: function($event) {
                            _vm.limit = false
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.trans("gettext-count")) +
                            " (" +
                            _vm._s(_vm.fullCount) +
                            ")"
                        )
                      ]
                    )
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button", "data-save-translations": "" },
                  on: { click: _vm.saveAndClose }
                },
                [_vm._v(_vm._s(_vm.trans("gettext-save")))]
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/History.vue?vue&type=template&id=242710cd&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/History.vue?vue&type=template&id=242710cd& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "message-modal message-modal--history" }, [
    _c(
      "div",
      { staticClass: "modal modal-default", staticStyle: { display: "block" } },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c("h4", { staticClass: "modal-title" }, [
                _vm._v(_vm._s(_vm.trans("history.changes")))
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "close",
                  attrs: {
                    type: "button",
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                  },
                  on: { click: _vm.closeHistory }
                },
                [
                  _c("span", { attrs: { "aria-hidden": "true" } }, [
                    _vm._v("×")
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c(
                "table",
                {
                  staticClass: "table data-table table-bordered table-striped"
                },
                [
                  _c("thead", [
                    _c("tr", [
                      _c("th", { staticClass: "td-id" }, [
                        _vm._v(_vm._s(_vm.trans("number")))
                      ]),
                      _vm._v(" "),
                      _c("th", [_vm._v(_vm._s(_vm.trans("history.who")))]),
                      _vm._v(" "),
                      _c("th", [_vm._v(_vm._s(_vm.trans("history.count")))]),
                      _vm._v(" "),
                      _c("th", [_vm._v(_vm._s(_vm.trans("history.date")))]),
                      _vm._v(" "),
                      _c("th", { staticClass: "th-history-buttons" })
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    _vm._l(_vm.sortedHistory, function(item, $index) {
                      return _c(
                        "tr",
                        { key: item.id, attrs: { "data-history-id": item.id } },
                        [
                          _c("td", { staticClass: "td-id" }, [
                            _vm._v(_vm._s(_vm.history.rows.length - $index))
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(
                                item.user
                                  ? item.user.username
                                  : _vm.trans("history.system")
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", { attrs: { "data-changes-length": "" } }, [
                            _c(
                              "span",
                              {
                                attrs: {
                                  "data-toggle": "tooltip",
                                  title: "",
                                  "data-original-title": _vm.changedFields(item)
                                }
                              },
                              [
                                _vm._v(
                                  _vm._s(item.changed_fields.length) + " "
                                ),
                                _c("i", { staticClass: "fa fa-eye" })
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.date(item.created_at)))]),
                          _vm._v(" "),
                          _c("td", [
                            _c("div", { staticClass: "history-actions" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-sm btn-success",
                                  class: {
                                    "enabled-history":
                                      _vm.history.history_id == item.id
                                  },
                                  attrs: {
                                    type: "button",
                                    "data-toggle": "tooltip",
                                    title: _vm.trans("history.show")
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.applyChanges(item)
                                    }
                                  }
                                },
                                [_c("i", { staticClass: "fa fa-eye" })]
                              ),
                              _vm._v(" "),
                              _vm.canDeleteHistoryItem(item, $index)
                                ? _c(
                                    "button",
                                    {
                                      staticClass: "btn btn-sm btn-danger",
                                      attrs: {
                                        type: "button",
                                        "data-toggle": "tooltip",
                                        title: _vm._("Zmazať zmenu z histórie")
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.deleteHistoryRow(item)
                                        }
                                      }
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "far fa-trash-alt"
                                      })
                                    ]
                                  )
                                : _vm._e()
                            ])
                          ])
                        ]
                      )
                    }),
                    0
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button" },
                  on: { click: _vm.closeHistory }
                },
                [_vm._v(_vm._s(_vm.trans("close")))]
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/License.vue?vue&type=template&id=2e13dc0c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/License.vue?vue&type=template&id=2e13dc0c& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.message.type
    ? _c("div", { staticClass: "alert alert-danger --mb" }, [
        _c("p", [
          _c("i", {
            staticClass: "icon fa",
            class: _vm.faMigrator("fa-warning")
          }),
          _vm._v(" " + _vm._s(_vm.message.title))
        ]),
        _vm._v(" "),
        _c("p", { domProps: { innerHTML: _vm._s(_vm.message.message) } })
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Modal.vue?vue&type=template&id=6ff6e6a6&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/Modal.vue?vue&type=template&id=6ff6e6a6& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.canShowAlert
    ? _c("div", { staticClass: "message-modal" }, [
        _c(
          "div",
          {
            staticClass: "modal",
            class: "modal-" + _vm.alert.type,
            style: { display: _vm.canShowAlert ? "block" : "none" }
          },
          [
            _c("div", { staticClass: "modal-dialog" }, [
              _c("div", { staticClass: "modal-content" }, [
                _c("div", { staticClass: "modal-header" }, [
                  _c("h4", { staticClass: "modal-title" }, [
                    _vm._v(_vm._s(_vm.alert.title))
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        type: "button",
                        "data-dismiss": "modal",
                        "aria-label": "Close"
                      },
                      on: {
                        click: function($event) {
                          return _vm.closeAlert(_vm.alert.close)
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("×")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "modal-body" },
                  [
                    _vm.alert.message
                      ? _c("p", {
                          domProps: { innerHTML: _vm._s(_vm.alert.message) }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isRegistredComponent(_vm.alert.component)
                      ? _c(_vm.getComponentName(_vm.alert.component.name), {
                          tag: "component",
                          attrs: {
                            model: _vm.alert.component.model,
                            rows: _vm.alert.component.rows,
                            row: _vm.alert.component.row,
                            request: _vm.alert.component.request,
                            data: _vm.alert.component.data
                          }
                        })
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _vm.alert.close ||
                  (_vm.alert.type == "success" && !_vm.alert.close) ||
                  (!_vm.alert.close && !_vm.alert.success)
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-secondary",
                          class: { "pull-left": _vm.alert.success },
                          attrs: { type: "button", "data-dismiss": "modal" },
                          on: {
                            click: function($event) {
                              return _vm.closeAlert(_vm.alert.close)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.trans("close")))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.alert.success
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              return _vm.closeAlert(_vm.alert.success)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.trans("accept")))]
                      )
                    : _vm._e()
                ])
              ])
            ])
          ]
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.rows.count > _vm.pagination.limit
      ? _c(
          "ul",
          { staticClass: "pagination", attrs: { "data-pagination": "" } },
          [
            _c(
              "li",
              {
                class: { disabled: _vm.pagination.position <= 1 },
                attrs: { "data-pagination-prev": "" }
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "page-link",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.setPosition(_vm.pagination.position - 1)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-chevron-left" })]
                )
              ]
            ),
            _vm._v(" "),
            _vm._l(_vm.paginateItems, function(i) {
              return _c(
                "li",
                { class: { active: _vm.pagination.position == i } },
                [
                  _c(
                    "a",
                    {
                      staticClass: "page-link",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.setPosition(i)
                        }
                      }
                    },
                    [_vm._v(_vm._s(i == 0 ? "..." : i))]
                  )
                ]
              )
            }),
            _vm._v(" "),
            _c(
              "li",
              {
                class: {
                  disabled:
                    _vm.pagination.position >
                    _vm.rows.count / _vm.pagination.limit
                },
                attrs: { "data-pagination-next": "" }
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "page-link",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.setPosition(_vm.pagination.position + 1)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-chevron-right" })]
                )
              ]
            )
          ],
          2
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Refreshing.vue?vue&type=template&id=222cf204&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/Refreshing.vue?vue&type=template&id=222cf204& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "box__overlay" }, [
    _c("i", { staticClass: "fa fa-sync fa-spin" }),
    _vm._v(" "),
    _c("p", [_vm._v(_vm._s(_vm.trans("loading")))])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=template&id=39401d05&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=template&id=39401d05& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "navbar-custom-menu" }, [
    _c("ul", { staticClass: "nav navbar-nav" }, [
      _c("li", { staticClass: "user user-menu" }, [
        _c(
          "a",
          {
            staticClass: "user-toggle",
            attrs: { href: "#", "data-toggle": "dropdown" }
          },
          [
            _c("img", {
              staticClass: "user-image",
              attrs: { src: _vm.getAvatar, alt: "User Image" }
            }),
            _vm._v(" "),
            _vm.user
              ? _c("span", [_vm._v(_vm._s(_vm.user.username))])
              : _vm._e(),
            _vm._v(" "),
            _c("i", { staticClass: "fa fa-angle-down" })
          ]
        ),
        _vm._v(" "),
        _c("ul", { staticClass: "dropdown-menu" }, [
          _c("li", { staticClass: "user-header" }, [
            _c("img", {
              staticClass: "img-circle",
              attrs: { src: _vm.getAvatar, alt: "User Image" }
            }),
            _vm._v(" "),
            _vm.user
              ? _c("p", [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.user.username) +
                      " - " +
                      _vm._s(_vm.getPermissions) +
                      "\n                        "
                  )
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "user-body" }),
          _vm._v(" "),
          _c("li", { staticClass: "user-footer" }, [
            _c("div", { staticClass: "pull-right" }, [
              _c(
                "a",
                { staticClass: "btn btn-primary", attrs: { href: _vm.logout } },
                [_vm._v(_vm._s(_vm.trans("logout")))]
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
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
                  _c("small", [_vm._v("(" + _vm._s(_vm.rows.count) + ")")])
                ]),
                _vm._v(" "),
                _vm.isEnabledAutoSync == false
                  ? _c(
                      "a",
                      {
                        staticClass: "box-header__actions--synchronize",
                        attrs: {
                          "data-toggle": "tooltip",
                          title: _vm._(
                            "Automatická synchronizácia záznamov v tabuľke je vypnutá"
                          )
                        },
                        on: {
                          click: function($event) {
                            return _vm.loadRows(true)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "fa fa-sync-alt" }),
                        _vm._v(" " + _vm._s(_vm._("Synchronizácia vypnutá")))
                      ]
                    )
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "box-header__right" }, [
              _c(
                "div",
                {
                  staticClass: "dropdown fields-list",
                  attrs: { "fields-list": "" }
                },
                [
                  _vm.model.getSettings("table.switchcolumns", true) != false
                    ? _c(
                        "button",
                        {
                          staticClass: "btn dropdown-toggle",
                          attrs: {
                            type: "button",
                            "data-toggle": "dropdown",
                            "aria-haspopup": "true",
                            "aria-expanded": "true"
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.trans("rows-list")) +
                              "\n                        "
                          ),
                          _c("i", {
                            staticClass: "--icon-right fa fa-angle-down"
                          })
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "ul",
                    {
                      staticClass: "dropdown-menu menu-left dropdown-menu-right"
                    },
                    [
                      _vm._l(_vm.enabled_columns, function(column, key) {
                        return _vm.canShowColumn(column, key)
                          ? _c(
                              "li",
                              {
                                staticClass: "--no-item-padding",
                                class: { active: column.enabled },
                                on: {
                                  click: function($event) {
                                    return $event.stopPropagation()
                                  }
                                }
                              },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass:
                                      "--dropdown-item-padding --dropdown-item-vertical"
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: column.enabled,
                                          expression: "column.enabled"
                                        }
                                      ],
                                      attrs: {
                                        type: "checkbox",
                                        "data-column": key
                                      },
                                      domProps: {
                                        checked: Array.isArray(column.enabled)
                                          ? _vm._i(column.enabled, null) > -1
                                          : column.enabled
                                      },
                                      on: {
                                        change: function($event) {
                                          var $$a = column.enabled,
                                            $$el = $event.target,
                                            $$c = $$el.checked ? true : false
                                          if (Array.isArray($$a)) {
                                            var $$v = null,
                                              $$i = _vm._i($$a, $$v)
                                            if ($$el.checked) {
                                              $$i < 0 &&
                                                _vm.$set(
                                                  column,
                                                  "enabled",
                                                  $$a.concat([$$v])
                                                )
                                            } else {
                                              $$i > -1 &&
                                                _vm.$set(
                                                  column,
                                                  "enabled",
                                                  $$a
                                                    .slice(0, $$i)
                                                    .concat($$a.slice($$i + 1))
                                                )
                                            }
                                          } else {
                                            _vm.$set(column, "enabled", $$c)
                                          }
                                        }
                                      }
                                    }),
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.columnName(key, column.name)
                                        ) +
                                        "\n                            "
                                    )
                                  ]
                                )
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
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.resetColumnsList($event)
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.trans("default")))]
                        )
                      ])
                    ],
                    2
                  )
                ]
              ),
              _vm._v(" "),
              _vm.checked.length > 0 && _vm.hasAnyActions
                ? _c(
                    "div",
                    {
                      staticClass: "dropdown actions-list fields-list",
                      attrs: { "data-action-list": "" }
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
                            "aria-expanded": "true"
                          }
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.trans("action")) +
                              "\n                        "
                          ),
                          _c("i", {
                            staticClass: "--icon-right fa fa-angle-down"
                          })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "ul",
                        {
                          staticClass:
                            "dropdown-menu menu-left dropdown-menu-right"
                        },
                        [
                          _vm.model.deletable && _vm.model.hasAccess("delete")
                            ? _c("li", [
                                _c(
                                  "a",
                                  {
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.removeRow()
                                      }
                                    }
                                  },
                                  [
                                    _c("i", { staticClass: "fa fa-trash-alt" }),
                                    _vm._v(" " + _vm._s(_vm.trans("delete")))
                                  ]
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.model.publishable &&
                          _vm.model.hasAccess("publishable")
                            ? _c("li", [
                                _c(
                                  "a",
                                  {
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.togglePublishedAt()
                                      }
                                    }
                                  },
                                  [
                                    _c("i", { staticClass: "fa fa-eye" }),
                                    _vm._v(
                                      " " + _vm._s(_vm.trans("publish-toggle"))
                                    )
                                  ]
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.hasButtons
                            ? _c("li", {
                                staticClass: "divider",
                                attrs: { role: "separator" }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.availableButtons, function(
                            button,
                            button_key
                          ) {
                            return _c("li", [
                              _c(
                                "a",
                                {
                                  on: {
                                    click: function($event) {
                                      return _vm.buttonAction(
                                        button_key,
                                        button
                                      )
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fa",
                                    class: button.icon
                                  }),
                                  _vm._v(" " + _vm._s(button.name))
                                ]
                              )
                            ])
                          })
                        ],
                        2
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.isPaginationEnabled
                ? _c(
                    "div",
                    {
                      staticClass: "pagination-limit",
                      class: { "--hidden-limit": _vm.isHiddenMode },
                      attrs: { title: _vm.trans("rows-count") }
                    },
                    [
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.pagination.limit,
                              expression: "pagination.limit"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { "data-limit": "" },
                          on: {
                            change: [
                              function($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function(o) {
                                    return o.selected
                                  })
                                  .map(function(o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.pagination,
                                  "limit",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                              _vm.changeLimit
                            ]
                          }
                        },
                        [
                          _c("option", { attrs: { value: "hide" } }, [
                            _vm._v(_vm._s(_vm._("Skryť")))
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.pagination.limits, function(count) {
                            return _c("option", [_vm._v(_vm._s(count))])
                          })
                        ],
                        2
                      )
                    ]
                  )
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _vm._l(_vm.getComponents("table-header"), function(name) {
            return _c(name, {
              key: name,
              tag: "component",
              attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
            })
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.isHiddenMode,
              expression: "!isHiddenMode"
            }
          ],
          staticClass: "box-body box-body--table"
        },
        [
          _c("table-rows", {
            attrs: {
              model: _vm.model,
              pagination: _vm.pagination,
              row: _vm.row,
              buttons: _vm.rows.buttons,
              count: _vm.rows.count,
              history: _vm.history,
              gettext_editor: _vm.gettext_editor,
              rows: _vm.rows,
              rowsdata: _vm.rowsData,
              button_loading: _vm.button_loading,
              checked: _vm.checked,
              orderby: _vm.orderBy,
              depth_level: _vm.depth_level
            },
            on: {
              "update:row": function($event) {
                _vm.row = $event
              },
              "update:gettext_editor": function($event) {
                _vm.gettext_editor = $event
              },
              "update:rowsdata": function($event) {
                _vm.rowsData = $event
              },
              "update:checked": function($event) {
                _vm.checked = $event
              },
              "update:orderby": function($event) {
                _vm.orderBy = $event
              }
            }
          })
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
              value: !_vm.isHiddenMode,
              expression: "!isHiddenMode"
            }
          ],
          staticClass: "box-footer"
        },
        [
          _vm._l(_vm.getComponents("table-footer"), function(name) {
            return _vm.getComponents("table-footer").length > 0
              ? _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
                })
              : _vm._e()
          }),
          _vm._v(" "),
          _c("div", { staticClass: "box-footer__actions" }, [
            _c("div", { staticClass: "box-footer__left" }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "box-footer__center" },
              [
                _vm.isPaginationEnabled
                  ? _c("pagination", {
                      attrs: { rows: _vm.rows, pagination: _vm.pagination }
                    })
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "box-footer__right" }, [
              _vm.isPaginationEnabled
                ? _c(
                    "div",
                    {
                      staticClass: "pagination-limit",
                      class: { "--hidden-limit": _vm.isHiddenMode },
                      attrs: { title: _vm.trans("rows-count") }
                    },
                    [
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.pagination.limit,
                              expression: "pagination.limit"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { "data-limit": "" },
                          on: {
                            change: [
                              function($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function(o) {
                                    return o.selected
                                  })
                                  .map(function(o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.pagination,
                                  "limit",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                              _vm.changeLimit
                            ]
                          }
                        },
                        [
                          _c("option", { attrs: { value: "hide" } }, [
                            _vm._v(_vm._s(_vm._("Skryť")))
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.pagination.limits, function(count) {
                            return _c("option", [_vm._v(_vm._s(count))])
                          })
                        ],
                        2
                      )
                    ]
                  )
                : _vm._e()
            ])
          ])
        ],
        2
      ),
      _vm._v(" "),
      _vm.pagination.refreshing ? _c("refreshing") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hasFieldValue
    ? _c("div", [
        _vm.isFile()
          ? _c(
              "div",
              { staticClass: "filesList" },
              _vm._l(_vm.getFiles, function(file, index) {
                return _c(
                  "div",
                  [
                    _c("file", {
                      attrs: {
                        file: file,
                        field: _vm.field,
                        model: _vm.model,
                        image: _vm.image
                      }
                    }),
                    _vm._v(" "),
                    index != _vm.getFiles.length - 1
                      ? _c("span", [_vm._v(", ")])
                      : _vm._e()
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
                "data-original-title": _vm.onlyEncodedTitle
              },
              domProps: { innerHTML: _vm._s(_vm.fieldValueLimitedAndEncoded) }
            })
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      staticClass: "table",
      class: {
        sortable: _vm.model.sortable && _vm.orderby[0] == "_order",
        "table-sm": _vm.isSmallTable
      },
      attrs: {
        id: "table-" + _vm.model.slug,
        "data-table-rows": _vm.model.slug,
        "data-depth": _vm.depth_level
      }
    },
    [
      _c("thead", { attrs: { "data-table-head": "" } }, [
        _c(
          "tr",
          [
            _c(
              "th",
              {
                staticClass: "select-row-checkbox",
                on: { click: _vm.toggleAllCheckboxes }
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
                      )
                    },
                    on: {
                      click: function($event) {
                        return _vm.checkRow(_vm.item.id)
                      }
                    }
                  },
                  [
                    _c("input", {
                      attrs: { type: "checkbox" },
                      domProps: { checked: _vm.isCheckedAll }
                    }),
                    _vm._v(" "),
                    _c("span", { staticClass: "checkmark" })
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _vm._l(_vm.columns, function(name, field) {
              return _c(
                "th",
                {
                  class: "th-" + field,
                  on: {
                    click: function($event) {
                      return _vm.toggleSorting(field)
                    }
                  }
                },
                [
                  _vm.orderby[0] == field && _vm.orderby[1] == 0
                    ? _c("i", { staticClass: "arrow-sorting fa fa-angle-up" })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.orderby[0] == field && _vm.orderby[1] == 1
                    ? _c("i", { staticClass: "arrow-sorting fa fa-angle-down" })
                    : _vm._e(),
                  _vm._v("\n                " + _vm._s(name) + "\n            ")
                ]
              )
            }),
            _vm._v(" "),
            _c("th", { staticClass: "th-options-buttons" })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "draggable",
        {
          attrs: { tag: "tbody" },
          on: { start: _vm.beforeUpdateOrder, end: _vm.updateOrder }
        },
        _vm._l(_vm.rowsdata, function(item, key) {
          return _c(
            "tr",
            {
              key: item.id,
              class: { "--active": _vm.checked.indexOf(item.id) > -1 },
              attrs: { "data-id": item.id }
            },
            [
              _c("td", { staticClass: "select-row-checkbox" }, [
                _c(
                  "div",
                  {
                    staticClass: "checkbox-box",
                    on: {
                      click: function($event) {
                        return _vm.checkRow(item.id)
                      }
                    }
                  },
                  [
                    _c("input", {
                      attrs: { type: "checkbox" },
                      domProps: { checked: _vm.checked.indexOf(item.id) > -1 }
                    }),
                    _vm._v(" "),
                    _c("span", { staticClass: "checkmark" })
                  ]
                )
              ]),
              _vm._v(" "),
              _vm._l(_vm.columns, function(name, field) {
                return _c(
                  "td",
                  {
                    key: item.id + "-" + field,
                    class: [
                      "td-" + field,
                      { image_field: _vm.isImageField(field) }
                    ],
                    attrs: { "data-field": field },
                    on: {
                      click: function($event) {
                        return _vm.checkRow(item.id, field)
                      }
                    }
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
                        image: _vm.isImageField(field)
                      }
                    })
                  ],
                  1
                )
              }),
              _vm._v(" "),
              _c(
                "td",
                {
                  staticClass: "buttons-options",
                  class: ["additional-" + _vm.buttonsCount(item)],
                  attrs: { "data-model": _vm.model.slug }
                },
                [
                  _vm.isEditable
                    ? _c("div", { staticClass: "buttons-options__item" }, [
                        _c(
                          "button",
                          {
                            class: [
                              "btn",
                              "btn-sm",
                              {
                                "btn-success": _vm.isActiveRow(item),
                                "btn-default": !_vm.isActiveRow(item)
                              }
                            ],
                            attrs: {
                              "data-button": "edit",
                              "data-id": item.id,
                              type: "button",
                              "data-toggle": "tooltip",
                              title: "",
                              "data-original-title": _vm.model.hasAccess(
                                "update"
                              )
                                ? _vm.trans("edit")
                                : _vm.trans("show")
                            },
                            on: {
                              click: function($event) {
                                return _vm.selectRow(item)
                              }
                            }
                          },
                          [
                            _c("i", {
                              class: {
                                "fas fa-spinner fa-spin":
                                  _vm.loadingRow == item.id,
                                "far fa-edit": _vm.loadingRow != item.id
                              }
                            })
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isEnabledHistory
                    ? _c("div", { staticClass: "buttons-options__item" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-sm btn-default",
                            class: {
                              "enabled-history":
                                _vm.isActiveRow(item) && _vm.history.history_id
                            },
                            attrs: {
                              "data-button": "history",
                              type: "button",
                              "data-toggle": "tooltip",
                              title: "",
                              "data-original-title": _vm.trans(
                                "history.changes"
                              )
                            },
                            on: {
                              click: function($event) {
                                return _vm.showHistory(item)
                              }
                            }
                          },
                          [_c("i", { staticClass: "fa fa-history" })]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.canShowGettext
                    ? _c("div", { staticClass: "buttons-options__item" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-sm btn-default",
                            attrs: {
                              "data-button": "gettext",
                              type: "button",
                              "data-toggle": "tooltip",
                              title: "",
                              "data-original-title": _vm.trans("gettext-update")
                            },
                            on: {
                              click: function($event) {
                                return _vm.openGettextEditor(item)
                              }
                            }
                          },
                          [_c("i", { staticClass: "fa fa-globe-americas" })]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.canShowInfo
                    ? _c("div", { staticClass: "buttons-options__item" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-sm btn-default",
                            attrs: {
                              type: "button",
                              "data-button": "show",
                              "data-toggle": "tooltip",
                              title: "",
                              "data-original-title": _vm.trans("row-info")
                            },
                            on: {
                              click: function($event) {
                                return _vm.showInfo(item)
                              }
                            }
                          },
                          [_c("i", { staticClass: "far fa-question-circle" })]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(_vm.getButtonsForRow(item), function(
                    button,
                    button_key
                  ) {
                    return _c("div", { staticClass: "buttons-options__item" }, [
                      _c(
                        "button",
                        {
                          class: ["btn", "btn-sm", button.class],
                          attrs: {
                            type: "button",
                            "data-button": "action-" + button.key,
                            "data-toggle": "tooltip",
                            title: "",
                            "data-original-title": button.name
                          },
                          on: {
                            click: function($event) {
                              return _vm.buttonAction(button_key, button, item)
                            }
                          }
                        },
                        [
                          _c("i", {
                            class: [
                              "fa",
                              _vm.button_loading ==
                              _vm.getButtonKey(item.id, button_key)
                                ? "fa-sync-alt"
                                : _vm.faMigrator(button.icon),
                              {
                                "fa-spin":
                                  _vm.button_loading ==
                                  _vm.getButtonKey(item.id, button_key)
                              }
                            ]
                          })
                        ]
                      )
                    ])
                  }),
                  _vm._v(" "),
                  _vm.model.publishable && _vm.model.hasAccess("publishable")
                    ? _c("div", { staticClass: "buttons-options__item" }, [
                        _c(
                          "button",
                          {
                            class: [
                              "btn",
                              "btn-sm",
                              {
                                "btn-info": !item.published_at,
                                "btn-warning": item.published_at
                              }
                            ],
                            attrs: {
                              "data-button": "publishable",
                              type: "button",
                              "data-published": item.published_at
                                ? "true"
                                : "false",
                              "data-toggle": "tooltip",
                              title: "",
                              "data-original-title": item.published_at
                                ? _vm.trans("hide")
                                : _vm.trans("show")
                            },
                            on: {
                              click: function($event) {
                                return _vm.togglePublishedAt(item)
                              }
                            }
                          },
                          [
                            _c("i", {
                              class: {
                                fa: true,
                                "fa-eye": item.published_at,
                                "fa-eye-slash": !item.published_at
                              }
                            })
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.model.deletable &&
                  _vm.count > _vm.model.minimum &&
                  _vm.model.hasAccess("delete")
                    ? _c("div", { staticClass: "buttons-options__item" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger btn-sm",
                            class: { disabled: _vm.isReservedRow(item) },
                            attrs: {
                              "data-button": "delete",
                              type: "button",
                              "data-toggle": "tooltip",
                              title: "",
                              "data-original-title": _vm.trans("delete")
                            },
                            on: {
                              click: function($event) {
                                return _vm.removeRow(item, key)
                              }
                            }
                          },
                          [_c("i", { staticClass: "far fa-trash-alt" })]
                        )
                      ])
                    : _vm._e()
                ],
                2
              )
            ],
            2
          )
        }),
        0
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=template&id=6960b2a3&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=template&id=6960b2a3& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("section", { staticClass: "sidebar" }, [
      _c(
        "ul",
        { staticClass: "sidebar-menu" },
        _vm._l(_vm.groups, function(row, key) {
          return _c("sidebar-row", { key: key, attrs: { row: row } })
        }),
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "footer-sidebar" }, [
      _vm.author !== false
        ? _c("p", [
            _vm._v("Developed by "),
            _c(
              "a",
              {
                attrs: { href: "https://www.marekgogol.sk", target: "_blank" }
              },
              [_vm._v("Marek Gogoľ")]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("p", [
        _vm._v("© 2016 - " + _vm._s(_vm.year) + " "),
        _c(
          "a",
          { attrs: { href: "https://www.crudadmin.com", target: "_blank" } },
          [_vm._v("CrudAdmin")]
        )
      ]),
      _vm._v(" "),
      _vm.author !== false ? _c("br") : _vm._e(),
      _vm._v(" "),
      _c("p", [
        _vm._v("Version "),
        _c(
          "a",
          {
            attrs: {
              target: "_blank",
              href:
                "https://packagist.org/packages/crudadmin/crudadmin#" +
                _vm.version
            }
          },
          [_vm._v(_vm._s(_vm.version))]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=template&id=50478767&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=template&id=50478767& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "fragment",
    [
      _vm.isActive && !_vm.isGroup
        ? _c(
            "router-link",
            {
              staticClass: "treeview",
              attrs: {
                tag: "li",
                "data-slug": _vm.row.slug,
                to: { name: "admin-model", params: { model: _vm.row.slug } },
                "exact-active-class": "active",
                "active-class": "active"
              }
            },
            [
              _c("a", { on: { click: _vm.toggleMenu } }, [
                _c("i", {
                  staticClass: "icon",
                  class: ["fa", _vm.faMigrator(_vm.row.icon || _vm.defaultIcon)]
                }),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.row.name))]),
                _vm._v(" "),
                _vm.hasSubmenu
                  ? _c("i", {
                      staticClass: "fa side-arrow",
                      class: {
                        "fa-angle-down": _vm.opened,
                        "fa-angle-left": !_vm.opened
                      }
                    })
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.hasSubmenu
                ? _c(
                    "ul",
                    { staticClass: "treeview-menu" },
                    _vm._l(_vm.row.submenu, function(subrow, key) {
                      return _c("sidebar-row", {
                        key: key,
                        attrs: { row: subrow, parent: _vm.levels }
                      })
                    }),
                    1
                  )
                : _vm._e()
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.isActive && _vm.isGroup && _vm.hasChilds
        ? _c(
            "li",
            {
              staticClass: "treeview treeview-list",
              class: { active: _vm.opened },
              attrs: { "data-slug": _vm.row.slug }
            },
            [
              _c("a", { on: { click: _vm.toggleMenu } }, [
                _c("i", {
                  staticClass: "fa icon",
                  class: _vm.faMigrator(_vm.row.icon || "fa-folder-open far")
                }),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.row.name))]),
                _vm._v(" "),
                _vm.hasSubmenu
                  ? _c("i", {
                      staticClass: "fa side-arrow",
                      class: {
                        "fa-angle-down": _vm.opened,
                        "fa-angle-left": !_vm.opened
                      }
                    })
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.hasSubmenu
                ? _c(
                    "ul",
                    { staticClass: "treeview-menu" },
                    _vm._l(_vm.row.submenu, function(subrow, key) {
                      return _c("sidebar-row", {
                        key: key,
                        attrs: { row: subrow, parent: _vm.levels }
                      })
                    }),
                    1
                  )
                : _vm._e()
            ]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/BasePageView.vue?vue&type=template&id=659cf588&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Views/BasePageView.vue?vue&type=template&id=659cf588& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.model
      ? _c("section", { staticClass: "content-header" }, [
          _c("ol", { staticClass: "breadcrumb" }, [
            _vm.getGroup
              ? _c("li", [_vm._v(_vm._s(_vm.getGroup.name))])
              : _vm._e(),
            _vm._v(" "),
            _c("li", { staticClass: "active" }, [
              _c("a", { staticClass: "active" }, [
                _vm._v(_vm._s(_vm.model.name))
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "breadcrumb__title" }, [
                _vm._v(_vm._s(_vm.model.title))
              ])
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.model
      ? _c(
          "section",
          { staticClass: "crudadmin-wrapper" },
          [
            _c("license"),
            _vm._v(" "),
            _vm.version ? _c("check-assets-version") : _vm._e(),
            _vm._v(" "),
            _c("model-builder", {
              key: _vm.model.slug,
              attrs: {
                model_builder: _vm.model,
                langid: _vm.langid,
                dusk: "model-builder",
                "data-model": _vm.model.table
              }
            })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/DashBoardView.vue?vue&type=template&id=ecb6305c&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Views/DashBoardView.vue?vue&type=template&id=ecb6305c& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "section",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.user,
            expression: "user"
          }
        ],
        staticClass: "crudadmin-wrapper"
      },
      [
        !_vm.layout
          ? _c("div", { staticClass: "box" }, [
              _c("div", { staticClass: "box-body" }, [
                _c("div", { staticClass: "box-body-wrapper" }, [
                  _vm.user
                    ? _c("h2", [
                        _vm._v(
                          _vm._s(_vm.trans("welcome")) +
                            " " +
                            _vm._s(_vm.user.username)
                        )
                      ])
                    : _vm._e()
                ])
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { domProps: { innerHTML: _vm._s(_vm.layout) } })
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "content-header" }, [
      _c("ol", { staticClass: "breadcrumb" }, [
        _c("li", { staticClass: "active" }, [
          _c("a", { staticClass: "active" }, [_vm._v("Dashboard")])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=template&id=e444b1ae&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=template&id=e444b1ae& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm._l(_vm.getComponents("top"), function(name) {
        return _c(name, {
          key: name,
          tag: "component",
          attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
        })
      }),
      _vm._v(" "),
      _vm.languages.length == 0 && _vm.isLocaleModel
        ? _c("div", { staticClass: "alert alert-danger" }, [
            _c("strong", [_vm._v(_vm._s(_vm.trans("warning")) + "!")]),
            _vm._v(" "),
            _c("p", [_vm._v(_vm._s(_vm.trans("languages-missing")))])
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.model.hasAccess("read") && !_vm.model.hasAccess("insert")
        ? _c("div", { staticClass: "alert alert-danger" }, [
            _c("strong", [_vm._v(_vm._s(_vm.trans("warning")) + "!")]),
            _vm._v(" "),
            _c("p", [_vm._v(_vm._s(_vm.trans("no-permissions")))])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.canShowForm || _vm.canShowRows || _vm.isSearching,
              expression: "canShowForm || (canShowRows || isSearching)"
            }
          ],
          staticClass: "admin-model",
          class: {
            "admin-model--single-mode": _vm.model.isSingle(),
            "admin-model--in-parent": _vm.model.isInParent()
          },
          attrs: { "data-depth": _vm.depth_level }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.canShowAdminHeader,
                  expression: "canShowAdminHeader"
                }
              ],
              staticClass: "admin-model__header",
              class: { "with-border": _vm.model.isSingle() }
            },
            [
              _c("div", { staticClass: "left" }, [
                _c("div", [
                  _vm.ischild
                    ? _c("h3", { staticClass: "admin-header__title" }, [
                        _vm._v(_vm._s(_vm.model.name))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.model.title && _vm.ischild
                    ? _c("span", {
                        staticClass: "admin-header__description",
                        domProps: { innerHTML: _vm._s(_vm.model.title) }
                      })
                    : _vm._e()
                ])
              ]),
              _vm._v(" "),
              !_vm.model.isSingle()
                ? _c("div", { staticClass: "right" }, [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.canShowSearchBar,
                            expression: "canShowSearchBar"
                          }
                        ],
                        staticClass: "search-bar",
                        class: {
                          interval: _vm.search.interval,
                          resetRightBorders:
                            _vm.canBeInterval || _vm.canResetSearch,
                          hasResetButton: _vm.canResetSearch
                        },
                        attrs: { "data-search-bar": "", id: _vm.getFilterId }
                      },
                      [
                        _c("div", { staticClass: "input-group" }, [
                          _c("div", { staticClass: "dropdown" }, [
                            _c(
                              "button",
                              {
                                staticClass: "btn dropdown-toggle",
                                attrs: {
                                  type: "button",
                                  "data-toggle": "dropdown",
                                  "aria-expanded": "false"
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm.getSearchingColumnName(
                                        _vm.search.column
                                      )
                                    ) +
                                    "\n                                "
                                ),
                                _c("i", {
                                  staticClass: "--icon-right fa fa-angle-down"
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "ul",
                              { staticClass: "dropdown-menu" },
                              [
                                _c(
                                  "li",
                                  {
                                    class: { active: !_vm.search.column },
                                    attrs: { "data-field": "" },
                                    on: {
                                      click: function($event) {
                                        _vm.search.column = null
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.trans("search-all")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "li",
                                  {
                                    class: {
                                      active: _vm.search.column == "id"
                                    },
                                    attrs: { "data-field": "id" },
                                    on: {
                                      click: function($event) {
                                        _vm.search.column = "id"
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.getSearchingColumnName("id"))
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.getSearchableFields, function(key) {
                                  return _c(
                                    "li",
                                    {
                                      class: {
                                        active: _vm.search.column == key
                                      },
                                      attrs: { "data-field": key },
                                      on: {
                                        click: function($event) {
                                          _vm.search.column = key
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.getSearchingColumnName(key))
                                      )
                                    ]
                                  )
                                }),
                                _vm._v(" "),
                                _c(
                                  "li",
                                  {
                                    class: {
                                      active: _vm.search.column == "created_at"
                                    },
                                    attrs: { "data-field": "created_at" },
                                    on: {
                                      click: function($event) {
                                        _vm.search.column = "created_at"
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.getSearchingColumnName("created_at")
                                      )
                                    )
                                  ]
                                )
                              ],
                              2
                            )
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.isSearch,
                                expression: "isSearch"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              "data-search-text": "",
                              placeholder: _vm.trans("search") + "..."
                            },
                            on: {
                              input: function($event) {
                                return _vm.updateSearchQuery("query", $event)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.isDate,
                                expression: "isDate"
                              }
                            ],
                            staticClass: "form-control js_date",
                            attrs: {
                              type: "text",
                              "data-search-date": "",
                              readonly: ""
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.isCheckbox,
                                  expression: "isCheckbox"
                                },
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.search.query,
                                  expression: "search.query"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              on: {
                                change: function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.search,
                                    "query",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "0" } }, [
                                _vm._v(_vm._s(_vm.trans("off")))
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1" } }, [
                                _vm._v(_vm._s(_vm.trans("on")))
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.isSelect,
                                  expression: "isSelect"
                                }
                              ],
                              staticClass: "select"
                            },
                            [
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.search.query,
                                      expression: "search.query"
                                    }
                                  ],
                                  staticClass: "form-control js_chosen",
                                  attrs: {
                                    "data-search-select": "",
                                    "data-placeholder": _vm.trans("get-value")
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.search,
                                        "query",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    }
                                  }
                                },
                                [
                                  _c("option", { attrs: { value: "" } }, [
                                    _vm._v(_vm._s(_vm.trans("show-all")))
                                  ]),
                                  _vm._v(" "),
                                  _vm._l(
                                    _vm.languageOptionsSearchFilter(
                                      _vm.isSelect
                                        ? _vm.model.fields[_vm.search.column]
                                            .options
                                        : []
                                    ),
                                    function(data) {
                                      return _c(
                                        "option",
                                        { domProps: { value: data[0] } },
                                        [_vm._v(_vm._s(data[1]))]
                                      )
                                    }
                                  )
                                ],
                                2
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _vm.canBeInterval
                            ? _c(
                                "div",
                                {
                                  staticClass: "interval-btn",
                                  attrs: {
                                    "data-interval": "",
                                    "data-toggle": "tooltip",
                                    "data-original-title": "Interval"
                                  }
                                },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn",
                                      class: {
                                        "btn-default": !_vm.search.interval,
                                        "btn-primary": _vm.search.interval
                                      },
                                      on: {
                                        click: function($event) {
                                          _vm.search.interval = !_vm.search
                                            .interval
                                        }
                                      }
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "fa fa-arrows-alt-h"
                                      })
                                    ]
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.search.interval && _vm.isSearch,
                                expression: "search.interval && isSearch"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              "data-inerval-input": "",
                              "data-search-interval-text": "",
                              placeholder: _vm.trans("search") + "..."
                            },
                            on: {
                              input: function($event) {
                                return _vm.updateSearchQuery("query_to", $event)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.search.interval && _vm.isDate,
                                expression: "search.interval && isDate"
                              }
                            ],
                            staticClass: "form-control js_date",
                            attrs: {
                              type: "text",
                              "data-inerval-input": "",
                              "data-search-interval-date": "",
                              readonly: ""
                            }
                          }),
                          _vm._v(" "),
                          _vm.canResetSearch
                            ? _c(
                                "div",
                                {
                                  staticClass: "interval",
                                  attrs: {
                                    "data-reset-interval": "",
                                    "data-toggle": "tooltip",
                                    "data-original-title": _vm.trans("reset")
                                  }
                                },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btn-default",
                                      on: { click: _vm.resetIterval }
                                    },
                                    [_c("i", { staticClass: "fa fa-times" })]
                                  )
                                ]
                              )
                            : _vm._e()
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _vm.isEnabledGrid
                      ? _c(
                          "ul",
                          {
                            staticClass: "change-grid-size",
                            attrs: {
                              "data-toggle": "tooltip",
                              "data-original-title": _vm.trans("edit-size")
                            }
                          },
                          _vm._l(_vm.sizes, function(size) {
                            return !size.disabled
                              ? _c(
                                  "li",
                                  {
                                    class: {
                                      active: size.active,
                                      disabled: size.disabled
                                    },
                                    attrs: { "data-size": size.key },
                                    on: {
                                      click: function($event) {
                                        return _vm.changeSize(size)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(size.name))]
                                )
                              : _vm._e()
                          }),
                          0
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.hasLanguages && _vm.isActiveLanguageSwitch
                      ? _c(
                          "div",
                          {
                            staticClass: "dropdown",
                            attrs: { "data-global-language-switch": "" }
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-primary dropdown-toggle",
                                attrs: {
                                  type: "button",
                                  "data-toggle": "dropdown",
                                  "aria-expanded": "false"
                                }
                              },
                              [
                                _c("i", {
                                  staticClass:
                                    "--icon-left fa fa-globe-americas"
                                }),
                                _vm._v(
                                  "\n                        " +
                                    _vm._s(
                                      _vm.selectedRootLanguage
                                        ? _vm.getLangName(
                                            _vm.selectedRootLanguage
                                          )
                                        : _vm.trans("language-mutation")
                                    ) +
                                    "\n                        "
                                ),
                                _c("i", {
                                  staticClass: "--icon-right fa fa-angle-down"
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "ul",
                              {
                                staticClass: "dropdown-menu dropdown-menu-right"
                              },
                              _vm._l(_vm.languages, function(language) {
                                return _c(
                                  "li",
                                  {
                                    class: {
                                      active: _vm.langid == language.id
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.changeLanguage(language.id)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.getLangName(language)))]
                                )
                              }),
                              0
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.canAddRow &&
                    !_vm.model.isSingle() &&
                    _vm.model.hasAccess("insert")
                      ? _c(
                          "button",
                          {
                            staticClass: "btn--icon btn btn-primary",
                            attrs: {
                              "data-create-new-row": "",
                              type: "button"
                            },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.resetForm(true, true, true)
                              }
                            }
                          },
                          [
                            _c("i", { staticClass: "fa fa-plus" }),
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.newRowTitle()) +
                                "\n                "
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                : _vm._e()
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "admin-model__body" },
            [
              _c(
                "div",
                {
                  class: { row: true, "grid-fullsize": _vm.activeGridSize == 0 }
                },
                [
                  _vm.activetab !== false
                    ? _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.canShowForm,
                              expression: "canShowForm"
                            }
                          ],
                          staticClass: "col col--form col-md-12 col-sm-12",
                          class: ["col-lg-" + (12 - _vm.activeGridSize)]
                        },
                        [
                          _c("form-builder", {
                            attrs: {
                              formID: _vm.formID,
                              progress: _vm.progress,
                              rows: _vm.rows,
                              history: _vm.history,
                              model: _vm.model,
                              langid: _vm.selected_language_id
                                ? _vm.selected_language_id
                                : _vm.langid,
                              selectedlangid: _vm.selected_language_id
                                ? _vm.selected_language_id
                                : _vm.langid,
                              canaddrow: _vm.canAddRow,
                              hasparentmodel: _vm.hasparentmodelMutated,
                              gettext_editor: _vm.gettext_editor,
                              depth_level: _vm.depth_level,
                              parentActiveGridSize: _vm.activeGridSize,
                              row: _vm.row
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.canShowRows,
                          expression: "canShowRows"
                        }
                      ],
                      staticClass: "col col--rows col-md-12 col-sm-12",
                      class: ["col-lg-" + (12 - (12 - _vm.activeGridSize))]
                    },
                    [
                      _c("model-rows-builder", {
                        attrs: {
                          model: _vm.model,
                          rows: _vm.rows,
                          row: _vm.row,
                          scopes: _vm.scopes,
                          langid: _vm.selected_language_id
                            ? _vm.selected_language_id
                            : _vm.langid,
                          progress: _vm.progress,
                          search: _vm.search,
                          iswithoutparent: _vm.isWithoutParentRow,
                          activetab: _vm.activetab,
                          gettext_editor: _vm.gettext_editor,
                          depth_level: _vm.depth_level,
                          allow_refreshing: _vm.allow_refreshing,
                          history: _vm.history
                        }
                      })
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _vm._l(_vm.model.childs, function(child) {
                return (_vm.isOpenedRow ||
                  _vm.getModel(child).without_parent == true) &&
                  _vm.getModel(child).in_tab !== true
                  ? _c("model-builder", {
                      key: _vm.getModel(child).slug,
                      attrs: {
                        dusk: "model-builder",
                        "data-model": _vm.getModel(child).table,
                        hasparentmodel: _vm.hasparentmodelMutated,
                        langid: _vm.langid,
                        ischild: true,
                        model: _vm.getModel(child),
                        parentActiveGridSize: _vm.activeGridSize,
                        activetab: _vm.activetab,
                        parentrow: _vm.row
                      }
                    })
                  : _vm._e()
              })
            ],
            2
          )
        ]
      ),
      _vm._v(" "),
      _vm._l(_vm.getComponents("bottom"), function(name) {
        return _c(name, {
          key: name,
          tag: "component",
          attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
        })
      }),
      _vm._v(" "),
      _vm.history.id
        ? _c("history", { attrs: { model: _vm.model, history: _vm.history } })
        : _vm._e(),
      _vm._v(" "),
      _vm.gettext_editor
        ? _c("gettext-extension", {
            attrs: {
              gettext_editor: _vm.gettext_editor,
              gettext_table: _vm.model.table
            }
          })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/Resources/admin/dist/js/main.js":
/*!*********************************************!*\
  !*** ./src/Resources/admin/dist/js/main.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery.fn.ckEditors = function () {
  if (this.length < 0) return this;
  $(this).each(function () {
    var _this = this;

    if (!$(this).hasClass('js_editor') || $(this).hasClass('editor_replaced')) return;
    $(this).addClass('editor_replaced');
    CKEDITOR.config.height = $(this).attr('data-height') ? $(this).attr('data-height') : '250px';
    CKEDITOR.replace($(this).attr('id')).on('instanceReady', function () {
      $(_this).removeClass('js_editor');
    });
  });
}; //Check if validated input belongs to actual form level


jQuery.fn.firstLevelForm = function (form) {
  return $(this).filter(function () {
    return $(this).parents('form')[0] == form;
  });
};

/***/ }),

/***/ "./src/Resources/admin/plugins/chosen-order/chosen.order.jquery.min.js":
/*!*****************************************************************************!*\
  !*** ./src/Resources/admin/plugins/chosen-order/chosen.order.jquery.min.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Chosen Order v1.2.1
// This plugin allows you to handle the order of the selection for Chosen multiple <select> dropdowns
// Full source at https://github.com/tristanjahier/chosen-order
// Copyright (c) 2013 - Tristan Jahier, http://tristan-jahier.fr
// DISCLAIMER
// Chosen Order is not associated with Harvest in any way.
// Chosen is an original software by Patrick Filler for Harvest, http://getharvest.com
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com
// This file is generated by `grunt build`, do not edit it by hand.
(function () {
  var $,
      AbstractChosenOrder,
      _ref,
      __indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }

    return -1;
  },
      __hasProp = {}.hasOwnProperty,
      __extends = function __extends(child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  };

  AbstractChosenOrder = function () {
    var ERRORS;

    function AbstractChosenOrder() {}

    ERRORS = {
      invalid_select_element: "ChosenOrder::{{function}}: first argument must be a valid HTML Multiple Select element that has been Chosenified!",
      invalid_selection_array: "ChosenOrder::{{function}}: second argument must be an Array!",
      unreachable_chosen_container: "ChosenOrder::{{function}}: could not find the Chosen UI container! To solve the problem, try adding an \"id\" attribute to your <select> element.",
      ordering_unselected_option: "ChosenOrder::{{function}}: ignoring option '{{option}}' which is not selected. Set optional parameter \"force\" to 'true' to get the ordered selection forced first."
    };

    AbstractChosenOrder.insertAt = function (node, index, parentNode) {
      return parentNode.insertBefore(node, parentNode.children[index].nextSibling);
    };

    AbstractChosenOrder.getFlattenedOptionsAndGroups = function (select) {
      var flattened_options, opt, options, sub_opt, sub_options, _i, _j, _len, _len1;

      options = Array.prototype.filter.call(select.childNodes, function (o) {
        var _ref;

        return (_ref = o.nodeName.toUpperCase()) === 'OPTION' || _ref === 'OPTGROUP';
      });
      flattened_options = [];

      for (_i = 0, _len = options.length; _i < _len; _i++) {
        opt = options[_i];
        flattened_options.push(opt);

        if (opt.nodeName.toUpperCase() === 'OPTGROUP') {
          sub_options = Array.prototype.filter.call(opt.childNodes, function (o) {
            return o.nodeName.toUpperCase() === 'OPTION';
          });

          for (_j = 0, _len1 = sub_options.length; _j < _len1; _j++) {
            sub_opt = sub_options[_j];
            flattened_options.push(sub_opt);
          }
        }
      }

      return flattened_options;
    };

    AbstractChosenOrder.isValidMultipleSelectElement = function (element) {
      return element !== null && typeof element !== "undefined" && element.nodeName === "SELECT" && element.multiple;
    };

    AbstractChosenOrder.getChosenUIContainer = function (select) {
      if (select.id !== "") {
        return document.getElementById(select.id.replace(/-/g, "_") + "_chosen");
      } else {
        return this.searchChosenUIContainer(select);
      }
    };

    AbstractChosenOrder.isChosenified = function (select) {
      return this.getChosenUIContainer(select) != null;
    };

    AbstractChosenOrder.forceSelection = function (select, selection) {
      var i, opt, options, _ref;

      options = this.getFlattenedOptionsAndGroups(select);
      i = 0;

      while (i < options.length) {
        opt = options[i];

        if (_ref = opt.getAttribute("value"), __indexOf.call(selection, _ref) >= 0) {
          opt.selected = true;
          opt.setAttribute("selected", "");
        } else {
          opt.selected = false;
          opt.removeAttribute("selected");
        }

        i++;
      }

      return this.triggerEvent(select, "chosen:updated");
    };

    AbstractChosenOrder.getSelectionOrder = function (select) {
      var chosen_options, chosen_ui, close_btn, opt, option, options, order, rel, _i, _len;

      if (this.getDOMElement != null) {
        select = this.getDOMElement(select);
      }

      order = [];

      if (!this.isValidMultipleSelectElement(select)) {
        console.error(ERRORS.invalid_select_element.replace('{{function}}', 'getSelectionOrder'));
        return order;
      }

      chosen_ui = this.getChosenUIContainer(select);

      if (chosen_ui == null) {
        console.error(ERRORS.unreachable_chosen_container.replace('{{function}}', 'getSelectionOrder'));
        return order;
      }

      chosen_options = chosen_ui.querySelectorAll('.search-choice');
      options = this.getFlattenedOptionsAndGroups(select);

      for (_i = 0, _len = chosen_options.length; _i < _len; _i++) {
        opt = chosen_options[_i];
        close_btn = opt.querySelectorAll('.search-choice-close')[0];

        if (close_btn != null) {
          rel = close_btn.getAttribute(this.relAttributeName);
        }

        option = options[rel];
        order.push(option.value);
      }

      return order;
    };

    AbstractChosenOrder.setSelectionOrder = function (select, order, force) {
      var chosen_choices, chosen_options, chosen_ui, i, j, opt, opt_val, option, options, rel, relAttributeName, _i, _j, _len, _len1, _results;

      if (this.getDOMElement != null) {
        select = this.getDOMElement(select);
      }

      if (!this.isValidMultipleSelectElement(select)) {
        console.error(ERRORS.invalid_select_element.replace('{{function}}', 'setSelectionOrder'));
        return;
      }

      chosen_ui = this.getChosenUIContainer(select);

      if (chosen_ui == null) {
        console.error(ERRORS.unreachable_chosen_container.replace('{{function}}', 'setSelectionOrder'));
        return;
      }

      if (order instanceof Array) {
        order = order.map(Function.prototype.call, String.prototype.trim);
        options = this.getFlattenedOptionsAndGroups(select);

        if (force != null && force === true) {
          this.forceSelection(select, order);
        }

        _results = [];

        for (i = _i = 0, _len = order.length; _i < _len; i = ++_i) {
          opt_val = order[i];
          rel = null;

          for (j = _j = 0, _len1 = options.length; _j < _len1; j = ++_j) {
            opt = options[j];

            if (opt.value === opt_val) {
              rel = j;
            }
          }

          chosen_options = chosen_ui.querySelectorAll('.search-choice');
          relAttributeName = this.relAttributeName;
          option = Array.prototype.filter.call(chosen_options, function (o) {
            return o.querySelector("a.search-choice-close[" + relAttributeName + "=\"" + rel + "\"]") != null;
          })[0];

          if (option == null) {
            console.warn(ERRORS.ordering_unselected_option.replace('{{function}}', 'setSelectionOrder').replace('{{option}}', opt_val));
            continue;
          }

          chosen_choices = chosen_ui.querySelector("ul.chosen-choices");

          _results.push(this.insertAt(option, i, chosen_ui.querySelector('ul.chosen-choices')));
        }

        return _results;
      } else {
        return console.error(ERRORS.invalid_selection_array.replace('{{function}}', 'setSelectionOrder'));
      }
    };

    return AbstractChosenOrder;
  }();

  $ = jQuery;
  $.fn.extend({
    getSelectionOrder: function getSelectionOrder() {
      return ChosenOrder.getSelectionOrder(this);
    },
    setSelectionOrder: function setSelectionOrder(order, force) {
      return ChosenOrder.setSelectionOrder(this, order, force);
    }
  });

  var ChosenOrder = this.ChosenOrder = function (_super) {
    __extends(ChosenOrder, _super);

    function ChosenOrder() {
      _ref = ChosenOrder.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ChosenOrder.relAttributeName = 'data-option-array-index';

    ChosenOrder.isjQueryObject = function (obj) {
      return typeof jQuery !== "undefined" && jQuery !== null && obj instanceof jQuery;
    };

    ChosenOrder.getDOMElement = function (element) {
      if (this.isjQueryObject(element)) {
        return element.get(0);
      } else {
        return element;
      }
    };

    ChosenOrder.searchChosenUIContainer = function (element) {
      if ($(element).data("chosen") != null) {
        return $(element).data("chosen").container[0];
      } else {
        return $(element).next(".chosen-container.chosen-container-multi").get(0);
      }
    };

    ChosenOrder.triggerEvent = function (target, event_name) {
      return $(target).trigger(event_name);
    };

    return ChosenOrder;
  }(AbstractChosenOrder);
}).call(this);

/***/ }),

/***/ "./src/Resources/admin/plugins/chosen/chosen.jquery.min.js":
/*!*****************************************************************!*\
  !*** ./src/Resources/admin/plugins/chosen/chosen.jquery.min.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Chosen, a Select Box Enhancer for jQuery and Prototype
// by Patrick Filler for Harvest, http://getharvest.com
//
// Version 1.0.0
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com
// Edited by Marek Gogol
// 1. allowed chosen in mobile devices
// 2. allowed accents in search engine
// 3. fixed bug for correct higlight on chosen open
// MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
// This file is generated by `grunt build`, do not edit it by hand.
(function () {
  var $,
      AbstractChosen,
      Chosen,
      SelectParser,
      _ref,
      __hasProp = {}.hasOwnProperty,
      __extends = function __extends(child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  };

  SelectParser = function () {
    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function (child) {
      if (child.nodeName.toUpperCase() === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function (group) {
      var group_position, option, _i, _len, _ref, _results;

      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: this.escapeExpression(group.label),
        children: 0,
        disabled: group.disabled
      });
      _ref = group.childNodes;
      _results = [];

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];

        _results.push(this.add_option(option, group_position, group.disabled));
      }

      return _results;
    };

    SelectParser.prototype.add_option = function (option, group_position, group_disabled) {
      if (option.nodeName.toUpperCase() === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) {
            this.parsed[group_position].children += 1;
          }

          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }

        return this.options_index += 1;
      }
    };

    SelectParser.prototype.escapeExpression = function (text) {
      var map, unsafe_chars;

      if (text == null || text === false) {
        return "";
      }

      if (!/[\&\<\>\"\'\`]/.test(text)) {
        return text;
      }

      map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
      unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
      return text.replace(unsafe_chars, function (chr) {
        return map[chr] || "&amp;";
      });
    };

    return SelectParser;
  }();

  SelectParser.select_to_array = function (select) {
    var child, parser, _i, _len, _ref;

    parser = new SelectParser();
    _ref = select.childNodes;

    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }

    return parser.parsed;
  };

  AbstractChosen = function () {
    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};

      if (!AbstractChosen.browser_is_supported()) {
        return;
      }

      this.is_multiple = this.form_field.multiple;
      this.set_default_text();
      this.set_default_values();
      this.setup();
      this.set_up_html();
      this.register_observers();
    }

    AbstractChosen.prototype.set_default_values = function () {
      var _this = this;

      this.click_test_action = function (evt) {
        return _this.test_active_click(evt);
      };

      this.activate_action = function (evt) {
        return _this.activate_field(evt);
      };

      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.result_single_selected = null;
      this.allow_single_deselect = this.options.allow_single_deselect != null && this.form_field.options[0] != null && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.disable_search = this.options.disable_search || false;
      this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
      this.group_search = this.options.group_search != null ? this.options.group_search : true;
      this.search_contains = this.options.search_contains || false;
      this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
      this.max_selected_options = this.options.max_selected_options || Infinity;
      this.inherit_select_classes = this.options.inherit_select_classes || false;
      this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
      return this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
    };

    AbstractChosen.prototype.set_default_text = function () {
      if (this.form_field.getAttribute("data-placeholder")) {
        this.default_text = this.form_field.getAttribute("data-placeholder");
      } else if (this.is_multiple) {
        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
      } else {
        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
      }

      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
    };

    AbstractChosen.prototype.mouse_enter = function () {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function () {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function (evt) {
      var _this = this;

      if (this.is_multiple) {
        if (!this.active_field) {
          return setTimeout(function () {
            return _this.container_mousedown();
          }, 50);
        }
      } else {
        if (!this.active_field) {
          return this.activate_field();
        }
      }
    };

    AbstractChosen.prototype.input_blur = function (evt) {
      var _this = this;

      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout(function () {
          return _this.blur_test();
        }, 100);
      }
    };

    AbstractChosen.prototype.results_option_build = function (options) {
      var content, data, _i, _len, _ref;

      content = '';
      _ref = this.results_data;

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];

        if (data.group) {
          content += this.result_add_group(data);
        } else {
          content += this.result_add_option(data);
        }

        if (options != null ? options.first : void 0) {
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.single_set_selected_text(data.text);
          }
        }
      }

      return content;
    };

    AbstractChosen.prototype.result_add_option = function (option) {
      var classes, style;

      if (!option.search_match) {
        return '';
      }

      if (!this.include_option_in_results(option)) {
        return '';
      }

      classes = [];

      if (!option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("active-result");
      }

      if (option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("disabled-result");
      }

      if (option.selected) {
        classes.push("result-selected");
      }

      if (option.group_array_index != null) {
        classes.push("group-option");
      }

      if (option.classes !== "") {
        classes.push(option.classes);
      }

      style = option.style.cssText !== "" ? " style=\"" + option.style + "\"" : "";
      return "<li class=\"" + classes.join(' ') + "\"" + style + " data-option-array-index=\"" + option.array_index + "\">" + option.search_text + "</li>";
    };

    AbstractChosen.prototype.result_add_group = function (group) {
      if (!(group.search_match || group.group_match)) {
        return '';
      }

      if (!(group.active_options > 0)) {
        return '';
      }

      return "<li class=\"group-result\">" + group.search_text + "</li>";
    };

    AbstractChosen.prototype.results_update_field = function () {
      this.set_default_text();

      if (!this.is_multiple) {
        this.results_reset_cleanup();
      }

      this.result_clear_highlight();
      this.result_single_selected = null;
      this.results_build();

      if (this.results_showing) {
        return this.winnow_results();
      }
    };

    AbstractChosen.prototype.results_toggle = function () {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function (evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.stringEscaped = function (str) {
      var specialChars = [{
        val: "A",
        "let": "(A|À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ)"
      }, {
        val: "a",
        "let": "(a|à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª)"
      }, {
        val: "C",
        "let": "(C|Ç|Ć|Ĉ|Ċ|Č)"
      }, {
        val: "c",
        "let": "(c|ç|ć|ĉ|ċ|č)"
      }, {
        val: "D",
        "let": "(D|Ð|Ď|Đ)"
      }, {
        val: "d",
        "let": "(d|ð|ď|đ)"
      }, {
        val: "E",
        "let": "(E|È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě)"
      }, {
        val: "e",
        "let": "(e|è|é|ê|ë|ē|ĕ|ė|ę|ě)"
      }, {
        val: "G",
        "let": "(G|Ĝ|Ğ|Ġ|Ģ)"
      }, {
        val: "g",
        "let": "(g|ĝ|ğ|ġ|ģ)"
      }, {
        val: "H",
        "let": "(H|Ĥ|Ħ)"
      }, {
        val: "h",
        "let": "(h|ĥ|ħ)"
      }, {
        val: "I",
        "let": "(I|Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ)"
      }, {
        val: "i",
        "let": "(i|ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı)"
      }, {
        val: "J",
        "let": "(J|Ĵ)"
      }, {
        val: "j",
        "let": "(j|ĵ)"
      }, {
        val: "K",
        "let": "(K|Ķ)"
      }, {
        val: "k",
        "let": "(k|ķ)"
      }, {
        val: "L",
        "let": "(L|Ĺ|Ļ|Ľ|Ŀ|Ł)"
      }, {
        val: "l",
        "let": "(l|ĺ|ļ|ľ|ŀ|ł)"
      }, {
        val: "N",
        "let": "(N|Ñ|Ń|Ņ|Ň)"
      }, {
        val: "n",
        "let": "(n|ñ|ń|ņ|ň|ŉ)"
      }, {
        val: "O",
        "let": "(O|Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ)"
      }, {
        val: "o",
        "let": "(o|ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º)"
      }, {
        val: "R",
        "let": "(R|Ŕ|Ŗ|Ř)"
      }, {
        val: "r",
        "let": "(r|ŕ|ŗ|ř)"
      }, {
        val: "S",
        "let": "(S|Ś|Ŝ|Ş|Š)"
      }, {
        val: "s",
        "let": "(s|ś|ŝ|ş|š|ſ)"
      }, {
        val: "T",
        "let": "(T|Ţ|Ť|Ŧ)"
      }, {
        val: "t",
        "let": "(t|ţ|ť|ŧ)"
      }, {
        val: "U",
        "let": "(U|Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ)"
      }, {
        val: "u",
        "let": "(u|ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ)"
      }, {
        val: "Y",
        "let": "(Y|Ý|Ÿ|Ŷ)"
      }, {
        val: "y",
        "let": "(y|ý|ÿ|ŷ)"
      }, {
        val: "W",
        "let": "(W|Ŵ)"
      }, {
        val: "w",
        "let": "(w|ŵ)"
      }, {
        val: "Z",
        "let": "(Z|Ź|Ż|Ž)"
      }, {
        val: "z",
        "let": "(z|ź|ż|ž)"
      }, {
        val: "f",
        "let": "(f|ƒ)"
      }];

      for (var i = 0; i < specialChars.length; i++) {
        str = str.replace(new RegExp(specialChars[i]["let"], "g"), specialChars[i].val);
        str = str.replace(new RegExp(specialChars[i].val, "g"), specialChars[i]["let"]);
      }

      return str;
    };

    AbstractChosen.prototype.winnow_results = function () {
      var escapedSearchText, option, regex, regexAnchor, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref, search_split, found;

      this.no_results_clear();
      results = 0;
      searchText = this.get_search_text();
      escapedSearchText = searchText;
      _ref = this.results_data;
      search_split = searchText.split(' ');
      regex = searchText.split(' ');

      for (_s = 0, _lens = search_split.length; _s < _lens; _s++) {
        regex[_s] = new RegExp(this.stringEscaped(search_split[_s]), "i");
      }

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        option.search_match = false;
        results_group = null;

        if (this.include_option_in_results(option)) {
          if (option.group) {
            option.group_match = false;
            option.active_options = 0;
          }

          if (option.group_array_index != null && this.results_data[option.group_array_index]) {
            results_group = this.results_data[option.group_array_index];

            if (results_group.active_options === 0 && results_group.search_match) {
              results += 1;
            }

            results_group.active_options += 1;
          }

          if (!(option.group && !this.group_search)) {
            option.search_text = option.group ? option.label : option.html;
            found = 0;

            for (_s = 0, _lens = regex.length; _s < _lens; _s++) {
              option.search_match = this.search_string_match(option.search_text, regex[_s]);

              if (option.search_match && !option.group) {
                found += 1;
              }

              if (found == _lens) results += 1;else option.search_match = null;
            }

            if (option.search_match) {
              if (searchText.length) {
                for (_s = 0, _lens = search_split.length; _s < _lens; _s++) {
                  startpos = option.search_text.search(regex[_s]);
                  text = option.search_text.substr(0, startpos + search_split[_s].length) + '</em>' + option.search_text.substr(startpos + search_split[_s].length);
                  option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
                }
              }

              if (results_group != null) {
                results_group.group_match = true;
              }
            } else if (option.group_array_index != null && this.results_data[option.group_array_index].search_match) {
              option.search_match = true;
            }
          }
        }
      }

      this.result_clear_highlight();

      if (results < 1 && searchText.length) {
        this.update_results_content("");
        return this.no_results(searchText);
      } else {
        this.update_results_content(this.results_option_build());
        return this.winnow_results_set_highlight();
      }
    };

    AbstractChosen.prototype.search_string_match = function (search_string, regex) {
      var part, parts, _i, _len;

      if (regex.test(search_string)) {
        return true;
      } else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
        parts = search_string.replace(/\[|\]/g, "").split(" ");

        if (parts.length) {
          for (_i = 0, _len = parts.length; _i < _len; _i++) {
            part = parts[_i];

            if (regex.test(part)) {
              return true;
            }
          }
        }

        return false;
      }
    };

    AbstractChosen.prototype.choices_count = function () {
      var option, _i, _len, _ref;

      if (this.selected_option_count != null) {
        return this.selected_option_count;
      }

      this.selected_option_count = 0;
      _ref = this.form_field.options;

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];

        if (option.selected) {
          this.selected_option_count += 1;
        }
      }

      return this.selected_option_count;
    };

    AbstractChosen.prototype.choices_click = function (evt) {
      evt.preventDefault();

      if (!(this.results_showing || this.is_disabled)) {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function (evt) {
      var stroke, _ref;

      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();

      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }

          break;

        case 13:
          evt.preventDefault();

          if (this.results_showing) {
            return this.result_select(evt);
          }

          break;

        case 27:
          if (this.results_showing) {
            this.results_hide();
          }

          return true;

        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;

        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.container_width = function () {
      if (this.options.width != null) {
        return this.options.width;
      } else {
        return "" + this.form_field.offsetWidth + "px";
      }
    };

    AbstractChosen.prototype.include_option_in_results = function (option) {
      if (this.is_multiple && !this.display_selected_options && option.selected) {
        return false;
      }

      if (!this.display_disabled_options && option.disabled) {
        return false;
      }

      if (option.empty) {
        return false;
      }

      return true;
    };

    AbstractChosen.browser_is_supported = function () {
      if (window.navigator.appName === "Microsoft Internet Explorer") {
        return document.documentMode >= 8;
      }

      if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
        return true;
      }

      if (/Android/i.test(window.navigator.userAgent)) {
        if (/Mobile/i.test(window.navigator.userAgent)) {
          return true;
        }
      }

      return true;
    };

    AbstractChosen.default_multiple_text = "Select Some Options";
    AbstractChosen.default_single_text = "Select an Option";
    AbstractChosen.default_no_result_text = "No results match";
    return AbstractChosen;
  }();

  $ = jQuery;
  $.fn.extend({
    chosen: function chosen(options) {
      if (!AbstractChosen.browser_is_supported()) {
        return this;
      }

      return this.each(function (input_field) {
        var $this, chosen;
        $this = $(this);
        chosen = $this.data('chosen');

        if (options === 'destroy' && chosen) {
          chosen.destroy();
        } else if (!chosen) {
          $this.data('chosen', new Chosen(this, options));
        }
      });
    }
  });

  Chosen = function (_super) {
    __extends(Chosen, _super);

    function Chosen() {
      _ref = Chosen.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Chosen.prototype.setup = function () {
      this.form_field_jq = $(this.form_field);
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
    };

    Chosen.prototype.set_up_html = function () {
      var container_classes, container_props;
      container_classes = ["chosen-container"];
      container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));

      if (this.inherit_select_classes && this.form_field.className) {
        container_classes.push(this.form_field.className);
      }

      if (this.is_rtl) {
        container_classes.push("chosen-rtl");
      }

      container_props = {
        'class': container_classes.join(' '),
        'style': "width: " + this.container_width() + ";",
        'title': this.form_field.title
      };

      if (this.form_field.id.length) {
        container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
      }

      this.container = $("<div />", container_props);

      if (this.is_multiple) {
        this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
      } else {
        this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
      }

      this.form_field_jq.hide().after(this.container);
      this.dropdown = this.container.find('div.chosen-drop').first();
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chosen-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();

      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chosen-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chosen-search').first();
        this.selected_item = this.container.find('.chosen-single').first();
      }

      this.results_build();
      this.set_tab_index();
      this.set_label_behavior();
      return this.form_field_jq.trigger("chosen:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function () {
      var _this = this;

      this.container.bind('mousedown.chosen', function (evt) {
        _this.container_mousedown(evt);
      });
      this.container.bind('mouseup.chosen', function (evt) {
        _this.container_mouseup(evt);
      });
      this.container.bind('mouseenter.chosen', function (evt) {
        _this.mouse_enter(evt);
      });
      this.container.bind('mouseleave.chosen', function (evt) {
        _this.mouse_leave(evt);
      });
      this.search_results.bind('mouseup.chosen', function (evt) {
        _this.search_results_mouseup(evt);
      });
      this.search_results.bind('mouseover.chosen', function (evt) {
        _this.search_results_mouseover(evt);
      });
      this.search_results.bind('mouseout.chosen', function (evt) {
        _this.search_results_mouseout(evt);
      });
      this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function (evt) {
        _this.search_results_mousewheel(evt);
      });
      this.form_field_jq.bind("chosen:updated.chosen", function (evt) {
        _this.results_update_field(evt);
      });
      this.form_field_jq.bind("chosen:activate.chosen", function (evt) {
        _this.activate_field(evt);
      });
      this.form_field_jq.bind("chosen:open.chosen", function (evt) {
        _this.container_mousedown(evt);
      });
      this.search_field.bind('blur.chosen', function (evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('keyup.chosen', function (evt) {
        _this.keyup_checker(evt);
      });
      this.search_field.bind('keydown.chosen', function (evt) {
        _this.keydown_checker(evt);
      });
      this.search_field.bind('focus.chosen', function (evt) {
        _this.input_focus(evt);
      });

      if (this.is_multiple) {
        return this.search_choices.bind('click.chosen', function (evt) {
          _this.choices_click(evt);
        });
      } else {
        return this.container.bind('click.chosen', function (evt) {
          evt.preventDefault();
        });
      }
    };

    Chosen.prototype.destroy = function () {
      $(document).unbind("click.chosen", this.click_test_action);

      if (this.search_field[0].tabIndex) {
        this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
      }

      this.container.remove();
      this.form_field_jq.removeData('chosen');
      return this.form_field_jq.show();
    };

    Chosen.prototype.search_field_disabled = function () {
      this.is_disabled = this.form_field_jq[0].disabled;

      if (this.is_disabled) {
        this.container.addClass('chosen-disabled');
        this.search_field[0].disabled = true;

        if (!this.is_multiple) {
          this.selected_item.unbind("focus.chosen", this.activate_action);
        }

        return this.close_field();
      } else {
        this.container.removeClass('chosen-disabled');
        this.search_field[0].disabled = false;

        if (!this.is_multiple) {
          return this.selected_item.bind("focus.chosen", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function (evt) {
      if (!this.is_disabled) {
        if (evt && evt.type === "mousedown" && !this.results_showing) {
          evt.preventDefault();
        }

        if (!(evt != null && $(evt.target).hasClass("search-choice-close"))) {
          if (!this.active_field) {
            if (this.is_multiple) {
              this.search_field.val("");
            }

            $(document).bind('click.chosen', this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && ($(evt.target)[0] === this.selected_item[0] || $(evt.target).parents("a.chosen-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }

          return this.activate_field();
        }
      }
    };

    Chosen.prototype.container_mouseup = function (evt) {
      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
        return this.results_reset(evt);
      }
    };

    Chosen.prototype.search_results_mousewheel = function (evt) {
      var delta, _ref1, _ref2;

      delta = -((_ref1 = evt.originalEvent) != null ? _ref1.wheelDelta : void 0) || ((_ref2 = evt.originialEvent) != null ? _ref2.detail : void 0);

      if (delta != null) {
        evt.preventDefault();

        if (evt.type === 'DOMMouseScroll') {
          delta = delta * 40;
        }

        return this.search_results.scrollTop(delta + this.search_results.scrollTop());
      }
    };

    Chosen.prototype.blur_test = function (evt) {
      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function () {
      $(document).unbind("click.chosen", this.click_test_action);
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chosen-container-active");
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function () {
      this.container.addClass("chosen-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      return this.search_field.focus();
    };

    Chosen.prototype.test_active_click = function (evt) {
      if (this.container.is($(evt.target).closest('.chosen-container'))) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function () {
      this.parsing = true;
      this.selected_option_count = null;
      this.results_data = SelectParser.select_to_array(this.form_field);

      if (this.is_multiple) {
        this.search_choices.find("li.search-choice").remove();
      } else if (!this.is_multiple) {
        this.single_set_selected_text();

        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
          this.search_field[0].readOnly = true;
          this.container.addClass("chosen-container-single-nosearch");
        } else {
          this.search_field[0].readOnly = false;
          this.container.removeClass("chosen-container-single-nosearch");
        }
      }

      this.update_results_content(this.results_option_build({
        first: true
      }));
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      return this.parsing = false;
    };

    Chosen.prototype.result_do_highlight = function (el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;

      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();

        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop(high_bottom - maxHeight > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function () {
      if (this.result_highlight) {
        this.result_highlight.removeClass("highlighted");
      }

      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function () {
      if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
        this.form_field_jq.trigger("chosen:maxselected", {
          chosen: this
        });
        return false;
      }

      this.container.addClass("chosen-with-drop");
      this.form_field_jq.trigger("chosen:showing_dropdown", {
        chosen: this
      });
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      return this.winnow_results();
    };

    Chosen.prototype.update_results_content = function (content) {
      return this.search_results.html(content);
    };

    Chosen.prototype.results_hide = function () {
      if (this.results_showing) {
        this.result_clear_highlight();
        this.container.removeClass("chosen-with-drop");
        this.form_field_jq.trigger("chosen:hiding_dropdown", {
          chosen: this
        });
      }

      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function (el) {
      var ti;

      if (this.form_field.tabIndex) {
        ti = this.form_field.tabIndex;
        this.form_field.tabIndex = -1;
        return this.search_field[0].tabIndex = ti;
      }
    };

    Chosen.prototype.set_label_behavior = function () {
      var _this = this;

      this.form_field_label = this.form_field_jq.parents("label");

      if (!this.form_field_label.length && this.form_field.id.length) {
        this.form_field_label = $("label[for='" + this.form_field.id + "']");
      }

      if (this.form_field_label.length > 0) {
        return this.form_field_label.bind('click.chosen', function (evt) {
          if (_this.is_multiple) {
            return _this.container_mousedown(evt);
          } else {
            return _this.activate_field();
          }
        });
      }
    };

    Chosen.prototype.show_search_field_default = function () {
      if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function (evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();

      if (target.length) {
        this.result_highlight = target;
        this.result_select(evt);
        return this.search_field.focus();
      }
    };

    Chosen.prototype.search_results_mouseover = function (evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();

      if (target) {
        return this.result_do_highlight(target);
      }
    };

    Chosen.prototype.search_results_mouseout = function (evt) {
      if ($(evt.target).hasClass("active-result" || false)) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choice_build = function (item) {
      var choice,
          close_link,
          _this = this;

      choice = $('<li />', {
        "class": "search-choice"
      }).html("<span>" + item.html + "</span>");

      if (item.disabled) {
        choice.addClass('search-choice-disabled');
      } else {
        close_link = $('<a />', {
          "class": 'search-choice-close',
          'data-option-array-index': item.array_index
        });
        close_link.bind('click.chosen', function (evt) {
          return _this.choice_destroy_link_click(evt);
        });
        choice.append(close_link);
      }

      return this.search_container.before(choice);
    };

    Chosen.prototype.choice_destroy_link_click = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      if (!this.is_disabled) {
        return this.choice_destroy($(evt.target));
      }
    };

    Chosen.prototype.choice_destroy = function (link) {
      if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
        this.show_search_field_default();

        if (this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
          this.results_hide();
        }

        link.parents('li').first().remove();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.results_reset = function () {
      this.form_field.options[0].selected = true;
      this.selected_option_count = null;
      this.single_set_selected_text();
      this.show_search_field_default();
      this.results_reset_cleanup();
      this.form_field_jq.trigger("change");

      if (this.active_field) {
        return this.results_hide();
      }
    };

    Chosen.prototype.results_reset_cleanup = function () {
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.selected_item.find("abbr").remove();
    };

    Chosen.prototype.reset_single_select_options = function () {
      var i, len, ref, result, results1;
      ref = this.results_data;
      results1 = [];

      for (i = 0, len = ref.length; i < len; i++) {
        result = ref[i];

        if (result.selected) {
          results1.push(result.selected = false);
        } else {
          results1.push(void 0);
        }
      }

      return results1;
    };

    Chosen.prototype.result_select = function (evt) {
      var high, item, selected_index;

      if (this.result_highlight) {
        high = this.result_highlight;
        this.result_clear_highlight();

        if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
          this.form_field_jq.trigger("chosen:maxselected", {
            chosen: this
          });
          return false;
        }

        if (this.is_multiple) {
          high.removeClass("active-result");
        } else {
          this.reset_single_select_options();
        }

        high.addClass("result-selected");
        item = this.results_data[high[0].getAttribute("data-option-array-index")];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        this.selected_option_count = null;

        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.single_set_selected_text(item.text);
        }

        if (!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
          this.results_hide();
        }

        this.search_field.val("");

        if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
          this.form_field_jq.trigger("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }

        this.current_selectedIndex = this.form_field.selectedIndex;
        return this.search_field_scale();
      }
    };

    Chosen.prototype.single_set_selected_text = function (text) {
      if (text == null) {
        text = this.default_text;
      }

      if (text === this.default_text) {
        this.selected_item.addClass("chosen-default");
      } else {
        this.single_deselect_control_build();
        this.selected_item.removeClass("chosen-default");
      }

      return this.selected_item.find("span").text(text);
    };

    Chosen.prototype.result_deselect = function (pos) {
      var result_data;
      result_data = this.results_data[pos];

      if (!this.form_field.options[result_data.options_index].disabled) {
        result_data.selected = false;
        this.form_field.options[result_data.options_index].selected = false;
        this.selected_option_count = null;
        this.result_clear_highlight();

        if (this.results_showing) {
          this.winnow_results();
        }

        this.form_field_jq.trigger("change", {
          deselected: this.form_field.options[result_data.options_index].value
        });
        this.search_field_scale();
        return true;
      } else {
        return false;
      }
    };

    Chosen.prototype.single_deselect_control_build = function () {
      if (!this.allow_single_deselect) {
        return;
      }

      if (!this.selected_item.find("abbr").length) {
        this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }

      return this.selected_item.addClass("chosen-single-with-deselect");
    };

    Chosen.prototype.get_search_text = function () {
      if (this.search_field.val() === this.default_text) {
        return "";
      } else {
        return $('<div/>').text($.trim(this.search_field.val())).html();
      }
    };

    Chosen.prototype.winnow_results_set_highlight = function () {
      var do_high, selected_results;
      selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
      do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();

      if (do_high != null) {
        return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function (terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      return this.search_results.append(no_results_html);
    };

    Chosen.prototype.no_results_clear = function () {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function () {
      var next_sib;

      if (this.results_showing && this.result_highlight) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();

        if (next_sib) {
          return this.result_do_highlight(next_sib);
        }
      } else {
        return this.results_show();
      }
    };

    Chosen.prototype.keyup_arrow = function () {
      var prev_sibs;

      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");

        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices_count() > 0) {
            this.results_hide();
          }

          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function () {
      var next_available_destroy;

      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        next_available_destroy = this.search_container.siblings("li.search-choice").last();

        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
          this.pending_backstroke = next_available_destroy;

          if (this.single_backstroke_delete) {
            return this.keydown_backstroke();
          } else {
            return this.pending_backstroke.addClass("search-choice-focus");
          }
        }
      }
    };

    Chosen.prototype.clear_backstroke = function () {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }

      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function (evt) {
      var stroke, _ref1;

      stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
      this.search_field_scale();

      if (stroke !== 8 && this.pending_backstroke) {
        this.clear_backstroke();
      }

      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;

        case 9:
          if (this.results_showing && !this.is_multiple) {
            this.result_select(evt);
          }

          this.mouse_on_container = false;
          break;

        case 13:
          evt.preventDefault();
          break;

        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;

        case 40:
          evt.preventDefault();
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function () {
      var div, f_width, h, style, style_block, styles, w, _i, _len;

      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];

        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }

        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        f_width = this.container.outerWidth();

        if (w > f_width - 10) {
          w = f_width - 10;
        }

        return this.search_field.css({
          'width': w + 'px'
        });
      }
    };

    return Chosen;
  }(AbstractChosen);
}).call(this);

/***/ }),

/***/ "./src/Resources/admin/plugins/lightbox/lightbox.min.js":
/*!**************************************************************!*\
  !*** ./src/Resources/admin/plugins/lightbox/lightbox.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Lightbox v2.8.2
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */
!function (a, b) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function (a) {
  function b(b) {
    this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b);
  }

  return b.defaults = {
    albumLabel: "Image %1 of %2",
    alwaysShowNavOnTouchDevices: !1,
    fadeDuration: 500,
    fitImagesInViewport: !0,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: !0,
    wrapAround: !1,
    disableScrolling: !1
  }, b.prototype.option = function (b) {
    a.extend(this.options, b);
  }, b.prototype.imageCountLabel = function (a, b) {
    return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b);
  }, b.prototype.init = function () {
    this.enable(), this.build();
  }, b.prototype.enable = function () {
    var b = this;
    a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (c) {
      return b.start(a(c.currentTarget)), !1;
    });
  }, b.prototype.build = function () {
    var b = this;
    a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function () {
      return b.end(), !1;
    }), this.$lightbox.hide().on("click", function (c) {
      return "lightbox" === a(c.target).attr("id") && b.end(), !1;
    }), this.$outerContainer.on("click", function (c) {
      return "lightbox" === a(c.target).attr("id") && b.end(), !1;
    }), this.$lightbox.find(".lb-prev").on("click", function () {
      return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1;
    }), this.$lightbox.find(".lb-next").on("click", function () {
      return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1;
    }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
      return b.end(), !1;
    });
  }, b.prototype.start = function (b) {
    function c(a) {
      d.album.push({
        link: a.attr("href"),
        title: a.attr("data-title") || a.attr("title")
      });
    }

    var d = this,
        e = a(window);
    e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
      visibility: "hidden"
    }), this.sizeOverlay(), this.album = [];
    var f,
        g = 0,
        h = b.attr("data-lightbox");

    if (h) {
      f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');

      for (var i = 0; i < f.length; i = ++i) {
        c(a(f[i])), f[i] === b[0] && (g = i);
      }
    } else if ("lightbox" === b.attr("rel")) c(b);else {
      f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');

      for (var j = 0; j < f.length; j = ++j) {
        c(a(f[j])), f[j] === b[0] && (g = j);
      }
    }

    var k = e.scrollTop() + this.options.positionFromTop,
        l = e.scrollLeft();
    this.$lightbox.css({
      top: k + "px",
      left: l + "px"
    }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(g);
  }, b.prototype.changeImage = function (b) {
    var c = this;
    this.disableKeyboardNav();
    var d = this.$lightbox.find(".lb-image");
    this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
    var e = new Image();
    e.onload = function () {
      var f, g, h, i, j, k, l;
      d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20, i = k - c.containerTopPadding - c.containerBottomPadding - 120, c.options.maxWidth && c.options.maxWidth < j && (j = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (i = c.options.maxHeight), (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height());
    }, e.src = this.album[b].link, this.currentImageIndex = b;
  }, b.prototype.sizeOverlay = function () {
    this.$overlay.width(a(document).width()).height(a(document).height());
  }, b.prototype.sizeContainer = function (a, b) {
    function c() {
      d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.showImage();
    }

    var d = this,
        e = this.$outerContainer.outerWidth(),
        f = this.$outerContainer.outerHeight(),
        g = a + this.containerLeftPadding + this.containerRightPadding,
        h = b + this.containerTopPadding + this.containerBottomPadding;
    e !== g || f !== h ? this.$outerContainer.animate({
      width: g,
      height: h
    }, this.options.resizeDuration, "swing", function () {
      c();
    }) : c();
  }, b.prototype.showImage = function () {
    this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav();
  }, b.prototype.updateNav = function () {
    var a = !1;

    try {
      document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1;
    } catch (b) {}

    this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))));
  }, b.prototype.updateDetails = function () {
    var b = this;

    if ("undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click", function (b) {
      void 0 !== a(this).attr("target") ? window.open(a(this).attr("href"), a(this).attr("target")) : location.href = a(this).attr("href");
    }), this.album.length > 1 && this.options.showImageNumberLabel) {
      var c = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find(".lb-number").text(c).fadeIn("fast");
    } else this.$lightbox.find(".lb-number").hide();

    this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
      return b.sizeOverlay();
    });
  }, b.prototype.preloadNeighboringImages = function () {
    if (this.album.length > this.currentImageIndex + 1) {
      var a = new Image();
      a.src = this.album[this.currentImageIndex + 1].link;
    }

    if (this.currentImageIndex > 0) {
      var b = new Image();
      b.src = this.album[this.currentImageIndex - 1].link;
    }
  }, b.prototype.enableKeyboardNav = function () {
    a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this));
  }, b.prototype.disableKeyboardNav = function () {
    a(document).off(".keyboard");
  }, b.prototype.keyboardAction = function (a) {
    var b = 27,
        c = 37,
        d = 39,
        e = a.keyCode,
        f = String.fromCharCode(e).toLowerCase();
    e === b || f.match(/x|o|c/) ? this.end() : "p" === f || e === c ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === f || e === d) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0));
  }, b.prototype.end = function () {
    this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
      visibility: "visible"
    }), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling");
  }, new b();
});

/***/ }),

/***/ "./src/Resources/js/app.js":
/*!*********************************!*\
  !*** ./src/Resources/js/app.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var vue_resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-resource */ "./node_modules/vue-resource/dist/vue-resource.esm.js");
/* harmony import */ var vue_fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-fragment */ "./node_modules/vue-fragment/dist/vue-fragment.esm.js");
/* harmony import */ var _mixins_globalVueMixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/globalVueMixins */ "./src/Resources/js/mixins/globalVueMixins.js");
/* harmony import */ var _components_BaseComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/BaseComponent.js */ "./src/Resources/js/components/BaseComponent.js");
/* harmony import */ var _components_Helpers_CrudAdmin_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Helpers/CrudAdmin.js */ "./src/Resources/js/components/Helpers/CrudAdmin.js");
/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router.js */ "./src/Resources/js/router.js");
__webpack_require__(/*! ./bootstrap */ "./src/Resources/js/bootstrap.js");

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
window.eventHub = new Vue();




Vue.mixin(_mixins_globalVueMixins__WEBPACK_IMPORTED_MODULE_3__["default"]); //Uses

Vue.use(vue_resource__WEBPACK_IMPORTED_MODULE_1__["default"]);
Vue.use(vue_fragment__WEBPACK_IMPORTED_MODULE_2__["default"].Plugin);
Vue.use(vue_router__WEBPACK_IMPORTED_MODULE_0__["default"]); //Use Crudadmin translatable plugin

if (window.Gettext) {
  Vue.use(Gettext);
} // Components



 //Router

 //Global methods

Vue.mixin(_components_Helpers_CrudAdmin_js__WEBPACK_IMPORTED_MODULE_5__["default"]); //Create base VueApp instance

window.VueApp = new Vue(Object(_components_BaseComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_router_js__WEBPACK_IMPORTED_MODULE_6__["default"]));

/***/ }),

/***/ "./src/Resources/js/bootstrap.js":
/*!***************************************!*\
  !*** ./src/Resources/js/bootstrap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! jquery-form/jquery.form.js */ "./node_modules/jquery-form/jquery.form.js");

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

__webpack_require__(/*! jquery-datetimepicker */ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js");

__webpack_require__(/*! ../admin/plugins/lightbox/lightbox.min.js */ "./src/Resources/admin/plugins/lightbox/lightbox.min.js");

__webpack_require__(/*! ../admin/plugins/chosen/chosen.jquery.min.js */ "./src/Resources/admin/plugins/chosen/chosen.jquery.min.js");

__webpack_require__(/*! ../admin/plugins/chosen-order/chosen.order.jquery.min.js */ "./src/Resources/admin/plugins/chosen-order/chosen.order.jquery.min.js");

__webpack_require__(/*! ../admin/dist/js/main.js */ "./src/Resources/admin/dist/js/main.js");

__webpack_require__(/*! ./main.js */ "./src/Resources/js/main.js");

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
window.moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
window.md5 = __webpack_require__(/*! js-md5 */ "./node_modules/js-md5/src/md5.js");

/***/ }),

/***/ "./src/Resources/js/components/BaseComponent.js":
/*!******************************************************!*\
  !*** ./src/Resources/js/components/BaseComponent.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/Resources/js/config.js");
/* harmony import */ var _Helpers_RequestHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Helpers/RequestHelper */ "./src/Resources/js/components/Helpers/RequestHelper.js");
/* harmony import */ var _Partials_RightNavbar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Partials/RightNavbar.vue */ "./src/Resources/js/components/Partials/RightNavbar.vue");
/* harmony import */ var _Sidebar_Sidebar_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Sidebar/Sidebar.vue */ "./src/Resources/js/components/Sidebar/Sidebar.vue");
/* harmony import */ var _Partials_Modal_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Partials/Modal.vue */ "./src/Resources/js/components/Partials/Modal.vue");
/* harmony import */ var _Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Helpers/ModelHelper.js */ "./src/Resources/js/components/Helpers/ModelHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }








var BaseComponent = function BaseComponent(router) {
  return {
    el: '#app',
    router: router,
    data: function data() {
      return {
        csrf_token: null,
        version: null,
        version_resources: null,
        version_assets: null,
        gettext: null,
        locale: null,
        dashboard: null,
        license_key: null,
        requests: {},
        user: null,
        tree: [],
        originalModels: {},
        models: {},
        localization: {},
        languages: [],
        language_id: null,
        languages_active: false,
        alert: {
          type: null,
          // success,danger,warning...
          title: null,
          message: null,
          success: null,
          close: null,
          component: null,
          opened: null
        }
      };
    },
    watch: {
      language_id: function language_id(id) {
        localStorage.language_id = id;
      }
    },
    components: {
      Sidebar: _Sidebar_Sidebar_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      RightNavbar: _Partials_RightNavbar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      Modal: _Partials_Modal_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    created: function created() {
      this.reloadCSRFToken($('meta[name="csrf-token"]')[0].content);
      this.bootApp(); //Set datepickers language

      jQuery.datetimepicker.setLocale(this.locale);
    },
    mounted: function mounted() {
      this.bootTooltips();
    },
    computed: {
      isTest: function isTest() {
        return this.version.indexOf('test') > -1;
      }
    },
    methods: {
      setDefaultRoute: function setDefaultRoute() {
        if (router.currentRoute.name == 'dashboard') {
          for (var key in this.models) {
            if (this.models[key].hasAccess('read') && this.models[key].getSettings('default', false) === true) {
              router.push({
                name: 'admin-model',
                params: {
                  model: this.models[key].table
                }
              });
              return;
            }
          }
        }
      },
      bootTooltips: function bootTooltips() {
        $('body').tooltip({
          selector: "[data-toggle='tooltip']"
        }); //Destroy tooltips on click

        $('body').click(function () {
          $('[data-toggle="tooltip"]').tooltip('dispose');
        });
      },
      reloadCSRFToken: function reloadCSRFToken(token) {
        this.csrf_token = token;
        Vue.http.options.headers = {
          'X-CSRF-TOKEN': token
        };
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': token
          }
        });
      },

      /*
       * Boot whole app with data from API
       */
      bootApp: function bootApp() {
        var _this2 = this;

        //If user is not logged in
        if (!window.crudadmin.logged) return;
        this.$http.get(window.crudadmin.baseURL + '/api/layout').then(function (response) {
          var layout = response.data;
          _this2.version = layout.version;
          _this2.version_resources = layout.version_resources;
          _this2.version_assets = layout.version_assets;
          _this2.gettext = layout.gettext;
          _this2.locale = layout.locale;
          _this2.dashboard = layout.dashboard;
          _this2.license_key = layout.license_key;
          _this2.requests = Object(_Helpers_RequestHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(layout.requests);
          _this2.user = layout.user;
          _this2.tree = layout.models;
          _this2.models = _this2.flattenModelsWithChilds(layout.models);
          _this2.originalModels = _this2.flattenModelsWithChilds(layout.models);
          _this2.localization = layout.localization || {};
          _this2.languages = layout.languages || [];

          _this2.bootLanguages();

          _this2.setDefaultRoute();
        })["catch"](function (error) {
          _this2.errorResponseLayer(error);
        });
      },

      /*
       * Get all models from groups tree in flatten list
       */
      getModelsFromGroups: function getModelsFromGroups(groups, models) {
        for (var key in groups) {
          //Get all models from group
          if (key.substr(0, _config__WEBPACK_IMPORTED_MODULE_0__["default"].groups_prefix.length) == _config__WEBPACK_IMPORTED_MODULE_0__["default"].groups_prefix) {
            for (var subkey in groups[key].submenu) {
              //Get sub models from subtree
              if (subkey.substr(0, _config__WEBPACK_IMPORTED_MODULE_0__["default"].groups_prefix.length) == _config__WEBPACK_IMPORTED_MODULE_0__["default"].groups_prefix) models = models.concat(this.getModelsFromGroups(groups[key].submenu[subkey].submenu, models)); //Push model into models list
              else models.push(groups[key].submenu[subkey]);
            }
          } //Push model into list
          else {
              models.push(groups[key]);
            }
        }

        return models;
      },

      /*
       * Returns all models also with their childs
       */
      flattenModelsWithChilds: function flattenModelsWithChilds(tree) {
        var models = {};
        tree = this.getModelsFromGroups(tree, []);

        for (var key in tree) {
          if (_typeof(tree[key]) != 'object') continue;
          models[tree[key].slug] = Object(_Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(tree[key]);
          if (Object.keys(tree[key].childs).length > 0) models = _.merge(models, this.flattenModelsWithChilds(tree[key].childs));
        }

        return models;
      },
      openAlert: function openAlert(title, message, type, success, close, component) {
        if (!type) type = 'success';
        if (type == 'error') type = 'danger';
        this.alert.type = type;
        this.alert.title = title;
        this.alert.message = message;
        this.alert.success = success;
        this.alert.close = close;
        this.alert.opened = new Date().getTime();
        this.alert.component = component; //After opening alert unfocus focused input
        //for prevent sending of new form ajax instance...

        if ("activeElement" in document) document.activeElement.blur();
        return this.alert;
      },
      getComponentName: function getComponentName(name) {
        return name + 'Alert';
      },
      arrorAlert: function arrorAlert(callback) {
        this.openAlert(this.trans('warning'), this.trans('unknown-error'), 'danger', null, callback ? callback : function () {});
      },
      bootLanguages: function bootLanguages() {
        if (this.languages.length == 0) return;
        if (!('language_id' in localStorage) || !$.isNumeric(localStorage.language_id)) localStorage.language_id = this.languages[0].id;
        this.language_id = localStorage.language_id;
      },
      //Check for all error response in all requests
      errorResponseLayer: function errorResponseLayer(response, code, callback) {
        //Fix for jquery response
        if ('responseJSON' in response) {
          response.data = response.responseJSON;
        } //Set response data


        if (!response.data && response.body) {
          response.data = response.body;
        } //If error response comes with some message information, then display it


        if (response.data && response.data.message && response.data.title && response.data.type) {
          return this.$root.openAlert(response.data.title, response.data.message, response.data.type, null, function () {
            if (response.status == 401) {
              window.location.href = window.crudadmin.baseURL;
            }
          });
        }

        if (response.status == 404) {
          return this.$root.openAlert(this.trans('warning'), this.trans('row-error'), 'warning');
        } //If has been client logged off


        if (response.status == 401) {
          return this.$root.openAlert(this.trans('warning'), this.trans('auto-logout'), 'warning', null, function () {
            window.location.reload();
          });
        } //Callback on code


        if (callback && (code === response.status || code === null)) {
          return callback(response);
        } //Unknown HTTP error


        if (response.data.message) {
          return this.$root.openAlert('Error ' + response.status, response.data.message, 'error');
        } //Unknown error


        this.$root.arrorAlert();
      },
      //Check specifics property in model
      getModelProperty: function getModelProperty(model, key, value) {
        if (!model) {
          return null;
        }

        return model.getModelProperty(key, value);
      },

      /*
      * Returns correct values into multilangual select
      */
      languageOptions: function languageOptions(array, field, filter, with_hidden) {
        var key,
            relation,
            fieldKey,
            relatedField,
            matchedKeys,
            items = [],
            hasFilter = filter && Object.keys(filter).length > 0; //Relation belongsTo/belongsToMany

        if (field && (relation = field['belongsTo'] || field['belongsToMany']) && (fieldKey = relation.split(',')[1])) {
          matchedKeys = fieldKey.replace(/\\:/g, '').match(new RegExp(/[\:^]([0-9,a-z,A-Z$_]+)+/, 'g'));
        } //Fixed options from option attribute


        if (field && field.option) {
          fieldKey = field.option;
          matchedKeys = fieldKey.replace(/\\:/g, '').match(new RegExp(/[\:^]([0-9,a-z,A-Z$_]+)+/, 'g'));
        }

        loop1: for (var key in array) {
          //If select has filters
          if (hasFilter) {
            for (var k in filter) {
              if (array[key][1][k] == null) {
                continue loop1;
              } //Support for inArray values for belongsToMany


              if (filter[k] && _typeof(filter[k]) == 'object') {
                if (filter[k].indexOf(array[key][1][k]) == -1) {
                  continue loop1;
                }
              } //Compare single values key
              else {
                  if (array[key][1][k] != filter[k]) {
                    continue loop1;
                  }
                }
            }
          } //Build value from multiple columns (multiple fields keys)


          if (matchedKeys) {
            var value = fieldKey.replace(/\\:/g, ':');

            for (var i = 0; i < matchedKeys.length; i++) {
              var keyName = matchedKeys[i].substr(1),
                  _relatedField = relation ? this.models[relation.split(',')[0]].fields[keyName] : field,
                  optionValue = keyName == 'id' ? array[key][0] : this.getLangValue(array[key][1][keyName], _relatedField);

              value = value.replace(new RegExp(matchedKeys[i], 'g'), !optionValue && optionValue !== 0 ? '' : optionValue);
            }
          } //Simple value by one column
          else {
              if (fieldKey) {
                relatedField = relation ? this.models[relation.split(',')[0]].fields[fieldKey] : field;
              } //Get value of multiarray or simple array


              var value = _typeof(array[key][1]) == 'object' && array[key][1] !== null ? this.getLangValue(array[key][1][fieldKey], relatedField) : array[key][1];
            } //Change undefined values on null values


          value = value == null ? null : value;
          var hiddenOptions = field.hiddenOptions || field.optionsFilter; //Skip hidden options

          if (hiddenOptions && with_hidden !== false) {
            if (_typeof(hiddenOptions) == 'object' && hiddenOptions.indexOf(array[key][0]) > -1) {
              continue;
            }

            if (typeof hiddenOptions == 'function' && hiddenOptions(array[key][0], value, array[key][1]) === false) {
              continue;
            }
          }

          items.push([array[key][0], value]);
        }

        return items;
      },
      getLangValue: function getLangValue(value, field) {
        if (field && value && _typeof(value) == 'object' && 'locale' in field) {
          if (this.languages[0].slug in value && (value[this.languages[0].slug] || value[this.languages[0].slug] == 0)) return value[this.languages[0].slug];

          for (var key in value) {
            if (value[key] || value[key] == 0) return value[key];
          }

          return null;
        }

        return value;
      },

      /*
       * Replace datetime format from PHP to momentjs
       */
      fromPHPFormatToMoment: function fromPHPFormatToMoment(format) {
        var mapObj = {
          'd': 'DD',
          'D': 'ddd',
          'j': 'D',
          'l': 'dddd',
          'N': 'E',
          'S': 'o',
          'w': 'e',
          'z': 'DDD',
          'W': 'W',
          'F': 'MMMM',
          'm': 'MM',
          'M': 'MMM',
          'n': 'M',
          't': '',
          'L': '',
          'o': 'YYYY',
          'Y': 'YYYY',
          'y': 'YY',
          'a': 'a',
          'A': 'A',
          'B': '',
          'g': 'h',
          'G': 'H',
          'h': 'hh',
          'H': 'HH',
          'i': 'mm',
          's': 'ss',
          'u': 'SSS',
          'e': 'zz',
          'I': '',
          'O': '',
          'P': '',
          'T': '',
          'Z': '',
          'c': '',
          'r': '',
          'U': 'X'
        };
        var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
        return format.replace(re, function (match) {
          if (match in mapObj) return mapObj[match];
          return match;
        });
      },
      runInlineScripts: function runInlineScripts(layout) {
        $('<div>' + layout + '</div>').find('script').each(function () {
          //Run external js
          if ($(this).attr('src')) {
            var js = document.createElement('script');
            js.src = $(this).attr('src');
            js.type = 'text/javascript';
            $('body').append(js);
          } //Run inline javascripts
          else {
              try {
                var func = new Function($(this).html());
                func.call(Vue);
              } catch (e) {
                console.error(e);
              }
            }
        });
        $('<div>' + layout + '</div>').find('style').each(function () {
          $('body').append($(this)[0].outerHTML);
        });
      },
      getLangName: function getLangName(lang) {
        //If language table is also translatable
        if (_typeof(lang.name) == 'object') {
          return lang.name[Object.keys(lang.name)[0]];
        }

        return lang.name;
      },
      eventDataModifier: function eventDataModifier(event, data, component) {
        if (event == 'sendParentRow') {
          data = {
            depth_level: component.$parent.depth_level
          };
        }

        return data;
      },
      canPassEventThrough: function canPassEventThrough(event, data, component) {
        if (['getParentRow'].indexOf(event) > -1) {
          var componentDepthLevel = component.$parent.depth_level || component.$parent.$parent.depth_level; //Does not receive events into component which are not from parent rows.

          if (data.depth_level !== undefined && data.depth_level > componentDepthLevel) {
            return false;
          }
        }

        return true;
      },
      getComponentObject: function getComponentObject(data) {
        var obj = new Function('return ' + data)(),
            _this = this; //If template is missing, render empty div


        if (!obj.template) {
          obj.template = '<div></div>';
        } //Fixed backwards compacitibility for vuejs1 components


        if (obj.ready && !obj.mounted) obj.mounted = obj.ready;

        var originalCreated = obj.created || function () {},
            originalMounted = obj.mounted || function () {},
            originalDestroyed = obj.destroyed || function () {},
            proxyEventsResend = ['sendRow', 'sendParentRow', 'reloadRows'],
            proxyEventsReceive = ['getRow', 'getParentRow', 'onCreate', 'onUpdate', 'onSubmit', 'changeFormSaveState', 'selectHistoryRow'],
            events = {}; //Extend created method


        obj.created = function () {
          var _this3 = this;

          //This events should be resend from component to eventHub
          for (var key in proxyEventsResend) {
            (function (event) {
              _this3.$on(event, events[event] = function (data) {
                eventHub.$emit(event, _this.eventDataModifier(event, data, _this3));
              });
            })(proxyEventsResend[key]);
          } //This events should be received from evnentHub and send to component


          for (var key in proxyEventsReceive) {
            (function (event) {
              eventHub.$on(event, events[event] = function (data) {
                if (_this.canPassEventThrough(event, data, _this3)) {
                  _this3.$emit(event, data);
                }
              });
            })(proxyEventsReceive[key]);
          }

          originalCreated.call(this);
        }; //Extend mounted method


        obj.mounted = function () {
          originalMounted.call(this);
        };

        obj.destroyed = function () {
          //Unmount eventhub proxy
          for (var key in proxyEventsReceive) {
            (function (event) {
              eventHub.$off(event, events[event]);
            })(proxyEventsReceive[key]);
          }

          originalDestroyed.call(this);
        };

        return obj;
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (BaseComponent);

/***/ }),

/***/ "./src/Resources/js/components/Fields/CheckboxField.vue":
/*!**************************************************************!*\
  !*** ./src/Resources/js/components/Fields/CheckboxField.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckboxField_vue_vue_type_template_id_eb181f52___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckboxField.vue?vue&type=template&id=eb181f52& */ "./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=template&id=eb181f52&");
/* harmony import */ var _CheckboxField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckboxField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CheckboxField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckboxField_vue_vue_type_template_id_eb181f52___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckboxField_vue_vue_type_template_id_eb181f52___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/CheckboxField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckboxField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CheckboxField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckboxField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=template&id=eb181f52&":
/*!*********************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=template&id=eb181f52& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckboxField_vue_vue_type_template_id_eb181f52___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CheckboxField.vue?vue&type=template&id=eb181f52& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/CheckboxField.vue?vue&type=template&id=eb181f52&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckboxField_vue_vue_type_template_id_eb181f52___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckboxField_vue_vue_type_template_id_eb181f52___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/DateTimeField.vue":
/*!**************************************************************!*\
  !*** ./src/Resources/js/components/Fields/DateTimeField.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DateTimeField_vue_vue_type_template_id_3490af7f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateTimeField.vue?vue&type=template&id=3490af7f& */ "./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=template&id=3490af7f&");
/* harmony import */ var _DateTimeField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateTimeField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DateTimeField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DateTimeField_vue_vue_type_template_id_3490af7f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DateTimeField_vue_vue_type_template_id_3490af7f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/DateTimeField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimeField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DateTimeField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimeField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=template&id=3490af7f&":
/*!*********************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=template&id=3490af7f& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimeField_vue_vue_type_template_id_3490af7f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DateTimeField.vue?vue&type=template&id=3490af7f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/DateTimeField.vue?vue&type=template&id=3490af7f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimeField_vue_vue_type_template_id_3490af7f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimeField_vue_vue_type_template_id_3490af7f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/FileField.vue":
/*!**********************************************************!*\
  !*** ./src/Resources/js/components/Fields/FileField.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileField_vue_vue_type_template_id_694e5abe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileField.vue?vue&type=template&id=694e5abe& */ "./src/Resources/js/components/Fields/FileField.vue?vue&type=template&id=694e5abe&");
/* harmony import */ var _FileField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/FileField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FileField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileField_vue_vue_type_template_id_694e5abe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FileField_vue_vue_type_template_id_694e5abe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/FileField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/FileField.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/FileField.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FileField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/FileField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/FileField.vue?vue&type=template&id=694e5abe&":
/*!*****************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/FileField.vue?vue&type=template&id=694e5abe& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileField_vue_vue_type_template_id_694e5abe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FileField.vue?vue&type=template&id=694e5abe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/FileField.vue?vue&type=template&id=694e5abe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileField_vue_vue_type_template_id_694e5abe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileField_vue_vue_type_template_id_694e5abe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/NumberField.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Fields/NumberField.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NumberField_vue_vue_type_template_id_c87f8cde___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberField.vue?vue&type=template&id=c87f8cde& */ "./src/Resources/js/components/Fields/NumberField.vue?vue&type=template&id=c87f8cde&");
/* harmony import */ var _NumberField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NumberField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/NumberField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NumberField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NumberField_vue_vue_type_template_id_c87f8cde___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NumberField_vue_vue_type_template_id_c87f8cde___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/NumberField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/NumberField.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/NumberField.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NumberField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NumberField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/NumberField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NumberField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/NumberField.vue?vue&type=template&id=c87f8cde&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/NumberField.vue?vue&type=template&id=c87f8cde& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NumberField_vue_vue_type_template_id_c87f8cde___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NumberField.vue?vue&type=template&id=c87f8cde& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/NumberField.vue?vue&type=template&id=c87f8cde&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NumberField_vue_vue_type_template_id_c87f8cde___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NumberField_vue_vue_type_template_id_c87f8cde___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/RadioField.vue":
/*!***********************************************************!*\
  !*** ./src/Resources/js/components/Fields/RadioField.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RadioField_vue_vue_type_template_id_10efe78f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RadioField.vue?vue&type=template&id=10efe78f& */ "./src/Resources/js/components/Fields/RadioField.vue?vue&type=template&id=10efe78f&");
/* harmony import */ var _RadioField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RadioField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/RadioField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RadioField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RadioField_vue_vue_type_template_id_10efe78f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RadioField_vue_vue_type_template_id_10efe78f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/RadioField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/RadioField.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/RadioField.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RadioField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RadioField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/RadioField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RadioField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/RadioField.vue?vue&type=template&id=10efe78f&":
/*!******************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/RadioField.vue?vue&type=template&id=10efe78f& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RadioField_vue_vue_type_template_id_10efe78f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RadioField.vue?vue&type=template&id=10efe78f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/RadioField.vue?vue&type=template&id=10efe78f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RadioField_vue_vue_type_template_id_10efe78f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RadioField_vue_vue_type_template_id_10efe78f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/SelectField.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Fields/SelectField.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectField_vue_vue_type_template_id_2688193e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectField.vue?vue&type=template&id=2688193e& */ "./src/Resources/js/components/Fields/SelectField.vue?vue&type=template&id=2688193e&");
/* harmony import */ var _SelectField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/SelectField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectField_vue_vue_type_template_id_2688193e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectField_vue_vue_type_template_id_2688193e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/SelectField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/SelectField.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/SelectField.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/SelectField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/SelectField.vue?vue&type=template&id=2688193e&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/SelectField.vue?vue&type=template&id=2688193e& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectField_vue_vue_type_template_id_2688193e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectField.vue?vue&type=template&id=2688193e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/SelectField.vue?vue&type=template&id=2688193e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectField_vue_vue_type_template_id_2688193e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectField_vue_vue_type_template_id_2688193e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/StringField.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Fields/StringField.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StringField_vue_vue_type_template_id_167895c9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringField.vue?vue&type=template&id=167895c9& */ "./src/Resources/js/components/Fields/StringField.vue?vue&type=template&id=167895c9&");
/* harmony import */ var _StringField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StringField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/StringField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StringField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StringField_vue_vue_type_template_id_167895c9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StringField_vue_vue_type_template_id_167895c9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/StringField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/StringField.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/StringField.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StringField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StringField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/StringField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StringField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/StringField.vue?vue&type=template&id=167895c9&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/StringField.vue?vue&type=template&id=167895c9& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StringField_vue_vue_type_template_id_167895c9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StringField.vue?vue&type=template&id=167895c9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/StringField.vue?vue&type=template&id=167895c9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StringField_vue_vue_type_template_id_167895c9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StringField_vue_vue_type_template_id_167895c9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Fields/TextField.vue":
/*!**********************************************************!*\
  !*** ./src/Resources/js/components/Fields/TextField.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TextField_vue_vue_type_template_id_be8fbba6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextField.vue?vue&type=template&id=be8fbba6& */ "./src/Resources/js/components/Fields/TextField.vue?vue&type=template&id=be8fbba6&");
/* harmony import */ var _TextField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextField.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Fields/TextField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TextField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TextField_vue_vue_type_template_id_be8fbba6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TextField_vue_vue_type_template_id_be8fbba6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Fields/TextField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Fields/TextField.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/TextField.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TextField.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/TextField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Fields/TextField.vue?vue&type=template&id=be8fbba6&":
/*!*****************************************************************************************!*\
  !*** ./src/Resources/js/components/Fields/TextField.vue?vue&type=template&id=be8fbba6& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextField_vue_vue_type_template_id_be8fbba6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TextField.vue?vue&type=template&id=be8fbba6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Fields/TextField.vue?vue&type=template&id=be8fbba6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextField_vue_vue_type_template_id_be8fbba6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextField_vue_vue_type_template_id_be8fbba6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Forms/FormBuilder.vue":
/*!***********************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormBuilder.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormBuilder_vue_vue_type_template_id_de82885e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormBuilder.vue?vue&type=template&id=de82885e& */ "./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=template&id=de82885e&");
/* harmony import */ var _FormBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormBuilder.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormBuilder_vue_vue_type_template_id_de82885e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormBuilder_vue_vue_type_template_id_de82885e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Forms/FormBuilder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=template&id=de82885e&":
/*!******************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=template&id=de82885e& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_template_id_de82885e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormBuilder.vue?vue&type=template&id=de82885e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormBuilder.vue?vue&type=template&id=de82885e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_template_id_de82885e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_template_id_de82885e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Forms/FormGroup.vue":
/*!*********************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormGroup.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormGroup_vue_vue_type_template_id_13423f96___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormGroup.vue?vue&type=template&id=13423f96& */ "./src/Resources/js/components/Forms/FormGroup.vue?vue&type=template&id=13423f96&");
/* harmony import */ var _FormGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormGroup.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Forms/FormGroup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormGroup_vue_vue_type_template_id_13423f96___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormGroup_vue_vue_type_template_id_13423f96___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Forms/FormGroup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormGroup.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormGroup.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormGroup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormGroup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormGroup.vue?vue&type=template&id=13423f96&":
/*!****************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormGroup.vue?vue&type=template&id=13423f96& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_template_id_13423f96___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormGroup.vue?vue&type=template&id=13423f96& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormGroup.vue?vue&type=template&id=13423f96&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_template_id_13423f96___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_template_id_13423f96___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Forms/FormInputBuilder.vue":
/*!****************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormInputBuilder.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormInputBuilder_vue_vue_type_template_id_d169a3aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormInputBuilder.vue?vue&type=template&id=d169a3aa& */ "./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=template&id=d169a3aa&");
/* harmony import */ var _FormInputBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormInputBuilder.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormInputBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormInputBuilder_vue_vue_type_template_id_d169a3aa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormInputBuilder_vue_vue_type_template_id_d169a3aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Forms/FormInputBuilder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInputBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormInputBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInputBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=template&id=d169a3aa&":
/*!***********************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=template&id=d169a3aa& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInputBuilder_vue_vue_type_template_id_d169a3aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormInputBuilder.vue?vue&type=template&id=d169a3aa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormInputBuilder.vue?vue&type=template&id=d169a3aa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInputBuilder_vue_vue_type_template_id_d169a3aa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInputBuilder_vue_vue_type_template_id_d169a3aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Forms/FormTabsBuilder.vue":
/*!***************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormTabsBuilder.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormTabsBuilder_vue_vue_type_template_id_5272f673___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormTabsBuilder.vue?vue&type=template&id=5272f673& */ "./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=template&id=5272f673&");
/* harmony import */ var _FormTabsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormTabsBuilder.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormTabsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormTabsBuilder_vue_vue_type_template_id_5272f673___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormTabsBuilder_vue_vue_type_template_id_5272f673___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Forms/FormTabsBuilder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormTabsBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=template&id=5272f673&":
/*!**********************************************************************************************!*\
  !*** ./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=template&id=5272f673& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabsBuilder_vue_vue_type_template_id_5272f673___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormTabsBuilder.vue?vue&type=template&id=5272f673& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Forms/FormTabsBuilder.vue?vue&type=template&id=5272f673&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabsBuilder_vue_vue_type_template_id_5272f673___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabsBuilder_vue_vue_type_template_id_5272f673___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Helpers/CrudAdmin.js":
/*!**********************************************************!*\
  !*** ./src/Resources/js/components/Helpers/CrudAdmin.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helpers_FontAwesomeMigrator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/FontAwesomeMigrator */ "./src/Resources/js/components/Helpers/FontAwesomeMigrator.js");

var CrudAdmin = {
  computed: {
    getAvatar: function getAvatar() {
      if (this.user && this.user.avatar) return this.user.avatar;
      return this.$http.options.root + '/../' + window.crudadmin.path + '/dist/img/avatar5.png';
    }
  },
  methods: {
    trans: function trans(key) {
      if (key in this.$root.localization) return this.$root.localization[key];
      return key;
    },
    faMigrator: function faMigrator(icon) {
      return Object(_Helpers_FontAwesomeMigrator__WEBPACK_IMPORTED_MODULE_0__["default"])(icon);
    },
    scrollTo: function scrollTo(id, callback) {
      $('html, body').animate({
        scrollTop: $(id).offset().top - 10
      }, 500, callback);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CrudAdmin);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/FieldsHelper.js":
/*!*************************************************************!*\
  !*** ./src/Resources/js/components/Helpers/FieldsHelper.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Fields = function Fields(Model) {
  /*
   * Hide input
   */
  Model.prototype.hideFromForm = function (key, value) {
    Vue.set(this.fields[key], 'hideFromForm', value);
  };
  /*
   * Remove input
   */


  Model.prototype.removeFromForm = function (key, value) {
    Vue.set(this.fields[key], 'removeFromForm', value);
  };
  /*
   * Filter fields options by key or by function
   */


  Model.prototype.optionsFilter = function (key, filter) {
    this.fields[key].optionsFilter = filter;
  };
  /*
   * Get option from field by id
   */


  Model.prototype.getOptionValue = function (key, id) {
    var field = this.fields[key];
    var value = field.options.filter(function (item) {
      return item[0] == id;
    })[0];

    if (_.isNil(value)) {
      return null;
    }

    return value[1];
  };
  /*
   * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
   */


  Model.prototype.isMatchedAttributesValues = function (params, isIn, row) {
    var items = (params || '').split(','),
        fieldOperator = items[0].split('.'),
        relatedField = this.fields[fieldOperator[0]] || this.fields[fieldOperator[0] + '_id'],
        //If static field does not exists, and we want do actions by non existing columns, then look for value in row data.
    value = relatedField ? relatedField.value : row[fieldOperator[0]]; //Cast values

    items = items.map(function (item) {
      var value = item;
      value = _.isNil(item) || ['', 'NULL'].indexOf(item) > -1 ? null : value;
      value = ['TRUE'].indexOf(item) > -1 ? true : value;
      value = ['FALSE'].indexOf(item) > -1 ? false : value;
      return value;
    }); //If is key in item from options fields

    if (relatedField && fieldOperator.length > 1) {
      var options = relatedField.options,
          option = _.find(options, function (item) {
        return item[0] == value;
      }); //Implement is in


      if (isIn) {
        if (option && items.slice(1).filter(function (item) {
          return item == option[1][fieldOperator[1]];
        }).length > 0) {
          return true;
        }
      } else {
        if (option && option[1][fieldOperator[1]] === items[1]) {
          return true;
        }
      }

      return false;
    } //If is empty value


    if (_.isNil(value) || value === '') {
      value = null;
    }

    return isIn ? items.slice(1).filter(function (item) {
      return item == value;
    }).length > 0 : value == items[1];
  };
  /*
   * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
   */


  Model.prototype.tryAttribute = function (field, type, row) {
    var param; //If is static value, non dynamical...

    if (param = field[type]) {
      if (param === true) {
        return true;
      } else if (param === false) {
        return false;
      }
    }

    if (param = field[type + 'If']) {
      return this.isMatchedAttributesValues(param, false, row);
    }

    if (param = field[type + 'IfIn']) {
      return this.isMatchedAttributesValues(param, true, row);
    }

    if (param = field[type + 'IfNot']) {
      return !this.isMatchedAttributesValues(param, false, row);
    }

    if (param = field[type + 'IfNotIn']) {
      return !this.isMatchedAttributesValues(param, true, row);
    }

    return false;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Fields);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/FontAwesomeMigrator.js":
/*!********************************************************************!*\
  !*** ./src/Resources/js/components/Helpers/FontAwesomeMigrator.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var icons = {
  "fa-500px": "fab fa-500px",
  "fa-address-book-o": "far fa-address-book",
  "fa-address-card-o": "far fa-address-card",
  "fa-adn": "fab fa-adn",
  "fa-amazon": "fab fa-amazon",
  "fa-android": "fab fa-android",
  "fa-angellist": "fab fa-angellist",
  "fa-apple": "fab fa-apple",
  "fa-area-chart": "fas fa-chart-area",
  "fa-arrow-circle-o-down": "far fa-arrow-alt-circle-down",
  "fa-arrow-circle-o-left": "far fa-arrow-alt-circle-left",
  "fa-arrow-circle-o-right": "far fa-arrow-alt-circle-right",
  "fa-arrow-circle-o-up": "far fa-arrow-alt-circle-up",
  "fa-arrows": "fas fa-arrows-alt",
  "fa-arrows-alt": "fas fa-expand-arrows-alt",
  "fa-arrows-h": "fas fa-arrows-alt-h",
  "fa-arrows-v": "fas fa-arrows-alt-v",
  "fa-asl-interpreting": "fas fa-american-sign-language-interpreting",
  "fa-automobile": "fas fa-car",
  "fa-bandcamp": "fab fa-bandcamp",
  "fa-bank": "fas fa-university",
  "fa-bar-chart": "far fa-chart-bar",
  "fa-bar-chart-o": "far fa-chart-bar",
  "fa-bathtub": "fas fa-bath",
  "fa-battery": "fas fa-battery-full",
  "fa-battery-0": "fas fa-battery-empty",
  "fa-battery-1": "fas fa-battery-quarter",
  "fa-battery-2": "fas fa-battery-half",
  "fa-battery-3": "fas fa-battery-three-quarters",
  "fa-battery-4": "fas fa-battery-full",
  "fa-behance": "fab fa-behance",
  "fa-behance-square": "fab fa-behance-square",
  "fa-bell-o": "far fa-bell",
  "fa-bell-slash-o": "far fa-bell-slash",
  "fa-bitbucket": "fab fa-bitbucket",
  "fa-bitbucket-square": "fab fa-bitbucket",
  "fa-bitcoin": "fab fa-btc",
  "fa-black-tie": "fab fa-black-tie",
  "fa-bluetooth": "fab fa-bluetooth",
  "fa-bluetooth-b": "fab fa-bluetooth-b",
  "fa-bookmark-o": "far fa-bookmark",
  "fa-btc": "fab fa-btc",
  "fa-building-o": "far fa-building",
  "fa-buysellads": "fab fa-buysellads",
  "fa-cab": "fas fa-taxi",
  "fa-calendar": "fas fa-calendar-alt",
  "fa-calendar-check-o": "far fa-calendar-check",
  "fa-calendar-minus-o": "far fa-calendar-minus",
  "fa-calendar-o": "far fa-calendar",
  "fa-calendar-plus-o": "far fa-calendar-plus",
  "fa-calendar-times-o": "far fa-calendar-times",
  "fa-caret-square-o-down": "far fa-caret-square-down",
  "fa-caret-square-o-left": "far fa-caret-square-left",
  "fa-caret-square-o-right": "far fa-caret-square-right",
  "fa-caret-square-o-up": "far fa-caret-square-up",
  "fa-cc": "far fa-closed-captioning",
  "fa-cc-amex": "fab fa-cc-amex",
  "fa-cc-diners-club": "fab fa-cc-diners-club",
  "fa-cc-discover": "fab fa-cc-discover",
  "fa-cc-jcb": "fab fa-cc-jcb",
  "fa-cc-mastercard": "fab fa-cc-mastercard",
  "fa-cc-paypal": "fab fa-cc-paypal",
  "fa-cc-stripe": "fab fa-cc-stripe",
  "fa-cc-visa": "fab fa-cc-visa",
  "fa-chain": "fas fa-link",
  "fa-chain-broken": "fas fa-unlink",
  "fa-check-circle-o": "far fa-check-circle",
  "fa-check-square-o": "far fa-check-square",
  "fa-chrome": "fab fa-chrome",
  "fa-circle-o": "far fa-circle",
  "fa-circle-o-notch": "fas fa-circle-notch",
  "fa-circle-thin": "far fa-circle",
  "fa-clipboard": "far fa-clipboard",
  "fa-clock-o": "far fa-clock",
  "fa-clone": "far fa-clone",
  "fa-close": "fas fa-times",
  "fa-cloud-download": "fas fa-cloud-download-alt",
  "fa-cloud-upload": "fas fa-cloud-upload-alt",
  "fa-cny": "fas fa-yen-sign",
  "fa-code-fork": "fas fa-code-branch",
  "fa-codepen": "fab fa-codepen",
  "fa-codiepie": "fab fa-codiepie",
  "fa-comment-o": "far fa-comment",
  "fa-commenting": "far fa-comment-dots",
  "fa-commenting-o": "far fa-comment-dots",
  "fa-comments-o": "far fa-comments",
  "fa-compass": "far fa-compass",
  "fa-connectdevelop": "fab fa-connectdevelop",
  "fa-contao": "fab fa-contao",
  "fa-copyright": "far fa-copyright",
  "fa-creative-commons": "fab fa-creative-commons",
  "fa-credit-card": "far fa-credit-card",
  "fa-credit-card-alt": "fas fa-credit-card",
  "fa-css3": "fab fa-css3",
  "fa-cutlery": "fas fa-utensils",
  "fa-dashboard": "fas fa-tachometer-alt",
  "fa-dashcube": "fab fa-dashcube",
  "fa-deafness": "fas fa-deaf",
  "fa-dedent": "fas fa-outdent",
  "fa-delicious": "fab fa-delicious",
  "fa-deviantart": "fab fa-deviantart",
  "fa-diamond": "far fa-gem",
  "fa-digg": "fab fa-digg",
  "fa-dollar": "fas fa-dollar-sign",
  "fa-dot-circle-o": "far fa-dot-circle",
  "fa-dribbble": "fab fa-dribbble",
  "fa-drivers-license": "fas fa-id-card",
  "fa-drivers-license-o": "far fa-id-card",
  "fa-dropbox": "fab fa-dropbox",
  "fa-drupal": "fab fa-drupal",
  "fa-edge": "fab fa-edge",
  "fa-eercast": "fab fa-sellcast",
  "fa-empire": "fab fa-empire",
  "fa-envelope-o": "far fa-envelope",
  "fa-envelope-open-o": "far fa-envelope-open",
  "fa-envira": "fab fa-envira",
  "fa-etsy": "fab fa-etsy",
  "fa-eur": "fas fa-euro-sign",
  "fa-euro": "fas fa-euro-sign",
  "fa-exchange": "fas fa-exchange-alt",
  "fa-expeditedssl": "fab fa-expeditedssl",
  "fa-external-link": "fas fa-external-link-alt",
  "fa-external-link-square": "fas fa-external-link-square-alt",
  "fa-eye": "far fa-eye",
  "fa-eye-slash": "far fa-eye-slash",
  "fa-eyedropper": "fas fa-eye-dropper",
  "fa-fa": "fab fa-font-awesome",
  "fa-facebook": "fab fa-facebook-f",
  "fa-facebook-f": "fab fa-facebook-f",
  "fa-facebook-official": "fab fa-facebook",
  "fa-facebook-square": "fab fa-facebook-square",
  "fa-feed": "fas fa-rss",
  "fa-file-archive-o": "far fa-file-archive",
  "fa-file-audio-o": "far fa-file-audio",
  "fa-file-code-o": "far fa-file-code",
  "fa-file-excel-o": "far fa-file-excel",
  "fa-file-image-o": "far fa-file-image",
  "fa-file-movie-o": "far fa-file-video",
  "fa-file-o": "far fa-file",
  "fa-file-pdf-o": "far fa-file-pdf",
  "fa-file-photo-o": "far fa-file-image",
  "fa-file-picture-o": "far fa-file-image",
  "fa-file-powerpoint-o": "far fa-file-powerpoint",
  "fa-file-sound-o": "far fa-file-audio",
  "fa-file-text": "fas fa-file-alt",
  "fa-file-text-o": "far fa-file-alt",
  "fa-file-video-o": "far fa-file-video",
  "fa-file-word-o": "far fa-file-word",
  "fa-file-zip-o": "far fa-file-archive",
  "fa-files-o": "far fa-copy",
  "fa-firefox": "fab fa-firefox",
  "fa-first-order": "fab fa-first-order",
  "fa-flag-o": "far fa-flag",
  "fa-flash": "fas fa-bolt",
  "fa-flickr": "fab fa-flickr",
  "fa-floppy-o": "far fa-save",
  "fa-folder-o": "far fa-folder",
  "fa-folder-open-o": "far fa-folder-open",
  "fa-font-awesome": "fab fa-font-awesome",
  "fa-fonticons": "fab fa-fonticons",
  "fa-fort-awesome": "fab fa-fort-awesome",
  "fa-forumbee": "fab fa-forumbee",
  "fa-foursquare": "fab fa-foursquare",
  "fa-free-code-camp": "fab fa-free-code-camp",
  "fa-frown-o": "far fa-frown",
  "fa-futbol-o": "far fa-futbol",
  "fa-gbp": "fas fa-pound-sign",
  "fa-ge": "fab fa-empire",
  "fa-gear": "fas fa-cog",
  "fa-gears": "fas fa-cogs",
  "fa-get-pocket": "fab fa-get-pocket",
  "fa-gg": "fab fa-gg",
  "fa-gg-circle": "fab fa-gg-circle",
  "fa-globe": "fa fa-globe-americas",
  "fa-git": "fab fa-git",
  "fa-git-square": "fab fa-git-square",
  "fa-github": "fab fa-github",
  "fa-github-alt": "fab fa-github-alt",
  "fa-github-square": "fab fa-github-square",
  "fa-gitlab": "fab fa-gitlab",
  "fa-gittip": "fab fa-gratipay",
  "fa-glass": "fas fa-glass-martini",
  "fa-glide": "fab fa-glide",
  "fa-glide-g": "fab fa-glide-g",
  "fa-google": "fab fa-google",
  "fa-google-plus": "fab fa-google-plus-g",
  "fa-google-plus-circle": "fab fa-google-plus",
  "fa-google-plus-official": "fab fa-google-plus",
  "fa-google-plus-square": "fab fa-google-plus-square",
  "fa-google-wallet": "fab fa-google-wallet",
  "fa-gratipay": "fab fa-gratipay",
  "fa-grav": "fab fa-grav",
  "fa-group": "fas fa-users",
  "fa-hacker-news": "fab fa-hacker-news",
  "fa-hand-grab-o": "far fa-hand-rock",
  "fa-hand-lizard-o": "far fa-hand-lizard",
  "fa-hand-o-down": "far fa-hand-point-down",
  "fa-hand-o-left": "far fa-hand-point-left",
  "fa-hand-o-right": "far fa-hand-point-right",
  "fa-hand-o-up": "far fa-hand-point-up",
  "fa-hand-paper-o": "far fa-hand-paper",
  "fa-hand-peace-o": "far fa-hand-peace",
  "fa-hand-pointer-o": "far fa-hand-pointer",
  "fa-hand-rock-o": "far fa-hand-rock",
  "fa-hand-scissors-o": "far fa-hand-scissors",
  "fa-hand-spock-o": "far fa-hand-spock",
  "fa-hand-stop-o": "far fa-hand-paper",
  "fa-handshake-o": "far fa-handshake",
  "fa-hard-of-hearing": "fas fa-deaf",
  "fa-hdd-o": "far fa-hdd",
  "fa-header": "fas fa-heading",
  "fa-heart-o": "far fa-heart",
  "fa-hospital-o": "far fa-hospital",
  "fa-hotel": "fas fa-bed",
  "fa-hourglass-1": "fas fa-hourglass-start",
  "fa-hourglass-2": "fas fa-hourglass-half",
  "fa-hourglass-3": "fas fa-hourglass-end",
  "fa-hourglass-o": "far fa-hourglass",
  "fa-houzz": "fab fa-houzz",
  "fa-html5": "fab fa-html5",
  "fa-id-badge": "far fa-id-badge",
  "fa-id-card-o": "far fa-id-card",
  "fa-ils": "fas fa-shekel-sign",
  "fa-image": "far fa-image",
  "fa-imdb": "fab fa-imdb",
  "fa-inr": "fas fa-rupee-sign",
  "fa-instagram": "fab fa-instagram",
  "fa-institution": "fas fa-university",
  "fa-internet-explorer": "fab fa-internet-explorer",
  "fa-intersex": "fas fa-transgender",
  "fa-ioxhost": "fab fa-ioxhost",
  "fa-joomla": "fab fa-joomla",
  "fa-jpy": "fas fa-yen-sign",
  "fa-jsfiddle": "fab fa-jsfiddle",
  "fa-keyboard-o": "far fa-keyboard",
  "fa-krw": "fas fa-won-sign",
  "fa-lastfm": "fab fa-lastfm",
  "fa-lastfm-square": "fab fa-lastfm-square",
  "fa-leanpub": "fab fa-leanpub",
  "fa-legal": "fas fa-gavel",
  "fa-lemon-o": "far fa-lemon",
  "fa-level-down": "fas fa-level-down-alt",
  "fa-level-up": "fas fa-level-up-alt",
  "fa-life-bouy": "far fa-life-ring",
  "fa-life-buoy": "far fa-life-ring",
  "fa-life-ring": "far fa-life-ring",
  "fa-life-saver": "far fa-life-ring",
  "fa-lightbulb-o": "far fa-lightbulb",
  "fa-line-chart": "fas fa-chart-line",
  "fa-linkedin": "fab fa-linkedin-in",
  "fa-linkedin-square": "fab fa-linkedin",
  "fa-linode": "fab fa-linode",
  "fa-linux": "fab fa-linux",
  "fa-list-alt": "far fa-list-alt",
  "fa-long-arrow-down": "fas fa-long-arrow-alt-down",
  "fa-long-arrow-left": "fas fa-long-arrow-alt-left",
  "fa-long-arrow-right": "fas fa-long-arrow-alt-right",
  "fa-long-arrow-up": "fas fa-long-arrow-alt-up",
  "fa-mail-forward": "fas fa-share",
  "fa-mail-reply": "fas fa-reply",
  "fa-mail-reply-all": "fas fa-reply-all",
  "fa-map-marker": "fas fa-map-marker-alt",
  "fa-map-o": "far fa-map",
  "fa-maxcdn": "fab fa-maxcdn",
  "fa-meanpath": "fab fa-font-awesome",
  "fa-medium": "fab fa-medium",
  "fa-meetup": "fab fa-meetup",
  "fa-meh-o": "far fa-meh",
  "fa-minus-square-o": "far fa-minus-square",
  "fa-mixcloud": "fab fa-mixcloud",
  "fa-mobile": "fas fa-mobile-alt",
  "fa-mobile-phone": "fas fa-mobile-alt",
  "fa-modx": "fab fa-modx",
  "fa-money": "far fa-money-bill-alt",
  "fa-moon-o": "far fa-moon",
  "fa-mortar-board": "fas fa-graduation-cap",
  "fa-navicon": "fas fa-bars",
  "fa-newspaper-o": "far fa-newspaper",
  "fa-object-group": "far fa-object-group",
  "fa-object-ungroup": "far fa-object-ungroup",
  "fa-odnoklassniki": "fab fa-odnoklassniki",
  "fa-odnoklassniki-square": "fab fa-odnoklassniki-square",
  "fa-opencart": "fab fa-opencart",
  "fa-openid": "fab fa-openid",
  "fa-opera": "fab fa-opera",
  "fa-optin-monster": "fab fa-optin-monster",
  "fa-pagelines": "fab fa-pagelines",
  "fa-paper-plane-o": "far fa-paper-plane",
  "fa-paste": "far fa-clipboard",
  "fa-pause-circle-o": "far fa-pause-circle",
  "fa-paypal": "fab fa-paypal",
  "fa-pencil": "fas fa-pencil-alt",
  "fa-pencil-square": "fas fa-pen-square",
  "fa-pencil-square-o": "far fa-edit",
  "fa-photo": "far fa-image",
  "fa-picture-o": "far fa-image",
  "fa-pie-chart": "fas fa-chart-pie",
  "fa-pied-piper": "fab fa-pied-piper",
  "fa-pied-piper-alt": "fab fa-pied-piper-alt",
  "fa-pied-piper-pp": "fab fa-pied-piper-pp",
  "fa-pinterest": "fab fa-pinterest",
  "fa-pinterest-p": "fab fa-pinterest-p",
  "fa-pinterest-square": "fab fa-pinterest-square",
  "fa-play-circle-o": "far fa-play-circle",
  "fa-plus-square-o": "far fa-plus-square",
  "fa-product-hunt": "fab fa-product-hunt",
  "fa-qq": "fab fa-qq",
  "fa-question-circle-o": "far fa-question-circle",
  "fa-quora": "fab fa-quora",
  "fa-ra": "fab fa-rebel",
  "fa-ravelry": "fab fa-ravelry",
  "fa-rebel": "fab fa-rebel",
  "fa-reddit": "fab fa-reddit",
  "fa-reddit-alien": "fab fa-reddit-alien",
  "fa-reddit-square": "fab fa-reddit-square",
  "fa-refresh": "fas fa-sync",
  "fa-registered": "far fa-registered",
  "fa-remove": "fas fa-times",
  "fa-renren": "fab fa-renren",
  "fa-reorder": "fas fa-bars",
  "fa-repeat": "fas fa-redo",
  "fa-resistance": "fab fa-rebel",
  "fa-rmb": "fas fa-yen-sign",
  "fa-rotate-left": "fas fa-undo",
  "fa-rotate-right": "fas fa-redo",
  "fa-rouble": "fas fa-ruble-sign",
  "fa-rub": "fas fa-ruble-sign",
  "fa-ruble": "fas fa-ruble-sign",
  "fa-rupee": "fas fa-rupee-sign",
  "fa-s15": "fas fa-bath",
  "fa-safari": "fab fa-safari",
  "fa-scissors": "fas fa-cut",
  "fa-scribd": "fab fa-scribd",
  "fa-sellsy": "fab fa-sellsy",
  "fa-send": "fas fa-paper-plane",
  "fa-send-o": "far fa-paper-plane",
  "fa-share-square-o": "far fa-share-square",
  "fa-shekel": "fas fa-shekel-sign",
  "fa-sheqel": "fas fa-shekel-sign",
  "fa-shield": "fas fa-shield-alt",
  "fa-shirtsinbulk": "fab fa-shirtsinbulk",
  "fa-sign-in": "fas fa-sign-in-alt",
  "fa-sign-out": "fas fa-sign-out-alt",
  "fa-signing": "fas fa-sign-language",
  "fa-simplybuilt": "fab fa-simplybuilt",
  "fa-skyatlas": "fab fa-skyatlas",
  "fa-skype": "fab fa-skype",
  "fa-slack": "fab fa-slack",
  "fa-sliders": "fas fa-sliders-h",
  "fa-slideshare": "fab fa-slideshare",
  "fa-smile-o": "far fa-smile",
  "fa-snapchat": "fab fa-snapchat",
  "fa-snapchat-ghost": "fab fa-snapchat-ghost",
  "fa-snapchat-square": "fab fa-snapchat-square",
  "fa-snowflake-o": "far fa-snowflake",
  "fa-soccer-ball-o": "far fa-futbol",
  "fa-sort-alpha-asc": "fas fa-sort-alpha-down",
  "fa-sort-alpha-desc": "fas fa-sort-alpha-up",
  "fa-sort-amount-asc": "fas fa-sort-amount-down",
  "fa-sort-amount-desc": "fas fa-sort-amount-up",
  "fa-sort-asc": "fas fa-sort-up",
  "fa-sort-desc": "fas fa-sort-down",
  "fa-sort-numeric-asc": "fas fa-sort-numeric-down",
  "fa-sort-numeric-desc": "fas fa-sort-numeric-up",
  "fa-soundcloud": "fab fa-soundcloud",
  "fa-spoon": "fas fa-utensil-spoon",
  "fa-spotify": "fab fa-spotify",
  "fa-square-o": "far fa-square",
  "fa-stack-exchange": "fab fa-stack-exchange",
  "fa-stack-overflow": "fab fa-stack-overflow",
  "fa-star-half-empty": "far fa-star-half",
  "fa-star-half-full": "far fa-star-half",
  "fa-star-half-o": "far fa-star-half",
  "fa-star-o": "far fa-star",
  "fa-steam": "fab fa-steam",
  "fa-steam-square": "fab fa-steam-square",
  "fa-sticky-note-o": "far fa-sticky-note",
  "fa-stop-circle-o": "far fa-stop-circle",
  "fa-stumbleupon": "fab fa-stumbleupon",
  "fa-stumbleupon-circle": "fab fa-stumbleupon-circle",
  "fa-sun-o": "far fa-sun",
  "fa-superpowers": "fab fa-superpowers",
  "fa-support": "far fa-life-ring",
  "fa-tablet": "fas fa-tablet-alt",
  "fa-tachometer": "fas fa-tachometer-alt",
  "fa-telegram": "fab fa-telegram",
  "fa-television": "fas fa-tv",
  "fa-tencent-weibo": "fab fa-tencent-weibo",
  "fa-themeisle": "fab fa-themeisle",
  "fa-thermometer": "fas fa-thermometer-full",
  "fa-thermometer-0": "fas fa-thermometer-empty",
  "fa-thermometer-1": "fas fa-thermometer-quarter",
  "fa-thermometer-2": "fas fa-thermometer-half",
  "fa-thermometer-3": "fas fa-thermometer-three-quarters",
  "fa-thermometer-4": "fas fa-thermometer-full",
  "fa-thumb-tack": "fas fa-thumbtack",
  "fa-thumbs-o-down": "far fa-thumbs-down",
  "fa-thumbs-o-up": "far fa-thumbs-up",
  "fa-ticket": "fas fa-ticket-alt",
  "fa-times-circle-o": "far fa-times-circle",
  "fa-times-rectangle": "fas fa-window-close",
  "fa-times-rectangle-o": "far fa-window-close",
  "fa-toggle-down": "far fa-caret-square-down",
  "fa-toggle-left": "far fa-caret-square-left",
  "fa-toggle-right": "far fa-caret-square-right",
  "fa-toggle-up": "far fa-caret-square-up",
  "fa-trash": "fas fa-trash-alt",
  "fa-trash-o": "far fa-trash-alt",
  "fa-trello": "fab fa-trello",
  "fa-tripadvisor": "fab fa-tripadvisor",
  "fa-try": "fas fa-lira-sign",
  "fa-tumblr": "fab fa-tumblr",
  "fa-tumblr-square": "fab fa-tumblr-square",
  "fa-turkish-lira": "fas fa-lira-sign",
  "fa-twitch": "fab fa-twitch",
  "fa-twitter": "fab fa-twitter",
  "fa-twitter-square": "fab fa-twitter-square",
  "fa-unsorted": "fas fa-sort",
  "fa-usb": "fab fa-usb",
  "fa-usd": "fas fa-dollar-sign",
  "fa-user-circle-o": "far fa-user-circle",
  "fa-user-o": "far fa-user",
  "fa-vcard": "fas fa-address-card",
  "fa-vcard-o": "far fa-address-card",
  "fa-viacoin": "fab fa-viacoin",
  "fa-viadeo": "fab fa-viadeo",
  "fa-viadeo-square": "fab fa-viadeo-square",
  "fa-video-camera": "fas fa-video",
  "fa-vimeo": "fab fa-vimeo-v",
  "fa-vimeo-square": "fab fa-vimeo-square",
  "fa-vine": "fab fa-vine",
  "fa-vk": "fab fa-vk",
  "fa-volume-control-phone": "fas fa-phone-volume",
  "fa-warning": "fas fa-exclamation-triangle",
  "fa-wechat": "fab fa-weixin",
  "fa-weibo": "fab fa-weibo",
  "fa-weixin": "fab fa-weixin",
  "fa-whatsapp": "fab fa-whatsapp",
  "fa-wheelchair-alt": "fab fa-accessible-icon",
  "fa-wikipedia-w": "fab fa-wikipedia-w",
  "fa-window-close-o": "far fa-window-close",
  "fa-window-maximize": "far fa-window-maximize",
  "fa-window-restore": "far fa-window-restore",
  "fa-windows": "fab fa-windows",
  "fa-won": "fas fa-won-sign",
  "fa-wordpress": "fab fa-wordpress",
  "fa-wpbeginner": "fab fa-wpbeginner",
  "fa-wpexplorer": "fab fa-wpexplorer",
  "fa-wpforms": "fab fa-wpforms",
  "fa-xing": "fab fa-xing",
  "fa-xing-square": "fab fa-xing-square",
  "fa-y-combinator": "fab fa-y-combinator",
  "fa-y-combinator-square": "fab fa-hacker-news",
  "fa-yahoo": "fab fa-yahoo",
  "fa-yc": "fab fa-y-combinator",
  "fa-yc-square": "fab fa-hacker-news",
  "fa-yelp": "fab fa-yelp",
  "fa-yen": "fas fa-yen-sign",
  "fa-yoast": "fab fa-yoast",
  "fa-youtube": "fab fa-youtube",
  "fa-youtube-play": "fab fa-youtube",
  "fa-youtube-square": "fab fa-youtube-square"
};
/*
 * Support for FontAwesome v4 icons
 * Old icon names will we replaces as new v5 names
 */

var FontAwesomeMigrator = function FontAwesomeMigrator(icon) {
  if (icon in icons) return icons[icon];
  return icon;
};

/* harmony default export */ __webpack_exports__["default"] = (FontAwesomeMigrator);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/GroupsHelper.js":
/*!*************************************************************!*\
  !*** ./src/Resources/js/components/Helpers/GroupsHelper.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Groups = function Groups(Model) {
  /*
   * Hide tab
   */
  Model.prototype.showGroup = function (key) {
    if (this.hidden_groups.indexOf(key) === -1) return;
    this.hidden_groups.splice(this.hidden_groups.indexOf(key), 1);
  };
  /*
   * Show tab
   */


  Model.prototype.hideGroup = function (key) {
    if (this.hidden_groups.indexOf(key) === -1) {
      this.hidden_groups.push(key);
    }
  };
  /*
   * Set visibility tab
   */


  Model.prototype.setGroupVisibility = function (key, visible) {
    if (visible === true) this.showGroup(key);else this.hideGroup(key);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Groups);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/ModelHelper.js":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Helpers/ModelHelper.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TabsHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabsHelper.js */ "./src/Resources/js/components/Helpers/TabsHelper.js");
/* harmony import */ var _GroupsHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupsHelper.js */ "./src/Resources/js/components/Helpers/GroupsHelper.js");
/* harmony import */ var _FieldsHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FieldsHelper */ "./src/Resources/js/components/Helpers/FieldsHelper.js");
/* harmony import */ var _ModelProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ModelProperties */ "./src/Resources/js/components/Helpers/ModelProperties.js");





var Model = function Model() {};

var extensions = [_TabsHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"], _GroupsHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"], _FieldsHelper__WEBPACK_IMPORTED_MODULE_2__["default"], _ModelProperties__WEBPACK_IMPORTED_MODULE_3__["default"]];
/*
 * Bind given model properties
 */

var ModelHelper = function ModelHelper(data) {
  var core = new Model(); //Copy all given model attributes

  for (var key in data) {
    core[key] = data[key];
  } //Install all extensions


  for (var key in extensions) {
    extensions[key](Model);
  }

  return core;
};

/* harmony default export */ __webpack_exports__["default"] = (ModelHelper);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/ModelProperties.js":
/*!****************************************************************!*\
  !*** ./src/Resources/js/components/Helpers/ModelProperties.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ModelProperties = function ModelProperties(Model) {
  Model.prototype.isInParent = function () {
    return this.inParent === true;
  };

  Model.prototype.isSingle = function () {
    return this.minimum == 1 && this.maximum == 1 || this.single === true;
  };

  Model.prototype.formPrefix = function () {
    if (this.isInParent()) {
      return '$' + this.table + '_';
    }

    return '';
  };

  Model.prototype.hasAccess = function (key) {
    if (this.permissions[key] === true) {
      return true;
    }

    return false;
  };

  Model.prototype.getModelProperty = function (key, value) {
    var path = key.split('.'),
        obj = this;

    if (!this._settings) {
      this._settings = {};
    } //Return from cache


    if (key in this._settings) {
      obj = this._settings[key];
    } //Find data in object
    else {
        for (var i = 0; i < path.length; i++) {
          if (!(path[i] in obj)) {
            obj = undefined;
            break;
          }

          obj = obj[path[i]];
        }
      } //Save into cache


    this._settings[key] = obj;

    if (obj === undefined) {
      return !_.isNil(value) ? value : null;
    }

    return obj;
  };

  Model.prototype.getSettings = function (key, value) {
    return this.getModelProperty('settings.' + key, value);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (ModelProperties);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/RequestHelper.js":
/*!**************************************************************!*\
  !*** ./src/Resources/js/components/Helpers/RequestHelper.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Request = function Request() {};

Request.prototype.get = function (type, params) {
  var url = this[type];
  if (!params) return url;

  for (var key in params) {
    url = url.replace(':' + key, params[key] == undefined ? '' : params[key]);
  }

  return url;
};
/*
 * Bind given model properties
 */


var RequestHelper = function RequestHelper(request) {
  var core = new Request(); //Copy all given model attributes

  for (var key in request) {
    core[key] = request[key];
  }

  return core;
};

/* harmony default export */ __webpack_exports__["default"] = (RequestHelper);

/***/ }),

/***/ "./src/Resources/js/components/Helpers/TabsHelper.js":
/*!***********************************************************!*\
  !*** ./src/Resources/js/components/Helpers/TabsHelper.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Tabs = function Tabs(Model) {
  /*
   * Hide tab
   */
  Model.prototype.showTab = function (key) {
    if (this.hidden_tabs.indexOf(key) === -1) return;

    var hidden_tabs = _.cloneDeep(this.hidden_tabs);

    hidden_tabs.splice(this.hidden_tabs.indexOf(key), 1);
    this.hidden_tabs = hidden_tabs;
  };
  /*
   * Show tab
   */


  Model.prototype.hideTab = function (key) {
    if (this.hidden_tabs.indexOf(key) === -1) this.hidden_tabs = _.cloneDeep(this.hidden_tabs).concat(key);
  };
  /*
   * Set visibility tab
   */


  Model.prototype.setTabVisibility = function (key, visible) {
    if (visible === true) this.showTab(key);else this.hideTab(key);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Tabs);

/***/ }),

/***/ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue":
/*!*********************************************************************!*\
  !*** ./src/Resources/js/components/Partials/CheckAssetsVersion.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckAssetsVersion_vue_vue_type_template_id_4682e184___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckAssetsVersion.vue?vue&type=template&id=4682e184& */ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=template&id=4682e184&");
/* harmony import */ var _CheckAssetsVersion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckAssetsVersion.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CheckAssetsVersion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckAssetsVersion_vue_vue_type_template_id_4682e184___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckAssetsVersion_vue_vue_type_template_id_4682e184___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/CheckAssetsVersion.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckAssetsVersion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CheckAssetsVersion.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckAssetsVersion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=template&id=4682e184&":
/*!****************************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=template&id=4682e184& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckAssetsVersion_vue_vue_type_template_id_4682e184___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CheckAssetsVersion.vue?vue&type=template&id=4682e184& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/CheckAssetsVersion.vue?vue&type=template&id=4682e184&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckAssetsVersion_vue_vue_type_template_id_4682e184___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckAssetsVersion_vue_vue_type_template_id_4682e184___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/File.vue":
/*!*******************************************************!*\
  !*** ./src/Resources/js/components/Partials/File.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _File_vue_vue_type_template_id_15993213___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./File.vue?vue&type=template&id=15993213& */ "./src/Resources/js/components/Partials/File.vue?vue&type=template&id=15993213&");
/* harmony import */ var _File_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./File.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/File.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _File_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _File_vue_vue_type_template_id_15993213___WEBPACK_IMPORTED_MODULE_0__["render"],
  _File_vue_vue_type_template_id_15993213___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/File.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/File.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/File.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_File_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./File.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/File.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_File_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/File.vue?vue&type=template&id=15993213&":
/*!**************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/File.vue?vue&type=template&id=15993213& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_File_vue_vue_type_template_id_15993213___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./File.vue?vue&type=template&id=15993213& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/File.vue?vue&type=template&id=15993213&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_File_vue_vue_type_template_id_15993213___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_File_vue_vue_type_template_id_15993213___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/GettextExtension.vue":
/*!*******************************************************************!*\
  !*** ./src/Resources/js/components/Partials/GettextExtension.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GettextExtension_vue_vue_type_template_id_13cdfc13___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GettextExtension.vue?vue&type=template&id=13cdfc13& */ "./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=template&id=13cdfc13&");
/* harmony import */ var _GettextExtension_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GettextExtension.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GettextExtension_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GettextExtension_vue_vue_type_template_id_13cdfc13___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GettextExtension_vue_vue_type_template_id_13cdfc13___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/GettextExtension.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GettextExtension_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GettextExtension.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GettextExtension_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=template&id=13cdfc13&":
/*!**************************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=template&id=13cdfc13& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GettextExtension_vue_vue_type_template_id_13cdfc13___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GettextExtension.vue?vue&type=template&id=13cdfc13& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/GettextExtension.vue?vue&type=template&id=13cdfc13&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GettextExtension_vue_vue_type_template_id_13cdfc13___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GettextExtension_vue_vue_type_template_id_13cdfc13___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/History.vue":
/*!**********************************************************!*\
  !*** ./src/Resources/js/components/Partials/History.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _History_vue_vue_type_template_id_242710cd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./History.vue?vue&type=template&id=242710cd& */ "./src/Resources/js/components/Partials/History.vue?vue&type=template&id=242710cd&");
/* harmony import */ var _History_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./History.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/History.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _History_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _History_vue_vue_type_template_id_242710cd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _History_vue_vue_type_template_id_242710cd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/History.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/History.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/History.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_History_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./History.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/History.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_History_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/History.vue?vue&type=template&id=242710cd&":
/*!*****************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/History.vue?vue&type=template&id=242710cd& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_History_vue_vue_type_template_id_242710cd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./History.vue?vue&type=template&id=242710cd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/History.vue?vue&type=template&id=242710cd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_History_vue_vue_type_template_id_242710cd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_History_vue_vue_type_template_id_242710cd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/License.vue":
/*!**********************************************************!*\
  !*** ./src/Resources/js/components/Partials/License.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _License_vue_vue_type_template_id_2e13dc0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./License.vue?vue&type=template&id=2e13dc0c& */ "./src/Resources/js/components/Partials/License.vue?vue&type=template&id=2e13dc0c&");
/* harmony import */ var _License_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./License.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/License.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _License_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _License_vue_vue_type_template_id_2e13dc0c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _License_vue_vue_type_template_id_2e13dc0c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/License.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/License.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/License.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_License_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./License.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/License.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_License_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/License.vue?vue&type=template&id=2e13dc0c&":
/*!*****************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/License.vue?vue&type=template&id=2e13dc0c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_License_vue_vue_type_template_id_2e13dc0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./License.vue?vue&type=template&id=2e13dc0c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/License.vue?vue&type=template&id=2e13dc0c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_License_vue_vue_type_template_id_2e13dc0c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_License_vue_vue_type_template_id_2e13dc0c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/Modal.vue":
/*!********************************************************!*\
  !*** ./src/Resources/js/components/Partials/Modal.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_vue_vue_type_template_id_6ff6e6a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.vue?vue&type=template&id=6ff6e6a6& */ "./src/Resources/js/components/Partials/Modal.vue?vue&type=template&id=6ff6e6a6&");
/* harmony import */ var _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/Modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Modal_vue_vue_type_template_id_6ff6e6a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Modal_vue_vue_type_template_id_6ff6e6a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/Modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/Modal.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Modal.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/Modal.vue?vue&type=template&id=6ff6e6a6&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Modal.vue?vue&type=template&id=6ff6e6a6& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_6ff6e6a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=template&id=6ff6e6a6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Modal.vue?vue&type=template&id=6ff6e6a6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_6ff6e6a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_6ff6e6a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/Pagination.vue":
/*!*************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Pagination.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.vue?vue&type=template&id=4733f9f1& */ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&");
/* harmony import */ var _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/Pagination.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Pagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Pagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&":
/*!********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Pagination.vue?vue&type=template&id=4733f9f1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Pagination.vue?vue&type=template&id=4733f9f1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_4733f9f1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/Refreshing.vue":
/*!*************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Refreshing.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Refreshing_vue_vue_type_template_id_222cf204___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Refreshing.vue?vue&type=template&id=222cf204& */ "./src/Resources/js/components/Partials/Refreshing.vue?vue&type=template&id=222cf204&");
/* harmony import */ var _Refreshing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Refreshing.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/Refreshing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Refreshing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Refreshing_vue_vue_type_template_id_222cf204___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Refreshing_vue_vue_type_template_id_222cf204___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/Refreshing.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/Refreshing.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Refreshing.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Refreshing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Refreshing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Refreshing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Refreshing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/Refreshing.vue?vue&type=template&id=222cf204&":
/*!********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/Refreshing.vue?vue&type=template&id=222cf204& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Refreshing_vue_vue_type_template_id_222cf204___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Refreshing.vue?vue&type=template&id=222cf204& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/Refreshing.vue?vue&type=template&id=222cf204&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Refreshing_vue_vue_type_template_id_222cf204___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Refreshing_vue_vue_type_template_id_222cf204___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Partials/RightNavbar.vue":
/*!**************************************************************!*\
  !*** ./src/Resources/js/components/Partials/RightNavbar.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RightNavbar_vue_vue_type_template_id_39401d05___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RightNavbar.vue?vue&type=template&id=39401d05& */ "./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=template&id=39401d05&");
/* harmony import */ var _RightNavbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RightNavbar.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RightNavbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RightNavbar_vue_vue_type_template_id_39401d05___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RightNavbar_vue_vue_type_template_id_39401d05___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Partials/RightNavbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightNavbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RightNavbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RightNavbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=template&id=39401d05&":
/*!*********************************************************************************************!*\
  !*** ./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=template&id=39401d05& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RightNavbar_vue_vue_type_template_id_39401d05___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RightNavbar.vue?vue&type=template&id=39401d05& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Partials/RightNavbar.vue?vue&type=template&id=39401d05&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RightNavbar_vue_vue_type_template_id_39401d05___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RightNavbar_vue_vue_type_template_id_39401d05___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue":
/*!***************************************************************!*\
  !*** ./src/Resources/js/components/Rows/ModelRowsBuilder.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& */ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&");
/* harmony import */ var _ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModelRowsBuilder.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Rows/ModelRowsBuilder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModelRowsBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&":
/*!**********************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/ModelRowsBuilder.vue?vue&type=template&id=b3b93e6e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelRowsBuilder_vue_vue_type_template_id_b3b93e6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRowValue.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRowValue.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRowValue.vue?vue&type=template&id=0e5a52b6& */ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&");
/* harmony import */ var _TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableRowValue.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Rows/TableRowValue.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TableRowValue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TableRowValue.vue?vue&type=template&id=0e5a52b6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRowValue.vue?vue&type=template&id=0e5a52b6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRowValue_vue_vue_type_template_id_0e5a52b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRows.vue":
/*!********************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRows.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableRows.vue?vue&type=template&id=9a385a72& */ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&");
/* harmony import */ var _TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableRows.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Rows/TableRows.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TableRows.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRows.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&":
/*!***************************************************************************************!*\
  !*** ./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TableRows.vue?vue&type=template&id=9a385a72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Rows/TableRows.vue?vue&type=template&id=9a385a72&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableRows_vue_vue_type_template_id_9a385a72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Sidebar/Sidebar.vue":
/*!*********************************************************!*\
  !*** ./src/Resources/js/components/Sidebar/Sidebar.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_6960b2a3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=6960b2a3& */ "./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=template&id=6960b2a3&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_6960b2a3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_6960b2a3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Sidebar/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=template&id=6960b2a3&":
/*!****************************************************************************************!*\
  !*** ./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=template&id=6960b2a3& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_6960b2a3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=6960b2a3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/Sidebar.vue?vue&type=template&id=6960b2a3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_6960b2a3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_6960b2a3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Sidebar/SidebarRow.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Sidebar/SidebarRow.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidebarRow_vue_vue_type_template_id_50478767___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarRow.vue?vue&type=template&id=50478767& */ "./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=template&id=50478767&");
/* harmony import */ var _SidebarRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarRow.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SidebarRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SidebarRow_vue_vue_type_template_id_50478767___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SidebarRow_vue_vue_type_template_id_50478767___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Sidebar/SidebarRow.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SidebarRow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarRow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=template&id=50478767&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=template&id=50478767& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarRow_vue_vue_type_template_id_50478767___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SidebarRow.vue?vue&type=template&id=50478767& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Sidebar/SidebarRow.vue?vue&type=template&id=50478767&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarRow_vue_vue_type_template_id_50478767___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarRow_vue_vue_type_template_id_50478767___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Views/BasePageView.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Views/BasePageView.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasePageView_vue_vue_type_template_id_659cf588___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasePageView.vue?vue&type=template&id=659cf588& */ "./src/Resources/js/components/Views/BasePageView.vue?vue&type=template&id=659cf588&");
/* harmony import */ var _BasePageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasePageView.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Views/BasePageView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasePageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasePageView_vue_vue_type_template_id_659cf588___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BasePageView_vue_vue_type_template_id_659cf588___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Views/BasePageView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Views/BasePageView.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Views/BasePageView.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BasePageView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/BasePageView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Views/BasePageView.vue?vue&type=template&id=659cf588&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Views/BasePageView.vue?vue&type=template&id=659cf588& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePageView_vue_vue_type_template_id_659cf588___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BasePageView.vue?vue&type=template&id=659cf588& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/BasePageView.vue?vue&type=template&id=659cf588&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePageView_vue_vue_type_template_id_659cf588___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePageView_vue_vue_type_template_id_659cf588___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Views/DashBoardView.vue":
/*!*************************************************************!*\
  !*** ./src/Resources/js/components/Views/DashBoardView.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashBoardView_vue_vue_type_template_id_ecb6305c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashBoardView.vue?vue&type=template&id=ecb6305c& */ "./src/Resources/js/components/Views/DashBoardView.vue?vue&type=template&id=ecb6305c&");
/* harmony import */ var _DashBoardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashBoardView.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Views/DashBoardView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DashBoardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashBoardView_vue_vue_type_template_id_ecb6305c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DashBoardView_vue_vue_type_template_id_ecb6305c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Views/DashBoardView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Views/DashBoardView.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./src/Resources/js/components/Views/DashBoardView.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashBoardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DashBoardView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/DashBoardView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashBoardView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Views/DashBoardView.vue?vue&type=template&id=ecb6305c&":
/*!********************************************************************************************!*\
  !*** ./src/Resources/js/components/Views/DashBoardView.vue?vue&type=template&id=ecb6305c& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashBoardView_vue_vue_type_template_id_ecb6305c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DashBoardView.vue?vue&type=template&id=ecb6305c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/DashBoardView.vue?vue&type=template&id=ecb6305c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashBoardView_vue_vue_type_template_id_ecb6305c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashBoardView_vue_vue_type_template_id_ecb6305c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/components/Views/ModelBuilder.vue":
/*!************************************************************!*\
  !*** ./src/Resources/js/components/Views/ModelBuilder.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModelBuilder_vue_vue_type_template_id_e444b1ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModelBuilder.vue?vue&type=template&id=e444b1ae& */ "./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=template&id=e444b1ae&");
/* harmony import */ var _ModelBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModelBuilder.vue?vue&type=script&lang=js& */ "./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModelBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModelBuilder_vue_vue_type_template_id_e444b1ae___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModelBuilder_vue_vue_type_template_id_e444b1ae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Resources/js/components/Views/ModelBuilder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModelBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=template&id=e444b1ae&":
/*!*******************************************************************************************!*\
  !*** ./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=template&id=e444b1ae& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelBuilder_vue_vue_type_template_id_e444b1ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ModelBuilder.vue?vue&type=template&id=e444b1ae& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Resources/js/components/Views/ModelBuilder.vue?vue&type=template&id=e444b1ae&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelBuilder_vue_vue_type_template_id_e444b1ae___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModelBuilder_vue_vue_type_template_id_e444b1ae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/Resources/js/config.js":
/*!************************************!*\
  !*** ./src/Resources/js/config.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  /*
   * Prefix of groups
   */
  groups_prefix: '#$_'
});

/***/ }),

/***/ "./src/Resources/js/main.js":
/*!**********************************!*\
  !*** ./src/Resources/js/main.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Measure performance of functions where this methods are placed.
 * This functions will measure total time of given function execution and count their initialization
 *
 * Usage:
 * var $a = window.startTest();
 *
 * window.endTest($a);
 */
(function () {
  var performanceTimes = {},
      performanceCount = {},
      performanceTimeouts = {};

  window.startTest = function (key) {
    var callerName;

    try {
      throw new Error();
    } catch (e) {
      callerName = e.stack.split("\n")[2].trim().split(' ')[1];
    }

    if (!(callerName in performanceTimes)) {
      performanceTimes[callerName] = 0;
      performanceCount[callerName] = 0;
    }

    performanceCount[callerName]++;
    return {
      name: callerName,
      t: new Date().getTime()
    };
  };

  window.endTest = function (data) {
    performanceTimes[data.name] += new Date().getTime() - data.t;

    if (performanceTimeouts[data.name]) {
      clearTimeout(performanceTimeouts[data.name]);
    }

    performanceTimeouts[data.name] = setTimeout(function () {
      console.log(performanceCount[data.name] + 'x ' + data.name + ' ' + performanceTimes[data.name] / 1000000 + 's');
      performanceCount[data.name] = 0;
      performanceTimes[data.name] = 0;
    }, 100);
  };
})();

/***/ }),

/***/ "./src/Resources/js/mixins/globalVueMixins.js":
/*!****************************************************!*\
  !*** ./src/Resources/js/mixins/globalVueMixins.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var globalVueMixins = {
  methods: {}
};
/* harmony default export */ __webpack_exports__["default"] = (globalVueMixins);

/***/ }),

/***/ "./src/Resources/js/router.js":
/*!************************************!*\
  !*** ./src/Resources/js/router.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _components_Views_DashBoardView_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Views/DashBoardView.vue */ "./src/Resources/js/components/Views/DashBoardView.vue");
/* harmony import */ var _components_Views_BasePageView_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Views/BasePageView.vue */ "./src/Resources/js/components/Views/BasePageView.vue");
//Router
 //Layouts



var Router = new vue_router__WEBPACK_IMPORTED_MODULE_0__["default"]({
  routes: [{
    path: '*',
    name: 'dashboard',
    component: _components_Views_DashBoardView_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    path: '/page/:model',
    name: 'admin-model',
    component: _components_Views_BasePageView_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  }]
});
/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./src/Resources/sass/app.scss":
/*!*************************************!*\
  !*** ./src/Resources/sass/app.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*********************************************************************!*\
  !*** multi ./src/Resources/js/app.js ./src/Resources/sass/app.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/js/app.js */"./src/Resources/js/app.js");
module.exports = __webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/sass/app.scss */"./src/Resources/sass/app.scss");


/***/ }),

/***/ 1:
/*!*********************!*\
  !*** got (ignored) ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);