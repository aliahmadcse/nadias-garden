import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: [],
        items: {},
        feedback: ""
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
        },

        UPDATE_CATEGORY: function(state, { index, property, value }) {
            state.categories[index][property] = value;
        },

        SET_FEEDBACK: function(state, feedback) {
            state.feedback = feedback;
        }
    },
    actions: {
        saveCategories: function({ commit, state }) {
            axios
                .post("/api/categories/upsert", {
                    categories: state.categories
                })
                .then(res => {
                    if (res.data.success) {
                        commit("SET_FEEDBACK", "Changes saved");
                        setTimeout(() => commit("SET_FEEDBACK", ""), 2000);
                        commit("SET_CATEGORIES", res.data.categories);
                    }
                });
        },

        removeCategory: function({ commit, state }, index) {
            let id = state.categories[index].id;
            if (id > 0) {
                return axios
                    .delete("/api/categories/" + id)
                    .then(res => commit("REMOVE_CATEGORY", index));
            }
            commit("REMOVE_CATEGORY", index);
        }
    }
});
