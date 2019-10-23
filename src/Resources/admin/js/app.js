(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/src/Resources/admin/js/app"],{

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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'depth_level'],
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
      var _this4 = this;

      var _this = this;

      this.getInput().datetimepicker({
        lang: this.$root.locale,
        format: this.field.date_format,
        timepicker: this.field.type != 'date',
        datepicker: this.field.type != 'time',
        scrollInput: false,
        timepickerScrollbar: false,
        step: this.field.date_step || 30,
        scrollMonth: false,
        scrollYear: false,
        inline: this.isMultipleDatepicker,
        onGenerate: function onGenerate(ct) {
          _this.onGenerate(this, ct);
        },
        onChangeDateTime: this.onChangeDateTime,
        //Also update object of single date values
        onClose: function onClose(current_date_time) {
          var pickedDate = moment(current_date_time).format(_this4.$root.fromPHPFormatToMoment(_this4.field.date_format));

          _this4.changeValue(null, pickedDate);
        }
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
      if (!this.isMultipleDatepicker) return;
      var pickedDate = moment(current_date_time).format(this.field.type == 'time' ? 'HH:mm' : 'YYYY-MM-DD');
      var value = this.getMultiDates,
          index = value.indexOf(pickedDate);
      if (index > -1) value.splice(index, 1);else value.push(pickedDate);
      this.$parent.changeValue(null, value);
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
      console.log('field update', data);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled'],
  computed: {
    isDecimal: function isDecimal() {
      return this.field.type == 'decimal';
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'row', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'inputlang', 'langid', 'depth_level'],
  data: function data() {
    return {
      filterBy: null,
      allowRelation: false
    };
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
    getModalId: function getModalId() {
      return 'form-relation-modal-' + this.id;
    },
    getRelationModel: function getRelationModel() {
      if (!this.canAddRow) return;
      var relationTable = (this.field.belongsTo || this.field.belongsToMany).split(',')[0];
      return _.cloneDeep(this.$root.models[relationTable]);
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
      return this.field.canAdd === true && this.$parent.hasparentmodel !== false && (!this.getFilterBy || this.filterBy);
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
     * If field has filters, then check of other fields values for filtrating
     */
    bindFilters: function bindFilters() {
      //If is filterer key is not from parent model
      if (!this.getFilterBy || this.isParentFilterColumn) return;
      this.$watch('model.fields.' + this.getFilterBy[0] + '.value', function (value) {
        //If is empty value setted after reseting form, then set null or default field value
        if (value === null) this.filterBy = this.$parent.defaultFieldValue(this.model.fields[this.getFilterBy[0]]); //If is empty value type '', or value, then set given input
        else this.filterBy = value;
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
        if (is_change === true || !value || value === oldvalue || _.isEqual(value, oldvalue)) {
          is_change = false;
          return;
        } //Update selects when vuejs is fully rendered


        _this4.$nextTick(_this4.reloadSelectWithMultipleOrders);
      });
    },
    hasValue: function hasValue(key, value, multiple) {
      if (multiple == true && $.isArray(value)) {
        if (value.indexOf($.isNumeric(key) ? parseInt(key) : key) > -1) return true;
      } else if ((key || key == 0) && value && key == value) {
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
          this.$set(row, key, options[k][1][fillBy[1] || key]);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled'],
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'depth_level'],
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
        if (_.trim(editor.getData()) != _.trim(value)) {
          editor.setData(value);
        }
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-builder',
  props: ['model', 'row', 'rows', 'langid', 'canaddrow', 'progress', 'history', 'hasparentmodel', 'selectedlangid', 'gettext_editor', 'depth_level'],
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

    this.initForm(this.row);
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
    formID: function formID() {
      return 'form-' + this.depth_level + '-' + this.model.slug;
    },
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
      return this.$root.getModelProperty(this.model, 'settings.buttons.create') || this.trans('send');
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
      if (this.isOpenedRow && this.$root.getModelProperty(this.model, 'settings.editable') == false) return false; //Model cannot be updated, when is inParent relation

      if (this.model.isInParent()) return false;
      return this.cansave;
    },
    canShowGettext: function canShowGettext() {
      if (this.model.slug == 'languages' && this.$root.gettext) return true;
      return false;
    },
    getAdditionalFormData: function getAdditionalFormData() {
      //Data for request
      var data = {
        _model: this.model.slug
      }; //Check if form belongs to other form

      if (this.model.foreign_column != null && this.$parent.parentrow) data[this.model.foreign_column[this.$parent.getParentTableName()]] = this.$parent.parentrow.id; //If is updating, then add row ID

      if (this.getFormAction == 'update') {
        data['_id'] = this.row.id;
        data['_method'] = 'put';
      } else {
        //Check if is enabled language
        if (this.langid) data['language_id'] = this.langid; //Push saved childs without actual parent row

        if (this.hasParentModel() && this.$parent.rows.save_children.length > 0) data['_save_children'] = JSON.stringify(this.$parent.rows.save_children);
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
      this.form.find('.fa.fa-times-circle-o').firstLevelForm(this.form[0]).remove();
      this.form.find('.multi-languages .has-error').firstLevelForm(this.form[0]).removeClass('has-error');
      this.removeActiveTab(this.form.find('.nav-tabs li[has-error]').firstLevelForm(this.form[0]));
      this.$parent.progress = false;
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
        } else if ($(this).is('input:radio') || $(this).parent().hasClass('label-wrapper')) {
          where = where.parent().parent().parent();
          if (where.find('.help-block').length == 0) where = where.children().last().prev();else where = null;
        } else if ($(this).parent().hasClass('input-group')) where = $(this).parent();

        if (where) where.after('<span class="help-block">' + message + '</span>'); //On first error

        if (i == 0) {
          var label = $(this).closest('div.form-group').addClass('has-error').find('> label');
          if (label.find('.fa-times-circle-o').length == 0) label.prepend('<i class="fa fa-times-circle-o"></i> ');
        }
      };
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

      //Devide if is updating or creating form
      var action = this.getFormAction;
      this.sendForm(e, action, function (response) {
        if (!response.data) return false; //Push new row

        if (action == 'store') {
          for (var key in response.data) {
            var clonedRow = _.cloneDeep(response.data[key].rows[0]),
                isParentRow = response.data[key].model == _this6.model.table,
                model = _this6.$root.models[response.data[key].model]; //Reset actual items buffer


            if (isParentRow && _this6.hasParentModel()) _this6.saveParentChilds(response.data[key].rows);

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
      removeFrom.removeAttr('data-toggle').removeAttr('data-original-title').removeAttr('has-error').tooltip("destroy").find('a > .fa.fa-exclamation-triangle').remove();
    },
    colorizeTab: function colorizeTab(input) {
      var _this = this;

      input.parents('.tab-pane').each(function () {
        var getActiveTab = function getActiveTab(panel) {
          var li = panel.parent().prev().find('li'),
              id = panel.attr('id'),
              tab = id ? li.parent().find('> li > a[href="#' + id + '"]') : null; //Return tab by id, if those tabs are custom

          if (tab) return tab.parent();
          return li.eq(panel.index());
        }; //On button click, remove tabs alerts in actual tree, if tab has no more recursive errors


        $(this).one('click', function () {
          if ($(this).find('.nav-tabs-custom:not(.default) li[has-error]').length == 0) _this.removeActiveTab(getActiveTab($(this)), true);
        });
        getActiveTab($(this)).each(function () {
          if ($(this).hasClass('has-error')) return;
          $(this).attr('data-toggle', 'tooltip').attr('data-original-title', _this.trans('tab-error')).attr('has-error', '').one('click', function () {
            var active = $(this).parents('.nav-tabs-custom').find('> .nav-tabs > li.active[has-error]').not($(this).parent().find('> li'));

            _this.removeActiveTab($([this].concat(active.toArray())), true);
          }).find('a').prepend('<i class="fa fa-exclamation-triangle"></i>');
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
        $('html, body').animate({
          scrollTop: $('#' + _this7.formID).offset().top - 10
        }, 500);
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
      this.gettext_editor = this.row;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      var _this2 = this;

      var fields = this.group.fields.filter(function (item) {
        var field = _this2.model.fields[item];
        return typeof item !== 'string' || !(field.invisible && field.invisible == true || field.removeFromForm && field.removeFromForm == true || !_this2.canShowField(field));
      });
      return fields;
    },
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    }
  },
  methods: {
    canRenderField: function canRenderField(field) {
      return !('removeFromForm' in field && field.removeFromForm == true) && !('invisible' in field && field.invisible == true);
    },
    canShowField: function canShowField(field) {
      if ('hideFromForm' in field && field.hideFromForm === true) return false;
      if ((field.ifExists === true || field.hideOnCreate === true) && !this.isOpenedRow) return false;
      if ((field.ifDoesntExists === true || field.hideOnUpdate === true) && this.isOpenedRow) return false;
      return true;
    },
    //Return group class
    getGroupClass: function getGroupClass(group) {
      var width = (group.width + '').split('-');
      if (width[0] == 'half') width[0] = 6;else if (width[0] == 'full') width[0] = 12;else if (width[0] == 'third') width[0] = 4;
      if (width.length == 2 && width[1] == 'inline') return 'col-md-' + width[0] + ' inline-col';
      if ($.isNumeric(width[0])) return 'col-md-' + width[0];
      return 'col-md-12';
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
    this.registerComponents();
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
      if (!this.hasLocale) return value || null;
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
    registerComponents: function registerComponents() {
      if (!('component' in this.field)) return;
      var components = this.field.component.split(','),
          component = null;

      for (var i = 0; i < components.length; i++) {
        var name = components[i].toLowerCase(),
            data = this.model.components[name],
            obj;

        try {
          obj = this.$root.getComponentObject(data);
        } catch (error) {
          console.error('Syntax error in component ' + component[i] + '.Vue' + "\n", error);
          continue;
        }

        if (!component) component = obj;else {
          if (!('components' in component)) component.components = {};
          component.components[components[i]] = obj;
        }
      }

      if (component) Vue.component(this.componentName, component);
    },
    defaultFieldValue: function defaultFieldValue(field) {
      var default_value = field.value || field.value === 0 || field.value === false ? field.value : field["default"];

      if (!default_value && default_value !== false || //false is valid value, so we do not want to return empty string
      ['number', 'string', 'boolean'].indexOf(_typeof(default_value)) === -1 && !this.isMultipleField(field)) {
        return '';
      } //If is current date value in datepicker


      if (field["default"] && this.isDatepickerField(field) && field["default"].toUpperCase() == 'CURRENT_TIMESTAMP') default_value = moment().format(this.$root.fromPHPFormatToMoment(field.date_format)); //Get value by other table

      if (field["default"]) {
        var default_parts = field["default"].split('.');

        if (default_parts.length == 2) {
          var model = this.getModelBuilder(default_parts[0]);
          if (model && default_parts[1] in model.row) return model.row[default_parts[1]];
        }
      }

      if (this.isCheckbox) return default_value == true ? true : false;
      return default_value || '';
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


      if (no_field != true) this.field.value = value;
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
    }
  },
  computed: {
    isOpenedRow: function isOpenedRow() {
      return this.row && 'id' in this.row;
    },
    getId: function getId() {
      //Get parent model builder
      var modelBuilder = this.getModelBuilder();
      parent = modelBuilder.getParentTableName(this.model.withoutParent == true);
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
      return this.field.disabled == true;
    },
    isMultiple: function isMultiple() {
      return this.isMultipleField(this.field);
    },
    hasComponent: function hasComponent() {
      return 'component' in this.field && this.field.component;
    },
    componentName: function componentName() {
      if (!this.hasComponent) return;
      return this.field.component.split(',')[0].toLowerCase();
    },
    getValueOrDefault: function getValueOrDefault() {
      //If is confirmation, then return null value every time
      if (this.isConfirmation) {
        return '';
      }

      var value = this.parseArrayValue(this.field.value);
      if (this.isMultipleDatepicker) return JSON.stringify(value || []); //Localization field

      if (this.hasLocale) return this.getLocalizedValue(value, this.defaultFieldValue(this.field)); //If row is not opened, then return default field value

      if (!this.isOpenedRow) {
        return this.defaultFieldValue(this.field);
      }

      return value;
    },
    isRequired: function isRequired() {
      if (this.isOpenedRow && this.field.type == 'password') return false; //Basic required attribute

      if ('required' in this.field && this.field.required == true) return true; //Required if attribute

      if (this.field.required_if) {
        var parts = this.field.required_if.split(','),
            value = this.row[parts[0]];
        if (value && parts.slice(1).indexOf(value) > -1) return true;
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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-tabs-builder',
  props: ['model', 'row', 'history', 'group', 'tabs', 'childs', 'langid', 'inputlang', 'cansave', 'hasparentmodel', 'depth_level'],
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
      this.activetab = 0;
      this.models_loaded = [];
    });
    eventHub.$on('rowsChanged', this.rowsChangedEvent = function (item) {
      if (_this.depth_level + 1 != item.depth_level) return;

      _this.$set(_this.models_data, item.table, item);
    });
  },
  destroyed: function destroyed() {
    eventHub.$off('rowsChanged', this.rowsChangedEvent);
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


      if (this.childs == true) for (var key in this.model.childs) {
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
      return tabs;
    },
    hasNoTabs: function hasNoTabs() {
      return this.getTabs.filter(function (item) {
        if (!this.isTab(item)) return false;
        if (item.model && !this.isModel(item)) return false;
        return true;
      }.bind(this)).length == 1 && this.getTabs[0]["default"] === true;
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
    canShowField: function canShowField(field) {
      return !('removeFromForm' in field);
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
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      version: this.$root.version,
      version_assets: this.$root.version_assets
    };
  },
  computed: {
    isDifferent: function isDifferent() {
      if (this.version == 'dev-master') return false;
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
      return this.$root.$http.options.root + '/../uploads/cache/' + this.model.slug + '/' + this.field + '/admin-thumbnails/' + this.file;
    },
    path: function path() {
      return this.$root.$http.options.root + '/../uploads/' + this.model.slug + '/' + this.field + '/' + this.file;
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
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'gettext-extension',
  props: ['gettext_editor'],
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
          if (start === null && (is_double && (i == 0 && condition === false || i > 0 && condition === true) || result === i)) start = a;

          if (start !== null && end === null && !is_double && result != i) {
            if (i > 0) end = a - 1;
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
      this.$http.get(this.$root.requests.translations.replace(':id', this.gettext_editor.id)).then(function (response) {
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
        id: this.gettext_editor.id
      });
      this.$http.post(url, {
        changes: JSON.stringify(this.changes)
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['history'],
  computed: {
    sortedHistory: function sortedHistory() {
      return _.orderBy(this.history.rows, 'id', 'desc');
    }
  },
  methods: {
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


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'row', 'rows', 'langid', 'progress', 'search', 'history', 'gettext_editor', 'iswithoutparent', 'activetab', 'depth_level'],
  components: {
    Refreshing: _Partials_Refreshing_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    TableRows: _TableRows_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    //Load pagination limit from localStorage
    var limit = this.iswithoutparent ? 500 : 'limit' in localStorage ? localStorage.limit : this.$root.getModelProperty(this.model, 'settings.pagination.limit', 10);
    return {
      table: null,
      //Sorting
      pagination: {
        position: 1,
        limit: parseInt(limit),
        limits: [5, 10, 20, 30, 50, 100, 200, 500],
        refreshing: false,
        maxpages: 15
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
    this.root = this.$root.$http.options.root; //Set default order rows

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
        if (_this.rows.data[key].id != row.id) continue;

        for (var k in row) {
          _this.$parent.rows.data[key][k] = row[k];
        }
      } //Reset history on update row


      _this.$parent.closeHistory();
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
      if (this.model.localization == true) this.setPosition(1);
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

      if (title = this.$root.getModelProperty(this.model, 'settings.title.rows')) {
        return title;
      }

      return this.trans('rows');
    },
    isPaginationEnabled: function isPaginationEnabled() {
      return this.$root.getModelProperty(this.model, 'settings.pagination.enabled') !== false && !this.iswithoutparent;
    },
    rowsData: function rowsData() {
      var _this2 = this;

      var field = this.orderBy[0],
          is_numeric = this.isNumericValue(field),
          is_date = this.isDateValue(field),
          is_decoded = this.$root.getModelProperty(this.model, 'settings.columns.' + field + '.encode', true) !== true; //If is date field, then receive correct date format of this field

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
        if (this.enabled_columns[key].enabled == true && this.default_columns.indexOf(key) == -1) allowed.push(key);
      }

      return allowed;
    }
  },
  methods: {
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
      //On first time allow reload rows without parent, for field options...
      if ((this.$parent.isWithoutParentRow || this.activetab === false) && indicator == false) {
        return false;
      }

      if (indicator !== false) this.pagination.refreshing = true; // Remove last auto timeout

      this.destroyTimeout();
      var search_query = {};
      var query = {
        model: this.model.slug,
        parent: this.$parent.getParentTableName(this.model.without_parent),
        subid: this.getParentRowId(),
        langid: this.model.localization === true ? this.langid : 0,
        limit: this.isPaginationEnabled ? this.pagination.limit : 0,
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

      this.$http.get(this.$root.requests.get('rows', query), {
        params: search_query
      }).then(function (response) {
        //If has been component destroyed, and request is delivered... and some conditions
        if (this.dragging === true || this.progress === true || !this.$root) {
          return;
        }

        if (typeof response.data == 'string') {
          customErrorAlert.call(this, response);
          return;
        } //Disable loader


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
          this.updateFieldOptions(response.data.fields, response.data); //Render additional layouts

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

        this.initTimeout(false, true); //On first error

        if (response.status == 500 && this.refresh.count == 0 && 'message' in response) {
          this.$root.errorResponseLayer(response, null);
        } //Show error alert at first request
        else if (this.refresh.count == 0 && this.hasShowedError !== true || response.status == 401) {
            this.hasShowedError = true;
            this.$root.errorResponseLayer(response, null);
          }
      });
    },
    destroyTimeout: function destroyTimeout() {
      if (this.updateTimeout) clearTimeout(this.updateTimeout);
    },
    initTimeout: function initTimeout(indicator, force) {
      this.destroyTimeout();
      var limit = this.isPaginationEnabled ? this.pagination.limit : 0; //Disable autorefreshing when is one row

      if ((this.rows.count > 0 && this.model.maximum === 1 || this.rows.count > 50 && parseInt(limit) > 50) && force !== true) return;
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
      if (this.$root.getModelProperty(this.model, 'settings.columns.' + key + '.type') == 'integer') return true;
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
        var orderBy = this.$root.getModelProperty(this.model, 'settings.orderBy');

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
    showLimit: function showLimit(i) {
      var max = parseInt(this.rows.count / this.pagination.limit);
      if (this.rows.count / this.pagination.limit === max) max--; //If is first or last page, then show it

      if (i == 0 || i == max) return true; //Middle range

      var radius = 3,
          interval = [[100, 0.3], [100, 0.7], [1000, 0.1], [1000, 0.85]],
          in_middle_active = 0;

      for (var a = 0; a < interval.length; a++) {
        if (max > interval[a][0]) {
          var level = parseInt(max * interval[a][1]);
          if (i >= level && i <= level + radius) return true;
          in_middle_active++;
        }
      }

      var maxpages = this.pagination.maxpages - in_middle_active * radius,
          maxpages = maxpages < 6 ? 6 : maxpages;
      var offset = this.pagination.position < maxpages / 2 ? maxpages / 2 - this.pagination.position : 0,
          offset = max - this.pagination.position < maxpages / 2 ? maxpages / 2 - (max - this.pagination.position) : offset;
      if (this.pagination.position - offset >= i + maxpages / 2 || this.pagination.position <= i - maxpages / 2 - offset) return false;
      return true;
    },
    setPosition: function setPosition(position, indicator) {
      this.pagination.position = position; //Load paginated rows...

      this.loadRows(indicator);
    },
    getRefreshInterval: function getRefreshInterval() {
      var interval = this.$root.getModelProperty(this.model, 'settings.refresh_interval', 10000); //Infinity interval

      if (interval == false) interval = 3600 * 1000;
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
  props: ['model', 'item', 'field', 'name', 'image'],
  components: {
    File: _Partials_File_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    getFiles: function getFiles() {
      var value = this.fieldValue;
      if (!value) return [];
      if ($.isArray(value)) return value;
      return [value];
    },
    fieldValue: function fieldValue() {
      var field = this.field in this.model.fields ? this.model.fields[this.field] : null,
          row = this.item,
          rowValue = this.field in row ? this.getMutatedValue(row[this.field], field) : ''; //Get select original value

      if (field) {
        var isRadio = field.type == 'radio';

        if (field.type == 'select' || isRadio) {
          if ('multiple' in field && field.multiple == true && $.isArray(rowValue) && !isRadio) {
            var values = [],
                rows = rowValue,
                related_table = this.getRelatedModelTable(field),
                options = !related_table ? field.options : this.getLanguageSelectOptions(field.options, this.getRelatedModelTable(field));

            for (var i = 0; i < rows.length; i++) {
              var searched = options.filter(function (item) {
                return item[0] == rows[i];
              }.bind(this));
              if (searched.length > 0) values.push(searched[0][1]);
            }

            return values.join(', ');
          } else {
            var related_table = this.getRelatedModelTable(field),
                options = isRadio || !related_table ? field.options : this.getLanguageSelectOptions(field.options, related_table); //Check if key exists in options

            if (!options) return rowValue;

            for (var i = 0; i < options.length; i++) {
              if (rowValue == options[i][0]) return options[i][1];
            }
          }
        } else if (field.type == 'checkbox') {
          return rowValue == 1 ? this.trans('yes') : this.trans('no');
        } //Multi date format values
        else if (field.type == 'date' && field.multiple === true) {
            rowValue = (rowValue || []).map(function (item) {
              var date = moment(item);
              return date._isValid ? date.format('DD.MM.YYYY') : item;
            }).join(', ');
          } //Multi time format values
          else if (field.type == 'time' && field.multiple === true) {
              rowValue = (rowValue || []).join(', ');
            }
      }

      var add_before = this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.add_before'),
          add_after = this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.add_after'); //If is object

      if (_typeof(rowValue) == 'object') return rowValue;
      return rowValue || rowValue == 0 ? (add_before || '') + rowValue + (add_after || '') : null;
    },
    onlyEncodedTitle: function onlyEncodedTitle() {
      //If is not encoded column, then return empty value
      if (this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.encode', true) === false) return '';
      return this.fieldValue;
    },
    fieldValueLimitedAndEncoded: function fieldValueLimitedAndEncoded() {
      return this.encodeValue(this.stringLimit(this.fieldValue));
    }
  },
  methods: {
    stringLimit: function stringLimit(string) {
      var limit = this.getFieldLimit(Object.keys(this.$parent.$parent.columns).length < 5 ? 40 : 20);
      if (limit != 0 && string.length > limit && this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.encode', true) !== false) return string.substr(0, limit) + '...';
      return string;
    },
    encodeValue: function encodeValue(string) {
      var isReal = this.isRealField(this.field); //Check if column can be encoded

      if (isReal && this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.encode', true) == true) {
        string = $(document.createElement('div')).text(string).html();
      }

      if (this.isRealField(this.field) && this.model.fields[this.field].type == 'text' && parseInt(this.model.fields[this.field].limit) === 0) {
        return string.replace(/\n/g, '<br>');
      } //Is phone number


      if (this.isRealField(this.field) && this.model.fields[this.field].type == 'string' && ('phone' in this.model.fields[this.field] || 'phone_link' in this.model.fields[this.field])) {
        return '<a href="tel:' + string + '">' + string + '</a>';
      }

      return string;
    },
    getRelatedModelTable: function getRelatedModelTable(field) {
      var table = field.belongsTo || field.belongsToMany;
      if (!table) return false;
      return table.split(',')[0];
    },
    getMutatedValue: function getMutatedValue(value, field) {
      if (field && 'locale' in field) {
        //Get default language
        var dslug = this.$root.languages[0].slug;

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

          if (_typeof(value) == 'object') value = '';
        }
      } //Return correct zero value


      if (value === 0) return 0;
      return value || '';
    },
    getLanguageSelectOptions: function getLanguageSelectOptions(array, model) {
      model = this.$root.models[model];
      var filter = model && model.localization ? {
        language_id: this.$root.language_id
      } : {};
      return this.$root.languageOptions(array, this.model.fields[this.field], filter, false);
    },
    isFile: function isFile(field) {
      if (!(field in this.model.fields)) return false;
      if (this.model.fields[field].type == 'file' && this.isEncodedValue(field)) return true;
      return false;
    },
    isRealField: function isRealField(key) {
      return key in this.model.fields;
    },
    getFieldLimit: function getFieldLimit(defaultLimit) {
      if (this.isEncodedValue(this.field) === false) return 0;

      if (this.isRealField(this.field)) {
        var field = this.model.fields[this.field],
            limit;

        if ('limit' in field) {
          limit = field.limit;
        } else {
          limit = this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.limit', defaultLimit);
        }

        return limit || limit === 0 ? limit : defaultLimit;
      } else {
        return this.$root.getModelProperty(this.model, 'settings.columns.' + this.field + '.limit', defaultLimit);
      }
    },
    isEncodedValue: function isEncodedValue(key) {
      return this.$root.getModelProperty(this.model, 'settings.columns.' + key + '.encode', true);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['row', 'rows', 'rowsdata', 'buttons', 'count', 'field', 'gettext_editor', 'model', 'orderby', 'history', 'checked', 'button_loading', 'depth_level'],
  components: {
    TableRowValue: _TableRowValue_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      enabled_columns: {},
      hidden: ['language_id', '_order', 'slug', 'published_at', 'updated_at', 'created_at'],
      autoSize: false
    };
  },
  created: function created() {
    var _this = this;

    //If table has foreign column, will be hidden
    if (this.model.foreign_column != null) this.hidden.push(this.model.foreign_column); //Set allowed columns

    this.resetAllowedColumns(); //Automaticaly choose size of tables

    if (this.autoSize == false) this.$parent.$parent.checkActiveSize(this.columns); //On history change

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
  computed: {
    multipleCheckbox: function multipleCheckbox() {
      return this.checked.length > 0;
    },
    defaultColumns: function defaultColumns() {
      var data = {},
          key; //Get columns from row

      for (var i = 0; i < this.model.columns.length; i++) {
        key = this.model.columns[i]; //If is column hidden

        if (this.$root.getModelProperty(this.model, 'settings.columns.' + key + '.hidden')) continue;

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
      return this.model.history == true;
    },
    canShowGettext: function canShowGettext() {
      if (this.model.slug == 'languages' && this.$root.gettext == true) return true;
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
        if (key in enabled) continue;
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
      additional -= !this.model.publishable ? 1 : 0;
      return Object.keys(buttons || {}).length + additional;
    },
    getButtonsForRow: function getButtonsForRow(item) {
      if (!this.rows.buttons || !(item.id in this.rows.buttons)) return {};
      var data = {},
          buttons = this.rows.buttons[item.id];

      for (var key in buttons) {
        if (['button', 'both', 'multiple'].indexOf(buttons[key].type) > -1) data[key] = buttons[key];
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

        _this3.$parent.$parent.closeHistory(history_id ? true : false);

        _this3.scrollToForm();
      };

      if (data) {
        render(data);
      } else {
        this.$http.get(this.$root.requests.get('show', {
          model: this.model.slug,
          id: row.id,
          subid: history_id
        })).then(function (response) {
          render(response.data);
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
      if (this.$parent.$parent.activeSize != 0) return;
      setTimeout(function () {
        $('html, body').animate({
          scrollTop: $('#' + _this4.formID).offset().top - 10
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
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['rows', 'languages', 'langid'],
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
    groups: function groups() {
      var groups = this.rows;

      for (var key in groups) {
        //Is allowed module
        if (groups[key].active === true) continue;
        if (groups[key].active === false || !this.hasActiveModule(groups[key].submenu)) delete groups[key];
      }

      return groups;
    },
    hasLanguages: function hasLanguages() {
      return this.languages.length > 0;
    },
    isActive: function isActive() {
      return this.$root.languages_active == true ? 1 : 0;
    }
  },
  methods: {
    changeLanguage: function changeLanguage(e) {
      this.$parent.language_id = e.target.value;
    },
    addActiveTreeClasses: function addActiveTreeClasses() {
      var owner = $('.sidebar li[data-slug="' + this.$router.currentRoute.params.model + '"]');
      owner.parent().addClass('menu-open').css('display', 'block').parents('.treeview').addClass('active');
      $('.sidebar .treeview-menu a').click(function () {
        $(this).parent().siblings('.active').removeClass('active').find('.menu-open').slideUp();
      });
    },
    getLangName: function getLangName(lang) {
      return this.$root.getLangName(lang);
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sidebar-row',
  props: ['row', 'parent'],
  data: function data() {
    return {
      levels: []
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
      return this.row.active !== false;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {};
  },
  props: ['langid'],
  mounted: function mounted() {
    if (typeof ga == 'function') ga('send', 'pageview', 'auto');
  },
  computed: {
    /*
     * Return model from actual page
     */
    model: function model() {
      var model = _.cloneDeep(this.$root.models[this.$route.params.model]);

      return model ? Object(_Helpers_ModelHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(model) : null;
    },
    getGroup: function getGroup() {
      if (this.model.slug in this.$root.models) return false;

      for (var key in this.$root.models) {
        if (this.model.slug in this.$root.models[key].submenu) return this.$root.models[key];
      }

      return false;
    }
  },
  components: {
    ModelBuilder: _ModelBuilder_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
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
//
//
//
//
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






/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model_builder', 'langid', 'ischild', 'parentrow', 'activetab', 'hasparentmodel'],
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
        size: 8,
        key: 'small',
        name: 'Small',
        active: false,
        disabled: false
      }, {
        size: 6,
        key: 'medium',
        name: 'Medium',
        active: false,
        disabled: false
      }, {
        size: 4,
        key: 'big',
        name: 'Big',
        active: false,
        disabled: false
      }, {
        size: 0,
        key: 'full',
        name: 'Full width',
        active: false,
        disabled: false
      }],
      activeSize: null,
      row: this.emptyRowInstance(this.model_builder),

      /*
       * Search engine
       */
      search: {
        column: this.$root.getModelProperty(this.model_builder, 'settings.search.column', null),
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
  },
  destroyed: function destroyed() {
    this.removeModelEvents();
  },
  watch: {
    sizes: {
      deep: true,
      handler: function handler(data) {
        this.activeSize = data.filter(function (row) {
          if (row.active == true) {
            var rows = this.getStorage();
            rows[this.model.slug] = row.size;
            rows[this.model.slug + '_default'] = this.$root.getModelProperty(this.model, 'settings.grid.default');
            localStorage.sizes = JSON.stringify(rows);
          }

          return row.active == true;
        }.bind(this))[0].size;
        this.activeSize;
      }
    },
    search: {
      deep: true,
      handler: function handler(search, oldsearch) {
        //Update select
        this.reloadSearchBarSelect();
      }
    },
    activetab: function activetab(value) {
      if (value === true) this.sendRowsData();
    },
    parentrow: function parentrow(row, oldrow) {
      //When parent row has been changed, then load children rows
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(row, oldrow)) {
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
    /*
     * Send all avaiable row events
     */
    sendRowData: function sendRowData() {
      this.emitRowData('getRow');
      this.emitRowData('getParentRow');
    },
    emitRowData: function emitRowData(type, data) {
      if (data && data.table != this.model.table) return;
      eventHub.$emit(type, {
        model: this.model,
        slug: this.model.slug,
        row: this.row,
        rows: this.rows.data,
        count: this.rows.count,
        component: this
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
      var data = {
        table: this.model.slug,
        slug: this.model.slug,
        model: this.model,
        rows: this.rows.data,
        count: this.rows.count,
        depth_level: this.depth_level
      };
      eventHub.$emit('rowsChanged', data);
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
      if (force !== true && (!row || !('id' in row) || this.hasparentmodelMutated === false)) return 0;
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
    checkActiveSize: function checkActiveSize(columns) {
      var data = this.getStorage(),
          defaultValue = this.$root.getModelProperty(this.model, 'settings.grid.default'); //Full screen

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
       * When is localStorage value empty, then automatic chose the best grid value
       */


      columns = Object.keys(columns);
      if (columns.length >= 5) this.sizes[2].disabled = true;
      if (this.hasChilds() > 0) return this.sizes[3].active = true; //Full screen

      if (columns.length > 5) return this.sizes[3].active = true; //Big

      if (columns.length <= 1) return this.sizes[2].active = true; //Small

      if (columns.length == 5) return this.sizes[0].active = true; //Small

      this.sizes[1].active = true;
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
      if (column == 'id') return this.trans('number');
      if (column == 'created_at') return this.trans('created-at');
      if (!column || !(column in this.model.fields)) return this.trans('search-all');
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
      return this.$root.getModelProperty(this.model, 'settings.buttons.insert', this.trans('new-row'));
    },
    resetForm: function resetForm() {
      //We do not want reset object is is already empty instance
      //Because if component receives getParentRow, and then will be rewrited row observer
      //Changes in this component wont be interactive
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.row, this.emptyRowInstance())) {
        this.row = this.emptyRowInstance();
      }
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
    }
  },
  computed: {
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
      if (this.$root.getModelProperty(this.model, 'settings.grid.enabled') === false || this.$root.getModelProperty(this.model, 'settings.grid.disabled') === true) return false;
      return true;
    },
    canShowRows: function canShowRows() {
      if (this.model.isSingle()) {
        this.enableOnlyFullScreen();
        return false;
      }

      return true;
    },
    canAddRow: function canAddRow() {
      //Disabled adding new rows
      if (this.model.insertable == false) return false; //Unlimited allowed rows

      if (this.model.maximum == 0) return true;
      if (this.model.maximum <= this.rows.count) return false;
      return true;
    },
    canShowForm: function canShowForm() {
      if (!this.isOpenedRow && !this.canAddRow || this.isOpenedRow && this.model.editable == false) return false;
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
      var searching = this.$root.getModelProperty(this.model, 'settings.search.enabled', null); //If is forced showing searchbar

      if (searching === true) return true;else if (searching === false) return false;
      return this.search.used === true || (this.model.maximum == 0 || this.model.maximum >= 10) && this.rows.count >= 10;
    },
    getSearchableFields: function getSearchableFields() {
      var keys = []; //Get searchable fields

      for (var key in this.model.fields) {
        var field = this.model.fields[key];
        if ('belongToMany' in field || 'multiple' in field || 'removeFromForm' in field && 'hidden' in field || field.type == 'password') continue;
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
    resetInerval: function resetInerval() {
      this.search.query = '';
      this.search.query_to = '';
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

/***/ "./node_modules/sortablejs/Sortable.js":
/*!*********************************************!*\
  !*** ./node_modules/sortablejs/Sortable.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		oldIndex,
		newIndex,
		oldDraggableIndex,
		newDraggableIndex,

		activeGroup,
		putSortable,

		autoScrolls = [],
		scrolling = false,

		awaitingDragStarted = false,
		ignoreNextClick = false,
		sortables = [],

		pointerElemChangedInterval,
		lastPointerElemX,
		lastPointerElemY,

		tapEvt,
		touchEvt,

		moved,


		lastTarget,
		lastDirection,
		pastFirstInvertThresh = false,
		isCircumstantialInvert = false,
		lastMode, // 'swap' or 'insert'

		targetMoveDistance,

		// For positioning ghost absolutely
		ghostRelativeParent,
		ghostRelativeParentInitialScroll = [], // (left, top)

		realDragElRect, // dragEl rect after current animation

		/** @const */
		R_SPACE = /\s+/g,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = {
			capture: false,
			passive: false
		},

		IE11OrLess = !!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),
		Edge = !!navigator.userAgent.match(/Edge/i),
		FireFox = !!navigator.userAgent.match(/firefox/i),
		Safari = !!(navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && !navigator.userAgent.match(/android/i)),
		IOS = !!(navigator.userAgent.match(/iP(ad|od|hone)/i)),

		PositionGhostAbsolutely = IOS,

		CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',

		// This will not pass for IE9, because IE9 DnD only works on anchors
		supportDraggable = ('draggable' in document.createElement('div')),

		supportCssPointerEvents = (function() {
			// false when <= IE11
			if (IE11OrLess) {
				return false;
			}
			var el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,
		_alignedSilent = false,

		abs = Math.abs,
		min = Math.min,
		max = Math.max,

		savedInputChecked = [],

		_detectDirection = function(el, options) {
			var elCSS = _css(el),
				elWidth = parseInt(elCSS.width)
					- parseInt(elCSS.paddingLeft)
					- parseInt(elCSS.paddingRight)
					- parseInt(elCSS.borderLeftWidth)
					- parseInt(elCSS.borderRightWidth),
				child1 = _getChild(el, 0, options),
				child2 = _getChild(el, 1, options),
				firstChildCSS = child1 && _css(child1),
				secondChildCSS = child2 && _css(child2),
				firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + _getRect(child1).width,
				secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + _getRect(child2).width;

			if (elCSS.display === 'flex') {
				return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse'
				? 'vertical' : 'horizontal';
			}

			if (elCSS.display === 'grid') {
				return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
			}

			if (child1 && firstChildCSS.float !== 'none') {
				var touchingSideChild2 = firstChildCSS.float === 'left' ? 'left' : 'right';

				return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ?
					'vertical' : 'horizontal';
			}

			return (child1 &&
				(
					firstChildCSS.display === 'block' ||
					firstChildCSS.display === 'flex' ||
					firstChildCSS.display === 'table' ||
					firstChildCSS.display === 'grid' ||
					firstChildWidth >= elWidth &&
					elCSS[CSSFloatProperty] === 'none' ||
					child2 &&
					elCSS[CSSFloatProperty] === 'none' &&
					firstChildWidth + secondChildWidth > elWidth
				) ?
				'vertical' : 'horizontal'
			);
		},

		/**
		 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
		 * @param  {Number} x      X position
		 * @param  {Number} y      Y position
		 * @return {HTMLElement}   Element of the first found nearest Sortable
		 */
		_detectNearestEmptySortable = function(x, y) {
			for (var i = 0; i < sortables.length; i++) {
				if (_lastChild(sortables[i])) continue;

				var rect = _getRect(sortables[i]),
					threshold = sortables[i][expando].options.emptyInsertThreshold,
					insideHorizontally = x >= (rect.left - threshold) && x <= (rect.right + threshold),
					insideVertically = y >= (rect.top - threshold) && y <= (rect.bottom + threshold);

				if (threshold && insideHorizontally && insideVertically) {
					return sortables[i];
				}
			}
		},

		_isClientInRowColumn = function(x, y, el, axis, options) {
			var targetRect = _getRect(el),
				targetS1Opp = axis === 'vertical' ? targetRect.left : targetRect.top,
				targetS2Opp = axis === 'vertical' ? targetRect.right : targetRect.bottom,
				mouseOnOppAxis = axis === 'vertical' ? x : y;

			return targetS1Opp < mouseOnOppAxis && mouseOnOppAxis < targetS2Opp;
		},

		_isElInRowColumn = function(el1, el2, axis) {
			var el1Rect = el1 === dragEl && realDragElRect || _getRect(el1),
				el2Rect = el2 === dragEl && realDragElRect || _getRect(el2),
				el1S1Opp = axis === 'vertical' ? el1Rect.left : el1Rect.top,
				el1S2Opp = axis === 'vertical' ? el1Rect.right : el1Rect.bottom,
				el1OppLength = axis === 'vertical' ? el1Rect.width : el1Rect.height,
				el2S1Opp = axis === 'vertical' ? el2Rect.left : el2Rect.top,
				el2S2Opp = axis === 'vertical' ? el2Rect.right : el2Rect.bottom,
				el2OppLength = axis === 'vertical' ? el2Rect.width : el2Rect.height;

			return (
				el1S1Opp === el2S1Opp ||
				el1S2Opp === el2S2Opp ||
				(el1S1Opp + el1OppLength / 2) === (el2S1Opp + el2OppLength / 2)
			);
		},

		_getParentAutoScrollElement = function(el, includeSelf) {
			// skip to window
			if (!el || !el.getBoundingClientRect) return _getWindowScrollingElement();

			var elem = el;
			var gotSelf = false;
			do {
				// we don't need to get elem css if it isn't even overflowing in the first place (performance)
				if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
					var elemCSS = _css(elem);
					if (
						elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') ||
						elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')
					) {
						if (!elem || !elem.getBoundingClientRect || elem === document.body) return _getWindowScrollingElement();

						if (gotSelf || includeSelf) return elem;
						gotSelf = true;
					}
				}
			/* jshint boss:true */
			} while (elem = elem.parentNode);

			return _getWindowScrollingElement();
		},

		_getWindowScrollingElement = function() {
			if (IE11OrLess) {
				return document.documentElement;
			} else {
				return document.scrollingElement;
			}
		},

		_scrollBy = function(el, x, y) {
			el.scrollLeft += x;
			el.scrollTop += y;
		},

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl, /**Boolean*/isFallback) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (options.scroll) {
				var _this = rootEl ? rootEl[expando] : window,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winScroller = _getWindowScrollingElement(),

					scrollThisInstance = false;

				// Detect scrollEl
				if (scrollParentEl !== rootEl) {
					_clearAutoScrolls();

					scrollEl = options.scroll;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = _getParentAutoScrollElement(rootEl, true);
						scrollParentEl = scrollEl;
					}
				}


				var layersOut = 0;
				var currentParent = scrollEl;
				do {
					var	el = currentParent,
						rect = _getRect(el),

						top = rect.top,
						bottom = rect.bottom,
						left = rect.left,
						right = rect.right,

						width = rect.width,
						height = rect.height,

						scrollWidth,
						scrollHeight,

						css,

						vx,
						vy,

						canScrollX,
						canScrollY,

						scrollPosX,
						scrollPosY;


					scrollWidth = el.scrollWidth;
					scrollHeight = el.scrollHeight;

					css = _css(el);

					scrollPosX = el.scrollLeft;
					scrollPosY = el.scrollTop;

					if (el === winScroller) {
						canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll' || css.overflowX === 'visible');
						canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll' || css.overflowY === 'visible');
					} else {
						canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll');
						canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll');
					}

					vx = canScrollX && (abs(right - x) <= sens && (scrollPosX + width) < scrollWidth) - (abs(left - x) <= sens && !!scrollPosX);

					vy = canScrollY && (abs(bottom - y) <= sens && (scrollPosY + height) < scrollHeight) - (abs(top - y) <= sens && !!scrollPosY);


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

						if (el && (vx != 0 || vy != 0)) {
							scrollThisInstance = true;
							/* jshint loopfunc:true */
							autoScrolls[layersOut].pid = setInterval((function () {
								// emulate drag over during autoscroll (fallback), emulating native DnD behaviour
								if (isFallback && this.layer === 0) {
									Sortable.active._emulateDragOver(true);
									Sortable.active._onTouchMove(touchEvt, true);
								}
								var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
								var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

								if ('function' === typeof(scrollCustomFn)) {
									if (scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt, touchEvt, autoScrolls[this.layer].el) !== 'continue') {
										return;
									}
								}

								_scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
							}).bind({layer: layersOut}), 24);
						}
					}
					layersOut++;
				} while (options.bubbleScroll && currentParent !== winScroller && (currentParent = _getParentAutoScrollElement(currentParent, false)));
				scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
			}
		}, 30),

		_clearAutoScrolls = function () {
			autoScrolls.forEach(function(autoScroll) {
				clearInterval(autoScroll.pid);
			});
			autoScrolls = [];
		},

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				return function(to, from, dragEl, evt) {
					var sameGroup = to.options.group.name &&
									from.options.group.name &&
									to.options.group.name === from.options.group.name;

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

						return (value === true ||
						(typeof value === 'string' && value === otherGroup) ||
						(value.join && value.indexOf(otherGroup) > -1));
					}
				};
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		},

		_checkAlignment = function(evt) {
			if (!dragEl || !dragEl.parentNode) return;
			dragEl.parentNode[expando] && dragEl.parentNode[expando]._computeIsAligned(evt);
		},

		_hideGhostForTarget = function() {
			if (!supportCssPointerEvents && ghostEl) {
				_css(ghostEl, 'display', 'none');
			}
		},

		_unhideGhostForTarget = function() {
			if (!supportCssPointerEvents && ghostEl) {
				_css(ghostEl, 'display', '');
			}
		};


	// #1184 fix - Prevent click event on fallback if dragged but item not changed position
	document.addEventListener('click', function(evt) {
		if (ignoreNextClick) {
			evt.preventDefault();
			evt.stopPropagation && evt.stopPropagation();
			evt.stopImmediatePropagation && evt.stopImmediatePropagation();
			ignoreNextClick = false;
			return false;
		}
	}, true);

	var nearestEmptyInsertDetectEvent = function(evt) {
		if (dragEl) {
			evt = evt.touches ? evt.touches[0] : evt;
			var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

			if (nearest) {
				// Create imitation event
				var event = {};
				for (var i in evt) {
					event[i] = evt[i];
				}
				event.target = event.rootEl = nearest;
				event.preventDefault = void 0;
				event.stopPropagation = void 0;
				nearest[expando]._onDragOver(event);
			}
		}
	};

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: null,
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: true,
			draggable: /[uo]l/i.test(el.nodeName) ? '>li' : '>*',
			swapThreshold: 1, // percentage; 0 <= x <= 1
			invertSwap: false, // invert always
			invertedSwapThreshold: null, // will be set to same as swapThreshold if default
			removeCloneOnHide: true,
			direction: function() {
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
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			delayOnTouchOnly: false,
			touchStartThreshold: parseInt(window.devicePixelRatio, 10) || 1,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false && ('PointerEvent' in window),
			emptyInsertThreshold: 5
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		if (this.nativeDraggable) {
			// Touch start threshold cannot be greater than the native dragstart threshold
			this.options.touchStartThreshold = 1;
		}

		// Bind events
		if (options.supportPointer) {
			_on(el, 'pointerdown', this._onTapStart);
		} else {
			_on(el, 'mousedown', this._onTapStart);
			_on(el, 'touchstart', this._onTapStart);
		}

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		sortables.push(this.el);

		// Restore sorting
		options.store && options.store.get && this.sort(options.store.get(this) || []);
	}

	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_computeIsAligned: function(evt) {
			var target;

			if (ghostEl && !supportCssPointerEvents) {
				_hideGhostForTarget();
				target = document.elementFromPoint(evt.clientX, evt.clientY);
				_unhideGhostForTarget();
			} else {
				target = evt.target;
			}

			target = _closest(target, this.options.draggable, this.el, false);
			if (_alignedSilent) return;
			if (!dragEl || dragEl.parentNode !== this.el) return;

			var children = this.el.children;
			for (var i = 0; i < children.length; i++) {
				// Don't change for target in case it is changed to aligned before onDragOver is fired
				if (_closest(children[i], this.options.draggable, this.el, false) && children[i] !== target) {
					children[i].sortableMouseAligned = _isClientInRowColumn(evt.clientX, evt.clientY, children[i], this._getDirection(evt, null), this.options);
				}
			}
			// Used for nulling last target when not in element, nothing to do with checking if aligned
			if (!_closest(target, this.options.draggable, this.el, true)) {
				lastTarget = null;
			}

			_alignedSilent = true;
			setTimeout(function() {
				_alignedSilent = false;
			}, 30);

		},

		_getDirection: function(evt, target) {
			return (typeof this.options.direction === 'function') ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
		},

		_onTapStart: function (/** Event|TouchEvent */evt) {
			if (!evt.cancelable) return;
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && ((evt.path && evt.path[0]) || (evt.composedPath && evt.composedPath()[0])) || target,
				filter = options.filter,
				startIndex,
				startDraggableIndex;

			_saveInputCheckedState(el);

			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button and enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el, false);


			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target);
			startDraggableIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el, false);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el, false)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex, startDraggableIndex);
		},


		_handleAutoScroll: function(evt, fallback) {
			if (!dragEl || !this.options.scroll) return;
			var x = evt.clientX,
				y = evt.clientY,

				elem = document.elementFromPoint(x, y),
				_this = this;

			// IE does not seem to have native autoscroll,
			// Edge's autoscroll seems too conditional,
			// MACOS Safari does not have autoscroll,
			// Firefox and Chrome are good
			if (fallback || Edge || IE11OrLess || Safari) {
				_autoScroll(evt, _this.options, elem, fallback);

				// Listener for pointer element change
				var ogElemScroller = _getParentAutoScrollElement(elem, true);
				if (
					scrolling &&
					(
						!pointerElemChangedInterval ||
						x !== lastPointerElemX ||
						y !== lastPointerElemY
					)
				) {

					pointerElemChangedInterval && clearInterval(pointerElemChangedInterval);
					// Detect for pointer elem change, emulating native DnD behaviour
					pointerElemChangedInterval = setInterval(function() {
						if (!dragEl) return;
						// could also check if scroll direction on newElem changes due to parent autoscrolling
						var newElem = _getParentAutoScrollElement(document.elementFromPoint(x, y), true);
						if (newElem !== ogElemScroller) {
							ogElemScroller = newElem;
							_clearAutoScrolls();
							_autoScroll(evt, _this.options, ogElemScroller, fallback);
						}
					}, 10);
					lastPointerElemX = x;
					lastPointerElemY = y;
				}

			} else {
				// if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
				if (!_this.options.bubbleScroll || _getParentAutoScrollElement(elem, true) === _getWindowScrollingElement()) {
					_clearAutoScrolls();
					return;
				}
				_autoScroll(evt, _this.options, _getParentAutoScrollElement(elem, false), false);
			}
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex, /** Number */startDraggableIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;
				oldDraggableIndex = startDraggableIndex;

				tapEvt = {
					target: dragEl,
					clientX: (touch || evt).clientX,
					clientY: (touch || evt).clientY
				};

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';
				// undo animation if needed
				dragEl.style.transition = '';
				dragEl.style.transform = '';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDragEvents();

					if (!FireFox && _this.nativeDraggable) {
						dragEl.draggable = true;
					}

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex);

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
				_on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
				_on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);

				// Make dragEl draggable (must be before delay for FireFox)
				if (FireFox && this.nativeDraggable) {
					this.options.touchStartThreshold = 4;
					dragEl.draggable = true;
				}

				// Delay is impossible for native DnD in Edge or IE
				if (options.delay && (options.delayOnTouchOnly ? touch : true) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
					_on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_delayedDragTouchMoveHandler: function (/** TouchEvent|PointerEvent **/e) {
			var touch = e.touches ? e.touches[0] : e;
			if (max(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY))
					>= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))
			) {
				this._disableDelayedDrag();
			}
		},

		_disableDelayedDrag: function () {
			dragEl && _disableDraggable(dragEl);
			clearTimeout(this._dragStartTimer);

			this._disableDelayedDragEvents();
		},

		_disableDelayedDragEvents: function () {
			var ownerDocument = this.el.ownerDocument;
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
			_off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
			_off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (!this.nativeDraggable || touch) {
				if (this.options.supportPointer) {
					_on(document, 'pointermove', this._onTouchMove);
				} else if (touch) {
					_on(document, 'touchmove', this._onTouchMove);
				} else {
					_on(document, 'mousemove', this._onTouchMove);
				}
			} else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
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
			} catch (err) {
			}
		},

		_dragStarted: function (fallback, evt) {
			awaitingDragStarted = false;
			if (rootEl && dragEl) {
				if (this.nativeDraggable) {
					_on(document, 'dragover', this._handleAutoScroll);
					_on(document, 'dragover', _checkAlignment);
				}
				var options = this.options;

				// Apply effect
				!fallback && _toggleClass(dragEl, options.dragClass, false);
				_toggleClass(dragEl, options.ghostClass, true);

				// In case dragging an animated element
				_css(dragEl, 'transform', '');

				Sortable.active = this;

				fallback && this._appendGhost();

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex, undefined, evt);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function (forAutoScroll) {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY && !forAutoScroll) {
					return;
				}
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

				if (parent) {
					do {
						if (parent[expando]) {
							var inserted;

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
				dragEl.parentNode[expando]._computeIsAligned(touchEvt);

				_unhideGhostForTarget();
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt, forAutoScroll) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					matrix = ghostEl && _matrix(ghostEl),
					scaleX = ghostEl && matrix && matrix.a,
					scaleY = ghostEl && matrix && matrix.d,
					relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && _getRelativeScrollOffset(ghostRelativeParent),
					dx = ((touch.clientX - tapEvt.clientX)
							+ fallbackOffset.x) / (scaleX || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0]) : 0) / (scaleX || 1),
					dy = ((touch.clientY - tapEvt.clientY)
							+ fallbackOffset.y) / (scaleY || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1]) : 0) / (scaleY || 1),
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active && !awaitingDragStarted) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}
					this._onDragStart(evt, true);
				}

				!forAutoScroll && this._handleAutoScroll(touch, true);

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.cancelable && evt.preventDefault();
			}
		},

		_appendGhost: function () {
			// Bug if using scale(): https://stackoverflow.com/questions/2637058
			// Not being adjusted for
			if (!ghostEl) {
				var container = this.options.fallbackOnBody ? document.body : rootEl,
					rect = _getRect(dragEl, true, container, !PositionGhostAbsolutely),
					css = _css(dragEl),
					options = this.options;

				// Position absolutely
				if (PositionGhostAbsolutely) {
					// Get relatively positioned parent
					ghostRelativeParent = container;

					while (
						_css(ghostRelativeParent, 'position') === 'static' &&
						_css(ghostRelativeParent, 'transform') === 'none' &&
						ghostRelativeParent !== document
					) {
						ghostRelativeParent = ghostRelativeParent.parentNode;
					}

					if (ghostRelativeParent !== document) {
						var ghostRelativeParentRect = _getRect(ghostRelativeParent, true);

						rect.top -= ghostRelativeParentRect.top;
						rect.left -= ghostRelativeParentRect.left;
					}

					if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
						if (ghostRelativeParent === document) ghostRelativeParent = _getWindowScrollingElement();

						rect.top += ghostRelativeParent.scrollTop;
						rect.left += ghostRelativeParent.scrollLeft;
					} else {
						ghostRelativeParent = _getWindowScrollingElement();
					}
					ghostRelativeParentInitialScroll = _getRelativeScrollOffset(ghostRelativeParent);
				}


				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'box-sizing', 'border-box');
				_css(ghostEl, 'margin', 0);
				_css(ghostEl, 'top', rect.top);
				_css(ghostEl, 'left', rect.left);
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', (PositionGhostAbsolutely ? 'absolute' : 'fixed'));
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				container.appendChild(ghostEl);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/fallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			// Setup clone
			cloneEl = _clone(dragEl);

			cloneEl.draggable = false;
			cloneEl.style['will-change'] = '';

			this._hideClone();

			_toggleClass(cloneEl, _this.options.chosenClass, false);


			// #1143: IFrame support workaround
			_this._cloneId = _nextTick(function () {
				if (!_this.options.removeCloneOnHide) {
					rootEl.insertBefore(cloneEl, dragEl);
				}
				_dispatchEvent(_this, rootEl, 'clone', dragEl);
			});


			!fallback && _toggleClass(dragEl, options.dragClass, true);

			// Set proper drop events
			if (fallback) {
				ignoreNextClick = true;
				_this._loopId = setInterval(_this._emulateDragOver, 50);
			} else {
				// Undo what was set in _prepareDragStart before drag started
				_off(document, 'mouseup', _this._onDrop);
				_off(document, 'touchend', _this._onDrop);
				_off(document, 'touchcancel', _this._onDrop);

				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1276 fix:
				_css(dragEl, 'transform', 'translateZ(0)');
			}

			awaitingDragStarted = true;

			_this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
			_on(document, 'selectstart', _this);
			if (Safari) {
				_css(document.body, 'user-select', 'none');
			}
		},


		// Returns true - if no further action is needed (either inserted or another condition)
		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target = evt.target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				canSort = options.sort,
				_this = this;

			if (_silent) return;

			// Return invocation when dragEl is inserted (or completed)
			function completed(insertion) {
				if (insertion) {
					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(_this);
					}

					if (activeSortable) {
						// Set ghost class to new sortable's ghost class
						_toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
						_toggleClass(dragEl, options.ghostClass, true);
					}

					if (putSortable !== _this && _this !== Sortable.active) {
						putSortable = _this;
					} else if (_this === Sortable.active) {
						putSortable = null;
					}

					// Animation
					dragRect && _this._animate(dragRect, dragEl);
					target && targetRect && _this._animate(targetRect, target);
				}


				// Null lastTarget if it is not inside a previously swapped element
				if ((target === dragEl && !dragEl.animated) || (target === el && !target.animated)) {
					lastTarget = null;
				}

				// no bubbling and not fallback
				if (!options.dragoverBubble && !evt.rootEl && target !== document) {
					_this._handleAutoScroll(evt);
					dragEl.parentNode[expando]._computeIsAligned(evt);

					// Do not detect for empty insert if already inserted
					!insertion && nearestEmptyInsertDetectEvent(evt);
				}

				!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();

				return true;
			}

			// Call when dragEl has been inserted
			function changed() {
				_dispatchEvent(_this, rootEl, 'change', target, el, rootEl, oldIndex, _index(dragEl), oldDraggableIndex, _index(dragEl, options.draggable), evt);
			}


			if (evt.preventDefault !== void 0) {
				evt.cancelable && evt.preventDefault();
			}


			moved = true;

			target = _closest(target, options.draggable, el, true);

			// target is dragEl or target is animated
			if (dragEl.contains(evt.target) || target.animated) {
				return completed(false);
			}

			if (target !== dragEl) {
				ignoreNextClick = false;
			}

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				)
			) {
				var axis = this._getDirection(evt, target);

				dragRect = _getRect(dragEl);

				if (revert) {
					this._hideClone();
					parentEl = rootEl; // actualization

					if (nextEl) {
						rootEl.insertBefore(dragEl, nextEl);
					} else {
						rootEl.appendChild(dragEl);
					}

					return completed(true);
				}

				var elLastChild = _lastChild(el);

				if (!elLastChild || _ghostIsLast(evt, axis, el) && !elLastChild.animated) {
					// assign target only if condition is true
					if (elLastChild && el === evt.target) {
						target = elLastChild;
					}

					if (target) {
						targetRect = _getRect(target);
					}

					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(this);
					}

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
						el.appendChild(dragEl);
						parentEl = el; // actualization
						realDragElRect = null;

						changed();
						return completed(true);
					}
				}
				else if (target && target !== dragEl && target.parentNode === el) {
					var direction = 0,
						targetBeforeFirstSwap,
						aligned = target.sortableMouseAligned,
						differentLevel = dragEl.parentNode !== el,
						side1 = axis === 'vertical' ? 'top' : 'left',
						scrolledPastTop = _isScrolledPast(target, 'top') || _isScrolledPast(dragEl, 'top'),
						scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;


					if (lastTarget !== target) {
						lastMode = null;
						targetBeforeFirstSwap = _getRect(target)[side1];
						pastFirstInvertThresh = false;
					}

					// Reference: https://www.lucidchart.com/documents/view/10fa0e93-e362-4126-aca2-b709ee56bd8b/0
					if (
						_isElInRowColumn(dragEl, target, axis) && aligned ||
						differentLevel ||
						scrolledPastTop ||
						options.invertSwap ||
						lastMode === 'insert' ||
						// Needed, in the case that we are inside target and inserted because not aligned... aligned will stay false while inside
						// and lastMode will change to 'insert', but we must swap
						lastMode === 'swap'
					) {
						// New target that we will be inside
						if (lastMode !== 'swap') {
							isCircumstantialInvert = options.invertSwap || differentLevel;
						}

						direction = _getSwapDirection(evt, target, axis,
							options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold,
							isCircumstantialInvert,
							lastTarget === target);
						lastMode = 'swap';
					} else {
						// Insert at position
						direction = _getInsertDirection(target);
						lastMode = 'insert';
					}
					if (direction === 0) return completed(false);

					realDragElRect = null;
					lastTarget = target;

					lastDirection = direction;

					targetRect = _getRect(target);

					var nextSibling = target.nextElementSibling,
						after = false;

					after = direction === 1;

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						if (isOwner) {
							activeSortable._hideClone();
						} else {
							activeSortable._showClone(this);
						}

						if (after && !nextSibling) {
							el.appendChild(dragEl);
						} else {
							target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
						}

						// Undo chrome's scroll adjustment
						if (scrolledPastTop) {
							_scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
						}

						parentEl = dragEl.parentNode; // actualization

						// must be done before animation
						if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
							targetMoveDistance = abs(targetBeforeFirstSwap - _getRect(target)[side1]);
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

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = _getRect(target);

				if (target === dragEl) {
					realDragElRect = currentRect;
				}

				if (prevRect.nodeType === 1) {
					prevRect = _getRect(prevRect);
				}

				// Check if actually moving position
				if ((prevRect.left + prevRect.width / 2) !== (currentRect.left + currentRect.width / 2)
					|| (prevRect.top + prevRect.height / 2) !== (currentRect.top + currentRect.height / 2)
				) {
					var matrix = _matrix(this.el),
						scaleX = matrix && matrix.a,
						scaleY = matrix && matrix.d;

					_css(target, 'transition', 'none');
					_css(target, 'transform', 'translate3d('
						+ (prevRect.left - currentRect.left) / (scaleX ? scaleX : 1) + 'px,'
						+ (prevRect.top - currentRect.top) / (scaleY ? scaleY : 1) + 'px,0)'
					);

					this._repaint(target);
					_css(target, 'transition', 'transform ' + ms + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
					_css(target, 'transform', 'translate3d(0,0,0)');
				}

				(typeof target.animated === 'number') && clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_repaint: function(target) {
			return target.offsetWidth;
		},

		_offMoveEvents: function() {
			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(document, 'dragover', nearestEmptyInsertDetectEvent);
			_off(document, 'mousemove', nearestEmptyInsertDetectEvent);
			_off(document, 'touchmove', nearestEmptyInsertDetectEvent);
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(document, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;
			awaitingDragStarted = false;
			scrolling = false;
			isCircumstantialInvert = false;
			pastFirstInvertThresh = false;

			clearInterval(this._loopId);

			clearInterval(pointerElemChangedInterval);
			_clearAutoScrolls();
			_cancelThrottle();

			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);


			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
				_off(document, 'dragover', this._handleAutoScroll);
				_off(document, 'dragover', _checkAlignment);
			}

			if (Safari) {
				_css(document.body, 'user-select', '');
			}

			this._offMoveEvents();
			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.cancelable && evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || (putSortable && putSortable.lastPutMode !== 'clone')) {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex, null, oldDraggableIndex, null, evt);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);
						newDraggableIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
						}

						putSortable && putSortable.save();
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);
							newDraggableIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
							newDraggableIndex = oldDraggableIndex;
						}
						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

						// Save sorting
						this.save();
					}
				}

			}
			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =
			autoScrolls.length =

			pointerElemChangedInterval =
			lastPointerElemX =
			lastPointerElemY =

			tapEvt =
			touchEvt =

			moved =
			newIndex =
			oldIndex =

			lastTarget =
			lastDirection =

			realDragElRect =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});

			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
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
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el, false)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl, false)) {
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
		save: function () {
			var store = this.options.store;
			store && store.set && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el, false);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}
			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			this._onDrop();

			sortables.splice(sortables.indexOf(this.el), 1);

			this.el = el = null;
		},

		_hideClone: function() {
			if (!cloneEl.cloneHidden) {
				_css(cloneEl, 'display', 'none');
				cloneEl.cloneHidden = true;
				if (cloneEl.parentNode && this.options.removeCloneOnHide) {
					cloneEl.parentNode.removeChild(cloneEl);
				}
			}
		},

		_showClone: function(putSortable) {
			if (putSortable.lastPutMode !== 'clone') {
				this._hideClone();
				return;
			}

			if (cloneEl.cloneHidden) {
				// show clone at dragEl or original position
				if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
					rootEl.insertBefore(cloneEl, dragEl);
				} else if (nextEl) {
					rootEl.insertBefore(cloneEl, nextEl);
				} else {
					rootEl.appendChild(cloneEl);
				}

				if (this.options.group.revertClone) {
					this._animate(dragEl, cloneEl);
				}
				_css(cloneEl, 'display', '');
				cloneEl.cloneHidden = false;
			}
		}
	};

	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx, includeCTX) {
		if (el) {
			ctx = ctx || document;

			do {
				if (
					selector != null &&
					(
						selector[0] === '>' ?
						el.parentNode === ctx && _matches(el, selector) :
						_matches(el, selector)
					) ||
					includeCTX && el === ctx
				) {
					return el;
				}

				if (el === ctx) break;
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		return (el.host && el !== document && el.host.nodeType)
			? el.host
			: el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.cancelable && evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, IE11OrLess ? false : captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, IE11OrLess ? false : captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el && name) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style) && prop.indexOf('webkit') === -1) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}

	function _matrix(el) {
		var appliedTransforms = '';
		do {
			var transform = _css(el, 'transform');

			if (transform && transform !== 'none') {
				appliedTransforms = transform + ' ' + appliedTransforms;
			}
			/* jshint boss:true */
		} while (el = el.parentNode);

		if (window.DOMMatrix) {
			return new DOMMatrix(appliedTransforms);
		} else if (window.WebKitCSSMatrix) {
			return new WebKitCSSMatrix(appliedTransforms);
		} else if (window.CSSMatrix) {
			return new CSSMatrix(appliedTransforms);
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(
		sortable, rootEl, name,
		targetEl, toEl, fromEl,
		startIndex, newIndex,
		startDraggableIndex, newDraggableIndex,
		originalEvt
	) {
		sortable = (sortable || rootEl[expando]);
		var evt,
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
		// Support for new CustomEvent feature
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

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		evt.oldDraggableIndex = startDraggableIndex;
		evt.newDraggableIndex = newDraggableIndex;

		evt.originalEvent = originalEvt;
		evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

		if (rootEl) {
			rootEl.dispatchEvent(evt);
		}

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;
		// Support for new CustomEvent feature
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
		evt.relatedRect = targetRect || _getRect(toEl);
		evt.willInsertAfter = willInsertAfter;

		evt.originalEvent = originalEvt;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}

	function _disableDraggable(el) {
		el.draggable = false;
	}

	function _unsilent() {
		_silent = false;
	}

	/**
	 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
	 * and non-draggable elements
	 * @param  {HTMLElement} el       The parent element
	 * @param  {Number} childNum      The index of the child
	 * @param  {Object} options       Parent Sortable's options
	 * @return {HTMLElement}          The child at index childNum, or null if not found
	 */
	function _getChild(el, childNum, options) {
		var currentChild = 0,
			i = 0,
			children = el.children;

		while (i < children.length) {
			if (
				children[i].style.display !== 'none' &&
				children[i] !== ghostEl &&
				children[i] !== dragEl &&
				_closest(children[i], options.draggable, el, false)
			) {
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
	 * @return {HTMLElement}          The last child, ignoring ghostEl
	 */
	function _lastChild(el) {
		var last = el.lastElementChild;

		while (last && (last === ghostEl || _css(last, 'display') === 'none')) {
			last = last.previousElementSibling;
		}

		return last || null;
	}

	function _ghostIsLast(evt, axis, el) {
		var elRect = _getRect(_lastChild(el)),
			mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
			mouseOnOppAxis = axis === 'vertical' ? evt.clientX : evt.clientY,
			targetS2 = axis === 'vertical' ? elRect.bottom : elRect.right,
			targetS1Opp = axis === 'vertical' ? elRect.left : elRect.top,
			targetS2Opp = axis === 'vertical' ? elRect.right : elRect.bottom,
			spacer = 10;

		return (
			axis === 'vertical' ?
				(mouseOnOppAxis > targetS2Opp + spacer || mouseOnOppAxis <= targetS2Opp && mouseOnAxis > targetS2 && mouseOnOppAxis >= targetS1Opp) :
				(mouseOnAxis > targetS2 && mouseOnOppAxis > targetS1Opp || mouseOnAxis <= targetS2 && mouseOnOppAxis > targetS2Opp + spacer)
		);
	}

	function _getSwapDirection(evt, target, axis, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
		var targetRect = _getRect(target),
			mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
			targetLength = axis === 'vertical' ? targetRect.height : targetRect.width,
			targetS1 = axis === 'vertical' ? targetRect.top : targetRect.left,
			targetS2 = axis === 'vertical' ? targetRect.bottom : targetRect.right,
			dragRect = _getRect(dragEl),
			invert = false;


		if (!invertSwap) {
			// Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
			if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) { // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
				// check if past first invert threshold on side opposite of lastDirection
				if (!pastFirstInvertThresh &&
					(lastDirection === 1 ?
						(
							mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2
						) :
						(
							mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2
						)
					)
				)
				{
					// past first invert threshold, do not restrict inverted threshold to dragEl shadow
					pastFirstInvertThresh = true;
				}

				if (!pastFirstInvertThresh) {
					var dragS1 = axis === 'vertical' ? dragRect.top : dragRect.left,
						dragS2 = axis === 'vertical' ? dragRect.bottom : dragRect.right;
					// dragEl shadow (target move distance shadow)
					if (
						lastDirection === 1 ?
						(
							mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
						) :
						(
							mouseOnAxis > targetS2 - targetMoveDistance
						)
					)
					{
						return lastDirection * -1;
					}
				} else {
					invert = true;
				}
			} else {
				// Regular
				if (
					mouseOnAxis > targetS1 + (targetLength * (1 - swapThreshold) / 2) &&
					mouseOnAxis < targetS2 - (targetLength * (1 - swapThreshold) / 2)
				) {
					return _getInsertDirection(target);
				}
			}
		}

		invert = invert || invertSwap;

		if (invert) {
			// Invert of regular
			if (
				mouseOnAxis < targetS1 + (targetLength * invertedSwapThreshold / 2) ||
				mouseOnAxis > targetS2 - (targetLength * invertedSwapThreshold / 2)
			)
			{
				return ((mouseOnAxis > targetS1 + targetLength / 2) ? 1 : -1);
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
		var dragElIndex = _index(dragEl),
			targetIndex = _index(target);

		if (dragElIndex < targetIndex) {
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

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== cloneEl && (!selector || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
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
			} catch(_) {
				return false;
			}
		}

		return false;
	}

	var _throttleTimeout;
	function _throttle(callback, ms) {
		return function () {
			if (!_throttleTimeout) {
				var args = arguments,
					_this = this;

				_throttleTimeout = setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					_throttleTimeout = void 0;
				}, ms);
			}
		};
	}

	function _cancelThrottle() {
		clearTimeout(_throttleTimeout);
		_throttleTimeout = void 0;
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
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
	}


	/**
	 * Returns the "bounding client rect" of given element
	 * @param  {HTMLElement} el                The element whose boundingClientRect is wanted
	 * @param  {[HTMLElement]} container       the parent the element will be placed in
	 * @param  {[Boolean]} adjustForTransform  Whether the rect should compensate for parent's transform
	 * @return {Object}                        The boundingClientRect of el
	 */
	function _getRect(el, adjustForTransform, container, adjustForFixed) {
		if (!el.getBoundingClientRect && el !== win) return;

		var elRect,
			top,
			left,
			bottom,
			right,
			height,
			width;

		if (el !== win && el !== _getWindowScrollingElement()) {
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

		if (adjustForFixed && el !== win) {
			// Adjust for translate()
			container = container || el.parentNode;

			// solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
			// Not needed on <= IE11
			if (!IE11OrLess) {
				do {
					if (container && container.getBoundingClientRect && _css(container, 'transform') !== 'none') {
						var containerRect = container.getBoundingClientRect();

						// Set relative to edges of padding box of container
						top -= containerRect.top + parseInt(_css(container, 'border-top-width'));
						left -= containerRect.left + parseInt(_css(container, 'border-left-width'));
						bottom = top + elRect.height;
						right = left + elRect.width;

						break;
					}
					/* jshint boss:true */
				} while (container = container.parentNode);
			}
		}

		if (adjustForTransform && el !== win) {
			// Adjust for scale()
			var matrix = _matrix(container || el),
				scaleX = matrix && matrix.a,
				scaleY = matrix && matrix.d;

			if (matrix) {
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
	 * Checks if a side of an element is scrolled past a side of it's parents
	 * @param  {HTMLElement}  el       The element who's side being scrolled out of view is in question
	 * @param  {String}       side     Side of the element in question ('top', 'left', 'right', 'bottom')
	 * @return {HTMLElement}           The parent scroll element that the el's side is scrolled past, or null if there is no such element
	 */
	function _isScrolledPast(el, side) {
		var parent = _getParentAutoScrollElement(el, true),
			elSide = _getRect(el)[side];

		/* jshint boss:true */
		while (parent) {
			var parentSide = _getRect(parent)[side],
				visible;

			if (side === 'top' || side === 'left') {
				visible = elSide >= parentSide;
			} else {
				visible = elSide <= parentSide;
			}

			if (!visible) return parent;

			if (parent === _getWindowScrollingElement()) break;

			parent = _getParentAutoScrollElement(parent, false);
		}

		return false;
	}

	/**
	 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
	 * The value is returned in real pixels.
	 * @param  {HTMLElement} el
	 * @return {Array}             Offsets in the format of [left, top]
	 */
	function _getRelativeScrollOffset(el) {
		var offsetLeft = 0,
			offsetTop = 0,
			winScroller = _getWindowScrollingElement();

		if (el) {
			do {
				var matrix = _matrix(el),
					scaleX = matrix.a,
					scaleY = matrix.d;

				offsetLeft += el.scrollLeft * scaleX;
				offsetTop += el.scrollTop * scaleY;
			} while (el !== winScroller && (el = el.parentNode));
		}

		return [offsetLeft, offsetTop];
	}

	// Fixed #973:
	_on(document, 'touchmove', function(evt) {
		if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
			evt.preventDefault();
		}
	});


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el, false);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick,
		detectDirection: _detectDirection,
		getChild: _getChild
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.9.0';
	return Sortable;
});


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
      _c("label", { staticClass: "checkbox" }, [
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
      ]),
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
        disabled: _vm.disabled,
        "multiple-date": _vm.isMultipleDatepicker
      }
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
    { staticClass: "form-group", class: { disabled: _vm.disabled } },
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
        (_vm.value && !_vm.isMultipleUpload) || !_vm.file_from_server
          ? _c(
              "button",
              {
                staticClass: "btn btn-danger btn-md",
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
              [_c("i", { staticClass: "fa fa-remove" })]
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
                return _c("option", { attrs: { selected: "" } }, [
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
        _vm.value &&
        !_vm.hasMultipleFilesValue &&
        _vm.file_from_server &&
        !_vm.isMultiple
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
    { staticClass: "form-group", class: { disabled: _vm.disabled } },
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
          step: _vm.isDecimal ? "0.01" : "",
          placeholder: _vm.field.placeholder || _vm.field_name,
          disabled: _vm.disabled
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
    { staticClass: "form-group radio-group" },
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
      class: { disabled: _vm.disabled || _vm.hasNoFilterValues }
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
      _c("div", { class: { "can-add-select": _vm.canAddRow } }, [
        _c(
          "select",
          {
            ref: "select",
            staticClass: "form-control",
            attrs: {
              disabled: _vm.disabled,
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
                    selected: _vm.hasValue(data[0], _vm.value, _vm.isMultiple),
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
      ]),
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
      _vm.canAddRow && _vm.allowRelation
        ? _c(
            "div",
            {
              staticClass: "modal fade",
              attrs: { id: _vm.getModalId, tabindex: "-1", role: "dialog" }
            },
            [
              _c(
                "div",
                { staticClass: "modal-dialog", attrs: { role: "document" } },
                [
                  _c("div", { staticClass: "modal-content" }, [
                    _vm._m(0),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "modal-body" },
                      [
                        _c("model-builder", {
                          attrs: {
                            langid: _vm.langid,
                            hasparentmodel: _vm.getRelationModelParent,
                            parentrow: _vm.getRelationRow,
                            model_builder: _vm.getRelationModel
                          }
                        })
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
      _vm._v(" "),
      _c("h4", { staticClass: "modal-title" }, [_vm._v(" ")])
    ])
  }
]
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
    { staticClass: "form-group", class: { disabled: _vm.disabled } },
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
          disabled: _vm.disabled
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
    { staticClass: "form-group", class: { disabled: _vm.disabled } },
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
      staticClass: "form",
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
        {
          class: [
            "box",
            { "box-info": _vm.isActive, "box-warning": !_vm.isActive }
          ]
        },
        [
          _c(
            "div",
            {
              staticClass: "box-header with-border",
              class: {
                visible:
                  _vm.hasLocaleFields ||
                  _vm.canShowGettext ||
                  (_vm.isOpenedRow && _vm.model.history)
              },
              attrs: { "data-header": "" }
            },
            [
              _c("h3", { staticClass: "box-title" }, [
                _vm.model.localization
                  ? _c("span", {
                      staticClass: "fa fa-globe",
                      attrs: {
                        "data-toggle": "tooltip",
                        "data-original-title": _vm.trans("multilanguages")
                      }
                    })
                  : _vm._e(),
                _vm._v(" " + _vm._s(_vm.title))
              ]),
              _vm._v(" "),
              _vm.isOpenedRow && _vm.canShowGettext
                ? _c(
                    "button",
                    {
                      staticClass:
                        "add-row-btn pull-right btn btn-default btn-sm",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.openGettextEditor()
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fa fa-globe" }),
                      _vm._v(" " + _vm._s(_vm.trans("gettext-open")))
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.isOpenedRow && _vm.canaddrow && !_vm.model.isSingle()
                ? _c(
                    "button",
                    {
                      staticClass:
                        "add-row-btn pull-right btn btn-default btn-sm",
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
                      _vm._v(" " + _vm._s(_vm.newRowTitle))
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.isOpenedRow && _vm.model.history && _vm.model.isSingle()
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-default",
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
                      _vm._v(" " + _vm._s(_vm.trans("history.show")))
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.getComponents("form-header"), function(name) {
                return _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
                })
              }),
              _vm._v(" "),
              _vm.hasLocaleFields && _vm.selectedLanguage
                ? _c(
                    "div",
                    {
                      staticClass: "dropdown pull-right multi-languages",
                      attrs: { "data-form-language-switch": "" }
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default dropdown-toggle",
                          attrs: {
                            type: "button",
                            id: "languageDropdown",
                            "data-toggle": "dropdown",
                            "aria-haspopup": "true",
                            "aria-expanded": "true"
                          }
                        },
                        [
                          _c("i", { staticClass: "fa fa-globe" }),
                          _vm._v(" "),
                          _c("span", { staticClass: "text" }, [
                            _vm._v(
                              _vm._s(_vm.getLangName(_vm.selectedLanguage))
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "caret" })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "ul",
                        {
                          staticClass: "dropdown-menu",
                          attrs: { "aria-labelledby": "languageDropdown" }
                        },
                        _vm._l(_vm.languages, function(lang) {
                          return _vm.selectedLanguage.id != lang.id
                            ? _c("li", { attrs: { "data-slug": lang.slug } }, [
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
                                    _c("i", {
                                      staticClass: "fa fa-exclamation-triangle"
                                    }),
                                    _vm._v(
                                      _vm._s(_vm.getLangName(lang)) +
                                        "\n                        "
                                    )
                                  ]
                                )
                              ])
                            : _vm._e()
                        }),
                        0
                      )
                    ]
                  )
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "box-body", class: { cantadd: !_vm.cansave } },
            [
              _vm._l(_vm.getAdditionalFormData, function(value, key) {
                return _c("input", {
                  attrs: { type: "hidden", name: key },
                  domProps: { value: value }
                })
              }),
              _vm._v(" "),
              _vm._l(_vm.getComponents("form-top"), function(name) {
                return _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
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
                  history: _vm.history
                }
              }),
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
                          class: [
                            "btn",
                            "btn-" + (_vm.isOpenedRow ? "success" : "primary")
                          ],
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
                              _vm.isOpenedRow ? _vm.saveButton : _vm.sendButton
                            )
                          )
                        ]
                      )
                    : _vm._e()
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
      staticClass: "fields-group",
      class: _vm.getGroupClass(_vm.group),
      attrs: {
        "group-id": _vm.group.id,
        "data-fields": _vm.visibleFields.length
      }
    },
    [
      _c(
        "div",
        { class: { "nav-tabs-custom": _vm.canShowGroupName(_vm.group) } },
        [
          _vm.canShowGroupName(_vm.group)
            ? _c("h4", [
                _vm.group.icon
                  ? _c("i", { class: ["fa", _vm.group.icon] })
                  : _vm._e(),
                _vm._v(" "),
                _c("span", { domProps: { innerHTML: _vm._s(_vm.group.name) } })
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "tab-content" }, [
            _c(
              "div",
              { staticClass: "row" },
              [
                _vm.hasTabs(_vm.group.fields)
                  ? _c(
                      "div",
                      { staticClass: "col-lg-12" },
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
                    "div",
                    [
                      _vm._l(
                        _vm.getFieldLangs(_vm.model.fields[item]),
                        function(langslug) {
                          return _vm.isField(item) &&
                            _vm.canRenderField(_vm.model.fields[item])
                            ? _c(
                                "div",
                                {
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
                                  staticClass: "col-lg-12"
                                },
                                [
                                  _c("form-input-builder", {
                                    key: item,
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
                                ],
                                1
                              )
                            : _vm._e()
                        }
                      ),
                      _vm._v(" "),
                      _vm.isGroup(item) && !_vm.isTab(item)
                        ? _c("form-group", {
                            attrs: {
                              group: item,
                              model: _vm.model,
                              row: _vm.row,
                              hasparentmodel: _vm.hasparentmodel,
                              history: _vm.history,
                              depth_level: _vm.depth_level
                            }
                          })
                        : _vm._e()
                    ],
                    2
                  )
                })
              ],
              2
            )
          ])
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
    return _c("div", { staticClass: "col-md-12" }, [
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
      class: { "is-changed-from-history": _vm.isChangedFromHistory },
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
      _vm.hasComponent
        ? _c(_vm.componentName, {
            tag: "component",
            attrs: {
              model: _vm.model,
              field: _vm.field,
              history_changed: _vm.isChangedFromHistory,
              row: _vm.row,
              field_key: _vm.field_key
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
  return _c(
    "div",
    { staticClass: "nav-tabs-custom", class: { default: _vm.hasNoTabs } },
    [
      _c(
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
                  class: {
                    active: _vm.activetab == $index,
                    "model-tab": _vm.isModel(tab)
                  },
                  attrs: {
                    "data-tabs": "",
                    "data-depth": _vm.depth_level,
                    "default-tab":
                      _vm.isModel(tab) && _vm.getModel(tab.model) ? false : "",
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
                      attrs: { "data-toggle": "tab", "aria-expanded": "true" }
                    },
                    [
                      _vm.getTabIcon(tab)
                        ? _c("i", { class: ["fa", _vm.getTabIcon(tab)] })
                        : _vm._e(),
                      _vm._v(
                        " " +
                          _vm._s(
                            _vm.getTabName(tab) || _vm.trans("general-tab")
                          )
                      )
                    ]
                  )
                ]
              )
            : _vm._e()
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tab-content" },
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
                      : ""
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
                                      "data-model": _vm.getModel(tab.model)
                                        .table,
                                      langid: _vm.langid,
                                      ischild: true,
                                      model_builder: _vm.getModel(tab.model),
                                      activetab: _vm.isLoadedModel(
                                        _vm.getModel(tab.model),
                                        $index
                                      ),
                                      parentrow: _vm.row
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.chunkGroups(tab.fields), function(
                        item,
                        $index
                      ) {
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
    ]
  )
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
    ? _c(
        "section",
        { staticClass: "content", staticStyle: { "min-height": "auto" } },
        [
          _c("div", { staticClass: "callout callout-warning" }, [
            _vm._m(0),
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
              _vm._v(
                "\n        Z dôvodu lepšej stability odporúčame spustiť príkaz "
              ),
              _c("strong", [_vm._v("php artisan admin:update")]),
              _vm._v(" pre synchronizáciu vendor priečinkov.")
            ])
          ])
        ]
      )
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", [
      _c("i", { staticClass: "icon fa fa-warning" }),
      _vm._v(" Oooops!")
    ])
  }
]
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
  return _c("div", { staticClass: "gettext-table modal-open" }, [
    _c("div", { staticClass: "example-modal" }, [
      _c(
        "div",
        {
          staticClass: "modal modal-default",
          staticStyle: { display: "block" }
        },
        [
          _c("div", { staticClass: "modal-dialog" }, [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header" }, [
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
                ),
                _vm._v(" "),
                _c("h4", { staticClass: "modal-title" }, [
                  _vm._v(
                    _vm._s(_vm.trans("gettext-update")) +
                      " - " +
                      _vm._s(_vm.gettext_editor.name)
                  )
                ])
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
                                    long:
                                      _vm.getValue(values, i - 1).length > 80
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
                    attrs: { type: "button" },
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
  return _c("div", { staticClass: "history-table" }, [
    _c("div", { staticClass: "example-modal" }, [
      _c(
        "div",
        {
          staticClass: "modal modal-default",
          staticStyle: { display: "block" }
        },
        [
          _c("div", { staticClass: "modal-dialog" }, [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header" }, [
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
                ),
                _vm._v(" "),
                _c("h4", { staticClass: "modal-title" }, [
                  _vm._v(_vm._s(_vm.trans("history.changes")))
                ])
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
                          { attrs: { "data-history-id": item.id } },
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
                                    "data-original-title": _vm.changedFields(
                                      item
                                    )
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
                            _c("td", [
                              _vm._v(_vm._s(_vm.date(item.created_at)))
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _c("div", [
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
                                      title: _vm.trans("history.show"),
                                      "data-original-title": _vm.trans(
                                        "history.show-changes"
                                      )
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.applyChanges(item)
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "fa fa-eye" })]
                                )
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
    ? _c(
        "section",
        { staticClass: "content", staticStyle: { "min-height": "auto" } },
        [
          _c("div", { staticClass: "callout callout-danger" }, [
            _c("h4", [
              _c("i", { staticClass: "icon fa fa-warning" }),
              _vm._v(" " + _vm._s(_vm.message.title))
            ]),
            _vm._v(" "),
            _c("p", { domProps: { innerHTML: _vm._s(_vm.message.message) } })
          ])
        ]
      )
    : _vm._e()
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
  return _c("div", { staticClass: "overlay" }, [
    _c("i", { staticClass: "fa fa-refresh fa-spin" }),
    _vm._v(" "),
    _c("p", [_vm._v(_vm._s(_vm.trans("loading")))])
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
    { staticClass: "box" },
    [
      _c(
        "div",
        { staticClass: "box-header box-limit" },
        [
          _c("h3", { staticClass: "box-title" }, [
            _vm._v(_vm._s(_vm.title) + " "),
            _c("small", [_vm._v("(" + _vm._s(_vm.rows.count) + ")")])
          ]),
          _vm._v(" "),
          _vm.isPaginationEnabled
            ? _c(
                "div",
                {
                  staticClass: "form-group pull-right",
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
                    _vm._l(_vm.pagination.limits, function(count) {
                      return _c("option", [_vm._v(_vm._s(count))])
                    }),
                    0
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "dropdown fields-list",
              attrs: { "fields-list": "" }
            },
            [
              _c(
                "button",
                {
                  staticClass: "btn btn-default dropdown-toggle",
                  attrs: {
                    type: "button",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "true"
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.trans("rows-list")) +
                      "\n                "
                  ),
                  _c("span", { staticClass: "caret" })
                ]
              ),
              _vm._v(" "),
              _c(
                "ul",
                { staticClass: "dropdown-menu menu-left dropdown-menu-right" },
                [
                  _vm._l(_vm.enabled_columns, function(column, key) {
                    return _vm.canShowColumn(column, key)
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function($event) {
                                return $event.stopPropagation()
                              }
                            }
                          },
                          [
                            _c("label", [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: column.enabled,
                                    expression: "column.enabled"
                                  }
                                ],
                                attrs: { type: "checkbox", "data-column": key },
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
                                " " + _vm._s(_vm.columnName(key, column.name))
                              )
                            ])
                          ]
                        )
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _c("li", {
                    staticClass: "divider",
                    attrs: { role: "separator" }
                  }),
                  _vm._v(" "),
                  _c("li", [
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
          _vm.checked.length > 0
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
                      staticClass: "btn btn-default dropdown-toggle",
                      attrs: {
                        type: "button",
                        "data-toggle": "dropdown",
                        "aria-haspopup": "true",
                        "aria-expanded": "true"
                      }
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.trans("action")) +
                          "\n                "
                      ),
                      _c("span", { staticClass: "caret" })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "ul",
                    {
                      staticClass: "dropdown-menu menu-left dropdown-menu-right"
                    },
                    [
                      _vm.model.deletable
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
                                _c("i", { staticClass: "fa fa-remove" }),
                                _vm._v(" " + _vm._s(_vm.trans("delete")))
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.model.publishable
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
                                  return _vm.buttonAction(button_key, button)
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
        { staticClass: "box-body box-table-body" },
        [
          _c("table-rows", {
            attrs: {
              model: _vm.model,
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
      (_vm.isPaginationEnabled && _vm.rows.count > _vm.pagination.limit) ||
      _vm.getComponents("table-footer").length > 0
        ? _c(
            "div",
            { staticClass: "box-footer" },
            [
              _vm._l(_vm.getComponents("table-footer"), function(name) {
                return _c(name, {
                  key: name,
                  tag: "component",
                  attrs: { model: _vm.model, row: _vm.row, rows: _vm.rows.data }
                })
              }),
              _vm._v(" "),
              _vm.isPaginationEnabled && _vm.rows.count > _vm.pagination.limit
                ? _c(
                    "ul",
                    {
                      staticClass:
                        "pagination pagination-sm no-margin pull-right",
                      attrs: { "data-pagination": "" }
                    },
                    [
                      _vm.pagination.position > 1
                        ? _c("li", { attrs: { "data-pagination-prev": "" } }, [
                            _c(
                              "a",
                              {
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.setPosition(
                                      _vm.pagination.position - 1
                                    )
                                  }
                                }
                              },
                              [_vm._v("«")]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(
                        Math.ceil(_vm.rows.count / _vm.pagination.limit),
                        function(i) {
                          return _vm.showLimit(i)
                            ? _c(
                                "li",
                                {
                                  class: {
                                    active: _vm.pagination.position == i
                                  }
                                },
                                [
                                  _c(
                                    "a",
                                    {
                                      attrs: { href: "#" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.setPosition(i)
                                        }
                                      }
                                    },
                                    [_vm._v(_vm._s(i))]
                                  )
                                ]
                              )
                            : _vm._e()
                        }
                      ),
                      _vm._v(" "),
                      _vm.pagination.position <
                      _vm.rows.count / _vm.pagination.limit
                        ? _c("li", { attrs: { "data-pagination-next": "" } }, [
                            _c(
                              "a",
                              {
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.setPosition(
                                      _vm.pagination.position + 1
                                    )
                                  }
                                }
                              },
                              [_vm._v("»")]
                            )
                          ])
                        : _vm._e()
                    ],
                    2
                  )
                : _vm._e()
            ],
            2
          )
        : _vm._e(),
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
  return _vm.fieldValue != null
    ? _c("div", [
        _vm.isFile(_vm.field)
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
                "data-toggle": _vm.fieldValue.length > 20 ? "tooltip" : "",
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
  return _c("div", [
    _c(
      "table",
      {
        class: [
          "table",
          "data-table",
          "table-bordered",
          "table-striped",
          { sortable: _vm.model.sortable && _vm.orderby[0] == "_order" }
        ],
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
              _vm.multipleCheckbox
                ? _c("th", { on: { click: _vm.toggleAllCheckboxes } }, [
                    _c("i", {
                      staticClass: "fa",
                      class: _vm.isCheckedAll
                        ? "fa-check-square-o"
                        : "fa-square-o",
                      attrs: {
                        "data-toggle": "tooltip",
                        "data-original-title": _vm.trans(
                          _vm.isCheckedAll ? "uncheck-all" : "check-all"
                        )
                      }
                    })
                  ])
                : _vm._e(),
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
                      ? _c("i", { staticClass: "arrow-sorting fa fa-arrow-up" })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.orderby[0] == field && _vm.orderby[1] == 1
                      ? _c("i", {
                          staticClass: "arrow-sorting fa fa-arrow-down"
                        })
                      : _vm._e(),
                    _vm._v(
                      "\n                    " +
                        _vm._s(name) +
                        "\n                "
                    )
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
              { key: item.id, attrs: { "data-id": item.id } },
              [
                _vm.multipleCheckbox
                  ? _c("td", { staticClass: "checkbox-td" }, [
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
                            domProps: {
                              checked: _vm.checked.indexOf(item.id) > -1
                            }
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "checkmark" })
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm._l(_vm.columns, function(name, field) {
                  return _c(
                    "td",
                    {
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
                      ? _c("div", [
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
                                "data-original-title": _vm.trans("edit")
                              },
                              on: {
                                click: function($event) {
                                  return _vm.selectRow(item)
                                }
                              }
                            },
                            [_c("i", { staticClass: "fa fa-pencil" })]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isEnabledHistory
                      ? _c("div", [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-sm btn-default",
                              class: {
                                "enabled-history":
                                  _vm.isActiveRow(item) &&
                                  _vm.history.history_id
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
                      ? _c("div", [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-sm btn-default",
                              attrs: {
                                "data-button": "gettext",
                                type: "button",
                                "data-toggle": "tooltip",
                                title: "",
                                "data-original-title": _vm.trans(
                                  "gettext-update"
                                )
                              },
                              on: {
                                click: function($event) {
                                  return _vm.openGettextEditor(item)
                                }
                              }
                            },
                            [_c("i", { staticClass: "fa fa-globe" })]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", [
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
                        [_c("i", { staticClass: "fa fa-info" })]
                      )
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.getButtonsForRow(item), function(
                      button,
                      button_key
                    ) {
                      return _c("div", [
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
                                return _vm.buttonAction(
                                  button_key,
                                  button,
                                  item
                                )
                              }
                            }
                          },
                          [
                            _c("i", {
                              class: [
                                "fa",
                                _vm.button_loading ==
                                _vm.getButtonKey(item.id, button_key)
                                  ? "fa-refresh"
                                  : button.icon,
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
                    _vm.model.publishable
                      ? _c("div", [
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
                    _vm.model.deletable && _vm.count > _vm.model.minimum
                      ? _c("div", [
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
                            [_c("i", { staticClass: "fa fa-remove" })]
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
  ])
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
    _c("ul", { staticClass: "sidebar-menu" }, [
      _c("li", { staticClass: "header" }, [
        _vm._v(
          "\n            " +
            _vm._s(
              _vm.hasLanguages && _vm.isActive
                ? _vm.trans("language-mutation")
                : _vm.trans("navigation")
            ) +
            "\n            "
        ),
        _vm.hasLanguages && _vm.isActive
          ? _c(
              "div",
              {
                staticClass: "form-group language_select",
                attrs: {
                  "data-toggle": "tooltip",
                  title: "",
                  "data-original-title": _vm.trans("change-language")
                }
              },
              [
                _c(
                  "select",
                  {
                    staticClass: "form-control",
                    attrs: { "data-global-language-switch": "" },
                    on: { change: _vm.changeLanguage }
                  },
                  _vm._l(_vm.languages, function(language) {
                    return _c(
                      "option",
                      {
                        domProps: {
                          selected: _vm.langid == language.id,
                          value: language.id
                        }
                      },
                      [_vm._v(_vm._s(_vm.getLangName(language)))]
                    )
                  }),
                  0
                )
              ]
            )
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "sidebar-menu" },
      _vm._l(_vm.groups, function(row, key) {
        return _c("sidebar-row", { key: key, attrs: { row: row } })
      }),
      1
    )
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
              _c("a", [
                _c("i", { class: ["fa", _vm.row.icon] }),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.row.name))]),
                _vm._v(" "),
                _vm.hasSubmenu
                  ? _c("i", { staticClass: "fa fa-angle-left pull-right" })
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
            { staticClass: "treeview", attrs: { "data-slug": _vm.row.slug } },
            [
              _c("a", [
                _c("i", {
                  staticClass: "fa",
                  class: _vm.row.icon || "fa-folder-open-o"
                }),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.row.name))]),
                _vm._v(" "),
                _vm.hasSubmenu
                  ? _c("i", { staticClass: "fa fa-angle-left pull-right" })
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
          _c("h1", [
            _vm._v(
              "\n            " + _vm._s(_vm.model.name) + "\n            "
            ),
            _c("small", { domProps: { innerHTML: _vm._s(_vm.model.title) } })
          ]),
          _vm._v(" "),
          _c("ol", { staticClass: "breadcrumb" }, [
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [
                _c("i", { staticClass: "fa fa-dashboard" }),
                _vm._v(" " + _vm._s(_vm.trans("admin")))
              ])
            ]),
            _vm._v(" "),
            _vm.getGroup
              ? _c("li", [_vm._v(_vm._s(_vm.getGroup.name))])
              : _vm._e(),
            _vm._v(" "),
            _c("li", { staticClass: "active" }, [
              _c("a", { staticClass: "active" }, [
                _c("i", { class: ["fa", _vm.model.icon] }),
                _vm._v(" " + _vm._s(_vm.model.name))
              ])
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.model
      ? _c(
          "section",
          { staticClass: "content" },
          [
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
    _c("section", { staticClass: "content-header" }, [
      _c("h1", [
        _vm._v("\n            Dashboard\n            "),
        _c("small", [_vm._v(_vm._s(_vm.trans("welcome-in-admin")))])
      ]),
      _vm._v(" "),
      _c("ol", { staticClass: "breadcrumb" }, [
        _c("li", [
          _c("a", { attrs: { href: "#" } }, [
            _c("i", { staticClass: "fa fa-dashboard" }),
            _vm._v(" " + _vm._s(_vm.trans("admin")))
          ])
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "active" }, [_vm._v("Dashboard")])
      ])
    ]),
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
        staticClass: "content"
      },
      [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c("div", { staticClass: "box box-info" }, [
              _c("div", { staticClass: "box-body" }, [
                !_vm.layout && _vm.user
                  ? _c("h2", [
                      _vm._v(
                        _vm._s(_vm.trans("welcome")) +
                          " " +
                          _vm._s(_vm.user.username)
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { domProps: { innerHTML: _vm._s(_vm.layout) } })
              ])
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
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value:
                _vm.canShowForm ||
                ((_vm.hasRows && _vm.canShowRows) || _vm.isSearching),
              expression:
                "canShowForm || (hasRows && canShowRows || isSearching)"
            }
          ],
          class: [
            "box",
            {
              "single-mode": _vm.model.isSingle(),
              "is-in-parent": _vm.model.isInParent(),
              "box-warning": _vm.model.isSingle()
            }
          ],
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
                  value:
                    (_vm.ischild &&
                      (!_vm.model.in_tab ||
                        _vm.isEnabledGrid ||
                        _vm.canShowSearchBar)) ||
                    (!_vm.model.isSingle() &&
                      (_vm.isEnabledGrid || _vm.canShowSearchBar)),
                  expression:
                    "ischild && (!model.in_tab || isEnabledGrid || canShowSearchBar) || ( !model.isSingle() && (isEnabledGrid || canShowSearchBar))"
                }
              ],
              staticClass: "box-header",
              class: { "with-border": _vm.model.isSingle() }
            },
            [
              _vm.ischild
                ? _c("h3", { staticClass: "box-title" }, [
                    _vm._v(_vm._s(_vm.model.name))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.model.title && _vm.ischild
                ? _c("span", {
                    staticClass: "model-info",
                    domProps: { innerHTML: _vm._s(_vm.model.title) }
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.model.isSingle()
                ? _c("div", { staticClass: "pull-right" }, [
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
                        class: { interval: _vm.search.interval },
                        attrs: { "data-search-bar": "", id: _vm.getFilterId }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "input-group input-group-sm" },
                          [
                            _c("div", { staticClass: "input-group-btn" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-default dropdown-toggle",
                                  attrs: {
                                    type: "button",
                                    "data-toggle": "dropdown",
                                    "aria-expanded": "false"
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.getSearchingColumnName(
                                        _vm.search.column
                                      )
                                    ) + "\n                                "
                                  ),
                                  _c("span", { staticClass: "caret" })
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
                                      attrs: { "data-field": "" }
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          attrs: { href: "#" },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              _vm.search.column = null
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.trans("search-all"))
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "li",
                                    {
                                      class: {
                                        active: _vm.search.column == "id"
                                      },
                                      attrs: { "data-field": "id" }
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          attrs: { href: "#" },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              _vm.search.column = "id"
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.getSearchingColumnName("id")
                                            )
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm._l(_vm.getSearchableFields, function(
                                    key
                                  ) {
                                    return _c(
                                      "li",
                                      {
                                        class: {
                                          active: _vm.search.column == key
                                        },
                                        attrs: { "data-field": key }
                                      },
                                      [
                                        _c(
                                          "a",
                                          {
                                            attrs: { href: "#" },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                _vm.search.column = key
                                              }
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.getSearchingColumnName(key)
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "li",
                                    {
                                      class: {
                                        active:
                                          _vm.search.column == "created_at"
                                      },
                                      attrs: { "data-field": "created_at" }
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          attrs: { href: "#" },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              _vm.search.column = "created_at"
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.getSearchingColumnName(
                                                "created_at"
                                              )
                                            )
                                          )
                                        ]
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
                                    staticClass: "interval",
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
                                          staticClass: "fa fa-arrows-h"
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
                                "data-search-interval-text": "",
                                placeholder: _vm.trans("search") + "..."
                              },
                              on: {
                                input: function($event) {
                                  return _vm.updateSearchQuery(
                                    "query_to",
                                    $event
                                  )
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
                                "data-search-interval-date": "",
                                readonly: ""
                              }
                            }),
                            _vm._v(" "),
                            _vm.search.query || _vm.search.query_to
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
                                        on: {
                                          click: function($event) {
                                            return _vm.resetInerval()
                                          }
                                        }
                                      },
                                      [_c("i", { staticClass: "fa fa-times" })]
                                    )
                                  ]
                                )
                              : _vm._e()
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm.isEnabledGrid
                      ? _c(
                          "ul",
                          {
                            staticClass: "pagination pagination-sm no-margin",
                            attrs: {
                              "data-toggle": "tooltip",
                              "data-original-title": _vm.trans("edit-size")
                            }
                          },
                          _vm._l(_vm.sizes, function(size) {
                            return _c(
                              "li",
                              {
                                class: {
                                  active: size.active,
                                  disabled: size.disabled
                                },
                                attrs: { "data-size": size.key }
                              },
                              [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "#", title: "" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.changeSize(size)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(size.name))]
                                )
                              ]
                            )
                          }),
                          0
                        )
                      : _vm._e()
                  ])
                : _vm._e()
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "box-body" },
            [
              _c(
                "div",
                { class: { row: true, "flex-table": _vm.activeSize == 0 } },
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
                          staticClass: "col col-form col-md-12 col-sm-12",
                          class: ["col-lg-" + (12 - _vm.activeSize)]
                        },
                        [
                          _c("form-builder", {
                            attrs: {
                              progress: _vm.progress,
                              rows: _vm.rows,
                              history: _vm.history,
                              model: _vm.model,
                              langid: _vm.selected_language_id
                                ? _vm.selected_language_id
                                : _vm.langid,
                              selectedlangid: _vm.selected_language_id,
                              canaddrow: _vm.canAddRow,
                              hasparentmodel: _vm.hasparentmodelMutated,
                              gettext_editor: _vm.gettext_editor,
                              depth_level: _vm.depth_level,
                              row: _vm.row
                            },
                            on: {
                              "update:progress": function($event) {
                                _vm.progress = $event
                              },
                              "update:rows": function($event) {
                                _vm.rows = $event
                              },
                              "update:selectedlangid": function($event) {
                                _vm.selected_language_id = $event
                              },
                              "update:gettext_editor": function($event) {
                                _vm.gettext_editor = $event
                              },
                              "update:row": function($event) {
                                _vm.row = $event
                              }
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
                          value: _vm.hasRows && _vm.canShowRows,
                          expression: "hasRows && canShowRows"
                        }
                      ],
                      staticClass: "col col-rows col-md-12 col-sm-12",
                      class: ["col-lg-" + (12 - (12 - _vm.activeSize))]
                    },
                    [
                      _c("model-rows-builder", {
                        attrs: {
                          model: _vm.model,
                          rows: _vm.rows,
                          row: _vm.row,
                          langid: _vm.selected_language_id
                            ? _vm.selected_language_id
                            : _vm.langid,
                          progress: _vm.progress,
                          search: _vm.search,
                          iswithoutparent: _vm.isWithoutParentRow,
                          activetab: _vm.activetab,
                          gettext_editor: _vm.gettext_editor,
                          depth_level: _vm.depth_level,
                          history: _vm.history
                        },
                        on: {
                          "update:model": function($event) {
                            _vm.model = $event
                          },
                          "update:rows": function($event) {
                            _vm.rows = $event
                          },
                          "update:row": function($event) {
                            _vm.row = $event
                          },
                          "update:progress": function($event) {
                            _vm.progress = $event
                          },
                          "update:gettext_editor": function($event) {
                            _vm.gettext_editor = $event
                          }
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
        ? _c("history", { attrs: { history: _vm.history } })
        : _vm._e(),
      _vm._v(" "),
      _vm.gettext_editor
        ? _c("gettext-extension", {
            attrs: { gettext_editor: _vm.gettext_editor },
            on: {
              "update:gettext_editor": function($event) {
                _vm.gettext_editor = $event
              }
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

/***/ "./src/Resources/admin/dist/js/app.min.js":
/*!************************************************!*\
  !*** ./src/Resources/admin/dist/js/app.min.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.2
 * @license MIT <http://opensource.org/licenses/MIT>
 */
function _init() {
  "use strict";

  $.AdminLTE.layout = {
    activate: function activate() {
      var a = this;
      a.fix(), a.fixSidebar(), $(window, ".wrapper").resize(function () {
        a.fix(), a.fixSidebar();
      });
    },
    fix: function fix() {
      var a = $(".main-header").outerHeight() + $(".main-footer").outerHeight(),
          b = $(window).height(),
          c = $(".sidebar").height();
      if ($("body").hasClass("fixed")) $(".content-wrapper, .right-side").css("min-height", b - $(".main-footer").outerHeight());else {
        var d;
        b >= c ? ($(".content-wrapper, .right-side").css("min-height", b - a), d = b - a) : ($(".content-wrapper, .right-side").css("min-height", c), d = c);
        var e = $($.AdminLTE.options.controlSidebarOptions.selector);
        "undefined" != typeof e && e.height() > d && $(".content-wrapper, .right-side").css("min-height", e.height());
      }
    },
    fixSidebar: function fixSidebar() {
      return $("body").hasClass("fixed") ? ("undefined" == typeof $.fn.slimScroll && window.console && window.console.error("Error: the fixed layout requires the slimscroll plugin!"), void ($.AdminLTE.options.sidebarSlimScroll && "undefined" != typeof $.fn.slimScroll && ($(".sidebar").slimScroll({
        destroy: !0
      }).height("auto"), $(".sidebar").slimscroll({
        height: $(window).height() - $(".main-header").height() + "px",
        color: "rgba(0,0,0,0.2)",
        size: "3px"
      })))) : void ("undefined" != typeof $.fn.slimScroll && $(".sidebar").slimScroll({
        destroy: !0
      }).height("auto"));
    }
  }, $.AdminLTE.pushMenu = {
    activate: function activate(a) {
      var b = $.AdminLTE.options.screenSizes;
      $(document).on("click", a, function (a) {
        a.preventDefault(), $(window).width() > b.sm - 1 ? $("body").hasClass("sidebar-collapse") ? $("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu") : $("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu") : $("body").hasClass("sidebar-open") ? $("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu") : $("body").addClass("sidebar-open").trigger("expanded.pushMenu");
      }), $(".content-wrapper").click(function () {
        $(window).width() <= b.sm - 1 && $("body").hasClass("sidebar-open") && $("body").removeClass("sidebar-open");
      }), ($.AdminLTE.options.sidebarExpandOnHover || $("body").hasClass("fixed") && $("body").hasClass("sidebar-mini")) && this.expandOnHover();
    },
    expandOnHover: function expandOnHover() {
      var a = this,
          b = $.AdminLTE.options.screenSizes.sm - 1;
      $(".main-sidebar").hover(function () {
        $("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-collapse") && $(window).width() > b && a.expand();
      }, function () {
        $("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-expanded-on-hover") && $(window).width() > b && a.collapse();
      });
    },
    expand: function expand() {
      $("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover");
    },
    collapse: function collapse() {
      $("body").hasClass("sidebar-expanded-on-hover") && $("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse");
    }
  }, $.AdminLTE.tree = function (a) {
    var b = this,
        c = $.AdminLTE.options.animationSpeed;
    $(a).on("click", "li a", function (a) {
      var d = $(this),
          e = d.next();
      if (e.is(".treeview-menu") && e.is(":visible") && !$("body").hasClass("sidebar-collapse")) e.slideUp(c, function () {
        e.removeClass("menu-open");
      }), e.parent("li").removeClass("active");else if (e.is(".treeview-menu") && !e.is(":visible")) {
        var f = d.parents("ul").first(),
            g = f.find("ul:visible").slideUp(c);
        g.removeClass("menu-open");
        var h = d.parent("li");
        e.slideDown(c, function () {
          e.addClass("menu-open"), f.find("li.active").removeClass("active"), h.addClass("active"), b.layout.fix();
        });
      }
      e.is(".treeview-menu") && a.preventDefault();
    });
  }, $.AdminLTE.controlSidebar = {
    activate: function activate() {
      var a = this,
          b = $.AdminLTE.options.controlSidebarOptions,
          c = $(b.selector),
          d = $(b.toggleBtnSelector);
      d.on("click", function (d) {
        d.preventDefault(), c.hasClass("control-sidebar-open") || $("body").hasClass("control-sidebar-open") ? a.close(c, b.slide) : a.open(c, b.slide);
      });
      var e = $(".control-sidebar-bg");
      a._fix(e), $("body").hasClass("fixed") ? a._fixForFixed(c) : $(".content-wrapper, .right-side").height() < c.height() && a._fixForContent(c);
    },
    open: function open(a, b) {
      b ? a.addClass("control-sidebar-open") : $("body").addClass("control-sidebar-open");
    },
    close: function close(a, b) {
      b ? a.removeClass("control-sidebar-open") : $("body").removeClass("control-sidebar-open");
    },
    _fix: function _fix(a) {
      var b = this;
      $("body").hasClass("layout-boxed") ? (a.css("position", "absolute"), a.height($(".wrapper").height()), $(window).resize(function () {
        b._fix(a);
      })) : a.css({
        position: "fixed",
        height: "auto"
      });
    },
    _fixForFixed: function _fixForFixed(a) {
      a.css({
        position: "fixed",
        "max-height": "100%",
        overflow: "auto",
        "padding-bottom": "50px"
      });
    },
    _fixForContent: function _fixForContent(a) {
      $(".content-wrapper, .right-side").css("min-height", a.height());
    }
  }, $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function activate(a) {
      var b = this;
      a || (a = document), $(a).on("click", b.selectors.collapse, function (a) {
        a.preventDefault(), b.collapse($(this));
      }), $(a).on("click", b.selectors.remove, function (a) {
        a.preventDefault(), b.remove($(this));
      });
    },
    collapse: function collapse(a) {
      var b = this,
          c = a.parents(".box").first(),
          d = c.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      c.hasClass("collapsed-box") ? (a.children(":first").removeClass(b.icons.open).addClass(b.icons.collapse), d.slideDown(b.animationSpeed, function () {
        c.removeClass("collapsed-box");
      })) : (a.children(":first").removeClass(b.icons.collapse).addClass(b.icons.open), d.slideUp(b.animationSpeed, function () {
        c.addClass("collapsed-box");
      }));
    },
    remove: function remove(a) {
      var b = a.parents(".box").first();
      b.slideUp(this.animationSpeed);
    }
  };
}

if ("undefined" == typeof jQuery) throw new Error("AdminLTE requires jQuery");
$.AdminLTE = {}, $.AdminLTE.options = {
  navbarMenuSlimscroll: !0,
  navbarMenuSlimscrollWidth: "3px",
  navbarMenuHeight: "200px",
  animationSpeed: 500,
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  sidebarPushMenu: !0,
  sidebarSlimScroll: !0,
  sidebarExpandOnHover: !1,
  enableBoxRefresh: !0,
  enableBSToppltip: !0,
  BSTooltipSelector: "[data-toggle='tooltip']",
  enableFastclick: !0,
  enableControlSidebar: !0,
  controlSidebarOptions: {
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    selector: ".control-sidebar",
    slide: !0
  },
  enableBoxWidget: !0,
  boxWidgetOptions: {
    boxWidgetIcons: {
      collapse: "fa-minus",
      open: "fa-plus",
      remove: "fa-times"
    },
    boxWidgetSelectors: {
      remove: '[data-widget="remove"]',
      collapse: '[data-widget="collapse"]'
    }
  },
  directChat: {
    enable: !0,
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
}, $(function () {
  "use strict";

  $("body").removeClass("hold-transition"), "undefined" != typeof AdminLTEOptions && $.extend(!0, $.AdminLTE.options, AdminLTEOptions);
  var a = $.AdminLTE.options;
  _init(), $.AdminLTE.layout.activate(), $.AdminLTE.tree(".sidebar"), a.enableControlSidebar && $.AdminLTE.controlSidebar.activate(), a.navbarMenuSlimscroll && "undefined" != typeof $.fn.slimscroll && $(".navbar .menu").slimscroll({
    height: a.navbarMenuHeight,
    alwaysVisible: !1,
    size: a.navbarMenuSlimscrollWidth
  }).css("width", "100%"), a.sidebarPushMenu && $.AdminLTE.pushMenu.activate(a.sidebarToggleSelector), a.enableBSToppltip && $("body").tooltip({
    selector: a.BSTooltipSelector
  }), a.enableBoxWidget && $.AdminLTE.boxWidget.activate(), a.enableFastclick && "undefined" != typeof FastClick && FastClick.attach(document.body), a.directChat.enable && $(document).on("click", a.directChat.contactToggleSelector, function () {
    var a = $(this).parents(".direct-chat").first();
    a.toggleClass("direct-chat-contacts-open");
  }), $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var a = $(this);
    $(this).find(".btn").on("click", function (b) {
      a.find(".btn.active").removeClass("active"), $(this).addClass("active"), b.preventDefault();
    });
  });
}), function (a) {
  "use strict";

  a.fn.boxRefresh = function (b) {
    function c(a) {
      a.append(f), e.onLoadStart.call(a);
    }

    function d(a) {
      a.find(f).remove(), e.onLoadDone.call(a);
    }

    var e = a.extend({
      trigger: ".refresh-btn",
      source: "",
      onLoadStart: function onLoadStart(a) {
        return a;
      },
      onLoadDone: function onLoadDone(a) {
        return a;
      }
    }, b),
        f = a('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');
    return this.each(function () {
      if ("" === e.source) return void (window.console && window.console.log("Please specify a source first - boxRefresh()"));
      var b = a(this),
          f = b.find(e.trigger).first();
      f.on("click", function (a) {
        a.preventDefault(), c(b), b.find(".box-body").load(e.source, function () {
          d(b);
        });
      });
    });
  };
}(jQuery), function (a) {
  "use strict";

  a.fn.activateBox = function () {
    a.AdminLTE.boxWidget.activate(this);
  }, a.fn.toggleBox = function () {
    var b = a(a.AdminLTE.boxWidget.selectors.collapse, this);
    a.AdminLTE.boxWidget.collapse(b);
  }, a.fn.removeBox = function () {
    var b = a(a.AdminLTE.boxWidget.selectors.remove, this);
    a.AdminLTE.boxWidget.remove(b);
  };
}(jQuery), function (a) {
  "use strict";

  a.fn.todolist = function (b) {
    var c = a.extend({
      onCheck: function onCheck(a) {
        return a;
      },
      onUncheck: function onUncheck(a) {
        return a;
      }
    }, b);
    return this.each(function () {
      "undefined" != typeof a.fn.iCheck ? (a("input", this).on("ifChecked", function () {
        var b = a(this).parents("li").first();
        b.toggleClass("done"), c.onCheck.call(b);
      }), a("input", this).on("ifUnchecked", function () {
        var b = a(this).parents("li").first();
        b.toggleClass("done"), c.onUncheck.call(b);
      })) : a("input", this).on("change", function () {
        var b = a(this).parents("li").first();
        b.toggleClass("done"), a("input", b).is(":checked") ? c.onCheck.call(b) : c.onUncheck.call(b);
      });
    });
  };
}(jQuery);

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
/* harmony import */ var _components_BaseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/BaseComponent.js */ "./src/Resources/js/components/BaseComponent.js");
/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router.js */ "./src/Resources/js/router.js");
__webpack_require__(/*! ./bootstrap */ "./src/Resources/js/bootstrap.js");

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
window.eventHub = new Vue();


 //Uses

Vue.use(vue_resource__WEBPACK_IMPORTED_MODULE_1__["default"]);
Vue.use(vue_fragment__WEBPACK_IMPORTED_MODULE_2__["default"].Plugin);
Vue.use(vue_router__WEBPACK_IMPORTED_MODULE_0__["default"]); // Components

 //Router

 //Global methods

Vue.mixin({
  methods: {
    trans: function trans(key) {
      if (key in this.$root.localization) return this.$root.localization[key];
      return key;
    }
  }
}); //Create base VueApp instance

window.VueApp = new Vue(Object(_components_BaseComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_router_js__WEBPACK_IMPORTED_MODULE_4__["default"]));

/***/ }),

/***/ "./src/Resources/js/bootstrap.js":
/*!***************************************!*\
  !*** ./src/Resources/js/bootstrap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! jquery-form/jquery.form.js */ "./node_modules/jquery-form/jquery.form.js");

__webpack_require__(/*! bootstrap-sass */ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js");

__webpack_require__(/*! jquery-datetimepicker */ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js");

__webpack_require__(/*! ../admin/plugins/lightbox/lightbox.min.js */ "./src/Resources/admin/plugins/lightbox/lightbox.min.js");

__webpack_require__(/*! ../admin/plugins/chosen/chosen.jquery.min.js */ "./src/Resources/admin/plugins/chosen/chosen.jquery.min.js");

__webpack_require__(/*! ../admin/plugins/chosen-order/chosen.order.jquery.min.js */ "./src/Resources/admin/plugins/chosen-order/chosen.order.jquery.min.js");

__webpack_require__(/*! ../admin/dist/js/app.min.js */ "./src/Resources/admin/dist/js/app.min.js");

__webpack_require__(/*! ../admin/dist/js/main.js */ "./src/Resources/admin/dist/js/main.js");

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
/* harmony import */ var _Sidebar_Sidebar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar/Sidebar.vue */ "./src/Resources/js/components/Sidebar/Sidebar.vue");
/* harmony import */ var _Partials_License_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Partials/License.vue */ "./src/Resources/js/components/Partials/License.vue");
/* harmony import */ var _Partials_CheckAssetsVersion_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Partials/CheckAssetsVersion.vue */ "./src/Resources/js/components/Partials/CheckAssetsVersion.vue");
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
        version_assets: null,
        gettext: null,
        locale: null,
        dashboard: null,
        license_key: null,
        requests: {},
        user: null,
        tree: [],
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
      Sidebar: _Sidebar_Sidebar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      License: _Partials_License_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      CheckAssetsVersion: _Partials_CheckAssetsVersion_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    created: function created() {
      this.reloadCSRFToken($('meta[name="csrf-token"]')[0].content);
      this.bootApp(); //Set datepickers language

      jQuery.datetimepicker.setLocale(this.locale);
      this.checkAlertEvents();
    },
    computed: {
      isTest: function isTest() {
        return this.version.indexOf('test') > -1;
      },
      canShowAlert: function canShowAlert() {
        return this.alert.title != null && this.alert.message != null || this.alert.component;
      },
      getAvatar: function getAvatar() {
        if (this.user && this.user.avatar) return this.user.avatar;
        return this.$http.options.root + '/../' + window.crudadmin.path + '/dist/img/avatar5.png';
      },
      getPermissions: function getPermissions() {
        if ('admins_groups' in this.user) {
          var permissions = [];

          for (var i = 0; i < this.user.admins_groups.length; i++) {
            permissions.push(this.user.admins_groups[i].name);
          }

          if (permissions.length > 0) return permissions.join(', ');
        }

        return this.trans('admin-user');
      }
    },
    methods: {
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

        this.$http.get(window.crudadmin.baseURL + '/api/layout').then(function (response) {
          var layout = response.data;
          _this2.version = layout.version;
          _this2.version_assets = layout.version_assets;
          _this2.gettext = layout.gettext;
          _this2.locale = layout.locale;
          _this2.dashboard = layout.dashboard;
          _this2.license_key = layout.license_key;
          _this2.requests = Object(_Helpers_RequestHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(layout.requests);
          _this2.user = layout.user;
          _this2.tree = layout.models;
          _this2.models = _this2.flattenModelsWithChilds(layout.models);
          _this2.localization = layout.localization || {};
          _this2.languages = layout.languages || [];

          _this2.bootLanguages();
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
        this.bindAlertComponent(component); //After opening alert unfocus focused input
        //for prevent sending of new form ajax instance...

        if ("activeElement" in document) document.activeElement.blur();
        return this.alert;
      },
      getComponentName: function getComponentName(name) {
        return name + 'Alert';
      },
      bindAlertComponent: function bindAlertComponent(component) {
        this.alert.component = component;

        if (component) {
          var obj;

          try {
            obj = this.getComponentObject(component.component);
            obj.name = this.getComponentName(component.name);
            this.$options.components[obj.name] = obj;
            console.log('component registred', this.getComponentName(component.name), component);
          } catch (error) {
            console.error('Syntax error in component button component.' + "\n", error);
            this.alert.component = null;
          }
        }
      },
      closeAlert: function closeAlert(callback) {
        if (typeof callback == 'function') callback.call(this);

        for (var key in this.alert) {
          this.alert[key] = null;
        }
      },
      arrorAlert: function arrorAlert(callback) {
        this.openAlert(this.trans('warning'), this.trans('unknown-error'), 'danger', null, callback ? callback : function () {});
      },
      checkAlertEvents: function checkAlertEvents() {
        var _this3 = this;

        $(window).keyup(function (e) {
          //If is opened alert
          if (_this3.canShowAlert !== true) return; //If enter/esc has been pressed 300ms after alert has been opened
          //does not close this alert and ignore enter

          if (_this3.alert.opened && new Date().getTime() - _this3.alert.opened < 300) return;
          if (e.keyCode == 13) _this3.closeAlert(_this3.alert.success || _this3.alert.close);
          if (e.keyCode == 27) _this3.closeAlert(_this3.alert.close);
        });
      },
      bootLanguages: function bootLanguages() {
        if (this.languages.length == 0) return;
        if (!('language_id' in localStorage) || !$.isNumeric(localStorage.language_id)) localStorage.language_id = this.languages[0].id;
        this.language_id = localStorage.language_id;
      },
      //Check for all error response in all requests
      errorResponseLayer: function errorResponseLayer(response, code, callback) {
        //Fix for jquery response
        if ('responseJSON' in response) response.data = response.responseJSON; //Set response data

        if (!response.data && response.body) response.data = response.body; //If error response comes with some message information, then display it

        if (response.data && response.data.message && response.data.title && response.data.type) {
          return this.$root.openAlert(response.data.title, response.data.message, response.data.type, null, function () {
            if (response.status == 401) {
              window.location.reload();
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


        if (callback && (code === response.status || code === null)) return callback(response); //Unknown HTTP error

        if (response.data.message) return this.$root.openAlert('Error ' + response.status, response.data.message, 'error'); //Unknown error

        this.$root.arrorAlert();
      },
      //Check specifics property in model
      getModelProperty: function getModelProperty(model, key, value) {
        var path = key.split('.');
        if (!model) return null;

        for (var i = 0; i < path.length; i++) {
          if (!(path[i] in model)) {
            return value ? value : null;
          }

          model = model[path[i]];
        }

        return model;
      },

      /*
      * Returns correct values into multilangual select
      */
      languageOptions: function languageOptions(array, field, filter, with_hidden) {
        var key,
            relation,
            field_key,
            related_field,
            matched_keys,
            items = [],
            hasFilter = filter && Object.keys(filter).length > 0;

        if (field && (relation = field['belongsTo'] || field['belongsToMany']) && (field_key = relation.split(',')[1])) {
          matched_keys = field_key.replace(/\\:/g, '').match(new RegExp(/[\:^]([0-9,a-z,A-Z$_]+)+/, 'g'));
        }

        loop1: for (var key in array) {
          //If select has filters
          if (hasFilter) for (var k in filter) {
            if (array[key][1][k] != filter[k] || array[key][1][k] == null) continue loop1;
          } //Build value from multiple columns

          if (matched_keys) {
            var value = field_key.replace(/\\:/g, ':');

            for (var i = 0; i < matched_keys.length; i++) {
              var related_field = this.models[relation.split(',')[0]].fields[matched_keys[i].substr(1)],
                  option_value = this.getLangValue(array[key][1][matched_keys[i].substr(1)], related_field);
              value = value.replace(new RegExp(matched_keys[i], 'g'), !option_value && option_value !== 0 ? '' : option_value);
            }
          } //Simple value by one column
          else {
              if (field_key) related_field = this.models[relation.split(',')[0]].fields[field_key]; //Get value of multiarray or simple array

              var value = _typeof(array[key][1]) == 'object' && array[key][1] !== null ? this.getLangValue(array[key][1][field_key], related_field) : array[key][1];
            } //Change undefined values on null values


          value = value == null ? null : value;
          var hiddenOptions = field.hiddenOptions || field.optionsFilter; //Skip hidden options

          if (hiddenOptions && with_hidden !== false) {
            if (_typeof(hiddenOptions) == 'object' && hiddenOptions.indexOf(array[key][0]) > -1) continue;
            if (typeof hiddenOptions == 'function' && hiddenOptions(array[key][0], value, array[key][1]) === false) continue;
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
      getComponentObject: function getComponentObject(data) {
        var obj = new Function('return ' + data)(),
            _this = this; //Fixed backwards compacitibility for vuejs1 components


        if (obj.ready && !obj.mounted) obj.mounted = obj.ready;

        var originalCreated = obj.created || function () {},
            originalMounted = obj.mounted || function () {},
            originalDestroyed = obj.destroyed || function () {},
            proxyEventsResend = ['sendRow', 'sendParentRow', 'reloadRows'],
            proxyEventsReceive = ['getRow', 'getParentRow', 'onCreate', 'onUpdate', 'onSubmit', 'changeFormSaveState', 'selectHistoryRow'],
            events = {}; //Extend created method


        obj.created = function () {
          var _this4 = this;

          //This events should be resend from component to eventHub
          for (var key in proxyEventsResend) {
            (function (event) {
              _this4.$on(event, events[event] = function (data) {
                eventHub.$emit(event, _this.eventDataModifier(event, data, _this4));
              });
            })(proxyEventsResend[key]);
          } //This events should be received from evnentHub and send to component


          for (var key in proxyEventsReceive) {
            (function (event) {
              eventHub.$on(event, events[event] = function (data) {
                _this4.$emit(event, data);
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
    this.fields[key].hideFromForm = value;
  };
  /*
   * Remove input
   */


  Model.prototype.removeFromForm = function (key, value) {
    this.fields[key].removeFromForm = value;
  };
  /*
   * Filter fields options by key or by function
   */


  Model.prototype.optionsFilter = function (key, filter) {
    this.fields[key].optionsFilter = filter;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Fields);

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
/* harmony import */ var _FieldsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FieldsHelper */ "./src/Resources/js/components/Helpers/FieldsHelper.js");
/* harmony import */ var _ModelProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ModelProperties */ "./src/Resources/js/components/Helpers/ModelProperties.js");




var Model = function Model() {};

var extensions = [_TabsHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"], _FieldsHelper__WEBPACK_IMPORTED_MODULE_1__["default"], _ModelProperties__WEBPACK_IMPORTED_MODULE_2__["default"]];
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
    if (this.isInParent()) return '$' + this.table + '_';
    return '';
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
    component: _components_Views_DashBoardView_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    path: '/page/:model',
    name: 'admin-model',
    component: _components_Views_BasePageView_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  }]
});
/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./src/Resources/js/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/js/app.js */"./src/Resources/js/app.js");


/***/ }),

/***/ 1:
/*!*********************!*\
  !*** got (ignored) ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"/src/Resources/admin/js/manifest","/src/Resources/admin/js/vendor"]]]);