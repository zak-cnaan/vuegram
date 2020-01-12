<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="formData.name"
        label="Name"
        placeholder=" "
      ></v-text-field>

      <v-text-field
        v-model="formData.description"
        label="Description"
        placeholder=" "
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="secondary"
        class="mr-4"
        @click="handleSubmit"
      >
        send
      </v-btn>
    </v-form>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  data: () => ({
    valid: false,
    docId: null,
    formData: {
      name: "",
      description: ""
    }
  }),
  mounted() {
    if (this.$route.params.id) {
      this.docId = this.$route.params.id;
      this.getDocById();
    }
  },
  methods: {
    getDocById: function() {
      this.$store.commit("setLoadingCounter", "ADD");

      var collectionRef = "roomsCollection";

      fb[collectionRef]
        .doc(this.$route.params.id)
        .get()
        .then(ref => {
          //this.post.content = "";
          if (!ref.exists) {
            this.docId = null;
            return;
          }
          let data = ref.data();
          this.formData = data;
          this.$store.commit("setLoadingCounter", "remove");
          // console.log(data.date1)
          // console.log(this.date1)
        })
        .catch(err => {
          console.log(err);
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    handleSubmit() {
      if (!this.valid) return;
      let obj = {};

      obj = this.formData;

      let collection;
      var collectionRef = "roomsCollection";

      if (this.docId) {
        collection = fb[collectionRef].doc(this.docId);
      } else {
        collection = fb[collectionRef].doc();
      }

      this.$store.commit("setLoadingCounter", "ADD");

      collection
        .set(obj)
        .then(() => {
          this.$store.commit("setLoadingCounter", "remove");
          this.$router.push({ path: `/rooms/${collection.id}` });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    // computedDateFormattedMomentjs () {
    //   return this.date3 ? moment(this.date3).format('ddd, D.M.YYYY') : ''
    // },
  }
};
</script>
