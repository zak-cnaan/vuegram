<template>
  <div>
    <v-form ref="form" v-model="valid">

      <v-text-field
        v-model="formData.name"
        label="Name"
        placeholder=" "
        @input="$v.formData.name.$touch()"
        @blur="$v.formData.name.$touch()"
        :rules="formRules.name"
      >
      </v-text-field>

      

      <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="dateFormattedMomentjs(formData.date1)"
            label="Date 1"
            readonly
            clearable
            @click:clear="formData.date1 = null"
            v-on="on"
            :rules='[v => !!v || "Date 1 is required"]'
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="formData.date1"
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="dateFormattedMomentjs(formData.date2)"
            label="Date 2"
            readonly
            clearable
            @click:clear="formData.date2 = null"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="formData.date2"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        v-model="menu3"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="dateFormattedMomentjs(formData.date3)"
            label="Date 3"
            readonly
            clearable
            @click:clear="formData.date3 = null"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="formData.date3"
          @input="menu3 = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        v-model="menu4"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="dateFormattedMomentjs(formData.date4)"
            label="Date 4"
            readonly
            clearable
            @click:clear="formData.date4 = null"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="formData.date4"
          @input="menu4 = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        v-model="menu5"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="dateFormattedMomentjs(formData.date5)"
            label="Date 5"
            readonly
            clearable
            @click:clear="formData.date5 = null"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="formData.date5"
          @input="menu5 = false"
        ></v-date-picker>
      </v-menu>

      <v-select
          :items="rooms"
          :item-text="(item) => item.name"
          :item-value="(item) => item.id"
          label="Room"
          v-model='formData.roomId'
        ></v-select>

        <v-select
          :items="strains"
          :item-text="(item) => item.name"
          :item-value="(item) => item.id"
          label="Strain"
          v-model='formData.strainId'
        ></v-select>

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

<style>
.v-select-list.v-card{
  background: #fff;
}
</style>

<script>
import { mapState } from "vuex";
import moment from "moment";

const fb = require("@/firebaseConfig.js");

export default {
  data: () => ({
    valid: true,
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    docId: null,
    formRules: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ]
    },
    formData: {
      name: "",
      date1: new Date().toISOString().substr(0, 10),
      date2: null,
      date3: null,
      date4: null,
      date5: null,
      roomId: null,
      strainId: null,
    }
  }),
  mounted() {
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchStrains");
    if (this.$route.params.id) {
      this.docId = this.$route.params.id;
      this.getDocById();
    }
  },
  computed: {
    ...mapState(["strains", "rooms"])
  },
  methods: {
    getDocById: function() {
      this.$store.commit("setLoadingCounter", "ADD");

      var collectionRef = "treesCollection";

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
    dateFormattedMomentjs(val) {
      return val ? moment(val).format("DD-MM-YYYY, ddd") : "";
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
      var collectionRef = "treesCollection";

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
          this.$router.push({ path: `/trees/${collection.id}` });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
