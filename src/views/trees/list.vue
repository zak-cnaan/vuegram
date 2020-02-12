<template>
  <div>
    <ListItem v-if="false" v-for="formData in trees"
      :key="formData.id" :formData="formData" />

    <v-card
      class="mb-2"
      outlined
      v-for="formData in trees"
      :key="formData.id"
      elevation="2"
    >
      <v-card-title>
        {{ formData.name }}
      </v-card-title>
      <v-card-text>
        <div> {{ formData }} </div>
        {{ formData.date1 }}<br />
       
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          fab
          dark
          small
          color="secondary"
          :to="{ name: 'trees - Single', params: { id: formData.id } }"
        >
          <v-icon dark>mdi-eye</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn
      color="secondary"
      fab
      dark
      absolute
      bottom
      right
      :to="{ path: '/trees/edit' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListItem from "./list-item";

export default {
  components: {
    ListItem
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("fetchTrees");
  },
  computed: {
    ...mapState(["trees"])
  },
  methods: {}
};
</script>
