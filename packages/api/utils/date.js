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

const now = () => new Date ().toISOString ();

const getYearsFromDate = (years = 1, date = new Date()) => {
  date.setFullYear(date.getFullYear() + years);
  return date;
}


module.exports = {
  createDate,
  formatToUtc,
  now,
  getYearsFromDate
};

