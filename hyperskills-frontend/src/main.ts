import { createApp } from 'vue'
import { createPinia, defineStore } from 'pinia';
import App from './App.vue'

interface Task{
  name: string;
  description: string;
  goal: number;
  done: boolean;
}
const pinia = createPinia();

export const useTodoStore = defineStore('ToDoStore', {
  state: () => ({
   todos: [] as Task[]
  }),
  actions: {
    addTodo(todo: Task){
      this.todos.push(todo)
    }
  },
  getters: {
    doneTodos: (state) => state.todos.filter(todo => todo.done)
  }
});

const app = createApp(App);

app.use(pinia);
app.mount('#app')
