import React, { useState } from "react";
import {
  getPriceHistory,
  getPriceOfToday,
  isValidDate,
  checkDateOrder,
} from "../coinApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Graph from "./Graph";

const App = () => {
  const todayDate = new Date();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(todayDate.getDate() - 10);
  const [startDate, setStartDate] = useState(tenDaysAgo);
  const [endDate, setEndDate] = useState(todayDate);
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  if (startDate > endDate) setStartDate(endDate);

  const [bitPrice, setBitPrice] = useState(null);

  const fetchData = async (start, end) => {
    if (isValidDate(start) && isValidDate(end)) {
      if (checkDateOrder(start, end)) {
        const todayPrice = await getPriceOfToday();
        const historyPrice = await getPriceHistory(start, end);
        const today = +todayPrice.data.bpi.USD.rate.split(",").join("");
        const history = historyPrice.data.bpi;
        if (end === todayDate.toISOString().split("T")[0]) {
          setBitPrice({ ...history, Today: today });
        } else {
          setBitPrice(history);
        }
      } else {
        console.log("End date is earlier than start date.");
      }
    } else {
      console.log("Date is not valid");
    }
  };

  const onSubmit = () => {
    try {
      fetchData(start, end);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>From</div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <div>To</div>
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      <button onClick={onSubmit}>Render</button>
      {bitPrice && <Graph coinData={bitPrice} />}
    </>
  );
};

export default App;
