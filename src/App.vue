<template>
  <div id="header-app">
    <TheMenu/> 
    <div id="main" :class="{ 'explore-menu' : isExplore}">
      <TheHeader/>
      <TheContent/>
    </div>
    
  </div>
</template>

<script>
import TheContent from './components/layout/TheContent.vue';
import TheHeader from './components/layout/TheHeader.vue';
import TheMenu from './components/layout/TheMenu.vue';

export default {
  name: 'App',
  components: {
    TheMenu,
    TheHeader,
    TheContent
},
  data() {
    return {
      isExplore: false
    }
  },

  methods: {
    exploreMenu() {
      this.isExplore = !this.isExplore;
    }
  },
}
</script>

<style>
@import url('./style/layout/main.css');
#app {
    font-family: MISA;
    font-size: 13px;
    overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  /* width: 100%;
  height: 100%; */
  box-sizing: border-box;
}

#header-app {
  display: flex;
}

#main {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
}

.explore-menu {
  width: calc(100% - 150px) !important;
}
</style>