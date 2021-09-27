import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { duration, DurationTime, format, fromDuration } from "./mod.ts";

Deno.test("testDuration", () => {
  const dur = duration({ days: 1, hours: 1, minutes: 1, seconds: 1, ms: 1 });
  assertEquals(dur, 90061_001);
});

Deno.test("testDurationPartial", () => {
  const dur = duration({ days: 1 });
  assertEquals(dur, 86400_000);
});

Deno.test("testFromDuration", () => {
  // 3 days + 2 hours
  const dur = (86400_000 * 3) + (3600_000 * 2);
  const time = fromDuration(dur);
  assertEquals<DurationTime>(time, {
    days: 3,
    hours: 2,
    minutes: 0,
    ms: 0,
    seconds: 0,
  });
});

Deno.test("testFromDurationOverflow", () => {
  // 3 days + 23 hours + 70 minutes = 4 days + 10 minutes
  const dur = duration({ days: 3, hours: 23, minutes: 70 });
  const time = fromDuration(dur);
  assertEquals<DurationTime>(time, {
    days: 4,
    hours: 0,
    minutes: 10,
    seconds: 0,
    ms: 0,
  });
});

Deno.test("testDurationsFloat", () => {
  const dur = duration({
    days: 1.5,
    hours: 1.5,
    minutes: 1.5,
    seconds: 1.5,
    ms: 0,
  });
  const time = fromDuration(dur);
  assertEquals<DurationTime>(time, {
    days: 1,
    hours: 13,
    minutes: 31,
    seconds: 31,
    ms: 500,
  });
});

Deno.test("basicUsage", () => {
  const dur = duration({ days: 3, hours: 32.5, seconds: 10 });
  assertEquals(dur, 376210000);

  const res = fromDuration(dur);
  assertEquals(res, { days: 4, hours: 8, minutes: 30, seconds: 10, ms: 0 });

  const str = format(res);
  assertEquals(str, "in 4 days");
});
