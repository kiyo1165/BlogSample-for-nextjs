import { POST } from "../@types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Post: React.FC<POST> = ({ post }) => {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <div className="py-8 flex flex-wrap md:flex-nowrap">
        <div className="md:w-28 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="m-4 text-gray-500 text-xs">{post.created_at}</span>
        </div>
        <div className="md:flex-grow max-w-md mr-4">
          <Link href="/posts/[id]" as={`/posts/${post.id}`} passHref>
            <h4 className="mb-2 hover:underline cursor-pointer">
              <a>{post.title}</a>
            </h4>
          </Link>
          <ul className="flex flex-row my-2">
            {post.tags.map((tag) => (
              <li
                key={tag.id}
                className="border rounded-md bg-black text-xs text-white py-1 px-2 last:mr-0 mr-1"
              >
                <Link
                  href="/tag-filter-page/[name]"
                  as={`/tag-filter-page/${tag.name}`}
                  passHref
                >
                  <a>{tag.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <p className="line-clamp-3">{post.content}</p>
          <Link href="/posts/[id]" as={`/posts/${post.id}`} passHref>
            <a className="text-gray-500 inline-flex items-center mt-2 text-xs hover:underline cursor-pointer">
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </Link>
        </div>
        <div className="md:flex-grow">
          <Image
            src={post.image}
            alt="Picture of the author"
            width={200}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
