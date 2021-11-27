'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = exports.encode = exports.decode = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.mimeEncode = mimeEncode;
exports.mimeDecode = mimeDecode;
exports.base64Encode = base64Encode;
exports.base64Decode = base64Decode;
exports.quotedPrintableEncode = quotedPrintableEncode;
exports.quotedPrintableDecode = quotedPrintableDecode;
exports.mimeWordEncode = mimeWordEncode;
exports.mimeWordsEncode = mimeWordsEncode;
exports.mimeWordDecode = mimeWordDecode;
exports.mimeWordsDecode = mimeWordsDecode;
exports.foldLines = foldLines;
exports.headerLineEncode = headerLineEncode;
exports.headerLineDecode = headerLineDecode;
exports.headerLinesDecode = headerLinesDecode;
exports.parseHeaderValue = parseHeaderValue;
exports.continuationEncode = continuationEncode;

var _emailjsBase = require('emailjs-base64');

var _charset = require('./charset');

var _ramda = require('ramda');

// Lines can't be longer than 76 + <CR><LF> = 78 bytes
// http://tools.ietf.org/html/rfc2045#section-6.7
var MAX_LINE_LENGTH = 76;
var MAX_MIME_WORD_LENGTH = 52;
var MAX_B64_MIME_WORD_BYTE_LENGTH = 39;

/**
 * Encodes all non printable and non ascii bytes to =XX form, where XX is the
 * byte value in hex. This function does not convert linebreaks etc. it
 * only escapes character sequences
 *
 * @param {String|Uint8Array} data Either a string or an Uint8Array
 * @param {String} [fromCharset='UTF-8'] Source encoding
 * @return {String} Mime encoded string
 */
function mimeEncode() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fromCharset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTF-8';

  var buffer = (0, _charset.convert)(data, fromCharset);
  return buffer.reduce(function (aggregate, ord, index) {
    return _checkRanges(ord) && !((ord === 0x20 || ord === 0x09) && (index === buffer.length - 1 || buffer[index + 1] === 0x0a || buffer[index + 1] === 0x0d)) ? aggregate + String.fromCharCode(ord) // if the char is in allowed range, then keep as is, unless it is a ws in the end of a line
    : aggregate + '=' + (ord < 0x10 ? '0' : '') + ord.toString(16).toUpperCase();
  }, '');

  function _checkRanges(nr) {
    var ranges = [// https://tools.ietf.org/html/rfc2045#section-6.7
    [0x09], // <TAB>
    [0x0A], // <LF>
    [0x0D], // <CR>
    [0x20, 0x3C], // <SP>!"#$%&'()*+,-./0123456789:;
    [0x3E, 0x7E] // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
    ];
    return ranges.reduce(function (val, range) {
      return val || range.length === 1 && nr === range[0] || range.length === 2 && nr >= range[0] && nr <= range[1];
    }, false);
  }
}

/**
 * Decodes mime encoded string to an unicode string
 *
 * @param {String} str Mime encoded string
 * @param {String} [fromCharset='UTF-8'] Source encoding
 * @return {String} Decoded unicode string
 */
function mimeDecode() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fromCharset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTF-8';

  var encodedBytesCount = (str.match(/=[\da-fA-F]{2}/g) || []).length;
  var buffer = new Uint8Array(str.length - encodedBytesCount * 2);

  for (var i = 0, len = str.length, bufferPos = 0; i < len; i++) {
    var hex = str.substr(i + 1, 2);
    var chr = str.charAt(i);
    if (chr === '=' && hex && /[\da-fA-F]{2}/.test(hex)) {
      buffer[bufferPos++] = parseInt(hex, 16);
      i += 2;
    } else {
      buffer[bufferPos++] = chr.charCodeAt(0);
    }
  }

  return (0, _charset.decode)(buffer, fromCharset);
}

/**
 * Encodes a string or an typed array of given charset into unicode
 * base64 string. Also adds line breaks
 *
 * @param {String|Uint8Array} data String or typed array to be base64 encoded
 * @param {String} Initial charset, e.g. 'binary'. Defaults to 'UTF-8'
 * @return {String} Base64 encoded string
 */
function base64Encode(data) {
  var fromCharset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTF-8';

  var buf = typeof data !== 'string' && fromCharset === 'binary' ? data : (0, _charset.convert)(data, fromCharset);
  var b64 = (0, _emailjsBase.encode)(buf);
  return _addBase64SoftLinebreaks(b64);
}

/**
 * Decodes a base64 string of any charset into an unicode string
 *
 * @param {String} str Base64 encoded string
 * @param {String} [fromCharset='UTF-8'] Original charset of the base64 encoded string
 * @return {String} Decoded unicode string
 */
function base64Decode(str, fromCharset) {
  var buf = (0, _emailjsBase.decode)(str, _emailjsBase.OUTPUT_TYPED_ARRAY);
  return fromCharset === 'binary' ? (0, _charset.arr2str)(buf) : (0, _charset.decode)(buf, fromCharset);
}

/**
 * Encodes a string or an Uint8Array into a quoted printable encoding
 * This is almost the same as mimeEncode, except line breaks will be changed
 * as well to ensure that the lines are never longer than allowed length
 *
 * @param {String|Uint8Array} data String or an Uint8Array to mime encode
 * @param {String} [fromCharset='UTF-8'] Original charset of the string
 * @return {String} Mime encoded string
 */
function quotedPrintableEncode() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fromCharset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTF-8';

  var mimeEncodedStr = mimeEncode(data, fromCharset).replace(/\r?\n|\r/g, '\r\n') // fix line breaks, ensure <CR><LF>
  .replace(/[\t ]+$/gm, function (spaces) {
    return spaces.replace(/ /g, '=20').replace(/\t/g, '=09');
  }); // replace spaces in the end of lines

  return _addQPSoftLinebreaks(mimeEncodedStr); // add soft line breaks to ensure line lengths sjorter than 76 bytes
}

/**
 * Decodes a string from a quoted printable encoding. This is almost the
 * same as mimeDecode, except line breaks will be changed as well
 *
 * @param {String} str Mime encoded string to decode
 * @param {String} [fromCharset='UTF-8'] Original charset of the string
 * @return {String} Mime decoded string
 */
function quotedPrintableDecode() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fromCharset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTF-8';

  var rawString = str.replace(/[\t ]+$/gm, '') // remove invalid whitespace from the end of lines
  .replace(/=(?:\r?\n|$)/g, ''); // remove soft line breaks

  return mimeDecode(rawString, fromCharset);
}

/**
 * Encodes a string or an Uint8Array to an UTF-8 MIME Word
 *   https://tools.ietf.org/html/rfc2047
 *
 * @param {String|Uint8Array} data String to be encoded
 * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
 * @param {String} [fromCharset='UTF-8'] Source sharacter set
 * @return {String} Single or several mime words joined together
 */
function mimeWordEncode(data) {
  var mimeWordEncoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Q';
  var fromCharset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'UTF-8';

  var parts = [];
  var str = typeof data === 'string' ? data : (0, _charset.decode)(data, fromCharset);

  if (mimeWordEncoding === 'Q') {
    var _str = typeof data === 'string' ? data : (0, _charset.decode)(data, fromCharset);
    var encodedStr = (0, _ramda.pipe)(mimeEncode, qEncodeForbiddenHeaderChars)(_str);
    parts = encodedStr.length < MAX_MIME_WORD_LENGTH ? [encodedStr] : _splitMimeEncodedString(encodedStr, MAX_MIME_WORD_LENGTH);
  } else {
    // Fits as much as possible into every line without breaking utf-8 multibyte characters' octets up across lines
    var j = 0;
    var i = 0;
    while (i < str.length) {
      if ((0, _charset.encode)(str.substring(j, i)).length > MAX_B64_MIME_WORD_BYTE_LENGTH) {
        // we went one character too far, substring at the char before
        parts.push(str.substring(j, i - 1));
        j = i - 1;
      } else {
        i++;
      }
    }
    // add the remainder of the string
    str.substring(j) && parts.push(str.substring(j));
    parts = parts.map(_charset.encode).map(_emailjsBase.encode);
  }

  var prefix = '=?UTF-8?' + mimeWordEncoding + '?';
  var suffix = '?= ';
  return parts.map(function (p) {
    return prefix + p + suffix;
  }).join('').trim();
}

/**
 * Q-Encodes remaining forbidden header chars
 *   https://tools.ietf.org/html/rfc2047#section-5
 */
var qEncodeForbiddenHeaderChars = function qEncodeForbiddenHeaderChars(str) {
  var qEncode = function qEncode(chr) {
    return chr === ' ' ? '_' : '=' + (chr.charCodeAt(0) < 0x10 ? '0' : '') + chr.charCodeAt(0).toString(16).toUpperCase();
  };
  return str.replace(/[^a-z0-9!*+\-/=]/ig, qEncode);
};

/**
 * Finds word sequences with non ascii text and converts these to mime words
 *
 * @param {String|Uint8Array} data String to be encoded
 * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
 * @param {String} [fromCharset='UTF-8'] Source sharacter set
 * @return {String} String with possible mime words
 */
function mimeWordsEncode() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var mimeWordEncoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Q';
  var fromCharset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'UTF-8';

  var regex = /([^\s\u0080-\uFFFF]*[\u0080-\uFFFF]+[^\s\u0080-\uFFFF]*(?:\s+[^\s\u0080-\uFFFF]*[\u0080-\uFFFF]+[^\s\u0080-\uFFFF]*\s*)?)+(?=\s|$)/g;
  return (0, _charset.decode)((0, _charset.convert)(data, fromCharset)).replace(regex, function (match) {
    return match.length ? mimeWordEncode(match, mimeWordEncoding, fromCharset) : '';
  });
}

/**
 * Decode a complete mime word encoded string
 *
 * @param {String} str Mime word encoded string
 * @return {String} Decoded unicode string
 */
function mimeWordDecode() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var match = str.match(/^=\?([\w_\-*]+)\?([QqBb])\?([^?]*)\?=$/i);
  if (!match) return str;

  // RFC2231 added language tag to the encoding
  // see: https://tools.ietf.org/html/rfc2231#section-5
  // this implementation silently ignores this tag
  var fromCharset = match[1].split('*').shift();
  var encoding = (match[2] || 'Q').toString().toUpperCase();
  var rawString = (match[3] || '').replace(/_/g, ' ');

  if (encoding === 'B') {
    return base64Decode(rawString, fromCharset);
  } else if (encoding === 'Q') {
    return mimeDecode(rawString, fromCharset);
  } else {
    return str;
  }
}

/**
 * Decode a string that might include one or several mime words
 *
 * @param {String} str String including some mime words that will be encoded
 * @return {String} Decoded unicode string
 */
function mimeWordsDecode() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  str = str.toString().replace(/(=\?[^?]+\?[QqBb]\?[^?]+\?=)\s+(?==\?[^?]+\?[QqBb]\?[^?]*\?=)/g, '$1');
  // join bytes of multi-byte UTF-8
  var prevEncoding = void 0;
  str = str.replace(/(\?=)?=\?[uU][tT][fF]-8\?([QqBb])\?/g, function (match, endOfPrevWord, encoding) {
    var result = endOfPrevWord && encoding === prevEncoding ? '' : match;
    prevEncoding = encoding;
    return result;
  });
  str = str.replace(/=\?[\w_\-*]+\?[QqBb]\?[^?]*\?=/g, function (mimeWord) {
    return mimeWordDecode(mimeWord.replace(/\s+/g, ''));
  });

  return str;
}

/**
 * Folds long lines, useful for folding header lines (afterSpace=false) and
 * flowed text (afterSpace=true)
 *
 * @param {String} str String to be folded
 * @param {Boolean} afterSpace If true, leave a space in th end of a line
 * @return {String} String with folded lines
 */
function foldLines() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var afterSpace = arguments[1];

  var pos = 0;
  var len = str.length;
  var result = '';
  var line = void 0,
      match = void 0;

  while (pos < len) {
    line = str.substr(pos, MAX_LINE_LENGTH);
    if (line.length < MAX_LINE_LENGTH) {
      result += line;
      break;
    }
    if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
      line = match[0];
      result += line;
      pos += line.length;
      continue;
    } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || '').length : 0) < line.length) {
      line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || '').length : 0)));
    } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
      line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || '').length : 0));
    }

    result += line;
    pos += line.length;
    if (pos < len) {
      result += '\r\n';
    }
  }

  return result;
}

/**
 * Encodes and folds a header line for a MIME message header.
 * Shorthand for mimeWordsEncode + foldLines
 *
 * @param {String} key Key name, will not be encoded
 * @param {String|Uint8Array} value Value to be encoded
 * @param {String} [fromCharset='UTF-8'] Character set of the value
 * @return {String} encoded and folded header line
 */
function headerLineEncode(key, value, fromCharset) {
  var encodedValue = mimeWordsEncode(value, 'Q', fromCharset);
  return foldLines(key + ': ' + encodedValue);
}

/**
 * The result is not mime word decoded, you need to do your own decoding based
 * on the rules for the specific header key
 *
 * @param {String} headerLine Single header line, might include linebreaks as well if folded
 * @return {Object} And object of {key, value}
 */
function headerLineDecode() {
  var headerLine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var line = headerLine.toString().replace(/(?:\r?\n|\r)[ \t]*/g, ' ').trim();
  var match = line.match(/^\s*([^:]+):(.*)$/);

  return {
    key: (match && match[1] || '').trim(),
    value: (match && match[2] || '').trim()
  };
}

/**
 * Parses a block of header lines. Does not decode mime words as every
 * header might have its own rules (eg. formatted email addresses and such)
 *
 * @param {String} headers Headers string
 * @return {Object} An object of headers, where header keys are object keys. NB! Several values with the same key make up an Array
 */
function headerLinesDecode(headers) {
  var lines = headers.split(/\r?\n|\r/);
  var headersObj = {};

  for (var i = lines.length - 1; i >= 0; i--) {
    if (i && lines[i].match(/^\s/)) {
      lines[i - 1] += '\r\n' + lines[i];
      lines.splice(i, 1);
    }
  }

  for (var _i = 0, len = lines.length; _i < len; _i++) {
    var header = headerLineDecode(lines[_i]);
    var key = header.key.toLowerCase();
    var value = header.value;

    if (!headersObj[key]) {
      headersObj[key] = value;
    } else {
      headersObj[key] = [].concat(headersObj[key], value);
    }
  }

  return headersObj;
}

/**
 * Parses a header value with key=value arguments into a structured
 * object.
 *
 *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
 *   {
 *     'value': 'text/plain',
 *     'params': {
 *       'charset': 'UTF-8'
 *     }
 *   }
 *
 * @param {String} str Header value
 * @return {Object} Header value as a parsed structure
 */
function parseHeaderValue(str) {
  var response = {
    value: false,
    params: {}
  };
  var key = false;
  var value = '';
  var type = 'value';
  var quote = false;
  var escaped = false;
  var chr = void 0;

  for (var i = 0, len = str.length; i < len; i++) {
    chr = str.charAt(i);
    if (type === 'key') {
      if (chr === '=') {
        key = value.trim().toLowerCase();
        type = 'value';
        value = '';
        continue;
      }
      value += chr;
    } else {
      if (escaped) {
        value += chr;
      } else if (chr === '\\') {
        escaped = true;
        continue;
      } else if (quote && chr === quote) {
        quote = false;
      } else if (!quote && chr === '"') {
        quote = chr;
      } else if (!quote && chr === ';') {
        if (key === false) {
          response.value = value.trim();
        } else {
          response.params[key] = value.trim();
        }
        type = 'key';
        value = '';
      } else {
        value += chr;
      }
      escaped = false;
    }
  }

  if (type === 'value') {
    if (key === false) {
      response.value = value.trim();
    } else {
      response.params[key] = value.trim();
    }
  } else if (value.trim()) {
    response.params[value.trim().toLowerCase()] = '';
  }

  // handle parameter value continuations
  // https://tools.ietf.org/html/rfc2231#section-3

  // preprocess values
  Object.keys(response.params).forEach(function (key) {
    var actualKey, nr, match, value;
    if (match = key.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
      actualKey = key.substr(0, match.index);
      nr = Number(match[2] || match[3]) || 0;

      if (!response.params[actualKey] || _typeof(response.params[actualKey]) !== 'object') {
        response.params[actualKey] = {
          charset: false,
          values: []
        };
      }

      value = response.params[key];

      if (nr === 0 && match[0].substr(-1) === '*' && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
        response.params[actualKey].charset = match[1] || 'iso-8859-1';
        value = match[2];
      }

      response.params[actualKey].values[nr] = value;

      // remove the old reference
      delete response.params[key];
    }
  });

  // concatenate split rfc2231 strings and convert encoded strings to mime encoded words
  Object.keys(response.params).forEach(function (key) {
    var value;
    if (response.params[key] && Array.isArray(response.params[key].values)) {
      value = response.params[key].values.map(function (val) {
        return val || '';
      }).join('');

      if (response.params[key].charset) {
        // convert "%AB" to "=?charset?Q?=AB?="
        response.params[key] = '=?' + response.params[key].charset + '?Q?' + value.replace(/[=?_\s]/g, function (s) {
          // fix invalidly encoded chars
          var c = s.charCodeAt(0).toString(16);
          return s === ' ' ? '_' : '%' + (c.length < 2 ? '0' : '') + c;
        }).replace(/%/g, '=') + '?='; // change from urlencoding to percent encoding
      } else {
        response.params[key] = value;
      }
    }
  });

  return response;
}

