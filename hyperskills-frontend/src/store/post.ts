import { defineStore } from "pinia";
interface Post{
  authorId: number;
  id: number;
  title: number;
  body: string;
}
export const usePostStore = defineStore('PostsStore', {
  state: () => ({
    posts: [] as Post[],
    post: null as Post | null,
    loading: false,
    error: null
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId:number) => state.posts.filter((post) => post.authorId === authorId)
    }
  },
  actions: {
    async fetchPosts(){
      this.posts = [];
      this.loading = true;
      try {
        this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json());
      } catch(error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
});