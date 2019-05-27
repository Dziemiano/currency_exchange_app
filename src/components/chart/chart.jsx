import React from 'react';
import config from '../../config'
import Chart from 'react-google-charts';

export default class ChartComp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataType : 'daily',
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
					this.setState({
						intradayData: data1,
						intradayError: Object.keys(data1)[0],
						dailyData: data2,
						dailyError: Object.keys(data2)[0],
						years: Object.keys(data2[`Time Series FX (Daily)`]).length/365,
						hideChart: false
					});
				})
			.catch(error => { this.setState({ hideChart: true }) })
		}
	}

	handleClick = (e) => {
		this.setState({
			dataType: e.target.value,
			dateRange: parseInt(e.target.dataset.range)
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.firstIso !== prevProps.firstIso || this.props.secoundIso !== prevProps.secoundIso){
			if (this.timeoutFetch) clearTimeout(this.timeoutFetch)
			this.timeoutFetch = setTimeout(() => this.getData(), 5000);			
		}
	}

	render() {

		let labels = []
		let values = []
		let data = []
		let intradayButtons = []
		let dailyButtons = []
		let allButtons = []
		const chartOptions =  {
			title: 'Historical Exchange Rate',
			chartArea: { width: '85%', height: '70%' },
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

		if (!this.state.hideChart) {			
			if (this.state.intradayError !== ("Error Message" || "Note") && this.state.dataType === 'intra') {
				values = Object.values(this.state.intradayData[`Time Series FX (30min)`]).map((e,i) => parseFloat(e['1. open'])).reverse()
				labels = Object.keys(this.state.intradayData[`Time Series FX (30min)`]).reverse()
			} else if (this.state.dailyError !== "Error Message" && this.state.dataType === 'daily') {
				values = Object.values(this.state.dailyData[`Time Series FX (Daily)`]).map((e,i) => parseFloat(e['1. open'])).reverse()
				labels = Object.keys(this.state.dailyData[`Time Series FX (Daily)`]).reverse()
			}

			for (let i = 0; i < values.length; i++) {
				data.push([labels[i], values[i]])
			}

			data = [['x','Rate'], ...data.slice(-this.state.dateRange)]
		}

		if (this.state.intradayError !== "Error Message") {
			for (let i=0; i < 3; i++) {			
				let range = 0
				let placeholder = ''
				
				if (i === 0) {
					placeholder = '12H'
					range = 25
				} else if (i === 1) {
					placeholder = '1D'
					range = 50
				} else {
					placeholder = '1W'
					range = 400
				}

				intradayButtons.push(<button type='button' key={i+20} value='intra' data-range={range} className='btn btn-info' onClick={this.handleClick}>{placeholder}</button>)
			}			
		}

		if (this.state.dailyError !== "Error Message") {
			for (let i = 0; i < this.state.years; i++ ) {			
				let range = 340*(i+1)
				let placeholder = `${i+1}Y`
				
				if (i === 0) {
					placeholder = '1M'
					range /= 10
				}
				
				dailyButtons.push(<button type='button' key={i} value='daily' data-range={range} className='btn btn-info' onClick={this.handleClick}>{placeholder}</button>)
			}
		}

		allButtons = [...intradayButtons, ...dailyButtons]

		return (
			!this.state.hideChart ? (
				<div className='chart'>

				<Chart
				width={'100%'}
				height={'60vh'}
				chartType="AreaChart"
				loader={<div>Loading Chart</div>}
				data={data}
				options= {chartOptions}
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



