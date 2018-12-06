import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ _id, name, likes }) => {
  return (
    <li>
      <h4>
        <Link to={`/recipe/${_id}`}>{name}</Link>
      </h4>
      <p>Likes: {likes}</p>
    </li>
  );
};

export default SearchItem;
