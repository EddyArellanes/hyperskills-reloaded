<template>
  <v-col cols="12" lg="4" md="6" sm="12">
    <v-alert :type="alert.type" border="top" dismissible v-model="alert.show">
      {{ alert.message }}
    </v-alert>

    <v-card class="ma-1 pa-3">
      <v-card :color="skill.color" width="80%" height="5"> </v-card>

      <v-btn id="Delete Button"
        absolute
        top
        right
        fab
        small
        dark
        color="red darken-4"
        class="minus-right-10"
        @click="deleteDialog = true">
        <v-icon dark>mdi-delete</v-icon>
      </v-btn>

      <div id="Completed" class="mb-4">
        <div v-if="current >= goal">
          <v-alert outlined type="success">
            Completado
          </v-alert>
        </div>
      </div>

      <div id="Title-Reference">
        <div v-if="!modifyTitleBox" @click="modifyTitleBox = true">
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>
        </div>
        <div v-else>
          <v-text-field
            label="Title"
            v-model="title"
            v-on:keyup.enter="updateEntity()"
          ></v-text-field>
        </div>
      </div>

      <div id="Description-Reference">
        <div v-if="!modifyDescriptionBox" @click="modifyDescriptionBox = true">
          <v-card-text>{{ description }}</v-card-text>
        </div>
        <div v-else>
          <v-textarea
            v-model="description"
            solo
            flat
            full-width
            label="Description"
            v-on:keyup.enter="updateEntity()"
          >
          </v-textarea>
        </div>
      </div>
      <div id="Image-Reference" class="mb-4">
        <div v-if="!modifyImageBox" @click="modifyImageBox = true">
          <v-img
            v-if="image !== ''"
            :src="image"
            width="200"
            height="200"
            class="margin-right-40"
          ></v-img>
          <p v-else>Upload Image</p>
        </div>
        <div v-else>
          <v-text-field
            label="Image URL"
            v-model="image"
            v-on:keyup.enter="updateEntity()"
          ></v-text-field>
        </div>
      </div>

      <div id="Goal-Reference" class="mb-4">
        <div v-if="!modifyGoalBox" @click="modifyGoalBox = true">
          <v-chip label class="margin-4-right"> Goal</v-chip>
          <v-chip> {{ goal }}</v-chip>
        </div>
        <div v-else>
          <v-text-field
            outlined
            label="Goal"
            v-model="goal"
            type="number"
          ></v-text-field>
        </div>
      </div>

      <div id="Skill-Equipped">
        <div v-if="!modifySkillBox" @click="modifySkillBox = true">
          <v-card-subtitle>
            <b>{{ skill.title }} </b>
            <small
              v-text="
                skill.title !== '' ? 'Skill Owner' : 'Ningún Skill asociado'
              "
            ></small>
          </v-card-subtitle>
        </div>
        <div v-else>
          <v-select
            v-if="skills.length > 0"
            :items="skills"
            v-model="id_skill"
            :placeholder="skill.title"
            item-text="title"
            item-value="id"
            label="Skills disponibles"
            no-data-text="No hay Skills disponibles"
            outlined
          ></v-select>
          <small v-else>No hay Skills disponibles</small>
        </div>
      </div>

      <v-card-actions>
        <v-btn
          color="blue darken-3"
          light
          v-if="
            modifyTitleBox ||
              modifyDescriptionBox ||
              modifyImageBox ||
              modifyGoalBox ||
              modifySkillBox
          "
          text
          @click="updateEntity()"
        >
          <v-icon>mdi-content-save</v-icon>Guardar
        </v-btn>

        <v-btn
          :dark="false"
          color="red darken-3"
          small
          v-if="
            modifyTitleBox ||
              modifyDescriptionBox ||
              modifyImageBox ||
              modifyGoalBox ||
              modifySkillBox
          "
          text
          @click="cancelSelection()"
        >
          <v-icon>mdi-close-circle</v-icon>Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>

    <div class="text-center" id="Delete-Dialog">
      <v-dialog v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            ¿Estás seguro?
          </v-card-title>

          <v-card-text>
            Se eliminará éste Entity y no podrás verlo más
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteEntity()">
              Eliminar
            </v-btn>
            <v-btn color="black" text @click="deleteDialog = false">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-snackbar v-model="snackBarDelete.show" :color="snackBarDelete.type">
      {{ snackBarDelete.message }}
      <v-btn color="red" text @click="snackBarDelete.show = false">
        Close
      </v-btn>
    </v-snackbar>

  </v-col>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Skill",
  props: {
    id: {
      type: Number,
      required: true
    },

    titleE: {
      type: String,
      required: true
    },
    descriptionE: {
      type: String
    },
    imageE: {
      type: String,
      required: false
    },
    currentE: {
      type: Number
    },
    goalE: {
      type: Number
    },
    skill_idE: {
      type: Number
    },
    completedE: {
      type: Boolean
    }
  },
  data() {
    return {
      title: this.titleE,
      description: this.descriptionE,
      current: this.currentE,
      goal: this.goalE,
      image: this.imageE,
      completed: this.completedE,
      id_skill: this.skill_idE,
      alert: {
        type: "success",
        show: false,
        message: "Entity Updated!"
      },
      snackBarDelete: {
        type: "success",
        show: false,
        message: "Entity Deleted!"
      },      
      deleteDialog: false,
      modifyTitleBox: false,
      modifyDescriptionBox: false,
      modifyImageBox: false,
      modifyGoalBox: false,
      modifySkillBox: false
    };
  },
  computed: {
    skill(): any {
      const self = this;
      if (this.id_skill !== 0) {
        const skill = this.$store.getters.getSkill(this.id_skill);
        return { id: skill.id, color: skill.color, title: skill.title };
      } else return "";
    },
    skills(): any {
      return this.$store.getters.getSkills;
    }
  },
  methods: {
    async updateEntity() {
      try {
        const payload = {
          title: this.title,
          description: this.description,
          image: this.image,
          goal: this.goal,
          completed: this.completed,
          id_skill: this.id_skill
        };

        const data = { id: this.id, payload };

        //Here The API Will Be Invoked
        await this.$store.dispatch("updateEntity", data);
        await this.$store.dispatch("getEntities", false);

        //Alert Success
        this.alert.type = "success";
        this.alert.message = "Entity Updated!";
        this.alert.show = true;
      } catch (error) {
        //Alert Error
        this.alert.type = "error";
        this.alert.message = "Unavailable to update Entity, try later";
        this.alert.show = true;
      } finally {
        this.modifyTitleBox = false;
        this.modifyDescriptionBox = false;
        this.modifyImageBox = false;
        this.modifyGoalBox = false;
        this.modifySkillBox = false;
      }
    },
    cancelSelection() {
      this.modifyTitleBox = false;
      this.modifyDescriptionBox = false;
      this.modifyImageBox = false;
      this.modifyGoalBox = false;
      this.modifySkillBox = false;
    },
    async deleteEntity() {
      try {
        await this.$store.dispatch("deleteEntity", this.id);
        await this.$store.dispatch("getEntities");

        //Snackbar Success
        this.snackBarDelete.type = "success";
        this.snackBarDelete.message = "Entity Deleted!";
        this.snackBarDelete.show = true;
      } catch (error) {
        //Snackbar Error
        this.snackBarDelete.type = "error";
        this.snackBarDelete.message = `Unavailable to delete Entity ${this.title}, try later`;
        this.snackBarDelete.show = true;
      }
    }
  }
});
</script>
<style lang="css" scoped>
.skill-separator {
  height: 3px;
}
.minus-right-10 {
  right: -10px;
}
.margin-right-40 {
  margin-left: 40px;
}
.margin-4-right {
  margin-right: 4px;
}
</style>
