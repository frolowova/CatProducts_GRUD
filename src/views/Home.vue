<template>
  <div>
    <!-- Блок фильрации -->
    <transition name="filterBtn">
      <div v-show="!showFilter" class="filter-btn">
        <v-btn class="ma-2" outlined color="indigo" @click="showFilter = true">Установить фильтры</v-btn>
      </div>
    </transition>
    <transition name="filterL">
      <div class="filter-list" v-if="showFilter">
        <h1>Фильтр</h1>
        <div>
          <FilterList @readFilter="createFilter" />
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            @click="showFilter = false, resetFilter()"
          >Отключить фильтры</v-btn>
          <hr />
        </div>
      </div>
    </transition>

    <h1>Каталог</h1>
    <div v-if="products.length">
      <div class="list">
        <div v-for="product of list_page" :key="product.id">
          <product :production="product" />
        </div>
      </div>
      <pagination :totalPages="total_pages" />
    </div>
    <p v-else>Ни один товар пока не создан</p>
  </div>
</template>

<script>
import Product from "@/components/Product";
import Pagination from "@/components/Pagination";
import FilterList from "@/components/FilterList";
export default {
  name: "Home",
  components: { Product, Pagination, FilterList },
  data: () => ({
    currentPage: 0,
    productsForPages: [],
    filters: null,
    limitProductForPage: 10,
    showFilter: false
  }),
  methods: {
    resetFilter() {
      // Глобальный фильтр делаем = всем продуктам
      this.$store.dispatch("filterProducts", this.$store.getters.products);
      // Так как мы отключаем фильтр, необходимо переместить пользователя на первую страницу
      this.$store.dispatch("currentPage", 1);
    },
    // Создаём фильтр
    createFilter(filterData) {
      const allProducts = this.$store.getters.products;

      // Так как мы определяем фильтр, необходимо переместить пользователя на первую страницу
      this.$store.dispatch("currentPage", 1);

      const filtered = allProducts
        .filter(item => {
          // Фильтрация по породе
          if (filterData.breed != "")
            return item.breed
              .toLowerCase()
              .includes(filterData.breed.toLowerCase());
          return true;
        })
        // Фильтруем по цвету
        .filter(item => {
          if (filterData.color != "")
            return item.color.includes(filterData.color);
          return true;
        })
        // Фильтрация по полу
        .filter(item => {
          if (filterData.sex != "" && filterData.sex != "Кот и Кошка") {
            return item.sex === filterData.sex;
          }
          return true;
        });

      // Присваиваем глобальному фильтру значения фильтраций
      this.$store.dispatch("filterProducts", filtered);
    },
    listing() {
      const end = this.$store.getters.page * this.limitProductForPage;
      const start = end - this.limitProductForPage;

      // *- создаём список карточек товара во vuex и привязываем их к их страницам, чтобы
      // в дальнейшем подгружать в роутер
      let prods = this.$store.getters.productsByFilter.slice(start, end);
      this.productsForPages[this.$store.getters.page] = prods;
      this.$store.dispatch("listProductsForPages", this.productsForPages);
    }
  },
  computed: {
    products() {
      this.resetFilter();
      return this.$store.getters.products;
    },
    total_pages() {
      const prods = this.$store.getters.productsByFilter;
      return Math.ceil(prods.length / this.limitProductForPage);
    },
    list_page() {
      this.currentPage = this.$store.getters.page;
      const end = this.$store.getters.page * this.limitProductForPage;
      const start = end - (this.limitProductForPage - 1);

      this.listing();
      return this.$store.getters.listPages[this.currentPage];
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.filter-list {
  text-align: center;
  z-index: 2;
}
.filter-btn {
  text-align: center;
  z-index: 1;
  transition-duration: 1s;
}

.filterL-enter-active,
.filterL-leave-active {
  transition: 0.6s;
  opacity: 1;
}
.filterL-enter,
.filterL-leave-to {
  transform: translateY(-90%);
  opacity: 0;
}

.filterBtn-enter-active {
  transition: 1.4s;
  opacity: 1;
}
.filterBtn-leave-active {
  transition: 0.5s;
  opacity: 1;
}
.filterBtn-enter,
.filterBtn-leave-to {
  transform: translateY(450%);
  opacity: 0;
}
</style>
