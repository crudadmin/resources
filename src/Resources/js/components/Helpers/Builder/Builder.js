export default (Builder, extensions) => {
    return function(rawBuilder){
        //Does not initialize already initialized model
        if ( rawBuilder._initialized === true ){
            return rawBuilder;
        }

        rawBuilder = _.cloneDeep(rawBuilder);

        rawBuilder._initialized = true;

        var core = new Builder;

        //Copy all given model attributes
        for ( var key in rawBuilder ) {
            core[key] = rawBuilder[key];
        }

        //Install all extensions
        for ( var key in extensions ) {
            let extension = extensions[key],
                options;

            //Support extensions with options
            if ( typeof extension == 'object' ){
                options = extension[1];
                extension = extension[0];
            }

            extension(Builder, core, options);
        }

        return core;
    };
}