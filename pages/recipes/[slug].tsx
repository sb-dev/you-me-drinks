import Blender from "../../public/blender.png";
import Bookmark from "../../public/bookmark.png";
import { FcClock } from "react-icons/fc";
import Footer from "../../components/footer";
import Head from 'next/head'
import Header from '../../components/header'
import Image from "next/image";
import Placeholder from "../../public/sample.png";
import Send from "../../public/send.png";
import ThumbsUp from "../../public/thumbs-up.png";
import Time from "../../public/time.png";
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router';

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


const recipe = {
  title: 'Recovery Margarita',
  pulibactionType: 'recipe',
  description: 'The flavour of a margarita cocktail captured in a delicious recovery drink.',
  author: 'YouMeDrinks',
  tags: [
    'sports', 'recovery', 'smoothie', 'protein', 'after a workout'
  ],
  goodFor: ['recovery', 'after workout'],
  time: {
    total: '2 to 3 minutes'
  },
  servings: 1,
  type: 'smoothie',
  ingredients: [
    '1 cup (140g) ice',
    '1 cup 9240 ml water',
    '1/4 cup (60 ml) fresh lime juice (from 2 limes)',
    '2 tablespoons orange juice',
    '4 dates, pitted',
    '1 scoop protein powder, optional',
    '1 teaspoon coconut oi (OF coconut milk)'
  ],
  method: ['Add all the ingredients to a blender and blend until smooth']
}

const Recipe = () => {
  const router = useRouter()
  const { slug } = router.query

  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' })
  
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
                <span className="uppercase text-[#4B4B4B] text-sm font-['Inter'] mr-1">filed under:</span>
                <ul className="inline-block">
                  {recipe.tags.map(tag => (
                    <li key={tag} className="inline-block m-1 bg-[#ADE6EF] px-1 uppercase text-sm hover:bg-[#ffd12f]">
                      <a href="#">{tag}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="md:flex flex-column">
                <div className="mb-3 md:mr-4">
                  <Image src={Placeholder} alt="placeholder" layout={isMediumScreen ? "fixed" : "responsive"} />
                </div>
                <div>
                  <h1 className="text-5xl mb-3">{recipe.title}</h1>
                  <h2 className="mb-3 text-[#7A7A7B]">{recipe.description}</h2>
                  <h3 className="font-['Inter'] mb-6">by {recipe.author}</h3>
                  <button
                    type="button"
                    className="block w-full mb-4 md:inline-flex md:w-auto mr-4 items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm text-[#385A80] bg-[#FBF9EF] hover:bg-[#F9D154] focus:outline-none"
                  >
                    <span className="mr-1">Save</span>
                    <Image src={Bookmark} width="18" height="18" alt="Bookmark" layout="fixed" />
                  </button>
                  <button
                    type="button"
                    className="block w-full mb-4 md:inline-flex md:w-auto items-center px-2 py-1 border border-[#284D76] text-lg md:text-sm font-medium rounded-sm shadow-sm-red text-[#385A80] bg-[#FBF9EF] hover:bg-[#F9D154] focus:outline-none"
                  >
                    <span className="mr-1">Share</span>
                    <Image src={Send} width="18" height="18" alt="Send" layout="fixed" />
                  </button>
                </div>
              </div>
            </header>
            
            <section className="grid grid-cols-2 gap-4 md:flex items-center max-w-5xl border text-[#284D76] border-[#284D76] shadow-info-box mt-12 md:mt-8 mb-12 p-3.5">
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <Image src={ThumbsUp} width="38" height="38" alt="Thumbs up" layout="fixed"/>
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">Good for:</div>
              </div>
              <div className="flex mr-8">
                {recipe.goodFor.map(
                  (item, index, items) => (<>{item} {((index + 1) !== items.length) && <> &middot; </>}</>)
                )}
              </div>
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <Image src={Time} width="38" height="38" alt="Time" layout="fixed"/>
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">time:</div>
              </div>
              <div className="flex mr-8">
                {recipe.time.total}
              </div>
              <div className="flex items-center">
                <div className="inline-flex mr-2 justify-center">
                  <Image src={Blender} width="38" height="38" alt="Blender" layout="fixed"/>
                </div>
                <div className="inline-flex uppercase mr-4 font-semibold">makes:</div>
              </div>
              <div className="flex">
                {recipe.servings} {recipe.type}
              </div>
            </section>

            <section className="mb-6">
              <h1 className="text-2xl mb-4">Ingredients</h1>
              <ul className="text-base text-[#343434] bullet-list">
                {recipe.ingredients.map(ingredient => (
                    <li className="mb-4 before:text-[#DF6D66]" key={ingredient} >{ingredient}</li>
                  ))}
              </ul>
            </section>
            <section className="mb-6">
              <h1 className="text-2xl mb-4">Method</h1>
              <ol className="text-base text-[#343434] list-decimal pl-5">
                {recipe.method.map(step => (
                    <li className="mb-4" key={step} >{step}</li>
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
    </>
  )
}

export default Recipe
