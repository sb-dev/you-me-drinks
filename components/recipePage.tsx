import { Slide, toast } from 'react-toastify'
import { capitalise, tagFullPath } from '../helpers/stringHelpers';
import { useContext, useEffect, useState } from 'react';

import Badge from "../assets/icons/badge-icon";
import BookmarkIcon from "../assets/icons/bookmark-icon";
import Breadcrumb from './breadcrumb';
import Footer from "./footer";
import Head from 'next/head';
import Header from './header';
import Image from "next/image";
import ImagePlaceholder from "../assets/image-placeholders/image-placeholder";
import Link from 'next/link';
import LinkIcon from '../assets/icons/link-icon';
import MethodIcon from "../assets/icons/method-icon";
import { NavigationContext } from '../context/navigationContext';
import RecipeCard from './recipeCard';
import SendIcon from "../assets/icons/send-icon";
import ThumbsUpIcon from "../assets/icons/thumbs-up-icon";
import TimeIcon from "../assets/icons/time-icon";
import getConfig from 'next/config';
import { useLocalRecipes } from '../helpers/hooks';
import { useMediaQuery } from 'react-responsive';
import { usePlausible } from 'next-plausible';

type ImageLayout = "fixed" | "fill" | "intrinsic" | "responsive" | "raw" | undefined

const { publicRuntimeConfig } = getConfig()

const ShareRecipeButton = ({ onClick }: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const buttonContent = () => {
    if (typeof window !== "undefined" && window.navigator.share) {
      return (
        <>
          <span className="mr-1">Share Recipe</span>
          <SendIcon
            width="18"
            height="18"
          />
        </>
      )
    } else {
      return (
        <>
          <span className="mr-1">Copy Recipe Link</span>
          <LinkIcon
                width="18"
                height="18"
          />
        </>
      )
    }
  }
  
  return (
  <button
    type="button"
    onClick={onClick}
    className="relative overflow-hidden block w-full mb-4 md:inline-flex md:w-auto items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm-red text-[#385A80] bg-[#FBF9EF] focus:outline-none"
  >
    {buttonContent()}
  </button>
  )
}

const SaveRecipeButton = ({ onClick, isActive}: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  
  return (
    <button
      type="button"
      onClick={() => onClick(isActive)}
      className={`${isActive ? 'active': ''} relative overflow-hidden block w-full mb-4 md:inline-flex md:w-auto mr-4 items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm text-[#385A80] bg-[#FBF9EF] focus:outline-none`}
    >
      <span className="relative mr-1 z-20">{isActive ? 'Saved': 'Save'}</span>
      <BookmarkIcon className="relative z-20" width="18" height="18" />
    </button>
  )
}

const RecipePage = ({ recipe, relatedRecipes }: any) => {
  const navigationContext = useContext(NavigationContext)
  const [recipes, isRecipeSaved, saveRecipe, unsaveRecipe] = useLocalRecipes()
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' })
  const [imageLayout, setImageLayout] = useState<ImageLayout>('fixed')
  const plausible = usePlausible()

  useEffect(() => {
    setImageLayout(isMediumScreen ? "fixed" : "responsive")
  }, [isMediumScreen])

  const handleRecipeSave = (isActive: boolean) => {
    if(isActive) {
      unsaveRecipe(recipe)
    } else {
      saveRecipe(recipe)
    }
  }

  const handleRecipeShare = async () => {
    if (typeof window !== "undefined" && window.navigator.share) {
      const data = {
        title: capitalise(recipe.title),
        text: recipe.description,
        url: `${publicRuntimeConfig.host}/recipes/${recipe.slug}`
      }

      await navigator.share(data)

      plausible('recipe:shared-via-navigator', {
        props: {
          ref: recipe.slug,
        },
      })
    } else {
      if(navigator.clipboard) {
        await navigator.clipboard.writeText(`${publicRuntimeConfig.host}/recipes/${recipe.slug}`);
        toast("Link copied !", {
          position: toast.POSITION.TOP_CENTER,
          toastId: recipe.slug,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        });

        plausible('recipe:shared-via-clipboard', {
          props: {
            ref: recipe.slug,
          },
        })
      }
    }
  }

  const handleRecipeMade = () => {
    plausible('recipe:made', {
      props: {
        ref: recipe.slug,
      },
    })
  }

  const navigation = navigationContext?.navigation && navigationContext?.navigation.length > 0 ? navigationContext.navigation : [{ name: 'Recipes', href: '/', current: false }]
  
  return (
    <>
      <Head>
        <title>{capitalise(recipe.title)} | YouMeDrinks</title>
      </Head>
      <Header />
      <main>
        <section className="mt-4 bg-white border-b border-[#284D76] pb-4">
          <div className="max-w-7xl mx-auto p-4">
            <header>
              <Breadcrumb pages={[...navigation, { name: recipe.title, href: '#', current: true }]} />
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
                  <div className="md:h-[250px] md:w-[375px]">
                    <ImagePlaceholder type={recipe.type} width="100%" height="100%"/>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl mb-3 capitalize">{recipe.title}</h1>
                  <h2 className="mb-3 text-[#7A7A7B]">{recipe.description}</h2>
                  <h3 className="font-['Inter'] mb-6">by {recipe.author.name}</h3>
                  <SaveRecipeButton onClick={handleRecipeSave} isActive={isRecipeSaved(recipe)} />
                  <ShareRecipeButton onClick={handleRecipeShare} />
                </div>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-4 md:flex items-center max-w-5xl border text-[#284D76] border-[#284D76] shadow-info-box mt-12 md:mt-8 mb-12 p-3.5">
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <ThumbsUpIcon width="38" height="38" />
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">
                  Good for:
                </div>
              </div>
              <div className="flex mr-8">{recipe.goodFor}</div>
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <TimeIcon width="38" height="38" />
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">
                  time:
                </div>
              </div>
              <div className="flex mr-8">{recipe.time.total}</div>
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <MethodIcon type={recipe.type} width="38" height="38" />
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">
                  makes:
                </div>
              </div>
              <div className="flex">
                {recipe.servings} {recipe.type}(s)
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
                    {capitalise(recipeIngredient.quantity)} {recipeIngredient.ingredient.name}
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
              <button
                type="button"
                onClick={handleRecipeMade}
                className="relative overflow-hidden block w-full mt-6 md:inline-flex md:w-auto items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm-red text-[#385A80] bg-[#FBF9EF] focus:outline-none"
              >
                <span className="mr-1">I made it</span>
                <Badge
                  width="22"
                  height="22"
                />
              </button>
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
                  <RecipeCard recipe={recipe} />
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
