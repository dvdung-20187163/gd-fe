<template>
    <div id="cadres-list" v-show="!isShowNoData">
        <!-- toolbar -->
        <div class="toolbar">
            <div class="toolbar__left input__search">
                <input type="text" class="input" placeholder="Nhập tên"/>
                <div class="icon--search"></div>
            </div>
            <div class="toolbar__centre"></div>
            <div class="toolbar__right">
                <button class="btn__icon delete__multi position-absolute" v-show="isShowBtnDeleteMulti" @click="btnDeleteMulti">Xóa</button>
                <button class="btn__icon icon--three-point" @click="showMore">
                    <DToolTip class="show__tooltip ml--50" :text="localesEmployee.TooltipHover.More"/>
                </button>
                <button class="btn btn__sub">{{ localesEmployee.Button.Export }}</button>
                <button class="btn btn__main" @click="btnAdd">{{ localesEmployee.Button.AddNew }}</button>
            </div>
        </div>
        <!-- table -->
        <div class="table-main">
            <table class="table">
                <thead>
                <th style="min-width: 32px;">
                    <label class="container ml-13">
                        <input type="checkbox" @click="checkAll">
                        <span class="checkmark"></span>
                    </label>
                    <!-- <input type="checkbox" class="checkbox-x" @click="checkAll"> -->
                </th>
                <th style="min-width: 110px;">{{ localesEmployee.TitleTable.EmployeeCode }}</th>
                <th style="min-width: 190px;">{{ localesEmployee.TitleTable.FullName }}</th>
                <th style="min-width: 110px;">{{ localesEmployee.TitleTable.PhoneNumber }}</th>
                <th style="min-width: 130px">{{ localesEmployee.TitleTable.Specialize }}</th>
                <th style="min-width: 130px;">{{ localesEmployee.TitleTable.SubjectManagement }}
                    <DToolTip class="show__tooltip ml-6" :text="localesEmployee.TooltipHover.SubjectManagement"/>
                </th>
                <th style="min-width: 260px;">{{ localesEmployee.TitleTable.DepartmentManagement }}
                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.DepartmentManagement"/>
                </th>
                <th style="min-width: 95px;">{{ localesEmployee.TitleTable.IsTraining }}
                    <DToolTip class="show__tooltip l--25" :text="localesEmployee.TooltipHover.IsTraining"/>
                </th>
                <th style="min-width: 95px;">{{ localesEmployee.TitleTable.IsWorking }}</th>
                <th style="min-width: 70px;"></th>
                </thead>
                <tbody>
                    <tr v-for="cadre in cadres" :key="cadre.EmployeeId" @dblclick="rowDoubleClick(cadre)">
                        <td class="text--centre" style="min-width: 32px;">
                            <label class="container ml-13">
                                <input type="checkbox" v-model="listIdCheck" :value="cadre.EmployeeId">
                                <span class="checkmark"></span>
                            </label>
                        </td>
                        <td style="min-width: 100px;" class="text--left" >{{ cadre.EmployeeCode }}</td>
                        <td style="min-width: 180px;" class="text--left text-color-primary" >{{ cadre.FullName }}</td>
                        <td style="min-width: 90px;" class="text--left" >{{ cadre.PhoneNumber }}</td>
                        <td style="min-width: 105px;" class="text--left" >{{ cadre.DepartmentCode }}</td>
                        <td style="min-width: 100px;" class="text--left" >{{ cadre.DepartmentName }}</td>
                        <td style="min-width: 190px;" class="text--left" >
                            Phòng Tin, phòng TN Hóa, phòng TN Toán
                        </td>
                        <td style="min-width: 80px;" class="text--centre" >
                            <div class="icon__checked"></div>
                        </td>
                        <td style="min-width: 80px;" class="text--centre" >
                            <div class="icon__checked"></div>
                        </td>
                        <td style="min-width: 60px;" class="text--centre" >
                            <div class="icon__function">
                                <div class="icon__edit" @click="btnEdit(cadre)">
                                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.Update"/>
                                </div>
                                <div class="icon__delete" @click="btnDeleteOne(cadre)">
                                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.Delete"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <div></div>

                </tbody>
                <tfoot hidden>
                    <tr>
                        <td colspan="10">
                            <div class="paging">
                                <div class="page__number">
                                    <button class="btn__paging number__first ml-6"></button>
                                    <button class="btn__paging number__previous"></button>
                                    <input class="page__current" v-model="currenPage">
                                    <button class="btn__paging number__next"></button>
                                    <button class="btn__paging number__last"></button>
                                </div>
                                <div class="paging__info">
                                    <div class="totalCount">{{this.currenPage}}/{{this.totalPage}} trang</div>
                                    <div class="totalCadres">(<b>{{this.totalCount}}</b> giáo viên)</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="paging">
            <div class="page__number">
                <button class="btn__paging number__first ml-6">
                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.FirstPage"/>
                </button>
                <button class="btn__paging number__previous">
                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.PrevPage"/>
                </button>
                <input class="page__current" v-model="currenPage"> 
                <button class="btn__paging number__next">
                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.NextPage"/>
                </button>
                <button class="btn__paging number__last">
                    <DToolTip class="show__tooltip l-25" :text="localesEmployee.TooltipHover.LastPage"/>
                </button>
            </div>
            <div class="paging__info">
                <div class="totalCount">{{this.currenPage}}/{{this.totalPage}} trang</div>
                <div class="totalCadres">(<b>{{this.totalCount}}</b> giáo viên)</div>
            </div>
        </div>
    </div>
    <div id="no-data" v-if="isShowNoData">
        <div class="nodata__icon"></div>
        <div class="nodata__message">
            <div class="message__header">{{ localesEmployee.noData.header }}</div>
            <div class="message__body">{{ localesEmployee.noData.body }}</div>
        </div>
        <div class="nodata__btn">
            <button class="btn btn__main" @click="btnAdd">{{ localesEmployee.Button.AddNew }}</button>
            <button class="btn btn__main" @click="btnAdd">{{ localesEmployee.Button.AddRapid }}</button>
        </div>
    </div>
    <CadresDetail 
    v-if="isShowCadresDetail" 
    :cadresSelected="cadresSelected"
    @closeFormDetail="closeFormDetail()"  
    @showToastMessage="showToastMessage()"
    @pushData="pushData"
    />
    <DToastMessage v-if="isShowToast" />
    <DLoading :isLoading="isLoading" />
    <DDialog 
        v-if="isShowDialog" 
        :header="headerDialog"
        :title="titleDialog"
        :titleBtn1="titleBtnDialog1"
        :titleBtn2="titleBtnDialog2"
        :titleBtn3="titleBtnDialog3"
        :activeBtn1="activeBtnDialog1"
        :activeBtn2="activeBtnDialog2"
    />

