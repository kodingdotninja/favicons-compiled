// @ts-check

import favicons from "favicons-compiled";
import * as fs from "fs/promises";
import * as path from "path";

const cwd = (...rest) => path.join(process.cwd(), ...rest);

(async () => {
  const { files, images, html } = await favicons(cwd("./icon.png"), {
    path: "/",
    appName: "favicons-compiled",
    appShortName: "favicons-compiled",
    appDescription: "test favicons-compiled build",
    developerName: "favicons-compiled",
    developerURL: "https://github.com/kodingdotninja/favicons-compiled",
    background: "#171717",
    theme_color: "#171717",
    icons: { android: true, appleIcon: true, appleStartup: true, favicons: true, windows: true },
  });

  await Promise.all([
    ...[...files, ...images].map(({ contents, name }) => {
      return fs.writeFile(cwd("./dist", name), contents);
    }),
    fs.writeFile(cwd("./dist/head.html"), html),
  ]);
})();
