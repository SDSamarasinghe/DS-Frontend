import { BehaviorSubject } from "rxjs";

export const userSub = new BehaviorSubject(null);
export const adminSub = new BehaviorSubject(null);

export const addUser = (user) => {
  return `Bearer ${user}`;
};