/**
 * Encodes a string or an Uint8Array to an UTF-8 Parameter Value Continuation encoding (rfc2231)
 * Useful for splitting long parameter values.
 *
 * For example
 *      title="unicode string"
 * becomes
 *     title*0*="utf-8''unicode"
 *     title*1*="%20string"
 *
 * @param {String|Uint8Array} data String to be encoded
 * @param {Number} [maxLength=50] Max length for generated chunks
 * @param {String} [fromCharset='UTF-8'] Source sharacter set
 * @return {Array} A list of encoded keys and headers
 */
function continuationEncode(key, data, maxLength, fromCharset) {
  var list = [];
  var encodedStr = typeof data === 'string' ? data : (0, _charset.decode)(data, fromCharset);
  var line;

  maxLength = maxLength || 50;

  // process ascii only text
  if (/^[\w.\- ]*$/.test(data)) {
    // check if conversion is even needed
    if (encodedStr.length <= maxLength) {
      return [{
        key: key,
        value: /[\s";=]/.test(encodedStr) ? '"' + encodedStr + '"' : encodedStr
      }];
    }

    encodedStr = encodedStr.replace(new RegExp('.{' + maxLength + '}', 'g'), function (str) {
      list.push({
        line: str
      });
      return '';
    });

    if (encodedStr) {
      list.push({
        line: encodedStr
      });
    }
  } else {
    // process text with unicode or special chars
    var uriEncoded = encodeURIComponent('utf-8\'\'' + encodedStr);
    var i = 0;
    while (true) {
      var len = maxLength;
      // must not split hex encoded byte between lines
      if (uriEncoded[i + maxLength - 1] === '%') {
        len -= 1;
      } else if (uriEncoded[i + maxLength - 2] === '%') {
        len -= 2;
      }
      line = uriEncoded.substr(i, len);
      if (!line) {
        break;
      }
      list.push({
        line: line,
        encoded: true
      });
      i += line.length;
    }
  }

  return list.map(function (item, i) {
    return {
      // encoded lines: {name}*{part}*
      // unencoded lines: {name}*{part}
      // if any line needs to be encoded then the first line (part==0) is always encoded
      key: key + '*' + i + (item.encoded ? '*' : ''),
      value: /[\s";=]/.test(item.line) ? '"' + item.line + '"' : item.line
    };
  });
}

/**
 * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
 *
 * @param {String} str Mime encoded string to be split up
 * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
 * @return {Array} Split string
 */
function _splitMimeEncodedString(str) {
  var maxlen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

  var minWordLength = 12; // require at least 12 symbols to fit possible 4 octet UTF-8 sequences
  var maxWordLength = Math.max(maxlen, minWordLength);
  var lines = [];

  while (str.length) {
    var curLine = str.substr(0, maxWordLength);

    var match = curLine.match(/=[0-9A-F]?$/i); // skip incomplete escaped char
    if (match) {
      curLine = curLine.substr(0, match.index);
    }

    var done = false;
    while (!done) {
      var chr = void 0;
      done = true;
      var _match = str.substr(curLine.length).match(/^=([0-9A-F]{2})/i); // check if not middle of a unicode char sequence
      if (_match) {
        chr = parseInt(_match[1], 16);
        // invalid sequence, move one char back anc recheck
        if (chr < 0xC2 && chr > 0x7F) {
          curLine = curLine.substr(0, curLine.length - 3);
          done = false;
        }
      }
    }

    if (curLine.length) {
      lines.push(curLine);
    }
    str = str.substr(curLine.length);
  }

  return lines;
}

function _addBase64SoftLinebreaks() {
  var base64EncodedStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return base64EncodedStr.trim().replace(new RegExp('.{' + MAX_LINE_LENGTH + '}', 'g'), '$&\r\n').trim();
}

/**
 * Adds soft line breaks(the ones that will be stripped out when decoding QP)
 *
 * @param {String} qpEncodedStr String in Quoted-Printable encoding
 * @return {String} String with forced line breaks
 */
function _addQPSoftLinebreaks() {
  var qpEncodedStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var pos = 0;
  var len = qpEncodedStr.length;
  var lineMargin = Math.floor(MAX_LINE_LENGTH / 3);
  var result = '';
  var match = void 0,
      line = void 0;

  // insert soft linebreaks where needed
  while (pos < len) {
    line = qpEncodedStr.substr(pos, MAX_LINE_LENGTH);
    if (match = line.match(/\r\n/)) {
      line = line.substr(0, match.index + match[0].length);
      result += line;
      pos += line.length;
      continue;
    }

    if (line.substr(-1) === '\n') {
      // nothing to change here
      result += line;
      pos += line.length;
      continue;
    } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
      // truncate to nearest line break
      line = line.substr(0, line.length - (match[0].length - 1));
      result += line;
      pos += line.length;
      continue;
    } else if (line.length > MAX_LINE_LENGTH - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
      // truncate to nearest space
      line = line.substr(0, line.length - (match[0].length - 1));
    } else if (line.substr(-1) === '\r') {
      line = line.substr(0, line.length - 1);
    } else {
      if (line.match(/=[\da-f]{0,2}$/i)) {
        // push incomplete encoding sequences to the next line
        if (match = line.match(/=[\da-f]{0,1}$/i)) {
          line = line.substr(0, line.length - match[0].length);
        }

        // ensure that utf-8 sequences are not split
        while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/=[\da-f]{2}$/ig))) {
          var code = parseInt(match[0].substr(1, 2), 16);
          if (code < 128) {
            break;
          }

          line = line.substr(0, line.length - 3);

          if (code >= 0xC0) {
            break;
          }
        }
      }
    }

    if (pos + line.length < len && line.substr(-1) !== '\n') {
      if (line.length === MAX_LINE_LENGTH && line.match(/=[\da-f]{2}$/i)) {
        line = line.substr(0, line.length - 3);
      } else if (line.length === MAX_LINE_LENGTH) {
        line = line.substr(0, line.length - 1);
      }
      pos += line.length;
      line += '=\r\n';
    } else {
      pos += line.length;
    }

    result += line;
  }

  return result;
}

