import { v4 as uuidv4 } from 'uuid';

let idCounter = 0;

export function generateId() {
  // Increment the counter and return the value as a string
  idCounter++;
  return idCounter.toString();
}