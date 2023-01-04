<template>
  <v-container v-if="skills.length > 0">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-3 white--text" color="blue darken-1" tile>
          Progreso de hoy:
          <v-progress-circular
            :value="30"
            :size="100"
            :rotate="360"
            :width="15"
            color="white"
            >30%
          </v-progress-circular>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
