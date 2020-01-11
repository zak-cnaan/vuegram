<template>
  <div>
    <v-form
      ref="form"
      v-model="valid">
<v-text-field
      v-model="formData.strain"
      label="strain"
      placeholder=" "
      required
      :rules="nameRules"

    ></v-text-field>

    <v-text-field
      v-model="formData.name"
      label="Name"
      placeholder=" "
    ></v-text-field>

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
            ></v-text-field>
          </template>
          <v-date-picker v-model="formData.date1" @input="menu1 = false"></v-date-picker>
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
          <v-date-picker v-model="formData.date2" @input="menu2 = false"></v-date-picker>
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
          <v-date-picker v-model="formData.date3" @input="menu3 = false"></v-date-picker>
        </v-menu>

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
import moment from 'moment'
const fb = require("@/firebaseConfig.js");

export default {
  data: () => ({
    valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      menu1: false,
      menu2: false,
      menu3: false,
      docId: null,
    formData: {

      name: '',
      strain: '',
      date1: new Date().toISOString().substr(0, 10),
      date2: null,
      date3: null,
      
      
    }
  }),
  mounted() {
   if(this.$route.params.id){
     this.docId = this.$route.params.id;
     this.getTree();
   };
  },
  methods: {
    getTree: (function () {
      // var self = this;
      // var self2 = this.$route;
      //     debugger;
      fb.treesCollection
        .doc(this.$route.params.id)
        .get()
        .then(ref => {
          //this.post.content = "";
          if (!ref.exists) return;
          let data = ref.data();
          this.formData = data;
          // console.log(data.date1)
          // console.log(this.date1)


        })
        .catch(err => {
          console.log(err);
        });

    }),
    dateFormattedMomentjs (val) {
        return val ? moment(val).format('ddd, D.M.YYYY') : ''
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      handleSubmit () {
        if (!this.valid) return;
        let obj = {}

        // obj.strain = this.strain;
        // obj.name = this.name;
        // obj.date1 = this.date1;
        // obj.date2 = this.date2;
        // obj.date3 = this.date3;

        // obj.date4 = new Date(this.date1);
        // obj.date5 = new Date(this.date2);
        // obj.date6 = new Date(this.date3);

        obj= this.formData;

        let collection;

        if (this.docId){
          collection = fb.treesCollection.doc(this.docId)

        }
        else{
          collection = fb.treesCollection.doc()

        }

        collection
        .set(obj)
        .then(ref => {
          //this.post.content = "";
          debugger;
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
    },
};
</script>
