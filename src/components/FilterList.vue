<template>
  <v-col align="center">
    <div class="inputs">
      <v-text-field label="Порода" v-model.trim="breed" @change="readFilter"></v-text-field>
      <v-text-field label="Окрас" v-model.trim="color" @change="readFilter"></v-text-field>
      <v-select
        :items="['Кот', 'Кошка', 'Кот и Кошка']"
        label="Пол"
        v-model.trim="sex"
        @change="readFilter"
      ></v-select>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "FilterList",
  data: () => ({
    breed: "",
    color: "",
    sex: ""
  }),

  methods: {
    readFilter() {
      this.$emit("readFilter", {
        breed: this.breed,
        color: this.color,
        sex: this.sex
      });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.inputs {
  max-width: 40vw;
}
</style>