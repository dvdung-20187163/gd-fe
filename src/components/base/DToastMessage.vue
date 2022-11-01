<template>
  <div class="toast">
    <div class="icon icon-success"></div>
    <div class="toast-content">
      <div
        class="toast-title"
        style="
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          box-sizing: border-box;
        "
      >
        {{ localeEmployee.Toast.Success }}
      </div>
      <div class="toast-text" style="font-size: 13px">
        {{ localeEmployee.Toast.ContentSuccess }}
      </div>
    </div>
  </div>
</template>
  
<script>
import localesEmployeeVi from "../../locales/vi/employee.js"
export default {
  data() {
    return {
      localeEmployee: {},
    };
  },
  created() {
    this.localeEmployee = localesEmployeeVi;
  },
};
</script>
  
<style scoped>
@keyframes example {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.icon {
  width: 181px;
  height: 186px;
  background-repeat: no-repeat;
  background-position: center center;
}

.icon-success {
  background-image: url('../../assets/Icons/ic_ToastMessage_Success.png');
}

.toast {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 18px;
  right: 18px;
  min-width: 300px;
  min-height: 80px;
  background: #fff;
  border-radius: 4px;
  padding: 18px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  animation: example 3s linear;
}

.toast .icon {
  width: 40px;
  height: 40px;
}

.toast.border-success {
  border-left: 9px solid #0fa655;
}

.toast .toast-content {
  margin-left: 18px;
  box-sizing: border-box;
  text-align: left;
}
</style>
  