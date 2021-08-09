import {dayToIndexMapper} from './dayToIndexMapper';

export function targetDaysInMonthYear(year, month, targetDay) {
    let day, counter, date;
    let targetDayIndex = parseInt(dayToIndexMapper[targetDay]);

    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (date.getDay() === targetDayIndex) {
        // Sun=0, Mon=1, Tue=2, etc.
        counter += 1;
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return counter;
  }