exports.decode = _charset.decode;
exports.encode = _charset.encode;
exports.convert = _charset.convert;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9taW1lY29kZWMuanMiXSwibmFtZXMiOlsibWltZUVuY29kZSIsIm1pbWVEZWNvZGUiLCJiYXNlNjRFbmNvZGUiLCJiYXNlNjREZWNvZGUiLCJxdW90ZWRQcmludGFibGVFbmNvZGUiLCJxdW90ZWRQcmludGFibGVEZWNvZGUiLCJtaW1lV29yZEVuY29kZSIsIm1pbWVXb3Jkc0VuY29kZSIsIm1pbWVXb3JkRGVjb2RlIiwibWltZVdvcmRzRGVjb2RlIiwiZm9sZExpbmVzIiwiaGVhZGVyTGluZUVuY29kZSIsImhlYWRlckxpbmVEZWNvZGUiLCJoZWFkZXJMaW5lc0RlY29kZSIsInBhcnNlSGVhZGVyVmFsdWUiLCJjb250aW51YXRpb25FbmNvZGUiLCJNQVhfTElORV9MRU5HVEgiLCJNQVhfTUlNRV9XT1JEX0xFTkdUSCIsIk1BWF9CNjRfTUlNRV9XT1JEX0JZVEVfTEVOR1RIIiwiZGF0YSIsImZyb21DaGFyc2V0IiwiYnVmZmVyIiwicmVkdWNlIiwiYWdncmVnYXRlIiwib3JkIiwiaW5kZXgiLCJfY2hlY2tSYW5nZXMiLCJsZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0b1N0cmluZyIsInRvVXBwZXJDYXNlIiwibnIiLCJyYW5nZXMiLCJ2YWwiLCJyYW5nZSIsInN0ciIsImVuY29kZWRCeXRlc0NvdW50IiwibWF0Y2giLCJVaW50OEFycmF5IiwiaSIsImxlbiIsImJ1ZmZlclBvcyIsImhleCIsInN1YnN0ciIsImNociIsImNoYXJBdCIsInRlc3QiLCJwYXJzZUludCIsImNoYXJDb2RlQXQiLCJidWYiLCJiNjQiLCJfYWRkQmFzZTY0U29mdExpbmVicmVha3MiLCJPVVRQVVRfVFlQRURfQVJSQVkiLCJtaW1lRW5jb2RlZFN0ciIsInJlcGxhY2UiLCJzcGFjZXMiLCJfYWRkUVBTb2Z0TGluZWJyZWFrcyIsInJhd1N0cmluZyIsIm1pbWVXb3JkRW5jb2RpbmciLCJwYXJ0cyIsImVuY29kZWRTdHIiLCJxRW5jb2RlRm9yYmlkZGVuSGVhZGVyQ2hhcnMiLCJfc3BsaXRNaW1lRW5jb2RlZFN0cmluZyIsImoiLCJzdWJzdHJpbmciLCJwdXNoIiwibWFwIiwiZW5jb2RlIiwiZW5jb2RlQmFzZTY0IiwicHJlZml4Iiwic3VmZml4IiwicCIsImpvaW4iLCJ0cmltIiwicUVuY29kZSIsInJlZ2V4Iiwic3BsaXQiLCJzaGlmdCIsImVuY29kaW5nIiwicHJldkVuY29kaW5nIiwiZW5kT2ZQcmV2V29yZCIsInJlc3VsdCIsIm1pbWVXb3JkIiwiYWZ0ZXJTcGFjZSIsInBvcyIsImxpbmUiLCJrZXkiLCJ2YWx1ZSIsImVuY29kZWRWYWx1ZSIsImhlYWRlckxpbmUiLCJoZWFkZXJzIiwibGluZXMiLCJoZWFkZXJzT2JqIiwic3BsaWNlIiwiaGVhZGVyIiwidG9Mb3dlckNhc2UiLCJjb25jYXQiLCJyZXNwb25zZSIsInBhcmFtcyIsInR5cGUiLCJxdW90ZSIsImVzY2FwZWQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImFjdHVhbEtleSIsIk51bWJlciIsImNoYXJzZXQiLCJ2YWx1ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzIiwiYyIsIm1heExlbmd0aCIsImxpc3QiLCJSZWdFeHAiLCJ1cmlFbmNvZGVkIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZW5jb2RlZCIsIml0ZW0iLCJtYXhsZW4iLCJtaW5Xb3JkTGVuZ3RoIiwibWF4V29yZExlbmd0aCIsIk1hdGgiLCJtYXgiLCJjdXJMaW5lIiwiZG9uZSIsImJhc2U2NEVuY29kZWRTdHIiLCJxcEVuY29kZWRTdHIiLCJsaW5lTWFyZ2luIiwiZmxvb3IiLCJjb2RlIiwiZGVjb2RlIiwiY29udmVydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBbUJnQkEsVSxHQUFBQSxVO1FBMEJBQyxVLEdBQUFBLFU7UUEwQkFDLFksR0FBQUEsWTtRQWFBQyxZLEdBQUFBLFk7UUFjQUMscUIsR0FBQUEscUI7UUFnQkFDLHFCLEdBQUFBLHFCO1FBaUJBQyxjLEdBQUFBLGM7UUFnREFDLGUsR0FBQUEsZTtRQVdBQyxjLEdBQUFBLGM7UUEwQkFDLGUsR0FBQUEsZTtRQXNCQUMsUyxHQUFBQSxTO1FBMENBQyxnQixHQUFBQSxnQjtRQVlBQyxnQixHQUFBQSxnQjtRQWlCQUMsaUIsR0FBQUEsaUI7UUF5Q0FDLGdCLEdBQUFBLGdCO1FBaUlBQyxrQixHQUFBQSxrQjs7QUEvZGhCOztBQUNBOztBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFNQyxrQkFBa0IsRUFBeEI7QUFDQSxJQUFNQyx1QkFBdUIsRUFBN0I7QUFDQSxJQUFNQyxnQ0FBZ0MsRUFBdEM7O0FBRUE7Ozs7Ozs7OztBQVNPLFNBQVNsQixVQUFULEdBQXVEO0FBQUEsTUFBbENtQixJQUFrQyx1RUFBM0IsRUFBMkI7QUFBQSxNQUF2QkMsV0FBdUIsdUVBQVQsT0FBUzs7QUFDNUQsTUFBTUMsU0FBUyxzQkFBUUYsSUFBUixFQUFjQyxXQUFkLENBQWY7QUFDQSxTQUFPQyxPQUFPQyxNQUFQLENBQWMsVUFBQ0MsU0FBRCxFQUFZQyxHQUFaLEVBQWlCQyxLQUFqQjtBQUFBLFdBQ25CQyxhQUFhRixHQUFiLEtBQXFCLEVBQUUsQ0FBQ0EsUUFBUSxJQUFSLElBQWdCQSxRQUFRLElBQXpCLE1BQW1DQyxVQUFVSixPQUFPTSxNQUFQLEdBQWdCLENBQTFCLElBQStCTixPQUFPSSxRQUFRLENBQWYsTUFBc0IsSUFBckQsSUFBNkRKLE9BQU9JLFFBQVEsQ0FBZixNQUFzQixJQUF0SCxDQUFGLENBQXJCLEdBQ0lGLFlBQVlLLE9BQU9DLFlBQVAsQ0FBb0JMLEdBQXBCLENBRGhCLENBQ3lDO0FBRHpDLE1BRUlELFlBQVksR0FBWixJQUFtQkMsTUFBTSxJQUFOLEdBQWEsR0FBYixHQUFtQixFQUF0QyxJQUE0Q0EsSUFBSU0sUUFBSixDQUFhLEVBQWIsRUFBaUJDLFdBQWpCLEVBSDdCO0FBQUEsR0FBZCxFQUcyRSxFQUgzRSxDQUFQOztBQUtBLFdBQVNMLFlBQVQsQ0FBdUJNLEVBQXZCLEVBQTJCO0FBQ3pCLFFBQU1DLFNBQVMsQ0FBRTtBQUNmLEtBQUMsSUFBRCxDQURhLEVBQ0w7QUFDUixLQUFDLElBQUQsQ0FGYSxFQUVMO0FBQ1IsS0FBQyxJQUFELENBSGEsRUFHTDtBQUNSLEtBQUMsSUFBRCxFQUFPLElBQVAsQ0FKYSxFQUlDO0FBQ2QsS0FBQyxJQUFELEVBQU8sSUFBUCxDQUxhLENBS0E7QUFMQSxLQUFmO0FBT0EsV0FBT0EsT0FBT1gsTUFBUCxDQUFjLFVBQUNZLEdBQUQsRUFBTUMsS0FBTjtBQUFBLGFBQWdCRCxPQUFRQyxNQUFNUixNQUFOLEtBQWlCLENBQWpCLElBQXNCSyxPQUFPRyxNQUFNLENBQU4sQ0FBckMsSUFBbURBLE1BQU1SLE1BQU4sS0FBaUIsQ0FBakIsSUFBc0JLLE1BQU1HLE1BQU0sQ0FBTixDQUE1QixJQUF3Q0gsTUFBTUcsTUFBTSxDQUFOLENBQWpIO0FBQUEsS0FBZCxFQUEwSSxLQUExSSxDQUFQO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OztBQU9PLFNBQVNsQyxVQUFULEdBQXNEO0FBQUEsTUFBakNtQyxHQUFpQyx1RUFBM0IsRUFBMkI7QUFBQSxNQUF2QmhCLFdBQXVCLHVFQUFULE9BQVM7O0FBQzNELE1BQU1pQixvQkFBb0IsQ0FBQ0QsSUFBSUUsS0FBSixDQUFVLGlCQUFWLEtBQWdDLEVBQWpDLEVBQXFDWCxNQUEvRDtBQUNBLE1BQUlOLFNBQVMsSUFBSWtCLFVBQUosQ0FBZUgsSUFBSVQsTUFBSixHQUFhVSxvQkFBb0IsQ0FBaEQsQ0FBYjs7QUFFQSxPQUFLLElBQUlHLElBQUksQ0FBUixFQUFXQyxNQUFNTCxJQUFJVCxNQUFyQixFQUE2QmUsWUFBWSxDQUE5QyxFQUFpREYsSUFBSUMsR0FBckQsRUFBMERELEdBQTFELEVBQStEO0FBQzdELFFBQUlHLE1BQU1QLElBQUlRLE1BQUosQ0FBV0osSUFBSSxDQUFmLEVBQWtCLENBQWxCLENBQVY7QUFDQSxRQUFNSyxNQUFNVCxJQUFJVSxNQUFKLENBQVdOLENBQVgsQ0FBWjtBQUNBLFFBQUlLLFFBQVEsR0FBUixJQUFlRixHQUFmLElBQXNCLGdCQUFnQkksSUFBaEIsQ0FBcUJKLEdBQXJCLENBQTFCLEVBQXFEO0FBQ25EdEIsYUFBT3FCLFdBQVAsSUFBc0JNLFNBQVNMLEdBQVQsRUFBYyxFQUFkLENBQXRCO0FBQ0FILFdBQUssQ0FBTDtBQUNELEtBSEQsTUFHTztBQUNMbkIsYUFBT3FCLFdBQVAsSUFBc0JHLElBQUlJLFVBQUosQ0FBZSxDQUFmLENBQXRCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLHFCQUFPNUIsTUFBUCxFQUFlRCxXQUFmLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTbEIsWUFBVCxDQUF1QmlCLElBQXZCLEVBQW9EO0FBQUEsTUFBdkJDLFdBQXVCLHVFQUFULE9BQVM7O0FBQ3pELE1BQU04QixNQUFPLE9BQU8vQixJQUFQLEtBQWdCLFFBQWhCLElBQTRCQyxnQkFBZ0IsUUFBN0MsR0FBeURELElBQXpELEdBQWdFLHNCQUFRQSxJQUFSLEVBQWNDLFdBQWQsQ0FBNUU7QUFDQSxNQUFNK0IsTUFBTSx5QkFBYUQsR0FBYixDQUFaO0FBQ0EsU0FBT0UseUJBQXlCRCxHQUF6QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPTyxTQUFTaEQsWUFBVCxDQUF1QmlDLEdBQXZCLEVBQTRCaEIsV0FBNUIsRUFBeUM7QUFDOUMsTUFBTThCLE1BQU0seUJBQWFkLEdBQWIsRUFBa0JpQiwrQkFBbEIsQ0FBWjtBQUNBLFNBQU9qQyxnQkFBZ0IsUUFBaEIsR0FBMkIsc0JBQVE4QixHQUFSLENBQTNCLEdBQTBDLHFCQUFPQSxHQUFQLEVBQVk5QixXQUFaLENBQWpEO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQVNPLFNBQVNoQixxQkFBVCxHQUFrRTtBQUFBLE1BQWxDZSxJQUFrQyx1RUFBM0IsRUFBMkI7QUFBQSxNQUF2QkMsV0FBdUIsdUVBQVQsT0FBUzs7QUFDdkUsTUFBTWtDLGlCQUFpQnRELFdBQVdtQixJQUFYLEVBQWlCQyxXQUFqQixFQUNwQm1DLE9BRG9CLENBQ1osV0FEWSxFQUNDLE1BREQsRUFDUztBQURULEdBRXBCQSxPQUZvQixDQUVaLFdBRlksRUFFQztBQUFBLFdBQVVDLE9BQU9ELE9BQVAsQ0FBZSxJQUFmLEVBQXFCLEtBQXJCLEVBQTRCQSxPQUE1QixDQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQUFWO0FBQUEsR0FGRCxDQUF2QixDQUR1RSxDQUdjOztBQUVyRixTQUFPRSxxQkFBcUJILGNBQXJCLENBQVAsQ0FMdUUsQ0FLM0I7QUFDN0M7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU2pELHFCQUFULEdBQWlFO0FBQUEsTUFBakMrQixHQUFpQyx1RUFBM0IsRUFBMkI7QUFBQSxNQUF2QmhCLFdBQXVCLHVFQUFULE9BQVM7O0FBQ3RFLE1BQU1zQyxZQUFZdEIsSUFDZm1CLE9BRGUsQ0FDUCxXQURPLEVBQ00sRUFETixFQUNVO0FBRFYsR0FFZkEsT0FGZSxDQUVQLGVBRk8sRUFFVSxFQUZWLENBQWxCLENBRHNFLENBR3RDOztBQUVoQyxTQUFPdEQsV0FBV3lELFNBQVgsRUFBc0J0QyxXQUF0QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQVNPLFNBQVNkLGNBQVQsQ0FBeUJhLElBQXpCLEVBQThFO0FBQUEsTUFBL0N3QyxnQkFBK0MsdUVBQTVCLEdBQTRCO0FBQUEsTUFBdkJ2QyxXQUF1Qix1RUFBVCxPQUFTOztBQUNuRixNQUFJd0MsUUFBUSxFQUFaO0FBQ0EsTUFBTXhCLE1BQU8sT0FBT2pCLElBQVAsS0FBZ0IsUUFBakIsR0FBNkJBLElBQTdCLEdBQW9DLHFCQUFPQSxJQUFQLEVBQWFDLFdBQWIsQ0FBaEQ7O0FBRUEsTUFBSXVDLHFCQUFxQixHQUF6QixFQUE4QjtBQUM1QixRQUFNdkIsT0FBTyxPQUFPakIsSUFBUCxLQUFnQixRQUFqQixHQUE2QkEsSUFBN0IsR0FBb0MscUJBQU9BLElBQVAsRUFBYUMsV0FBYixDQUFoRDtBQUNBLFFBQUl5QyxhQUFhLGlCQUFLN0QsVUFBTCxFQUFpQjhELDJCQUFqQixFQUE4QzFCLElBQTlDLENBQWpCO0FBQ0F3QixZQUFRQyxXQUFXbEMsTUFBWCxHQUFvQlYsb0JBQXBCLEdBQTJDLENBQUM0QyxVQUFELENBQTNDLEdBQTBERSx3QkFBd0JGLFVBQXhCLEVBQW9DNUMsb0JBQXBDLENBQWxFO0FBQ0QsR0FKRCxNQUlPO0FBQ0w7QUFDQSxRQUFJK0MsSUFBSSxDQUFSO0FBQ0EsUUFBSXhCLElBQUksQ0FBUjtBQUNBLFdBQU9BLElBQUlKLElBQUlULE1BQWYsRUFBdUI7QUFDckIsVUFBSSxxQkFBT1MsSUFBSTZCLFNBQUosQ0FBY0QsQ0FBZCxFQUFpQnhCLENBQWpCLENBQVAsRUFBNEJiLE1BQTVCLEdBQXFDVCw2QkFBekMsRUFBd0U7QUFDdEU7QUFDQTBDLGNBQU1NLElBQU4sQ0FBVzlCLElBQUk2QixTQUFKLENBQWNELENBQWQsRUFBaUJ4QixJQUFJLENBQXJCLENBQVg7QUFDQXdCLFlBQUl4QixJQUFJLENBQVI7QUFDRCxPQUpELE1BSU87QUFDTEE7QUFDRDtBQUNGO0FBQ0Q7QUFDQUosUUFBSTZCLFNBQUosQ0FBY0QsQ0FBZCxLQUFvQkosTUFBTU0sSUFBTixDQUFXOUIsSUFBSTZCLFNBQUosQ0FBY0QsQ0FBZCxDQUFYLENBQXBCO0FBQ0FKLFlBQVFBLE1BQU1PLEdBQU4sQ0FBVUMsZUFBVixFQUFrQkQsR0FBbEIsQ0FBc0JFLG1CQUF0QixDQUFSO0FBQ0Q7O0FBRUQsTUFBTUMsU0FBUyxhQUFhWCxnQkFBYixHQUFnQyxHQUEvQztBQUNBLE1BQU1ZLFNBQVMsS0FBZjtBQUNBLFNBQU9YLE1BQU1PLEdBQU4sQ0FBVTtBQUFBLFdBQUtHLFNBQVNFLENBQVQsR0FBYUQsTUFBbEI7QUFBQSxHQUFWLEVBQW9DRSxJQUFwQyxDQUF5QyxFQUF6QyxFQUE2Q0MsSUFBN0MsRUFBUDtBQUNEOztBQUVEOzs7O0FBSUEsSUFBTVosOEJBQThCLFNBQTlCQSwyQkFBOEIsQ0FBVTFCLEdBQVYsRUFBZTtBQUNqRCxNQUFNdUMsVUFBVSxTQUFWQSxPQUFVO0FBQUEsV0FBTzlCLFFBQVEsR0FBUixHQUFjLEdBQWQsR0FBcUIsT0FBT0EsSUFBSUksVUFBSixDQUFlLENBQWYsSUFBb0IsSUFBcEIsR0FBMkIsR0FBM0IsR0FBaUMsRUFBeEMsSUFBOENKLElBQUlJLFVBQUosQ0FBZSxDQUFmLEVBQWtCbkIsUUFBbEIsQ0FBMkIsRUFBM0IsRUFBK0JDLFdBQS9CLEVBQTFFO0FBQUEsR0FBaEI7QUFDQSxTQUFPSyxJQUFJbUIsT0FBSixDQUFZLG9CQUFaLEVBQWtDb0IsT0FBbEMsQ0FBUDtBQUNELENBSEQ7O0FBS0E7Ozs7Ozs7O0FBUU8sU0FBU3BFLGVBQVQsR0FBb0Y7QUFBQSxNQUExRFksSUFBMEQsdUVBQW5ELEVBQW1EO0FBQUEsTUFBL0N3QyxnQkFBK0MsdUVBQTVCLEdBQTRCO0FBQUEsTUFBdkJ2QyxXQUF1Qix1RUFBVCxPQUFTOztBQUN6RixNQUFNd0QsUUFBUSxxSUFBZDtBQUNBLFNBQU8scUJBQU8sc0JBQVF6RCxJQUFSLEVBQWNDLFdBQWQsQ0FBUCxFQUFtQ21DLE9BQW5DLENBQTJDcUIsS0FBM0MsRUFBa0Q7QUFBQSxXQUFTdEMsTUFBTVgsTUFBTixHQUFlckIsZUFBZWdDLEtBQWYsRUFBc0JxQixnQkFBdEIsRUFBd0N2QyxXQUF4QyxDQUFmLEdBQXNFLEVBQS9FO0FBQUEsR0FBbEQsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7QUFNTyxTQUFTWixjQUFULEdBQW1DO0FBQUEsTUFBVjRCLEdBQVUsdUVBQUosRUFBSTs7QUFDeEMsTUFBTUUsUUFBUUYsSUFBSUUsS0FBSixDQUFVLHlDQUFWLENBQWQ7QUFDQSxNQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPRixHQUFQOztBQUVaO0FBQ0E7QUFDQTtBQUNBLE1BQU1oQixjQUFja0IsTUFBTSxDQUFOLEVBQVN1QyxLQUFULENBQWUsR0FBZixFQUFvQkMsS0FBcEIsRUFBcEI7QUFDQSxNQUFNQyxXQUFXLENBQUN6QyxNQUFNLENBQU4sS0FBWSxHQUFiLEVBQWtCUixRQUFsQixHQUE2QkMsV0FBN0IsRUFBakI7QUFDQSxNQUFNMkIsWUFBWSxDQUFDcEIsTUFBTSxDQUFOLEtBQVksRUFBYixFQUFpQmlCLE9BQWpCLENBQXlCLElBQXpCLEVBQStCLEdBQS9CLENBQWxCOztBQUVBLE1BQUl3QixhQUFhLEdBQWpCLEVBQXNCO0FBQ3BCLFdBQU81RSxhQUFhdUQsU0FBYixFQUF3QnRDLFdBQXhCLENBQVA7QUFDRCxHQUZELE1BRU8sSUFBSTJELGFBQWEsR0FBakIsRUFBc0I7QUFDM0IsV0FBTzlFLFdBQVd5RCxTQUFYLEVBQXNCdEMsV0FBdEIsQ0FBUDtBQUNELEdBRk0sTUFFQTtBQUNMLFdBQU9nQixHQUFQO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7O0FBTU8sU0FBUzNCLGVBQVQsR0FBb0M7QUFBQSxNQUFWMkIsR0FBVSx1RUFBSixFQUFJOztBQUN6Q0EsUUFBTUEsSUFBSU4sUUFBSixHQUFleUIsT0FBZixDQUF1QixnRUFBdkIsRUFBeUYsSUFBekYsQ0FBTjtBQUNBO0FBQ0EsTUFBSXlCLHFCQUFKO0FBQ0E1QyxRQUFNQSxJQUFJbUIsT0FBSixDQUFZLHNDQUFaLEVBQW9ELFVBQUNqQixLQUFELEVBQVEyQyxhQUFSLEVBQXVCRixRQUF2QixFQUFvQztBQUM1RixRQUFNRyxTQUFVRCxpQkFBaUJGLGFBQWFDLFlBQS9CLEdBQStDLEVBQS9DLEdBQW9EMUMsS0FBbkU7QUFDQTBDLG1CQUFlRCxRQUFmO0FBQ0EsV0FBT0csTUFBUDtBQUNELEdBSkssQ0FBTjtBQUtBOUMsUUFBTUEsSUFBSW1CLE9BQUosQ0FBWSxpQ0FBWixFQUErQztBQUFBLFdBQVkvQyxlQUFlMkUsU0FBUzVCLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUIsRUFBekIsQ0FBZixDQUFaO0FBQUEsR0FBL0MsQ0FBTjs7QUFFQSxTQUFPbkIsR0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFPLFNBQVMxQixTQUFULEdBQTBDO0FBQUEsTUFBdEIwQixHQUFzQix1RUFBaEIsRUFBZ0I7QUFBQSxNQUFaZ0QsVUFBWTs7QUFDL0MsTUFBSUMsTUFBTSxDQUFWO0FBQ0EsTUFBTTVDLE1BQU1MLElBQUlULE1BQWhCO0FBQ0EsTUFBSXVELFNBQVMsRUFBYjtBQUNBLE1BQUlJLGFBQUo7QUFBQSxNQUFVaEQsY0FBVjs7QUFFQSxTQUFPK0MsTUFBTTVDLEdBQWIsRUFBa0I7QUFDaEI2QyxXQUFPbEQsSUFBSVEsTUFBSixDQUFXeUMsR0FBWCxFQUFnQnJFLGVBQWhCLENBQVA7QUFDQSxRQUFJc0UsS0FBSzNELE1BQUwsR0FBY1gsZUFBbEIsRUFBbUM7QUFDakNrRSxnQkFBVUksSUFBVjtBQUNBO0FBQ0Q7QUFDRCxRQUFLaEQsUUFBUWdELEtBQUtoRCxLQUFMLENBQVcscUJBQVgsQ0FBYixFQUFpRDtBQUMvQ2dELGFBQU9oRCxNQUFNLENBQU4sQ0FBUDtBQUNBNEMsZ0JBQVVJLElBQVY7QUFDQUQsYUFBT0MsS0FBSzNELE1BQVo7QUFDQTtBQUNELEtBTEQsTUFLTyxJQUFJLENBQUNXLFFBQVFnRCxLQUFLaEQsS0FBTCxDQUFXLGNBQVgsQ0FBVCxLQUF3Q0EsTUFBTSxDQUFOLEVBQVNYLE1BQVQsSUFBbUJ5RCxhQUFhLENBQUM5QyxNQUFNLENBQU4sS0FBWSxFQUFiLEVBQWlCWCxNQUE5QixHQUF1QyxDQUExRCxJQUErRDJELEtBQUszRCxNQUFoSCxFQUF3SDtBQUM3SDJELGFBQU9BLEtBQUsxQyxNQUFMLENBQVksQ0FBWixFQUFlMEMsS0FBSzNELE1BQUwsSUFBZVcsTUFBTSxDQUFOLEVBQVNYLE1BQVQsSUFBbUJ5RCxhQUFhLENBQUM5QyxNQUFNLENBQU4sS0FBWSxFQUFiLEVBQWlCWCxNQUE5QixHQUF1QyxDQUExRCxDQUFmLENBQWYsQ0FBUDtBQUNELEtBRk0sTUFFQSxJQUFLVyxRQUFRRixJQUFJUSxNQUFKLENBQVd5QyxNQUFNQyxLQUFLM0QsTUFBdEIsRUFBOEJXLEtBQTlCLENBQW9DLGNBQXBDLENBQWIsRUFBbUU7QUFDeEVnRCxhQUFPQSxPQUFPaEQsTUFBTSxDQUFOLEVBQVNNLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJOLE1BQU0sQ0FBTixFQUFTWCxNQUFULElBQW1CLENBQUN5RCxVQUFELEdBQWMsQ0FBQzlDLE1BQU0sQ0FBTixLQUFZLEVBQWIsRUFBaUJYLE1BQS9CLEdBQXdDLENBQTNELENBQW5CLENBQWQ7QUFDRDs7QUFFRHVELGNBQVVJLElBQVY7QUFDQUQsV0FBT0MsS0FBSzNELE1BQVo7QUFDQSxRQUFJMEQsTUFBTTVDLEdBQVYsRUFBZTtBQUNieUMsZ0JBQVUsTUFBVjtBQUNEO0FBQ0Y7O0FBRUQsU0FBT0EsTUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFTTyxTQUFTdkUsZ0JBQVQsQ0FBMkI0RSxHQUEzQixFQUFnQ0MsS0FBaEMsRUFBdUNwRSxXQUF2QyxFQUFvRDtBQUN6RCxNQUFJcUUsZUFBZWxGLGdCQUFnQmlGLEtBQWhCLEVBQXVCLEdBQXZCLEVBQTRCcEUsV0FBNUIsQ0FBbkI7QUFDQSxTQUFPVixVQUFVNkUsTUFBTSxJQUFOLEdBQWFFLFlBQXZCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVM3RSxnQkFBVCxHQUE0QztBQUFBLE1BQWpCOEUsVUFBaUIsdUVBQUosRUFBSTs7QUFDakQsTUFBTUosT0FBT0ksV0FBVzVELFFBQVgsR0FBc0J5QixPQUF0QixDQUE4QixxQkFBOUIsRUFBcUQsR0FBckQsRUFBMERtQixJQUExRCxFQUFiO0FBQ0EsTUFBTXBDLFFBQVFnRCxLQUFLaEQsS0FBTCxDQUFXLG1CQUFYLENBQWQ7O0FBRUEsU0FBTztBQUNMaUQsU0FBSyxDQUFFakQsU0FBU0EsTUFBTSxDQUFOLENBQVYsSUFBdUIsRUFBeEIsRUFBNEJvQyxJQUE1QixFQURBO0FBRUxjLFdBQU8sQ0FBRWxELFNBQVNBLE1BQU0sQ0FBTixDQUFWLElBQXVCLEVBQXhCLEVBQTRCb0MsSUFBNUI7QUFGRixHQUFQO0FBSUQ7O0FBRUQ7Ozs7Ozs7QUFPTyxTQUFTN0QsaUJBQVQsQ0FBNEI4RSxPQUE1QixFQUFxQztBQUMxQyxNQUFNQyxRQUFRRCxRQUFRZCxLQUFSLENBQWMsVUFBZCxDQUFkO0FBQ0EsTUFBTWdCLGFBQWEsRUFBbkI7O0FBRUEsT0FBSyxJQUFJckQsSUFBSW9ELE1BQU1qRSxNQUFOLEdBQWUsQ0FBNUIsRUFBK0JhLEtBQUssQ0FBcEMsRUFBdUNBLEdBQXZDLEVBQTRDO0FBQzFDLFFBQUlBLEtBQUtvRCxNQUFNcEQsQ0FBTixFQUFTRixLQUFULENBQWUsS0FBZixDQUFULEVBQWdDO0FBQzlCc0QsWUFBTXBELElBQUksQ0FBVixLQUFnQixTQUFTb0QsTUFBTXBELENBQU4sQ0FBekI7QUFDQW9ELFlBQU1FLE1BQU4sQ0FBYXRELENBQWIsRUFBZ0IsQ0FBaEI7QUFDRDtBQUNGOztBQUVELE9BQUssSUFBSUEsS0FBSSxDQUFSLEVBQVdDLE1BQU1tRCxNQUFNakUsTUFBNUIsRUFBb0NhLEtBQUlDLEdBQXhDLEVBQTZDRCxJQUE3QyxFQUFrRDtBQUNoRCxRQUFNdUQsU0FBU25GLGlCQUFpQmdGLE1BQU1wRCxFQUFOLENBQWpCLENBQWY7QUFDQSxRQUFNK0MsTUFBTVEsT0FBT1IsR0FBUCxDQUFXUyxXQUFYLEVBQVo7QUFDQSxRQUFNUixRQUFRTyxPQUFPUCxLQUFyQjs7QUFFQSxRQUFJLENBQUNLLFdBQVdOLEdBQVgsQ0FBTCxFQUFzQjtBQUNwQk0saUJBQVdOLEdBQVgsSUFBa0JDLEtBQWxCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xLLGlCQUFXTixHQUFYLElBQWtCLEdBQUdVLE1BQUgsQ0FBVUosV0FBV04sR0FBWCxDQUFWLEVBQTJCQyxLQUEzQixDQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBT0ssVUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7QUFlTyxTQUFTL0UsZ0JBQVQsQ0FBMkJzQixHQUEzQixFQUFnQztBQUNyQyxNQUFJOEQsV0FBVztBQUNiVixXQUFPLEtBRE07QUFFYlcsWUFBUTtBQUZLLEdBQWY7QUFJQSxNQUFJWixNQUFNLEtBQVY7QUFDQSxNQUFJQyxRQUFRLEVBQVo7QUFDQSxNQUFJWSxPQUFPLE9BQVg7QUFDQSxNQUFJQyxRQUFRLEtBQVo7QUFDQSxNQUFJQyxVQUFVLEtBQWQ7QUFDQSxNQUFJekQsWUFBSjs7QUFFQSxPQUFLLElBQUlMLElBQUksQ0FBUixFQUFXQyxNQUFNTCxJQUFJVCxNQUExQixFQUFrQ2EsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDSyxVQUFNVCxJQUFJVSxNQUFKLENBQVdOLENBQVgsQ0FBTjtBQUNBLFFBQUk0RCxTQUFTLEtBQWIsRUFBb0I7QUFDbEIsVUFBSXZELFFBQVEsR0FBWixFQUFpQjtBQUNmMEMsY0FBTUMsTUFBTWQsSUFBTixHQUFhc0IsV0FBYixFQUFOO0FBQ0FJLGVBQU8sT0FBUDtBQUNBWixnQkFBUSxFQUFSO0FBQ0E7QUFDRDtBQUNEQSxlQUFTM0MsR0FBVDtBQUNELEtBUkQsTUFRTztBQUNMLFVBQUl5RCxPQUFKLEVBQWE7QUFDWGQsaUJBQVMzQyxHQUFUO0FBQ0QsT0FGRCxNQUVPLElBQUlBLFFBQVEsSUFBWixFQUFrQjtBQUN2QnlELGtCQUFVLElBQVY7QUFDQTtBQUNELE9BSE0sTUFHQSxJQUFJRCxTQUFTeEQsUUFBUXdELEtBQXJCLEVBQTRCO0FBQ2pDQSxnQkFBUSxLQUFSO0FBQ0QsT0FGTSxNQUVBLElBQUksQ0FBQ0EsS0FBRCxJQUFVeEQsUUFBUSxHQUF0QixFQUEyQjtBQUNoQ3dELGdCQUFReEQsR0FBUjtBQUNELE9BRk0sTUFFQSxJQUFJLENBQUN3RCxLQUFELElBQVV4RCxRQUFRLEdBQXRCLEVBQTJCO0FBQ2hDLFlBQUkwQyxRQUFRLEtBQVosRUFBbUI7QUFDakJXLG1CQUFTVixLQUFULEdBQWlCQSxNQUFNZCxJQUFOLEVBQWpCO0FBQ0QsU0FGRCxNQUVPO0FBQ0x3QixtQkFBU0MsTUFBVCxDQUFnQlosR0FBaEIsSUFBdUJDLE1BQU1kLElBQU4sRUFBdkI7QUFDRDtBQUNEMEIsZUFBTyxLQUFQO0FBQ0FaLGdCQUFRLEVBQVI7QUFDRCxPQVJNLE1BUUE7QUFDTEEsaUJBQVMzQyxHQUFUO0FBQ0Q7QUFDRHlELGdCQUFVLEtBQVY7QUFDRDtBQUNGOztBQUVELE1BQUlGLFNBQVMsT0FBYixFQUFzQjtBQUNwQixRQUFJYixRQUFRLEtBQVosRUFBbUI7QUFDakJXLGVBQVNWLEtBQVQsR0FBaUJBLE1BQU1kLElBQU4sRUFBakI7QUFDRCxLQUZELE1BRU87QUFDTHdCLGVBQVNDLE1BQVQsQ0FBZ0JaLEdBQWhCLElBQXVCQyxNQUFNZCxJQUFOLEVBQXZCO0FBQ0Q7QUFDRixHQU5ELE1BTU8sSUFBSWMsTUFBTWQsSUFBTixFQUFKLEVBQWtCO0FBQ3ZCd0IsYUFBU0MsTUFBVCxDQUFnQlgsTUFBTWQsSUFBTixHQUFhc0IsV0FBYixFQUFoQixJQUE4QyxFQUE5QztBQUNEOztBQUVEO0FBQ0E7O0FBRUE7QUFDQU8sU0FBT0MsSUFBUCxDQUFZTixTQUFTQyxNQUFyQixFQUE2Qk0sT0FBN0IsQ0FBcUMsVUFBVWxCLEdBQVYsRUFBZTtBQUNsRCxRQUFJbUIsU0FBSixFQUFlMUUsRUFBZixFQUFtQk0sS0FBbkIsRUFBMEJrRCxLQUExQjtBQUNBLFFBQUtsRCxRQUFRaUQsSUFBSWpELEtBQUosQ0FBVSx5QkFBVixDQUFiLEVBQW9EO0FBQ2xEb0Usa0JBQVluQixJQUFJM0MsTUFBSixDQUFXLENBQVgsRUFBY04sTUFBTWIsS0FBcEIsQ0FBWjtBQUNBTyxXQUFLMkUsT0FBT3JFLE1BQU0sQ0FBTixLQUFZQSxNQUFNLENBQU4sQ0FBbkIsS0FBZ0MsQ0FBckM7O0FBRUEsVUFBSSxDQUFDNEQsU0FBU0MsTUFBVCxDQUFnQk8sU0FBaEIsQ0FBRCxJQUErQixRQUFPUixTQUFTQyxNQUFULENBQWdCTyxTQUFoQixDQUFQLE1BQXNDLFFBQXpFLEVBQW1GO0FBQ2pGUixpQkFBU0MsTUFBVCxDQUFnQk8sU0FBaEIsSUFBNkI7QUFDM0JFLG1CQUFTLEtBRGtCO0FBRTNCQyxrQkFBUTtBQUZtQixTQUE3QjtBQUlEOztBQUVEckIsY0FBUVUsU0FBU0MsTUFBVCxDQUFnQlosR0FBaEIsQ0FBUjs7QUFFQSxVQUFJdkQsT0FBTyxDQUFQLElBQVlNLE1BQU0sQ0FBTixFQUFTTSxNQUFULENBQWdCLENBQUMsQ0FBakIsTUFBd0IsR0FBcEMsS0FBNENOLFFBQVFrRCxNQUFNbEQsS0FBTixDQUFZLHNCQUFaLENBQXBELENBQUosRUFBOEY7QUFDNUY0RCxpQkFBU0MsTUFBVCxDQUFnQk8sU0FBaEIsRUFBMkJFLE9BQTNCLEdBQXFDdEUsTUFBTSxDQUFOLEtBQVksWUFBakQ7QUFDQWtELGdCQUFRbEQsTUFBTSxDQUFOLENBQVI7QUFDRDs7QUFFRDRELGVBQVNDLE1BQVQsQ0FBZ0JPLFNBQWhCLEVBQTJCRyxNQUEzQixDQUFrQzdFLEVBQWxDLElBQXdDd0QsS0FBeEM7O0FBRUE7QUFDQSxhQUFPVSxTQUFTQyxNQUFULENBQWdCWixHQUFoQixDQUFQO0FBQ0Q7QUFDRixHQXpCRDs7QUEyQkE7QUFDQWdCLFNBQU9DLElBQVAsQ0FBWU4sU0FBU0MsTUFBckIsRUFBNkJNLE9BQTdCLENBQXFDLFVBQVVsQixHQUFWLEVBQWU7QUFDbEQsUUFBSUMsS0FBSjtBQUNBLFFBQUlVLFNBQVNDLE1BQVQsQ0FBZ0JaLEdBQWhCLEtBQXdCdUIsTUFBTUMsT0FBTixDQUFjYixTQUFTQyxNQUFULENBQWdCWixHQUFoQixFQUFxQnNCLE1BQW5DLENBQTVCLEVBQXdFO0FBQ3RFckIsY0FBUVUsU0FBU0MsTUFBVCxDQUFnQlosR0FBaEIsRUFBcUJzQixNQUFyQixDQUE0QjFDLEdBQTVCLENBQWdDLFVBQVVqQyxHQUFWLEVBQWU7QUFDckQsZUFBT0EsT0FBTyxFQUFkO0FBQ0QsT0FGTyxFQUVMdUMsSUFGSyxDQUVBLEVBRkEsQ0FBUjs7QUFJQSxVQUFJeUIsU0FBU0MsTUFBVCxDQUFnQlosR0FBaEIsRUFBcUJxQixPQUF6QixFQUFrQztBQUNoQztBQUNBVixpQkFBU0MsTUFBVCxDQUFnQlosR0FBaEIsSUFBdUIsT0FBT1csU0FBU0MsTUFBVCxDQUFnQlosR0FBaEIsRUFBcUJxQixPQUE1QixHQUFzQyxLQUF0QyxHQUE4Q3BCLE1BQ2xFakMsT0FEa0UsQ0FDMUQsVUFEMEQsRUFDOUMsVUFBVXlELENBQVYsRUFBYTtBQUNoQztBQUNBLGNBQUlDLElBQUlELEVBQUUvRCxVQUFGLENBQWEsQ0FBYixFQUFnQm5CLFFBQWhCLENBQXlCLEVBQXpCLENBQVI7QUFDQSxpQkFBT2tGLE1BQU0sR0FBTixHQUFZLEdBQVosR0FBa0IsT0FBT0MsRUFBRXRGLE1BQUYsR0FBVyxDQUFYLEdBQWUsR0FBZixHQUFxQixFQUE1QixJQUFrQ3NGLENBQTNEO0FBQ0QsU0FMa0UsRUFNbEUxRCxPQU5rRSxDQU0xRCxJQU4wRCxFQU1wRCxHQU5vRCxDQUE5QyxHQU1DLElBTnhCLENBRmdDLENBUUg7QUFDOUIsT0FURCxNQVNPO0FBQ0wyQyxpQkFBU0MsTUFBVCxDQUFnQlosR0FBaEIsSUFBdUJDLEtBQXZCO0FBQ0Q7QUFDRjtBQUNGLEdBcEJEOztBQXNCQSxTQUFPVSxRQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztBQWVPLFNBQVNuRixrQkFBVCxDQUE2QndFLEdBQTdCLEVBQWtDcEUsSUFBbEMsRUFBd0MrRixTQUF4QyxFQUFtRDlGLFdBQW5ELEVBQWdFO0FBQ3JFLE1BQU0rRixPQUFPLEVBQWI7QUFDQSxNQUFJdEQsYUFBYSxPQUFPMUMsSUFBUCxLQUFnQixRQUFoQixHQUEyQkEsSUFBM0IsR0FBa0MscUJBQU9BLElBQVAsRUFBYUMsV0FBYixDQUFuRDtBQUNBLE1BQUlrRSxJQUFKOztBQUVBNEIsY0FBWUEsYUFBYSxFQUF6Qjs7QUFFQTtBQUNBLE1BQUksY0FBY25FLElBQWQsQ0FBbUI1QixJQUFuQixDQUFKLEVBQThCO0FBQzVCO0FBQ0EsUUFBSTBDLFdBQVdsQyxNQUFYLElBQXFCdUYsU0FBekIsRUFBb0M7QUFDbEMsYUFBTyxDQUFDO0FBQ04zQixhQUFLQSxHQURDO0FBRU5DLGVBQU8sVUFBVXpDLElBQVYsQ0FBZWMsVUFBZixJQUE2QixNQUFNQSxVQUFOLEdBQW1CLEdBQWhELEdBQXNEQTtBQUZ2RCxPQUFELENBQVA7QUFJRDs7QUFFREEsaUJBQWFBLFdBQVdOLE9BQVgsQ0FBbUIsSUFBSTZELE1BQUosQ0FBVyxPQUFPRixTQUFQLEdBQW1CLEdBQTlCLEVBQW1DLEdBQW5DLENBQW5CLEVBQTRELFVBQVU5RSxHQUFWLEVBQWU7QUFDdEYrRSxXQUFLakQsSUFBTCxDQUFVO0FBQ1JvQixjQUFNbEQ7QUFERSxPQUFWO0FBR0EsYUFBTyxFQUFQO0FBQ0QsS0FMWSxDQUFiOztBQU9BLFFBQUl5QixVQUFKLEVBQWdCO0FBQ2RzRCxXQUFLakQsSUFBTCxDQUFVO0FBQ1JvQixjQUFNekI7QUFERSxPQUFWO0FBR0Q7QUFDRixHQXJCRCxNQXFCTztBQUNMO0FBQ0EsUUFBTXdELGFBQWFDLG1CQUFtQixjQUFjekQsVUFBakMsQ0FBbkI7QUFDQSxRQUFJckIsSUFBSSxDQUFSO0FBQ0EsV0FBTyxJQUFQLEVBQWE7QUFDWCxVQUFJQyxNQUFNeUUsU0FBVjtBQUNBO0FBQ0EsVUFBSUcsV0FBVzdFLElBQUkwRSxTQUFKLEdBQWdCLENBQTNCLE1BQWtDLEdBQXRDLEVBQTJDO0FBQ3pDekUsZUFBTyxDQUFQO0FBQ0QsT0FGRCxNQUVPLElBQUk0RSxXQUFXN0UsSUFBSTBFLFNBQUosR0FBZ0IsQ0FBM0IsTUFBa0MsR0FBdEMsRUFBMkM7QUFDaER6RSxlQUFPLENBQVA7QUFDRDtBQUNENkMsYUFBTytCLFdBQVd6RSxNQUFYLENBQWtCSixDQUFsQixFQUFxQkMsR0FBckIsQ0FBUDtBQUNBLFVBQUksQ0FBQzZDLElBQUwsRUFBVztBQUNUO0FBQ0Q7QUFDRDZCLFdBQUtqRCxJQUFMLENBQVU7QUFDUm9CLGNBQU1BLElBREU7QUFFUmlDLGlCQUFTO0FBRkQsT0FBVjtBQUlBL0UsV0FBSzhDLEtBQUszRCxNQUFWO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPd0YsS0FBS2hELEdBQUwsQ0FBUyxVQUFVcUQsSUFBVixFQUFnQmhGLENBQWhCLEVBQW1CO0FBQ2pDLFdBQU87QUFDTDtBQUNBO0FBQ0E7QUFDQStDLFdBQUtBLE1BQU0sR0FBTixHQUFZL0MsQ0FBWixJQUFpQmdGLEtBQUtELE9BQUwsR0FBZSxHQUFmLEdBQXFCLEVBQXRDLENBSkE7QUFLTC9CLGFBQU8sVUFBVXpDLElBQVYsQ0FBZXlFLEtBQUtsQyxJQUFwQixJQUE0QixNQUFNa0MsS0FBS2xDLElBQVgsR0FBa0IsR0FBOUMsR0FBb0RrQyxLQUFLbEM7QUFMM0QsS0FBUDtBQU9ELEdBUk0sQ0FBUDtBQVNEOztBQUVEOzs7Ozs7O0FBT0EsU0FBU3ZCLHVCQUFULENBQWtDM0IsR0FBbEMsRUFBb0Q7QUFBQSxNQUFicUYsTUFBYSx1RUFBSixFQUFJOztBQUNsRCxNQUFNQyxnQkFBZ0IsRUFBdEIsQ0FEa0QsQ0FDekI7QUFDekIsTUFBTUMsZ0JBQWdCQyxLQUFLQyxHQUFMLENBQVNKLE1BQVQsRUFBaUJDLGFBQWpCLENBQXRCO0FBQ0EsTUFBTTlCLFFBQVEsRUFBZDs7QUFFQSxTQUFPeEQsSUFBSVQsTUFBWCxFQUFtQjtBQUNqQixRQUFJbUcsVUFBVTFGLElBQUlRLE1BQUosQ0FBVyxDQUFYLEVBQWMrRSxhQUFkLENBQWQ7O0FBRUEsUUFBTXJGLFFBQVF3RixRQUFReEYsS0FBUixDQUFjLGNBQWQsQ0FBZCxDQUhpQixDQUcyQjtBQUM1QyxRQUFJQSxLQUFKLEVBQVc7QUFDVHdGLGdCQUFVQSxRQUFRbEYsTUFBUixDQUFlLENBQWYsRUFBa0JOLE1BQU1iLEtBQXhCLENBQVY7QUFDRDs7QUFFRCxRQUFJc0csT0FBTyxLQUFYO0FBQ0EsV0FBTyxDQUFDQSxJQUFSLEVBQWM7QUFDWixVQUFJbEYsWUFBSjtBQUNBa0YsYUFBTyxJQUFQO0FBQ0EsVUFBTXpGLFNBQVFGLElBQUlRLE1BQUosQ0FBV2tGLFFBQVFuRyxNQUFuQixFQUEyQlcsS0FBM0IsQ0FBaUMsa0JBQWpDLENBQWQsQ0FIWSxDQUd1RDtBQUNuRSxVQUFJQSxNQUFKLEVBQVc7QUFDVE8sY0FBTUcsU0FBU1YsT0FBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FBTjtBQUNBO0FBQ0EsWUFBSU8sTUFBTSxJQUFOLElBQWNBLE1BQU0sSUFBeEIsRUFBOEI7QUFDNUJpRixvQkFBVUEsUUFBUWxGLE1BQVIsQ0FBZSxDQUFmLEVBQWtCa0YsUUFBUW5HLE1BQVIsR0FBaUIsQ0FBbkMsQ0FBVjtBQUNBb0csaUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJRCxRQUFRbkcsTUFBWixFQUFvQjtBQUNsQmlFLFlBQU0xQixJQUFOLENBQVc0RCxPQUFYO0FBQ0Q7QUFDRDFGLFVBQU1BLElBQUlRLE1BQUosQ0FBV2tGLFFBQVFuRyxNQUFuQixDQUFOO0FBQ0Q7O0FBRUQsU0FBT2lFLEtBQVA7QUFDRDs7QUFFRCxTQUFTeEMsd0JBQVQsR0FBMEQ7QUFBQSxNQUF2QjRFLGdCQUF1Qix1RUFBSixFQUFJOztBQUN4RCxTQUFPQSxpQkFBaUJ0RCxJQUFqQixHQUF3Qm5CLE9BQXhCLENBQWdDLElBQUk2RCxNQUFKLENBQVcsT0FBT3BHLGVBQVAsR0FBeUIsR0FBcEMsRUFBeUMsR0FBekMsQ0FBaEMsRUFBK0UsUUFBL0UsRUFBeUYwRCxJQUF6RixFQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFNBQVNqQixvQkFBVCxHQUFrRDtBQUFBLE1BQW5Cd0UsWUFBbUIsdUVBQUosRUFBSTs7QUFDaEQsTUFBSTVDLE1BQU0sQ0FBVjtBQUNBLE1BQU01QyxNQUFNd0YsYUFBYXRHLE1BQXpCO0FBQ0EsTUFBTXVHLGFBQWFOLEtBQUtPLEtBQUwsQ0FBV25ILGtCQUFrQixDQUE3QixDQUFuQjtBQUNBLE1BQUlrRSxTQUFTLEVBQWI7QUFDQSxNQUFJNUMsY0FBSjtBQUFBLE1BQVdnRCxhQUFYOztBQUVBO0FBQ0EsU0FBT0QsTUFBTTVDLEdBQWIsRUFBa0I7QUFDaEI2QyxXQUFPMkMsYUFBYXJGLE1BQWIsQ0FBb0J5QyxHQUFwQixFQUF5QnJFLGVBQXpCLENBQVA7QUFDQSxRQUFLc0IsUUFBUWdELEtBQUtoRCxLQUFMLENBQVcsTUFBWCxDQUFiLEVBQWtDO0FBQ2hDZ0QsYUFBT0EsS0FBSzFDLE1BQUwsQ0FBWSxDQUFaLEVBQWVOLE1BQU1iLEtBQU4sR0FBY2EsTUFBTSxDQUFOLEVBQVNYLE1BQXRDLENBQVA7QUFDQXVELGdCQUFVSSxJQUFWO0FBQ0FELGFBQU9DLEtBQUszRCxNQUFaO0FBQ0E7QUFDRDs7QUFFRCxRQUFJMkQsS0FBSzFDLE1BQUwsQ0FBWSxDQUFDLENBQWIsTUFBb0IsSUFBeEIsRUFBOEI7QUFDNUI7QUFDQXNDLGdCQUFVSSxJQUFWO0FBQ0FELGFBQU9DLEtBQUszRCxNQUFaO0FBQ0E7QUFDRCxLQUxELE1BS08sSUFBS1csUUFBUWdELEtBQUsxQyxNQUFMLENBQVksQ0FBQ3NGLFVBQWIsRUFBeUI1RixLQUF6QixDQUErQixRQUEvQixDQUFiLEVBQXdEO0FBQzdEO0FBQ0FnRCxhQUFPQSxLQUFLMUMsTUFBTCxDQUFZLENBQVosRUFBZTBDLEtBQUszRCxNQUFMLElBQWVXLE1BQU0sQ0FBTixFQUFTWCxNQUFULEdBQWtCLENBQWpDLENBQWYsQ0FBUDtBQUNBdUQsZ0JBQVVJLElBQVY7QUFDQUQsYUFBT0MsS0FBSzNELE1BQVo7QUFDQTtBQUNELEtBTk0sTUFNQSxJQUFJMkQsS0FBSzNELE1BQUwsR0FBY1gsa0JBQWtCa0gsVUFBaEMsS0FBK0M1RixRQUFRZ0QsS0FBSzFDLE1BQUwsQ0FBWSxDQUFDc0YsVUFBYixFQUF5QjVGLEtBQXpCLENBQStCLHVCQUEvQixDQUF2RCxDQUFKLEVBQXFIO0FBQzFIO0FBQ0FnRCxhQUFPQSxLQUFLMUMsTUFBTCxDQUFZLENBQVosRUFBZTBDLEtBQUszRCxNQUFMLElBQWVXLE1BQU0sQ0FBTixFQUFTWCxNQUFULEdBQWtCLENBQWpDLENBQWYsQ0FBUDtBQUNELEtBSE0sTUFHQSxJQUFJMkQsS0FBSzFDLE1BQUwsQ0FBWSxDQUFDLENBQWIsTUFBb0IsSUFBeEIsRUFBOEI7QUFDbkMwQyxhQUFPQSxLQUFLMUMsTUFBTCxDQUFZLENBQVosRUFBZTBDLEtBQUszRCxNQUFMLEdBQWMsQ0FBN0IsQ0FBUDtBQUNELEtBRk0sTUFFQTtBQUNMLFVBQUkyRCxLQUFLaEQsS0FBTCxDQUFXLGlCQUFYLENBQUosRUFBbUM7QUFDakM7QUFDQSxZQUFLQSxRQUFRZ0QsS0FBS2hELEtBQUwsQ0FBVyxpQkFBWCxDQUFiLEVBQTZDO0FBQzNDZ0QsaUJBQU9BLEtBQUsxQyxNQUFMLENBQVksQ0FBWixFQUFlMEMsS0FBSzNELE1BQUwsR0FBY1csTUFBTSxDQUFOLEVBQVNYLE1BQXRDLENBQVA7QUFDRDs7QUFFRDtBQUNBLGVBQU8yRCxLQUFLM0QsTUFBTCxHQUFjLENBQWQsSUFBbUIyRCxLQUFLM0QsTUFBTCxHQUFjYyxNQUFNNEMsR0FBdkMsSUFBOEMsQ0FBQ0MsS0FBS2hELEtBQUwsQ0FBVyx5QkFBWCxDQUEvQyxLQUF5RkEsUUFBUWdELEtBQUtoRCxLQUFMLENBQVcsZ0JBQVgsQ0FBakcsQ0FBUCxFQUF1STtBQUNySSxjQUFNOEYsT0FBT3BGLFNBQVNWLE1BQU0sQ0FBTixFQUFTTSxNQUFULENBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQVQsRUFBZ0MsRUFBaEMsQ0FBYjtBQUNBLGNBQUl3RixPQUFPLEdBQVgsRUFBZ0I7QUFDZDtBQUNEOztBQUVEOUMsaUJBQU9BLEtBQUsxQyxNQUFMLENBQVksQ0FBWixFQUFlMEMsS0FBSzNELE1BQUwsR0FBYyxDQUE3QixDQUFQOztBQUVBLGNBQUl5RyxRQUFRLElBQVosRUFBa0I7QUFDaEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJL0MsTUFBTUMsS0FBSzNELE1BQVgsR0FBb0JjLEdBQXBCLElBQTJCNkMsS0FBSzFDLE1BQUwsQ0FBWSxDQUFDLENBQWIsTUFBb0IsSUFBbkQsRUFBeUQ7QUFDdkQsVUFBSTBDLEtBQUszRCxNQUFMLEtBQWdCWCxlQUFoQixJQUFtQ3NFLEtBQUtoRCxLQUFMLENBQVcsZUFBWCxDQUF2QyxFQUFvRTtBQUNsRWdELGVBQU9BLEtBQUsxQyxNQUFMLENBQVksQ0FBWixFQUFlMEMsS0FBSzNELE1BQUwsR0FBYyxDQUE3QixDQUFQO0FBQ0QsT0FGRCxNQUVPLElBQUkyRCxLQUFLM0QsTUFBTCxLQUFnQlgsZUFBcEIsRUFBcUM7QUFDMUNzRSxlQUFPQSxLQUFLMUMsTUFBTCxDQUFZLENBQVosRUFBZTBDLEtBQUszRCxNQUFMLEdBQWMsQ0FBN0IsQ0FBUDtBQUNEO0FBQ0QwRCxhQUFPQyxLQUFLM0QsTUFBWjtBQUNBMkQsY0FBUSxPQUFSO0FBQ0QsS0FSRCxNQVFPO0FBQ0xELGFBQU9DLEtBQUszRCxNQUFaO0FBQ0Q7O0FBRUR1RCxjQUFVSSxJQUFWO0FBQ0Q7O0FBRUQsU0FBT0osTUFBUDtBQUNEOztRQUVRbUQsTSxHQUFBQSxlO1FBQVFqRSxNLEdBQUFBLGU7UUFBUWtFLE8sR0FBQUEsZ0IiLCJmaWxlIjoibWltZWNvZGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW5jb2RlIGFzIGVuY29kZUJhc2U2NCwgZGVjb2RlIGFzIGRlY29kZUJhc2U2NCwgT1VUUFVUX1RZUEVEX0FSUkFZIH0gZnJvbSAnZW1haWxqcy1iYXNlNjQnXG5pbXBvcnQgeyBlbmNvZGUsIGRlY29kZSwgY29udmVydCwgYXJyMnN0ciB9IGZyb20gJy4vY2hhcnNldCdcbmltcG9ydCB7IHBpcGUgfSBmcm9tICdyYW1kYSdcblxuLy8gTGluZXMgY2FuJ3QgYmUgbG9uZ2VyIHRoYW4gNzYgKyA8Q1I+PExGPiA9IDc4IGJ5dGVzXG4vLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyMDQ1I3NlY3Rpb24tNi43XG5jb25zdCBNQVhfTElORV9MRU5HVEggPSA3NlxuY29uc3QgTUFYX01JTUVfV09SRF9MRU5HVEggPSA1MlxuY29uc3QgTUFYX0I2NF9NSU1FX1dPUkRfQllURV9MRU5HVEggPSAzOVxuXG4vKipcbiAqIEVuY29kZXMgYWxsIG5vbiBwcmludGFibGUgYW5kIG5vbiBhc2NpaSBieXRlcyB0byA9WFggZm9ybSwgd2hlcmUgWFggaXMgdGhlXG4gKiBieXRlIHZhbHVlIGluIGhleC4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBjb252ZXJ0IGxpbmVicmVha3MgZXRjLiBpdFxuICogb25seSBlc2NhcGVzIGNoYXJhY3RlciBzZXF1ZW5jZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xVaW50OEFycmF5fSBkYXRhIEVpdGhlciBhIHN0cmluZyBvciBhbiBVaW50OEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zyb21DaGFyc2V0PSdVVEYtOCddIFNvdXJjZSBlbmNvZGluZ1xuICogQHJldHVybiB7U3RyaW5nfSBNaW1lIGVuY29kZWQgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaW1lRW5jb2RlIChkYXRhID0gJycsIGZyb21DaGFyc2V0ID0gJ1VURi04Jykge1xuICBjb25zdCBidWZmZXIgPSBjb252ZXJ0KGRhdGEsIGZyb21DaGFyc2V0KVxuICByZXR1cm4gYnVmZmVyLnJlZHVjZSgoYWdncmVnYXRlLCBvcmQsIGluZGV4KSA9PlxuICAgIF9jaGVja1JhbmdlcyhvcmQpICYmICEoKG9yZCA9PT0gMHgyMCB8fCBvcmQgPT09IDB4MDkpICYmIChpbmRleCA9PT0gYnVmZmVyLmxlbmd0aCAtIDEgfHwgYnVmZmVyW2luZGV4ICsgMV0gPT09IDB4MGEgfHwgYnVmZmVyW2luZGV4ICsgMV0gPT09IDB4MGQpKVxuICAgICAgPyBhZ2dyZWdhdGUgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKG9yZCkgLy8gaWYgdGhlIGNoYXIgaXMgaW4gYWxsb3dlZCByYW5nZSwgdGhlbiBrZWVwIGFzIGlzLCB1bmxlc3MgaXQgaXMgYSB3cyBpbiB0aGUgZW5kIG9mIGEgbGluZVxuICAgICAgOiBhZ2dyZWdhdGUgKyAnPScgKyAob3JkIDwgMHgxMCA/ICcwJyA6ICcnKSArIG9yZC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSwgJycpXG5cbiAgZnVuY3Rpb24gX2NoZWNrUmFuZ2VzIChucikge1xuICAgIGNvbnN0IHJhbmdlcyA9IFsgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIwNDUjc2VjdGlvbi02LjdcbiAgICAgIFsweDA5XSwgLy8gPFRBQj5cbiAgICAgIFsweDBBXSwgLy8gPExGPlxuICAgICAgWzB4MERdLCAvLyA8Q1I+XG4gICAgICBbMHgyMCwgMHgzQ10sIC8vIDxTUD4hXCIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7XG4gICAgICBbMHgzRSwgMHg3RV0gLy8gPj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXFxdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1cbiAgICBdXG4gICAgcmV0dXJuIHJhbmdlcy5yZWR1Y2UoKHZhbCwgcmFuZ2UpID0+IHZhbCB8fCAocmFuZ2UubGVuZ3RoID09PSAxICYmIG5yID09PSByYW5nZVswXSkgfHwgKHJhbmdlLmxlbmd0aCA9PT0gMiAmJiBuciA+PSByYW5nZVswXSAmJiBuciA8PSByYW5nZVsxXSksIGZhbHNlKVxuICB9XG59XG5cbi8qKlxuICogRGVjb2RlcyBtaW1lIGVuY29kZWQgc3RyaW5nIHRvIGFuIHVuaWNvZGUgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBNaW1lIGVuY29kZWQgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zyb21DaGFyc2V0PSdVVEYtOCddIFNvdXJjZSBlbmNvZGluZ1xuICogQHJldHVybiB7U3RyaW5nfSBEZWNvZGVkIHVuaWNvZGUgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaW1lRGVjb2RlIChzdHIgPSAnJywgZnJvbUNoYXJzZXQgPSAnVVRGLTgnKSB7XG4gIGNvbnN0IGVuY29kZWRCeXRlc0NvdW50ID0gKHN0ci5tYXRjaCgvPVtcXGRhLWZBLUZdezJ9L2cpIHx8IFtdKS5sZW5ndGhcbiAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGggLSBlbmNvZGVkQnl0ZXNDb3VudCAqIDIpXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGgsIGJ1ZmZlclBvcyA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCBoZXggPSBzdHIuc3Vic3RyKGkgKyAxLCAyKVxuICAgIGNvbnN0IGNociA9IHN0ci5jaGFyQXQoaSlcbiAgICBpZiAoY2hyID09PSAnPScgJiYgaGV4ICYmIC9bXFxkYS1mQS1GXXsyfS8udGVzdChoZXgpKSB7XG4gICAgICBidWZmZXJbYnVmZmVyUG9zKytdID0gcGFyc2VJbnQoaGV4LCAxNilcbiAgICAgIGkgKz0gMlxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXJbYnVmZmVyUG9zKytdID0gY2hyLmNoYXJDb2RlQXQoMClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVjb2RlKGJ1ZmZlciwgZnJvbUNoYXJzZXQpXG59XG5cbi8qKlxuICogRW5jb2RlcyBhIHN0cmluZyBvciBhbiB0eXBlZCBhcnJheSBvZiBnaXZlbiBjaGFyc2V0IGludG8gdW5pY29kZVxuICogYmFzZTY0IHN0cmluZy4gQWxzbyBhZGRzIGxpbmUgYnJlYWtzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8VWludDhBcnJheX0gZGF0YSBTdHJpbmcgb3IgdHlwZWQgYXJyYXkgdG8gYmUgYmFzZTY0IGVuY29kZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBJbml0aWFsIGNoYXJzZXQsIGUuZy4gJ2JpbmFyeScuIERlZmF1bHRzIHRvICdVVEYtOCdcbiAqIEByZXR1cm4ge1N0cmluZ30gQmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjRFbmNvZGUgKGRhdGEsIGZyb21DaGFyc2V0ID0gJ1VURi04Jykge1xuICBjb25zdCBidWYgPSAodHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIGZyb21DaGFyc2V0ID09PSAnYmluYXJ5JykgPyBkYXRhIDogY29udmVydChkYXRhLCBmcm9tQ2hhcnNldClcbiAgY29uc3QgYjY0ID0gZW5jb2RlQmFzZTY0KGJ1ZilcbiAgcmV0dXJuIF9hZGRCYXNlNjRTb2Z0TGluZWJyZWFrcyhiNjQpXG59XG5cbi8qKlxuICogRGVjb2RlcyBhIGJhc2U2NCBzdHJpbmcgb2YgYW55IGNoYXJzZXQgaW50byBhbiB1bmljb2RlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgQmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zyb21DaGFyc2V0PSdVVEYtOCddIE9yaWdpbmFsIGNoYXJzZXQgb2YgdGhlIGJhc2U2NCBlbmNvZGVkIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBEZWNvZGVkIHVuaWNvZGUgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjREZWNvZGUgKHN0ciwgZnJvbUNoYXJzZXQpIHtcbiAgY29uc3QgYnVmID0gZGVjb2RlQmFzZTY0KHN0ciwgT1VUUFVUX1RZUEVEX0FSUkFZKVxuICByZXR1cm4gZnJvbUNoYXJzZXQgPT09ICdiaW5hcnknID8gYXJyMnN0cihidWYpIDogZGVjb2RlKGJ1ZiwgZnJvbUNoYXJzZXQpXG59XG5cbi8qKlxuICogRW5jb2RlcyBhIHN0cmluZyBvciBhbiBVaW50OEFycmF5IGludG8gYSBxdW90ZWQgcHJpbnRhYmxlIGVuY29kaW5nXG4gKiBUaGlzIGlzIGFsbW9zdCB0aGUgc2FtZSBhcyBtaW1lRW5jb2RlLCBleGNlcHQgbGluZSBicmVha3Mgd2lsbCBiZSBjaGFuZ2VkXG4gKiBhcyB3ZWxsIHRvIGVuc3VyZSB0aGF0IHRoZSBsaW5lcyBhcmUgbmV2ZXIgbG9uZ2VyIHRoYW4gYWxsb3dlZCBsZW5ndGhcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xVaW50OEFycmF5fSBkYXRhIFN0cmluZyBvciBhbiBVaW50OEFycmF5IHRvIG1pbWUgZW5jb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zyb21DaGFyc2V0PSdVVEYtOCddIE9yaWdpbmFsIGNoYXJzZXQgb2YgdGhlIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBNaW1lIGVuY29kZWQgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdW90ZWRQcmludGFibGVFbmNvZGUgKGRhdGEgPSAnJywgZnJvbUNoYXJzZXQgPSAnVVRGLTgnKSB7XG4gIGNvbnN0IG1pbWVFbmNvZGVkU3RyID0gbWltZUVuY29kZShkYXRhLCBmcm9tQ2hhcnNldClcbiAgICAucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgJ1xcclxcbicpIC8vIGZpeCBsaW5lIGJyZWFrcywgZW5zdXJlIDxDUj48TEY+XG4gICAgLnJlcGxhY2UoL1tcXHQgXSskL2dtLCBzcGFjZXMgPT4gc3BhY2VzLnJlcGxhY2UoLyAvZywgJz0yMCcpLnJlcGxhY2UoL1xcdC9nLCAnPTA5JykpIC8vIHJlcGxhY2Ugc3BhY2VzIGluIHRoZSBlbmQgb2YgbGluZXNcblxuICByZXR1cm4gX2FkZFFQU29mdExpbmVicmVha3MobWltZUVuY29kZWRTdHIpIC8vIGFkZCBzb2Z0IGxpbmUgYnJlYWtzIHRvIGVuc3VyZSBsaW5lIGxlbmd0aHMgc2pvcnRlciB0aGFuIDc2IGJ5dGVzXG59XG5cbi8qKlxuICogRGVjb2RlcyBhIHN0cmluZyBmcm9tIGEgcXVvdGVkIHByaW50YWJsZSBlbmNvZGluZy4gVGhpcyBpcyBhbG1vc3QgdGhlXG4gKiBzYW1lIGFzIG1pbWVEZWNvZGUsIGV4Y2VwdCBsaW5lIGJyZWFrcyB3aWxsIGJlIGNoYW5nZWQgYXMgd2VsbFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgTWltZSBlbmNvZGVkIHN0cmluZyB0byBkZWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZnJvbUNoYXJzZXQ9J1VURi04J10gT3JpZ2luYWwgY2hhcnNldCBvZiB0aGUgc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IE1pbWUgZGVjb2RlZCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1b3RlZFByaW50YWJsZURlY29kZSAoc3RyID0gJycsIGZyb21DaGFyc2V0ID0gJ1VURi04Jykge1xuICBjb25zdCByYXdTdHJpbmcgPSBzdHJcbiAgICAucmVwbGFjZSgvW1xcdCBdKyQvZ20sICcnKSAvLyByZW1vdmUgaW52YWxpZCB3aGl0ZXNwYWNlIGZyb20gdGhlIGVuZCBvZiBsaW5lc1xuICAgIC5yZXBsYWNlKC89KD86XFxyP1xcbnwkKS9nLCAnJykgLy8gcmVtb3ZlIHNvZnQgbGluZSBicmVha3NcblxuICByZXR1cm4gbWltZURlY29kZShyYXdTdHJpbmcsIGZyb21DaGFyc2V0KVxufVxuXG4vKipcbiAqIEVuY29kZXMgYSBzdHJpbmcgb3IgYW4gVWludDhBcnJheSB0byBhbiBVVEYtOCBNSU1FIFdvcmRcbiAqICAgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIwNDdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xVaW50OEFycmF5fSBkYXRhIFN0cmluZyB0byBiZSBlbmNvZGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVdvcmRFbmNvZGluZz0nUScgRW5jb2RpbmcgZm9yIHRoZSBtaW1lIHdvcmQsIGVpdGhlciBRIG9yIEJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZnJvbUNoYXJzZXQ9J1VURi04J10gU291cmNlIHNoYXJhY3RlciBzZXRcbiAqIEByZXR1cm4ge1N0cmluZ30gU2luZ2xlIG9yIHNldmVyYWwgbWltZSB3b3JkcyBqb2luZWQgdG9nZXRoZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pbWVXb3JkRW5jb2RlIChkYXRhLCBtaW1lV29yZEVuY29kaW5nID0gJ1EnLCBmcm9tQ2hhcnNldCA9ICdVVEYtOCcpIHtcbiAgbGV0IHBhcnRzID0gW11cbiAgY29uc3Qgc3RyID0gKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgPyBkYXRhIDogZGVjb2RlKGRhdGEsIGZyb21DaGFyc2V0KVxuXG4gIGlmIChtaW1lV29yZEVuY29kaW5nID09PSAnUScpIHtcbiAgICBjb25zdCBzdHIgPSAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSA/IGRhdGEgOiBkZWNvZGUoZGF0YSwgZnJvbUNoYXJzZXQpXG4gICAgbGV0IGVuY29kZWRTdHIgPSBwaXBlKG1pbWVFbmNvZGUsIHFFbmNvZGVGb3JiaWRkZW5IZWFkZXJDaGFycykoc3RyKVxuICAgIHBhcnRzID0gZW5jb2RlZFN0ci5sZW5ndGggPCBNQVhfTUlNRV9XT1JEX0xFTkdUSCA/IFtlbmNvZGVkU3RyXSA6IF9zcGxpdE1pbWVFbmNvZGVkU3RyaW5nKGVuY29kZWRTdHIsIE1BWF9NSU1FX1dPUkRfTEVOR1RIKVxuICB9IGVsc2Uge1xuICAgIC8vIEZpdHMgYXMgbXVjaCBhcyBwb3NzaWJsZSBpbnRvIGV2ZXJ5IGxpbmUgd2l0aG91dCBicmVha2luZyB1dGYtOCBtdWx0aWJ5dGUgY2hhcmFjdGVycycgb2N0ZXRzIHVwIGFjcm9zcyBsaW5lc1xuICAgIGxldCBqID0gMFxuICAgIGxldCBpID0gMFxuICAgIHdoaWxlIChpIDwgc3RyLmxlbmd0aCkge1xuICAgICAgaWYgKGVuY29kZShzdHIuc3Vic3RyaW5nKGosIGkpKS5sZW5ndGggPiBNQVhfQjY0X01JTUVfV09SRF9CWVRFX0xFTkdUSCkge1xuICAgICAgICAvLyB3ZSB3ZW50IG9uZSBjaGFyYWN0ZXIgdG9vIGZhciwgc3Vic3RyaW5nIGF0IHRoZSBjaGFyIGJlZm9yZVxuICAgICAgICBwYXJ0cy5wdXNoKHN0ci5zdWJzdHJpbmcoaiwgaSAtIDEpKVxuICAgICAgICBqID0gaSAtIDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkrK1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgdGhlIHJlbWFpbmRlciBvZiB0aGUgc3RyaW5nXG4gICAgc3RyLnN1YnN0cmluZyhqKSAmJiBwYXJ0cy5wdXNoKHN0ci5zdWJzdHJpbmcoaikpXG4gICAgcGFydHMgPSBwYXJ0cy5tYXAoZW5jb2RlKS5tYXAoZW5jb2RlQmFzZTY0KVxuICB9XG5cbiAgY29uc3QgcHJlZml4ID0gJz0/VVRGLTg/JyArIG1pbWVXb3JkRW5jb2RpbmcgKyAnPydcbiAgY29uc3Qgc3VmZml4ID0gJz89ICdcbiAgcmV0dXJuIHBhcnRzLm1hcChwID0+IHByZWZpeCArIHAgKyBzdWZmaXgpLmpvaW4oJycpLnRyaW0oKVxufVxuXG4vKipcbiAqIFEtRW5jb2RlcyByZW1haW5pbmcgZm9yYmlkZGVuIGhlYWRlciBjaGFyc1xuICogICBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjA0NyNzZWN0aW9uLTVcbiAqL1xuY29uc3QgcUVuY29kZUZvcmJpZGRlbkhlYWRlckNoYXJzID0gZnVuY3Rpb24gKHN0cikge1xuICBjb25zdCBxRW5jb2RlID0gY2hyID0+IGNociA9PT0gJyAnID8gJ18nIDogKCc9JyArIChjaHIuY2hhckNvZGVBdCgwKSA8IDB4MTAgPyAnMCcgOiAnJykgKyBjaHIuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSlcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXmEtejAtOSEqK1xcLS89XS9pZywgcUVuY29kZSlcbn1cblxuLyoqXG4gKiBGaW5kcyB3b3JkIHNlcXVlbmNlcyB3aXRoIG5vbiBhc2NpaSB0ZXh0IGFuZCBjb252ZXJ0cyB0aGVzZSB0byBtaW1lIHdvcmRzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8VWludDhBcnJheX0gZGF0YSBTdHJpbmcgdG8gYmUgZW5jb2RlZFxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVXb3JkRW5jb2Rpbmc9J1EnIEVuY29kaW5nIGZvciB0aGUgbWltZSB3b3JkLCBlaXRoZXIgUSBvciBCXG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zyb21DaGFyc2V0PSdVVEYtOCddIFNvdXJjZSBzaGFyYWN0ZXIgc2V0XG4gKiBAcmV0dXJuIHtTdHJpbmd9IFN0cmluZyB3aXRoIHBvc3NpYmxlIG1pbWUgd29yZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pbWVXb3Jkc0VuY29kZSAoZGF0YSA9ICcnLCBtaW1lV29yZEVuY29kaW5nID0gJ1EnLCBmcm9tQ2hhcnNldCA9ICdVVEYtOCcpIHtcbiAgY29uc3QgcmVnZXggPSAvKFteXFxzXFx1MDA4MC1cXHVGRkZGXSpbXFx1MDA4MC1cXHVGRkZGXStbXlxcc1xcdTAwODAtXFx1RkZGRl0qKD86XFxzK1teXFxzXFx1MDA4MC1cXHVGRkZGXSpbXFx1MDA4MC1cXHVGRkZGXStbXlxcc1xcdTAwODAtXFx1RkZGRl0qXFxzKik/KSsoPz1cXHN8JCkvZ1xuICByZXR1cm4gZGVjb2RlKGNvbnZlcnQoZGF0YSwgZnJvbUNoYXJzZXQpKS5yZXBsYWNlKHJlZ2V4LCBtYXRjaCA9PiBtYXRjaC5sZW5ndGggPyBtaW1lV29yZEVuY29kZShtYXRjaCwgbWltZVdvcmRFbmNvZGluZywgZnJvbUNoYXJzZXQpIDogJycpXG59XG5cbi8qKlxuICogRGVjb2RlIGEgY29tcGxldGUgbWltZSB3b3JkIGVuY29kZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBNaW1lIHdvcmQgZW5jb2RlZCBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gRGVjb2RlZCB1bmljb2RlIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWltZVdvcmREZWNvZGUgKHN0ciA9ICcnKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9ePVxcPyhbXFx3X1xcLSpdKylcXD8oW1FxQmJdKVxcPyhbXj9dKilcXD89JC9pKVxuICBpZiAoIW1hdGNoKSByZXR1cm4gc3RyXG5cbiAgLy8gUkZDMjIzMSBhZGRlZCBsYW5ndWFnZSB0YWcgdG8gdGhlIGVuY29kaW5nXG4gIC8vIHNlZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIyMzEjc2VjdGlvbi01XG4gIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gc2lsZW50bHkgaWdub3JlcyB0aGlzIHRhZ1xuICBjb25zdCBmcm9tQ2hhcnNldCA9IG1hdGNoWzFdLnNwbGl0KCcqJykuc2hpZnQoKVxuICBjb25zdCBlbmNvZGluZyA9IChtYXRjaFsyXSB8fCAnUScpLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKVxuICBjb25zdCByYXdTdHJpbmcgPSAobWF0Y2hbM10gfHwgJycpLnJlcGxhY2UoL18vZywgJyAnKVxuXG4gIGlmIChlbmNvZGluZyA9PT0gJ0InKSB7XG4gICAgcmV0dXJuIGJhc2U2NERlY29kZShyYXdTdHJpbmcsIGZyb21DaGFyc2V0KVxuICB9IGVsc2UgaWYgKGVuY29kaW5nID09PSAnUScpIHtcbiAgICByZXR1cm4gbWltZURlY29kZShyYXdTdHJpbmcsIGZyb21DaGFyc2V0KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHJcbiAgfVxufVxuXG4vKipcbiAqIERlY29kZSBhIHN0cmluZyB0aGF0IG1pZ2h0IGluY2x1ZGUgb25lIG9yIHNldmVyYWwgbWltZSB3b3Jkc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIGluY2x1ZGluZyBzb21lIG1pbWUgd29yZHMgdGhhdCB3aWxsIGJlIGVuY29kZWRcbiAqIEByZXR1cm4ge1N0cmluZ30gRGVjb2RlZCB1bmljb2RlIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWltZVdvcmRzRGVjb2RlIChzdHIgPSAnJykge1xuICBzdHIgPSBzdHIudG9TdHJpbmcoKS5yZXBsYWNlKC8oPVxcP1teP10rXFw/W1FxQmJdXFw/W14/XStcXD89KVxccysoPz09XFw/W14/XStcXD9bUXFCYl1cXD9bXj9dKlxcPz0pL2csICckMScpXG4gIC8vIGpvaW4gYnl0ZXMgb2YgbXVsdGktYnl0ZSBVVEYtOFxuICBsZXQgcHJldkVuY29kaW5nXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oXFw/PSk/PVxcP1t1VV1bdFRdW2ZGXS04XFw/KFtRcUJiXSlcXD8vZywgKG1hdGNoLCBlbmRPZlByZXZXb3JkLCBlbmNvZGluZykgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IChlbmRPZlByZXZXb3JkICYmIGVuY29kaW5nID09PSBwcmV2RW5jb2RpbmcpID8gJycgOiBtYXRjaFxuICAgIHByZXZFbmNvZGluZyA9IGVuY29kaW5nXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxuICBzdHIgPSBzdHIucmVwbGFjZSgvPVxcP1tcXHdfXFwtKl0rXFw/W1FxQmJdXFw/W14/XSpcXD89L2csIG1pbWVXb3JkID0+IG1pbWVXb3JkRGVjb2RlKG1pbWVXb3JkLnJlcGxhY2UoL1xccysvZywgJycpKSlcblxuICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogRm9sZHMgbG9uZyBsaW5lcywgdXNlZnVsIGZvciBmb2xkaW5nIGhlYWRlciBsaW5lcyAoYWZ0ZXJTcGFjZT1mYWxzZSkgYW5kXG4gKiBmbG93ZWQgdGV4dCAoYWZ0ZXJTcGFjZT10cnVlKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIGJlIGZvbGRlZFxuICogQHBhcmFtIHtCb29sZWFufSBhZnRlclNwYWNlIElmIHRydWUsIGxlYXZlIGEgc3BhY2UgaW4gdGggZW5kIG9mIGEgbGluZVxuICogQHJldHVybiB7U3RyaW5nfSBTdHJpbmcgd2l0aCBmb2xkZWQgbGluZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvbGRMaW5lcyAoc3RyID0gJycsIGFmdGVyU3BhY2UpIHtcbiAgbGV0IHBvcyA9IDBcbiAgY29uc3QgbGVuID0gc3RyLmxlbmd0aFxuICBsZXQgcmVzdWx0ID0gJydcbiAgbGV0IGxpbmUsIG1hdGNoXG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGxpbmUgPSBzdHIuc3Vic3RyKHBvcywgTUFYX0xJTkVfTEVOR1RIKVxuICAgIGlmIChsaW5lLmxlbmd0aCA8IE1BWF9MSU5FX0xFTkdUSCkge1xuICAgICAgcmVzdWx0ICs9IGxpbmVcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBsaW5lLm1hdGNoKC9eW15cXG5cXHJdKihcXHI/XFxufFxccikvKSkpIHtcbiAgICAgIGxpbmUgPSBtYXRjaFswXVxuICAgICAgcmVzdWx0ICs9IGxpbmVcbiAgICAgIHBvcyArPSBsaW5lLmxlbmd0aFxuICAgICAgY29udGludWVcbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IGxpbmUubWF0Y2goLyhcXHMrKVteXFxzXSokLykpICYmIG1hdGNoWzBdLmxlbmd0aCAtIChhZnRlclNwYWNlID8gKG1hdGNoWzFdIHx8ICcnKS5sZW5ndGggOiAwKSA8IGxpbmUubGVuZ3RoKSB7XG4gICAgICBsaW5lID0gbGluZS5zdWJzdHIoMCwgbGluZS5sZW5ndGggLSAobWF0Y2hbMF0ubGVuZ3RoIC0gKGFmdGVyU3BhY2UgPyAobWF0Y2hbMV0gfHwgJycpLmxlbmd0aCA6IDApKSlcbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IHN0ci5zdWJzdHIocG9zICsgbGluZS5sZW5ndGgpLm1hdGNoKC9eW15cXHNdKyhcXHMqKS8pKSkge1xuICAgICAgbGluZSA9IGxpbmUgKyBtYXRjaFswXS5zdWJzdHIoMCwgbWF0Y2hbMF0ubGVuZ3RoIC0gKCFhZnRlclNwYWNlID8gKG1hdGNoWzFdIHx8ICcnKS5sZW5ndGggOiAwKSlcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gbGluZVxuICAgIHBvcyArPSBsaW5lLmxlbmd0aFxuICAgIGlmIChwb3MgPCBsZW4pIHtcbiAgICAgIHJlc3VsdCArPSAnXFxyXFxuJ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGFuZCBmb2xkcyBhIGhlYWRlciBsaW5lIGZvciBhIE1JTUUgbWVzc2FnZSBoZWFkZXIuXG4gKiBTaG9ydGhhbmQgZm9yIG1pbWVXb3Jkc0VuY29kZSArIGZvbGRMaW5lc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IG5hbWUsIHdpbGwgbm90IGJlIGVuY29kZWRcbiAqIEBwYXJhbSB7U3RyaW5nfFVpbnQ4QXJyYXl9IHZhbHVlIFZhbHVlIHRvIGJlIGVuY29kZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZnJvbUNoYXJzZXQ9J1VURi04J10gQ2hhcmFjdGVyIHNldCBvZiB0aGUgdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ30gZW5jb2RlZCBhbmQgZm9sZGVkIGhlYWRlciBsaW5lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZWFkZXJMaW5lRW5jb2RlIChrZXksIHZhbHVlLCBmcm9tQ2hhcnNldCkge1xuICB2YXIgZW5jb2RlZFZhbHVlID0gbWltZVdvcmRzRW5jb2RlKHZhbHVlLCAnUScsIGZyb21DaGFyc2V0KVxuICByZXR1cm4gZm9sZExpbmVzKGtleSArICc6ICcgKyBlbmNvZGVkVmFsdWUpXG59XG5cbi8qKlxuICogVGhlIHJlc3VsdCBpcyBub3QgbWltZSB3b3JkIGRlY29kZWQsIHlvdSBuZWVkIHRvIGRvIHlvdXIgb3duIGRlY29kaW5nIGJhc2VkXG4gKiBvbiB0aGUgcnVsZXMgZm9yIHRoZSBzcGVjaWZpYyBoZWFkZXIga2V5XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlckxpbmUgU2luZ2xlIGhlYWRlciBsaW5lLCBtaWdodCBpbmNsdWRlIGxpbmVicmVha3MgYXMgd2VsbCBpZiBmb2xkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gQW5kIG9iamVjdCBvZiB7a2V5LCB2YWx1ZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWRlckxpbmVEZWNvZGUgKGhlYWRlckxpbmUgPSAnJykge1xuICBjb25zdCBsaW5lID0gaGVhZGVyTGluZS50b1N0cmluZygpLnJlcGxhY2UoLyg/Olxccj9cXG58XFxyKVsgXFx0XSovZywgJyAnKS50cmltKClcbiAgY29uc3QgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eXFxzKihbXjpdKyk6KC4qKSQvKVxuXG4gIHJldHVybiB7XG4gICAga2V5OiAoKG1hdGNoICYmIG1hdGNoWzFdKSB8fCAnJykudHJpbSgpLFxuICAgIHZhbHVlOiAoKG1hdGNoICYmIG1hdGNoWzJdKSB8fCAnJykudHJpbSgpXG4gIH1cbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBibG9jayBvZiBoZWFkZXIgbGluZXMuIERvZXMgbm90IGRlY29kZSBtaW1lIHdvcmRzIGFzIGV2ZXJ5XG4gKiBoZWFkZXIgbWlnaHQgaGF2ZSBpdHMgb3duIHJ1bGVzIChlZy4gZm9ybWF0dGVkIGVtYWlsIGFkZHJlc3NlcyBhbmQgc3VjaClcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIHN0cmluZ1xuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgb2YgaGVhZGVycywgd2hlcmUgaGVhZGVyIGtleXMgYXJlIG9iamVjdCBrZXlzLiBOQiEgU2V2ZXJhbCB2YWx1ZXMgd2l0aCB0aGUgc2FtZSBrZXkgbWFrZSB1cCBhbiBBcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyTGluZXNEZWNvZGUgKGhlYWRlcnMpIHtcbiAgY29uc3QgbGluZXMgPSBoZWFkZXJzLnNwbGl0KC9cXHI/XFxufFxcci8pXG4gIGNvbnN0IGhlYWRlcnNPYmogPSB7fVxuXG4gIGZvciAobGV0IGkgPSBsaW5lcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChpICYmIGxpbmVzW2ldLm1hdGNoKC9eXFxzLykpIHtcbiAgICAgIGxpbmVzW2kgLSAxXSArPSAnXFxyXFxuJyArIGxpbmVzW2ldXG4gICAgICBsaW5lcy5zcGxpY2UoaSwgMSlcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJMaW5lRGVjb2RlKGxpbmVzW2ldKVxuICAgIGNvbnN0IGtleSA9IGhlYWRlci5rZXkudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHZhbHVlID0gaGVhZGVyLnZhbHVlXG5cbiAgICBpZiAoIWhlYWRlcnNPYmpba2V5XSkge1xuICAgICAgaGVhZGVyc09ialtrZXldID0gdmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyc09ialtrZXldID0gW10uY29uY2F0KGhlYWRlcnNPYmpba2V5XSwgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhlYWRlcnNPYmpcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBoZWFkZXIgdmFsdWUgd2l0aCBrZXk9dmFsdWUgYXJndW1lbnRzIGludG8gYSBzdHJ1Y3R1cmVkXG4gKiBvYmplY3QuXG4gKlxuICogICBwYXJzZUhlYWRlclZhbHVlKCdjb250ZW50LXR5cGU6IHRleHQvcGxhaW47IENIQVJTRVQ9J1VURi04JycpIC0+XG4gKiAgIHtcbiAqICAgICAndmFsdWUnOiAndGV4dC9wbGFpbicsXG4gKiAgICAgJ3BhcmFtcyc6IHtcbiAqICAgICAgICdjaGFyc2V0JzogJ1VURi04J1xuICogICAgIH1cbiAqICAgfVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgSGVhZGVyIHZhbHVlXG4gKiBAcmV0dXJuIHtPYmplY3R9IEhlYWRlciB2YWx1ZSBhcyBhIHBhcnNlZCBzdHJ1Y3R1cmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSGVhZGVyVmFsdWUgKHN0cikge1xuICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgdmFsdWU6IGZhbHNlLFxuICAgIHBhcmFtczoge31cbiAgfVxuICBsZXQga2V5ID0gZmFsc2VcbiAgbGV0IHZhbHVlID0gJydcbiAgbGV0IHR5cGUgPSAndmFsdWUnXG4gIGxldCBxdW90ZSA9IGZhbHNlXG4gIGxldCBlc2NhcGVkID0gZmFsc2VcbiAgbGV0IGNoclxuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjaHIgPSBzdHIuY2hhckF0KGkpXG4gICAgaWYgKHR5cGUgPT09ICdrZXknKSB7XG4gICAgICBpZiAoY2hyID09PSAnPScpIHtcbiAgICAgICAga2V5ID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgdHlwZSA9ICd2YWx1ZSdcbiAgICAgICAgdmFsdWUgPSAnJ1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdmFsdWUgKz0gY2hyXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICAgIHZhbHVlICs9IGNoclxuICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICdcXFxcJykge1xuICAgICAgICBlc2NhcGVkID0gdHJ1ZVxuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIGlmIChxdW90ZSAmJiBjaHIgPT09IHF1b3RlKSB7XG4gICAgICAgIHF1b3RlID0gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAoIXF1b3RlICYmIGNociA9PT0gJ1wiJykge1xuICAgICAgICBxdW90ZSA9IGNoclxuICAgICAgfSBlbHNlIGlmICghcXVvdGUgJiYgY2hyID09PSAnOycpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXNwb25zZS52YWx1ZSA9IHZhbHVlLnRyaW0oKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3BvbnNlLnBhcmFtc1trZXldID0gdmFsdWUudHJpbSgpXG4gICAgICAgIH1cbiAgICAgICAgdHlwZSA9ICdrZXknXG4gICAgICAgIHZhbHVlID0gJydcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlICs9IGNoclxuICAgICAgfVxuICAgICAgZXNjYXBlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGUgPT09ICd2YWx1ZScpIHtcbiAgICBpZiAoa2V5ID09PSBmYWxzZSkge1xuICAgICAgcmVzcG9uc2UudmFsdWUgPSB2YWx1ZS50cmltKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UucGFyYW1zW2tleV0gPSB2YWx1ZS50cmltKClcbiAgICB9XG4gIH0gZWxzZSBpZiAodmFsdWUudHJpbSgpKSB7XG4gICAgcmVzcG9uc2UucGFyYW1zW3ZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpXSA9ICcnXG4gIH1cblxuICAvLyBoYW5kbGUgcGFyYW1ldGVyIHZhbHVlIGNvbnRpbnVhdGlvbnNcbiAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIyMzEjc2VjdGlvbi0zXG5cbiAgLy8gcHJlcHJvY2VzcyB2YWx1ZXNcbiAgT2JqZWN0LmtleXMocmVzcG9uc2UucGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgYWN0dWFsS2V5LCBuciwgbWF0Y2gsIHZhbHVlXG4gICAgaWYgKChtYXRjaCA9IGtleS5tYXRjaCgvKFxcKihcXGQrKXxcXCooXFxkKylcXCp8XFwqKSQvKSkpIHtcbiAgICAgIGFjdHVhbEtleSA9IGtleS5zdWJzdHIoMCwgbWF0Y2guaW5kZXgpXG4gICAgICBuciA9IE51bWJlcihtYXRjaFsyXSB8fCBtYXRjaFszXSkgfHwgMFxuXG4gICAgICBpZiAoIXJlc3BvbnNlLnBhcmFtc1thY3R1YWxLZXldIHx8IHR5cGVvZiByZXNwb25zZS5wYXJhbXNbYWN0dWFsS2V5XSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmVzcG9uc2UucGFyYW1zW2FjdHVhbEtleV0gPSB7XG4gICAgICAgICAgY2hhcnNldDogZmFsc2UsXG4gICAgICAgICAgdmFsdWVzOiBbXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gcmVzcG9uc2UucGFyYW1zW2tleV1cblxuICAgICAgaWYgKG5yID09PSAwICYmIG1hdGNoWzBdLnN1YnN0cigtMSkgPT09ICcqJyAmJiAobWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXihbXiddKiknW14nXSonKC4qKSQvKSkpIHtcbiAgICAgICAgcmVzcG9uc2UucGFyYW1zW2FjdHVhbEtleV0uY2hhcnNldCA9IG1hdGNoWzFdIHx8ICdpc28tODg1OS0xJ1xuICAgICAgICB2YWx1ZSA9IG1hdGNoWzJdXG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlLnBhcmFtc1thY3R1YWxLZXldLnZhbHVlc1tucl0gPSB2YWx1ZVxuXG4gICAgICAvLyByZW1vdmUgdGhlIG9sZCByZWZlcmVuY2VcbiAgICAgIGRlbGV0ZSByZXNwb25zZS5wYXJhbXNba2V5XVxuICAgIH1cbiAgfSlcblxuICAvLyBjb25jYXRlbmF0ZSBzcGxpdCByZmMyMjMxIHN0cmluZ3MgYW5kIGNvbnZlcnQgZW5jb2RlZCBzdHJpbmdzIHRvIG1pbWUgZW5jb2RlZCB3b3Jkc1xuICBPYmplY3Qua2V5cyhyZXNwb25zZS5wYXJhbXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciB2YWx1ZVxuICAgIGlmIChyZXNwb25zZS5wYXJhbXNba2V5XSAmJiBBcnJheS5pc0FycmF5KHJlc3BvbnNlLnBhcmFtc1trZXldLnZhbHVlcykpIHtcbiAgICAgIHZhbHVlID0gcmVzcG9uc2UucGFyYW1zW2tleV0udmFsdWVzLm1hcChmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgfHwgJydcbiAgICAgIH0pLmpvaW4oJycpXG5cbiAgICAgIGlmIChyZXNwb25zZS5wYXJhbXNba2V5XS5jaGFyc2V0KSB7XG4gICAgICAgIC8vIGNvbnZlcnQgXCIlQUJcIiB0byBcIj0/Y2hhcnNldD9RPz1BQj89XCJcbiAgICAgICAgcmVzcG9uc2UucGFyYW1zW2tleV0gPSAnPT8nICsgcmVzcG9uc2UucGFyYW1zW2tleV0uY2hhcnNldCArICc/UT8nICsgdmFsdWVcbiAgICAgICAgICAucmVwbGFjZSgvWz0/X1xcc10vZywgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIC8vIGZpeCBpbnZhbGlkbHkgZW5jb2RlZCBjaGFyc1xuICAgICAgICAgICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICByZXR1cm4gcyA9PT0gJyAnID8gJ18nIDogJyUnICsgKGMubGVuZ3RoIDwgMiA/ICcwJyA6ICcnKSArIGNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5yZXBsYWNlKC8lL2csICc9JykgKyAnPz0nIC8vIGNoYW5nZSBmcm9tIHVybGVuY29kaW5nIHRvIHBlcmNlbnQgZW5jb2RpbmdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlLnBhcmFtc1trZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJlc3BvbnNlXG59XG5cbi8qKlxuICogRW5jb2RlcyBhIHN0cmluZyBvciBhbiBVaW50OEFycmF5IHRvIGFuIFVURi04IFBhcmFtZXRlciBWYWx1ZSBDb250aW51YXRpb24gZW5jb2RpbmcgKHJmYzIyMzEpXG4gKiBVc2VmdWwgZm9yIHNwbGl0dGluZyBsb25nIHBhcmFtZXRlciB2YWx1ZXMuXG4gKlxuICogRm9yIGV4YW1wbGVcbiAqICAgICAgdGl0bGU9XCJ1bmljb2RlIHN0cmluZ1wiXG4gKiBiZWNvbWVzXG4gKiAgICAgdGl0bGUqMCo9XCJ1dGYtOCcndW5pY29kZVwiXG4gKiAgICAgdGl0bGUqMSo9XCIlMjBzdHJpbmdcIlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfFVpbnQ4QXJyYXl9IGRhdGEgU3RyaW5nIHRvIGJlIGVuY29kZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWF4TGVuZ3RoPTUwXSBNYXggbGVuZ3RoIGZvciBnZW5lcmF0ZWQgY2h1bmtzXG4gKiBAcGFyYW0ge1N0cmluZ30gW2Zyb21DaGFyc2V0PSdVVEYtOCddIFNvdXJjZSBzaGFyYWN0ZXIgc2V0XG4gKiBAcmV0dXJuIHtBcnJheX0gQSBsaXN0IG9mIGVuY29kZWQga2V5cyBhbmQgaGVhZGVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGludWF0aW9uRW5jb2RlIChrZXksIGRhdGEsIG1heExlbmd0aCwgZnJvbUNoYXJzZXQpIHtcbiAgY29uc3QgbGlzdCA9IFtdXG4gIHZhciBlbmNvZGVkU3RyID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gZGF0YSA6IGRlY29kZShkYXRhLCBmcm9tQ2hhcnNldClcbiAgdmFyIGxpbmVcblxuICBtYXhMZW5ndGggPSBtYXhMZW5ndGggfHwgNTBcblxuICAvLyBwcm9jZXNzIGFzY2lpIG9ubHkgdGV4dFxuICBpZiAoL15bXFx3LlxcLSBdKiQvLnRlc3QoZGF0YSkpIHtcbiAgICAvLyBjaGVjayBpZiBjb252ZXJzaW9uIGlzIGV2ZW4gbmVlZGVkXG4gICAgaWYgKGVuY29kZWRTdHIubGVuZ3RoIDw9IG1heExlbmd0aCkge1xuICAgICAgcmV0dXJuIFt7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICB2YWx1ZTogL1tcXHNcIjs9XS8udGVzdChlbmNvZGVkU3RyKSA/ICdcIicgKyBlbmNvZGVkU3RyICsgJ1wiJyA6IGVuY29kZWRTdHJcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgZW5jb2RlZFN0ciA9IGVuY29kZWRTdHIucmVwbGFjZShuZXcgUmVnRXhwKCcueycgKyBtYXhMZW5ndGggKyAnfScsICdnJyksIGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIGxpbmU6IHN0clxuICAgICAgfSlcbiAgICAgIHJldHVybiAnJ1xuICAgIH0pXG5cbiAgICBpZiAoZW5jb2RlZFN0cikge1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgbGluZTogZW5jb2RlZFN0clxuICAgICAgfSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gcHJvY2VzcyB0ZXh0IHdpdGggdW5pY29kZSBvciBzcGVjaWFsIGNoYXJzXG4gICAgY29uc3QgdXJpRW5jb2RlZCA9IGVuY29kZVVSSUNvbXBvbmVudCgndXRmLThcXCdcXCcnICsgZW5jb2RlZFN0cilcbiAgICBsZXQgaSA9IDBcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IGxlbiA9IG1heExlbmd0aFxuICAgICAgLy8gbXVzdCBub3Qgc3BsaXQgaGV4IGVuY29kZWQgYnl0ZSBiZXR3ZWVuIGxpbmVzXG4gICAgICBpZiAodXJpRW5jb2RlZFtpICsgbWF4TGVuZ3RoIC0gMV0gPT09ICclJykge1xuICAgICAgICBsZW4gLT0gMVxuICAgICAgfSBlbHNlIGlmICh1cmlFbmNvZGVkW2kgKyBtYXhMZW5ndGggLSAyXSA9PT0gJyUnKSB7XG4gICAgICAgIGxlbiAtPSAyXG4gICAgICB9XG4gICAgICBsaW5lID0gdXJpRW5jb2RlZC5zdWJzdHIoaSwgbGVuKVxuICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICBlbmNvZGVkOiB0cnVlXG4gICAgICB9KVxuICAgICAgaSArPSBsaW5lLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0Lm1hcChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBlbmNvZGVkIGxpbmVzOiB7bmFtZX0qe3BhcnR9KlxuICAgICAgLy8gdW5lbmNvZGVkIGxpbmVzOiB7bmFtZX0qe3BhcnR9XG4gICAgICAvLyBpZiBhbnkgbGluZSBuZWVkcyB0byBiZSBlbmNvZGVkIHRoZW4gdGhlIGZpcnN0IGxpbmUgKHBhcnQ9PTApIGlzIGFsd2F5cyBlbmNvZGVkXG4gICAgICBrZXk6IGtleSArICcqJyArIGkgKyAoaXRlbS5lbmNvZGVkID8gJyonIDogJycpLFxuICAgICAgdmFsdWU6IC9bXFxzXCI7PV0vLnRlc3QoaXRlbS5saW5lKSA/ICdcIicgKyBpdGVtLmxpbmUgKyAnXCInIDogaXRlbS5saW5lXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIFNwbGl0cyBhIG1pbWUgZW5jb2RlZCBzdHJpbmcuIE5lZWRlZCBmb3IgZGl2aWRpbmcgbWltZSB3b3JkcyBpbnRvIHNtYWxsZXIgY2h1bmtzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBNaW1lIGVuY29kZWQgc3RyaW5nIHRvIGJlIHNwbGl0IHVwXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4bGVuIE1heGltdW0gbGVuZ3RoIG9mIGNoYXJhY3RlcnMgZm9yIG9uZSBwYXJ0IChtaW5pbXVtIDEyKVxuICogQHJldHVybiB7QXJyYXl9IFNwbGl0IHN0cmluZ1xuICovXG5mdW5jdGlvbiBfc3BsaXRNaW1lRW5jb2RlZFN0cmluZyAoc3RyLCBtYXhsZW4gPSAxMikge1xuICBjb25zdCBtaW5Xb3JkTGVuZ3RoID0gMTIgLy8gcmVxdWlyZSBhdCBsZWFzdCAxMiBzeW1ib2xzIHRvIGZpdCBwb3NzaWJsZSA0IG9jdGV0IFVURi04IHNlcXVlbmNlc1xuICBjb25zdCBtYXhXb3JkTGVuZ3RoID0gTWF0aC5tYXgobWF4bGVuLCBtaW5Xb3JkTGVuZ3RoKVxuICBjb25zdCBsaW5lcyA9IFtdXG5cbiAgd2hpbGUgKHN0ci5sZW5ndGgpIHtcbiAgICBsZXQgY3VyTGluZSA9IHN0ci5zdWJzdHIoMCwgbWF4V29yZExlbmd0aClcblxuICAgIGNvbnN0IG1hdGNoID0gY3VyTGluZS5tYXRjaCgvPVswLTlBLUZdPyQvaSkgLy8gc2tpcCBpbmNvbXBsZXRlIGVzY2FwZWQgY2hhclxuICAgIGlmIChtYXRjaCkge1xuICAgICAgY3VyTGluZSA9IGN1ckxpbmUuc3Vic3RyKDAsIG1hdGNoLmluZGV4KVxuICAgIH1cblxuICAgIGxldCBkb25lID0gZmFsc2VcbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgIGxldCBjaHJcbiAgICAgIGRvbmUgPSB0cnVlXG4gICAgICBjb25zdCBtYXRjaCA9IHN0ci5zdWJzdHIoY3VyTGluZS5sZW5ndGgpLm1hdGNoKC9ePShbMC05QS1GXXsyfSkvaSkgLy8gY2hlY2sgaWYgbm90IG1pZGRsZSBvZiBhIHVuaWNvZGUgY2hhciBzZXF1ZW5jZVxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGNociA9IHBhcnNlSW50KG1hdGNoWzFdLCAxNilcbiAgICAgICAgLy8gaW52YWxpZCBzZXF1ZW5jZSwgbW92ZSBvbmUgY2hhciBiYWNrIGFuYyByZWNoZWNrXG4gICAgICAgIGlmIChjaHIgPCAweEMyICYmIGNociA+IDB4N0YpIHtcbiAgICAgICAgICBjdXJMaW5lID0gY3VyTGluZS5zdWJzdHIoMCwgY3VyTGluZS5sZW5ndGggLSAzKVxuICAgICAgICAgIGRvbmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGN1ckxpbmUubGVuZ3RoKSB7XG4gICAgICBsaW5lcy5wdXNoKGN1ckxpbmUpXG4gICAgfVxuICAgIHN0ciA9IHN0ci5zdWJzdHIoY3VyTGluZS5sZW5ndGgpXG4gIH1cblxuICByZXR1cm4gbGluZXNcbn1cblxuZnVuY3Rpb24gX2FkZEJhc2U2NFNvZnRMaW5lYnJlYWtzIChiYXNlNjRFbmNvZGVkU3RyID0gJycpIHtcbiAgcmV0dXJuIGJhc2U2NEVuY29kZWRTdHIudHJpbSgpLnJlcGxhY2UobmV3IFJlZ0V4cCgnLnsnICsgTUFYX0xJTkVfTEVOR1RIICsgJ30nLCAnZycpLCAnJCZcXHJcXG4nKS50cmltKClcbn1cblxuLyoqXG4gKiBBZGRzIHNvZnQgbGluZSBicmVha3ModGhlIG9uZXMgdGhhdCB3aWxsIGJlIHN0cmlwcGVkIG91dCB3aGVuIGRlY29kaW5nIFFQKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxcEVuY29kZWRTdHIgU3RyaW5nIGluIFF1b3RlZC1QcmludGFibGUgZW5jb2RpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gU3RyaW5nIHdpdGggZm9yY2VkIGxpbmUgYnJlYWtzXG4gKi9cbmZ1bmN0aW9uIF9hZGRRUFNvZnRMaW5lYnJlYWtzIChxcEVuY29kZWRTdHIgPSAnJykge1xuICBsZXQgcG9zID0gMFxuICBjb25zdCBsZW4gPSBxcEVuY29kZWRTdHIubGVuZ3RoXG4gIGNvbnN0IGxpbmVNYXJnaW4gPSBNYXRoLmZsb29yKE1BWF9MSU5FX0xFTkdUSCAvIDMpXG4gIGxldCByZXN1bHQgPSAnJ1xuICBsZXQgbWF0Y2gsIGxpbmVcblxuICAvLyBpbnNlcnQgc29mdCBsaW5lYnJlYWtzIHdoZXJlIG5lZWRlZFxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgbGluZSA9IHFwRW5jb2RlZFN0ci5zdWJzdHIocG9zLCBNQVhfTElORV9MRU5HVEgpXG4gICAgaWYgKChtYXRjaCA9IGxpbmUubWF0Y2goL1xcclxcbi8pKSkge1xuICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKDAsIG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKVxuICAgICAgcmVzdWx0ICs9IGxpbmVcbiAgICAgIHBvcyArPSBsaW5lLmxlbmd0aFxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAobGluZS5zdWJzdHIoLTEpID09PSAnXFxuJykge1xuICAgICAgLy8gbm90aGluZyB0byBjaGFuZ2UgaGVyZVxuICAgICAgcmVzdWx0ICs9IGxpbmVcbiAgICAgIHBvcyArPSBsaW5lLmxlbmd0aFxuICAgICAgY29udGludWVcbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IGxpbmUuc3Vic3RyKC1saW5lTWFyZ2luKS5tYXRjaCgvXFxuLio/JC8pKSkge1xuICAgICAgLy8gdHJ1bmNhdGUgdG8gbmVhcmVzdCBsaW5lIGJyZWFrXG4gICAgICBsaW5lID0gbGluZS5zdWJzdHIoMCwgbGluZS5sZW5ndGggLSAobWF0Y2hbMF0ubGVuZ3RoIC0gMSkpXG4gICAgICByZXN1bHQgKz0gbGluZVxuICAgICAgcG9zICs9IGxpbmUubGVuZ3RoXG4gICAgICBjb250aW51ZVxuICAgIH0gZWxzZSBpZiAobGluZS5sZW5ndGggPiBNQVhfTElORV9MRU5HVEggLSBsaW5lTWFyZ2luICYmIChtYXRjaCA9IGxpbmUuc3Vic3RyKC1saW5lTWFyZ2luKS5tYXRjaCgvWyBcXHQuLCE/XVteIFxcdC4sIT9dKiQvKSkpIHtcbiAgICAgIC8vIHRydW5jYXRlIHRvIG5lYXJlc3Qgc3BhY2VcbiAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cigwLCBsaW5lLmxlbmd0aCAtIChtYXRjaFswXS5sZW5ndGggLSAxKSlcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3Vic3RyKC0xKSA9PT0gJ1xccicpIHtcbiAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cigwLCBsaW5lLmxlbmd0aCAtIDEpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsaW5lLm1hdGNoKC89W1xcZGEtZl17MCwyfSQvaSkpIHtcbiAgICAgICAgLy8gcHVzaCBpbmNvbXBsZXRlIGVuY29kaW5nIHNlcXVlbmNlcyB0byB0aGUgbmV4dCBsaW5lXG4gICAgICAgIGlmICgobWF0Y2ggPSBsaW5lLm1hdGNoKC89W1xcZGEtZl17MCwxfSQvaSkpKSB7XG4gICAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKDAsIGxpbmUubGVuZ3RoIC0gbWF0Y2hbMF0ubGVuZ3RoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdXRmLTggc2VxdWVuY2VzIGFyZSBub3Qgc3BsaXRcbiAgICAgICAgd2hpbGUgKGxpbmUubGVuZ3RoID4gMyAmJiBsaW5lLmxlbmd0aCA8IGxlbiAtIHBvcyAmJiAhbGluZS5tYXRjaCgvXig/Oj1bXFxkYS1mXXsyfSl7MSw0fSQvaSkgJiYgKG1hdGNoID0gbGluZS5tYXRjaCgvPVtcXGRhLWZdezJ9JC9pZykpKSB7XG4gICAgICAgICAgY29uc3QgY29kZSA9IHBhcnNlSW50KG1hdGNoWzBdLnN1YnN0cigxLCAyKSwgMTYpXG4gICAgICAgICAgaWYgKGNvZGUgPCAxMjgpIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKDAsIGxpbmUubGVuZ3RoIC0gMylcblxuICAgICAgICAgIGlmIChjb2RlID49IDB4QzApIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvcyArIGxpbmUubGVuZ3RoIDwgbGVuICYmIGxpbmUuc3Vic3RyKC0xKSAhPT0gJ1xcbicpIHtcbiAgICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gTUFYX0xJTkVfTEVOR1RIICYmIGxpbmUubWF0Y2goLz1bXFxkYS1mXXsyfSQvaSkpIHtcbiAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKDAsIGxpbmUubGVuZ3RoIC0gMylcbiAgICAgIH0gZWxzZSBpZiAobGluZS5sZW5ndGggPT09IE1BWF9MSU5FX0xFTkdUSCkge1xuICAgICAgICBsaW5lID0gbGluZS5zdWJzdHIoMCwgbGluZS5sZW5ndGggLSAxKVxuICAgICAgfVxuICAgICAgcG9zICs9IGxpbmUubGVuZ3RoXG4gICAgICBsaW5lICs9ICc9XFxyXFxuJ1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3MgKz0gbGluZS5sZW5ndGhcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gbGluZVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgeyBkZWNvZGUsIGVuY29kZSwgY29udmVydCB9XG4iXX0=