<template>
    <div>
        <h1>Menu Editor</h1>

        <router-link :to="{ name:'categories' }">Categories</router-link>

        <router-link :to="{ name:'add-item' }">Add Item</router-link>
        
        <router-view class="view-router" :initial-categories="categories"></router-view>
        
    </div>
</template>

<script>
import VueRouter from "vue-router";
import CategoryManager from "./CategoryManager";
import MenuItem from "./MenuItem";
Vue.use(VueRouter);
export default {
    props: ["categories"],

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
.view-router{
    margin-top: 40px;
}
</style>