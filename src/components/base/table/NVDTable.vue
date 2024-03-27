<template>
  <div class="grid-list-data">
    <!-- Thực hiện hàng loạt -->
    <div
      class="batch-exection"
      :class="{ 'disable_batch-exection': listIdChecked.length == 0 }"
    >
      <div>
        Đã chọn
        <span v-if="selectedAllPages">tất cả </span>
        <b v-if="selectedAllPages">{{ totalEmpl }}</b>
        <b v-if="!selectedAllPages">{{ listIdChecked.length }}</b>
      </div>
      <a
        class="btn-unchecked"
        v-if="listIdChecked.length > 1"
        style="margin-left: 16px; color: red; cursor: pointer"
        @click="clearAllChecked"
        >Bỏ chọn</a
      >
      <a
        class="btn-selected-all-pages"
        v-if="listIdChecked.length == dataTable.length && !selectedAllPages"
        style="margin-left: 16px; color: #1565c0; cursor: pointer"
        @click="selectedAllPages = true"
        >Chọn tất cả các trang</a
      >
      <m-button
        style="margin-left: 25px"
        class="m-btn-secondary m-btn-icon"
        :hasIcon="true"
        classIcon="mi-delete"
        @click="deleteEmployeeChecked"
        >Xóa</m-button
      >
    </div>
    <!-- Các hành động khác -->
    <div class="other-action">
      <!-- textfield search -->
      <m-text-field
        ref="textFieldSearch"
        class="m-textfield-icon-action"
        :haveLabel="false"
        :placeholderTextField="this.$resource['vi-VN'].textfield.placeholder"
        @iconActionClick="btnSearchClick"
        @inputOnChange="textFieldOnChange"
      ></m-text-field>
      <!-- xuất file excel -->
      <a
        class="m-btn-for-icon"
        style="margin-right: 20px"
        :title="this.$resource['vi-VN'].buttonIcon.titleExcel"
        @click="btnExportExcelClick"
      >
        <div class="mi mi-24 mi-excel"></div>
      </a>
      <!-- refresh -->
      <a
        class="m-btn-for-icon"
        :title="this.$resource['vi-VN'].buttonIcon.titleRefresh"
        @click="btnRefreshDataClick"
      >
        <div class="mi mi-24 mi-refresh"></div>
      </a>
    </div>
  </div>
  <div
    class="grid-model-control"
    :class="{ 'disable_grid-model-control': selectedAllPages }"
  >
    <div class="ms-grid-viewer scroller" @scroll="onScrollCloseContextMenu">
      <table class="ms-table-viewer">
        <thead>
          <tr>
            <th class="width-col-1 fixed-column-checkbox">
              <m-checkbox
                :hasLabel="false"
                :value="checkboxAll || dataTable.length == listIdChecked.length"
                @Click="checkboxAllClick"
              ></m-checkbox>
            </th>
            <th class="width-col-2">MÃ NHÂN VIÊN</th>
            <th class="width-col-3">TÊN NHÂN VIÊN</th>
            <th class="width-col-4">GIỚI TÍNH</th>
            <th class="width-col-5 col-date">NGÀY SINH</th>
            <th class="width-col-6" title="Số chứng minh nhân dân">SỐ CMND</th>
            <th class="width-col-7">CHỨC DANH</th>
            <th class="width-col-8">TÊN ĐƠN VỊ</th>
            <th class="width-col-9">SỐ TÀI KHOẢN</th>
            <th class="width-col-10">TÊN NGÂN HÀNG</th>
            <th class="width-col-11" title="Chi nhánh tài khoản ngân hàng">
              CHI NHÁNH TK NGÂN HÀNG
            </th>
            <th class="width-col-12 fixed-column-funtion">CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dataTable"
            :key="item.EmployeeId"
            :class="{
              'row-selected':
                item.EmployeeId == employeeSelected.employeeIdSelected,
              'row-checked': listIdChecked.includes(item.EmployeeId),
            }"
            @click="tableRowClick(item)"
            v-on:dblclick="editEmployee(item)"
          >
            <td class="width-col-1 fixed-column-checkbox">
              <m-checkbox
                :hasLabel="false"
                :value="listIdChecked.includes(item.EmployeeId)"
                @checkboxChangeValue="
                  checkboxChangeValue($event, item.EmployeeId)
                "
              ></m-checkbox>
            </td>
            <!-- Mã nhân viên -->
            <td class="width-col-2" :title="item.EmployeeCode || ''">
              {{ item.EmployeeCode || "" }}
            </td>
            <!-- Họ tên -->
            <td class="width-col-3" :title="item.FullName || ''">
              {{ item.FullName || "" }}
            </td>
            <!-- Gioi tinh -->
            <td class="width-col-4">
              {{
                item.Gender === this.$enum.gender.MALE
                  ? this.$resource["vi-VN"].gender.MALE
                  : item.Gender === this.$enum.gender.FEMALE
                  ? this.$resource["vi-VN"].gender.FEMALE
                  : item.Gender === this.$enum.gender.ORTHER
                  ? this.$resource["vi-VN"].gender.ORTHER
                  : ""
              }}
            </td>
            <!-- Ngày sinh -->
            <td class="width-col-5 col-date" :title="item.DateOfBirth || ''">
              {{ $helper.formatDate(item.DateOfBirth) || "" }}
            </td>
            <!-- Số chứng minh nhân dân -->
            <td class="width-col-6" :title="item.IdentityNumber || ''">
              {{ item.IdentityNumber || "" }}
            </td>
            <!-- Chức danh -->
            <td class="width-col-7" :title="item.PositionName || ''">
              {{ item.PositionName || "" }}
            </td>
            <!-- Đơn vị -->
            <td class="width-col-8" :title="item.DepartmentName || ''">
              {{ item.DepartmentName || "" }}
            </td>
            <!-- Số tài khoản -->
            <td class="width-col-9" :title="item.BankAccount || ''">
              {{ item.BankAccount || "" }}
            </td>
            <!-- Ngân hàng -->
            <td class="width-col-10" :title="item.BankName || ''">
              {{ item.BankName || "" }}
            </td>
            <!-- Chi nhánh tài khoản ngân hàng -->
            <td class="width-col-11" :title="item.BankBranch || ''">
              {{ item.BankBranch || "" }}
            </td>
            <td class="width-col-12 funtion fixed-column-funtion">
              <a
                class="m-btn-for-icon m-btn-open-popup"
                @click="editEmployee(item)"
                >Sửa</a
              >
              <a
                class="m-btn-for-icon"
                @click.stop="
                  showHideContextMenu(
                    $event,
                    item.EmployeeId,
                    item.EmployeeCode
                  )
                "
              >
                <div class="mi mi-16 mi-arrow-up-blue"></div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Context menu -->
    <NVDContextMenu
      style="position: fixed; z-index: 11"
      v-show="contextMenu.isShow"
      ref="contextMenuElement"
      :style="{
        top: `${contextMenu.y}px`,
        left: `${contextMenu.x}px`,
      }"
      :items="[
        this.$resource['vi-VN'].contextMenu.itemDelete,
        this.$resource['vi-VN'].contextMenu.itemDuplicate,
        this.$resource['vi-VN'].contextMenu.itemUse,
      ]"
      @contextMenuItemClick="contextMenuItemClick"
    ></NVDContextMenu>
  </div>
