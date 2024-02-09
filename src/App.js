import React, { useContext, useState } from 'react';
import './App.css';
import Items from './form/Data';
import {v4} from "uuid";
import {addItem, theItems, Item} from './form/Data';

const Title=()=><h1>บัญชีรายรับรายจ่าย</h1>
const Description=()=><p>บันทึกข้อมูลบัญชีในแต่ละวัน</p>

var sum_income = 0;
var sum_outcome = 0;
const sum_money=()=>sum_income-sum_outcome;

const Form=({setListItems, setTheItems})=>{
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const OnSubmit=(e)=>{
    e.preventDefault();
    addItem(name,amount,v4());
    sum_income = sum_outcome = 0;
    theItems.forEach(e=>(e.amount>0?(sum_income+=e.amount):(sum_outcome-=e.amount)));
    setListItems(theItems.map((item) => (
      <li key={item.id}>
          <Item {...item} />
      </li>
    )));
    setTheItems(theItems);
    console.log("added data");
  };

  return (
    <form onSubmit={OnSubmit}>
      <div>Name: <input value={name} onChange={e=>setName(e.target.value)} /></div>
      <div>Amount: <input type="number" value={amount} onChange={e=>setAmount(e.target.valueAsNumber)} /></div>
      <input type="submit" />
    </form>
  );
};

const Summary=({theItems0})=>{
  theItems0.forEach(e=>(e.amount>0?(sum_income+=e.amount):(sum_outcome-=e.amount)));
  return <div>Total income: {sum_income}฿ Total outcome: {sum_outcome}฿ Total: {sum_money()}฿</div>;
}

function App() {
  const [listItems, setListItems] = useState(theItems.map((item) => (
    <li key={item.id}>
        <Item {...item} />
    </li>
  )));
  const [theItems0, setTheItems] = useState(theItems);
  return (
    <center>
      <Title />
      <Form setListItems={setListItems} setTheItems={setTheItems}/>
      <Description />
      <Items listItems={listItems} />
      <Summary theItems0={theItems0} />
    </center>
  );
}

export default App;
