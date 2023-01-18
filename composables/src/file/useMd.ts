/**
 * Handle Markdown files
 * @module useMd
 * */

import yaml from "yaml";
import markdown from "markdown-it";
import externalLinks from "markdown-it-external-links";

export interface MdContent {
  frontmatter?: object;
  content?: string;
}

/**
 *  Join markdown with frontmatter object and render to a string
 */
export function createMd({
  frontmatter = null,
  text = "",
}: {
  frontmatter?: object;
  text?: string;
}) {
  let front = "";
  if (typeof frontmatter == "object") {
    let yml = yaml.stringify(frontmatter);
    front = `---
${yml}---
 `;
    return front + text;
  }
}

/**
 * Parse text content of a markdown file into an object
 * @param file - Text form of an uploaded file
 * @returns An object with md frontmatter and content
 */
export function parseMd(file: string): MdContent {
  const yamlBlockPattern = /^(?:---)(.*?)(?:---|\.\.\.)(?:\n*\s*)(.*)/s;

  const md: MdContent = {
    frontmatter: {},
    content: "",
  };
  const yml = yamlBlockPattern.exec(file.trim());

  if (yml) {
    let frontmatter = yml[1];
    md.content = yml?.[2];
    try {
      md.frontmatter = yaml.parse(frontmatter);
    } catch { }
  }
  return md;
}


let md: markdown
/**
 * Markdown-it instance to parse MD content
 * @returns Markdown-it instance
 */
export function useMd() {
  if (!md) {
    md = new markdown({
      linkify: true,
      typographer: true,
    });

    md.use(externalLinks, {
      externalTarget: "_blank",
    });
  }
  return md;
}
