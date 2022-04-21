import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useGlobalStateContext } from "../context/StateProvider";
import Alert from "./Alert";

export interface TITLE {
  title: string;
}

const Layout: React.FC<TITLE> = ({ children, title = "My Blog" }) => {
  const { errorMessage, setErrorMessage } = useGlobalStateContext();
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"></meta>
      </Head>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between border-b">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <Link href="/blog-page">
              <a className="text-sm float-left text-black font-bold leading-relaxed inline-block mr-2 py-2 whitespace-nowrap uppercase">
                The Quest Love
              </a>
            </Link>

            <div className="float-left mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
            >
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2 text-black">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-black opacity-75" />
                  <span className="ml-2 text-black">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-black opacity-75" />
                  <span className="ml-2 text-black">signup</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="min-h-screen">{children}</main>
      <footer></footer>
    </div>
  );
};
export default Layout;
