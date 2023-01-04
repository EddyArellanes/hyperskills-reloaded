<template>
  <div>
    <v-breadcrumbs :items="navigationLinks">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template> 
    </v-breadcrumbs>
    <v-container fluid>
      <v-row v-if="notes.length > 0 && !loading">
        <v-col cols="12" sm="12" lg="4" v-for="note of notes" :key="note.id">
           <v-card>
            <v-card-title>{{note.skill_title}}</v-card-title>
             <div>
               <p class="pa-4" style="white-space: pre-line">{{ note.task_note }}</p>
            </div>
           </v-card>
        </v-col>      
      </v-row>
      <p v-else>No hay información</p>
      <SkeletonLoader v-if="loading" :header="false"/>
    </v-container>    

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
export default Vue.extend({
    components:{
      SkeletonLoader
    },
    data() {
      return {
        navigationLinks: [
          {
            to: "/",
            append: true,
            exact: true,
            text: "Volver",
            ripple: true,
            disabled: false
          }
        ]     
      }
    },
    async created() {
      await this.$store.dispatch("requestGET" , { 
        request: {
          verb: '/task/notes',
          params: {
            'limit': 10
          }
        }, 
        storeVar: 'notes', 
        setLoading: true 
      }); 
    },
    computed: {
      notes() {
        return this.$store.getters.getVariable( 'notes');
      },    
      loading(){
        return this.$store.getters.getLoading; 
      }
  },
    
    
})
</script>