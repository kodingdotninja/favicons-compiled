#!/usr/bin/env node

// @ts-check

import arg from "./lib/arg@5.0.1.min.cjs";

const args = arg({
  "--icon": String,
  "-i": "--icon",
});

console.log(args);
