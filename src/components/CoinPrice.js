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
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PickerZone = styled.div`
  width: 90%;
  max-width: 800px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  align-items: center;
  background-color: #232323;
  border-radius: 10px;
`;

const Text = styled.h3`
  font-size: 18px;
  margin-right: 10px;
  color: beige;
`;

const Title = styled.h1`
  margin: 30px 0 50px;
  font-size: 40px;
`;

const Message = styled.h2`
  margin: 30px 0 20px;
  font-size: 20px;
  color: #757575;
`;

const GraphArea = styled.div`
  height: 100%;
  width: 100%;
  padding: 0px 100px;
`;

const Button = styled.button`
  font-size: 14px;
  padding: 8px 16px;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`;

const CoinPrice = () => {
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
        setMessage("End date is earlier than start date.");
      }
    } else {
      setMessage("Date is not valid");
    }
  };

  const onSubmit = () => {
    try {
      fetchData(start, end);
    } catch (e) {
      console.log(e);
    }
  };

  const [message, setMessage] = useState(
    "Pick dates you want to know the prices of Bitcoin."
  );

  return (
    <Container>
      <Title>BitCoin Price Chart</Title>
      <PickerZone>
        <Text>From</Text>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <Text>To</Text>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <Button onClick={onSubmit}>Render</Button>
      </PickerZone>
      <Message>{message}</Message>
      <GraphArea>{bitPrice && <Graph coinData={bitPrice} />}</GraphArea>
    </Container>
  );
};

export default CoinPrice;
