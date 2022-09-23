export const isExtension = (path, types) => {
    path = path.replace('.encrypted', '');

    var type = path.split('.').pop().toLowerCase();

    return types.indexOf( type ) > -1 ? true : false;
}

export const isEncrypted = (path) => {
    return _.endsWith(path, '.encrypted');
}