import { reactive, toRefs } from 'vue';
// import { api } from 'boot/axios';
import { Post } from 'src/models/Post';
import { Product } from 'src/components/models';
// import { auth } from 'boot/firebase';

const state = reactive({
  posts: <Post[]>[],
  post: <Post>{},
  products: <Product[]>[],
});

export const usePostForm = () => {
  //   const select = (post: Post) => {};
  let postIndex = 0;

  const nextPost = () => {
    //TODO change this so we dont change the actual posts, make a copy?
    // const nexPost = state.posts.splice(0, 1)[0];
    const nexPost = state.posts[postIndex];
    if (nexPost) {
      state.post = { ...nexPost };
      postIndex++;
      return true;
    }
    return false;
  };
  //Clean posts selected
  const clean = () => {
    state.posts = [];
  };

  const getPostImage = (post: Post) => {
    return post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
  };

  return { ...toRefs(state), clean, nextPost, getPostImage };
};
