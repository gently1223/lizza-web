import { reactive, toRefs, ref } from 'vue';
import { api } from 'boot/axios';
import { Post } from 'src/models/Post';
import axios from 'axios';
// import { auth } from 'boot/firebase';
//TEST POSTS
// {
//   id: '1241serbser23',
//   caption: 'caption',
//   media_url:
//     'https://firebasestorage.googleapis.com/v0/b/lizza-s-pocs.appspot.com/o/instagram-4616826811778645%2F1647623084128%2Fproduct.png?alt=media&token=8905b32a-68bc-4f50-ae0f-0247da17de4f',
// },
const state = reactive({
  posts: <Post[]>[],
});

export const useInstaApi = () => {
  const paging = ref<{ next: string }>();
  const getPosts = async () => {
    try {
      console.log('entering get posts');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await api.get<
        unknown,
        { data: { data: Post[] | any; paging: { next: string } } }
      >('/posts');
      console.log('result',result);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!result.data.data.error) {
        state.posts = result.data.data as Post[];
        paging.value = result.data.paging as { next: string };
      }
      console.log('El result es -->', result.data.paging);
      return result;
    } catch (error) {
      //TODO handle error
      console.log(error);
      return null;
    }
  };

  const getNextPosts = async (url: string) => {
    console.log('Consultando la siguiente pag: ', url);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await axios.get(url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('El result es -->', result.data.paging);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!result.data.data.error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        state.posts = result.data.data as Post[];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        paging.value = result.data.paging as { next: string };
      }
      return result;
    } catch (error) {
      //TODO handle error
      console.log(error);
      return null;
    }
  };

  return { ...toRefs(state), getPosts, paging, getNextPosts };
};
