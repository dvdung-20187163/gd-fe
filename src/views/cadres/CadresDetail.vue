<template>
    <div class="modal">
        <div class="pop-up">
            <div class="btn-close" @click="btnCloseFormDetail()"></div>
            <div class="form__left">
                <div class="form__avatar">
                    <div class="form__avatar--image"></div>
                    <button class="form__avatar--btn">{{ localesEmployee.Form.SelectImg }}</button>
                </div>
                <div class="form__info">
                    <div class="info--fullname">{{ employeeForm.fullname }}</div>
                    <div class="info--code">{{ employeeForm.employeeCode }}</div>
                </div>
            </div>
            <div class="form__right">
                <div class="form__header">
                    {{ localesEmployee.Form.TitleAdd }}
                </div>
                <div class="form__body">
                    <div class="double__input">
                        <div class="box__input box__input--left">
                            <button ref="focusNext" class="btn__tab"></button>
                            <div class="lable__input">{{ localesEmployee.Form.EmployeeCode }} <span style="color: red">*</span></div>
                            <input 
                            class="input input__form1" 
                            type="text" 
                            ref="employeeCode" 
                            v-model="employeeForm.employeeCode"
                            @blur="leaveFocusInput(employeeForm.employeeCode)"
                            >
                            <DToolTip class="show__tooltip ml--50" :text="localesEmployee.TooltipHover.More"/>

                        </div>
                        <div class="box__input box__input--right">
                            <div class="lable__input">{{ localesEmployee.Form.FullName }} <span style="color: red">*</span></div>
                            <input 
                            class="input input__form" 
                            type="text" 
                            ref="fullname"
                            v-model="employeeForm.fullname"
                            @blur="leaveFocusInput(employeeForm.fullname)"
                            >
                            <DToolTip class="show__tooltip ml--50" :text="localesEmployee.TooltipHover.More"/>

                        </div>
                    </div>
                    <div class="double__input">
                        <div class="box__input box__input--left">
                            <div class="lable__input">{{ localesEmployee.Form.PhoneNumber }}</div>
                            <input 
                            class="input input__form1" 
                            type="text" 
                            v-model="employeeForm.phoneNumber"
                            >
                        </div>
                        <div class="box__input box__input--right">
                            <div class="lable__input">{{ localesEmployee.Form.Email }}</div>
                            <input 
                            class="input input__form" 
                            type="text" 
                            v-model="employeeForm.email"
                            >
                        </div>
                    </div>
                    <div class="double__input">
                        <div class="box__input box__input--left">
                            <div class="lable__input">{{ localesEmployee.Form.Specialize }}</div>
                            <el-select
                            v-model="employeeForm.specialize"
                            popper-class="bgr-unset"
                            placeholder="Select"
                            >
                                <el-option
                                    v-for="item in optionSpecialize"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
                        <div class="box__input box__input--right">
                            <div class="lable__input">{{ localesEmployee.Form.SubjectManagement }}</div>
                            <el-select 
                            v-model="employeeForm.subjectManagement" 
                            multiple 
                            multipleplaceholder="Select">
                                <el-option-group
                                v-for="group in optionSubject"
                                :key="group.label"
                                :label="group.label"
                                >
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                                </el-option-group>
                            </el-select>
                        </div>
                    </div>
                    <div class="box__input box__input--full">
                        <div class="lable__input">{{ localesEmployee.Form.DepartmentManagement }}</div>
                        <el-select 
                        v-model="employeeForm.departmentManagement" 
                        multiple 
                        placeholder="Select"
                        >
                            <el-option-group
                            v-for="group in optionDepartment"
                            :key="group.label"
                            
                            >
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                            </el-option-group>
                        </el-select>
                    </div>
                    <div class="box__check">
                        <label class="container mr-20 w-30">{{localesEmployee.Form.IsTraining}}
                            <input type="checkbox" v-model="employeeForm.isTraing">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container mr-20 w-20">{{localesEmployee.Form.IsWorking}}
                            <input type="checkbox" v-model="employeeForm.isWorking">
                            <span class="checkmark"></span>
                        </label>
                        <div class="check__off">
                            <el-date-picker
                                type="date"
                                :placeholder="localesEmployee.FormPlaceholder.DayOff"
                                format="DD/MM/YYYY"
                                value-format="YYYY-MM-DD"
                                :disabled-date="(date) => date >= new Date()"
                                v-model="employeeForm.dayOff"
                            />
                            <div class="check__off--title">{{localesEmployee.Form.DateOff}}</div>
                        </div>
                    </div>
                </div>
                
                <div class="form__footer">
                    <button class="btn btn__main" @click="saveData">Lưu</button>
                    <button class="btn btn__sub" @click="showDialogDetail" @keydown.tab="focusInputOne">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    <DDialog 
        v-if="isShowDialogDetail" 
        :header="headerDialogDetail"
        :title="titleDialogDetail"
        :titleBtn1="titleBtnDialog1"
        :titleBtn2="titleBtnDialog2"
        :titleBtn3="titleBtnDialog3"
        :activeBtn1="activeBtnDialog1"
        :activeBtn2="activeBtnDialog2"
    />
