import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import { GET_RECIPE } from "../../queries";

const RecipePage = ({ _id }) => {
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.description}</p>
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created by: {data.getRecipe.username}</p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

const RoutedRecipePage = ({ match }) => {
  const { _id } = match.params;
  console.log({ _id });

  return <RecipePage _id={_id} />;
};

export default withRouter(RoutedRecipePage);
