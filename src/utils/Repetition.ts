import { Repetition } from "../types/Exercise";

const isValid = (rep: Repetition) => rep.count > 0 && rep.weight > 0;
const volume = (rep: Repetition) => rep.count * rep.weight;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isValid,
  volume,
};
