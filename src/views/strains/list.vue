<template>
    <div>
          <v-card class="mb-2" outlined v-for="formData in strains" :key="formData.id"
    elevation="2">

    <v-card-title>
        {{formData.name}}
      </v-card-title>
      <v-card-text>
        {{formData.description}}
      </v-card-text>


      <v-card-actions>
      <v-spacer></v-spacer>

        <v-btn fab dark small color="secondary"
        :to="{ name: 'Strain - Single', params: { id: formData.id }}">
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
                  :to="{path: '/strains/edit'}"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
    return {
      
    };
  },
  mounted() {
    this.$store.dispatch("fetchStrains");
  },
  computed: {
    ...mapState(["strains"])
  },
  methods: {
  }
}
</script>
