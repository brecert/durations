// This module is browser compatible.

import { DURATIONS, DurationTime } from "./mod.ts";

const EN_RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit",
  numeric: "auto",
  style: "long",
});

interface FormatOptions {
  formatter?: Intl.RelativeTimeFormat;
}

export const format = (
  duration: Partial<DurationTime>,
  { formatter = EN_RELATIVE_TIME_FORMAT }: FormatOptions = {},
) => {
  let type = DURATIONS
    .find(([name, _]) => duration[name] && duration[name] !== 0)?.[0] ?? "ms";
  let time = duration[type] ?? 0;
  if (type === "ms") {
    type = "seconds";
    time = Math.trunc((time / 100) * 10) / 10;
  }
  return formatter.format(time, type);
};
