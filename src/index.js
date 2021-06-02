import React from 'react';
//import createClass from 'create-react-class';
import ReactDOM from 'react-dom';
import './index.css';
import createReactClass from 'create-react-class';

var calculatePayment = function(principal,year,rate){
  var monthlyRate = rate /100/12;
  var monthlyPayment = principal*monthlyRate/(1-(Math.pow(1/(1+monthlyRate),year*12)));
  var balance = principal;
  for (var y=0;y<year;y++){
    var interestY = 0;
    var principalY  = 0;
    for (var m=0;m<12;m++){
      var interestM =balance * monthlyRate;
      var principalM = monthlyPayment - interestM;
      interestY = interestY + interestM;
      principalY = principalY + principalM;
      balance = balance- principalM;
    }
  }
  return{monthlyPayment : monthlyPayment};
};

var Header = createReactClass({
  render : function(){
    return(
      <header><h1> {this.props.title} </h1></header>
    );
  }
});

var MortgageCalaculator = createReactClass({
  getInitialState : function(){
    return{
      principal:this.props.principal,
      year:this.props.year,
      rate:this.props.rate
    };
  },
  principalChange : function(event){
    this.setState({principal: event.target.value});
  },
  yearChange : function(event){
    this.setState({year: event.target.value});
  },
  rateChange : function(event){
    this.setState({rate: event.target.value});
  },
  render : function(){
    var payment = calculatePayment(this.state.principal,this.state.year,this.state.rate);
    var monthlyPayment = payment.monthlyPayment;
    
    return (
      <div className = "content">
        <div className = "form">
          <div class="form_input">
            <label>Principal:</label>
            <input type="text" value={this.state.principal} onChange ={this.principalChange} />
          </div>
          <div class="form_input">
            <label>Years:</label>
            <input type="text" value={this.state.year} onChange ={this.yearChange} />
          </div>
          <div class="form_input">
            <label htmlFor="rate">Rate:</label>
            <input type="text" value={this.state.rate} onChange ={this.rateChange} />
          </div>
        </div>
        <h2>Monthly Payment (in $) :{Number(monthlyPayment.toFixed(2)).toLocaleString()}</h2>
      </div>
    );
  }
});

var App = createReactClass({
  render : function(){
    return(
      <div><Header title = "REACT MORTGAGE CALCULATOR" />
      <MortgageCalaculator principal="200000" year="30" rate="5" />
      </div>
    );
  }
});

ReactDOM.render(<App />,document.getElementById('root'));

