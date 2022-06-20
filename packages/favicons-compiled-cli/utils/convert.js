function _safeClosingTag(html) {
  const content = html.map((h) => h.replace(/>$/, " />")).join(" ");
  return content;
}

function htmltoAstroString(html) {
  const content = _safeClosingTag(html);
  return `---\n---\n\n${content}`;
}

function htmlToReactString(html, { defaultExport = false }) {
  const content = _safeClosingTag(html);
  const exportFn = defaultExport ? "export default" : "export";
  return `// @ts-ignore\n// eslint-disable\n${exportFn} function FaviconsMetaTags() { return <>${content}</>; }`;
}

module.exports = {
  htmltoAstroString,
  htmlToReactString,
};
