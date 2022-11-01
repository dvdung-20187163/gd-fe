<template>
    <div id="header">
        <div class="header__left">
            <div class="header__left--title">Cán bộ giáo viên</div>
            <div class="header__left--notifi"></div>
        </div>
        <div class="header_centre"></div>
        <div class="header_right">
            <div class="header__icons">
                <div class="icon--notifi">
                    <DToolTip class="show__tooltip mt-46" text="Thông báo" />
                </div>
            </div>
            <div class="header__role">
                <div class="role__title">Admin</div>
                <div class="role__arrow"></div>
            </div>
            <div class="header__avatar"></div>
        </div>
    </div>
</template>

<script>
import DToolTip from '../base/DToolTip.vue';
export default {
    name: 'WorkspaceJsonTheHeader',

    components: { DToolTip },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
@import url('../../style/layout/header.css');
</style>