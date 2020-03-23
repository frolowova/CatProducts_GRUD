<template>
  <v-card class="mx-auto overflow-hidden" height="100%" width="100%" box-shadow="none">
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link :to="'/'">Котики</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <router-link to="/" exact active-class="active" class="link">Каталог товаров</router-link>
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <router-link to="/create" active-class="active" class="link">Создать товар</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  })
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: gray;
}
.router-link-active {
  color: white;
  text-decoration: none;
}
.link:hover {
  color: rgb(64, 64, 64);
}
header {
  z-index: 10;
}
</style>