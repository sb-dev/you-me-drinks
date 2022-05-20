import { useContext, useEffect } from "react";

import Footer from "../components/footer";
import Head from "next/head";
import Header from "../components/header";
import { NavigationContext } from "../context/navigationContext";
import RecipeCard from "./recipeCard";

const defaultDescription = 'Original recipes, tested, tasted, and approved by YouMeDrinks.'

const RecipesPage = ({header, path, description, recipes}: any) => {
  const navigationContext = useContext(NavigationContext)

  useEffect(() => {
    if(navigationContext){
      navigationContext.setNavigation([{
        name: header, href: path, current: false
      }])
    }
  }, [])
  
  return (
  <div className="bg-[#FBF9EF]">
      <Head>
        <title>YouMeDrinks</title>
      </Head>

      <Header />

      <main>
        <section className="mt-4 bg-white pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header className="my-7">
              <h1 className="text-5xl mb-1.5 text-[#333333] capitalize">{header}</h1>
              <p className="text-base mb-7 text-[#494949]">{description ? description : defaultDescription}</p>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {recipes.map((recipe: any) => (
                <li
                  key={recipe.slug}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <RecipeCard recipe={recipe} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
)}

export default RecipesPage;
