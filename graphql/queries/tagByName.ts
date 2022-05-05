import { gql } from '@apollo/client';

export const tagByName = gql`
  query findTagByName($name: String!) {
    findTagByName(name: $name) {
      _id,
      _ts,
      name,
      description,
      mainRecipes {
        data {
          slug
          title
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
      },
      otherRecipes {
        data {
          slug
          title
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
`;
