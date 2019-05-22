import React, { useState, useEffect } from 'react'

function HookExchangeRate(props) {

	const [convert, setConvert] = useState([])
	const [error, setError] = useState(null)

	let getData = () => {

	const apiKey = "09J06540442CFOSU" 

    fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${props.firstIso.label}&to_currency=${props.secoundIso.label}&apikey= ${apiKey}`)
    	.then(res => res.json())
    	.then(
    		(result) => {
    			if(convert !== result){setConvert(result)} 
        		console.log(convert)
        	},
        	(err) => {
        		if(error !== err){setError(err)}
        		});
     }
     
    useEffect(() =>{
    	console.log('used')
    	// const subscription = props.subscribe()
      	getData()
      	 // return () => {subscription.unsubscribe()}
  	}, [])

      return <div>{props.secoundIso.label}</div>
}

export default ExchangeRate