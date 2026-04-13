import { CENTER } from './constants';

export interface Point {
  x: number;
  y: number;
}

export function polarToCartesian(angleRad: number, radius: number): Point {
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

export function getCoderAngle(index: number, total: number): number {
  return (2 * Math.PI / total) * index;
}

export function getDongleAngle(index: number, total: number): number {
  return (2 * Math.PI / total) * (index + 0.5);
}
