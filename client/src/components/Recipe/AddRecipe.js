import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Error from "../Error";
import withAuth from "../withAuth";
import {
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
  GET_USER_RECIPES
} from "../../queries";

const initialState = {
  name: "",
  instructions: "",
  category: "Breakfast",
  description: "",
  username: ""
};

class AddRecipe extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.clearState();
      this.props.history.push("/");
    });
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  validateForm = () => {
    const { name, category, instructions, description, username } = this.state;
    return name && category && instructions && description && username;
  };

  componentDidMount() {
    this.setState({ username: this.props.session.getCurrentUser.username });
  }

  render() {
    const { name, category, instructions, description, username } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, instructions, description, username }}
        refetchQueries={() => [
          { query: GET_ALL_RECIPES },
          { query: GET_CURRENT_USER },
          { query: GET_USER_RECIPES, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2>Add Recipe</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe name"
                  onChange={this.handleChange}
                  value={name}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <textarea
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  placeholder="Add description"
                  value={description}
                />
                <textarea
                  type="text"
                  name="instructions"
                  onChange={this.handleChange}
                  placeholder="Add instructions"
                  value={instructions}
                />
                <button
                  disabled={loading || !this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
