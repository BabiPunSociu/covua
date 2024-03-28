<template>
  <nav class="menu-container">
    <div class="logo-container">
      <a class="menu-container-options mi mi-16 mi-app"></a>
      <a class="logo"
        ><img
          src="../../../assets/images/logo/Logo-chess.png"
          alt="Logo phần mềm"
      /></a>
    </div>

    <div class="menu-bar">
      <div class="menu-item-list scroller">
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-dashboard"></div>
            </div>
            <div class="menu-item__title">Tổng quan</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-cash"></div>
            </div>
            <div class="menu-item__title">Tiền mặt</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-bank"></div>
            </div>
            <div class="menu-item__title">Tiền gửi</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-purchase"></div>
            </div>
            <div class="menu-item__title">Mua hàng</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-sale"></div>
            </div>
            <div class="menu-item__title">Bán hàng</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-invoice"></div>
            </div>
            <div class="menu-item__title">Quản lý hóa đơn</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-stock"></div>
            </div>
            <div class="menu-item__title">Kho</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-tools"></div>
            </div>
            <div class="menu-item__title">Công cụ, dụng cụ</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-fixed-asets"></div>
            </div>
            <div class="menu-item__title">Tài sản cố định</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-tax"></div>
            </div>
            <div class="menu-item__title">Thuế</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-price"></div>
            </div>
            <div class="menu-item__title">Giá thành</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-general"></div>
            </div>
            <div class="menu-item__title">Tổng hợp</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-budget"></div>
            </div>
            <div class="menu-item__title">Ngân sách</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-report"></div>
            </div>
            <div class="menu-item__title">Báo cáo</div></a
          >
        </div>
        <div class="parent-item-menu">
          <a class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-finance"></div>
            </div>
            <div class="menu-item__title">Phân tích tài chính</div></a
          >
        </div>

        <!-- RouterLink -->
        <div class="parent-item-menu">
          <router-link to="/EmployeeList" class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-finance"></div>
            </div>
            <div class="menu-item__title">Router EmployeeList</div></router-link
          >
        </div>
        <!-- RouterLink -->
        <div class="parent-item-menu">
          <router-link to="/CustomerList" class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-finance"></div>
            </div>
            <div class="menu-item__title">Router CustomerList</div></router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheSideBar",
};
</script>

<style lang="scss" scoped>
@import url(./the-sidebar.scss);
</style>
