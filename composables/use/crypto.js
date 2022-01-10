/**
 * SEA cryptography abstraction
 * @module Crypto
 */

// https://github.com/amark/gun/wiki/Snippets

import { SEA } from "./gun";

/**
 * @typedef {Object} Entity
 * @property {String} pub - the public key
 * @property {String} epub - the elliplic encryption epub
 */

/**
 * Encrypt data for one receiver entity
 * 1. Generates encryption secret using bob's epub and current user pair
 * 2. Enctypts data with this secret
 * @param {String} data - Stringified data to be encrypted
 * @param {Entity} sender - An object with `pub` and `epub` strings - the user.is object of the reciever's account
 * @param {SEAPair} receiver - SEA Pair of the sender – `epriv` key will be used to encrypt the data
 * @returns {String} Encrypted data string to be sent
 */
export async function encFor(data, receiver, sender) {
  const secret = await SEA.secret(receiver.epub, sender);
  const encryptedData = await SEA.encrypt(data, secret);
  return encryptedData;
}

/**
 * Decrypt a private message from an entity
 * 1. Generates secret using senders `epub` and current user pair
 * 2. Decrypts the data with this secret
 * @param {String} data - Encrypted private data
 * @param {Entity} sender - An object with `pub` and `epub` strings - the user.is object of the sender's account
 * @param {SEAPair} receiver - SEA Pair of the receiver – `epriv` key will be used to encrypt the data
 * @returns {String} Decrypted data
 */
export async function decFrom(data, sender, receiver) {
  const secret = await SEA.secret(sender.epub, receiver);
  const decryptedData = await SEA.decrypt(data, secret);
  return decryptedData;
}
