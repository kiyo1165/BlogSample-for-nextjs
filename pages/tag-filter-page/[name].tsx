import Layout from "../../components/Layout";
import { getAllTagIds, getTagFillterdPosts } from "../../lib/fetch";
import { POST } from "../../@types/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import TagPost from "../../components/TagPost";
import Head from "next/head";

const TagsFilter: React.FC<POST[]> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>タグ検索</title>
      </Head>
      <div className="container max-w-4xl  md:mx-auto px-8">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-12 mx-auto">
            <div className="my-4 divide-y-2">
              {posts &&
                posts.map((post) => <TagPost key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TagsFilter;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagIds();
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getTagFillterdPosts(params.name);
  // console.log(post);
  return {
    props: {
      posts,
    },
    revalidate: 3,
  };
};
