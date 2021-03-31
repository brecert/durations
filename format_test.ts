import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { format } from "./mod.ts";

Deno.test("testFormat", () => {
  assertEquals(
    format({ hours: 3, days: 4 }),
    "in 4 days",
  );

  assertEquals(
    format({ hours: -3, days: -4 }),
    "4 days ago",
  );

  assertEquals(
    format({}),
    "now",
  );

  assertEquals(
    format({ ms: 5 }),
    "now",
  );

  assertEquals(
    format({ ms: -55 }),
    "0.5 seconds ago",
  );
});

Deno.test("testFormatFormatter", () => {
  const formatter = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "always",
    style: "narrow",
  });

  const options = { formatter };
  const fmt = <T>(a: T) => format(a, options);

  assertEquals(
    fmt({ hours: 3, days: 4 }),
    "in 4 days",
  );

  assertEquals(
    fmt({ hours: -3, days: -4 }),
    "4 days ago",
  );

  assertEquals(
    fmt({}),
    "in 0 sec.",
  );

  assertEquals(
    fmt({ ms: 5 }),
    "in 0 sec.",
  );

  assertEquals(
    fmt({ ms: -55 }),
    "0.5 sec. ago",
  );
});
