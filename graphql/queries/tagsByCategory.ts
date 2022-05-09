import { gql } from '@apollo/client';

export const findTagsByCategory = gql`
  query findTagsByCategory($category: String!) {
    findTagsByCategory(category: $category) {
      data {
        _id,
        _ts,
        name,
        mainRecipes {
          data {
            slug
            title
            type
            publicationType
            primaryTags {
              data {
                name
                category
              }
            }
            author {
              name
            }
          }
        }
      }
    }
  }
`;
