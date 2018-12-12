import React from "react";
import Link from "react-router-dom/Link";
import { Query, Mutation } from "react-apollo";

import {
  DELETE_USER_RECIPE,
  GET_CURRENT_USER,
  GET_ALL_RECIPES,
  GET_USER_RECIPES
} from "../../queries";

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this recipe?"
  );

  if (confirmDelete) {
    deleteUserRecipe().then(({ data }) => {
      console.log(data);
    });
  }
};

const UserRecipes = ({ username }) => {
  console.log({ username });
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        return (
          <div>
            <h3>User Recipes</h3>
            {!data.getUserRecipes.length && (
              <p>
                <strong>You have not created any recipes yet!</strong>
              </p>
            )}
            <ul>
              {data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                  <p>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                  </p>
                  <p style={{ marginBottom: 0 }}>{recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPES },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserRecipe } }) => {
                      const { getUserRecipes } = cache.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            recipe => recipe._id !== deleteUserRecipe._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs = {}) => {
                      return (
                        <p
                          onClick={() => handleDelete(deleteUserRecipe)}
                          className="delete-button"
                        >
                          {attrs.loading ? "deleting..." : "X"}
                        </p>
                      );
                    }}
                  </Mutation>
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
