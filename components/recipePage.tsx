import { useEffect, useState } from 'react';

import Blender from "../public/blender.png";
import Bookmark from "../public/bookmark.png";
import Footer from "./footer";
import Head from 'next/head';
import Header from './header';
import Image from "next/image";
import Link from 'next/link';
import Send from "../public/send.png";
import SmoothiePlaceholder from "../public/smoothie-placeholder.png";
import ThumbsUp from "../public/thumbs-up.png";
import Time from "../public/time.png";
import { tagFullPath } from '../helpers/navigationHelpers';
import { useMediaQuery } from 'react-responsive';

type ImageLayout = "fixed" | "fill" | "intrinsic" | "responsive" | "raw" | undefined

const RecipePage = ({ recipe, relatedRecipes }: any) => {
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' })
  const [imageLayout, setImageLayout] = useState<ImageLayout>('fixed')

  useEffect(() => {
    setImageLayout(isMediumScreen ? "fixed" : "responsive")
  }, [isMediumScreen])
  return (
    <>
      <Head>
        <title>{recipe.title} | YouMeDrinks</title>
      </Head>
      <Header />
      <main>
        <section className="mt-4 bg-white border-b border-[#284D76] pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header>
              <nav className="my-6">
                <span className="uppercase text-[#4B4B4B] text-sm font-['Inter'] mr-1">
                  filed under:
                </span>
                <ul className="inline-block">
                  {[...recipe.primaryTags.data, ...recipe.otherTags.data].map(
                    (tag: any) => (
                      <li
                        key={tag.name}
                        className="inline-block m-1 bg-[#ADE6EF] px-1 uppercase text-sm hover:bg-[#ffd12f]"
                      >
                        <Link href={tagFullPath(tag.name)}>
                          <a>{tag.name}</a>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
              <div className="md:flex flex-column">
                <div className="mb-3 md:mr-4">
                  <Image
                    src={SmoothiePlaceholder}
                    alt="placeholder"
                    layout={imageLayout}
                    priority={true}
                  />
                </div>
                <div>
                  <h1 className="text-5xl mb-3 capitalize">{recipe.title}</h1>
                  <h2 className="mb-3 text-[#7A7A7B]">{recipe.description}</h2>
                  <h3 className="font-['Inter'] mb-6">by {recipe.author.name}</h3>
                  <button
                    type="button"
                    className="block w-full mb-4 md:inline-flex md:w-auto mr-4 items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm text-[#385A80] bg-[#FBF9EF] hover:bg-[#F9D154] focus:outline-none"
                  >
                    <span className="mr-1">Save</span>
                    <Image
                      src={Bookmark}
                      width="18"
                      height="18"
                      alt="Bookmark"
                      layout="fixed"
                    />
                  </button>
                  <button
                    type="button"
                    className="block w-full mb-4 md:inline-flex md:w-auto items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm-red text-[#385A80] bg-[#FBF9EF] hover:bg-[#F9D154] focus:outline-none"
                  >
                    <span className="mr-1">Share</span>
                    <Image
                      src={Send}
                      width="18"
                      height="18"
                      alt="Send"
                      layout="fixed"
                    />
                  </button>
                </div>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-4 md:flex items-center max-w-5xl border text-[#284D76] border-[#284D76] shadow-info-box mt-12 md:mt-8 mb-12 p-3.5">
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <Image
                    src={ThumbsUp}
                    width="38"
                    height="38"
                    alt="Thumbs up"
                    layout="fixed"
                  />
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">
                  Good for:
                </div>
              </div>
              <div className="flex mr-8">{recipe.goodFor}</div>
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <Image
                    src={Time}
                    width="38"
                    height="38"
                    alt="Time"
                    layout="fixed"
                  />
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">
                  time:
                </div>
              </div>
              <div className="flex mr-8">{recipe.time.total}</div>
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <Image
                    src={Blender}
                    width="38"
                    height="38"
                    alt="Blender"
                    layout="fixed"
                  />
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">
                  makes:
                </div>
              </div>
              <div className="flex">
                {recipe.servings} {recipe.type}
              </div>
            </section>

            <section className="my-12">
              <h1 className="text-2xl mb-4">Ingredients</h1>
              <ul className="text-base text-[#404040] bullet-list">
                {recipe.ingredients.data.map((recipeIngredient: any) => (
                  <li
                    className="mb-4 before:text-[#DF6D66]"
                    key={recipeIngredient.ingredient.name}
                  >
                    {recipeIngredient.quantity} {recipeIngredient.ingredient.name}
                    {recipeIngredient.note}
                  </li>
                ))}
              </ul>
            </section>

            <section className="my-12">
              <h1 className="text-2xl mb-4">Method</h1>
              <ol className="text-base text-[#343434] list-decimal pl-5">
                {recipe.method.map((step: any) => (
                  <li className="mb-4" key={step.instruction}>
                    {step.instruction}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </section>

        <section className=" pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header className="mt-2 mb-7">
              <h1 className="text-2xl mb-1.5 text-[#333333]">More recipes</h1>
            </header>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {relatedRecipes.map((recipe: any) => (
                <li
                  key={recipe.slug}
                  className="group col-span-1 bg-white divide-gray-200 border border-[#B7B7B7] hover:shadow-l hover:-translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <Link href={`/recipes/${recipe.slug}`}>
                    <a className="flex flex-col">
                      <Image src={SmoothiePlaceholder} alt="placeholder" />
                      <div className="p-4 flex-col space-y-2">
                        <span className="flex text-sm uppercase text-[#387F90]">
                          {recipe.publicationType}
                        </span>
                        <span className="flex text-xl text-[#333333] leading-6 group-hover:underline decoration-[#58B4C3] decoration-[3px]">
                          {recipe.title}
                        </span>
                        <span className="flex text-sm text-[#333333]">
                          By {recipe.author.name}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default RecipePage;
