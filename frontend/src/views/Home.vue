<template>
  <div class="home">
    <v-card id="Welcome Message"
      class="mx-auto mb-8"
      max-width="1280"
      max-height="720"
      outlined
      v-if="welcomeMessageShow">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            Empieza tu día mejorando tus habilidades
          </div>
          <v-list-item-title color="primary" class="headline mb-1">
            ¡Bienvenido!
          </v-list-item-title>
          <v-list-item-subtitle
            >Recuerda actualizar tus tareas</v-list-item-subtitle
          >
          <small>{{date}}</small>
        </v-list-item-content>

        <v-list-item-avatar size="80" color="grey">
          <v-img :src="avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text @click="welcomeMessageShow = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>

    <v-container v-if="loading" class="tasks-background" mt-4 id="Skeleton Loader">
      <SkeletonLoader />
    </v-container>

    <v-container v-if="tasks.length > 0 && !loading" class="tasks-background" mt-4 id="Progress General">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-3 white--text" color="blue darken-1">
            Progreso de hoy
            <v-progress-circular
              :value="progress"
              :size="100"
              :rotate="360"
              :width="15"
              color="white"
              >{{ progress }}%
            </v-progress-circular>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
   
    <v-container v-if="tasks.length > 0 && !loading" id="Tasks Cards">
      <v-row>
        <v-col cols="12" sm="12" lg="4" v-for="(task, index) of tasks" :key="index">
          <v-card
            class="ma-2 pa-3"            
            outlined
            height="300"            
            v-bind:style=" task.skill_color | getHexColor"
          >
            <v-card-title class="headline" 
              v-bind:class="task.skill_color | colorText ">
              {{ task.skill_title }}
            </v-card-title>

            <v-card-subtitle class="black--text"> {{ task.entity_title }} </v-card-subtitle>
            <v-card-subtitle>
              <v-progress-circular
                :value="task.task_completed_rate"
                :size="100"
                :rotate="180"
                :width="8" 
                :color="task.skill_color"
              >
                {{ task.task_completed_rate }}%
              </v-progress-circular>

              <v-chip
                v-if="task.task_completed_rate >= 100"
                class="ma-2"
                color="teal"
                text-color="white"
              >
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                Completada
              </v-chip>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text @click="goTask(task.id)">Actualizar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="margin-top-43-less" fluid v-else-if="!loading" id="Empty State">
      <v-row>
        <v-col>
          <v-card class="ma-2 pa-3">
            No has iniciado tu día <v-icon class="mr-2">mdi-alert</v-icon>
            <v-btn 
              class="font-small" 
              :loading="initTaskLoading"
              :disabled="initTaskLoading"
              @click="initTasks()">
              Empezar<v-icon>mdi-start</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import colors from 'vuetify/es5/util/colors'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const api = axios.create({
  baseURL: "http://localhost:4001/api/v1/Hyperskills"
});

export default {
  name: "home",
  components: {
    SkeletonLoader
  },
  data: () => {
    return {
      avatar:
        "https://i.pinimg.com/originals/5b/f7/67/5bf767161b6628bb6afbe8a25f94e6d8.jpg",
      welcomeMessageShow: true,  
      initTaskLoading: false,      
    };
  },
  created(){
    console.log("Date", this.date)
  },
  filters: {
    completed(boolean) {
      return boolean ? "Sí" : "No";
    },
    colorText( color) {
      //Reference: indigo--text text--darken-2
            
      const colorComposed = ( color.split('-').length > 1 ) ? true : false
      return ( colorComposed ) 
        ? color.split(' ')[0] + '--text text--'+ color.split('-')[1] 
        : color + '--text'      
      return colorComposed
    },
    getHexColor( color ){
      
      const colorComposed = ( color.split('-').length > 1 ) ? true : false
      
      let style = 'border: 1px solid '
      let hexColor = 'black'


      if( colorComposed){
        
        let prefix = color.split(' ')[0]
        let sufix = color.split(' ')[1].replace('-', '')
        

        if( colorComposed && prefix.split('-').length > 1 ) {        
          prefix = prefix.split('-')                
          prefix = prefix[0] + prefix[1].charAt(0).toUpperCase() + prefix[1].slice(1)   
          
        }

        hexColor = colors[ prefix ][ sufix  ]
      
      }else{
        hexColor = colors[ color ].base
      }

      return style + hexColor
    }
  },
  computed: {  
    date(){
      return this.$store.getters.getVariable('dateDisplay')
    },
    skills() {
      // also possible with mapGetters(['users'])
      return this.$store.getters.getSkills;
    },
    tasks() {
      return this.$store.getters.getTasks;
    },
    progress() {
      return this.$store.getters.getProgress;
    },
    loading(){
      return this.$store.getters.getLoading; 
    }
  },
  methods: {
    async initTasks() {
      try{
        this.initTaskLoading = true;
        await this.$store.dispatch("fillTasks");
        await this.$store.dispatch("getTasks");                
        this.initTaskLoading = false
      }
      catch( error){
        this.$store.dispatch('setSnackbar', { toggle: true, text: 'Try later please :c', color:"red darken-2"}) 
        this.initTaskLoading = false
      }
    },
    goTask(idTask) {
      this.$router.push({
        name: "task",
        params: {
          id: idTask
        }
      });
    }
  }
};
</script>
<style lang="css" scoped>
.font-small {
  font-size: 12px;
}
.margin-top-43-less {
  margin-top: -43px;
}
.tasks-background {
  background-color: #f0f0f0 !important;
}
</style>
