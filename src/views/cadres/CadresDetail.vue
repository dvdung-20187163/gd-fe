<template>
  <div class="modal" @keyup="keyEvent" tabindex="-1">
    <div class="pop-up" tabindex="-1">
      <div class="btn-close" @click="btnCloseFormDetail()"></div>
      <div class="form__left">
        <div class="form__avatar">
          <div class="form__avatar--image"></div>
          <button class="form__avatar--btn">
            {{ localesEmployee.Form.SelectImg }}
          </button>
        </div>
        <div class="form__info">
          <div class="info--fullname">
            <span :class="{ 'display-none': employeeForm.fullName }">{{
              exampleFullname
            }}</span>
            {{ employeeForm.fullName }}
          </div>
          <div class="info--code">
            <span :class="{ 'display-none': employeeForm.employeeCode }">{{
              exampleCode
            }}</span>
            {{ employeeForm.employeeCode }}
          </div>
        </div>
      </div>
      <div class="form__right">
        <div class="form__header">
          {{ titleForm }}
        </div>
        <div class="form__body">
          <div class="double__input">
            <div class="box__input box__input--left">
              <button ref="focusNext" class="btn__tab"></button>
              <div class="lable__input">
                {{ localesEmployee.Form.EmployeeCode }}
                <span style="color: red">*</span>
              </div>
              <input
                class="input input__form1"
                type="text"
                ref="employeeCode"
                v-model="employeeForm.employeeCode"
                @blur="leaveFocusInput(employeeForm.employeeCode)"
                input-check
              />
              <DToolTip
                class="show__tooltip margin-input-form validate"
                :text="localesEmployee.Validate.EmployeeCodeRequired"
              />
            </div>
            <div class="box__input box__input--right">
              <div class="lable__input">
                {{ localesEmployee.Form.FullName }}
                <span style="color: red">*</span>
              </div>
              <input
                class="input input__form"
                type="text"
                ref="fullname"
                v-model="employeeForm.fullName"
                @blur="leaveFocusInput(employeeForm.fullName)"
                input-check
              />
              <DToolTip
                class="show__tooltip margin-input-form validate"
                :text="localesEmployee.Validate.FullNameRequired"
              />
            </div>
          </div>
          <div class="double__input">
            <div class="box__input box__input--left">
              <div class="lable__input">
                {{ localesEmployee.Form.PhoneNumber }}
              </div>
              <input
                class="input input__form1"
                type="text"
                v-model="employeeForm.phoneNumber"
                ref="phoneNumber"
                input-check
              />
              <DToolTip
                class="show__tooltip margin-input-form validate"
                :text="localesEmployee.Validate.PhoneNumberRequired"
              />
            </div>

            <div class="box__input box__input--right">
              <div class="lable__input">{{ localesEmployee.Form.Email }}</div>
              <input
                class="input input__form"
                type="text"
                v-model="employeeForm.email"
                ref="email"
                input-check
              />
              <DToolTip
                class="show__tooltip margin-input-form validate"
                :text="localesEmployee.Validate.EmailRequired"
              />
            </div>
          </div>
          <div class="double__input">
            <div class="box__input box__input--left">
              <div class="lable__input">
                {{ localesEmployee.Form.Specialize }}
              </div>
              <el-select
                v-model="employeeForm.departmentID"
                popper-class="bgr-unset"
                placeholder="Ch???n t??? b??? m??n"
              >
                <el-option
                  v-for="item in optionDepartments"
                  :key="item.departmentID"
                  :label="item.departmentName"
                  :value="item.departmentID"
                />
              </el-select>
            </div>
            <div class="box__input box__input--right">
              <div class="lable__input">
                {{ localesEmployee.Form.SubjectManagement }}
              </div>
              <el-select
                v-model="employeeForm.subjectID"
                multipleplaceholder="Ch???n m??n h???c"
              >
                <el-option-group
                  v-for="group in optionSubject"
                  :key="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.subjectID"
                    :label="item.subjectName"
                    :value="item.subjectID"
                  />
                </el-option-group>
              </el-select>
            </div>
          </div>
          <div class="box__input box__input--full">
            <div class="lable__input">
              {{ localesEmployee.Form.DepartmentManagement }}
            </div>
            <el-select
              v-model="employeeForm.roomID"
              placeholder="Ch???n ph??ng ban"
            >
              <el-option-group
                v-for="group in optionRooms"
                :key="group.roomName"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.roomID"
                  :label="item.roomName"
                  :value="item.roomID"
                />
              </el-option-group>
            </el-select>
          </div>
          <div class="box__check">
            <label class="container mr-20 w-25"
              >{{ localesEmployee.Form.IsTraining }}
              <input
                type="checkbox"
                :checked="employeeForm.isTraining"
                @click="selectInputCheckTrain(employeeForm.isTraining)"
              />
              <span class="checkmark"></span>
            </label>

            <label class="container mr-20 w-15"
              >{{ localesEmployee.Form.IsWorking }}
              <input
                type="checkbox"
                :checked="employeeForm.isWorking"
                @click="selectInputCheckWork(employeeForm.isWorking)"
              />
              <span class="checkmark"></span>
            </label>

            <div class="check__off">
              <div v-show="!employeeForm.isWorking" class="from__check-off">
                <el-date-picker
                  type="date"
                  :placeholder="localesEmployee.FormPlaceholder.DayOff"
                  :format="typeFortDate"
                  value-format="YYYY-MM-DD"
                  :disabled-date="(date) => date >= new Date()"
                  v-model="employeeForm.dayOff"
                />
                <div class="check__off--title">
                  {{ localesEmployee.Form.DateOff }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form__footer">
          <button class="btn btn__main" @click="saveData">L??u</button>
          <button
            class="btn btn__sub"
            @click="showDialogDetail"
            @keydown.tab="focusInputOne"
          >
            ????ng
          </button>
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
import localesEmployeeVi from "../../locales/vi/employee.js";
import DDialog from "@/components/base/DDialog.vue";
import DToolTip from "@/components/base/DToolTip.vue";
import { isVietnamesePhoneNumber, isEmail } from "../../format/regex.js";

import {
  getDepartments,
  getRooms,
  getSubjects,
  getEmployeeCode,
  addEmployee,
  updateEmployee,
  //   getByEmployeeCode,
} from "../../api/api.js";

export default {
  name: "WorkspaceJsonDadresDetail",
  props: {
    titleForm: {
      type: String,
      default: "",
    },
    employeeSelected: {
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
      // example h??? t??n, m?? code
      exampleFullname: localesEmployeeVi.Form.FullName,
      exampleCode: localesEmployeeVi.Form.EmployeeCode,
      typeFortDate: "DD/MM/YYYY",
      test: true,
      localesEmployee: {},
      employeeData: {},

      optionSubject: [
        {
          options: [
            {
              subjectID: "T???t c???",
              subjectName: "T???t c???",
            },
          ],
        },
        {
          options: [],
        },
      ],
      optionRooms: [
        {
          options: [
            {
              roomID: "T???t c???",
              roomName: "T???t c???",
            },
          ],
        },
        {
          options: [],
        },
      ],
      optionDepartments: [],

      ctrlPressed: false,

      // v-model
      employeeForm: {
        employeeCode: "",
        fullName: "",
        phoneNumber: "",
        departmentID: null,
        departmentName: "",
        roomID: null,
        roomName: "",
        subjectID: null,
        subjectName: "",
        email: "",
        isTraining: 1,
        isWorking: 1,
        dayOff: null,
        createdBy: "",
        modifiedBy: "",
      },
      // show component
      isShowDialogDetail: false,
      // L??u l???i validate
      errorValidate: [],

      // prop dialog
      headerDialogDetail: "",
      titleDialogDetail: "",
      titleBtnDialog1: "",
      titleBtnDialog2: "",
      titleBtnDialog3: "",
      activeBtnDialog1: false,
      activeBtnDialog2: false,

      isShowTooltip: false,
    };
  },
  created() {
    this.localesEmployee = localesEmployeeVi;
    this.employeeData = { ...this.employeeSelected };
    this.employeeForm = this.employeeData;
    this.handleGetDataCombobox();
    this.handleGetEmployeeCode();
  },
  mounted() {
    this.$refs.employeeCode.focus();
  },
  watch() {},
  methods: {
    /**
     * Thi???t l???p ph??m t???t
     * @param {event} e
     * Author: DVDUNG (13/11/2022)
     */
    keyEvent(e) {
      // B???m ESC ????? ????ng form popup
      if (e.keyCode == this.localesEmployee.Enum.KeyCode.ESC) {
        this.closeForm();
      } else if (e.which == this.localesEmployee.Enum.KeyCode.CTRL) {
        this.ctrlPressed = true;
      }
      // B???m CTRL F8 ????? l??u
      else if (
        e.keyCode == this.localesEmployee.Enum.KeyCode.F8 &&
        this.ctrlPressed == true
      ) {
        this.saveData();
        this.ctrlPressed = false;
      }
      // B???m CTRL F9 ????? h???y b???
      else if (
        e.keyCode == this.localesEmployee.Enum.KeyCode.F9 &&
        this.ctrlPressed == true
      ) {
        this.showDialogDetail();
        this.ctrlPressed = false;
      }
    },

    /**
     * ????ng form detail
     * Author: DVDUNG (30/10/2022)
     */
    btnCloseFormDetail() {
      this.$emit("closeFormDetail");
    },

    /**
     * G???i ?????n btn ????ng form Detail
     * AuthorL DVDUNG (30/10/2022)
     */
    closeForm() {
      this.btnCloseFormDetail();
    },
    /**
     * Ki???m tra xem ???? c?? d??? li???u khi blur ra kh???i input ch??a
     * @param {*} data
     * Author: DVDUNG (30/10/2022)
     */
    leaveFocusInput(data) {
      if (data == null || data == "") {
        // th??m border m??u ?????
        event.currentTarget.classList.add("errors");
        event.currentTarget.parentElement.classList.add("position-relative");
        this.isShowTooltip == true;
        // Th??m title th??ng b??o l???i (t???m th???i ch??a l??m v?? ch??a c???n)
      } else {
        event.currentTarget.classList.remove("errors");
        event.currentTarget.parentElement.classList.remove("position-relative");
        this.isShowTooltip == false;
      }
    },
    /**
     * Validate d??? li???u ?????u v??o
     * Author: DVDUNG (30/10/2022)
     */
    validateDate() {
      this.errorValidate = [];
      let data = this.employeeForm;
      if (data.employeeCode == null || data.employeeCode == "") {
        this.errorValidate.push(
          this.localesEmployee.Validate.EmployeeCodeRequired
        );
      }
      if (data.fullName == null || data.fullName == "") {
        this.errorValidate.push(this.localesEmployee.Validate.FullNameRequired);
      }

      // ki???m tra s??t ???? ????ng ?????nh d???ng ch??a
      if (data.phoneNumber != "" && data.phoneNumber != undefined) {
        if (!isVietnamesePhoneNumber(data.phoneNumber)) {
          this.errorValidate.push(
            this.localesEmployee.Validate.PhoneNumberRequired
          );
          this.$refs.phoneNumber.classList.add("errors");
          this.$refs.phoneNumber.parentElement.classList.add(
            "position-relative"
          );
        } else {
          this.$refs.phoneNumber.classList.remove("errors");
          this.$refs.phoneNumber.parentElement.classList.remove(
            "position-relative"
          );
        }
      } else {
        this.$refs.phoneNumber.classList.remove("errors");
        this.$refs.phoneNumber.parentElement.classList.remove(
          "position-relative"
        );
      }

      // Ki???m tra email ???? ????ng ?????nh d???ng ch??a
      if (data.email != "" && data.email != undefined) {
        if (!isEmail(data.email)) {
          this.errorValidate.push(this.localesEmployee.Validate.EmailRequired);
          this.$refs.email.classList.add("errors");
          this.$refs.email.parentElement.classList.add("position-relative");
        } else {
          this.$refs.email.parentElement.classList.remove("position-relative");
        }
      } else {
        this.$refs.email.parentElement.classList.remove("position-relative");
      }
    },

    /**
     * Hi???n th??ng b??o l???i validate d??? li???u
     * Author: DVDUNG (30/10/2022)
     */
    showDialogValidate() {
      let title = ``;
      for (let i in this.errorValidate) {
        title += `<span class="mb-3">- ${this.errorValidate[i]}</span><br>`;
      }
      this.headerDialogDetail =
        this.localesEmployee.Validate.TitleErrorValidate;
      // this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI;
      this.activeBtnDialog1 = false;
      this.activeBtnDialog2 = false;
      this.titleDialogDetail = title;
      this.titleBtnDialog3 = this.localesEmployee.Button.Close;
      this.isShowDialogDetail = true;
    },

    /**
     * ????ng dialog
     * Author: DVDUNG (30/10/2022)
     */
    closeDialog() {
      this.isShowDialogDetail = false;
      this.focusInputError();
    },

    /**
     * Hi???n th??? toast message
     * Author: DVDUNG (30/10/2022)
     */
    showToastMessage() {
      this.$emit("showToastMessage");
    },

    /**
     * Hi???n th??ng b??o khi ????ng form
     * Author: DVDUNG (5/11/2022)
     */
    showDialogDetail() {
      if (this.formMode == this.localesEmployee.FormMode.Add) {
        this.checkChangeFormAdd()
      }
      if (this.formMode == this.localesEmployee.FormMode.Edit) {
        this.checkChangeFormEdit()
      }
    },

    /**
     * L???y d??? li???u t??? form ????? truy???n ??i
     * Author: DVDUNG (30/10/2022)
     */
    pushData() {
      let data = this.employeeForm;
      // L???y ra t??n m??n h???c
      for (let item of this.optionSubject[1].options) {
        if (item.subjectID == data.subjectID) {
          data.subjectName = item.subjectName;
        }
      }

      // L???y ra t??n kho, ph??ng
      for (let item of this.optionRooms[1].options) {
        if (item.roomID == data.roomID) {
          data.roomName = item.roomName;
        }
      }

      // L???y ra t??n t??? b??? m??n
      for (let item of this.optionDepartments) {
        if (item.departmentID == data.departmentID) {
          data.departmentName = item.departmentName;
        }
      }

      // G???i API ????? th??m m???i d??? li???u v??o database
      if (this.formMode == this.localesEmployee.FormMode.Add) {
        try {
          addEmployee(this.employeeForm)
            .then((res) => {
              console.log(res.status);
              this.$parent.handleGetEmployeeList();
              this.showToastMessage();
              this.btnCloseFormDetail();
            })
            .catch((res) => {
              this.$parent.handleErrorBackEnd(res.response.status)
              this.isShowDialogDetail = true
            });
        } catch (error) {
          console.log(error);
        }
      }

      // G???i API ????? c???p nh???t d??? li???u trong database
      if (this.formMode == this.localesEmployee.FormMode.Edit) {
        console.log("helo");
        try {
          updateEmployee(this.employeeForm.employeeID, this.employeeForm)
            .then((res) => {
              console.log(res.status);
              this.showToastMessage();
              this.btnCloseFormDetail();
              this.$parent.handleGetEmployeeList();
            })
            .catch((res) => {
              // console.log(res.response.status);
              
              if (res.response.status == 400) {
                this.errorValidate.push(
                  this.localesEmployee.Validate.EmployeeCodeUnique
                );
                this.checkErrorValidate();
                console.log(this.errorValidate);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },

    /**
     * Thi???t l???p gi?? tr??? tr???ng th??i ????o t???o
     * Author: DVDUNG (12/11/2022)
     */
    selectInputCheckTrain(checkTrain) {
      if (checkTrain == 0) {
        this.employeeForm.isTraining = 1;
      } else {
        this.employeeForm.isTraining = 0;
      }
    },

    /**
     * Thi???t l???p gi?? tr??? tr???ng th??i l??m vi???c
     * Author: DVDUNG (12/11/2022)
     */
    selectInputCheckWork(checkWork) {
      if (checkWork == 0) {
        this.employeeForm.isWorking = 1;
      } else {
        this.employeeForm.isWorking = 0;
      }
    },

    /**
     * L??u d??? li???u
     * Author: DVDUNG (30/10/2022)
     */
    saveData() {
      if (this.employeeForm.isTraining) {
        this.employeeForm.isTraining = 1;
      } else {
        this.employeeForm.isTraining = 0;
      }

      // Thi???t l???p l???i gi?? tr??? c???a isWorking
      if (this.employeeForm.isWorking) {
        this.employeeForm.isWorking = 1;
      } else this.employeeForm.isWorking = 0;

      // G???i v??o h??m validate d??? li???u
      this.validateDate();
      this.checkErrorValidate();
    },

    /**
     * Ki???m tra
     * Author: DVDUNG (13/11/2022)
     */
    checkErrorValidate() {
      if (this.errorValidate.length > 0) {
        this.showDialogValidate();
      } else {
        this.pushData();
      }
    },

    /**
     * Ki???m tra c?? s??? thay ?????i ??? form th??m hay kh??ng
     * Author: DVDUNG (15/11/2022)
     */
    checkChangeFormAdd() {
        // Ki???m tra xem form th??ng tin c?? ???????c nh???p d??? li???u hay kh??ng
        let isChangeData = 0
        for(let i in this.employeeForm) {
            if (this.employeeForm[i] != "" && i != "employeeCode") {
                isChangeData = 1
            }
        }
        // Thi???t l???p tilte cho dialog c???nh b??o ????ng ??? form th??m
        if (this.employeeForm != null && isChangeData == 1) {
          this.titleBtnDialog3 = this.localesEmployee.Button.No;
          this.activeBtnDialog2 = true;
          this.titleBtnDialog2 = this.localesEmployee.Button.Cancel;
          this.headerDialogDetail = this.localesEmployee.Dialog.Header;
          this.titleDialogDetail = this.localesEmployee.Dialog.ContentAdd;
          this.isShowDialogDetail = true;
        }
        else {
            this.btnCloseFormDetail()
        }
    },

    /**
     * Ki???m tra c?? s??? thay ?????i ??? form s???a hay kh??ng
     * Author: DVDUNG (15/11/2022)
     */
    checkChangeFormEdit() {
        let isChangeData = 0
        for(let i in this.employeeForm) {
            if (this.employeeForm[i] != this.employeeSelected[i] ) {
                isChangeData = 1
            }
        }
        // Thi???t l???p tilte cho dialog c???nh b??o ????ng ??? form edit
        if (isChangeData == 1) {
          this.titleBtnDialog3 = this.localesEmployee.Button.No;
          this.activeBtnDialog2 = true;
          this.titleBtnDialog2 = this.localesEmployee.Button.Cancel;
          this.headerDialogDetail = this.localesEmployee.Dialog.Header;
          this.titleDialogDetail = `${this.localesEmployee.Dialog.ContentUpdateOne} ${this.employeeSelected.employeeCode} ${this.localesEmployee.Dialog.ContentUpdateTwo}`;
          this.isShowDialogDetail = true;
        }
        else {
            this.btnCloseFormDetail()
        }
    },
    /**
     * API l???y ra d??? li???u ph??ng, m??n h???c, t??? b??? m??n
     * Author: DVDUNG (7/11/2022)
     */
    handleGetDataCombobox() {
      try {
        // L???y ra ph??ng ban
        getRooms()
          .then((res) => {
            this.optionRooms[1].options = res.data;
          })
          .catch((res) => {
            this.$parent.handleErrorBackEnd(res.response.status)
            this.isShowDialogDetail = true
          });

        // L???y ra b??? ph???n s??? d???ng
        getDepartments()
          .then((res) => {
            this.optionDepartments = res.data;
          })
          .catch((res) => {
            this.$parent.handleErrorBackEnd(res.response.status)
            this.isShowDialogDetail = true
          });

        // L???y ra m??n h???c
        getSubjects()
          .then((res) => {
            this.optionSubject[1].options = res.data;
          })
          .catch((res) => {
            this.$parent.handleErrorBackEnd(res.response.status)
            this.isShowDialogDetail = true
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * L???y ra m?? t??i s???n t??? ?????ng t??ng
     * Author: DVDUNG (13/11/2022)
     */
    handleGetEmployeeCode() {
      getEmployeeCode().
      then((res) => {
        // console.log(res.data.NewEmployeeCode)
        if (this.formMode == this.localesEmployee.FormMode.Add) {
            this.employeeForm.employeeCode = res.data.NewEmployeeCode;
        }
      })
      .catch((res) => {
        this.$parent.handleErrorBackEnd(res.response.status)
        this.isShowDialogDetail = true
      });
    },

    /**
     * Focus v??o ?? input ?????u ti??n khi tab ?????n ?? cu???i c??ng
     * Author: DVDUNG (1/11/2022)
     */
    focusInputOne() {
      this.$refs.focusNext.focus();
    },

    /**
     * Focus v??o ?? input b??? l???i validate sau khi ????ng dialog c???nh b??o
     * Author: DVDUNG (15/11/2022)
     */
    focusInputError() {
      let inputCheck = document.querySelectorAll("[input-check]");
      // focus v??o input ?????u ti??n b??? validate l???i
      for (let item of inputCheck) {
        if (item.classList.contains("errors")) {
          item.focus();
          break;
        } else {
          this.$refs.employeeCode.focus();
        }
      }
    },
  },
  components: { DDialog, DToolTip },
};
</script>

<style scoped>
@import url("../../style/base/form.css");
@import url("../../style/base/button.css");
@import url("../../style/base/el-plus.css");
@import url("../../style/base/input.css");

.el-select-dropdown__item.selected {
  font-size: 13px !important;
  font-weight: 400 !important;
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
  padding-left: 16px !important;
}
</style>
