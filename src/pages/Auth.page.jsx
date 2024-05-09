/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { SpanAlerte } from "../components/SpanAlert";
import axios from "axios";

export default function AuthUser({ openAuth, onClose, setIsLogin }) {
  const [open, setOpen] = useState(openAuth);
  const [formTitle, setFormTitle] = useState("Connexion");
  const [login, setlogin] = useState(true);
  const [errors, setErrors] = useState({
    surName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    setOpen(openAuth);
  }, [openAuth]);

  const closeForm = () => {
    setOpen(false);
    onClose(); // Appel de la fonction onClose pour informer le parent de la fermeture
  };

  // Permet de gérer les formulaires (register pour enregistrer,handleSubmit pour soumettre et formState pour les erreurs )
  const { register, handleSubmit } = useForm();

  //    connexion de user
  const UserLogin = (data) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        if (res.status !== 200) {
          onClose();
          setIsLogin(true);
          navigate("/")
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setErrors({
            email: res.data.email,
            password: res.data.password,
          });
        }
      })
      .catch((res) => {
        console.log(res);
        // redirection vers la page erreur
      });
  };

  // inscription des users
  const UsersignUp = (data) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/add`,
      withCredentials: true,
      data: {
        surName: data.surName,
        email: data.email,
        password: data.password,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          onClose();
          setlogin(true);
          navigate("/");
        } else {
          setErrors({
            surName: res.data.errors.surName,
            password: res.data.errors.password,
            email: res.data.errors.email,
          });
        }
        console.log(errors.surName);
      })
      .catch((res) => {
        console.log(res);
        // redirection vers la page erreur
      });
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeForm}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="hidden sm:block relative">
              <img src="/images/hibou.png" alt="" />
            </div>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-transparent text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                <div className="bg-transparent px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                  <div className="mt-2  sm:ml-4 sm:mt-0 text-left ">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-amber-500 "
                    >
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-amber-500">
                          {formTitle}
                        </h2>
                      </div>
                      <hr className="border-amber-500" />
                    </Dialog.Title>
                    <div className="mt-2">
                      {login ? (
                        <div>
                          {/* formulaire pour la connexion des users */}

                          <form className="space-y-6" action="#" method="POST">
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-amber-500"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  {...register("email", {
                                    required: true,
                                    maxLength: 30,
                                  })}
                                  className="block w-full rounded-md border-0 py-1.5 text-amber-500 shadow-sm px-2  focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                                {errors.email !== "" ? ( // Ici par exemple on vérifieque si le label pseudo est required et que rien n'a été écris alors on affiche un message en rouge en dessous
                                  <SpanAlerte
                                    message={errors.email}
                                    className="mt-1"
                                  />
                                ) : null}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-amber-500"
                              >
                                Mot de Passe
                              </label>
                              <div className="text-sm">
                                <a
                                  href="#"
                                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                  Mot de passe oublié ?
                                </a>
                              </div>
                            </div>
                            <div className="mt-2">
                              <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                {...register("password", {
                                  required: true,
                                  maxLength: 30,
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-amber-500 shadow-sm px-2  focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                              />
                              {errors.password !== "" ? (
                                <SpanAlerte
                                  message={errors.password}
                                  className="mt-1"
                                />
                              ) : null}
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="remember"
                                  aria-describedby="remember"
                                  type="checkbox"
                                  name="remember"
                                  {...register("remember")}
                                  className="w-4 h-4  checked:bg-blue-500"
                                  required=""
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="remember"
                                  className="text-gray-500 dark:text-[#e0c758]"
                                >
                                  Se souvenir de moi
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : (
                        // formulaire d'inscription
                        <div>
                          <form className="space-y-6" action="#" method="POST">
                            <div>
                              <label
                                htmlFor="surName"
                                className="block text-sm font-medium leading-6 text-amber-500"
                              >
                                Pseudonyme
                              </label>
                              <div className="mt-2">
                                <input
                                  id="surName"
                                  name="surName"
                                  {...register("surName", {
                                    required: true,
                                    maxLength: 30,
                                  })}
                                  type="text"
                                  required
                                  className="block w-full rounded-md border-0 py-1.5 text-amber-500 shadow-sm px-2  focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                                {errors.surName !== "" ? (
                                  <SpanAlerte
                                    message={errors.surName}
                                    className="mt-2"
                                  />
                                ) : null}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-amber-500"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  {...register("email", {
                                    required: true,
                                    maxLength: 50,
                                  })}
                                  required
                                  className="block w-full rounded-md border-0 py-1.5 text-amber-500 shadow-sm px-2  focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                                {errors.email !== "" ? (
                                  <SpanAlerte
                                    message={errors.email}
                                    className="mt-2"
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-amber-500"
                              >
                                Mot de Passe
                              </label>
                              <div className="mt-2">
                                <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  {...register("password", { required: true })}
                                  autoComplete="current-password"
                                  required
                                  className="block w-full rounded-md border-0 py-1.5 text-amber-500 shadow-sm  px-2  focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                                {errors.password !== "" ? (
                                  <SpanAlerte
                                    message={errors.password}
                                    className="mt-2"
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="password-confirmation"
                                className="block text-sm font-medium leading-6 text-amber-500"
                              >
                                Confirmer Mot de Passe
                              </label>
                              <div className="mt-2">
                                <input
                                  id="password"
                                  name="password-confirmation"
                                  type="password"
                                  autoComplete="current-password"
                                  {...register("password_conf", {
                                    required: true,
                                  })}
                                  required
                                  className="block w-full rounded-md border-0 py-1.5  text-amber-500 shadow-sm   px-2  focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                                {errors.password !== "" ? (
                                  <SpanAlerte
                                    message={errors.password}
                                    className="mt-2"
                                  />
                                ) : null}
                              </div>
                            </div>
                          </form>
                        </div>
                      )}

                      {login ? (
                        <p className="mt-5 text-center text-sm text-gray-500">
                          Pas de compte ?{" "}
                          <a
                            href="#"
                            onClick={() => {
                              setFormTitle("Inscription");
                              setlogin(false);
                            }}
                            className="font-semibold leading-6 text-amber-700 hover:text-amber-500"
                          >
                            Je crée mon compte
                          </a>
                        </p>
                      ) : (
                        <p className="mt-5 text-center text-sm text-gray-500">
                          Deja un compte ?{" "}
                          <a
                            href="#"
                            onClick={() => {
                              setFormTitle("Connexion");
                              setlogin(true);
                            }}
                            className="font-semibold leading-6 text-amber-700 hover:text-amber-500"
                          >
                            Je me connecte
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-3 mx-4">
                  {login ? (
                    <button
                      type="button"
                      className=" mt-3 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-sm  hover:bg-amber-600 sm:mt-0 sm:w-auto"
                      style={{ width: "100%" }}
                      onClick={handleSubmit(UserLogin)}
                    >
                      Connexion
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mt-3  rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-sm   hover:bg-amber-600 sm:mt-0 sm:w-auto"
                      style={{ width: "100%" }}
                      onClick={handleSubmit(UsersignUp)}
                    >
                      S'inscrire
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
