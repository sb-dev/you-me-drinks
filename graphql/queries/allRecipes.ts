import { gql } from '@apollo/client';

export const allRecipesQuery = gql`
  query AllRecipes {
    allRecipes {
      data {
        slug
      }
    }
    allTags {
      data {
        name
        category
      }
    }
  }
`;
