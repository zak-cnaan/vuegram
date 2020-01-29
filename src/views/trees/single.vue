<template>
  <div>
    <v-card outlined elevation="2">
      <v-card-title>
        {{ formData.name }}
      </v-card-title>
      <v-card-text>
        {{ formData.date1 }}<br />
        {{ formData.date2 }}<br />
        {{ formData.date3 }}<br />
        {{ formData.date4 }}<br />
        {{ formData.date5 }}<br />
        {{ formData.roomId }}<br />
        {{ formData.strainId }}<br />
        {{ formData.time + " Days" }}<br />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          fab
          dark
          small
          color="secondary"
          :to="{ name: 'trees - Edit', params: { id: docId } }"
        >
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>

        <v-btn @click.stop="dialog = true" fab dark small color="error">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="290">
      <v-card dark>
        <v-card-title class="headline">Delete?</v-card-title>

        <v-card-text>
          {{ formData.name }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog = false">
            No!
          </v-btn>

          <v-btn color="success" text @click="handleDelete">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  data: () => ({
    docId: null,
    dialog: false,
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
    handleDelete() {
      this.dialog = false;
      this.$store.commit("setLoadingCounter", "ADD");

      var collectionRef = "treesCollection";

      fb[collectionRef]
        .doc(this.$route.params.id)
        .delete()
        .then(ref => {
          this.$store.commit("setLoadingCounter", "remove");

          this.$router.push("/trees");
        })
        .catch(err => {
          this.$store.commit("setLoadingCounter", "remove");
          alert(err);
        });
    },
    getDocById: function() {
      this.$store.commit("setLoadingCounter", "ADD");

      var collectionRef = "treesCollection";

      fb[collectionRef]
        .doc(this.$route.params.id)
        .get()
        .then(ref => {
          //this.post.content = "";
          this.$store.commit("setLoadingCounter", "remove");

          if (!ref.exists) {
            this.docId = null;
            alert('this.docId = null');
            return;
          }
          let data = ref.data();
          this.formData = data;


          // console.log(data.date1)
          // console.log(this.date1)
        })
        .catch(err => {
          this.$store.commit("setLoadingCounter", "remove");
          alert(err);
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
