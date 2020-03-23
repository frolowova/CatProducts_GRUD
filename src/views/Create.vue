<template>
  <div class="row">
    <h1>Создать товар</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-col class="cols" cols="12" sm="12">
        <v-text-field v-model="nameCat" :rules="nameRules" label="Кличка" autofocus required></v-text-field>
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
        :disabled="!valid || nameCat.length == 0 || loading"
        color="success"
        class="mr-4"
        @click="validate"
        :loading="loading"
      >Создать</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Очистить поля</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "create",
  data: () => ({
    valid: true,
    nameCat: "",
    breed: "",
    color: "",
    sex: "Кот",
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

  methods: {
    validate() {
      this.$refs.form.validate();
      this.loader = "loading";
      // Так как валидация полей идёт почему-то после взаимодействия с ним, то кнопка Создать активна,
      // пока пользователь не обратился к полю Кличка, поэтому делаем проверку на непустое поле тут
      if (this.nameCat) {
        const product = {
          nameCat: this.nameCat,
          breed: this.breed,
          color: this.color,
          sex: this.sex,
          age: this.age,
          id: Date.now()
        };
        this.$store.dispatch("createProduct", product); // Отправляем значение во vuex
      }
    },
    reset() {
      this.nameCat = "";
      this.breed = "";
      this.color = "";
      this.sex = "Кот";
      this.age = "";
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
        this.reset();
        this.$router.push("/"); // Перенаправляем на главную страницу
      }, 2000);

      this.loader = null;
      return;
    }
  }
};
</script>

<style lang="scss" scope>
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
}
</style>
