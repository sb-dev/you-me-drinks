import { GetStaticPaths, GetStaticProps } from 'next/types';
import { RECIPE_PAGE, TAG_PAGE, tagNameFromPath, tagPath } from '../../helpers/stringHelpers';

import { GraphQLClient } from 'graphql-request';
import RecipePage from '../../components/recipePage';
import RecipesPage from '../../components/recipesPage';
import { allRecipesQuery } from '../../graphql/queries/allRecipes';
import getConfig from 'next/config';
import { recipeBySlug } from '../../graphql/queries/recipeBySlug';
import { tagByName } from '../../graphql/queries/tagByName';
import { useRouter } from 'next/router';

const { serverRuntimeConfig } = getConfig()

const Recipe = (page: any) => {
  const router = useRouter()
  const { slug } = router.query
  
  if(page.pageType === RECIPE_PAGE) {
    return (
      <RecipePage recipe={page.recipe} relatedRecipes={page.relatedRecipes} />
    )
  } else if(page.pageType === TAG_PAGE) {
    return (
      <RecipesPage header={`${page.tagName} Recipes`} path={tagPath(page.tagName)} description={page.tagDescription} recipes={page.recipes} />
    )
  } else {
    return (<h1>Dude, Where is My Car?</h1>)
  }
  
}

export const getStaticPaths: GetStaticPaths = async () => {
  const graphQLClient = new GraphQLClient(serverRuntimeConfig.graphqlEndpoint, {
    headers: {
      authorization: `Bearer ${serverRuntimeConfig.graphqlKey}`,
    },
  })

  const {allRecipes, allTags} = await graphQLClient.request(allRecipesQuery)

  const recipePaths = allRecipes.data.map((recipe: any) => ({
    params: { slug: recipe.slug }
  }))

  const tagPaths = allTags.data.map((tag: any) => ({
    params: { slug: tagPath(tag.name)}
  }))

  return { paths: [...recipePaths, ...tagPaths], fallback: false }
}

export const getStaticProps = async ({ params }: any) => {
  const graphQLClient = new GraphQLClient(serverRuntimeConfig.graphqlEndpoint, {
    headers: {
      authorization: `Bearer ${serverRuntimeConfig.graphqlKey}`,
    },
  })
  
  const recipeData = await graphQLClient.request(recipeBySlug, params)
  const tagData = await graphQLClient.request(tagByName, {name: tagNameFromPath(params.slug)})

  if (recipeData.findRecipeBySlug) {
    const relatedRecipes = recipeData.findRecipeBySlug.primaryTags.data.reduce((previousValue: any, currentValue: any) => {
      const recipes = currentValue.mainRecipes.data.reduce((previousValue: any, currentValue: any) => {
        return {
          ...previousValue,
          [currentValue.slug]: currentValue
        }
      }, {})
  
      return {
        ...previousValue,
        ...recipes
      }
    }, {})

    return { 
      props: {
        pageType: RECIPE_PAGE,
        recipe: recipeData.findRecipeBySlug, 
        relatedRecipes: Object.values(relatedRecipes).filter(
          (relatedRecipe: any) => params.slug !== relatedRecipe.slug
        ) 
      }
    }
  } else if(tagData.findTagByName) {
    return { 
      props: {
        pageType: TAG_PAGE,
        tagName: tagData.findTagByName.name,
        tagDescription: tagData.findTagByName.description,
        recipes: [...tagData.findTagByName.mainRecipes.data, ...tagData.findTagByName.otherRecipes.data]
      }
    }
  }
}

export default Recipe
