// This module is browser compatible.

export type DurationTime = typeof DURATION;

export const DURATION = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  seconds: 1000,
  ms: 1,
};

const DURATIONS = Object.entries(DURATION) as [keyof typeof DURATION, number][];

/** convert a `DurationTime` value to to a `number` of milliseconds */
export const duration = (time: Partial<DurationTime>): number =>
  DURATIONS.reduce((acc, [name, dur]) => acc + (dur * (time[name] ?? 0)), 0);

/** convert a `number` of milliseconds to a `DurationTime` */
export const fromDuration = (time: number): DurationTime => {
  const output = {} as DurationTime;

  for (let i = 0; i < DURATIONS.length; i++) {
    const [name, duration] = DURATIONS[i];

    let count = Math.trunc(time / duration);

    if (i !== 0 && duration !== 1) count = Math.min(count, duration);

    time -= count * duration;

    output[name] = count;
  }

  return output;
};