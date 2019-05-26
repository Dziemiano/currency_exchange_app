import React from 'react';
import config from '../../config'
import Chart from 'react-google-charts';

export default class ChartComp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dateRange: 0,
			years: 0,
			hideChart: true,
			intradayData: [],
			dailyData: [],
			intradayError: [],
			dailyError: [],
		}
	}

	getData = () => {
		const apiKey = config.API_KEY

		if (this.props.firstIso !== '' && this.props.secoundIso !== '') {

			const url = "https://www.alphavantage.co/query?function="

			const intradayUrl = `${url}FX_INTRADAY&from_symbol=${this.props.firstIso.label}&to_symbol=${this.props.secoundIso.label}&interval=30min&outputsize=full&apikey= ${apiKey}`

			const dailyUrl = `${url}FX_DAILY&from_symbol=${this.props.firstIso.label}&to_symbol=${this.props.secoundIso.label}&outputsize=full&apikey= ${apiKey}`


			const firstPromise = 
			fetch(intradayUrl)
			.then(res => res.json())

			const secoundPromise = 
			fetch(dailyUrl)
			.then(res => res.json())


			Promise.all([firstPromise, secoundPromise])
			.then(
				([data1, data2]) => {
					console.log(Object.keys(data1))
					console.log(data2)
					this.setState({
						intradayData: data1,
						intradayError: Object.keys(data1)[0],
						dailyData: data2,
						dailyError: Object.keys(data2)[0],
						years: Object.keys(data2[`Time Series FX (Daily)`]).length/365,
						hideChart: false
					});
				})
			.catch(error => {
				console.log(error)
				this.setState({
					hideChart: true
				})
			}
			)
		}
	}

	handleClick = (e) => {
		this.setState({
			dateRange: parseInt(e.target.value)
		})
	}

	componentDidUpdate(prevProps, prevState) {

		if (this.props.firstIso !== prevProps.firstIso || this.props.secoundIso !== prevProps.secoundIso){
			this.getData();			
		}
	}

	render() {

		let labels = []
		let values = []
		let data = []

		if (!this.state.hideChart) {
			console.log(this.state.intradayError)
			if (this.state.intradayError !== "Error Message") {
			values = Object.values(this.state.intradayData[`Time Series FX (30min)`]).map((e,i) => parseFloat(e['1. open'])).reverse()
			labels = Object.keys(this.state.intradayData[`Time Series FX (30min)`]).reverse()
			} else if (this.state.dailyError !== "Error Message") {
			values = Object.values(this.state.dailyData[`Time Series FX (Daily)`]).map((e,i) => parseFloat(e['1. open'])).reverse()
			labels = Object.keys(this.state.dailyData[`Time Series FX (Daily)`]).reverse()
			}

			for (let i = 0; i < values.length; i++) {
				data.push([labels[i], values[i]])
			}
		}


		let data2 = [['x','Rate'], ...data.slice(-this.state.dateRange)]

		const options =  {
			trendlines: {
    			0: {
      			type: 'linear',
      			color: 'green',
      			lineWidth: 3,
      			opacity: 0.3,
      			showR2: true,
      			visibleInLegend: true
    			}
  			}			
		}

		let intradayButtons = []
		let dailyButtons = []
		let allButtons = []

		if (this.state.intradayError !== "Error Message") {
			intradayButtons = [
				<button type='button' value='8' className='btn btn-info' onClick={this.handleClick}>12H</button>,
				<button type='button' value='31' className='btn btn-info' onClick={this.handleClick}>1D</button>,
			]
		}

		console.log(this.state.years)

		if (this.state.dailyError !== "Error Message") {
		if (this.state.years >= 10) {
			dailyButtons = [
				<button type='button' value='8' className='btn btn-info' onClick={this.handleClick}>1W</button>,
				<button type='button' value='31' className='btn btn-info' onClick={this.handleClick}>1M</button>,
				<button type='button' value='366' className='btn btn-info' onClick={this.handleClick}>1Y</button>,
				<button type='button' value='732' className='btn btn-info' onClick={this.handleClick}>2Y</button>,
				<button type='button' value='1830' className='btn btn-info' onClick={this.handleClick}>5Y</button>,
				<button type='button' value='3660' className='btn btn-info' onClick={this.handleClick}>10Y</button>]
		} else if (this.state.years >= 5) {
			dailyButtons = [
				<button type='button' value='8' className='btn btn-info' onClick={this.handleClick}>1W</button>,
				<button type='button' value='31' className='btn btn-info' onClick={this.handleClick}>1M</button>,
				<button type='button' value='366' className='btn btn-info' onClick={this.handleClick}>1Y</button>,
				<button type='button' value='732' className='btn btn-info' onClick={this.handleClick}>2Y</button>,
				<button type='button' value='1830' className='btn btn-info' onClick={this.handleClick}>5Y</button>,]
		} else if (this.state.years >= 2) {
			dailyButtons = [
				<button type='button' value='8' className='btn btn-info' onClick={this.handleClick}>1W</button>,
				<button type='button' value='31' className='btn btn-info' onClick={this.handleClick}>1M</button>,
				<button type='button' value='366' className='btn btn-info' onClick={this.handleClick}>1Y</button>,
				<button type='button' value='732' className='btn btn-info' onClick={this.handleClick}>2Y</button>,
			]
		}
		}

		allButtons = [...intradayButtons, ...dailyButtons]

		return (

			!this.state.hideChart ? (
				<div className='chart'>
			
				<Chart
  					width={'100%'}
					height={'60vh'}
					chartType="LineChart"
					loader={<div>Loading Chart</div>}
					data={[['x','Rate'], ...data.slice(-this.state.dateRange)]}
					options= {options}
					rootProps={{ 'data-testid': '1' }}
				/>

				{allButtons}

				</div>
				) : (
				<div></div>	
				)
		)
	}
}



