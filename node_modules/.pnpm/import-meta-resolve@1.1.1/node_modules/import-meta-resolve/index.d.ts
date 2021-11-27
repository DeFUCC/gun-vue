/**
 * Provides a module-relative resolution function scoped to each module,
 * returning the URL string.
 * `import.meta.resolve` also accepts a second argument which is the parent
 * module from which to resolve from.
 *
 * This function is asynchronous because the ES module resolver in Node.js is
 * allowed to be asynchronous.
 *
 * @param {string} specifier The module specifier to resolve relative to parent.
 * @param {string} parent The absolute parent module URL to resolve from.
 *   You should pass `import.meta.url` or something else
 * @returns {Promise<string>}
 */
export function resolve(specifier: string, parent: string): Promise<string>
export {moduleResolve}
import {moduleResolve} from './lib/resolve.js'
