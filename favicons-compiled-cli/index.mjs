#!/usr/bin/env node

// @ts-check

import arg from "./arg@5.0.1.min.cjs";

import favicons from "favicons-compiled";
import * as fs from "fs/promises";
import * as path from "path";

const halp = `Usage: favicons-compiled [options]

Options:
  -i, --input     Image input path
  -c, --config    Favicon configuration file
  -o, --output    Generated assets destination (defaults to ./out)

https://github.com/kodingdotninja/favicons-compiled
`;

async function cli() {
  try {
    const args = arg({
      "--input": String,
      "--config": String,
      "--output": String,
      "-i": "--input",
      "-c": "--config",
      "-o": "--output",

      "--help": String,
      "-h": "--help",
    });

    if (args["--help"]) {
      console.log(halp);
      return;
    }

    if (!args["--input"]) {
      throw new arg.ArgError("missing required argument: --input", "ARG_REQUIRED");
    }

    const inputPath = path.resolve(args["--input"]);

    const config = args["--config"]
      ? await fs.readFile(path.resolve(args["--config"]), "utf-8").then((file) => JSON.parse(file))
      : {};

    const outputPath = path.resolve(args["--output"] ?? "out");
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

export function htmlToReactString(html) {
  const content = html.map((h) => h.replace(/>$/, " />")).join(" ");
  return `export default function FaviconsMetaTags() { return <>${content}</>; }`;
}

cli();
