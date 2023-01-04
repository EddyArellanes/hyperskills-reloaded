<template>
  <v-col cols="12" lg="4" md="6" sm="12">
    <v-alert :type="alert.type" border="top" dismissible v-model="alert.show">
      {{ alert.message }}
    </v-alert>

    <v-card class="ma-1 pa-3 white--text" :color="color" tile dark>
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
            v-on:keyup.enter="updateSkill()"
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
            v-on:keyup.enter="updateSkill()"
          >
          </v-textarea>
        </div>
      </div>

      <div id="Countable-Reference" class="mb-4">
        <div>
          <v-switch
            v-model="countable"
            color="white"
            :label="'¿Contable?'"
            @click="modifyCountableBox = true"
          ></v-switch>
        </div>
        <div
          v-if="countable && !modifyCountableBox"
          @click="modifyCountableBox = true"
        >
          <v-chip label class="margin-4"> Goal</v-chip>
          <v-chip> {{ goal }}</v-chip>
        </div>
        <div v-else-if="countable" @focusout="modifyCountableBox = false">
          <v-text-field
            outlined
            label="Goal"
            v-model="goal"
            type="number"
          ></v-text-field>
        </div>
      </div>

      <v-spacer></v-spacer>
      <div id="Entity-Equipped" class="mb-4">
        <div v-if="!modifyEntityBox" @click="modifyEntityBox = true">
          <v-card-subtitle>
            <b>{{ entityName }} </b>
            <small
              v-text="
                entityName !== '' ? 'Equipado' : 'Ninguna misión equipada'
              "
            ></small>
            <v-spacer></v-spacer>
            <v-chip v-if="entity.completed" class="ma-2" color="white" outlined>
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              Completado
            </v-chip>
          </v-card-subtitle>
        </div>
        <div v-else>
          <v-select
            v-if="entities.length > 0"
            :items="entities"
            v-model="entity_equipped"
            :placeholder="entityName"
            item-text="title"
            item-value="id"
            label="Misiones disponibles"
            no-data-text="No hay Misiones disponibles"
            outlined
          ></v-select>
          <small v-else>No hay Misiones disponibles para este Skill</small>
        </div>
      </div>

      <div id="Color">
        <div v-if="!modifyColorBox" @click="modifyColorBox = true">
          <v-icon>mdi-palette</v-icon> <small>Cambiar color </small>
        </div>
        <div v-else>
          <v-select
            :items="colors"
            v-model="color"
            placeholder="Elige un color"
            item-text="name"
            item-value="value"
            label="Colores disponibles"
            no-data-text="No hay Colores disponibles"
            outlined
          ></v-select>
        </div>
      </div>
      <v-card-actions>
        <v-btn
          light
          color="white"
          v-if="
            modifyTitleBox ||
              modifyDescriptionBox ||
              modifyCountableBox ||
              modifyGoalBox ||
              modifyEntityBox ||
              modifyColorBox
          "
          text
          :loading="saveSkillLoading"
          :disabled="saveSkillLoading"
          @click="updateSkill()"
        >
          <v-icon>mdi-content-save</v-icon>Guardar
        </v-btn>

        <v-btn
          :dark="false"
          small
          color="white"
          v-if="
            modifyTitleBox ||
              modifyDescriptionBox ||
              modifyCountableBox ||
              modifyGoalBox ||
              modifyEntityBox
          "
          text
          @click="cancelSelection()"
        >
          <v-icon>mdi-close-circle</v-icon>Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    countable: {
      type: Boolean,
      required: true
    },
    goal: {
      type: Number
    },
    _entity_equipped: {
      type: Number
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      /*title: this.title,
      description: this.description,
      countable: this.countable,
      goal: this.goal,      
      color: this.color,*/
      entity_equipped: this._entity_equipped,
      entity_equipped_original: this._entity_equipped,
      alert: {
        type: "success",
        show: false,
        message: "Skill Updated!"
      },
      colors: [
        { name: "Blue", value: "blue darken-3" },
        { name: "Green", value: "green darken-3" },
        { name: "Cyan", value: "cyan darken-4" },
        { name: "Green", value: "green darken-4" },
        { name: "Teal", value: "teal darken-3" },
        { name: "Orange", value: "orange darken-4" },
        { name: "Brown", value: "brown darken-2" },
        { name: "Grey", value: "blue-grey darken-3" },
        { name: "Black", value: "black" }
      ],
      modifyTitleBox: false,
      modifyDescriptionBox: false,
      modifyCountableBox: false,
      modifyGoalBox: false,
      modifyEntityBox: false,
      modifyColorBox: false,
      saveSkillLoading: false
    };
  },
  computed: {
    entity(): any {
      const self = this;
      const schema = { completed: false };

      if (this.entity_equipped !== 0) {
        const entity = this.$store.getters.getEntityById(this.entity_equipped);

        return entity ? entity : schema;
      } else return schema;
    },
    entityName(): any {
      const self = this;
      if (this.entity_equipped !== 0) {
        const entity = this.$store.getters.getEntityById(this.entity_equipped);
        return entity ? entity.title : "";
      } else return "";
    },
    entities(): any {
      const initial = { title: "Ninguna", id: 0 };
      const entities = this.$store.getters.getEntitiesBySkill(this.id);
      entities.unshift(initial);
      return entities;
    }
  },
  methods: {
    async updateSkill() {
      try {
        this.saveSkillLoading = true;
        const payload = {
          title: this.title,
          description: this.description,
          countable: this.countable,
          goal: this.goal,
          entity_equipped: this.entity_equipped,
          color: this.color
        };
        const data = { id: this.id, payload };
        //Here The API Will Be Invoked

        await this.$store.dispatch("updateSkill", data);
        await this.$store.dispatch("getSkills", false);

        if (payload.entity_equipped !== this.entity_equipped_original) {
          await this.$store.dispatch("requestPUT", {
            request: {
              verb: `/task/entity/equipped/${this.id}`,
              body: {
                id_entity: payload.entity_equipped,
                _date: this.$store.getters.getVariable("date")
              }
            },
            storeVar: "tasksPastDays",
            setLoading: false
          });
          await this.$store.dispatch("getTasks", false);

          this.entity_equipped_original = payload.entity_equipped;
        }
        //Alert Success
        this.alert.type = "success";
        this.alert.message = "Entity Updated!";
        this.alert.show = true;
      } catch (error) {
        //Alert Error
        this.alert.type = "error";
        this.alert.message = "Unavailable to update Skill, try later";
        this.alert.show = true;
      } finally {
        this.saveSkillLoading = false;
        this.modifyTitleBox = false;
        this.modifyDescriptionBox = false;
        this.modifyCountableBox = false;
        this.modifyGoalBox = false;
        this.modifyEntityBox = false;
        this.modifyColorBox = false;
      }
    },
    cancelSelection() {
      this.modifyTitleBox = false;
      this.modifyDescriptionBox = false;
      this.modifyCountableBox = false;
      this.modifyGoalBox = false;
      this.modifyEntityBox = false;
      this.modifyColorBox = false;
    }
  }
});
</script>
<style scoped>
.margin-4 {
  margin-right: 4px;
}
</style>
