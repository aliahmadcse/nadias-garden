<template>
    <div>
        <h1>Menu Editor</h1>

        <router-link :to="{ name:'categories' }">Categories</router-link>

        <router-link :to="{ name:'items' }">Items</router-link>

        <router-link :to="{ name:'add-item' }">Add Item</router-link>

        <router-view class="view-router"></router-view>
    </div>
</template>

<script>
import VueRouter from "vue-router";
import CategoryManager from "./CategoryManager";
import MenuItem from "./MenuItem";
import MenuItemList from "./MenuItemList";
import store from "../store";
Vue.use(VueRouter);
export default {
    store,

    props: ["categories"],

    created: function() {
        this.$store.commit("SET_CATEGORIES", _.cloneDeep(this.categories));
    },

    router: new VueRouter({
        mode: "history",
        base: "menu-editor",
        routes: [
            {
                path: "/category",
                name: "categories",
                component: CategoryManager
            },
            {
                path: "/",
                redirect: { name: "categories" }
            },
            {
                path: "/items",
                name: "items",
                component: MenuItemList
            },
            {
                path: "/edit-item/:id",
                name: "edit-item",
                component: MenuItem,
                props: true
            },
            {
                path: "/add-item",
                name: "add-item",
                component: MenuItem
            },
            {
                path: "*",
                redirect: "/"
            }
        ]
    })
};
</script>

<style lang="scss" scoped>
a {
    border: 1px solid black;
    padding: 10px;
    margin: 0px;
}
.router-link-active {
    font-weight: bold;
    border-bottom: none;
}
.view-router {
    margin-top: 40px;
}
</style>