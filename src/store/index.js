import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    productsByFilter: [],
    page: 1,
    statusModalDel: false,
    listProductsForPages: []
  },
  mutations: {
    createProduct(state, product) {
      state.products.push(product)
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    updateProduct(state, card) {
      const products = state.products.concat() // Копируем массив продуктов
      const index = products.findIndex(prod => prod.id === card.id) // Ищем в массиве объектов тот, который содержит наш id
      const product = products[index] // в product ложим ту карточку товара, которую необходимо изменить

      products[index] = { ...product, nameCat: card.nameCat, breed: card.breed, color: card.color, sex: card.sex, age: card.age } // изменяем все значения кроме id
      state.products = products // вносим изменения в state
      localStorage.setItem('products', JSON.stringify(state.products)) // перезапивываем localStorage
    },
    delProduct(state, product) {
      const products = state.products.concat() // Копируем массив продуктов
      const index = products.findIndex(prod => prod.id === product.id) // Ищем в массиве объектов тот, который содержит наш id
      console.log("i= " + index)
      products.splice(index, 1)
      state.products = products
      console.log('products=')
      console.log(state.products)
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    updatePage(state, page) {
      state.page = page
    },
    updateStatusModalDel(state, status) {
      state.statusModalDel = status
      console.log("Статус модального окна из vuex")
      console.log(state.statusModalDel)
    },
    updateListProducts(state, list) {
      state.listProductsForPages = list
    },
    updateFilterProducts(state, filter) {
      state.productsByFilter = filter
    }

  },
  actions: {
    createProduct({ commit }, product) {
      commit('createProduct', product)
    },
    updateProduct({ commit }, product) {
      commit('updateProduct', product)
    },
    delProduct({ commit }, product) {
      commit('delProduct', product)
    },
    currentPage({ commit }, currentPage) {
      commit('updatePage', currentPage)
    },
    statusModalDelete({ commit }, statusModal) {
      commit('updateStatusModalDel', statusModal)
    },
    listProductsForPages({ commit }, list) {
      commit('updateListProducts', list)
    },
    filterProducts({ commit }, filter) {
      commit('updateFilterProducts', filter)
    }
  },
  getters: {
    products: state => state.products,
    productsByFilter: state => state.productsByFilter,
    cardById: state => id => state.products.find(card => card.id === id),
    page: state => state.page,
    statusModalDel: state => state.statusModalDel,
    listPages: state => state.listProductsForPages,
    list: state => page => state.listProductsForPages[page]
  },
  modules: {
  }
})
