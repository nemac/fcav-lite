import config from './config';

export const isLeapYear = (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

export const toDate = (julianDay, year) => {
  // structure: YYYYMMDD
  julianDay = parseInt(julianDay);
  let monthIndex = 0;
  let dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const dayCountLY = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  if (isLeapYear(year)) {
    dayCount = dayCountLY;
  }
  for (let i = 0; i < dayCount.length; i++) {
    if (julianDay > dayCount[i + 1]) {
      monthIndex = i + 1;
    }
  }
  const day = julianDay - dayCount[monthIndex];
  const dateObj = new Date(year, monthIndex, day);
  return dateObj;
};

export const toWMSDate = (dateObj, toHyphenate = false) => {
  const year = String(dateObj.getFullYear());
  let month = String(dateObj.getMonth() + 1);
  let day = String(dateObj.getDate());
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  let wmsString = '';
  if (toHyphenate) {
    wmsString = `${year}-${month}-${day}`;
    return wmsString;
  }

  wmsString = year + month + day;
  return wmsString;
};

export const getNextFWDate = (startDate) => {
  const datesForYear = getFWDatesForYear(startDate.getFullYear());
  for (let i = 0; i < datesForYear.length; i++) {
    if (datesForYear[i] >= startDate) {
      return datesForYear[i];
    }
  }
  return toDate(parseInt(config.juliandates[0], startDate.getFullYear() + 1));
};

export const getFWDatesForYear = (year) => config.juliandates.map((jd) => {
  const date = toDate(parseInt(jd) + 7, year); // 7 day offset
  return date;
});

Date.prototype.isLeapYear = () => {
  const year = this.getFullYear();
  if ((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = () => {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = this.getMonth();
  const dn = this.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};
