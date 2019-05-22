import React from 'react';
import {Chart} from 'primereact/chart';
import config from '../config'

export default class Graph extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			histData: [],
			labels: [],
			values: []
		}
	}

getData = () => {
	const apiKey = config.API_KEY

	let time = ""

	switch (this.props.dateRange) {
		case "FX_INTRADAY":
			time = '5min'
			break;
		case "FX_DAILY":
			time = 'Daily'
			break;
		case "FX_WEEKLY":
			time = 'Weekly'
			break;
		case "FX_MONTHLY":
			time = 'Monthly'
			break;
		default:
			time = "Monthly"
			break;
	}

	if (this.props.firstIso !== "" && this.props.secoundIso !== "") {
  	let url = `https://www.alphavantage.co/query?function=${this.props.dateRange}&from_symbol=${this.props.firstIso.label}&to_symbol=${this.props.secoundIso.label}&apikey= ${apiKey}`

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(Object.keys(result))
          this.setState({
            histData: Object.entries(result)[0],
            labels: Object.keys(result[`Time Series FX (${time})`]).reverse(),
            values: Object.values(result[`Time Series FX (${time})`])
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
  	console.log(this.props.dateRange)
  	console.log(prevProps.dateRange)
      if (this.props.firstIso !== prevProps.firstIso || this.props.secoundIso !== prevProps.secoundIso || prevProps.dateRange !== this.props.dateRange){
        this.getData();

      }
    }



render() {

	   	const valuesArr = this.state.values.map((e,i) => parseFloat(e['1. open'])).reverse()
	   	console.log(this.state.values)
		console.log( valuesArr )  
        const lineStylesData = {
            labels: this.state.labels,
            datasets: [
              
             	{
                    label: `${this.props.firstIso.label} to ${this.props.secoundIso.label}` ,
                    data: valuesArr,
                    fill: true,
                    borderColor: '#FFA726',
                    backgroundColor: '#FFCC80'
                }
            ]   
        };

        return (
            <div>
       	         	<h3>Historical Exchange Chart</h3>
                    <Chart type="line" data={lineStylesData}  />
            </div>
        )
    }
}

