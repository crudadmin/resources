import Builder from '@components/Helpers/Builder/Builder';

import FieldProperties from './FieldProperties';

const FreshBuilderData = () => {
    return {

    }
}

const extensions = [
    FieldProperties,
];

const Field = () => {};

export default new Builder(Field, extensions, FreshBuilderData);