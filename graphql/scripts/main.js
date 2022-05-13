import { allTagsAndIngredients, recipeBySlug } from './utils/queries.js';
import { createIngredient, createRecipe } from './utils/mutations.js';

import { execa } from 'execa';
import faunadb from 'faunadb';
import fs from 'fs';
import yaml from 'js-yaml';

const fsPromises = fs.promises;

export const LocalFaunaDbClient = (secret = 'secret') => {
  return new faunadb.Client({
    secret,
    domain: 'localhost',
    port: 8443,
    scheme: 'http',
  });
};

export const importSchemaLocally = async (secret) => {
  return execa(
    'fauna', 
    ['upload-graphql-schema', './graphql/schema.gql', '--mode=replace', `--domain=localhost`, `--graphqlHost=localhost`, `--secret=${secret}`, `--graphqlPort=8084`, `--port=8443`, `--scheme=http`]
  );
};

export const importSchema = async (domain, secret) => {
  return execa(
    'fauna', 
    ['upload-graphql-schema', './graphql/schema.gql', '--mode=replace', `--domain=${domain}`, `--secret=${secret}`]
  );
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

export const readRecipes = async (graphQLClient) => {
  const files = await fsPromises.readdir('./content/recipes/');
  
  return Promise.all(files.map(async (file) => {
    const recipe = yaml.load(fs.readFileSync(`./content/recipes/${file}`, 'utf8'));
    const recipeData = await graphQLClient.request(recipeBySlug, { slug: recipe.slug });

    if(recipeData.findRecipeBySlug) {
      return {
        slug: recipe.slug,
        skip: true
      };
    } else {
      return recipe;
    }
  }));
};

export const retrieveTagsAndIngredients = (graphQLClient) => {
  return graphQLClient.request(allTagsAndIngredients);
}

export const importRecipe = (graphQLClient, data, recipe, authorId) => {
  return graphQLClient.request(
    createRecipe, 
    { 
      ...recipe,
      primaryTags: {
        create: tagsToCreate(data.allTags.data, recipe.primaryTags),
        connect: tagsToConnect(data.allTags.data, recipe.primaryTags),
      },
      otherTags: {
        create: tagsToCreate(data.allTags.data, recipe.otherTags),
        connect: tagsToConnect(data.allTags.data, recipe.otherTags),
      },
      ingredients: {
        create: recipe.ingredients.map(ingredient => {
          const ingredientRow = data.allIngredients.data.find(element => element.name === ingredient.name)
          return {
            ingredient: ingredientRow ? { connect: ingredientRow._id } : { create: { name: ingredient.name } },
            quantity: ingredient.quantity,
            note: ingredient.note
          }
        })
      },
      author: {
        connect: authorId ? authorId : recipe.author
      }
    }
  );
}