</template>

<script>
import localesEmployeeVi from "../../locales/vi/employee.js"
import { ref } from 'vue'
import DDialog from "@/components/base/DDialog.vue";

export default {
    name: "WorkspaceJsonDadresDetail",
    props: {
        cadresSelected: {
            type: Object,
            default: () => null,
        },
        formMode: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            localesEmployee: {},
            cadresData: {},
            optionSubject: [
                {
                    options: [
                        {
                            value: "Tất cả",
                            label: "Tất cả",
                        },
                    ],
                },
                {
                    options: [
                        {
                            value: "Toán",
                            label: "Toán",
                        },
                        {
                            value: "Lý",
                            label: "Lý",
                        },
                        {
                            value: "Hóa",
                            label: "Hóa",
                        },
                        {
                            value: "Sinh",
                            label: "Sinh",
                        },
                        {
                            value: "Văn",
                            label: "Văn",
                        },
                        {
                            value: "Sử",
                            label: "Sử",
                        },
                    ],
                    department: [
                        {
                            value: "Phòng Toán-Lý",
                            label: "Phòng Toán-Lý",
                        },
                        {
                            value: "Phòng Hóa-Sinh",
                            label: "Phòng Hóa-Sinh",
                        },
                        {
                            value: "Kho phòng chung",
                            label: "Kho phòng chung",
                        },
                    ],
                },
            ],
            optionDepartment: [
                {
                    options: [
                        {
                            value: "Tất cả",
                            label: "Tất cả",
                        },
                    ],
                },
                {
                    options: [
                        {
                            value: "Phòng Toán-Lý",
                            label: "Phòng Toán-Lý",
                        },
                        {
                            value: "Phòng Hóa-Sinh",
                            label: "Phòng Hóa-Sinh",
                        },
                        {
                            value: "Kho phòng chung",
                            label: "Kho phòng chung",
                        },
                    ],
                },
            ],
            optionSpecialize: [
                {
                    value: "Tổ Toán-Tin",
                    label: "Tổ Toán-Tin",
                },
                {
                    value: "Tổ Lý-Hóa",
                    label: "Tổ Lý-Hóa",
                },
                {
                    value: "Tổ Sinh-Sử-Địa",
                    label: "Tổ Sinh-Sử-Địa",
                },
            ],
            specialize: ref(""),
            subjectManagement: ref(""),
            departmentManagement: ref(""),
            
            // v-model
            employeeForm: {
                employeeCode: "",
                fullname: "",
                phoneNumber: "",
                email: "",
                specialize: "",
                subjectManagement: "",
                departmentManagement: "",
                isTraining: "",
                isWorking: "",
                dateOff: "",
            },
            // show component
            isShowDialogDetail: false,
            // Lưu lỗi validate
            errorValidate: [],

            // prop dialog
            headerDialogDetail: '',
            titleDialogDetail: '',
            titleBtnDialog1: '',
            titleBtnDialog2: '',
            titleBtnDialog3: '',
            activeBtnDialog1: false,
            activeBtnDialog2: false,

            isShowTooltip: false,
        };
    },
    created() {
        this.localesEmployee = localesEmployeeVi;
        this.cadresData = {...this.cadresSelected}
        let data = this.cadresData
        this.employeeForm.employeeCode = data.EmployeeCode
        this.employeeForm.fullname = data.FullName
        this.employeeForm.phoneNumber = data.PhoneNumber
        this.employeeForm.email = data.Email
        console.log(this.cadresData)
    },
    mounted() {
        this.$refs.employeeCode.focus();
    },
    methods: {
        /**
         * Đóng form detail
         * Author: DVDUNG (30/10/2022)
         */
        btnCloseFormDetail() {
            this.$emit("closeFormDetail");
        },

        closeForm() {
            this.btnCloseFormDetail()
        },
        /**
         * Kiểm tra xem đã có dữ liệu khi blur ra khỏi input chưa
         * @param {*} data
         * Author: DVDUNG (30/01/2022)
         */
        leaveFocusInput(data) {
            if (data == null || data == "") {
                // thêm border màu đỏ
                event.currentTarget.classList.add("errors");
                this.isShowTooltip == true
                // Thêm title thông báo lỗi (tạm thời chưa làm vì chưa cần)
            }
            else {
                event.currentTarget.classList.remove("errors");
                this.isShowTooltip == false
            }
        },
        /**
         * Validate dữ liệu đầu vào
         * Author: DVDUNG (30/10/2022)
         */
        validateDate() {
            this.errorValidate = []
            // for (let data in this.employeeForm) {
            //     console.log(this.employeeForm[data])
            //     if (this.employeeForm[data] == null || this.employeeForm[data] == "") {
            //         console.log('lỗi nè ', data)
            //     }
            // }
            let data = this.employeeForm
            if (data.employeeCode == null || data.employeeCode == '') {
                this.errorValidate.push(this.localesEmployee.Validate.EmployeeCodeRequired)
            }
            if (data.fullname == null || data.fullname == '') {
                this.errorValidate.push(this.localesEmployee.Validate.FullNameRequired)
            }
            console.log(this.errorValidate)
        },

        /**
         * Hiện thông báo lỗi validate dữ liệu
         * Author: DVDUNG (30/10/2022)
         */
        showDialogValidate() {
            let title = ``;
            for (let i in this.errorValidate) {
                title += `<span class="mb-3">- ${this.errorValidate[i]}</span><br>`;
            }
            this.headerDialogDetail= this.localesEmployee.Validate.TitleErrorValidate
            // this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI;
            this.activeBtnDialog1 = false;
            this.activeBtnDialog2 = false;
            this.titleDialogDetail = title;
            this.isShowDialogDetail = true;
            this.titleBtnDialog3 = this.localesEmployee.Button.Close
            },

        closeDialog() {
            this.isShowDialogDetail = false
        },  

        /**
         * Hiển thị toast message
         * Author: DVDUNG (30/10/2022)
         */
        showToastMessage() {
            this.$emit("showToastMessage")
        },

        showDialogDetail() {
            if (this.formMode == this.localesEmployee.FormMode.Add) {
                for (let data in this.employeeForm) {
                    console.log(this.employeeForm[data])
                    if (this.employeeForm[data] != null || this.employeeForm[data] != "" || this.employeeForm[data] != undefined) {
                        this.titleBtnDialog3 = this.localesEmployee.Button.No
                        this.activeBtnDialog2 = true
                        this.titleBtnDialog2 = this.localesEmployee.Button.Cancel
                        this.headerDialogDetail= this.localesEmployee.Dialog.Header
                        this.titleDialogDetail = this.localesEmployee.Dialog.ContentAdd
                    }
                }
               

            //    if(this.employeeForm != null) {
            //     console.log(this.employeeForm)
            //     this.titleBtnDialog3 = this.localesEmployee.Button.No
            //     this.activeBtnDialog2 = true
            //     this.titleBtnDialog2 = this.localesEmployee.Button.Cancel
            //     this.headerDialogDetail= this.localesEmployee.Dialog.Header
            //     this.titleDialogDetail = this.localesEmployee.Dialog.ContentAdd
            //    }

            }
            this.isShowDialogDetail = true
        },

        /**
         * Lấy dữ liệu từ form để truyền đi
         * Author: DVDUNG (30/10/2022)
         */
        pushData() {
            let data = this.employeeForm
            this.cadresData.EmployeeCode = data.employeeCode       
            this.cadresData.FullName = data.fullname            
            this.cadresData.PhoneNumber = data.phoneNumber
            this.cadresData.Email = data.email 
            this.cadresData.EmployeeId = 7
            console.log(this.cadresData)
            this.$emit("pushData", this.cadresData)
            // console.log(this.cadresData, 'mới')
        },

        /**
         * Lưu dữ liệu
         * Author: DVDUNG (30/10/2022)
         */
        saveData() {
            console.log(this.employeeForm)
            this.validateDate()
            if (this.errorValidate.length > 0) {
                this.showDialogValidate()
            } else {
                this.pushData()
                this.showToastMessage()
                this.btnCloseFormDetail()
            }
            
        },

        focusInputOne() {
            this.$refs.focusNext.focus()
        },
    },
    components: { DDialog }
};
</script>

<style scoped>
@import url('../../style/base/form.css');
@import url('../../style/base/button.css');
@import url('../../style/base/el-plus.css');
@import url('../../style/base/input.css');

.el-select-dropdown__item.selected {
  font-size: 13px !important;
  font-weight:400 !important;
  color: var(--el-text-color-regular) !important;
  background-image: url("../../assets/Icons/ic_Checkbox_Active.png") !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  background-position-x: 10px !important;
  padding-left: 54px !important;

}

.el-select-dropdown__item {
  font-size: 13px !important;
  background-image: url("../../assets/Icons/ic_Checkbox_Inactive.png") !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  background-position-x: 10px !important;
  padding-left: 54px !important;

}
.bgr-unset .el-select-dropdown__item {
    background: unset !important;
    padding-left: 4px !important;
  }

</style>