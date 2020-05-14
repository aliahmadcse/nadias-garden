<template>
    <form @submit.prevent="saveCategories">
        <a @click="addCategory" class="add">+ Add Category</a>
        <div v-for="(category,index) in categories" :key="category.id">
            <input
                type="text"
                :value="category.name"
                @input="update($event,'name',index)"
                :ref="category.name"
            />
            <input
                type="number"
                :value="category.display_order"
                @input="update($event,'display_order',index)"
            />
            <a @click="removeCategory(index)" class="remove">Delete</a>
            <div>
                <img v-if="category.image" :src="`/images/${category.image}`" width="100" />
                <label v-else>Image:</label>
                <input type="text" :value="category.image" @change="update($event,'image',index)" />
            </div>
            <hr />
        </div>
        <button type="submit">Save</button>
        <div>{{feedback }}</div>
    </form>
</template>

<script>
export default {
    computed: {
        categories: function() {
            return this.$store.state.categories;
        },
        feedBack: function() {
            return this.$store.state.feedback;
        }
    },

    methods: {
        removeCategory: function(index) {
            if (confirm("Are you sure ?")) {
                this.$store.dispatch("removeCategory", index);
            }
        },

        addCategory: function() {
            this.$store.commit("ADD_CATEGORY", {
                id: 0,
                name: "",
                image: "",
                display_order: this.categories.length + 1
            });
            this.$nextTick(() => {
                window.scrollTo(0, document.body.scrollHeight);
                this.$refs[""][0].focus();
            });
        },

        saveCategories: function() {
            this.$store.dispatch("saveCategories");
        },

        update: function($event, property, index) {
            this.$store.commit("UPDATE_CATEGORY", {
                index,
                property,
                value: $event.target.value
            });
        }
    }
};
</script>

<style lang="scss" scoped>
img {
    vertical-align: middle;
}
hr {
    margin-bottom: 30px;
}
</style>