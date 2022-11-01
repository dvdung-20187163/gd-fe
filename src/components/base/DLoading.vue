<template>
  <div v-if="isLoading" class="overlay">
    <div class="overlay-inner">
      <div class="overlay-content">
        <span class="loading">
          <div class="dot-1"></div>
          <div class="dot-2"></div>
          <div class="dot-3"></div>
          <div class="dot-4"></div>
        </span>
        <span class="text-custom">{{localeEmployee.Loading.ContentLoading}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import localesEmployeeVi from "../../locales/vi/employee.js";
export default {
  data() {
    return {
      localeEmployee: {},
    };
  },
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  created() {
    this.localeEmployee = localesEmployeeVi;
  },
};
</script>

<style scoped>
.overlay {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.overlay-inner {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.overlay-content {
  left: 50%;
  position: absolute;
  background-color: rgb(247, 239, 239);
  padding: 10px 24px;
  border-radius: 4px;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  /* width: 50px;
  height: 50px;
  display: inline-block;
  border-width: 8px;
  border-color: #fff;
  border-top-color: #02bf70;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid; */
  display: flex;
  width: 50px;
  height: 10px;
  justify-content: space-around;
  align-items: center;
  /* animation: spin 2s infinite ; */

}

.dot-1 {
  background-color: rgb(219, 62, 62);
  border-radius: 50%;
  width: 6px;
  height: 6px;  
}

.dot-2 {
  background-color: rgb(195, 78, 78);
  border-radius: 50%;
  width: 8px;
  height: 8px;  
}

.dot-3 {
  background-color: rgb(218, 106, 68);
  border-radius: 50%;
  width: 5px;
  height: 5px;  
}

.dot-4 {
  background-color: rgb(51, 130, 78);
  border-radius: 50%;
  width: 3px;
  height: 3px;  
}


.text-custom {
  margin-top: 10px;
  color: #000;
}

@keyframes spin {
  0%   {margin-left:0px; top:0px;}
  25%  {margin-left:200px; top:0px;}
  100% {margin-left:0px; top:0px;}
}
</style>
