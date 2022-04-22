import { FcLink } from "react-icons/fc";
import Footer from "../components/footer";
import Head from "next/head";
import Header from "../components/header";
import Image from "next/image";
import type { NextPage } from "next";
import Placeholder from "../public/sample.png";

const people = [
  {
    name: "Recovery margarita",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

const categories = [
  "Recipes By occasion",
  "Recipes By ingredient",
  "Recipes By method",
  "Recipes By region",
  "Holidays & Season",
]

const Home: NextPage = () => {
  return (
    <div className="bg-[#FBF9EF]">
      <Head>
        <title>YouMeDrinks</title>
      </Head>

      <Header />

      <main>
        <section className="mt-4 bg-white border-b border-[#284D76] pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header className="my-7">
              <h1 className="text-5xl mb-1.5 text-[#333333]">Recipes</h1>
              <p className="text-base mb-7 text-[#494949]">Original recipes, tested, tasted, and approved by YouMeDrinks.</p>
              <ul className="grid md:block space-y-4 md:space-y-0">
                {categories.map((category) => (
                  <li className="inline-block mr-12 text-lg text-[#2F537A] font-semibold" key={category}>
                    <a href="#" className="underline underline-offset-2 hover:no-underline" >{category}</a>
                  </li>
                ))}
              </ul>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {people.map((person) => (
                <li
                  key={person.email}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <a href="#" className="flex flex-col">
                    <Image src={Placeholder} alt="placeholder"/>
                    <div className="p-4 flex-col space-y-2">
                      <span className="flex text-sm uppercase text-[#387F90]">recipe</span>
                      <span className="flex text-xl text-[#333333] leading-6 group-hover:underline decoration-[#58B4C3] decoration-[3px]">Recovery margarita</span>
                      <span className="flex text-sm text-[#333333]">By YouMeDrinks</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-4 pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header className="mb-7">
              <h1 className="text-2xl mb-1.5 text-[#2F537A]">
                <a href="#" className="underline underline-offset-2 hover:no-underline"><FcLink className="inline mr-1" />Recipes</a>
                </h1>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {people.map((person) => (
                <li
                  key={person.email}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <a href="#" className="flex flex-col">
                    <Image src={Placeholder} alt="placeholder"/>
                    <div className="p-4 flex-col space-y-2">
                      <span className="flex text-sm uppercase text-[#387F90]">recipe</span>
                      <span className="flex text-xl text-[#333333] leading-6 group-hover:underline decoration-[#58B4C3] decoration-[3px]">Recovery margarita</span>
                      <span className="flex text-sm text-[#333333]">By YouMeDrinks</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-7xl mx-auto p-4">
            <header className="mb-7">
              <h1 className="text-2xl mb-1.5 text-[#2F537A]">
                <a href="#" className="underline underline-offset-2 hover:no-underline"><FcLink className="inline mr-1" />Recipes</a>
                </h1>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {people.map((person) => (
                <li
                  key={person.email}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <a href="#" className="flex flex-col">
                    <Image src={Placeholder} alt="placeholder"/>
                    <div className="p-4 flex-col space-y-2">
                      <span className="flex text-sm uppercase text-[#387F90]">recipe</span>
                      <span className="flex text-xl text-[#333333] leading-6 group-hover:underline decoration-[#58B4C3] decoration-[3px]">Recovery margarita</span>
                      <span className="flex text-sm text-[#333333]">By YouMeDrinks</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className=" bg-white pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header className="mt-2 mb-7">
              <h1 className="text-2xl mb-1.5 text-[#333333]">More recipes</h1>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {people.map((person) => (
                <li
                  key={person.email}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <a href="#" className="flex flex-col">
                    <Image src={Placeholder} alt="placeholder"/>
                    <div className="p-4 flex-col space-y-2">
                      <span className="flex text-sm uppercase text-[#387F90]">recipe</span>
                      <span className="flex text-xl text-[#333333] leading-6 group-hover:underline decoration-[#58B4C3] decoration-[3px]">Recovery margarita</span>
                      <span className="flex text-sm text-[#333333]">By YouMeDrinks</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
