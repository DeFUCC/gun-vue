"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsnProp = exports.AsnType = void 0;
const converters = require("./converters");
const storage_1 = require("./storage");
const AsnType = (options) => (target) => {
    let schema;
    if (!storage_1.schemaStorage.has(target)) {
        schema = storage_1.schemaStorage.createDefault(target);
        storage_1.schemaStorage.set(target, schema);
    }
    else {
        schema = storage_1.schemaStorage.get(target);
    }
    Object.assign(schema, options);
};
exports.AsnType = AsnType;
const AsnProp = (options) => (target, propertyKey) => {
    let schema;
    if (!storage_1.schemaStorage.has(target.constructor)) {
        schema = storage_1.schemaStorage.createDefault(target.constructor);
        storage_1.schemaStorage.set(target.constructor, schema);
    }
    else {
        schema = storage_1.schemaStorage.get(target.constructor);
    }
    const copyOptions = Object.assign({}, options);
    if (typeof copyOptions.type === "number" && !copyOptions.converter) {
        const defaultConverter = converters.defaultConverter(options.type);
        if (!defaultConverter) {
            throw new Error(`Cannot get default converter for property '${propertyKey}' of ${target.constructor.name}`);
        }
        copyOptions.converter = defaultConverter;
    }
    schema.items[propertyKey] = copyOptions;
};
exports.AsnProp = AsnProp;
