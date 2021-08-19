import React from "react";
import {
  getPriceHistory,
  getPriceOfToday,
  isValidDate,
  checkDateOrder,
} from "../coinApi";

const App = () => {
  const fetchData = async (start, end) => {
    if (isValidDate(start) && isValidDate(end)) {
      if (checkDateOrder(start, end)) {
        const todayPrice = await getPriceOfToday();
        const historyPrice = await getPriceHistory(start, end);
        console.log(todayPrice.data.bpi.USD.rate);
        console.log(historyPrice.data.bpi);
      } else {
        console.log("End date is earlier than start date.");
      }
    } else {
      console.log("Date is not valid");
    }
  };

  try {
    fetchData("2015-06-23", "2014-12-20");
  } catch (e) {
    console.log(e);
  }

  return <div>App</div>;
};

export default App;
