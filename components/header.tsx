import { FcMenu, FcSearch } from "react-icons/fc";

import { AiOutlineClose } from "react-icons/ai";
import BookIcon from "../assets/icons/book-icon";
import { Disclosure } from "@headlessui/react";
import Drinks from "../assets/icons/cocktail-icon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Recipes", href: "#", current: true },
  { name: "How-Tos", href: "#", current: false },
  { name: "Ingredients", href: "#", current: false },
  { name: "Equipment", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const Header = () => {
  const router = useRouter();

  const handleSavedRecipesClick = (e: any) => {
    e.preventDefault();
    router.push("/recipes/saved");
  };

  return (
    <Disclosure
      as="header"
      className="bg-white shadow border-b border-[#284D76]"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="flex relative z-10 px-2 lg:px-0">
                <Link href="/">
                  <a
                    href="#"
                    className="flex-shrink-0 flex items-center text-3xl font-['Londrina_Solid'] space-x-1 text-[#284D76]"
                  >
                    <span className="mr-1 rotate-6">
                      <Drinks height="42px" width="42px" />
                    </span>
                    <span className="rotate-3">you</span>
                    <span className="-rotate-2">me</span>
                    <span className="rotate-3">drinks</span>
                  </a>
                </Link>
              </div>
              <div className="hidden relative z-0 flex-1 px-2 lg:flex items-center justify-center sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  {/* <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative focus-within:shadow-md focus-within:-translate-x-[2px] focus-within:-translate-y-[2px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FcSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div> */}
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-[#284D76] hover:bg-[#F2ECD2] focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <AiOutlineClose
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <FcMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="flex-shrink-0 px-1 pt-[4px]"
                  onClick={handleSavedRecipesClick}
                >
                  <span className="sr-only">View saved recipes</span>
                  <BookIcon height="32" width="32" />
                </button>
              </div>
            </div>
            <nav
              className="hidden h-4 lg:py-2 lg:flex lg:space-x-8"
              aria-label="Global"
            >
              {/* {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-[#F2ECD2]' : 'hover:bg-[#FBF9EF]',
                  'rounded-md text-[#284D76] px-2 inline-flex items-center text-sm font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))} */}
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            {({ close }) => (
              <>
                <div className="pt-2 pb-3 px-2 space-y-1">
                  {/* {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-[#F2ECD2]' : 'hover:bg-[#FBF9EF]',
                  'block rounded-md text-[#284D76] py-2 px-3 text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))} */}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="px-4 flex items-center">
                    <div className="w-full md:max-w-xs">
                      {/* <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative focus-within:shadow-md focus-within:-translate-x-[2px] focus-within:-translate-y-[2px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FcSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div> */}
                    </div>
                  </div>
                  {/* <div className="mt-3 px-4 flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
              <button
                type="button"
                className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div> */}
                  <div className="mt-3 px-2 space-y-1">
                    <button
                      onClick={(event) => {
                        close()
                        handleSavedRecipesClick(event)
                      }}
                      className="flex w-full items-center rounded-md py-2 px-3 text-base font-medium text-[#284D76]  hover:bg-[#FBF9EF]"
                    >
                      <BookIcon
                        height="24"
                        width="24"
                        disableHighlight={true}
                      />
                      <span className="ml-2">View saved recipes</span>
                    </button>
                    {/* {userNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </Disclosure.Button>
              ))} */}
                  </div>
                </div>
              </>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
