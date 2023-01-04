<template>
  <v-app>
    <Menu v-if="!user.id"/>
    <v-content>

      <router-view></router-view>
      <v-snackbar v-model="snackbar.toggle">
        {{ snackbar.text }}
      <v-btn
        :color="snackbar.color"
        text
        @click="snackbar.toggle = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Menu from "./components/Menu.vue";

export default Vue.extend({
  name: "App",
  components: {
    Menu
  },
  async created() {
    try{
    
      await this.$store.dispatch("getSkills", true);
      await this.$store.dispatch("getTasks", true);

    }catch(error){
      console.log("Can't retrieve data")
      console.log(error)
      this.$store.dispatch('setSnackbar', { toggle: true, text: 'Unable to Retrieve data'})      
      this.$store.dispatch('setLoading', false)
    }
  },
  computed:{
    user(){
      return this.$store.getters.getUser;
    },
    snackbar(){
      return this.$store.getters.getSnackbar;
    }
  }
});
</script>
