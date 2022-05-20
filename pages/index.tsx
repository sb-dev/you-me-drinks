import { useContext, useEffect } from "react";

import { FcLink } from "react-icons/fc";
import Footer from "../components/footer";
import { GraphQLClient } from 'graphql-request';
import Head from "next/head";
import Header from "../components/header";
import Link from 'next/link';
import { NavigationContext } from "../context/navigationContext";
import type { NextPage } from "next";
import RecipeCard from "../components/recipeCard";
import { findTagsByCategory } from '../graphql/queries/tagsByCategory';
import getConfig from 'next/config';
import { tagFullPath } from "../helpers/stringHelpers";

const { serverRuntimeConfig } = getConfig()

const Home: NextPage = ({featuredRecipes, recipesByCategory, otherRecipes}: any) => {
  const navigationContext = useContext(NavigationContext)

  useEffect(() => {
    if(navigationContext){
      navigationContext.setNavigation([])
    }
  }, [])
  
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
                {recipesByCategory.map((category: any) => (
                  <li className="inline-block mr-12 text-lg text-[#2F537A] font-semibold capitalize" key={category.header}>
                    <Link href={tagFullPath(category.header)} >
                      <a className="underline underline-offset-2 hover:no-underline" >{category.header} Recipes</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {featuredRecipes.map((recipe: any) => (
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

        <section className="mt-4 pb-4">
          {recipesByCategory.map((category: any) => (
            <div className="max-w-7xl mx-auto p-4" key={category.name}>
              <header className="mb-7">
                <h1 className="text-2xl mb-1.5 text-[#2F537A]">
                  <Link href={tagFullPath(category.header)} >
                    <a href="#" className="underline underline-offset-2 hover:no-underline capitalize">
                      <FcLink className="inline mr-1" />{category.header} Recipes
                    </a>
                  </Link>
                </h1>
              </header>
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {category.recipes.map((recipe: any) => (
                  <li
                    key={recipe.slug}
                    className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                  >
                    <RecipeCard recipe={recipe} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {otherRecipes.length > 0 && <section className=" bg-white pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header className="mt-2 mb-7">
              <h1 className="text-2xl mb-1.5 text-[#333333]">More recipes</h1>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {otherRecipes.map((recipe: any) => (
                <li
                  key={recipe.slug}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <RecipeCard recipe={recipe} />
                </li>
              ))}
            </ul>
          </div>
        </section>}
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient(serverRuntimeConfig.graphqlEndpoint, {
    headers: {
      authorization: `Bearer ${serverRuntimeConfig.graphqlKey}`,
    },
  })
  
  const recipeData = await graphQLClient.request(findTagsByCategory, { category: 'type'})

  const categories = recipeData.findTagsByCategory.data.map((tag: any) => {
    return {
      header: tag.name,
      recipes: tag.mainRecipes.data
    }
  })

  const allRecipes = categories.reduce((acc: any, category: any) => {
    return [...acc, ...category.recipes]
  }, [])

  const recipesByCategory = categories.map((category: any) => {
    return {
      ...category,
      recipes: category.recipes.slice(0, category.recipes.length < 4 ? category.recipes.length : 4)
    }
  })

  const otherRecipes = categories.reduce((acc: any, category: any) => {
    const other = category.recipes.length > 4 ? category.recipes.slice(3, category.recipes.length) : []
    return [...acc, ...other]
  }, [])

  return { 
    props: {
      featuredRecipes: allRecipes.slice(0, allRecipes.length < 4 ? allRecipes.length : 4),
      recipesByCategory: recipesByCategory,
      otherRecipes: otherRecipes
    }
  };
}

export default Home;
