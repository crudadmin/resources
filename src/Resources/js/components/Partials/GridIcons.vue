<template>
<div :class="{ '--active' : active }">
    <div v-if="type == 'big'">
        <svg width="809px" height="339px" viewBox="0 0 809 339" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>grid-small</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="grid-small" fill="#DEE3E8" fill-rule="nonzero">
                    <rect id="Rectangle" x="0" y="0" width="439" height="339" rx="92.5"></rect>
                    <rect id="Rectangle-Copy" x="624" y="0" width="185" height="339" rx="92.5"></rect>
                </g>
            </g>
        </svg>
    </div>
    <div v-if="type == 'full'">
        <svg width="809px" height="339px" viewBox="0 0 809 339" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>grid-full</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="grid-full" transform="translate(404.500000, 169.500000) scale(-1, 1) translate(-404.500000, -169.500000) " fill="#DEE3E8" fill-rule="nonzero">
                    <rect id="Rectangle-Copy-3" x="0" y="222" width="809" height="117" rx="58.5"></rect>
                    <rect id="Rectangle-Copy-Copy-3" x="0" y="0" width="809" height="117" rx="58.5"></rect>
                </g>
            </g>
        </svg>
    </div>
    <div v-if="type == 'medium'">
        <svg width="809px" height="339px" viewBox="0 0 809 339" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>grid-medium</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="grid-medium" transform="translate(404.500000, 169.500000) scale(-1, 1) translate(-404.500000, -169.500000) " fill="#DEE3E8" fill-rule="nonzero">
                    <rect id="Rectangle-Copy-2" x="0" y="0" width="312" height="339" rx="92.5"></rect>
                    <rect id="Rectangle-Copy-Copy-2" x="497" y="0" width="312" height="339" rx="92.5"></rect>
                </g>
            </g>
        </svg>
    </div>
    <div v-if="type == 'small'">
        <svg width="809px" height="339px" viewBox="0 0 809 339" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>grid-big</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="grid-big" transform="translate(404.500000, 169.500000) scale(-1, 1) translate(-404.500000, -169.500000) " fill="#DEE3E8" fill-rule="nonzero">
                <rect id="Rectangle-Copy" x="0" y="0" width="439" height="339" rx="92.5"></rect>
                <rect id="Rectangle-Copy-Copy" x="624" y="0" width="185" height="339" rx="92.5"></rect>
            </g>
        </g>
    </svg>
    </div>
</div>
</template>

<script>
export default {
    props : ['type', 'active'],
}
</script>

<style lang="scss" scoped>
.--active svg g {
    fill: $primary;
}

svg {
    max-width: 3rem;
}
</style>