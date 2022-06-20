// @ts-check

const { favicons } = require("favicons-compiled");
const fs = require("fs/promises");
const path = require("path");

const { htmltoAstroString, htmlToReactString } = require("../utils/convert.cjs");
const arg = require("./arg.cjs");

async function cli() {
  try {
    const args = arg({
      "--input": String,
      "--config": String,
      "--output": String,
      "-i": "--input",
      "-c": "--config",
      "-o": "--output",

      "--astro": String,
      "--html": String,
      "--jsx": String,

      "--help": String,
      "-h": "--help",
    });

    if (args["--help"]) {
      console.log(HELP_MESSAGE);
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
    await fs.mkdir(outputPath).catch(() => {});

    const astroPath = args["--astro"] ? path.resolve(args["--astro"]) : null;
    const htmlPath = args["--html"] ? path.resolve(args["--html"]) : null;
    const jsxPath = args["--jsx"] ? path.resolve(args["--jsx"]) : null;

    console.log("Generating favicons...");
    const { files, html, images } = await favicons(inputPath, config);

    await Promise.all([
      ...files.map(({ contents, name }) => fs.writeFile(path.join(outputPath, name), contents)),
      ...images.map(({ contents, name }) => fs.writeFile(path.join(outputPath, name), contents)),
      astroPath ? fs.writeFile(astroPath, htmltoAstroString(html)) : null,
      htmlPath ? fs.writeFile(htmlPath, html) : null,
      jsxPath ? fs.writeFile(jsxPath, htmlToReactString(html)) : null,
    ]);

    console.log(`Favicons generated at ${outputPath}`);
  } catch (error) {
    console.error(String(error));
    process.exit(1);
  }
}

const HELP_MESSAGE = `Usage: favicons-compiled [options]

Options:
  -i, --input     Image input path (required)
  -c, --config    JSON configuration file (https://github.com/itgalaxy/favicons/blob/master/src/config/defaults.ts)
  -o, --output    Generated assets destination (defaults to ./out)
  --astro         Path to export as Astro component (e.g. favicons-meta-tags.astro)
  --html          Path to export as HTML (e.g. favicons-meta-tags.html)
  --jsx           Path to export as JSX component (e.g. favicons-meta-tags.jsx)

https://github.com/kodingdotninja/favicons-compiled
`;

module.exports = {
  cli,
  HELP_MESSAGE,
};
