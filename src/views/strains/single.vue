<template>
    <div>
        {{posts}}
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
    this.$store.dispatch("fetchPosts");
  },
  computed: {
    ...mapState(["posts"])
  },
  methods: {
  }
}
</script>
