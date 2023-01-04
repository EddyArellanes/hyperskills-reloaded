<template>
  <div>
    <!--Mobile Menu-->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="item.path"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--Desktop Menu-->
    <v-app-bar
      :class="{ 'transparent-nav-bar': transparentNavBar }"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-sm-none relevant"
      />
      <v-toolbar-title class="pointer" @click="goHome('/')">
        <!--<v-img width="48px" height="48px" src="../assets/logo.png"/>-->
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-spacer />
      <v-toolbar-items class="d-none d-lg-block">
        <v-btn
          v-for="(button, index) in menu"
          :key="index"
          color="primary"
          :outlined="true"
          :text="true"
          :to="button.path"
        >
          <a class="text-white">
            <v-icon>{{ button.icon }}</v-icon>
            {{ button.title }}
          </a>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {},
  data: () => {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      navColor: "brown darken-2",
      menu: [
        {
          title: "Inicio",
          path: "/",
          icon: "mdi-home"
        },
        {
          title: "Skills",
          path: "/skills",
          icon: "mdi-treasure-chest"
        },
        {
          title: "Notes",
          path: "/notes",
          icon: "mdi-script-text-outline"
        },
        {
          title: "Metrics",
          icon: "mdi-finance"
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "HyperSkills",
      transparentNavBar: true
    };
  },
  methods: {
    goHome(path: string) {
      if (this.$route.path !== path) this.$router.push(path);
    }
  }
});
</script>
<style lang="css" scoped>
.inline {
  display: inline;
}
.pointer{
  cursor: pointer;
}
</style>
