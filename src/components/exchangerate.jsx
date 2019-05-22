import React from 'react'
import config from '../config'



export default class ExchangeRate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			exRate: "",
			error: null,
		}
	}



  getData = () => {

	const apiKey = config.API_KEY

  if (this.props.firstIso !== "" && this.props.secoundIso !== "") {
  let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${this.props.firstIso.label}&to_currency=${this.props.secoundIso.label}&apikey= ${apiKey}`

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            exRate: Object.values(Object.values(result)[0])[4]
          });
        },
        (err) => {
          this.setState({
            error: err
          });
        }
      )
    }
  }

  	componentDidUpdate(prevProps) {
      if (this.props.firstIso !== prevProps.firstIso || this.props.secoundIso !== prevProps.secoundIso) {
        this.getData();
      }
    }

	render() {

		return (
			<div>Real Time Exchange Rate: {this.state.exRate}</div>
		);
	}
}
