<template>
<div class="pagination-limit" :class="{ '--hidden-limit' : model.isHiddenMode() }" v-if="model.isPaginationEnabled()" :title="trans('rows-count')">
    <div class="dropdown fields-list" fields-list>
        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {{ rows.limit }}
            <i class="--icon-right fa fa-angle-down"></i>
        </button>
        <ul class="dropdown-menu menu-left dropdown-menu-right">
            <li
                @click="model.setLimit(0)"
                :class="['--no-item-padding', { active : rows.limit == 0 }]">
                <label class="--dropdown-item-padding --dropdown-item-vertical">
                    {{ _('Skryť') }}
                </label>
            </li>
            <li
                @click="model.setLimit(count)"
                v-for="count in rows.limits"
                :class="['--no-item-padding', { active : rows.limit == count }]">
                <label class="--dropdown-item-padding --dropdown-item-vertical">
                    {{ count }}
                </label>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props : ['model', 'rows'],
}
</script>