// This function goes through the layer dates list and returns
// the most recent date that is not today or in the future
export function findMostRecentLayerDate(currentDate, listOfDays) {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, '0');
  const currentMonthDay = `${month}${day}`;
  let foundDate = null;

  for (let date of dates) {
    if (date >= currentMonthDay) {
      return foundDate;
    }
    foundDate = date;
  }
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}