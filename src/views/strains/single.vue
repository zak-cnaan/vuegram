<template>
  <div>
    <v-card
    outlined
    elevation="2"
    >
      <v-card-title>
        {{formData.name}}
      </v-card-title>
      <v-card-text>
        {{formData.description}}

      </v-card-text>

      <v-card-actions>
      <v-spacer></v-spacer>

        <v-btn fab dark small color="secondary">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>

    <v-btn fab dark small color="error">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>



    </v-card-actions>


    </v-card>
  
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  data: () => ({
      docId: null,
    formData: {

      name: '',
      description: '',
      
    }
  }),
  mounted() {
   if(this.$route.params.id){
     this.docId = this.$route.params.id;
     this.getDocById();
   };
  },
  methods: {
    getDocById: (function () {
      var collectionRef = "strainsCollection";

      fb[collectionRef]
        .doc(this.$route.params.id)
        .get()
        .then(ref => {
          //this.post.content = "";
          if (!ref.exists){
            this.docId = null;
            return;
          } 
          let data = ref.data();
          this.formData = data;
          // console.log(data.date1)
          // console.log(this.date1)


        })
        .catch(err => {
          console.log(err);
        });

    }),
      
  },
  computed: {
      // computedDateFormattedMomentjs () {
      //   return this.date3 ? moment(this.date3).format('ddd, D.M.YYYY') : ''
      // },
    },
};
</script>
