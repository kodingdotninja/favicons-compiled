function htmlToReactString(html) {
  const content = html.map((h) => h.replace(/>$/, " />")).join(" ");
  return `// @ts-ignore\n// eslint-disable\nexport function FaviconsMetaTags() { return <>${content}</>; }`;
}

module.exports = {
  htmlToReactString,
};
