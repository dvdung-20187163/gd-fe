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
                placeholder="Chọn tổ bộ môn"
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
                multipleplaceholder="Chọn môn học"
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
              placeholder="Chọn phòng ban"
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
          <button class="btn btn__main" @click="saveData">Lưu</button>
          <button
            class="btn btn__sub"
            @click="showDialogDetail"
            @keydown.tab="focusInputOne"
          >
            Đóng
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
      // example họ tên, mã code
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
              subjectID: "Tất cả",
              subjectName: "Tất cả",
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
              roomID: "Tất cả",
              roomName: "Tất cả",
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
      // Lưu lỗi validate
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
     * Thiết lập phím tắt
     * @param {event} e
     * Author: DVDUNG (13/11/2022)
     */
    keyEvent(e) {
      // Bấm ESC để đóng form popup
      if (e.keyCode == this.localesEmployee.Enum.KeyCode.ESC) {
        this.closeForm();
      } else if (e.which == this.localesEmployee.Enum.KeyCode.CTRL) {
        this.ctrlPressed = true;
      }
      // Bấm CTRL F8 để lưu
      else if (
        e.keyCode == this.localesEmployee.Enum.KeyCode.F8 &&
        this.ctrlPressed == true
      ) {
        this.saveData();
        this.ctrlPressed = false;
      }
      // Bấm CTRL F9 để hủy bỏ
      else if (
        e.keyCode == this.localesEmployee.Enum.KeyCode.F9 &&
        this.ctrlPressed == true
      ) {
        this.showDialogDetail();
        this.ctrlPressed = false;
      }
    },

    /**
     * Đóng form detail
     * Author: DVDUNG (30/10/2022)
     */
    btnCloseFormDetail() {
      this.$emit("closeFormDetail");
    },

    /**
     * Gọi đến btn đóng form Detail
     * AuthorL DVDUNG (30/10/2022)
     */
    closeForm() {
      this.btnCloseFormDetail();
    },
    /**
     * Kiểm tra xem đã có dữ liệu khi blur ra khỏi input chưa
     * @param {*} data
     * Author: DVDUNG (30/10/2022)
     */
    leaveFocusInput(data) {
      if (data == null || data == "") {
        // thêm border màu đỏ
        event.currentTarget.classList.add("errors");
        event.currentTarget.parentElement.classList.add("position-relative");
        this.isShowTooltip == true;
        // Thêm title thông báo lỗi (tạm thời chưa làm vì chưa cần)
      } else {
        event.currentTarget.classList.remove("errors");
        event.currentTarget.parentElement.classList.remove("position-relative");
        this.isShowTooltip == false;
      }
    },
    /**
     * Validate dữ liệu đầu vào
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

      // kiểm tra sđt đã đúng định dạng chưa
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

      // Kiểm tra email đã đúng định dạng chưa
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
     * Hiện thông báo lỗi validate dữ liệu
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
     * Đóng dialog
     * Author: DVDUNG (30/10/2022)
     */
    closeDialog() {
      this.isShowDialogDetail = false;
      this.focusInputError();
    },

    /**
     * Hiển thị toast message
     * Author: DVDUNG (30/10/2022)
     */
    showToastMessage() {
      this.$emit("showToastMessage");
    },

    /**
     * Hiện thông báo khi đóng form
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
     * Lấy dữ liệu từ form để truyền đi
     * Author: DVDUNG (30/10/2022)
     */
    pushData() {
      let data = this.employeeForm;
      // Lấy ra tên môn học
      for (let item of this.optionSubject[1].options) {
        if (item.subjectID == data.subjectID) {
          data.subjectName = item.subjectName;
        }
      }

      // Lấy ra tên kho, phòng
      for (let item of this.optionRooms[1].options) {
        if (item.roomID == data.roomID) {
          data.roomName = item.roomName;
        }
      }

      // Lấy ra tên tổ bộ môn
      for (let item of this.optionDepartments) {
        if (item.departmentID == data.departmentID) {
          data.departmentName = item.departmentName;
        }
      }

      // Gọi API để thêm mới dữ liệu vào database
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

      // Gọi API để cập nhật dữ liệu trong database
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
     * Thiết lập giá trị trạng thái đào tạo
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
     * Thiết lập giá trị trạng thái làm việc
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
     * Lưu dữ liệu
     * Author: DVDUNG (30/10/2022)
     */
    saveData() {
      if (this.employeeForm.isTraining) {
        this.employeeForm.isTraining = 1;
      } else {
        this.employeeForm.isTraining = 0;
      }

      // Thiết lập lại giá trị của isWorking
      if (this.employeeForm.isWorking) {
        this.employeeForm.isWorking = 1;
      } else this.employeeForm.isWorking = 0;

      // Gọi vào hàm validate dữ liệu
      this.validateDate();
      this.checkErrorValidate();
    },

    /**
     * Kiểm tra
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
     * Kiểm tra có sự thay đổi ở form thêm hay không
     * Author: DVDUNG (15/11/2022)
     */
    checkChangeFormAdd() {
        // Kiểm tra xem form thông tin có được nhập dữ liệu hay không
        let isChangeData = 0
        for(let i in this.employeeForm) {
            if (this.employeeForm[i] != "" && i != "employeeCode") {
                isChangeData = 1
            }
        }
        // Thiết lập tilte cho dialog cảnh báo đóng ở form thêm
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
     * Kiểm tra có sự thay đổi ở form sửa hay không
     * Author: DVDUNG (15/11/2022)
     */
    checkChangeFormEdit() {
        let isChangeData = 0
        for(let i in this.employeeForm) {
            if (this.employeeForm[i] != this.employeeSelected[i] ) {
                isChangeData = 1
            }
        }
        // Thiết lập tilte cho dialog cảnh báo đóng ở form edit
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
     * API lấy ra dữ liệu phòng, môn học, tổ bộ môn
     * Author: DVDUNG (7/11/2022)
     */
    handleGetDataCombobox() {
      try {
        // Lấy ra phòng ban
        getRooms()
          .then((res) => {
            this.optionRooms[1].options = res.data;
          })
          .catch((res) => {
            this.$parent.handleErrorBackEnd(res.response.status)
            this.isShowDialogDetail = true
          });

        // Lấy ra bộ phận sử dụng
        getDepartments()
          .then((res) => {
            this.optionDepartments = res.data;
          })
          .catch((res) => {
            this.$parent.handleErrorBackEnd(res.response.status)
            this.isShowDialogDetail = true
          });

        // Lấy ra môn học
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
     * Lấy ra mã tài sản tự động tăng
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
     * Focus vào ô input đầu tiên khi tab đến ô cuối cùng
     * Author: DVDUNG (1/11/2022)
     */
    focusInputOne() {
      this.$refs.focusNext.focus();
    },

    /**
     * Focus vào ô input bị lỗi validate sau khi đóng dialog cảnh báo
     * Author: DVDUNG (15/11/2022)
     */
    focusInputError() {
      let inputCheck = document.querySelectorAll("[input-check]");
      // focus vào input đầu tiên bị validate lỗi
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
