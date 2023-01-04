<template v-if="task.id">
  <div>
    <div>
      <v-breadcrumbs :items="navigationLinks">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>

      <v-alert :type="alert.type" border="top" dismissible v-model="alert.show">
        {{ alert.message }}
      </v-alert>

      <v-container fluid class="no-padding">
        <v-row no-gutters>
          <v-col cols="12" sm="12" lg="6" id="Task">
            <v-card
              class="ma-1 pa-3 white--text"
              :color="task.skill_color"
              tile
              dark
            >
              <v-card-title class="headline">{{
                task.skill_title
              }}</v-card-title>
              <v-card-text>{{ task.skill_description }}</v-card-text>

              <v-card v-if="task.entity_title" class="pa-3">
                <h1 class="centered">{{ task.entity_title }}</h1>
                <img
                  width="200"
                  class="margin-right-40"
                  :src="task.entity_image"
                  :alt="task.entity_title"
                />
                <p>{{ task.entity_description }}</p>
                <v-chip outlined>{{ task.entity_current }}</v-chip>/<v-chip outlined>{{ task.entity_goal }}</v-chip>
              </v-card>

              <v-card outlined tile light class="tasks-background">
                <div v-if="!modifyNotesBox" @click="modifyNotes()">
                  <v-card-title>Notas</v-card-title>
                  <p>{{ task.task_note }}</p>
                </div>
                <div v-else>
                  <v-textarea
                    v-model="task.task_note"
                    solo
                    flat
                    auto-grow
                    full-width
                    name="note"
                    label="Notas"
                  >
                  </v-textarea>
                </div>
              </v-card>

              <template v-if="task.skill_countable">
                <div v-if="!modifyProgressBox" @click="modifyProgress()">
                  <v-spacer></v-spacer>
                  <v-chip label class="margin-right-4">Progreso</v-chip>
                  <v-chip>{{ task.task_current }}</v-chip> /
                  <v-chip>{{ task.skill_goal }}</v-chip>
                  <v-chip
                    v-if="task.task_current >= task.skill_goal"
                    class="ma-2"
                    color="teal"
                    text-color="white"
                  >
                    <v-avatar left>
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                    </v-avatar>
                    Completada
                  </v-chip>
                </div>
                <div v-else>
                  <v-text-field
                    outlined
                    label="Progreso"
                    v-model="task.task_current"
                    type="number"
                  ></v-text-field>
                  <!--
                  <v-slider
                    v-model="task.task_current"
                    :max="task.skill_goal"
                    min="0"
                    :thumb-size="24"
                    thumb-label="always"
                    thumb-color="primary"
                    label="Progreso"
                  >
                  </v-slider>-->
                </div>
              </template>

              <template v-else>
                <div
                  v-if="task.task_completed && !modifyProgressBoxB"
                  @click="modifyProgresB()"
                >
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" color="teal" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                    </v-avatar>
                    Completada
                  </v-chip>
                </div>
                <div v-else-if="!modifyProgressBoxB" @click="modifyProgresB()">
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-fire</v-icon>
                    </v-avatar>
                    No Completado
                  </v-chip>
                </div>
                <div v-else>
                  <v-switch
                    v-model="task.task_completed"
                    color="white"
                    :label="`¿Completado?`"
                  ></v-switch>
                </div>
              </template>
              <v-card-actions>
                <v-btn
                  v-if="
                    modifyProgressBox || modifyNotesBox || modifyProgressBoxB
                  "
                  text
                  @click="updateTask()"
                  >Actualizar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="12" lg="6">
            <v-row>
              <v-col cols="12" sm="12" lg="4"> <small>Días anteriores</small></v-col>              
            </v-row>
            <v-row v-if="tasksPastDays.length > 0">
              <v-col cols="12" sm="6" lg="4" v-for="(task, index) of tasksPastDays" :key="index">
                <v-card>
                  <v-card-title>{{ task.task_date | formatDate}}</v-card-title>
                  <v-card-subtitle v-if="task.entity_title">{{ task.entity_title }}</v-card-subtitle>
                  <v-card-subtitle :class="{ 'green--text text--darken-3': task.task_completed_rate >= 100 }" >Progreso: <small><b>{{task.task_completed_rate}} %</b></small></v-card-subtitle>                  
                </v-card>
              </v-col>
            </v-row>
          </v-col>                                 
        </v-row>      
      </v-container>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from 'moment'
export default Vue.extend({
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
      ],
      alert: {
        type: "success",
        show: false,
        message: "¡Task Updated!"
      },
      modifyProgressBox: false,
      modifyProgressBoxB: false,
      modifyNotesBox: false,
      scrollOptions: {
        duration: 1000,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    };
  },
  async created() {
    this.navigationLinks.push({
      to: "/",
      append: true,
      exact: true,
      text: this.task.skill_title,
      ripple: true,
      disabled: true
    });  
    this.$vuetify.goTo(0, { duration: 1000, offset: 0, easing: 'easeInOutCubic'}) 

    await this.$store.dispatch("requestGET" , { 
        request: {
          verb: '/task/skill',
          params: {
            'id_skill': this.task.skill_id
          }
        }, 
        storeVar: 'tasksPastDays', 
        setLoading: false 
      } 
    );    
  },
  filters:{
    formatDate( dateIn: string){
      return moment( dateIn).format("DD MMMM YYYY");
    }
  },
  computed: {
    task() {
      return this.$store.getters.getTask(this.$route.params.id);
    },
    //Past Days
    tasksPastDays(){      
      return this.$store.getters.getVariable( 'tasksPastDays')      
    }
  },
  methods: {
    modifyProgress() {
      this.modifyProgressBox = true;
    },
    modifyProgresB() {
      this.modifyProgressBoxB = true;
    },
    modifyNotes() {
      this.modifyNotesBox = true;
    },
    async updateTask() {
      try {     
        const completed_rate = this.task.skill_countable
          ? (this.task.task_current / this.task.skill_goal) * 100
          : this.task.task_completed
          ? 100
          : 0;

        const completed = this.task.skill_countable
          ? this.task.skill_goal % this.task.task_current === 0
            ? true
            : false
          : this.task.task_completed;

        const payload = {
          current: this.task.task_current,
          completed_rate,
          completed,
          note: this.task.task_note
        };

        const data = { id: this.task.id, payload };
        //Here The API Will Be Invoked
        await this.$store.dispatch("updateTask", data);
        await this.$store.dispatch("getTasks");
        //IF Entity == 100 then will be needed to switch to true
        //Alert Success
        this.$vuetify.goTo(0, { duration: 1000, offset: 0, easing: 'easeInOutCubic'}) 
        this.alert.type = "success";
        this.alert.message = "¡Task Updated!";
        this.alert.show = true;
      } catch (error) {
        //Alert Error
        this.alert.type = "error";
        this.alert.message = "Unavailable to update task, try later";
        this.alert.show = true;
      } finally {
        this.modifyProgressBox = false;
        this.modifyProgressBoxB = false;
        this.modifyNotesBox = false;
      }
    }
  }
});
</script>
<style lang="css" scoped>
.no-padding {
  padding: 0;
}
.tasks-background {
  background-color: #fff;
  border: 1px solid #c1c0bd;
  box-shadow: -1px 5px 35px -9px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 8px;
}
.margins-paper {
  border-top: 1px solid #e6e7e9;
  border-bottom: 1px solid #e6e7e9;
}
.margin-right-4 {
  margin-right: 4px;
}
.margin-right-40 {
  margin-right: 40px;
}
</style>
