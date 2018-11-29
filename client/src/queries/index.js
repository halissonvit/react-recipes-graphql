import { gql } from "apollo-boost";

// Recipes queries and mutations
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`;

// User queries and mutations
export const GET_CURRENT_USER = gql`
query {
  getCurrentUser {
    _id
    username
    email
    joinDate
  }
}
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

// User queries and mutations
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
