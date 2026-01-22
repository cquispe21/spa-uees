import { Link } from "react-router-dom";

interface ContentnavProps {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  OpenMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  OpenMenuMobile: boolean;
  setOpenMenuMobile: (value: boolean) => void;
}
function Contentnav({ isHovered, OpenMenu, OpenMenuMobile }: ContentnavProps) {
  return (
    <>
      <nav className="mt-6">
        <button
          type="button"
          className={`group w-full rounded-md bg-gray-100  ${
            OpenMenu ? "p-0" : "p-0"
          } text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100`}
          id="options-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="flex w-full items-center justify-between">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 p-1.5 w-10 flex-shrink-0 rounded-full dark:text-white dark:group-hover:text-black "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </span>
          </span>
        </button>
        <ul className="space-y-1">
          <>
            <Link to="/">
              <li
                className={` group flex hover:bg-gray-200 hover:text-gray-900  text-gray-300 items-center rounded-md  px-2 py-2 text-sm font-medium  peer-checked:bg-slate-900 
                       `}
              >
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0  my-auto dark:group-hover:text-black group-hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>

                {(isHovered && !OpenMenu) || OpenMenu || OpenMenuMobile ? (
                  <p className=" dark:group-hover:text-black group-hover:text-black">
                    Inicio
                  </p>
                ) : (
                  <></>
                )}
              </li>
            </Link>

            <Link to="/galeria">
              <li
                className={` group flex hover:bg-gray-200 hover:text-gray-900  text-gray-300 items-center rounded-md  px-2 py-2 text-sm font-medium  peer-checked:bg-slate-900 
                       `}
              >
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0  my-auto dark:group-hover:text-black group-hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                  <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                </svg>
                {(isHovered && !OpenMenu) || OpenMenu || OpenMenuMobile ? (
                  <p className=" dark:group-hover:text-black group-hover:text-black">
                    Galeria
                  </p>
                ) : (
                  <></>
                )}
              </li>
            </Link>

            <Link to="/nosotros">
              <li
                className={` group flex hover:bg-gray-200 hover:text-gray-900  text-gray-300 items-center rounded-md  px-2 py-2 text-sm font-medium  peer-checked:bg-slate-900 
                       `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-3 h-6 w-6 flex-shrink-0  my-auto dark:group-hover:text-black group-hover:text-black"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  <path d="M15 7a2 2 0 0 1 2 2" />
                  <path d="M15 3a6 6 0 0 1 6 6" />
                </svg>


                {(isHovered && !OpenMenu) || OpenMenu || OpenMenuMobile ? (
                  <p className=" dark:group-hover:text-black group-hover:text-black">
                    Nosotros
                  </p>
                ) : (
                  <></>
                )}
              </li>
            </Link>

            <Link to="/contacto">
              <li
                className={` group flex hover:bg-gray-200 hover:text-gray-900  text-gray-300 items-center rounded-md  px-2 py-2 text-sm font-medium  peer-checked:bg-slate-900 
                       `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                                   className="mr-3 h-6 w-6 flex-shrink-0  my-auto dark:group-hover:text-black group-hover:text-black"

                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                </svg>

             
                {(isHovered && !OpenMenu) || OpenMenu || OpenMenuMobile ? (
                  <p className=" dark:group-hover:text-black group-hover:text-black">
                    Contacto
                  </p>
                ) : (
                  <></>
                )}
              </li>
            </Link>
          </>
        </ul>

        {/* <Usuario
          isHovered={props.isHovered}
          setIsHovered={props.setIsHovered}
          OpenMenu={props.OpenMenu}
          setOpenMenu={props.setOpenMenu}
          OpenMenuMobile={props.OpenMenuMobile}
          setOpenMenuMobile={props.setOpenMenuMobile}
        /> */}
      </nav>
    </>
  );
}

export default Contentnav;
