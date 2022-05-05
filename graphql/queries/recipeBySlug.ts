import { gql } from '@apollo/client';

export const recipeBySlug = gql`
  query findRecipeBySlug($slug: String!) {
    findRecipeBySlug(slug: $slug) {
      _id,
      _ts,
      title,
      description,
      servings,
      type,
      goodFor,
      time {
        total
      },
      primaryTags {
        data {
          name
          category
          mainRecipes {
            data {
              slug
              title
              publicationType
              author {
                name
              }
            }
          }
        }
      },
      otherTags {
        data {
          name
          category
        }
      },
      ingredients {
        data {
          ingredient {
            name
          }
          quantity
          note
        }
      },
      method {
        instruction
      },
      author {
        name
      }
    }
  }
`;
