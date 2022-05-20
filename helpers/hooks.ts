import React from 'react';

const RECIPES_KEY = 'recipes'

export const useLocalRecipes = () => {
  const [recipes, setRecipes] = React.useState(() => {
    if (typeof window === "undefined") {
      return []
    }
    
    const savedRecipes = window.localStorage.getItem('recipes');
    return savedRecipes !== null
      ? JSON.parse(savedRecipes)
      : [];
  })

  React.useEffect(() => {
    window.localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const isRecipeSaved = (recipe: any) => {
    return recipes.filter((savedRecipe: any) => savedRecipe.slug === recipe.slug).length > 0
  }

  const saveRecipe = (recipe: any) => {
    setRecipes(
      [...recipes, recipe]
    )
  }

  const unsaveRecipe = (recipe: any) => {
    setRecipes(
      recipes.filter((savedRecipe: any) => savedRecipe.slug !== recipe.slug)
    )
  }

  return [recipes, isRecipeSaved, saveRecipe, unsaveRecipe];
}