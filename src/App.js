import React from 'react';
import './App.css';




// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fromCur: "",
//       toCur: ""
//     }

//   }

//   onChange (e) => {
//       this.setState({
//      fromCur: e,
//     })
//     console.log(Object.values(this.state.currency))
//   }

//   render() {
//     return (
//       <div className="App">
//         <DropdownButton />
//         <DropdownButton />
//         <Graph />
//       </div>
//     );
//   }
// }


import currencies from './data/currencies.json'
import {Dropdown} from 'primereact/dropdown';
import ExchangeRate from './components/exchangerate.jsx'
import Graph from './components/chart.jsx'
import {Chart} from 'primereact/chart'
import {Button} from 'primereact/button'



import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curIso: [],
      fromCur: "",
      toCur: "",
      dateRange: "FX_MONTHLY"
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

  handleFromCurChange = (e) => {
    this.setState({
     fromCur: e.value,
    })
  }

  handleToCurChange = (e) => {
    this.setState({
     toCur: e.value,
    })
  }

  handleClick = (e) => {
    this.setState({
      dateRange: e.target.value
    })
  }

  render() {
    console.log(this.state.dateRange)
    return (
      <div className="App">
        <Dropdown value={this.state.fromCur} options={this.state.curIso} 
          onChange={this.handleFromCurChange} placeholder='Select Currency' optionLabel="label"/>
        <Dropdown value={this.state.toCur} options={this.state.curIso} 
          onChange={this.handleToCurChange} placeholder='Select Currency' optionLabel="label"/>
        <ExchangeRate firstIso={this.state.fromCur} secoundIso={this.state.toCur} />
        <Graph firstIso={this.state.fromCur} secoundIso={this.state.toCur} dateRange={this.state.dateRange} />
        <button type='button' value='FX_INTRADAY' onClick={this.handleClick}>1D</button>
        <button type='button' value='FX_DAILY' onClick={this.handleClick}>1W</button>
        <button type='button' value='FX_WEEKLY' onClick={this.handleClick}>1M</button>
        <button type='button' value='FX_MONTHLY' onClick={this.handleClick}>1Y</button>
      </div>
    )    
  }
}