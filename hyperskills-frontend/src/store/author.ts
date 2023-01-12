import { usePostStore } from './post';
import {defineStore} from 'pinia';

interface Author {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
}

export const useAuthorStore = defineStore('AuthorStore', {
  state: () => ({
    authors: [] as Author[],
    author: null as Author | null,
    loading: false,
    error: null
  }),
  getters: {
    getPostAuthor: (state) => {
      const postStore = usePostStore();
      return state.authors.find( (author) => author.id === postStore.post?.authorId);
    }
  },
  actions: {
    async fetchAuthors() {
      this.loading = true;
      try{
        this.authors = await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response)=> response.json());
      } catch( error:any){
        this.error = error;
      } finally {
        this.loading = true;
      }
    }
  }
});