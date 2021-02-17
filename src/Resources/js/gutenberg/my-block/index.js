const boot = () => {
    const { RichText, BlockControls, MediaUpload } = wp.editor
    const { Button, Toolbar } = wp.components

    function edit(props) {
        return (
            <div>
                <BlockControls>
                    <Toolbar
                        controls={[
                            {
                                icon: props.attributes.preview ? 'edit' : 'visibility',
                                title: 'Preview',
                                onClick: (event) => props.setAttributes({ preview: !props.attributes.preview })
                            }
                        ]}
                    />
                </BlockControls>
                { props.attributes.preview ? renderSave(props) : renderEdit(props) }
            </div>

        )
    }

    function renderSave(props) {
        return (
            <div>
                <h1>{props.attributes.content}</h1>
                <img src={props.attributes.image} alt=""/>
            </div>
        )
    }

    function renderEdit(props) {
        function selectImage(value) {
            console.log('IMAGE', value)
            props.setAttributes({image: value.url})
        }


        function updateContent(text) {
            props.setAttributes({ content: text})
        }

        function addImage(){
            props.setAttributes({ imagesCount : props.attributes.imagesCount + 1 });
            console.log('add new image', props);
        }

        let items = [];

        for ( var i = 0; i < props.attributes.imagesCount; i++ ) {
            let element = (
                <div style={{border: '2px solid red'}}>
                    <MediaUpload
                    onSelect={selectImage}
                    allowedTypes={['audio']}
                    render={ ( { open } ) => (
                        <Button onClick={ open }>
                            Sem nahraj olafo fotku do slidera
                        </Button>
                    ) }
                />
            </div>);

            items.push(element);
        }

        return (
            <div>
                <h1>Toto je olafoslider v1</h1>
                <RichText tagName='h1' value={props.attributes.content} onChange={updateContent} />

                {items}

                <button onClick={addImage}>pridaj custom fotku do slajdera {props.attributes.imagesCount}</button>
            </div>

        )
    }

    function save(props) {
        return renderSave(props)
    }

    const MyIcon = () => (
        <span class="fa fa-th-large"></span>
    );

    return {
        key : 'test-block',
        title: 'OlafoSlider',
        icon: 'universal-access-alt',
        category: 'crudadmin',
        edit: edit,
        save: save,
        attributes: {
            content: { type: 'string' },
            image: { type: 'string', default: 'http://placehold.it/500' },
            imagesCount: { type: 'integer', default: 1 },
            preview: { type: 'boolean', default: false }
        }
    }
};

export default boot;