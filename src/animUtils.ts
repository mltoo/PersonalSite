
export function lerp(startVal: number, endVal: number, time: number): number {
    return startVal + (endVal - startVal)*Math.min(1,time);
}
