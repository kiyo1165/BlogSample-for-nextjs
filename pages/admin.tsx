import React, { useState, useEffect } from "react";
import { TAG, GET_TAG } from "../@types/types";
import Layout from "../components/Layout";
import axios from "axios";
import Cookies from "universal-cookie";
import { useGlobalStateContext } from "../context/StateProvider";
import { useRouter } from "next/router";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "../components/admin/Tag";
import TagsFilter from "./tag-filter-page/[name]";
import { Console } from "console";

export interface CREATE_POST {
  title: string;
  content: string;
  tags: GET_TAG[];
  is_active: boolean;
  image: null | File;
  user: number;
}

const cookie = new Cookies();

const Admin: React.FC = () => {
  const initState: CREATE_POST = {
    title: "",
    content: "",
    user: 0,
    tags: [],
    is_active: true,
    image: null,
  };

  //states
  const { errorMessage, setErrorMessage, isLogin, setIsLogin } =
    useGlobalStateContext();

  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);
  const [catchTag, setCatchTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputState, setInputState] = useState<any>(initState);

  //fetcher
  const getAsyncLoginUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/self_user/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (res.status === 401) {
        throw "authentication failed";
      } else if (res.status) {
        setUserId(res.data.id);
        return res.data;
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("ログインセッションが切れました。");
      router.push("/");
    }
  };

  //タグ検索
  const handleSearchTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: any = e.target.value;
    setCatchTag(value);
    filterdTagSearch();
  };

  const filterdTagSearch = async () => {
    try {
      setTagList([]);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/?name=${catchTag}`
      );
      const tagData = res.data;

      setTagList(tagData);
    } catch (error) {
      console.log(error);
      setErrorMessage("ログインセッションが切れました。");
      router.push("/");
    }
  };

  const asyncPostCreate = async () => {
    try {
      const res = await axios.post<CREATE_POST>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/create-blog/`,
        inputState,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      console.log(res.status);
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return console.log(e.response);
      } else if (e.response.status === 401) {
        setErrorMessage("トークンが切れました。再度ログインしてください。");
        router.push("/");
      }
    }
  };

  const asyncCreateTags = async () => {
    try {
      const res = await axios.post<TAG[]>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/`,
        inputState,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      console.log(res);
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return console.log(e.response);
      } else if (e.response.status === 401) {
        setErrorMessage("トークンが切れました。再度ログインしてください。");
        router.push("/");
      }
    }
  };
  //入力の受け取り
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | any
  ) => {
    const name: string = e.target.name;
    let value: string = e.target.value;
    const image: File = e.target.form.image.files[0];

    setInputState({ ...inputState, [name]: value, image });
    console.log(inputState);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const array: number[] = [];
    inputState.tags.map((tag: any) => {
      array.push(tag.id);
    });

    setInputState(((inputState.tags = array), (inputState.user = userId)));
    console.log(inputState);
    // await asyncCreateTags();
    await asyncPostCreate();
    setInputState(initState);
    setTagList([]);
  };

  const H2 = ({ node, ...props }) => {
    return <h2 id={node.position?.start.line.toString()}>{props.children}</h2>;
  };

  const ankerLink = ({ node, ...props }) => {
    return (
      <a href={"#" + node.position?.start.line.toString()}>{props.children}</a>
    );
  };

  useEffect(() => {
    getAsyncLoginUser();
  }, [setUserId]);

  //disabled handler
  useEffect(() => {
    if (inputState.title && inputState.content) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  });

  return (
    <>
      <Head>
        <title>admin</title>
      </Head>

      <form onSubmit={handleSubmit}>
        <div className="m-3 bg-gray-200">
          <input
            className="border w-full h-12 outline-none focus:border-gray-400"
            id="title"
            type="text"
            value={inputState.title}
            name="title"
            onChange={handleInputChange}
            placeholder="タイトル"
          />
        </div>
        タグ検索
        <div className="mt-1">
          <input
            type="search"
            list="mylist"
            autoComplete="off"
            name="tagsearch"
            value={catchTag}
            onChange={handleSearchTagChange}
            className="border w-full h-8 outline-none focus:border-gray-400"
            placeholder="タグ"
          />

          <ul className="text-gray-700">
            {tagList &&
              tagList.map((tag: any, index) => (
                <>
                  <li
                    key={index}
                    className="absolute visible p-2 bg-white text-gray-700  cursor-pointer hover:border-red-500 "
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setInputState({
                          ...inputState,
                          tags: [tag, ...inputState.tags],
                        });
                        console.log(inputState);
                        setCatchTag("");
                        setTagList([]);
                      }}
                    >
                      {tag.name}
                    </button>
                  </li>
                </>
              ))}
          </ul>
        </div>
        <div className="mt-1">
          登録済み :
          {inputState.tags &&
            inputState.tags.map((tag: any, index: any) => (
              <Tag
                tag={tag}
                key={index}
                setInputState={setInputState}
                inputState={inputState}
              />
            ))}
        </div>
        <div className="columns-2">
          <textarea
            id="content"
            value={inputState.content}
            name="content"
            onChange={handleInputChange}
            className="w-full min-h-screen border"
          />
          <article className="prose lg:prose-xl">
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={inputState.content}
              components={{
                h2: H2,
              }}
              remarkPlugins={[remarkGfm]}
            />
          </article>
        </div>
        <div className="flex flex-wrap items-center px-1 py-1 mb-3 h-20">
          <label htmlFor="is_active">投稿する</label>
          <input
            id="is_active"
            type="checkbox"
            value={inputState.is_active}
            name="is_active"
            onClick={() => setInputState(inputState.is_active)}
            onChange={handleInputChange}
          />
          <p>{inputState.is_active}</p>
          <label htmlFor="image">image</label>
          <input id="image" type="file" name="image" />
          <button type="submit" disabled={isLoading}>
            submit
          </button>
        </div>
      </form>
    </>
  );
};
export default Admin;
