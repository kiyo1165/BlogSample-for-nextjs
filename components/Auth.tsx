import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { AUTH } from "../@types/types";
import Image from "next/image";
import { useGlobalStateContext } from "../context/StateProvider";
import Head from "next/head";
import Alert from "./Alert";

const cookie = new Cookie();

const Auth: React.FC = () => {
  const { errorMessage, setErrorMessage, isLogin, setIsLogin } =
    useGlobalStateContext();
  const router = useRouter();
  const initialState: AUTH = {
    email: "",
    password: "",
  };

  const [authState, setAuthState] = useState(initialState);
  const [isLoginChange, setIsLoginChange] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value: string | number = e.target.value;
    setAuthState({ ...authState, [name]: value });
  };

  const login = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}auth/jwt/create/`, {
        method: "POST",
        body: JSON.stringify({
          email: authState.email,
          password: authState.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 400) {
            setIsLogin(false);
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setIsLogin(true);
          const options = { path: "/" };
          cookie.set("access_token", data.access, options);
        });
      router.push("/admin");
      setIsLogin(true);
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginChange) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
          method: "POST",
          body: JSON.stringify({
            email: authState.email,
            password: authState.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          }
        });
        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <Alert />
        <div className="w-80 space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              {isLoginChange ? "Login" : "Sign up"}　
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={authUser}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="email"
                  value={authState.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={authState.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <span
                  onClick={() => setIsLoginChange(!isLoginChange)}
                  className="cursor-pointer font-medium text-gray hover:text-indigo-500"
                >
                  change mode ?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {isLoginChange ? "Login with JWT" : "Create new user"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
