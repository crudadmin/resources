import BuilderData from './BuilderData';

export default (Builder, extensions, FreshBuilderData) => {
    const defaultExtensions = [
        [BuilderData, {
            data : FreshBuilderData
        }]
    ];

    //Add default extensions
    extensions = [].concat(defaultExtensions).concat(extensions);

    return function(rawBuilder){
        //Does not initialize already initialized model
        if ( rawBuilder?.data?._initialized === true ){
            return rawBuilder;
        }

        rawBuilder = _.cloneDeep(rawBuilder);

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

        core.data._initialized = true;

        return core;
    };
}