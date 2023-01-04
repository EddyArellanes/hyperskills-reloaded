<template>
  <v-row>
    <v-col cols="12" v-if="header">
      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="false"
        type="list-item-avatar-three-line"
        :tile="false"
        class="mx-auto"
      ></v-skeleton-loader>
    </v-col>
    <v-col
      cols="12"
      lg="4"
      md="6"
      sm="12"
      v-for="index in elements"
      :key="index"
    >
      <v-sheet
        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
        class="px-3 pt-3 pb-3"
      >
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  inject: ["theme"],
  props: {
    header: {
      type: Boolean,
      default: true
    },
    elements: {
      type: Number,
      default: 6
    }
  }
});
</script>
