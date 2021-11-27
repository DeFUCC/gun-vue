'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MagicString = require('magic-string');
var estreeWalker = require('estree-walker');
var compilerCore = require('@vue/compiler-core');
var parser = require('@babel/parser');
var shared = require('@vue/shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var MagicString__default = /*#__PURE__*/_interopDefaultLegacy(MagicString);

const TO_VAR_SYMBOL = '$';
const TO_REF_SYMBOL = '$$';
const shorthands = ['ref', 'computed', 'shallowRef'];
const transformCheckRE = /[^\w]\$(?:\$|ref|computed|shallowRef)?\s*(\(|\<)/;
function shouldTransform(src) {
    return transformCheckRE.test(src);
}
function transform(src, { filename, sourceMap, parserPlugins, importHelpersFrom = 'vue' } = {}) {
    const plugins = parserPlugins || [];
    if (filename) {
        if (/\.tsx?$/.test(filename)) {
            plugins.push('typescript');
        }
        if (filename.endsWith('x')) {
            plugins.push('jsx');
        }
    }
    const ast = parser.parse(src, {
        sourceType: 'module',
        plugins
    });
    const s = new MagicString__default(src);
    const res = transformAST(ast.program, s);
    // inject helper imports
    if (res.importedHelpers.length) {
        s.prepend(`import { ${res.importedHelpers
            .map(h => `${h} as _${h}`)
            .join(', ')} } from '${importHelpersFrom}'\n`);
    }
    return Object.assign(Object.assign({}, res), { code: s.toString(), map: sourceMap
            ? s.generateMap({
                source: filename,
                hires: true,
                includeContent: true
            })
            : null });
}
function transformAST(ast, s, offset = 0, knownRefs, knownProps, rewritePropsOnly = false) {
    // TODO remove when out of experimental
    if (!rewritePropsOnly) {
        warnExperimental();
    }
    const importedHelpers = new Set();
    const rootScope = {};
    const scopeStack = [rootScope];
    let currentScope = rootScope;
    const excludedIds = new WeakSet();
    const parentStack = [];
    const propsLocalToPublicMap = Object.create(null);
    if (knownRefs) {
        for (const key of knownRefs) {
            rootScope[key] = true;
        }
    }
    if (knownProps) {
        for (const key in knownProps) {
            const { local } = knownProps[key];
            rootScope[local] = 'prop';
            propsLocalToPublicMap[local] = key;
        }
    }
    function error(msg, node) {
        if (rewritePropsOnly)
            return;
        const e = new Error(msg);
        e.node = node;
        throw e;
    }
    function helper(msg) {
        importedHelpers.add(msg);
        return `_${msg}`;
    }
    function registerBinding(id, isRef = false) {
        excludedIds.add(id);
        if (currentScope) {
            currentScope[id.name] = isRef;
        }
        else {
            error('registerBinding called without active scope, something is wrong.', id);
        }
    }
    const registerRefBinding = (id) => registerBinding(id, true);
    function walkScope(node, isRoot = false) {
        for (const stmt of node.body) {
            if (stmt.type === 'VariableDeclaration') {
                if (stmt.declare)
                    continue;
                for (const decl of stmt.declarations) {
                    let toVarCall;
                    const isCall = decl.init &&
                        decl.init.type === 'CallExpression' &&
                        decl.init.callee.type === 'Identifier';
                    if (isCall &&
                        (toVarCall = isToVarCall(decl.init.callee.name))) {
                        processRefDeclaration(toVarCall, decl.init, decl.id, stmt);
                    }
                    else {
                        const isProps = isRoot &&
                            isCall &&
                            decl.init.callee.name === 'defineProps';
                        for (const id of compilerCore.extractIdentifiers(decl.id)) {
                            if (isProps) {
                                // for defineProps destructure, only exclude them since they
                                // are already passed in as knownProps
                                excludedIds.add(id);
                            }
                            else {
                                registerBinding(id);
                            }
                        }
                    }
                }
            }
            else if (stmt.type === 'FunctionDeclaration' ||
                stmt.type === 'ClassDeclaration') {
                if (stmt.declare || !stmt.id)
                    continue;
                registerBinding(stmt.id);
            }
        }
    }
    function processRefDeclaration(method, call, id, statement) {
        excludedIds.add(call.callee);
        if (statement.kind !== 'let') {
            error(`${method}() bindings can only be declared with let`, call);
        }
        if (method === TO_VAR_SYMBOL) {
            // $
            // remove macro
            s.remove(call.callee.start + offset, call.callee.end + offset);
            if (id.type === 'Identifier') {
                // single variable
                registerRefBinding(id);
            }
            else if (id.type === 'ObjectPattern') {
                processRefObjectPattern(id, statement);
            }
            else if (id.type === 'ArrayPattern') {
                processRefArrayPattern(id, statement);
            }
        }
        else {
            // shorthands
            if (id.type === 'Identifier') {
                registerRefBinding(id);
                // replace call
                s.overwrite(call.start + offset, call.start + method.length + offset, helper(method.slice(1)));
            }
            else {
                error(`${method}() cannot be used with destructure patterns.`, call);
            }
        }
    }
    function processRefObjectPattern(pattern, statement) {
        for (const p of pattern.properties) {
            let nameId;
            if (p.type === 'ObjectProperty') {
                if (p.key.start === p.value.start) {
                    // shorthand { foo } --> { foo: __foo }
                    nameId = p.key;
                    s.appendLeft(nameId.end + offset, `: __${nameId.name}`);
                    if (p.value.type === 'Identifier') {
                        // avoid shorthand value identifier from being processed
                        excludedIds.add(p.value);
                    }
                    else if (p.value.type === 'AssignmentPattern' &&
                        p.value.left.type === 'Identifier') {
                        // { foo = 1 }
                        excludedIds.add(p.value.left);
                    }
                }
                else {
                    if (p.value.type === 'Identifier') {
                        // { foo: bar } --> { foo: __bar }
                        nameId = p.value;
                        s.prependRight(nameId.start + offset, `__`);
                    }
                    else if (p.value.type === 'ObjectPattern') {
                        processRefObjectPattern(p.value, statement);
                    }
                    else if (p.value.type === 'ArrayPattern') {
                        processRefArrayPattern(p.value, statement);
                    }
                    else if (p.value.type === 'AssignmentPattern') {
                        // { foo: bar = 1 } --> { foo: __bar = 1 }
                        nameId = p.value.left;
                        s.prependRight(nameId.start + offset, `__`);
                    }
                }
            }
            else {
                // rest element { ...foo } --> { ...__foo }
                nameId = p.argument;
                s.prependRight(nameId.start + offset, `__`);
            }
            if (nameId) {
                registerRefBinding(nameId);
                // append binding declarations after the parent statement
                s.appendLeft(statement.end + offset, `\nconst ${nameId.name} = ${helper('shallowRef')}(__${nameId.name});`);
            }
        }
    }
    function processRefArrayPattern(pattern, statement) {
        for (const e of pattern.elements) {
            if (!e)
                continue;
            let nameId;
            if (e.type === 'Identifier') {
                // [a] --> [__a]
                nameId = e;
            }
            else if (e.type === 'AssignmentPattern') {
                // [a = 1] --> [__a = 1]
                nameId = e.left;
            }
            else if (e.type === 'RestElement') {
                // [...a] --> [...__a]
                nameId = e.argument;
            }
            else if (e.type === 'ObjectPattern') {
                processRefObjectPattern(e, statement);
            }
            else if (e.type === 'ArrayPattern') {
                processRefArrayPattern(e, statement);
            }
            if (nameId) {
                registerRefBinding(nameId);
                // prefix original
                s.prependRight(nameId.start + offset, `__`);
                // append binding declarations after the parent statement
                s.appendLeft(statement.end + offset, `\nconst ${nameId.name} = ${helper('shallowRef')}(__${nameId.name});`);
            }
        }
    }
    function rewriteId(scope, id, parent, parentStack) {
        if (shared.hasOwn(scope, id.name)) {
            const bindingType = scope[id.name];
            if (bindingType) {
                const isProp = bindingType === 'prop';
                if (rewritePropsOnly && !isProp) {
                    return true;
                }
                // ref
                if (compilerCore.isStaticProperty(parent) && parent.shorthand) {
                    // let binding used in a property shorthand
                    // { foo } -> { foo: foo.value }
                    // { prop } -> { prop: __prop.prop }
                    // skip for destructure patterns
                    if (!parent.inPattern ||
                        compilerCore.isInDestructureAssignment(parent, parentStack)) {
                        if (isProp) {
                            s.appendLeft(id.end + offset, `: __props.${propsLocalToPublicMap[id.name]}`);
                        }
                        else {
                            s.appendLeft(id.end + offset, `: ${id.name}.value`);
                        }
                    }
                }
                else {
                    if (isProp) {
                        s.overwrite(id.start + offset, id.end + offset, `__props.${propsLocalToPublicMap[id.name]}`);
                    }
                    else {
                        s.appendLeft(id.end + offset, '.value');
                    }
                }
            }
            return true;
        }
        return false;
    }
    // check root scope first
    walkScope(ast, true);
    estreeWalker.walk(ast, {
        enter(node, parent) {
            parent && parentStack.push(parent);
            // function scopes
            if (compilerCore.isFunctionType(node)) {
                scopeStack.push((currentScope = {}));
                compilerCore.walkFunctionParams(node, registerBinding);
                if (node.body.type === 'BlockStatement') {
                    walkScope(node.body);
                }
                return;
            }
            // non-function block scopes
            if (node.type === 'BlockStatement' && !compilerCore.isFunctionType(parent)) {
                scopeStack.push((currentScope = {}));
                walkScope(node);
                return;
            }
            if (parent &&
                parent.type.startsWith('TS') &&
                parent.type !== 'TSAsExpression' &&
                parent.type !== 'TSNonNullExpression' &&
                parent.type !== 'TSTypeAssertion') {
                return this.skip();
            }
            if (node.type === 'Identifier' &&
                compilerCore.isReferencedIdentifier(node, parent, parentStack) &&
                !excludedIds.has(node)) {
                // walk up the scope chain to check if id should be appended .value
                let i = scopeStack.length;
                while (i--) {
                    if (rewriteId(scopeStack[i], node, parent, parentStack)) {
                        return;
                    }
                }
            }
            if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
                const callee = node.callee.name;
                const toVarCall = isToVarCall(callee);
                if (toVarCall && (!parent || parent.type !== 'VariableDeclarator')) {
                    return error(`${toVarCall} can only be used as the initializer of ` +
                        `a variable declaration.`, node);
                }
                if (callee === TO_REF_SYMBOL) {
                    s.remove(node.callee.start + offset, node.callee.end + offset);
                    return this.skip();
                }
                // TODO remove when out of experimental
                if (callee === '$raw') {
                    error(`$raw() has been replaced by $$(). ` +
                        `See ${RFC_LINK} for latest updates.`, node);
                }
                if (callee === '$fromRef') {
                    error(`$fromRef() has been replaced by $(). ` +
                        `See ${RFC_LINK} for latest updates.`, node);
                }
            }
        },
        leave(node, parent) {
            parent && parentStack.pop();
            if ((node.type === 'BlockStatement' && !compilerCore.isFunctionType(parent)) ||
                compilerCore.isFunctionType(node)) {
                scopeStack.pop();
                currentScope = scopeStack[scopeStack.length - 1] || null;
            }
        }
    });
    return {
        rootRefs: Object.keys(rootScope).filter(key => rootScope[key] === true),
        importedHelpers: [...importedHelpers]
    };
}
function isToVarCall(callee) {
    if (callee === TO_VAR_SYMBOL) {
        return TO_VAR_SYMBOL;
    }
    if (callee[0] === TO_VAR_SYMBOL && shorthands.includes(callee.slice(1))) {
        return callee;
    }
    return false;
}
const RFC_LINK = `https://github.com/vuejs/rfcs/discussions/369`;
const hasWarned = {};
function warnExperimental() {
    // eslint-disable-next-line
    if (typeof window !== 'undefined') {
        return;
    }
    warnOnce(`@vue/ref-transform is an experimental feature.\n` +
        `Experimental features may change behavior between patch versions.\n` +
        `It is recommended to pin your vue dependencies to exact versions to avoid breakage.\n` +
        `You can follow the proposal's status at ${RFC_LINK}.`);
}
function warnOnce(msg) {
    const isNodeProd = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';
    if (!isNodeProd && !false && !hasWarned[msg]) {
        hasWarned[msg] = true;
        warn(msg);
    }
}
function warn(msg) {
    console.warn(`\x1b[1m\x1b[33m[@vue/ref-transform]\x1b[0m\x1b[33m ${msg}\x1b[0m\n`);
}

exports.shouldTransform = shouldTransform;
exports.transform = transform;
exports.transformAST = transformAST;
