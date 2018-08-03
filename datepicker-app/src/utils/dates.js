import moment from 'moment';

export const dateRangeBuilder = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  return `${startDate} - ${endDate}`;
};

export const dateBuilder = (dateObject) => {
  return `${dateObject.getMonth() + 1 }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
};

export const getLastDate = (dateObject, dateType) => {
  let result;
  switch (dateType) {
    case 'month':
      result = new Date(dateObject.getFullYear(), dateObject.getMonth(), 0);
      debugger;
      return dateBuilder(result);
    case 'quarter':
      return;
    case 'year':
      result = new Date(dateObject.getFullYear(), 0, 0);
      return dateBuilder(result);
  }
}

// return the first day of the date range
export const momentBuilder = (endate, period, dateType) => {
  return moment(endate, 'MM/DD/YYYY').subtract(period, dateType).format('L');
};
