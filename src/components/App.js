import React, { useState } from "react";
import {
  getPriceHistory,
  getPriceOfToday,
  isValidDate,
  checkDateOrder,
} from "../coinApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const today = new Date();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(today.getDate() - 10);

  const [startDate, setStartDate] = useState(tenDaysAgo);
  const [endDate, setEndDate] = useState(today);

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];

  if (startDate > endDate) setStartDate(endDate);

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
    </>
  );
};

export default App;
