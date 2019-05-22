import React from 'react';
import currencies from '../data/currencies.json'
import {Dropdown} from 'primereact/dropdown';



import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class DropdownButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currIso: [],
			currency: "",
		}
	}

	componentDidMount() {
		this.setState({
			currIso: Object.keys(currencies)
		})
	}

	selectCurrency = (e) => {
		// this.setState({
		// 	currency: e.value,
		// })
		// console.log(Object.values(this.state.currency))
		this.props.currChange(e.value)
	}




	render() {
		let arr = []
		this.state.currIso.forEach(key => {
			arr.push({label: key})
		})

		return<Dropdown value={this.state.currency} options={arr} onChange={this.selectCurrency} placeholder='Select Currency' optionLabel="label"/>
		
		
	}
}
