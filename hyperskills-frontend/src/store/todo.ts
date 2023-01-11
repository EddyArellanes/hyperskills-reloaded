import { defineStore } from 'pinia';

interface Task {
  id: number;
  name: string;
  description: string;
  goal: number;
  done: boolean;
}

export const useTodoStore = defineStore('ToDoStore', {
  state: () => ({
    todos: [] as Task[]
  }),
  actions: {
    addTodo(todo: Task) {
      this.todos.push(todo)
    }
  },
  getters: {
    doneTodos: (state) => state.todos.filter(todo => todo.done)
  }
});