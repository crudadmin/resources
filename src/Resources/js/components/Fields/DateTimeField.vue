<template>
    <div class="form-group" :class="{ disabled : disabled || readonly, 'multiple-date' : isMultipleDatepicker }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field_name }} <span v-if="required" class="required">*</span>
        </label>

        <input
            ref="input"
            type="text"
            class="form-control"
            :disabled="disabled"
            :readonly="readonly"
            :name="isMultipleDatepicker ? '' : field_key"
            :value="castValue(value)"
            :placeholder="field.placeholder || field_name"
            autocomplete="off"
            @keyup="changeValue">

        <input type="hidden" :name="field_key+'[]'" v-if="isMultipleDatepicker && getMultiDates.length == 0" value="">
        <input type="hidden" :name="field_key+'[]'" :value="getMultiDateValue(date)" v-if="isMultipleDatepicker" v-for="date in getMultiDates">
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'depth_level'],

        created(){
            $.datetimepicker.setLocale(this.$root.locale);
        },

        mounted(){
            this.bindDatepickers();

            eventHub.$on('updateField', this.onUpdateEvent = data => {
                if ( data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key )
                    return;

                this.bindDatepickers();
            });
        },

        destroyed(){
            eventHub.$off('updateField', this.onUpdateEvent);
        },

        watch : {
            //On step changed we need update steps
            'field.date_step'(step){
                this.bindDatepickers();
            },
        },

        computed : {
            isMultipleDatepicker() {
                return this.field.multiple == true;
            },
            getMultiDates(){
                var value = this.field.value||[];

                if ( ! $.isArray(value) )
                    value = [];

                //Check correct inputs values
                return _.cloneDeep(value).filter(item => {
                    return item.length == (this.field.type == 'time' ? 5 : 10);
                });
            },
        },

        methods : {
            getInput(){
                return $(this.$refs.input);
            },
            castValue(value){
                //If is iso format, we need cast value for required input format
                if ( value && moment(value, moment.ISO_8601, true).isValid() ) {
                    return moment(value).format(this.fromPHPFormatToMoment(this.model.getFieldFormat(this.field_key)));
                }

                return value;
            },
            bindDatepickers(){
                if ( this.readonly === true ){
                    return;
                }

                var _this = this;

                this.getInput().datetimepicker({
                    lang: this.$root.locale,
                    format: this.model.getFieldFormat(this.field_key),
                    timepicker: this.field.type != 'date',
                    datepicker: this.field.type != 'time',
                    scrollInput: false,
                    timepickerScrollbar: false,
                    dayOfWeekStart : 1,
                    step : this.field.date_step ? parseInt(this.field.date_step) : 30,
                    scrollMonth: false,
                    scrollYear: false,
                    inline : this.isMultipleDatepicker,
                    onGenerate: function(ct){
                        _this.onGenerate(this, ct);
                    },
                    onChangeDateTime: this.onChangeDateTime,
                });
            },
            onGenerate(el, ct){
                if ( ! this.isMultipleDatepicker )
                    return;

                el.addClass('multiple-dates');

                var values = this.getMultiDates;

                for ( var i = 0; i < values.length; i++ )
                {
                    var date = this.field.type == 'time' ? values[i].split(':') : new Date(values[i]);

                    var selector = this.field.type == 'time'
                                    ? 'div[data-hour="'+parseInt(date[0])+'"][data-minute="'+parseInt(date[1])+'"]'
                                    : 'td[data-date="'+date.getDate()+'"][data-month="'+date.getMonth()+'"][data-year="'+date.getFullYear()+'"]';

                    el.find(selector).addClass('multiple-selected');
                }
            },
            onChangeDateTime(current_date_time){
                if ( ! current_date_time )
                    return;

                //Update multi date value
                if ( this.isMultipleDatepicker ) {
                    var pickedDate = moment(current_date_time).format(this.field.type == 'time' ? 'HH:mm' : 'YYYY-MM-DD');

                    var value = this.getMultiDates,
                        index = value.indexOf(pickedDate);

                    if ( index > -1 )
                        value.splice(index, 1);
                    else
                        value.push(pickedDate);

                    this.changeValue(null, value);
                }

                //Update single date value
                else {
                    var pickedDate = moment(current_date_time).format(this.fromPHPFormatToMoment(this.model.getFieldFormat(this.field_key)));

                    this.changeValue(null, pickedDate);
                }
            },
            getMultiDateValue(time){
                if ( this.field.type == 'time' && time.length == 5 && time[2] == ':' )
                    return time;

                return moment(time).format('YYYY-MM-DD');
            },
            changeValue(e, date){
                this.$parent.changeValue(e, date);
            },
        },
    }
</script>