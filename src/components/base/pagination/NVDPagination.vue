<template>
  <div class="ms-pagination" :class="{ disabled: isDisabled }">
    <div class="left-pagination">
      Tổng số <b>{{ totalRecord }}</b> bản ghi
    </div>
    <div class="right-pagination">
      <div class="record-in-page">
        <!-- combobox record in page -->
        <m-combobox
          :isInputReadOnly="true"
          :haveLabel="false"
          :valueInputCombobox="this.$resource['vi-VN'].pagination.tenRecords"
          :dataDropdownlist="dataPageSize"
          :dropup="true"
          @comboboxChangeValue="changePageSize"
        ></m-combobox>
      </div>

      <div class="paging">
        <b>{{ pageCurrent }}</b> - <b>{{ pageEnd }}</b> trang
      </div>
      <a
        class="previous-page"
        :class="{ disabled: pageCurrent == 1 }"
        @click="previousPage"
      >
        <div class="mi mi-24 mi-previous-page"></div>
      </a>
      <a
        class="next-page"
        :class="{ disabled: pageCurrent == pageEnd }"
        @click="nextPage"
      >
        <div class="mi mi-24 mi-next-page"></div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "NVDPagination",
  data() {
    return {
      pageSize: 10,
      pageCurrent: 1,

      dataPageSize: [
        this.$resource["vi-VN"].pagination.tenRecords,
        this.$resource["vi-VN"].pagination.twentyRecords,
        this.$resource["vi-VN"].pagination.thirtyRecords,
        this.$resource["vi-VN"].pagination.fiftyRecords,
        this.$resource["vi-VN"].pagination.hundredRecords,
      ],
    };
  },
  props: {
    /**
     * Tổng số bản ghi
     */
    totalRecord: {
      type: Number,
      required: true,
    },

    /**
     * Đánh dấu disabled pagination khi table chọn tất cả trang
     * true: disabled
     * false: not disabled
     */
    isDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    // Trang cuối cùng
    pageEnd() {
      return Math.ceil(this.totalRecord / this.pageSize);
    },
  },
  watch: {
    /**
     * Tạo sự kiện truyền pageCurrent mới về component EmployeeList
     * @param {*} newValue Giá trị mới của pageCurrent
     * Author: NVDUNG (25/08/2023)
     */
    pageCurrent(newValue) {
      this.$emit("changePageCurrent", newValue);
    },
  },
  methods: {
    /**
     * Hàm chuyển sang trang tiếp theo
     * Author: NVDUNG (25/08/2023)
     */
    previousPage() {
      this.pageCurrent = this.pageCurrent - 1;
    },

    /**
     * Hàm chuyển sang trang trước đó
     * Author: NVDUNG (25/08/2023)
     */
    nextPage() {
      this.pageCurrent = this.pageCurrent + 1;
    },

    /**
     * Thay đổi PageSize
     * @param {String} newPageSize Giá trị mới của input trong combobox
     * Author: NVDUNG (25/08/2023)
     */
    changePageSize(newPageSize) {
      try {
        this.pageCurrent = 1;
        // newPageSize là một chuỗi "10 bản ghi trên 1 trang"
        let newPageSizeNumber = parseInt(newPageSize.split(" ")[0]);
        this.pageSize = newPageSizeNumber;
        // Phát sự kiện changePageSize để cập nhật dataTable
        this.$emit("changePageSize", newPageSizeNumber);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url(./pagination.css);
</style>
