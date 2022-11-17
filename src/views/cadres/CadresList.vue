<template>
  <div id="cadres-list" v-show="!isShowNoData">
    <!-- toolbar -->
    <div class="toolbar">
      <div class="toolbar__left input__search">
        <input
          type="text"
          class="input"
          placeholder="Nhập tên"
          v-model="keyWord"
          @keyup.enter="handleGetEmployeeList()"
        />
        <div class="icon--search"></div>
      </div>
      <div class="toolbar__centre"></div>
      <div class="toolbar__right">
        <button
          class="btn__icon delete__multi position-absolute"
          v-show="isShowBtnDeleteMulti"
          @click="btnDeleteMulti"
          :class="{ disable: isLoading }"
        >
          {{ localesEmployee.Button.Delete }}
        </button>
        <button class="btn__icon icon--three-point" @click="showMore">
          <DToolTip
            class="show__tooltip ml--50"
            :text="localesEmployee.TooltipHover.More"
          />
        </button>
        <button class="btn btn__sub" :class="{ disable: isLoading }">
          {{ localesEmployee.Button.Export }}
        </button>
        <button
          class="btn btn__main"
          @click="btnAdd"
          :class="{ disable: isLoading }"
        >
          {{ localesEmployee.Button.AddNew }}
        </button>
      </div>
    </div>
    <!-- table -->
    <div class="table-main">
      <table class="table">
        <thead>
          <th style="width: 0">
            <label class="container ml-13">
              <input type="checkbox" @click="checkAll" />
              <span class="checkmark"></span>
            </label>
            <!-- <input type="checkbox" class="checkbox-x" @click="checkAll"> -->
          </th>
          <th style="min-width: 110px">
            {{ localesEmployee.TitleTable.EmployeeCode }}
          </th>
          <th style="min-width: 190px">
            {{ localesEmployee.TitleTable.FullName }}
          </th>
          <th style="min-width: 110px">
            {{ localesEmployee.TitleTable.PhoneNumber }}
          </th>
          <th style="min-width: 130px">
            {{ localesEmployee.TitleTable.Specialize }}
          </th>
          <th style="min-width: 130px">
            {{ localesEmployee.TitleTable.SubjectManagement }}
            <DToolTip
              class="show__tooltip ml-6"
              :text="localesEmployee.TooltipHover.SubjectManagement"
            />
          </th>
          <th style="min-width: 260px">
            {{ localesEmployee.TitleTable.DepartmentManagement }}
            <DToolTip
              class="show__tooltip l-25"
              :text="localesEmployee.TooltipHover.DepartmentManagement"
            />
          </th>
          <th style="min-width: 95px">
            {{ localesEmployee.TitleTable.IsTraining }}
            <DToolTip
              class="show__tooltip l--25"
              :text="localesEmployee.TooltipHover.IsTraining"
            />
          </th>
          <th style="min-width: 95px">
            {{ localesEmployee.TitleTable.IsWorking }}
          </th>
          <th style="min-width: 70px"></th>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.employeeID"
            @dblclick="rowDoubleClick(employee)"
          >
            <td class="text--centre" style="width: 0">
              <label class="container ml-13">
                <input
                  type="checkbox"
                  v-model="listIdCheck"
                  :value="employee.employeeID"
                />
                <span class="checkmark"></span>
              </label>
            </td>
            <td style="min-width: 100px" class="text--left">
              {{ employee.employeeCode }}
            </td>
            <td style="min-width: 180px" class="text--left text-color-primary">
              {{ employee.fullName }}
            </td>
            <td style="min-width: 90px" class="text--left">
              {{ employee.phoneNumber }}
            </td>
            <td style="min-width: 105px" class="text--left">
              {{ employee.departmentName }}
            </td>
            <td style="min-width: 100px" class="text--left">
              {{ employee.subjectName }}
            </td>
            <td style="min-width: 190px" class="text--left">
              {{ employee.roomName }}
            </td>
            <td style="min-width: 80px" class="text--centre">
              <div :class="{ icon__checked: employee.isTraining }"></div>
            </td>
            <td style="min-width: 80px" class="text--centre">
              <div :class="{ icon__checked: employee.isWorking }"></div>
            </td>
            <td style="min-width: 60px" class="text--centre">
              <div class="icon__function">
                <div class="icon__edit" @click="btnEdit(employee)">
                  <DToolTip
                    class="show__tooltip l-25"
                    :text="localesEmployee.TooltipHover.Update"
                  />
                </div>
                <div class="icon__delete" @click="btnDeleteOne(employee)">
                  <DToolTip
                    class="show__tooltip l-25"
                    :text="localesEmployee.TooltipHover.Delete"
                  />
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
                  <input
                    class="page__current"
                    v-model="currentPage"
                    min="0"
                    :max="totalPage"
                  />
                  <button class="btn__paging number__next"></button>
                  <button class="btn__paging number__last"></button>
                </div>
                <div class="paging__info">
                  <div class="totalCount">
                    {{ this.currentPage }}/{{ this.totalPage }} trang
                  </div>
                  <div class="totalCadres">
                    (<b>{{ this.totalCount }}</b> giáo viên)
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="paging">
      <div class="page__number">
        <button
          class="btn__paging number__first ml-6"
          @click="firstPage"
          :class="{ disable: currentPage == 1 }"
        >
          <DToolTip
            class="show__tooltip l-25"
            :text="localesEmployee.TooltipHover.FirstPage"
          />
        </button>
        <button
          class="btn__paging number__previous"
          @click="previousPage"
          :class="{ disable: currentPage == 1 }"
        >
          <DToolTip
            class="show__tooltip l-25"
            :text="localesEmployee.TooltipHover.PrevPage"
          />
        </button>
        <input
          class="page__current"
          type="number"
          @keyup.enter="paging(currentPage)"
          min="0"
          :max="totalPage"
          ref="currentPage"
          v-model="currentPage"
        />
        <button
          class="btn__paging number__next"
          @click="nextPage"
          :class="{ disable: currentPage == totalPage }"
        >
          <DToolTip
            class="show__tooltip l-25"
            :text="localesEmployee.TooltipHover.NextPage"
          />
        </button>
        <button
          class="btn__paging number__last"
          @click="lastPage"
          :class="{ disable: currentPage == totalPage }"
        >
          <DToolTip
            class="show__tooltip l-25"
            :text="localesEmployee.TooltipHover.LastPage"
          />
        </button>
      </div>
      <div class="paging__info">
        <div class="totalCount">
          {{ this.currentPage }}/{{ this.totalPage }} trang
        </div>
        <div class="totalCadres">
          (<b>{{ this.totalCount }}</b> giáo viên)
        </div>
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
      <button class="btn btn__main" @click="btnAdd">
        {{ localesEmployee.Button.AddNew }}
      </button>
      <button class="btn btn__main" @click="btnAdd">
        {{ localesEmployee.Button.AddRapid }}
      </button>
    </div>
  </div>
  <CadresDetail
    v-if="isShowCadresDetail"
    :formMode="formMode"
    :employeeSelected="employeeSelected"
    @closeFormDetail="closeFormDetail()"
    @showToastMessage="showToastMessage()"
    :titleForm="titleForm"
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
import CadresDetail from "./CadresDetail.vue";
import DToastMessage from "@/components/base/DToastMessage.vue";
import localesEmployeeVi from "../../locales/vi/employee.js";
import DToolTip from "@/components/base/DToolTip.vue";
import DLoading from "@/components/base/DLoading.vue";
import DDialog from "@/components/base/DDialog.vue";

