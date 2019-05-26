import React from 'react';
import './App.css';



import currencies from './data/currencies.json'
import {Dropdown} from 'primereact/dropdown';
import ExchangeRate from './components/exchangerate/exchangerate.jsx'
import ChartComp from './components/chart/chart.jsx'
import DropdownButtons from './components/dropdown/dropdown.jsx'



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
    console.log(e)
    this.setState({
     fromCur: e,
    })
  }

  handleToCurChange = (e) => {
    this.setState({
     toCur: e,
    })
  }


  render() {
    console.log(this.state.fromCur)
    return (
      <div className='App container-fluid'>
               <h1 id='title'>Select Exchange Currencies</h1>
        <div className='row h-25'>

          <div className='col'>

            <DropdownButtons fromCur={this.state.fromCur} toCur={this.state.toCur} handleFromCurChange={this.handleFromCurChange} handleToCurChange={this.handleToCurChange}/>
          </div>
          <div className='col'>
            <ExchangeRate firstIso={this.state.fromCur} secoundIso={this.state.toCur} />
          </div>
        </div>
        <div className='row h-75'>
          <div className='col'>
            <ChartComp firstIso={this.state.fromCur} secoundIso={this.state.toCur} dateRange={this.state.dateRange} />
          </div>
        </div>
      </div>
    )    
  }
}