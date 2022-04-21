import { POST, TAG } from "../@types/types";
import axios from "axios";

//ページ一覧取得
export const getAllPosts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/`
    );
    const posts = res.data;
    let filteredPosts = posts.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    filteredPosts = filteredPosts.filter((post) => post.is_active === true);
    // console.log(filteredPosts);
    return filteredPosts;
  } catch (error) {
    console.log(error);
  }
};

//id取得
export const getAllIds = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/`
    );
    const posts = res.data;
    return posts.map((post: POST) => {
      return {
        params: {
          id: String(post.id),
        },
      };
    });
  } catch (error) {
    console.log(error);
  }
};

//詳細ページ取得
export const getPost = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/${id}/`
    );
    const post = res.data;
    // console.log(post);
    return post;
  } catch (error) {
    console.log(error);
  }
};

//tagid取得
export const getAllTagIds = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/`
    );
    const tags = res.data;
    return tags.map((tag: TAG) => {
      return {
        params: {
          name: String(tag.name),
        },
      };
    });
  } catch (error) {
    console.log(error);
  }
};

//タグ毎の記事
export const getTagFillterdPosts = async (name: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/?tags=${name}`
    );
    const posts = res.data;
    // console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
};
