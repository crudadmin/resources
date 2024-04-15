<template>
    <textarea
        @click="bootEditors()"
        ref="editor"
        data-toggle="tooltip"
        class="form-control js_editor"
        :id="id"
        :disabled="isMissing"
        :title="isMissing ? trans('gettext-missing') : getPluralsPlaceholder(i - 1)"
        :class="{ long: getValue(values, i - 1).length > 80 || isRaw }"
        :value="getValue(values, i - 1)"
        :placeholder="getPluralsPlaceholder(i - 1)"
        @input="changeText($event.target.value, i - 1)"
    ></textarea>
</template>

<script type="text/javascript">
export default {
    props: ['pluralLength', 'i', 'id', 'isMissing', 'isRaw', 'isPlural', 'textKey', 'plural_forms', 'changes', 'translates', 'values'],

    beforeDestroy() {
        if (this.isRaw && CKEDITOR.instances[this.$refs.editor.id]) {
            CKEDITOR.instances[this.$refs.editor.id].destroy();
        }
    },

    computed: {
        getPluralsIntervals() {
            var forms = this.plural_forms.split(';')[1].replace('plural=', ''),
                plurals = [],
                is_double = this.pluralLength == 2;

            for (var i = 0; i < this.pluralLength; i++) {
                var start = null,
                    end = null;

                for (var a = 1; a < 100; a++) {
                    var statement = forms.replace(/n/g, a),
                        condition = eval(statement),
                        result = parseInt(condition);

                    if (start === null && ((is_double && ((i == 0 && condition === false) || (i > 0 && condition === true))) || result === i)) {
                        start = a;
                    }

                    if (start !== null && end === null && !is_double && result != i) {
                        if (i > 0) {
                            end = a - 1;
                        }

                        break;
                    }
                }

                plurals.push([start, start == end ? null : end]);
            }

            plurals = plurals.map((items, i) => {
                var items = items.filter((item) => item);

                if (i + 1 == plurals.length && items.length == 1) return items[0] + '+';

                return items.join(' - ');
            });

            return plurals;
        },
    },

    methods: {
        bootEditors() {
            if (!this.isRaw) {
                return;
            }

            this.$nextTick(() => {
                $(this.$refs.editor).ckEditors();

                let editor = CKEDITOR.instances[this.$refs.editor.id];

                editor.on('change', (e) => {
                    this.changeText(e.editor.getData(), this.i - 1);
                });
            });
        },
        getValue(value, i) {
            if (!value) {
                return '';
            }

            return value[i] || '';
        },
        getPluralsPlaceholder(i) {
            //If is no plural
            if (!this.isPlural) {
                return '';
            }

            if (this.textKey.indexOf('%d') > -1) {
                return this.textKey.replace('%d', this.getPluralsIntervals[i]);
            }

            return this.getPluralsIntervals[i];
        },
        changeText(value, i) {
            var src = this.textKey;

            //Plural forms translates
            if (this.isPlural) {
                //Build plural forms array
                if (!(src in this.changes)) this.$set(this.changes, src, this.translates[src]);

                //Update specific plural form
                this.changes[src][i] = value;
            }

            //Non plural forms
            else {
                this.$set(this.changes, src, value);
            }

            //Update core translates object
            this.translates[src][i] = value;
        },
    },
};
</script>
