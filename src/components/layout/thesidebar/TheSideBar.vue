<template>
  <nav class="menu-container">
    <div class="logo-container">
      <!-- <a class="menu-container-options mi mi-16 mi-app"></a> -->
      <router-link to="/" class="logo">
        <!-- Logo App -->
        <img
          src="../../../assets/images/logo/logo-app.png"
          alt="Logo phần mềm"
        />
      </router-link>
    </div>

    <div class="menu-bar">
      <div class="menu-item-list scroller">
        <!-- Play -->
        <div class="parent-item-menu">
          <a class="menu-item">
            <div class="menu-item__icon">
              <!-- Icon -->
              <div class="mi mi-24 mi-sidebar-dashboard"></div>
            </div>
            <!-- Text -->
            <div class="menu-item__title block-user-select">
              {{ this.$resource["vi-VN"].sideBar.play }}
            </div>
          </a>
        </div>

        <!-- Puzzle -->
        <div class="parent-item-menu">
          <a class="menu-item">
            <div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-cash"></div>
            </div>
            <div class="menu-item__title block-user-select">
              {{ this.$resource["vi-VN"].sideBar.puzzle }}
            </div>
          </a>
        </div>

        <!-- Learn -->
        <div class="parent-item-menu">
          <a class="menu-item">
            <div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-bank"></div>
            </div>
            <div class="menu-item__title block-user-select">
              {{ this.$resource["vi-VN"].sideBar.learn }}
            </div>
          </a>
        </div>

        <!-- Watch -->
        <div class="parent-item-menu">
          <a class="menu-item">
            <div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-purchase"></div>
            </div>
            <div class="menu-item__title block-user-select">
              {{ this.$resource["vi-VN"].sideBar.watch }}
            </div>
          </a>
        </div>

        <!-- News -->
        <div class="parent-item-menu">
          <a class="menu-item">
            <div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-sale"></div>
            </div>
            <div class="menu-item__title block-user-select">
              {{ this.$resource["vi-VN"].sideBar.news }}
            </div>
          </a>
        </div>

        <!-- Social -->
        <div class="parent-item-menu">
          <a class="menu-item">
            <div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-invoice"></div>
            </div>
            <div class="menu-item__title block-user-select">
              {{ this.$resource["vi-VN"].sideBar.social }}
            </div>
          </a>
        </div>

        <!--         
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
      -->

        <!-- RouterLink -->
        <!-- <div class="parent-item-menu">
          <router-link to="/EmployeeList" class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-finance"></div>
            </div>
            <div class="menu-item__title">Router EmployeeList</div></router-link
          >
        </div> -->
        <!-- RouterLink -->
        <!-- <div class="parent-item-menu">
          <router-link to="/CustomerList" class="menu-item"
            ><div class="menu-item__icon">
              <div class="mi mi-24 mi-sidebar-finance"></div>
            </div>
            <div class="menu-item__title">Router CustomerList</div></router-link
          >
        </div> -->
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
