/**
 * Handle Markdown files
 * @module useMd
 * */

import yaml from "yaml";

/**
 *  Create markdown with frontmatter
 * @param {Object} md -  frontmatter,content
 * @returns Markdown file ready to download
 */

export function createMd({ frontmatter = null, content = "" } = md) {
  let front = "";
  if (typeof frontmatter == "object") {
    let yml = yaml.stringify(frontmatter);
    front = `---
 ${yml}---
 `;
    return front + content;
  }
}

/**
 * Parse text content of a markdown file into an object
 * @param {String} file - Text form of an uploaded file
 * @returns {Md} - An object with md frontmatter and content
 */
export function parseMd(file) {
  const yamlBlockPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)(?:\n*\s*)(.*)/s;
  const yml = yamlBlockPattern.exec(file.trim());
  let frontmatter, content;

  if (yml) {
    frontmatter = yml[1];
    content = yml?.[2];
    try {
      frontmatter = yaml.parse(frontmatter);
    } catch {}
    return { frontmatter, content };
  } else {
    return { content: file.trim() };
  }
}
