import { isFuture } from 'date-fns';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';
import isPast from 'date-fns/isPast';
import parserISO from 'date-fns/parseISO';

// eslint-disable-next-line import/prefer-default-export
export const validateDate = (date, dateToCompare) => {
  const Formatteddate = parserISO(date);
  const anotherdate = parserISO(dateToCompare);

  const valid = isAfter(Formatteddate, anotherdate);
  const checkEqual = isEqual(Formatteddate, anotherdate);
  const invalidDate = isPast(anotherdate);

  if (checkEqual || invalidDate) {
    return false;
  }
  return valid;
};

export const compareBirthDate = (inputDate) => {
  const dateFormatted = parserISO(inputDate);

  const invalidDate = isFuture(dateFormatted);

  if (invalidDate) {
    return false;
  }
  return true;
};
