import Builder from '@components/Helpers/Builder/Builder';

import FieldProperties from './FieldProperties';
import FieldTypes from './FieldTypes';
import FieldLocale from './FieldLocale';
import FieldHistory from './FieldHistory';

const FreshBuilderData = () => {
    return {};
};

const extensions = [FieldProperties, FieldTypes, FieldLocale, FieldHistory];

const Field = () => {};

export default new Builder(Field, extensions, FreshBuilderData);
