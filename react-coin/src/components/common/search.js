import React, { Component } from "react";
import "./search.css";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: ""
    };
  }
  handleOnChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
    console.log(this.state);

    if (!inputValue) return "";

    fetch(`${API_URL}/autocomplete?searchQuery=${inputValue}`)
      .then(handleResponse)
      .then(result => {
        console.log(result);
      });
  };
  render() {
    return (
      <form>
        <input type="text" name="searchQuery" onChange={this.handleOnChange} />
      </form>
    );
  }
}

export default Search;
