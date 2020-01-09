<template>
  <div>
    <v-form
      ref="form"
      v-model="valid">
<v-text-field
      v-model="strain"
      label="strain"
      placeholder=" "
      required
      :rules="nameRules"

    ></v-text-field>

    <v-text-field
      v-model="name"
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
              v-model="date1"
              label="Date 1"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date1" @input="menu1 = false"></v-date-picker>
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
              v-model="date2"
              label="Date 2"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
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
            :value="dateFormattedMomentjs(date3)"
              label="Date 3"
              readonly
              clearable
              @click:clear="date3 = null"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date3" @input="menu3 = false"></v-date-picker>
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
    name: '',
    strain: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    date1: new Date().toISOString().substr(0, 10),
    menu1: false,
    date2: null,
    menu2: false,
    date3: null,
    menu3: false,
  }),
  mounted() {
   if(this.$route.params.id){
     this.getTree();
   };
  },
  methods: {
    getTree: (() => {
      var self = this;
      fb.treesCollection
        .doc("0ty4KhOqbk6xEPgbkz9H")
        .get()
        .then(ref => {
          //this.post.content = "";
          let data = ref.data();

          console.log(data.date1)
          console.log(this.date1)

          self.date1 = data.date1;
          self.date2 = data.date2;
          self.date3 = data.date3;
          self.date4 = data.date4;
          self.date5 = data.date5;
          self.date6 = data.date6;




          // debugger;
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

        obj.strain = this.strain;
        obj.name = this.name;
        obj.date1 = this.date1;
        obj.date2 = this.date2;
        obj.date3 = this.date3;

        obj.date4 = new Date(this.date1);
        obj.date5 = new Date(this.date2);
        obj.date6 = new Date(this.date3);

        fb.treesCollection
        .add(obj)
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
      computedDateFormattedMomentjs () {
        return this.date3 ? moment(this.date3).format('ddd, D.M.YYYY') : ''
      },
    },
};
</script>
