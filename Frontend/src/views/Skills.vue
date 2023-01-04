<template>
  <!--Ésta wea es Bilateral, es decir puedo Editar el Skill y qué entity tiene equipada, y puedo editar la Entity y a que Skill pertenece
  En este punto funcionará OK para mí, sólo debo validar en el futuro si creo un "Catálogo de Skills" y la posibilidad de generarles Merge Requests o algo así

  -->
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12">
          <p>Actualiza las habilidades y objetivos que tienes 😊</p>
        </v-col>
      </v-row>
    </v-container>

    <v-card>
      <v-toolbar flat>
        <template v-slot:extension>
          <v-tabs v-model="tabs" fixed-tabs>
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              href="#skill-tab"
              @click="icon = 'sword'"
              class="primary--text"
            >
              Skill <v-icon>mdi-sword</v-icon>
            </v-tab>

            <v-tab
              href="#entity-tab"
              @click="icon = 'shield'"
              class="primary--text"
            >
              Entity <v-icon>mdi-shield</v-icon>
            </v-tab>
          </v-tabs>

          <v-btn
            v-if="!loading"
            absolute
            fab
            top
            left
            class="top-minus"
            @click="openAddBottomSheet(icon)"
          >
            <v-icon>mdi-plus</v-icon> <v-icon>mdi-{{ icon }}</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tabs">
        <v-tab-item value="skill-tab">
          <v-card flat>
            <v-container>
              <v-row v-if="!loading">
                <Skill
                  v-for="skill of skills"
                  :key="skill.id"
                  :id="skill.id"
                  :title="skill.title"
                  :description="skill.description"
                  :countable="skill.countable"
                  :_entity_equipped="skill.entity_equipped"
                  :goal="skill.goal"
                  :color="skill.color"
                />
              </v-row>
              <SkeletonLoader v-else :header="false" />
              <v-bottom-sheet v-model="sheetSkill" id="Add Skill">
                <v-sheet class="text-center" height="200px">
                  <v-btn
                    class="mt-6"
                    text
                    color="red"
                    @click="sheetSkill = !sheetSkill"
                    >close</v-btn
                  >
                  <div>
                    <p>Crea una nuevo Skill</p>
                  </div>
                </v-sheet>
              </v-bottom-sheet>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="entity-tab">
          <v-card flat>
            <v-container>
              <v-row v-if="!loading">
                <Entity
                  v-for="entity of entities"
                  :key="entity.id"
                  :id="entity.id"
                  :titleE="entity.title"
                  :descriptionE="entity.description"
                  :imageE="entity.image"
                  :currentE="entity.current"
                  :goalE="entity.goal"
                  :skill_idE="entity.skill_id"
                  :completedE="entity.completed"
                />
              </v-row>
              <SkeletonLoader v-else :header="false" />

              <v-bottom-sheet v-model="sheetEntity" id="Add Skill">
                <v-sheet class="text-center">
                  <v-btn
                    class="mt-6"
                    text
                    color="red"
                    @click="sheetEntity = !sheetEntity"
                    >close</v-btn
                  >
                  <div v-if="!newEntityAdded">
                    <p>Crea una nueva Entity!</p>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <v-text-field
                            label="Nombre"
                            outlined
                            v-model="newEntity.title"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <v-text-field
                            label="Descripción"
                            outlined
                            v-model="newEntity.description"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="pt-0 pb-0">
                          <v-text-field
                            label="Imagen"
                            outlined
                            v-model="newEntity.image"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="pt-0 pb-0">
                          <v-text-field
                            type="number"
                            label="Goal"
                            outlined
                            v-model="newEntity.goal"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          class="pt-0 pb-0"
                          v-if="skills.length > 0"
                        >
                          <v-select
                            :items="skills"
                            item-text="title"
                            item-value="id"
                            label="Skills disponibles"
                            no-data-text="No hay Skills disponibles"
                            v-model="newEntity.id_skill"
                            outlined
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="pt-0 pb-0" v-else>
                          <button>No hay skills, crea unos desde BD :U</button>
                        </v-col>
                        <v-col cols="12" sm="6" lg="12" class="pt-0 pb-0">
                          <v-btn
                            color="blue darken-3"
                            light
                            text
                            :loading="newEntityLoading"
                            @click="insertEntity()"
                          >
                            <v-icon>mdi-content-save</v-icon>Guardar
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <div v-else>
                    <v-alert
                      :type="alert.type"
                      border="top"
                      v-model="alert.show"
                    >
                      {{ alert.message }}
                    </v-alert>
                  </div>
                </v-sheet>
              </v-bottom-sheet>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Skill from "@/components/Skill.vue";
import Entity from "@/components/Entity.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

export default Vue.extend({
  components: {
    Skill,
    Entity,
    SkeletonLoader
  },
  data() {
    return {
      tabs: null,
      sheetSkill: false,
      sheetEntity: false,
      icon: "sword",
      newEntityLoading: false,
      newEntityAdded: false,
      newEntity: {
        title: "",
        description: "",
        image: "",
        goal: "",
        id_skill: ""
      },
      alert: {
        type: "success",
        show: false,
        message: "Entity Created!"
      }
    };
  },
  async created() {
    await this.$store.dispatch("getEntities");
  },
  computed: {
    skills() {
      return this.$store.getters.getSkills;
    },
    entities() {
      return this.$store.getters.getEntities;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    openAddBottomSheet(icon: String) {
      if (icon === "sword") {
        this.sheetEntity = false;
        this.sheetSkill = true;
      }
      if (icon === "shield") {
        this.sheetSkill = false;
        this.sheetEntity = true;
      }
    },
    async insertEntity() {
      try {
        this.newEntityLoading = true;
        await this.$store.dispatch("insertEntity", this.newEntity);
        await this.$store.dispatch("getEntities", false);
        this.alert.type = "success";
        this.alert.message = "¡Entity created!";
        this.alert.show = true;
        this.newEntityAdded = true;
      } catch (e) {
        this.alert.type = "error";
        this.alert.message = "Unavailable to create new entity, try later";
        this.alert.show = true;
      } finally {
        this.newEntityLoading = true;
      }
    }
  }
});
</script>

<style lang="css" scoped>
.top-minus {
  top: -86px !important;
}
</style>
