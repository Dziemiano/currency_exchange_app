import React from 'react';
import currencies from '../../data/currencies.json'
import {Dropdown} from 'primereact/dropdown';



import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Dropdowns extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			curIso: [],
			currency: "",
		}
	}

	componentDidMount() {
		let arr = []
    Object.keys(currencies).forEach(key => {
      arr.push({label: key})
    })
    this.setState({
      curIso: arr
    })
	}

	selectFromCurrency = (e) => {
		this.props.handleFromCurChange(e.value)
	}

	selectToCurrency = (e) => {
		this.props.handleToCurChange(e.value)
	}




	render() {


		return ( 
			<div className='dropdowns'>
			<h4>From</h4>
			<Dropdown value={this.props.fromCur} options={this.state.curIso} 
              onChange={this.selectFromCurrency} placeholder='Select Currency' optionLabel="label"/>
            <h4>to</h4>
            <Dropdown value={this.props.toCur} options={this.state.curIso} 
              onChange={this.selectToCurrency} placeholder='Select Currency' optionLabel="label"/>
            </div>
         )	
	}
}
