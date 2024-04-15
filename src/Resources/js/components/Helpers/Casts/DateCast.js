import Cast from './Cast.js';

export default class DateCast extends Cast {
    get(value) {
        //If is iso format, we need cast value for required input format
        if (value && moment(value, moment.ISO_8601, true).isValid()) {
            value = moment(value).format($app.fromPHPFormatToMoment(this.model.getFieldFormat(this.fieldKey)));
        }

        return value;
    }

    set(value) {
        return value;
    }
}
