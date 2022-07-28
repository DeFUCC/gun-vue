import { YAML, markdownIt, lib } from "./vendor.es.js";
function createMd({ frontmatter = null, text = "" } = md) {
  let front = "";
  if (typeof frontmatter == "object") {
    let yml = YAML.stringify(frontmatter);
    front = `---
${yml}---
 `;
    return front + text;
  }
}
function parseMd(file) {
  const yamlBlockPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)(?:\n*\s*)(.*)/s;
  const yml = yamlBlockPattern.exec(file.trim());
  let frontmatter, content;
  if (yml) {
    frontmatter = yml[1];
    content = yml == null ? void 0 : yml[2];
    try {
      frontmatter = YAML.parse(frontmatter);
    } catch {
      frontmatter = {};
    }
    return { frontmatter, content };
  } else {
    return { frontmatter: {}, content: file.trim() };
  }
}
function useMd() {
  const md2 = new markdownIt({
    linkify: true,
    typographer: true
  });
  md2.use(lib, {
    externalTarget: "_blank"
  });
  return md2;
}
export { createMd, parseMd, useMd };
