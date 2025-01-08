import { atom } from 'jotai';

export const dateAtom = atom<Date>(new Date())

const dt = new Date();
const selectDateArr:Date[] = [];
dt.setMonth(dt.getMonth() - 2);
for (let i = 0; i < 3; i++) {
  dt.setMonth(dt.getMonth() + 1)
  selectDateArr.push(new Date(dt))
}
export const selectDateAtom = atom<Date[]>(selectDateArr)