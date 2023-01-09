import { createApp } from 'vue'
import { createPinia, defineStore } from 'pinia';
import App from './App.vue'

interface Task{
  name: string;
  description: string;
  goal: number;
}
const pinia = createPinia();
const useTodoStore = defineStore('ToDoStore', {
  state: () => ({
   todos: [] as Task[]
  }),
  actions: {
    addTodo(todo: Task){
      this.todos.push(todo)
    }
  }
});

const app = createApp(App);

app.use(pinia);
app.mount('#app')
