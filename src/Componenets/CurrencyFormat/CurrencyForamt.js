import React from "react";
import numeral from "numeral";

const CurrencyFormat=({amount})=>{
    const ForamattedAmount = numeral(amount).format("$0,0.00");
    return <div> {ForamattedAmount}</div>

}

export default CurrencyFormat;