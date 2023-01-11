import { usePostStore } from './post';
import { defineStore } from "pinia";

interface Comment{
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export const useCommentStore = defineStore('CommentStore', {
  state: () => ({
    comments: [] as Comment[],
    comment: null,
    loading: false,
    error: null
  }),
  getters: {
    getPostComments: (state) => {
      const postStore = usePostStore();
      return state.comments.filter((post) => post.postId === postStore.post?.id)
    }
  },
  actions: {
    async fetchComments(){
      this.comments = await fetch('https://jsonplaceholder.typicode.com/comments/')
      .then((response) => response.json())
    }
  }
});