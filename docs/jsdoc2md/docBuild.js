// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/Create-a-README-template

const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const path = require("path");

/* input and output paths */
const inputFile = "../composables/src/*.js";
const outputDir = __dirname;

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile });

console.log(templateData);

// /* reduce templateData to an array of class names */
// const classNames = templateData.reduce((classNames, identifier) => {
//   if (identifier.kind === "class") classNames.push(identifier.name);
//   return classNames;
// }, []);

// /* create a documentation file for each class */
// for (const className of classNames) {
//   const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
//   console.log(`rendering ${className}, template: ${template}`);
//   const output = jsdoc2md.renderSync({
//     data: templateData,
//     template: template,
//   });
//   fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
// }

//https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/Create-a-custom-partial
//https://github.com/jsdoc2md/jsdoc-to-markdown/wiki
//https://github.com/jsdoc2md/jsdoc-to-markdown/blob/0f0eba1c249a8893153ff9ba715bad6c708b2bfa/docs/API.md#module_jsdoc-to-markdown--JsdocToMarkdown+render
//https://github.com/jsdoc2md/dmd/blob/master/partials/shared/signature/sig-name.hbs
