import React, { Component } from "react";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import "./Table.css";
import Loading from "../common/loading";
import Table from "./table.js";
import Pagination from "./pagination";

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
  handlePaginationClick = direction => {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  };

  fetchCurrencies() {
    this.setState({ loading: true });
    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          currencies: data.currencies,
          loading: false,
          totalPages: data.totalPages
        });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  }
  render() {
    console.log(this.state);
    const { loading, error, currencies, page, totalPages } = this.state;

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
      <div>
        <Table
          currencies={currencies}
          renderChangePercent={this.renderChangePercent}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }

  componentWillMount() {
    this.fetchCurrencies();
  }
}

export default List;
