<template>
    <Field :field="field" :key="elementKeyRender">
        <!--
            We want send form value from first textarea element,
            because second may be modifier from editor in some unexpected behaviours, when vue value is not changed at all
        -->
        <textarea rows="3" class="form-control d-none" :name="name" :value="value"></textarea>

        <!-- This textare element is connected with gutenberg instance -->
        <textarea rows="10" class="d-none" :id="id" ref="gutenbergEditor" :value="value"></textarea>

        <div v-if="initialized == false" class="alert alert-warning" :class="{ '--loading': initializing && !initialized }">
            <p>{{ _('Inštanciu editora je možné spustiť len raz. Pre prepnutie inštancie editora kliknite na nasledujúce tlačidlo.') }}</p>
            <button type="button" @click="toggleEditorInstance" class="btn btn-warning mt-3">{{ _('Zapnúť editor') }}</button>
        </div>
    </Field>
</template>

<script>
export default {
    props: ['id', 'model', 'name', 'field_key', 'field', 'value', 'depth_level'],

    data() {
        return {
            initializing: false,
            initialized: false,
            destroying: false,
        };
    },
    mounted() {
        this.tryInitializeEditor();

        eventHub.$on(
            'disableGutenbergEditors',
            (this.$disableGutenbergEditors = (data) => {
                //We can disable only if editor is loaded
                //Also skip actual field
                if (!(this.initializing == true || this.initialized == true) || data.id == this.id) {
                    return;
                }

                this.removeEditor(data.callback);
            })
        );

        eventHub.$on(
            'updateField',
            (this.$updateField = (data) => {
                if (this.destroying == true) {
                    return;
                }

                if (data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key) return;

                var value = this.$parent.getLocalizedValue(this.field.value) || '';

                if (this.initialized == true) {
                    Gutenberg.setContent(value);
                }
            })
        );

        wp.data.subscribe(
            _.debounce((e) => {
                //We can update this field, only if this field has been initialized
                if (this.destroying == true || this.initialized == false) {
                    return;
                }

                this.$parent.changeValue(null, Gutenberg.getContent());
            }, 500)
        );
    },
    beforeDestroy() {
        this.removeEditor();

        eventHub.$off('updateField', this.$updateField);
        eventHub.$off('disableGutenbergEditors', this.$disableGutenbergEditors);
    },

    computed: {
        //We need rerener whole element before initialization state, and rerender again after unitialized state.
        //Because when you have multiple langagues, or instances of editor on page at the same time, they wil rewrite their contents.
        //1. open first initial editor in english language
        //2. reopen second editor for example in gernam language
        //3. reopen again english version
        //4. change state in english
        //5. save (in this state, textarea of gernam editor will be modified with english value, what is wrong)
        elementKeyRender() {
            return this.initializing || this.initialized ? 'initialized' : 'unitialized';
        },
    },

    methods: {
        toggleEditorInstance() {
            if (this.initializing) {
                return;
            }

            this.initializing = true;

            //We need add timeout for correct button animation of "loading state"
            setTimeout(() => {
                //If editor is enabled already
                if (Gutenberg.editor) {
                    eventHub.$emit('disableGutenbergEditors', {
                        id: this.id,
                        callback: () => {
                            this.tryInitializeEditor();
                        },
                    });
                } else {
                    this.tryInitializeEditor();
                }
            }, 100);
        },
        onEditorBoot() {
            //Check if given field is under not intializing state
            if (this.initializing === false) {
                return;
            }

            this.initialized = true;

            Gutenberg.setContent(this.value || '');
        },
        flushStorage() {
            sessionStorage.removeItem('wp-autosave-block-editor-post-1');
        },
        tryInitializeEditor() {
            if (Gutenberg.editor || Gutenberg.initialized) {
                return;
            }

            this.initializeEditor();
        },
        initializeEditor: function () {
            Gutenberg.initialized = true;

            this.initializing = true;

            this.destroying = false;

            this.flushStorage();

            this.$nextTick(() => {
                Gutenberg.init(this.id, {
                    laravelFilemanager: { prefix: '/admin/filemanager' },
                    onBoot: () => {
                        this.onEditorBoot();
                    },
                });
            });
        },
        removeEditor: function (callback) {
            //Allow remove only instance currently booted.
            if ($(this.$refs.gutenbergEditor).prev()[0] != window.Gutenberg.editor) {
                return;
            }

            Gutenberg.initialized = false;

            this.initializing = false;
            this.initialized = false;
            this.destroying = true;

            try {
                this.flushStorage();

                // Remove any active blocks
                const blocks = wp.data
                    .select('core/blocks')
                    .getBlockTypes()
                    .map((bt) => bt.name);
                const { removeBlockTypes } = wp.data.dispatch('core/blocks');
                removeBlockTypes(blocks);

                // Toggle these on again
                const { toggleFeature } = wp.data.dispatch('core/edit-post');

                // Start teardown
                const { __experimentalTearDownEditor } = wp.data.dispatch('core/editor');
                __experimentalTearDownEditor();

                // Unmount component
                wp.element.unmountComponentAtNode(window.Gutenberg.editor);

                //Remove editor wrapper
                $('#laraberg__editor').remove();
            } catch (e) {
                console.error(e);
            }

            window.Gutenberg.editor = undefined;

            if (typeof callback == 'function') {
                callback();
            }
        },
    },
};
</script>

<style scoped>
.--loading {
    opacity: 0.5;
}
</style>
