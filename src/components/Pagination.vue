<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="totalPages" :total-visible="5"></v-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalPages: Number
  },
  data: () => ({
    currentPage: 1
  }),
  computed: {
    page: {
      get() {
        return this.currentPage;
      },
      set(newPage) {
        this.currentPage = newPage;
        return this.$store.dispatch("currentPage", newPage);
      }
    }
  }
};
</script>