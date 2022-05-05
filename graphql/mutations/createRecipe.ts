import { gql } from '@apollo/client';

export const createRecipeQuery = gql`
    mutation CreateRecipe($slug: String!, $title: String!) {
        createRecipe(data: {
            slug: $slug,
            title: $title
        }) {
            _id,
            _ts,
            slug,
            title
        }
    }
`;
