import React from 'react'
import config from '../../config'



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
      .then(result => {
        this.setState({
          exRate: Object.values(Object.values(result)[0])[4]
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.firstIso !== prevProps.firstIso || this.props.secoundIso !== prevProps.secoundIso) {
      this.getData()
    }
  }

  render() {

    return (
      <div className='ex-rate'>
        <span>Real-time Exchange Rate</span>
        <h4>{this.state.exRate}</h4>
        <div>
          <span className='iso'>{this.props.firstIso.label}</span>
          <img src='https://png.pngtree.com/svg/20161110/e9797c679c.png' alt='wtf' height="42" width="42"/>
          <span className='iso'>{this.props.secoundIso.label}</span>
        </div>
      </div>
    )
  }
}