</template>
<script>
import NVDContextMenu from "../contextmenu/NVDContextMenu.vue";
export default {
  name: "NVDTable",
  emits: [
    "editEmployee",
    "selectedAllPages",
    "deleteAllEmployees",
    "deleteEmployeeChecked",
    "changeInputSearch",
    "duplicate",
  ],
  inject: [
    "toastSuccess200",
    "toastWarning",
    "showDialogError",
    "showDialogWarningOneButton",
    "showDialogWarningTwoButtons",
    "showDialogInfoThreeButtons",
    "handleAPIError",
  ],
  components: {
    NVDContextMenu,
  },
  data() {
    return {
      /* Thông tin nhân viên được chọn */
      employeeSelected: {
        employeeIdSelected: "",
        employeeCodeSelected: "",
      },

      checkboxAll: false,

      selectedAllPages: false /* chọn tất cả các trang */,

      /**
       * Đánh dấu chế độ xóa
       * true: xóa theo listIdChecked
       * false: xóa 1 nhân viên employeeIdSelected
       */
      isDeleteListChecked: false,

      /* Vị trí menu context */
      contextMenu: {
        isShow: false,
        x: 0,
        y: 0,
      },

      /* Dữ liệu ô tìm kiếm */
      dataInputSearch: "",

      // Đánh dấu nội dung dialog để phân biệt khi xử lý click nút bấm
      noteContentDialog: "",
    };
  },
  props: {
    /**
     * Danh sách bản ghi hiển thị trên table
     */
    dataTable: {
      type: Array,
      required: true,
    },
    /**
     * Tổng số bản ghi trên n trang.
     */
    totalEmpl: {
      type: Number,
      required: true,
    },
    /**
     * Danh sách Id nhân viên đã chọn ở các trang khác nhau
     */
    dataEmployeeIdsChecked: {
      type: Array,
      required: true,
    },
  },
  computed: {
    /**
     * danh sách id các nhân viên đã chọn trong table hiện tại
     * Author: NVDUNG (01/10/2023)
     */
    listIdChecked() {
      var listIdCheckedOnPage = [];
      if (this.dataEmployeeIdsChecked != undefined) {
        // Kiểm tra item.EmployeeId trong table có trong dataEmployeeIdsSelected hay không?
        this.dataTable.forEach((item) => {
          if (this.dataEmployeeIdsChecked.includes(item.EmployeeId)) {
            listIdCheckedOnPage.push(item.EmployeeId);
          }
        });
      }
      return listIdCheckedOnPage;
    },
  },
  created() {
    /* ===== Sự kiện this.$nextTick() để callback thực hiện khi load DOM hoàn tất ===== */
    // this.$nextTick(function () {
    //   console.log("this.$nextTick()");
    //   this.clickOutContextMenu();
    // });
    /* ============== Event Dialog dialogButton1Click ============== */
    /**
     * Tạo lắng nghe sự kiện Dialog dialogButton1Click
     * Author: NVDUNG (18/09/2023)
     */
    this.$emitter.on("dialogButton1Click", this.dialogButton1Click);
  },
  mounted() {
    // Focus ô inputSearch
    this.setFocusTextFieldSearch();
  },
  beforeUnmount() {
    /* ============== Event Dialog dialogButton1Click ============== */
    /**
     * Hủy lắng nghe sự kiện Dialog dialogButton1Click
     * Author: NVDUNG (18/09/2023)
     */
    this.$emitter.off("dialogButton1Click");
  },

  methods: {
    /* ============== Export Excel ================= */

    /**
     * Lấy file excel và tải xuống
     * Author: NVDUNG (06/10/2023)
     */
    async btnExportExcelClick() {
      // Hiện loading
      this.$emitter.emit("showLoading", true);
      try {
        var response = await this.$repository.employeesExportToExcel();
        console.log("Export Excel response: ", response);

        if (response.httpStatusCode === 200) {
          const url = window.URL.createObjectURL(new Blob([response.blob]));

          const a = document.createElement("a");
          a.href = url;
          a.download = "DanhSachNhanVien.xlsx";
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        // Thất bại => Hiển thị lỗi trả về từ response
        else {
          // Đánh dấu nội dung thông báo lỗi
          this.noteContentDialog =
            this.$resource["vi-VN"].dialog.ContentErrorGenaral;
          // Gọi hàm xử lý lỗi API chung
          this.handleAPIError(response);
        }
      } catch (error) {
        // Xử lý lỗi
        console.error("Lỗi khi gọi API:", error);
        // Đánh dấu nội dung thông báo lỗi
        this.noteContentDialog =
          this.$resource["vi-VN"].dialog.ContentErrorGenaral;
        // Tạo dialog thông báo lỗi
        this.showDialogError(
          error.userMsg != undefined
            ? error.userMsg
            : this.$resource["vi-VN"].dialog.apiError.massageContactNVD
        );
        console.error(error.devMsg);
      }
      // Tắt loading
      this.$emitter.emit("showLoading", false);
    },
    /* ============== Focus textfield search ================= */
    setFocusTextFieldSearch() {
      var inputSearchEmlement = this.$refs.textFieldSearch.$refs.inputTextField;
      if (inputSearchEmlement) {
        inputSearchEmlement.focus();
      }
    },
    /* ============== table row click ================= */
    /**
     * Hàm thực hiện lưu trữ thông tin nhân viên được chọn
     * @param {object} item bản ghi nhân viên
     * Author: NVDUNG (22/08/2023)
     */
    tableRowClick(item) {
      this.employeeSelected.employeeIdSelected = item.EmployeeId;
      this.employeeSelected.employeeCodeSelected = item.EmployeeCode;
    },

    /* ============== button refresh ================= */
    /**
     * Hàm thực hiện refresh dữ liệu
     * Author: NVDUNG (22/08/2023)
     * Modified: NVDUNG (30/09/2023)
     */
    btnRefreshDataClick() {
      this.dataInputSearch = "";
      this.$emitter.emit("refreshData");
    },

    /* ============== Xử lý checkbox ================= */
    /**
     * Cập nhật tất cả checkbox theo giá trị của checkboxAll
     * Author: NVDUNG (22/08/2023)
     * Modified: NVDUNG (01/10/2023)
     */
    checkboxAllClick() {
      try {
        // toggle checkboxAll
        this.checkboxAll = !this.checkboxAll;

        // Thêm hoặc xóa ids trong dataEmployeeIdsSelected ở component cha
        var ids = this.dataTable.map((item) => item.EmployeeId);
        for (var id of ids) {
          // Checked
          if (this.checkboxAll) this.$emitter.emit("checkedEmployeeId", id);
          // Unchecked
          else this.$emitter.emit("unCheckedEmployeeId", id);
        }
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Thêm/xóa id nhân viên trong listIdChecked
     * Author: NVDUNG (22/08/2023)
     */
    checkboxChangeValue(newValue, employeeId) {
      // console.log("checkboxChangeValue", newValue, employeeId);
      // console.log("listIdChecked", this.listIdChecked);
      try {
        if (newValue) {
          // Thêm id nhân viên vào dataEmployeeIdsSelected ở component cha để lưu trữ
          this.$emitter.emit("checkedEmployeeId", employeeId);
        } else {
          //===== Xóa id nhân viên khỏi dataEmployeeIdsSelected ở component cha =====//
          this.$emitter.emit("unCheckedEmployeeId", employeeId);
        }
      } catch (error) {
        console.error(error);
      }
    },

    /* ============== Xử lý button bỏ chọn ================= */
    /**
     * Xóa tất cả id nhân viên trong listIdChecked
     * Author: NVDUNG (22/08/2023)
     * Modified: NVDUNG (01/10/2023)
     */
    clearAllChecked() {
      try {
        // clear listIdChecked
        var ids = this.listIdChecked; // sao chép listIdChecked
        for (var id of ids) {
          // Gửi sự kiện unchecked cho component cha
          this.$emitter.emit("unCheckedEmployeeId", id);
        }
        // unchecked checkboxAll
        this.checkboxAll = false;
        // xóa chọn tất cả các trang
        this.selectedAllPages = false;
      } catch (error) {
        console.error(error);
      }
    },

    /* ============== Xử lý ContextMenu ================= */

    /**
     * Chọn item trong context menu
     * Author: NVDUNG (22/08/2023)
     */
    contextMenuItemClick(itemValue) {
      switch (itemValue) {
        // Nút xóa
        case this.$resource["vi-VN"].contextMenu.itemDelete:
          // Đánh dấu xóa 1 nhân viên
          this.isDeleteListChecked = false;
          // console.log("Click xóa trong context menu");

          // Đánh dấu nội dung xóa nhân viên
          this.noteContentDialog =
            this.$resource["vi-VN"].dialog.titleDeleteEmployee;

          // Mở dialog 2 nút [Có]|[Không] xóa employee
          this.showDialogWarningTwoButtons(
            this.$resource["vi-VN"].dialog.titleDeleteSelectedEmployee +
              " <" +
              this.employeeSelected.employeeCodeSelected +
              "> không?"
          );
          break;
        // Nút nhân bản
        case this.$resource["vi-VN"].contextMenu.itemDuplicate:
          //console.log("Click nhân bản trong context menu");
          // Phát sự kiện duplicate, truyền id nhân viên về component cha
          console.log("Duplicate", this.employeeSelected.employeeIdSelected);
          this.$emit("duplicate", this.employeeSelected.employeeIdSelected);
          break;
        // Nút sử dụng
        case this.$resource["vi-VN"].contextMenu.itemUse:
          alert("Chức năng đang phát triển.");
          break;
      }

      // Đóng context menu
      this.contextMenu.isShow = false;
    },

    /**
     * Hàm thực hiện đóng context menu khi scroll xảy ra
     * Author: NVDUNG (29/09/2023)
     */
    onScrollCloseContextMenu() {
      this.contextMenu.isShow = false;
    },

    /**
     * Hàm thực hiện đóng context menu khi click bên ngoài contextMenu
     * Author: NVDUNG (29/09/2023)
     */
    clickOutContextMenu() {
      try {
        // Lưu tạm giá trị vueIntance
        const vueIntance = this;
        // Lấy thẻ contextMenu qua reference
        const contextMenu =
          this.$refs.contextMenuElement.$refs.contextMenuContainer;
        console.log("contextMenuEmlement: ", contextMenu);
        // contextMenu đang hiện
        if (this.contextMenu.isShow) {
          // Thêm sự kiện cho document
          document.addEventListener("click", function documentClick(event) {
            console.log("clickOutContextMenu");
            // Kiểm tra click bên ngoài contextMenu
            if (contextMenu && !contextMenu.contains(event.target)) {
              console.log("target", event.target);
              // Đóng contextMenu
              vueIntance.onScrollCloseContextMenu();
              // Hủy sự kiện này luôn
              document.removeEventListener("click", documentClick);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    /* ============== Xử lý xóa data nhân viên ================= */
    /**
     * Xóa một nhân viên theo employeeId
     * @param {String} employeeId
     * Author: NVDUNG (18/09/2023)
     */
    async deleteEmployeeById(employeeId) {
      // Hiện loading
      this.$emitter.emit("showLoading", true);
      try {
        var response = await this.$repository.deleteEmployee(employeeId);
        console.log("Delete employee response: ", response);

        if (response.httpStatusCode === 200) {
          // Tạo thông báo toast
          this.toastSuccess200(
            this.$resource["vi-VN"].toast.messageDeletedEmployeeWithCode +
              " " +
              this.employeeSelected.employeeCodeSelected
          );
          // Refresh data
          this.$emitter.emit("refreshData");
        }
        // Thất bại => Hiển thị lỗi trả về từ response
        else {
          // Đánh dấu nội dung thông báo lỗi
          this.noteContentDialog =
            this.$resource["vi-VN"].dialog.ContentErrorGenaral;
          // Gọi hàm xử lý lỗi API chung
          this.handleAPIError(response);
        }
      } catch (error) {
        // Xử lý lỗi
        console.error("Lỗi khi gọi API:", error);
        // Đánh dấu nội dung thông báo lỗi
        this.noteContentDialog =
          this.$resource["vi-VN"].dialog.ContentErrorGenaral;
        // Tạo dialog thông báo lỗi
        this.showDialogError(
          error.userMsg != undefined
            ? error.userMsg
            : this.$resource["vi-VN"].dialog.apiError.massageContactNVD
        );
        console.error(error.devMsg);
      }
      // Tắt loading
      this.$emitter.emit("showLoading", false);
    },

    /**
     * Hàm thực hiện xóa danh sách nhân viên theo danh sách listIdChecked
     * @param {List} employeeIds Danh sách định danh nhân viên cần xóa
     * Author: NVDUNG (18/09/2023)
     */
    async deleteManyEmployeeByIds(employeeIds) {
      /// Hiện loading
      this.$emitter.emit("showLoading", true);
      try {
        var response = await this.$repository.deleteManyEmployeeByIds(
          employeeIds
        );
        console.log("Delete many employee response: ", response);

        if (response.httpStatusCode === 200) {
          // Tạo thông báo toast
          this.toastSuccess200(
            this.$resource["vi-VN"].toast.messageDeletedEmployeesSuceess
          );

          // Thông báo các bản ghi xóa thất bại
          if (response.recordsFailed.length > 0) {
            var message = "";
            response.recordsFailed.forEach((item) => {
              message += item.EmployeeCode + ", ";
            });
            // Đánh dấu nội dung thông báo lỗi
            this.noteContentDialog =
              this.$resource["vi-VN"].dialog.ContentErrorGenaral;
            // Tạo dialog thông báo lỗi
            this.showDialogError(message.trim());
          }

          // Refresh data
          this.$emitter.emit("refreshData");
        }
        // Thất bại => Hiển thị lỗi trả về từ response
        else {
          // Đánh dấu nội dung thông báo lỗi
          this.noteContentDialog =
            this.$resource["vi-VN"].dialog.ContentErrorGenaral;
          // Gọi hàm xử lý lỗi API chung
          this.handleAPIError(response);
        }
      } catch (error) {
        // Xử lý lỗi
        console.error("Lỗi khi gọi API:", error);

        // Đánh dấu nội dung thông báo lỗi
        this.noteContentDialog =
          this.$resource["vi-VN"].dialog.ContentErrorGenaral;
        // Tạo dialog thông báo lỗi
        this.showDialogError(
          error.userMsg != undefined
            ? error.userMsg
            : this.$resource["vi-VN"].dialog.apiError.massageContactNVD
        );
        console.error(error.devMsg);
      }
      // Tắt loading
      this.$emitter.emit("showLoading", false);
    },

    /**
     * Xóa nhân viên theo listEmployeesChecked
     * Author: NVDUNG (18/09/2023)
     */
    deleteEmployeeChecked() {
      // Đánh dấu xóa list nhân viên
      this.isDeleteListChecked = true;
      console.log("Xóa nhân viên trong list checked");
      // Mở dialog xóa employee
      if (this.listIdChecked.length == 1) {
        // Tìm mã nhân viên từ employeeId
        var employeeId = this.listIdChecked[0];
        var employeeCode = this.dataTable.find(
          (emp) => emp.EmployeeId == employeeId
        ).EmployeeCode;
        // Hiện thông báo 2 nút bấm [Có]|[Không] xóa nhân viên
        this.showDialogWarningTwoButtons(
          this.$resource["vi-VN"].dialog.titleDeleteSelectedEmployee +
            " <" +
            employeeCode +
            "> không?"
        );
      } else {
        // Hiện thông báo 2 nút bấm [Có]|[Không] xóa nhân viên
        this.showDialogWarningTwoButtons(
          this.$resource["vi-VN"].dialog.titleDeleteSelectedManyEmployees
        );
      }
    },

    /* ============== Xử lý sửa data nhân viên ================= */
    /**
     * Phát sự kiện sửa nhân viên và truyền data nhân viên đến EmployeeList
     * Author: NVDUNG (22/08/2023)
     */
    editEmployee(epmData) {
      this.$emit("editEmployee", epmData);
    },

    /* ============== Xử lý Dialog xóa nhân viên ================= */
    /**
     * Xóa một hoặc list nhân viên qua hàm API.
     * Author: NVDUNG (22/08/2023)
     */
    dialogButton1Click() {
      switch (this.noteContentDialog) {
        // [Có]: Bạn muốn xóa nhân viên xxx
        case this.$resource["vi-VN"].dialog.titleDeleteEmployee:
          console.log("Table nhận sự kiện dialogButton1Click để xóa bản ghi");
          // Chế độ xóa theo danh sách listIdChecked
          if (this.isDeleteListChecked) {
            if (this.listIdChecked.length == 1) {
              // Gọi hàm xóa một nhân viên
              this.deleteEmployeeById(this.listIdChecked[0]);
            } else {
              // Gọi hàm xóa nhiều nhân viên
              try {
                this.deleteManyEmployeeByIds(this.listIdChecked);
                // reset listIdChecked
                //this.listIdChecked = [];
              } catch (error) {
                // Ghi lại lỗi
                console.log(error);
                // Đánh dấu nội dung thông báo lỗi
                this.noteContentDialog =
                  this.$resource["vi-VN"].dialog.ContentErrorGenaral;
                // Tạo dialog thông báo lỗi
                this.showDialogError(error.message);
              }
            }
          }
          // Chế độ xóa một nhân viên theo employeeIdSelected
          else {
            // Gọi hàm xóa một nhân viên
            this.deleteEmployeeById(this.employeeSelected.employeeIdSelected);
          }
          break;
        // [Đóng]: Thông báo lỗi thông thường
        case this.$resource["vi-VN"].dialog.ContentErrorGenaral:
          // Không cần làm gì cả
          break;
      }
    },
    /* ============== Xử lý context menu ================= */
    /**
     * Ẩn - hiện context menu ở vị trí phù hợp
     * @param {string} employeeId
     * Author: NVDUNG (18/09/2023)
     */
    showHideContextMenu(event, employeeId, employeeCode) {
      // Cập nhật employeeIdSelected để chuẩn bị cho việc xóa
      this.employeeSelected.employeeIdSelected = employeeId;
      // Cập nhật employeeCodeSelected để chuẩn bị cho việc hiện dialog xóa
      this.employeeSelected.employeeCodeSelected = employeeCode;
      // Cập nhật tọa độ cho menu context theo vị trí click viewport
      this.contextMenu.x = event.clientX - 80;
      this.contextMenu.y = event.clientY + 20;
      console.log(`Tọa độ: ${this.contextMenu.x} ; ${this.contextMenu.y}`);
      // Chuyển trạng thái ẩn hiện
      this.contextMenu.isShow = !this.contextMenu.isShow;
    },

    /**
     * Lấy dữ liệu từ ô input search
     * @param {$event} newValue: Giá trị của ô input thay đổi
     * Author: NVDUNG (18/09/2023)
     */
    textFieldOnChange(newValue) {
      this.dataInputSearch = newValue;
      // console.log("dataInputSearch: ", this.dataInputSearch);
    },

    /**
     * Thực hiện thao tác search nhân viên
     * Author: NVDUNG (18/09/2023)
     */
    btnSearchClick() {
      // Tạo sự kiện changeInputSearch gửi giá trị cho component EmployeeList
      this.$emit("changeInputSearch", this.dataInputSearch.trim());
    },
  },
  watch: {
    selectedAllPages(newValue) {
      // Tạo sự kiện để truyền sang component EmployeeList, điều khiển disabled component panigation
      this.$emit("selectedAllPages", newValue);
    },

    // Theo dõi thuộc tính trong đối tượng
    "contextMenu.isShow": function (newValue) {
      console.log("watch isShowContextMenu:", newValue);
      if (newValue) {
        this.clickOutContextMenu();
      }
    },
  },
};
</script>
<style scoped>
@import url(./table.css);
</style>
