<template>
    <form class="item-form" @submit.prevent="save" novalidate>
        <div>
            <input type="text" placeholder="Item name" v-model="item.name" required />
            $
            <input type="number" min="0" step=".01" v-model="item.price" required />
        </div>
        <div>
            <textarea v-model="item.description" placeholder="Item description" required></textarea>
        </div>
        <div>
            <select v-model="item.category_id" required>
                <option value>Select a category</option>
                <option v-for="cat in categories" :value="cat.id" :key="cat.id">{{cat.name}}</option>
            </select>
        </div>
        <img v-if="id && item.image" :src="`/storage/images/${item.image}`" width="200" />
        <drop-zone :options="dropzoneOptions" id="dz" ref="dropzone"></drop-zone>

        <button type="submit">Save</button>
        <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>
    </form>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapState } from "vuex";

function newItem() {
    return {
        name: "",
        price: 0.0,
        image: "",
        category_id: "",
        description: ""
    };
}

export default {
    props: ["id"],

    components: {
        dropZone: vue2Dropzone
    },
    data() {
        return {
            dropzoneOptions: {
                url: "/api/add-image",
                thumbnailWidth: 200,
                headers: {
                    "X-CSRF-TOKEN": document.head.querySelector(
                        'meta[name="csrf-token"]'
                    ).content
                },
                success: function(file, res) {
                    file.filename = res;
                }
            },
            item: newItem(),

            errors: []
        };
    },

    created: function() {
        if (this.id) {
            axios
                .get("/api/menu-items/" + this.id)
                .then(res => (this.item = res.data));
        }
    },

    // resetting the route after update or create operation
    beforeRouteLeave: function(to, from, next) {
        this.item = newItem();
        next();
    },

    computed: mapState({
        categories: "categories"
    }),

    methods: {
        save() {
            let files = this.$refs.dropzone.getAcceptedFiles();
            if (files.length > 0 && files[0].filename) {
                this.item.image = files[0].filename;
            }
            let url = "/api/menu-items/upsert";
            if (this.id) {
                url = "/api/menu-items/" + this.id;
            }
            axios
                .post(url, this.item)
                .then(res => {
                    this.$router.push("/");
                })
                .catch(error => {
                    // error.response.data.errors returns an object containing
                    // failed validation fields as the keys and an array of errors
                    // as value for each key
                    // we used Object.values here for retrieving the value for each
                    // key in a single array, value is being an array here
                    let messages = Object.values(error.response.data.errors);
                    // we now need to form a single array from this 2D array
                    this.errors = [].concat(...messages);
                });
        }
    }
};
</script>

<style scoped>
</style>