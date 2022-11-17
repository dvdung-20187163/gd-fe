<template>
    <div id="menu" :class="{ explore : !isExplore }">
        <div class="menu__header">
            <div class="menu__header--title" :class="{ 'display-none' : !isExplore }">{{ localesEmployee.Menu.Device }}</div>
            <div class="menu__header--button" @click="onToggle">
                <DToolTip class="show__tooltip mt-46 ml-20" text="Thu phóng menu" />
            </div>
        </div>
        <div class="menu__main">
            <div class="menu__list">
                <div class="menu__item" @click="slecteNav()" v-for="item in items" :key="item.id">
                    <!-- <div class="menu__item--active" ></div> -->
                    <div class="menu__item--icon" :style="{'background-image': 'url(' + item.icon + ')'}"></div>
                    <div class="menu__item--title" :class="{ 'display-none' : !isExplore }">{{ item.title }}</div>
                    <DToolTip class="show__tooltip mt-46 ml-20" :text="item.tooltip" />
                    <!-- <DToolTip :class="{ 'display-block' : isShowTooltip }" :text="item.tooltip" /> -->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import DToolTip from '../base/DToolTip.vue';
import localesEmployeeVi from "../../locales/vi/employee.js"

export default {
    name: 'WorkspaceJsonTheMenu',
    components: { DToolTip },

    data() {
        return {
            isExplore: false,
            localesEmployee: {},
            items: [
                {
                    id: 1,
                    icon: require("../../assets/Icons/Dashboard.svg"),
                    title: localesEmployeeVi.Menu.Overview,
                    tooltip: localesEmployeeVi.Menu.Overview,
                },
                {
                    id: 2,
                    icon: require("../../assets/Icons/ic_ThietBi.svg"),
                    title: localesEmployeeVi.Menu.Device,
                    tooltip: localesEmployeeVi.Menu.Device,
                },
                {
                    id: 3,
                    icon: require("../../assets/Icons/ic_MuonTra.svg"),
                    title: localesEmployeeVi.Menu.Payment,
                    tooltip: localesEmployeeVi.Menu.Payment,
                },
                {
                    id: 4,
                    icon: require("../../assets/Icons/ic_DeNghiMuaSam.svg"),
                    title: localesEmployeeVi.Menu.RequirePurchase,
                    tooltip: localesEmployeeVi.Menu.RequirePurchase,
                },
                {
                    id: 5,
                    icon: require("../../assets/Icons/menu_tracuu.svg"),
                    title: localesEmployeeVi.Menu.SearchAndExport,
                    tooltip: localesEmployeeVi.Menu.SearchAndExport,
                },
                {
                    id: 6,
                    icon: require("../../assets/Icons/ic_HeThong.svg"),
                    title: localesEmployeeVi.Menu.System,
                    tooltip: localesEmployeeVi.Menu.System,
                },
                {
                    id: 7,
                    icon: require("../../assets/Icons/ic_BaoCao.svg"),
                    title: localesEmployeeVi.Menu.Report,
                    tooltip: localesEmployeeVi.Menu.Report,
                },
            ]
        };
    },

    created() {
        this.localesEmployee = localesEmployeeVi
        // console.log(this.localesEmployee)
    },

    mounted() {
        
    },

    methods: {
        /**
         * Select nav 
         * AUthor: DVDUNG (26/10/2022)
         */
        slecteNav() {
            let childrens = event.currentTarget.parentElement.children
            for (let children of childrens) {
                if (children.classList.contains("selectedNav")) {
                    children.classList.remove("selectedNav")
                }
            }
            event.currentTarget.classList.add("selectedNav")
            
        },

        /**
         * Thu phóng menu
         * Author: DVDUNG (26/20/2022)
         */
        onToggle() {
            this.isExplore = !this.isExplore
            this.$parent.exploreMenu();
        }
    },
};
</script>

<style>
@import url('../../style/layout/menu.css');
@import url('../../style/base/common.css');

.selectedNav {
    padding-left: 0;
    border-left: 4px solid #0dd469;
    background-color: #404f64;
    color: #15c068;
    font-weight: 700;
}

.explore {
    width: 50px !important;
}

.display-none {
    display: none;
}
</style>