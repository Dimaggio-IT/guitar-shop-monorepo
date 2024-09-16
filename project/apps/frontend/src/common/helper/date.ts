import dayjs from 'dayjs';

const getCurrentDate = () => {
  return dayjs().toISOString();
}

const getDateFromISO = (date: string) => {
  const dateFromString = new Date(date);
  const year = dateFromString.getFullYear();
  let month = (dateFromString.getMonth() + 1).toString();
  let dt = dateFromString.getDate().toString();
  let hh = dateFromString.getHours().toString();
  let mm = dateFromString.getMinutes().toString();

  if (parseInt(dt, 10) < 10) {
    dt = '0' + dt;
  }

  if (parseInt(month, 10) < 10) {
    month = '0' + month;
  }

  if (parseInt(hh, 10) < 10) {
    hh = '0' + hh;
  }

  if (parseInt(mm, 10) < 10) {
    mm = '0' + mm;
  }

  return `${year}-${month}-${dt} ${hh}:${mm}`;
}

export { getCurrentDate, getDateFromISO }
