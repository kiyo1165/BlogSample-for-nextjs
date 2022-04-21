import Layout from "../../components/Layout";
import { getAllIds, getPost } from "../../lib/fetch";
import { POST } from "../../@types/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const Blog: React.FC<POST> = ({ post }) => {
  console.log(post);
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="container lg:max-w-4xl md:mx-auto px-4 my-4 ">
        <div>
          <div className="m-4 text-center">
            <Image
              src={post.image}
              alt="Picture of the author"
              width={450}
              height={400}
              className="mr-4 cursor-pointer"
            />
          </div>
        </div>
        <div className="m-10">
          <h2>{post.title}</h2>
        </div>

        <article className="prose lg:prose-xs">{post.content}</article>
      </div>
    </>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllIds();
  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.id);
  return {
    props: {
      post,
    },
    revalidate: 3,
  };
};
