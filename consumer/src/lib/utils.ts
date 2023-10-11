import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeSentence(str: string) {
  if (str.length === 0) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}
