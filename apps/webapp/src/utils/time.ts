import { Language } from '@/common/translations';
import f from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

export function toDate(datum: Date | string | undefined | null, format = 'dd/MM/yyyy', _locale: Language = 'en') {
  if (!datum) return '';

  const date = datum instanceof Date ? datum : new Date(datum);

  return f(date, format, {});
}

export function toDistance(
  from: Date | string | undefined | null,
  to: Date | string | undefined | null,
  _locale: Language = 'en'
) {
  if (!from || !to) return '';

  const fromDate = from instanceof Date ? from : new Date(from);
  const toDate = to instanceof Date ? to : new Date(to);

  return formatDistance(toDate, fromDate, { addSuffix: true });
}

export function isValidDate(date: Date | string | null) {
  return !isNaN(Date.parse(date as string));
}
