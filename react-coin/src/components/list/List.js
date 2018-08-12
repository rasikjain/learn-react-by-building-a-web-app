import React, { Component } from "react";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import "./Table.css";
import Loading from "../common/loading";
import Table from "./table.js";

class List extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      totalPages: 0,
      page: 1,
      error: null
    };
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>;
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>;
    } else {
      return <span>{percent}%</span>;
    }
  }

  render() {
    console.log(this.state);
    const { loading, error, currencies } = this.state;

    if (loading) {
      return (
        <div className="Loading-container">
          <Loading />
        </div>
      );
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <Table
        currencies={currencies}
        renderChangePercent={this.renderChangePercent}
      />
    );
  }

  componentWillMount() {
    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
      .then(handleResponse)
      .then(data => {
        this.setState({ currencies: data.currencies, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  }
}

export default List;
