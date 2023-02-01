/**
 * Handle Markdown files
 * @module Md
 * @group Files
 * */

import yaml from "yamlify-object";
import markdown from "markdown-it";
import externalLinks from "markdown-it-external-links";
import { parse } from 'ultramatter'


export interface MdContent {
  frontmatter?: {
    title?: string
    icon?: string
    cover?: string
  };
  content?: string;
}

/**
 *  Merge markdown content with a frontmatter object and render to a string
 */
export function createMd({
  frontmatter = null,
  text = "",
}: {
  frontmatter?: object;
  text?: string;
}) {
  let front = "";
  if (frontmatter && typeof frontmatter == "object" && Object.keys(frontmatter).length > 0) {
    let yml = yaml(frontmatter);
    front = `---
${yml}---
 `;
  }
  return front + text;

}

/**
 * Parse text content of a markdown file into an object
 * @param file - Text form of an uploaded file
 * @returns An object with md frontmatter and content
 */
export function parseMd(file: string): MdContent {
  return parse(file)
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
