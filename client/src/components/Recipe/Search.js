import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";

import SearchItem from "./SearchItem";
import { SEARCH_RECIPES } from "../../queries";

/*
      <Query query={SEARCH_RECIPES} variables={{ searchTerm: "" }}>
        {({ data, loading, error }) => {
          if (loading) return <div>loading...</div>;
          if (error) return <div>error</div>;
        }}
      </Query>

*/

class Search extends Component {
  state = {
    searchResults: []
  };

  handleChange = ({ searchRecipes: searchResults }) => {
    this.setState({ searchResults });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                name="search"
                id="q"
                placeholder="Search for recipes"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_RECIPES,
                    variables: { searchTerm: event.target.value }
                  });
                  this.handleChange(data);
                }}
              />
              <ul>
                {searchResults.map(recipe => (
                  <SearchItem key={recipe._id} {...recipe} />
                ))}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
