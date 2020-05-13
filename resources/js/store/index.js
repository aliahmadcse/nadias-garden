import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: [],
        items: []
    },

    mutations: {
        SET_CATEGORIES: function(state, categories) {
            state.categories = categories;
        },

        ADD_CATEGORY: function(state, category) {
            state.categories.push(category);
        },

        REMOVE_CATEGORY: function(state, index) {
            state.categories.splice(index, 1);
        }
    }
});
