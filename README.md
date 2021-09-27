# Durations

This module provides very basic to/from millisecond based durations to make
creating and reading duration numbers easier.

## Usage

Basic usage:

```ts
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import {
  duration,
  format,
  fromDuration,
} from "https://deno.land/x/durations@1.1.3/mod.ts";

const dur = duration({ days: 3, hours: 32.5, seconds: 10 });
assertEquals(dur, 376210000);

const res = fromDuration(dur);
assertEquals(res, { days: 4, hours: 8, minutes: 30, seconds: 10, ms: 0 });

const str = format(res);
assertEquals(str, "in 4 days");
```
