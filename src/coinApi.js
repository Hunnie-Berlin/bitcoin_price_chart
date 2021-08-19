import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi/",
});

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const checkDateOrder = (start, end) => {
  const [yy1, mm1, dd1] = start.split("-");
  const [yy2, mm2, dd2] = end.split("-");
  if (+yy1 > +yy2) return false;
  if (yy1 === yy2 && +mm1 > +mm2) return false;
  if (yy1 === yy2 && mm1 === mm2 && +dd1 > +dd2) return false;
  return true;
};

export const isValidDate = (dateString) => {
  const date = dateString.split("-");
  const [yy, mm, dd] = date;
  const thirtyMonths = ["04", "06", "09", "11"];
  const year = new Date().getFullYear();
  if (date.length === 3) {
    if (+yy > year || +yy < 2008 || yy.length !== 4) return false;
    if (+mm < 1 || +mm > 12 || mm.length !== 2) return false;
    if (+dd < 1 || +dd > 31 || dd.length !== 2) return false;
    if (isLeapYear(yy) && mm === "02" && +dd > 29) return false;
    if (!isLeapYear(yy) && mm === "02" && +dd > 28) return false;
    if (thirtyMonths.includes(mm) && +dd > 30) return false;
    return true;
  } else {
    return false;
  }
};

export const getPriceHistory = (startDate, endDate) =>
  api.get(`historical/close.json?start=${startDate}&end=${endDate}`);

export const getPriceOfToday = () => api.get("currentprice/USD.json");
