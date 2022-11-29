export const chanceToRating = (chance?: number | null) => {
  if (!chance) return 0;
  return Math.ceil((chance / 100) * 5);
};

export const precisionRound = (number: number, precision: number) => {
  if (precision < 0) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  } else return +(Math.round(Number(number + 'e+' + precision)) + 'e-' + precision);
};

export const hex2rgba = (hex: string, alpha = 1) => {
  const match = hex.match(/\w\w/g);
  if (!match) throw Error('Invalid Hex');
  const [r, g, b] = match.map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const objFromArray = (arr: any[], key = 'id'): {} =>
  arr.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});

export function wait<T>(ms: number, value?: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}
// eslint-disable-next-line consistent-return
export const deepCopy = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key as any] = deepCopy(obj[key]);
      return newObj;
    }, {} as Record<any, any>);
  }
};
