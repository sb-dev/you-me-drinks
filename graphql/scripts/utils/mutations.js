import { gql } from 'graphql-request';

export const createAdminUser = gql`
  mutation CreateAdminUser($email: String!, $name: String!, $password: String!) {
    createUser(input: {
      email: $email,
      name: $name,
      password: $password,
      role: ADMIN
    }) {
      _id
    }
  }
`

export const createIngredient = gql`
  mutation CreateIngredient($name: String!) {
    createIngredient(data: {
      name: $name
    }) {
      _id
    }
  }
`

export const createRecipe = gql`
    mutation CreateRecipe(
      $slug: String!, 
      $title: String!, 
      $publicationType: PublicationType!, 
      $description: String!, 
      $primaryTags: RecipePrimaryTagsRelation, 
      $otherTags: RecipeOtherTagsRelation, 
      $goodFor: String!, 
      $time: TimesInput!, 
      $servings: String!, 
      $type: String!,
      $ingredients: RecipeIngredientsRelation,
      $method: [MethodInput!],
      $author: RecipeAuthorRelation
    ) {
        createRecipe(data: {
            slug: $slug,
            title: $title,
            publicationType: $publicationType,
            description: $description,
            primaryTags: $primaryTags,
            otherTags: $otherTags,
            goodFor: $goodFor,
            time: $time,
            servings: $servings,
            type: $type,
            ingredients: $ingredients,
            method: $method,
            author: $author
        }) {
            _id,
            _ts,
            slug
        }
    }
`;
