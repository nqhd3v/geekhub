export const uniqArr = (arr: any[]) => [...Array.from(new Set(arr))];

export const outArr = (arr: any[], val: any) => arr.filter(item => item !== val);