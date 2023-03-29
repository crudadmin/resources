export const isExtension = (path, types) => {
    path = path.replace('.encrypted', '');

    var type = path.split('.').pop().toLowerCase();

    return types.indexOf( type ) > -1 ? true : false;
}

export const isEncrypted = (path) => {
    return _.endsWith(path, '.encrypted');
}

//Change bools to string values
export const fixBoolValue = (value) => {
    if ( value === true ) {
        return '1';
    }

    if ( value === false ) {
        return '0';
    }

    return value;
}