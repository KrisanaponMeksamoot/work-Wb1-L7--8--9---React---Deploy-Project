import {v4} from "uuid";
import PropTypes from "prop-types";

export const theItems = [];

export function addItem(name, amount, id) {
    theItems.push({name:name,amount:amount,id:id});
}

addItem("เงินเดือน",15000,v4());
addItem("ค่าอาหาร",-300,v4());
addItem("ค่าเดินทาง",-100,v4());

export const Item=(props)=>{
    return (
      <li>{props.name} <span style={{borderColor:props.amount>0?"green":(props.amount<0?"red":"grey"),borderStyle:"solid",borderWidth:0,borderRightWidth:5}}>{props.amount}฿ </span></li>
    );
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};


function Items({listItems = theItems.map((item) => (
        <li key={item.id}>
            <Item {...item} />
        </li>
    ))}) {

    return (
        <div>
            <ul>{listItems}</ul>
        </div>
    );
}

export default Items;