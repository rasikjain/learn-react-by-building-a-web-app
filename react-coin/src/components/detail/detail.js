import React, { Component } from "react";
import "./detail.css";
import { handleResponse, renderChangePercent } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "../common/loading";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      currency: {},
      loading: false,
      error: null
    };
  }
  componentDidMount() {
    const currencyId = this.props.match.params.id;
    this.fetchCurrency(currencyId);
  }
  fetchCurrency(currencyId) {
    this.setState({ loading: true });
    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then(currency => {
        this.setState({
          loading: false,
          error: null,
          currency: currency
        });
      })
      .catch(error => {
        //console.log("error", error);
        this.setState({ loading: false, error: error.errorMessage });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const newCurrencyId = nextProps.match.params.id;
      this.fetchCurrency(newCurrencyId);
    }
  }

  render() {
    const { loading, error, currency } = this.state;
    //console.log("currency", currency);

    if (loading)
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );

    if (error) return <div className="error">{error}</div>;
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            24H Change{" "}
            <span className="Detail-value">
              {renderChangePercent(currency.percentChange24h)}
            </span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market Cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total Supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
