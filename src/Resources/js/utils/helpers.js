export const isExtension = (path, types) => {
    var type = path.split('.').pop().toLowerCase();

    return types.indexOf( type ) > -1 ? true : false;
}