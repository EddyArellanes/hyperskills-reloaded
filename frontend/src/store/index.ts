import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const momentTimezone = require('moment-timezone');
const moment = require('moment');

const timeZone = momentTimezone.tz.guess();

const dateTime = moment( new Date().toLocaleString("es-MX", { timeZone }), "DD-MMMM-YYYY") //Que pendejada me sale al revés xD
const date = moment( dateTime).format("MM-DD-YYYY")
//console.log("Date NOW", moment( new Date() ).format("MM-DD-YYYY") )

const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4001";
const endpoint = `${baseURL}/api/v1/Hyperskills`;
const api = axios.create({
  baseURL: endpoint
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    skills: [],
    entities: [],
    tasks: [],
    tasksPastDays: [],
    notes: [],
    date: moment( new Date()).format("DD-MMMM-YYYY"),
    dateDisplay: moment( new Date()).format("DD MMMM YYYY, h:mm:ss a"),//new Date().toLocaleString("es-MX", { timeZone }), //moment( new Date().toLocaleString("es-MX", { timeZone }) ).format("DD-MMMM-YYYY"),
    user: {},
    progress: 0,
    loading: false,
    snackbar: {
      toggle: false,
      text: "Unable to retrieve data",
      color: "black"
    }
  },
  getters: {
    //Experiment
    getVariable: ( state:any ) => ( variable: string) =>  {
      return state[variable]
    },
    getSkills: state => {
      return state.skills;
    },
    getSkill: state => (id: any) => {
      const skillFiltered = state.skills.filter((s: any) => s.id === id);
      return skillFiltered[0];
    },
    getEntities: state => {
      return state.entities;
    },
    getEntityById: state => (id: any) => {
      const filtered = state.entities.filter((e: any) => e.id === id);
      return filtered[0];
    },
    getEntitiesBySkill: state => (skill_id: any) => {
      const filtered = state.entities.filter(
        (e: any) => e.skill_id === skill_id
      );
      return filtered;
    },
    filterEntityBySkill: state => (skill_id: any) => {
      const filtered = state.entities.filter(
        (e: any) => e.skill_id === skill_id
      );
      return filtered[0];
    },

    getTasks: state => {
      return state.tasks;
    },

    getTask: state => (id: any) => {
      const taskFiltered = state.tasks.filter((t: any) => t.id === id);
      return taskFiltered[0];
    },
    getUser: state =>{
      return state.user;
    },
    getProgress: state => {
      if (state.tasks.length === 0) return state.progress;
      const progress =
        state.tasks
          .map((t: any) => (t.task_completed_rate > 100) ? 100 : t.task_completed_rate)
          .reduce((a, b) => a + b) / state.tasks.length;
      state.progress = Math.floor(progress);
      return state.progress;
    },
    getLoading: state => {
      return state.loading
    },
    getSnackbar: state => {
      return state.snackbar
    }
  },
  mutations: {
    setGeneric(state: any, data) {
      const { variable, value } = data

      state[variable] = value
    },
    setSkills(state, skills) {
      state.skills = skills;
    },
    setEntities(state, entities) {
      state.entities = entities;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setLoading(state, loading){
      state.loading = loading
    },
    setSnackbar(state, options ){
      state.snackbar = options
    }
  },
  actions: {
    //Experiment GET METHOD
    //verb: /id, params: ?filter&limit
  
    async requestGET( { commit}, config ){    
      const { storeVar, request,setLoading } = config  
      const { verb, params } = request
      if( setLoading) commit( "setLoading", true);
      const response = await api.get( verb , { params });                  
      commit("setGeneric", { variable: storeVar, value: response.data.data });
      if( setLoading) commit( "setLoading", false);      
    },
    async requestPUT( { commit}, config ){   

      const { storeVar, request,setLoading } = config       
      const { verb, body } = request
      if( setLoading) commit( "setLoading", true);
      const response = await api.put( verb , body );   

      commit("setGeneric", { variable: storeVar, value: response.data.data });
      if( setLoading) commit( "setLoading", false);
    },

    getSkills({ commit }, setLoading) {
      if( setLoading) commit( "setLoading", true);
      return api.get("/skill").then(skills => {
        commit("setSkills", skills.data.data);
        if( setLoading) commit( "setLoading", false);
      });
    },
    async updateSkill({ commit }, data) {
      await api.put(`/skill/${data.id}`, data.payload);
    },
    async getEntities({ commit }, setLoading) {
      if( setLoading) commit( "setLoading", true);
      const entities = await api.get("/entity");
      commit("setEntities", entities.data.data);
      if( setLoading) commit( "setLoading", false);
    },
    async insertEntity({ commit }, data) {
      await api.post(`/entity`, data);
    },
    async updateEntity({ commit }, data) {
      await api.put(`/entity/${data.id}`, data.payload);
    },
    async deleteEntity({ commit }, id) {
      await api.delete(`/entity/${id}`);
    },
    async getTasks({ commit, getters}, setLoading) {
      if( setLoading) commit( "setLoading", true);
      //Invoke from itself in the future      
      const date = getters.getVariable("date")      
      const tasks = await api.get("/task/today", {
        params: {           
          date
        }
      });
      commit("setTasks", tasks.data.data);
      if( setLoading) commit( "setLoading", false)
    },
    async fillTasks({ commit }) {
      const tasks = await api.post("/task/fill", {
        date: new Date()
      });
    },
    async updateTask({ commit }, data) {
      const response = await api.put(`/task/${data.id}`, data.payload);
    },
    setLoading( {commit}, status){
      commit("setLoading", status)
    },
    setSnackbar( {commit}, options){
      commit("setSnackbar", options)
    }
  },
  modules: {}
});
