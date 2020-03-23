<template>
  <div id="app">
    <v-app>
      <NavMenu style="position: absolute;" />
      <header style="height: 55px;" />
      <div class="container" style="z-index: 2;">
        <div class="catalog"></div>
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import Product from "@/components/Product";
export default {
  components: { NavMenu, Product }
};
</script>
<style lang="scss"></style>;
