<template>
  <div class="row" v-if="card">
    <h1>Редактируем: {{card.sex}} {{card.nameCat}}</h1>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-col class="cols" cols="12" sm="12">
        <v-text-field v-model="nameCat" :rules="nameRules" label="Кличка" required></v-text-field>
        <v-text-field v-model="breed" label="Порода" required></v-text-field>
        <v-text-field v-model="color" label="Окрас" required></v-text-field>
        <v-select v-model="sex" :items="['Кот', 'Кошка']" label="Пол" required></v-select>
        <v-select
          v-model="age"
          :items="['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '18+']"
          label="Возраст"
          required
        ></v-select>
      </v-col>
      <v-btn
        :disabled="loading"
        color="success"
        class="mr-4"
        @click="validate"
        :loading="loading"
      >Сохранить</v-btn>

      <router-link :to="'/'">
        <v-btn color="error" class="mr-4">Отмена</v-btn>
      </router-link>
    </v-form>
  </div>
  <p v-else>Упс, а карточка с таким товаром не найдена</p>
</template>

<script>
export default {
  name: "card",
  data: () => ({
    valid: true,
    nameCat: "",
    breed: "",
    color: "",
    sex: "",
    age: "",
    nameRules: [
      v => !!v || "Укажите значение",
      v =>
        (v && v.trim().length >= 2) ||
        "Кличка не должна быть меньше 2х символов"
    ],
    loader: null,
    loading: false
  }),
  mounted() {
    this.nameCat = this.card.nameCat;
    this.breed = this.card.breed;
    this.color = this.card.color;
    this.sex = this.card.sex;
    this.age = this.card.age;
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      this.loader = "loading";

      const product = {
        nameCat: this.nameCat,
        breed: this.breed,
        color: this.color,
        sex: this.sex,
        age: this.age,
        id: this.card.id
      };
      this.$store.dispatch("updateProduct", product); // Отправляем значение во vuex
    }
  },

  computed: {
    card() {
      return this.$store.getters.cardById(+this.$route.params.id);
    }
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
        this.$router.push("/"); // Перенаправляем на главную страницу
      }, 2000);

      this.loader = null;
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-left: 2rem;
}
.row {
  display: flex;
  flex-direction: column;
}
.cols {
  margin: 0 auto;
}
.v-form {
  margin: 0 auto;
}
.v-btn,
.router-link-active {
  text-decoration: none;
}

// Лоадер
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
