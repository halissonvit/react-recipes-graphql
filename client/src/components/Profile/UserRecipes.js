import React from "react";
import Link from "react-router-dom/Link";
import { Query } from "react-apollo";

import { GET_USER_RECIPES } from "../../queries";

const UserRecipes = ({ username }) => {
  console.log({ username })
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        return (
          <div>
            <h3>User Recipes</h3>
            <ul>
              {data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                  <p>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                  </p>
                  <p>{recipe.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
