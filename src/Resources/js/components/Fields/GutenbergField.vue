<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i> {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>
        <textarea
            rows="10"
            class="form-control"
            :id="id"
            :disabled="disabled"
            :readonly="readonly"
            :name="field_key"
            :value="field.value"
            :maxlength="field.max"
            :placeholder="field.placeholder || field_name">
        </textarea>
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['id', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'depth_level'],

        data(){
            return {
                destroying : false,
                editorLoaded : false,
            };
        },
        mounted(){
            this.initializeEditor();

            eventHub.$on('updateField', this.onUpdateEvent = data => {
                if ( this.destroying == true ){
                    return;
                }

                if ( data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key )
                    return;

                var value = this.$parent.getLocalizedValue(this.field.value) || '';

                if ( this.editorLoaded == true ) {
                    Laraberg.setContent(value);
                }
            });

            wp.data.subscribe(_.debounce(e => {
                if ( this.destroying == true ){
                    return;
                }

                this.field.value = Laraberg.getContent();
            }, 500));

            this.checkEditorBoot();
            this.registerBlocks();
        },
        beforeDestroy() {
            this.removeEditor();
        },

        methods : {
            checkEditorBoot(){
                var { getPlugin, unregisterPlugin, registerPlugin } = wp.plugins;
                var { useEffect } = wp.element;

                const doSomething = () => {
                    useEffect(() => {
                        this.editorLoaded = true;
                    }, []);
                    return null
                }

                //Reregister plugin
                getPlugin('on-editor-boot') && unregisterPlugin('on-editor-boot');
                registerPlugin('on-editor-boot', {
                  render: doSomething,
                });
            },
            flushStorage(){
                sessionStorage.removeItem("wp-autosave-block-editor-post-1");
            },
            initializeEditor: function () {
                this.flushStorage();

                Laraberg.init(this.id, {
                    laravelFilemanager: { prefix : '/admin/filemanager' },
                });

                const {toggleFeature} = wp.data.dispatch('core/edit-post');
                const {isFeatureActive} = wp.data.select('core/edit-post');

                isFeatureActive("welcomeGuide") && toggleFeature('welcomeGuide');
                isFeatureActive("fullscreenMode") && toggleFeature('fullscreenMode');

            },
            removeEditor: function () {
                this.destroying = true;

                try {
                    this.flushStorage();

                    // Remove any active blocks
                    const blocks = wp.data.select('core/blocks').getBlockTypes().map(bt => bt.name);
                    const {removeBlockTypes} = wp.data.dispatch('core/blocks');
                    removeBlockTypes(blocks);

                    // Toggle these on again
                    const { toggleFeature } = wp.data.dispatch('core/edit-post')
                    toggleFeature('welcomeGuide')
                    toggleFeature('fullscreenMode')

                    // Start teardown
                    const {__experimentalTearDownEditor} = wp.data.dispatch('core/editor');
                    __experimentalTearDownEditor();

                    // Unmount component
                    wp.element.unmountComponentAtNode(window.Laraberg.editor);
                } catch (e) {}

                window.Laraberg.editor = undefined;
            },
            changeValue(e){
                this.$parent.changeValue(e);
            },
            registerBlocks(){
                Laraberg.registerCategory('Admin blocks', 'crudadmin');

                crudBerg.blocks.forEach(block => {
                    block = block();

                    Laraberg.registerBlock('crudadmin/'+block.key, block)

                    console.log('Registered', block);
                })
            }
        },
    }
</script>