</template>

<script>
import CadresDetail from './CadresDetail.vue';
import DToastMessage from "@/components/base/DToastMessage.vue";
import localesEmployeeVi from "../../locales/vi/employee.js"
import DToolTip from '@/components/base/DToolTip.vue';
import DLoading from '@/components/base/DLoading.vue';
import DDialog from '@/components/base/DDialog.vue';

export default {
    name: "WorkspaceJsonCadresList",
    data() {
        return {
            localesEmployee: {},
            cadresSelected: {},
            cadres: [
                {
                    EmployeeId: 1,
                    EmployeeCode: 'NV0001',
                    FullName: 'Đặng Văn Dũng',
                    PhoneNumber: '0989518138',
                    Email: 'dung.dangvan.20@gmail.com',
                    DepartmentCode: 'Tổ Toán-Tin',
                    DepartmentName: 'Lý'
                },
                {
                    EmployeeId: 2,
                    EmployeeCode: 'NV0002',
                    FullName: 'Lê Hồng Quang',
                    PhoneNumber: '0989518138',
                    Email: 'dung.dangvan.20@gmail.com',
                    DepartmentCode: 'Tổ Văn phòng',
                    DepartmentName: 'Lịch sử'
                },
                {
                    EmployeeId: 3,
                    EmployeeCode: 'NV0003',
                    FullName: 'Nguyễn Văn Phong',
                    PhoneNumber: '0989518138',
                    Email: 'dung.dangvan.20@gmail.com',
                    DepartmentCode: 'Tổ Ngữ văn',
                    DepartmentName: 'Văn'
                },
                {
                    EmployeeId: 4,
                    EmployeeCode: 'NV0004',
                    FullName: 'Đặng Hồng Thái',
                    PhoneNumber: '0989518138',
                    Email: 'dung.dangvan.20@gmail.com',
                    DepartmentCode: 'Tổ Anh văn',
                    DepartmentName: 'Anh'
                },
                {
                    EmployeeId: 5,
                    EmployeeCode: 'NV0005',
                    FullName: 'Lê Văn Lực',
                    PhoneNumber: '0989518138',
                    Email: 'dung.dangvan.20@gmail.com',
                    DepartmentCode: 'Tổ Toán-Tin',
                    DepartmentName: 'Tin'
                },
                {
                    EmployeeId: 6,
                    EmployeeCode: 'NV0006',
                    FullName: 'Ngô Linh Chan',
                    PhoneNumber: '0989518138',
                    Email: 'dung.dangvan.20@gmail.com',
                    DepartmentCode: 'Tổ Lý-Hóa',
                    DepartmentName: 'Lý'
                }
            ],
            currenPage: 1,
            totalPage: 2,
            totalCount: 56,
            isShowCadresDetail: false,
            isShowToast: false,
            formMode: '',
            isShowNoData: false,
            isShowBtnDeleteMulti: false,
            isLoading: false,

            listIdCheck: [],
            selectAll: false,

            // Dialog
            isShowDialog: false,
            headerDialog: '',
            titleDialog: '',
            titleBtnDialog1: '',
            titleBtnDialog2: '',
            titleBtnDialog3: '',
            activeBtnDialog1: false,
            activeBtnDialog2: false,
        };
    },
    created() {
        this.getDataTable();
        this.localesEmployee = localesEmployeeVi
        // setTimeout(() => {
        //     this.isLoading = false
        // }, 1500);

    },
    mounted() {
    },
    methods: {
         /**
         * Mở form detail
         * Author: DVDUNG (30/10/2022)
         */
        btnAdd() {
            this.isShowCadresDetail = true
            this.formMode = this.localesEmployee.FormMode.Add
        },

         /**
         * Đóng form detail
         * Author: DVDUNG (30/10/2022)
         */
        closeFormDetail() {
            this.isShowCadresDetail = false
        },

        /**
         * Btn chỉnh sửa bản ghi
         * Author: DVDUNG (30/10/2022)
         */
        btnEdit(data) {
            this.rowDoubleClick(data)
        },

        /**
         * Btn xóa bản ghi
         * Author: DVDUNG (30/10/2022)
         */
        async btnDeleteOne(data) {
            this.titleBtnDialog3 = this.localesEmployee.Button.Delete
            this.titleBtnDialog2 = this.localesEmployee.Button.No
            this.activeBtnDialog2 = true
            this.headerDialog = this.localesEmployee.Dialog.Header 
            this.titleDialog = this.localesEmployee.Dialog.ContentDeleteOne
            this.formMode = this.localesEmployee.FormMode.Delete
            this.isShowDialog = true
            await this.showDialog()
            console.log(data)
            // this.pushData(data)
        },

        btnDeleteMulti() {

        },

        /**
         * Hiện toast message sau khi hoàn thành tác vụ
         * Author: DVDUNG (30/10/2022)
         */
        showToastMessage() {
            this.isShowToast = true
            setTimeout(() => {
            this.isShowToast = false
            }, 3000);
            console.log(this.isShowToast)
        },

        /**
         * Click vào btn more --> Hiện btn xóa nhiều
         * Author: DVDUNG (30/10/2022)
         */
        showMore() {
            this.isShowBtnDeleteMulti = !this.isShowBtnDeleteMulti
        },

        showDialog() {
            this.isShowDialog = true
            
        },

        closeDialog() {
            this.isShowDialog = false
            
        },

        closeForm() {
            this.isShowDialog = false
        },

        /**
         * Gọi API để lấy dữ liệu
         */
        getDataTable() {
            try {
                this.isLoading = true
                fetch("https://cukcuk.manhnv.net/api/v1/Employees", { method: "GET" })
                    .then(res => res.json())
                    .then(data => {
                    this.cadres = data;
                    this.totalCount = data.length
                    this.isLoading = false
                    // console.log(this.cadres);
                });
            }
            catch (error) {
                console.log(error);
                this.isLoading = false
            }
            
            
        },

        /**
         * CLick đúp chuột, mở form chỉnh sửa bản ghi
         * @param {employeeSelected} data 
         * Author: DVDUNG (30/10/2022)
         */
        rowDoubleClick(data) {
            this.cadresSelected = data
            // console.log(data)
            this.isShowCadresDetail = true
            this.formMode = this.localesEmployee.FormMode.Edit
        },

        /**
         * Đẩy dữ liệu vào mảng có sẵn
         * @param {*} data 
         * Author: DVDUNG (30/10/2022)
         */
        pushData(data) {
            if (this.formMode == this.localesEmployee.FormMode.Add) {
                data.EmployeeId = 9
                this.cadres.push(data)
                
            
            }
            if (this.formMode == this.localesEmployee.FormMode.Edit) {
                this.cadres.splice(data.EmployeeId-1, 1, data) 
                console.log(data)
            }

            if (this.formMode == this.localesEmployee.FormMode.Delete) {
                this.cadres.splice(data.EmployeeId-1, 1) 

            }
            // console.log(data, 'nè')
        },

        /**
         * Khi tích vào checkbox trong thẻ thead thì tất cả checkbox khác đều được tích
         * Author: DVDUNG (24/09/2022)
         */
         checkAll() {
            try {
                this.listIdCheck = [];
                if (!this.selectAll) {
                    for (let i of this.cadres) {
                        this.listIdCheck.push(i.EmployeeId);
                    }
                }
                console.log(this.listIdCheck)
                this.selectAll = !this.selectAll
            } catch(error) {
                console.log(error)
            }
        },
    },
    components: { CadresDetail, DToastMessage, DToolTip, DLoading, DDialog }
};
</script>

<style scoped>
@import url('../../style/base/input.css');
@import url('../../style/base/button.css');
@import url('../../style/layout/content.css');
@import url('../../style/base/table.css');
@import url('../../style/base/paging.css');
@import url('../../style/base/common.css');

</style>