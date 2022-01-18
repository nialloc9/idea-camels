const createDate = (timestamp) => new Date(timestamp);

const formatToUtc = (date = createDate()) => {
  return (
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
};

const now = () => new Date().toISOString();

const getYearsFromDate = (years = 1, date = new Date()) => {
  date.setFullYear(date.getFullYear() + years);
  return date;
};

const getDate = ({ timestamp, format, date }) => {
  const newDate = date || new Date();
  console.log(newDate, newDate.getFullYear());
  return (
    {
      "YYYY-MM-DD": (dateObject) =>
        `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`,
      "DD-MM-YYYY": (dateObject) =>
        `${dateObject.getDate()}-${dateObject.getMonth()}-${dateObject.getFullYear()}`,
    }[format](newDate) ||
    `${dateObject.getDate()}-${dateObject.getMonth()}-${dateObject.getFullYear()}`
  );
};

module.exports = {
  createDate,
  formatToUtc,
  now,
  getDate,
  getYearsFromDate,
};
