<template>
    <div class="tooltip-text">{{text}}</div>
</template>

<script>
export default {
    name: 'WorkspaceJsonDToolTip',
    props: ["text"],
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
.tooltip-text {
    position: absolute;
    font-size: 13px;
    width: max-content;
    color: #000;
    border: 1px solid #afafaf;
    background-color: #fff;
    padding: 12px;
    top: -10px;
    box-shadow: 0 0 5px #d5d5d5;
    /* margin-top: 4px; */
    z-index: 0;
    text-align: center;
    z-index: 5;
    border-radius: 4px;
}

.validate {
    background-color: #DE3617;
    color: #fff;
}
</style>