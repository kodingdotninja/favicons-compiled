<!-- markdownlint-disable MD033 MD036 MD041 -->

# favicons-compiled

Compiled [`favicons`](https://github.com/itgalaxy/favicons) package using [`@vercel/ncc`](https://github.com/vercel/ncc) 🏄‍♂️

```diff
- yarn add favicons
+ yarn add favicons-compiled
```

---

**Table of contents**

- [Reason](#reason)
- [Package Versions](#package-versions)
- [Usage](#usage)
- [CLI](#cli)
- [Roadmap](#roadmap)
- [License](#license)

---

## Reason

`favicons-compiled` attempts to reduce the number of needed dependencies on published package by compiling [`favicons`](https://github.com/itgalaxy/favicons) using [`@vercel/ncc`](https://github.com/vercel/ncc). The only dependency needed for `favicons-compiled` is [`sharp`](https://github.com/lovell/sharp).

## Package Versions

The latest build of `favicons-compiled` is using these package versions:

- [`favicons@7.0.0-beta.4`](https://www.npmjs.com/package/favicons/v/7.0.0-beta.3)
- [`sharp@^0`](https://www.npmjs.com/package/sharp)

View the [root `package.json`](./package.json) for more details.

## Usage

Instead of installing `favicons`, install `favicons-compiled` using either `npm` or `yarn`:

```sh
# using npm
npm install favicons-compiled

# using yarn
yarn add favicons-compiled
```

[Read more on `favicons` repository](https://github.com/itgalaxy/favicons) on how to use the package, or view the [bench example on this repository](./bench/test.js).

## CLI

Instead of using `favicons` or `favicons-compiled`, you can use [`favicons-compiled-cli`](https://www.npmjs.com/package/favicons-compiled-cli) and pass arguments to generate favicons on the go.

**Usage**

```sh
# using npx
npx favicons-compiled-cli -i icon.png -o out/

# with global install and custom configuration
yarn global add favicons-compiled-cli
favicons-compiled-cli -i icon.png -c config.json -o public/assets/

# with custom configration and long arguments
favicons-compiled-cli \
  --input icon.png \
  --config config.json \
  --output public/assets/ \
  --html public/meta-tags.html \
  --jsx components/meta-tags.jsx
```

**Arguments**

- `--input` or `-i`: Image input path (required)
- `--config` or `-c`: [JSON configuration file](https://github.com/itgalaxy/favicons)
- `--output` or `-o`: Generated assets destination (defaults to ./out)
- `--html`: Path to export HTML meta tags (e.g. favicons-meta-tags.html)
- `--jsx`: Path to export JSX component meta tags (e.g. favicons-meta-tags.jsx)

## Roadmap

- [x] Compile and test `favicons`
- [x] ~~Compile `favicons` with `sharp`~~
- [x] ~~Dedupe dependencies with yarn resolutions~~
- [ ] Merge compiled package with upstream

## License

- `favicons-compiled`: [MIT License, Copyright (c) 2022 Griko Nibras](./LICENSE)
- `favicons`: [MIT License](https://github.com/itgalaxy/favicons)
