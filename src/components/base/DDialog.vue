<template>
    <div class="modal">
        <div class="dialog">
            <div class="dialog__header" v-html="header"></div>
            <div class="dialog__main">
                <div class="dialog__icon icon-warning"></div>
                <div class="dialog__body"><span v-html="title"></span></div>
            </div>
            <div class="dialog__btn">
                <input type="text" ref="inputDialog" class="hidden">
                <button class="btn btn__sub"  @click="noCancel" :class="{ 'display-none' : !activeBtn1 }">{{titleBtn1}}</button>
                <button class="btn btn__sub ml-8"  @click="noSave" :class="{ 'display-none' : !activeBtn2 }">{{titleBtn2}}</button>
                <button class="btn btn__main"  @click="closeDialog" @keydown.tab="focusInputDialog">{{titleBtn3}}</button>
            </div>
    </div>
    </div>
</template>

<script>
    
export default {
    name: 'WorkspaceJsonDDialog',

    props: {
        header: {
            type: String
        },
        title: {
            type: String
        },
        isShowDialogDetailadd: {
            type: Boolean
        },
        titleBtn1: {
            type: String
        },
        titleBtn2: {
            type: String
        },
        titleBtn3: {
            type: String
        },
        activeBtn2: {
            type: Boolean,
            default: false
        },
        activeBtn1: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {

        };
    },

    mounted() {
        // this.$refs.inputDialog.focus()

    },

    methods: {
        /**
         * Không hủy hỏ khai báo/ lưu tài sản
         * Author: DVDUNG (1/10/2022)
         */
        noCancel() {
            this.$parent.closeDialog();
        },

        /**
         * Hủy hỏ khai báo đối với form thêm tài sản
         * Lưu tài sản đối với form chỉnh sửa tài sản
         * Author: DVDUNG (1/10/2022)
         */
         closeDialog(){
            this.$parent.closeDialog();
        },

        /**
         * Không lưu lưu tài sản
         * Author: DVDUNG (1/10/2022)
         */
        noSave() {
            this.$parent.closeForm();
        },

        focusInputDialog() {
            this.$refs.inputDialog.focus()
        },
    },
};
</script>

<style scoped>
@import url('../../style/base/dialog.css');
@import url('../../style/base/button.css');
.display-none {
    display: none;
}
</style>