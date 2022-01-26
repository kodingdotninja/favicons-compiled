#!/usr/bin/env node

// @ts-check

import arg from "./arg@5.0.1.min.cjs";

import favicons from "favicons-compiled";
import * as fs from "fs/promises";
import * as path from "path";

async function cli() {
  try {
    const args = arg({
      "--input": String,
      "--config": String,
      "--output": String,
      "-i": "--input",
      "-c": "--config",
      "-o": "--output",
    });

    if (!args["--input"]) {
      throw new arg.ArgError("missing required argument: --input", "ARG_REQUIRED");
    }

    const inputPath = cwd(args["--input"]);

    const config = args["--config"]
      ? await fs.readFile(cwd(args["--config"]), "utf-8").then((file) => JSON.parse(file))
      : {};

    const outputPath = cwd(args["--output"] ?? "out");
    const writePath = (...rest) => path.join(outputPath, ...rest);
    await fs.mkdir(outputPath).catch(() => {});

    console.log("Generating favicons...");
    const { files, html, images } = await favicons(inputPath, config);

    await Promise.all([
      ...files.map(({ contents, name }) => fs.writeFile(writePath(name), contents)),
      ...images.map(({ contents, name }) => fs.writeFile(writePath(name), contents)),
      fs.writeFile(writePath("favicons-meta-tags.html"), html),
      fs.writeFile(writePath("favicons-meta-tags.jsx"), htmlToReactString(html)),
    ]);

    console.log(`Favicons generated at ${outputPath}`);
  } catch (error) {
    console.error(String(error));
    process.exit(1);
  }
}

export function cwd(...rest) {
  return path.join(process.cwd(), ...rest);
}

export function htmlToReactString(html) {
  const content = html.map((h) => h.replace(/>$/, " />")).join(" ");
  return `export default function FaviconsMetaTags() { return <>${content}</>; }`;
}

cli();
