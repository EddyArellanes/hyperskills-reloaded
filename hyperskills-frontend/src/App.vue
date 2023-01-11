<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HelloWorld from './components/HelloWorld.vue'
import { useTodoStore } from './store/todo';
const { todos } = storeToRefs(useTodoStore());
const { addTodo } = useTodoStore();
addTodo({
 id: 1,
 name: 'Hola',
 description: 'Hola',
 goal: 100,
 done: false
});
addTodo({
 id: 2,
 name: 'Hola2',
 description: 'Hola2',
 goal: 200,
 done: false
});
</script>

<template>
  <p>Todo List</p>
  <div v-for="todo in todos" :key="todo.id">
    <p>{{todo.id}} {{todo.description}}</p>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
