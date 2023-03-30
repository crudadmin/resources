import Builder from '@components/Helpers/Builder/Builder';

import FieldProperties from './FieldProperties';
import FieldLocale from './FieldLocale';
import FieldHistory from './FieldHistory';

const FreshBuilderData = () => {
    return {

    }
}

const extensions = [
    FieldProperties,
    FieldLocale,
    FieldHistory,
];

const Field = () => {};

export default new Builder(Field, extensions, FreshBuilderData);