import {
  getPagingFilter,
  deleteEmployee,
  deleteMultipleEmployee,
} from "../../api/api.js";

export default {
  name: "WorkspaceJsonCadresList",
  data() {
    return {
      localesEmployee: {},
      employeeSelected: {},
      employees: {},

      currentPage: 1,
      keyWord: "",
      totalPage: 2,
      totalCount: 56,
      isShowCadresDetail: false,
      isShowToast: false,
      formMode: "",
      titleForm: "",
      isShowNoData: false,
      isShowBtnDeleteMulti: false,
      isLoading: false,

      listIdCheck: [],
      selectAll: false,
      deleteOne: "",

      // Dialog
      isShowDialog: false,
      headerDialog: "",
      titleDialog: "",
      titleBtnDialog1: "",
      titleBtnDialog2: "",
      titleBtnDialog3: "",
      activeBtnDialog1: false,
      activeBtnDialog2: false,
    };
  },
  watch: {
    // keyWord() {
    //     this.handleGetEmployeeList();
    // },

    currentPage(newValue) {
      if (newValue > this.totalPage) {
        this.currentPage = this.totalPage;
      }
      if (newValue == "") {
        this.currentPage = 1;
      }
    },
  },

  created() {
    this.handleGetEmployeeList();
    this.localesEmployee = localesEmployeeVi;
    window.addEventListener("keydown", this.keyDownBtn);
  },

  mounted() {},

  destroys() {
    window.removeEventListener("keydown", this.keyDownBtn);
  },

  methods: {
    /**
     * Thiết lập phím tắt
     * Author: DVDUNG (13/11/2022)
     */
    keyDownBtn() {
      if (event.keyCode == this.localesEmployee.Enum.KeyCode.INSERT) {
        this.btnAdd();
      }
    },
    /**
     * Mở form detail
     * Author: DVDUNG (30/10/2022)
     */
    btnAdd() {
      this.employeeSelected = {};
      this.isShowCadresDetail = true;
      this.formMode = this.localesEmployee.FormMode.Add;
      this.titleForm = this.localesEmployee.Form.TitleAdd;
    },

    /**
     * Đóng form detail
     * Author: DVDUNG (30/10/2022)
     */
    closeFormDetail() {
      this.isShowCadresDetail = false;
    },

    /**
     * Btn chỉnh sửa bản ghi
     * Author: DVDUNG (30/10/2022)
     */
    btnEdit(data) {
      this.rowDoubleClick(data);
    },

    /**
     * Btn xóa một bản ghi
     * Author: DVDUNG (30/10/2022)
     */
    btnDeleteOne(data) {
      // Thiết lập formMode
      this.formMode = this.localesEmployee.FormMode.DeleteOne;
      // Thiết lập title cho dialog cảnh báo xóa
      this.titleBtnDialog3 = this.localesEmployee.Button.Delete;
      this.titleBtnDialog2 = this.localesEmployee.Button.No;
      this.activeBtnDialog2 = true;
      this.headerDialog = this.localesEmployee.Dialog.Header;
      this.titleDialog = this.localesEmployee.Dialog.ContentDeleteOne;
      // Đưa tích checkbox về employee muốn xóa
      this.listIdCheck = [];
      this.listIdCheck.push(data.employeeID);
      // Hiển thị dialog cảnh báo xóa
      this.isShowDialog = true;
      this.deleteOne = "";
      this.deleteOne = data.employeeID;
      // this.pushData(data)
    },

    /**
     * Btn xóa nhiều bản ghi
     * Author: DVDUNG (30/10/2022)
     */
    btnDeleteMulti() {
      // Thiết lập formMode
      this.formMode = this.localesEmployee.FormMode.DeleteMultiple;
      // Thiết lập title cho dialog cảnh báo xóa
      this.titleBtnDialog3 = this.localesEmployee.Button.Delete;
      this.titleBtnDialog2 = this.localesEmployee.Button.No;
      this.activeBtnDialog2 = true;
      this.headerDialog = this.localesEmployee.Dialog.Header;
      this.titleDialog = this.localesEmployee.Dialog.ContentDeleteOne;
      //Hiện dialog cảnh báo xóa
      this.isShowDialog = true;
      // this.handleDeleteMulti()
    },

    /**
     * Hiện toast message sau khi hoàn thành tác vụ
     * Author: DVDUNG (30/10/2022)
     */
    showToastMessage() {
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
    },

    /**
     * Click vào btn more --> Hiện btn xóa nhiều
     * Author: DVDUNG (30/10/2022)
     */
    showMore() {
      this.isShowBtnDeleteMulti = !this.isShowBtnDeleteMulti;
    },

    /**
     * Hiện dialog
     * Author: DVDUNG (30/10/2022)
     */
    showDialog() {
      this.isShowDialog = true;
    },

    /**
     * Bắt sự kiện btn 3 ở dialog
     * Author: DVDUNG (30/10/2022)
     */
    closeDialog() {
      // Thực hiện xóa một nếu formMode = 3
      if (this.formMode == this.localesEmployee.FormMode.DeleteOne) {
        this.handleDeleteOne();
        this.showToastMessage();
      }

      // Thực hiện xóa nhiều nếu formMode = 4
      if (this.formMode == this.localesEmployee.FormMode.DeleteMultiple) {
        this.handleDeleteMulti();
        this.showToastMessage();
      }
      this.isShowDialog = false;
    },

    /**
     * Đóng form
     * Author: DVDUNG (30/10/2022)
     */
    closeForm() {
      this.isShowDialog = false;
    },

    /**
     * API Lấy dữ liệu (lọc, phân trang)
     * Author: DVDUNG (5/11/2022)
     */
    async handleGetEmployeeList() {
      try {
        this.isLoading = true;
        let where = "";
        if (this.keyWord != "") {
          where = `keyWord=${this.keyWord}&pageNumber=${this.currentPage}`;
        } else where = `pageNumber=${this.currentPage}`;

        await getPagingFilter(where)
          .then((res) => {
            // API của tôi
            this.currentPage = res.data.currentPageNumber;
            this.totalCount = res.data.totalRecord;
            this.totalPage = res.data.totalPage;
            this.employees = res.data.data;
          })
          .catch((res) => {
            this.handleErrorBackEnd(res.response.status)
            this.isShowDialog = true;

          })
          .finally(() => {
            this.isLoading = false;
          });
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Gọi Api xóa 1 bản ghi
     * Author: DVDUNG (11/11/2022)
     */
    handleDeleteOne() {
      try {
        deleteEmployee(this.deleteOne)
          .then()
          .catch((res) => {
            this.handleErrorBackEnd(res.response.status)
            this.isShowDialog = true;


          })
          .finally(() => {
            this.handleGetEmployeeList();
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi Api xóa nhiều bản ghi
     * Author: DVDUNG (11/11/2022)
     */
    handleDeleteMulti() {
      deleteMultipleEmployee(this.listIdCheck)
        .then()
        .catch((res) => {
          this.handleErrorBackEnd(res.response.status)
            this.isShowDialog = true;

        })
        .finally(() => {
          this.handleGetEmployeeList();
        });
    },

    /**
     * CLick đúp chuột, mở form chỉnh sửa bản ghi
     * @param {employeeSelected} data
     * Author: DVDUNG (30/10/2022)
     */
    rowDoubleClick(data) {
      this.employeeSelected = data;
      // console.log(data)
      this.isShowCadresDetail = true;
      this.formMode = this.localesEmployee.FormMode.Edit;
      console.log(this.formMode);
      this.titleForm = this.localesEmployee.Form.TitleEdit;
    },

    /**
     * Khi tích vào checkbox trong thẻ thead thì tất cả checkbox khác đều được tích
     * Author: DVDUNG (5/11/2022)
     */
    checkAll() {
      try {
        this.listIdCheck = [];
        if (!this.selectAll) {
          for (let i of this.employees) {
            this.listIdCheck.push(i.employeeID);
          }
        }
        // console.log(this.listIdCheck)
        this.selectAll = !this.selectAll;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ấn button mũi tên trái để về trang đầu tiên
     * Author: DVDUNG (5/11/2022)
     */
    firstPage() {
      if (this.currentPage > 1) {
        this.currentPage = 1;
        this.handleGetEmployeeList();
      }
    },

    /**
     * Ấn button mũi tên trái để lùi 1 trang
     * Author: DVDUNG (5/11/2022)
     */
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.handleGetEmployeeList();
      }
    },

    /**
     * Ấn button mũi tên phải để tiến 1 trang
     * Author: DVDUNG (5/11/2022)
     */
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
        this.handleGetEmployeeList();
      }
    },

    /**
     * Ấn button mũi tên trái để đến trang cuối cùng
     * Author: DVDUNG (5/11/2022)
     */
    lastPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage = this.totalPage;
        this.handleGetEmployeeList();
      }
    },

    /**
     * Chỉ nhập được trang lớn nhất bằng với số trang có
     * Author: DVDUNG (14/11/2022)
     */
    paging(newValue) {
      if (newValue > this.totalPage) {
        this.currentPage = this.totalPage;
      }
      this.handleGetEmployeeList();
    },

    /**
     * Hanlde lỗi back-end trả về
     * Author: DVDUNG (17/11/2022)
     */
    handleErrorBackEnd(status) {
          this.titleBtnDialog3 = this.localesEmployee.Button.Delete;
          this.titleBtnDialog2 = this.localesEmployee.Button.No;
          this.activeBtnDialog2 = true;
          this.headerDialog = this.localesEmployee.Dialog.Header;
          switch (status) {
            case 400: 
                this.titleDialog = this.localesEmployee.StatusBackend.Status400;
                break
            case 404: 
                this.titleDialog = this.localesEmployee.StatusBackend.Status404;
                break
            case 500: 
                this.titleDialog = this.localesEmployee.StatusBackend.Status500;
                break
            default: 
                this.titleDialog = this.localesEmployee.StatusBackend.DefaultError;
          }
    }
  },
  components: { CadresDetail, DToastMessage, DToolTip, DLoading, DDialog },
};
</script>

<style scoped>
@import url("../../style/base/input.css");
@import url("../../style/base/button.css");
@import url("../../style/layout/content.css");
@import url("../../style/base/table.css");
@import url("../../style/base/paging.css");
@import url("../../style/base/common.css");
</style>
