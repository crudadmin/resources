<template>
    <div :class="{ '--active': active }">
        <div v-if="type == 'small'">
            <svg
                width="18px"
                height="14px"
                viewBox="0 0 18 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <title>Group</title>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Artboard" transform="translate(-1436, -146)" fill="#DEE3E8">
                        <g id="Group-2" transform="translate(1421, 133)">
                            <g id="Group" transform="translate(15, 13)">
                                <rect id="Rectangle" x="7" y="0" width="11" height="14" rx="1"></rect>
                                <rect id="Rectangle-Copy-8" x="0" y="0" width="5" height="14" rx="1"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <div v-if="type == 'big'">
            <svg
                width="18px"
                height="14px"
                viewBox="0 0 18 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <title>Group Copy 2</title>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Artboard" transform="translate(-1484, -146)" fill="#DEE3E8">
                        <g id="Group-2" transform="translate(1421, 133)">
                            <g id="Group-Copy-2" transform="translate(63, 13)">
                                <rect id="Rectangle" x="13" y="0" width="5" height="14" rx="1"></rect>
                                <rect id="Rectangle-Copy-8" x="0" y="0" width="11" height="14" rx="1"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <div v-if="type == 'medium'">
            <svg
                width="18px"
                height="14px"
                viewBox="0 0 18 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <title>Group Copy 2 2</title>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Artboard" transform="translate(-1532, -146)" fill="#DEE3E8">
                        <g id="Group-2" transform="translate(1421, 133)">
                            <g id="Group-Copy-2" transform="translate(111, 13)">
                                <rect id="Rectangle" x="10" y="0" width="8" height="14" rx="1"></rect>
                                <rect id="Rectangle-Copy-8" x="0" y="0" width="8" height="14" rx="1"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <div v-if="type == 'full'">
            <svg
                width="18px"
                height="16px"
                viewBox="0 0 18 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <title>Group Copy 3</title>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Artboard" transform="translate(-1580, -145)" fill="#DEE3E8">
                        <g id="Group-2" transform="translate(1421, 133)">
                            <g id="Group-Copy-3" transform="translate(159, 12)">
                                <rect id="Rectangle-Copy-8" x="0" y="0" width="18" height="16" rx="1"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'active'],
};
</script>

<style lang="scss" scoped>
.--active svg g {
    fill: $primary;
}

svg {
    max-width: 3rem;
}
</style>
