<template>
  <div>
    <v-card class="mx-auto" max-width="320">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      ></v-img>

      <v-card-text class="text--primary">
        <div>
          Кличка:
          <span class="bold">{{production.nameCat}}</span>
        </div>
        <div>
          Порода:
          <span class="bold">{{production.breed}}</span>
        </div>
        <div>
          Окрас:
          <span class="bold">{{production.color}}</span>
        </div>
        <div>
          Пол:
          <span class="bold">{{production.sex}}</span>
        </div>
        <div>
          Возраст:
          <span class="bold">{{production.age}}</span>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>
          <router-link :to="'/card/' + production.id" active-class="active">Редактировать</router-link>
        </v-btn>

        <!-- Модальное окно -->
        <v-dialog v-model="dialog" persistent max-width="max-content">
          <template v-slot:activator="{ on }">
            <v-btn color="red" text v-on="on">Удалить</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Вы действительно хотите удалить карточку с товаром?</v-card-title>
            <v-card-text>Удалённую карточку невозможно будет восстановить</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Не удалять</v-btn>
              <v-btn color="red darken-1" text @click="delProduct()">Подтверждаю удаление</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: { production: Object },
  data: () => ({
    dialog: false
  }),
  methods: {
    delProduct() {
      this.$store.dispatch("delProduct", this.production);
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss">
.bold {
  font-weight: bold;
}
.v-btn a {
  text-decoration: none;
}
.v-btn::before:hover {
  opacity: 0.3;
}
</style>