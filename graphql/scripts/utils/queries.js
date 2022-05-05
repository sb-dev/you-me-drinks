import { gql } from 'graphql-request';

/*
 * 1 - Recipes
 * 2 - Ingredients
 * 3 - Tags
 */


// Recipes

export const allRecipes = gql`
  query AllRecipes {
    allRecipes {
      data {
        slug,
        author {
          email
          name
        }
      }
    }
  }
`;

export const recipeBySlug = gql`
  query findRecipeBySlug($slug: String!) {
    findRecipeBySlug(slug: $slug) {
      _id
    }
  }
`;

// Ingredients

export const allIngredients = gql`
  query AllIngredients {
    allIngredients {
      data {
        _id
        name
      }
    }
  }
`;

// Tags

export const allTags = gql`
  query AllTags{
    allTags {
      data {
        _id
        name
        category
      }
    }
  }
`;

export const tagById = gql`
  query findTagByID($id: ID!) {
    findTagByID(id: $id) {
      data {
        name,
        recipes {
          date {
            title
          }
        }
      }
    }
  }
`;
