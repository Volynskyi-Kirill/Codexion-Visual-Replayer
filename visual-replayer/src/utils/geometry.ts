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

const START_ANGLE = -Math.PI / 2;

export function getCoderAngle(index: number, total: number): number {
    if (total <= 0) return START_ANGLE;
    return START_ANGLE + ((2 * Math.PI) / total) * Math.max(0, index - 1);
}

export function getDongleAngle(index: number, total: number): number {
    if (total <= 0) return START_ANGLE;
    return (
        START_ANGLE + ((2 * Math.PI) / total) * (Math.max(0, index - 1) + 0.5)
    );
}
