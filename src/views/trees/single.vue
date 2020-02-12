<template>
  <div>
    <v-card outlined elevation="2">
      <v-card-title>{{ formData.name }}</v-card-title>
      <v-card-text>
        {{ formData.date1 }}
        <br />
        {{ "germinationTime: " + germinationTime + " Days old." }}
        <br />
        {{ formData.date2 }}
        <br />
        {{ "veggingTime: " + veggingTime + " Days old." }}
        <br />
        {{ "growTime: " + growTime + " Days old." }}
        <br />
        <hr />

        {{ formData.date3 }}
        <br />
        {{ "floweringTime: " + floweringTime + " Days old." }}
        <br />
        {{ "timeToHarvest: in " + timeToHarvest + " Days." }}
        <br />
        {{ "aliveTime: " + aliveTime + " Days old." }}
        <br />
        <hr />

        {{ formData.date4 }}
        <br />
        {{ "dryingTime: " + dryingTime + " Days old." }}
        <br />
        {{ formData.date5 }}
        <br />
        {{ "curingTime: " + curingTime + " Days old." }}
        <br />
        {{ formData.date6 }}
        <br />
        {{ formData.roomId }}
        <br />
        {{ formData.strainId }}
        <br />
        {{ "Flowering time: " + formData.time + " Days." }}
        <br />
        {{ "stage: " + stage }}
        <br />
        {{ "stageName: " + stageName }}
        <br />
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

        <v-card-text>{{ formData.name }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog = false">No!</v-btn>

          <v-btn color="success" text @click="handleDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import moment from "moment";

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
            alert("this.docId = null");
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
    stage() {
      // returns 1-6 representing 1-6 stage dates
      let i = 1;
      let ret;
      for (let i = 1; i <= 6; ++i) {
        if (this.formData["date" + i]) ret = i;
      }
      return ret;
    },
    stageName() {
      let arr = ["Ger", "Veg", "Flower", "Dry", "Cure", "Done!"];
      return arr[this.stage - 1];
    },
    germinationTime() {
      if (!this.formData.date1) return null;
      var currDate = moment(this.formData.date1);
      var dateToTest = this.formData.date2
        ? moment(this.formData.date2)
        : moment.now();
      // if dateToTest will always be in past, use currDate as the base to diff, else
      //be prepared to handle the negative outcomes.
      var result = currDate.diff(dateToTest, "days");

      return -result;
    },
    veggingTime() {
      if (!this.formData.date2) return null;
      var currDate = moment(this.formData.date2);
      var dateToTest = this.formData.date3
        ? moment(this.formData.date3)
        : moment.now();
      // if dateToTest will always be in past, use currDate as the base to diff, else
      //be prepared to handle the negative outcomes.
      var result = currDate.diff(dateToTest, "days");

      return -result;
    },
    floweringTime() {
      if (!this.formData.date3) return null;
      var currDate = moment(this.formData.date3);
      var dateToTest = this.formData.date4
        ? moment(this.formData.date4)
        : moment.now();
      // if dateToTest will always be in past, use currDate as the base to diff, else
      //be prepared to handle the negative outcomes.
      var result = currDate.diff(dateToTest, "days");

      return -result;
    },
    dryingTime() {
      if (!this.formData.date4) return null;
      var currDate = moment(this.formData.date4);
      var dateToTest = this.formData.date5
        ? moment(this.formData.date5)
        : moment.now();
      // if dateToTest will always be in past, use currDate as the base to diff, else
      //be prepared to handle the negative outcomes.
      var result = currDate.diff(dateToTest, "days");

      return -result;
    },
    curingTime() {
      if (!this.formData.date5) return null;
      var currDate = moment(this.formData.date5);
      var dateToTest = this.formData.date6
        ? moment(this.formData.date6)
        : moment.now();
      // if dateToTest will always be in past, use currDate as the base to diff, else
      //be prepared to handle the negative outcomes.
      var result = currDate.diff(dateToTest, "days");

      return -result;
    },
    timeToHarvest() {
      return this.formData.time * 1 - this.floweringTime;
    },
    growTime() {
      return this.germinationTime * 1 + this.veggingTime * 1;
    },
    aliveTime() {
      return this.germinationTime * 1 + this.veggingTime * 1 + this.floweringTime * 1;
    }
  }
};
</script>
