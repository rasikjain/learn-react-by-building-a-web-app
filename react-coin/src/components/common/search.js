import React, { Component } from "react";
import "./search.css";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "./loading";
import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      searchResults: [],
      loading: false
    };
  }

  handleRedirect = currencyId => {
    this.setState({ searchQuery: "", searchResults: [] });
    this.props.history.push(`/currency/${currencyId}`);
  };

  handleOnChange = event => {
    const inputName = event.target.name;
    const searchQuery = event.target.value;
    this.setState({ [inputName]: searchQuery });
    //console.log(this.state);

    //console.log("input", searchQuery);
    if (!searchQuery) return "";

    this.setState({ loading: true });
    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(result => {
        this.setState({ loading: false, searchResults: result });
      });
  };

  renderSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) return "";
    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No results found</div>
        </div>
      );
    }
  }
  render() {
    const { loading, searchQuery } = this.state;

    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          name="searchQuery"
          placeholder="Currency Name"
          onChange={this.handleOnChange}
          value={searchQuery}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}

        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
