import { allIngredients, allTags, recipeBySlug } from './utils/queries.js'
import { createIngredient, createRecipe } from './utils/mutations.js'

import { execa } from 'execa';
import fs  from 'fs';
import yaml from 'js-yaml';

export const importSchema = async () => {
    const { stdout } = await execa('fauna', ['upload-graphql-schema', './graphql/schema.gql', '--mode=replace']);

    if(stdout.includes('schema does not pass validation')) {
      console.log(stdout);
    } else {
      console.log(stdout);
    }
};

export const createIngredients = async (graphQLClient) => {
  const ingredientList = yaml.load(fs.readFileSync('./content/ingredients.yml', 'utf8'));

  return await Promise.all(ingredientList.ingredients.map(async ingredient => {
    return await graphQLClient.request(
      createIngredient, 
      ingredient
    );
  }));
};

const tagsToCreate = (allTags, recipeTags) => {
  return recipeTags.map(tag => {
    const tagRow = allTags.find(element => element.name === tag.name)
    if(tagRow) {
      return false;
    } else {
      return tag;
    }
  }).filter(element => element)
};

const tagsToConnect= (allTags, recipeTags) => {
  return recipeTags.map(tag => {
    const tagRow = allTags.find(element => element.name === tag.name)
    if(tagRow) {
      return tagRow._id;
    } else {
      return false;
    }
  }).filter(element => element)
};

export const createRecipes = async (graphQLClient) => {
  fs.readdir('./content/recipes/', async (err, files) => {
    for (let file of files) {
      const ingredientsData = await graphQLClient.request(allIngredients);
      const tagsData = await graphQLClient.request(allTags);
      
      const recipe = yaml.load(fs.readFileSync(`./content/recipes/${file}`, 'utf8'));
      const recipeData = await graphQLClient.request(recipeBySlug, { slug: recipe.slug });

      if(recipeData.findRecipeBySlug) {
        console.log(`Skipping ${recipe.slug}...`);
        continue;
      }

      console.log(`Creating ${recipe.slug}...`);
      
      const input = { 
        ...recipe,
        primaryTags: {
          create: tagsToCreate(tagsData.allTags.data, recipe.primaryTags),
          connect: tagsToConnect(tagsData.allTags.data, recipe.primaryTags),
        },
        otherTags: {
          create: tagsToCreate(tagsData.allTags.data, recipe.otherTags),
          connect: tagsToConnect(tagsData.allTags.data, recipe.otherTags),
        },
        ingredients: {
          create: recipe.ingredients.map(ingredient => {
            const ingredientRow = ingredientsData.allIngredients.data.find(element => element.name === ingredient.name)
            return {
              ingredient: ingredientRow ? { connect: ingredientRow._id } : { create: { name: ingredient.name } },
              quantity: ingredient.quantity,
              note: ingredient.note
            }
          })
        },
        author: {
          connect: recipe.author
        }
      };

      await graphQLClient.request(
        createRecipe, 
        input
      );
    }
  });
};
