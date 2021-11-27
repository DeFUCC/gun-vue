'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = exports.arr2str = exports.encode = undefined;
exports.decode = decode;

var _textEncoding = require('text-encoding');

/**
 * Encodes an unicode string into an Uint8Array object as UTF-8
 *
 * @param {String} str String to be encoded
 * @return {Uint8Array} UTF-8 encoded typed array
 */
var encode = exports.encode = function encode(str) {
  return new _textEncoding.TextEncoder('UTF-8').encode(str);
};

var arr2str = exports.arr2str = function arr2str(arr) {
  var CHUNK_SZ = 0x8000;
  var strs = [];

  for (var i = 0; i < arr.length; i += CHUNK_SZ) {
    strs.push(String.fromCharCode.apply(null, arr.subarray(i, i + CHUNK_SZ)));
  }

  return strs.join('');
};

/**
 * Decodes a string from Uint8Array to an unicode string using specified encoding
 *
 * @param {Uint8Array} buf Binary data to be decoded
 * @param {String} Binary data is decoded into string using this charset
 * @return {String} Decoded string
 */
function decode(buf) {
  var fromCharset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';

  var charsets = [{ charset: normalizeCharset(fromCharset), fatal: false }, { charset: 'utf-8', fatal: true }, { charset: 'iso-8859-15', fatal: false }];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = charsets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          charset = _step$value.charset,
          fatal = _step$value.fatal;

      try {
        return new _textEncoding.TextDecoder(charset, { fatal: fatal }).decode(buf);
      } catch (e) {}
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return arr2str(buf); // all else fails, treat it as binary
}

/**
 * Convert a string from specific encoding to UTF-8 Uint8Array
 *
 * @param {String|Uint8Array} data Data to be encoded
 * @param {String} Source encoding for the string (optional for data of type String)
 * @return {Uint8Array} UTF-8 encoded typed array
 */
var convert = exports.convert = function convert(data, fromCharset) {
  return typeof data === 'string' ? encode(data) : encode(decode(data, fromCharset));
};

function normalizeCharset() {
  var charset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'utf-8';

  var match = void 0;

  if (match = charset.match(/^utf[-_]?(\d+)$/i)) {
    return 'UTF-' + match[1];
  }

  if (match = charset.match(/^win[-_]?(\d+)$/i)) {
    return 'WINDOWS-' + match[1];
  }

  if (match = charset.match(/^latin[-_]?(\d+)$/i)) {
    return 'ISO-8859-' + match[1];
  }

  return charset;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGFyc2V0LmpzIl0sIm5hbWVzIjpbImRlY29kZSIsImVuY29kZSIsIlRleHRFbmNvZGVyIiwic3RyIiwiYXJyMnN0ciIsIkNIVU5LX1NaIiwic3RycyIsImkiLCJhcnIiLCJsZW5ndGgiLCJwdXNoIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXBwbHkiLCJzdWJhcnJheSIsImpvaW4iLCJidWYiLCJmcm9tQ2hhcnNldCIsImNoYXJzZXRzIiwiY2hhcnNldCIsIm5vcm1hbGl6ZUNoYXJzZXQiLCJmYXRhbCIsIlRleHREZWNvZGVyIiwiZSIsImNvbnZlcnQiLCJkYXRhIiwibWF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7OztRQTRCZ0JBLE0sR0FBQUEsTTs7QUE1QmhCOztBQUVBOzs7Ozs7QUFNTyxJQUFNQywwQkFBUyxTQUFUQSxNQUFTO0FBQUEsU0FBTyxJQUFJQyx5QkFBSixDQUFnQixPQUFoQixFQUF5QkQsTUFBekIsQ0FBZ0NFLEdBQWhDLENBQVA7QUFBQSxDQUFmOztBQUVBLElBQU1DLDRCQUFVLFNBQVZBLE9BQVUsTUFBTztBQUM1QixNQUFNQyxXQUFXLE1BQWpCO0FBQ0EsTUFBTUMsT0FBTyxFQUFiOztBQUVBLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJQyxJQUFJQyxNQUF4QixFQUFnQ0YsS0FBS0YsUUFBckMsRUFBK0M7QUFDN0NDLFNBQUtJLElBQUwsQ0FBVUMsT0FBT0MsWUFBUCxDQUFvQkMsS0FBcEIsQ0FBMEIsSUFBMUIsRUFBZ0NMLElBQUlNLFFBQUosQ0FBYVAsQ0FBYixFQUFnQkEsSUFBSUYsUUFBcEIsQ0FBaEMsQ0FBVjtBQUNEOztBQUVELFNBQU9DLEtBQUtTLElBQUwsQ0FBVSxFQUFWLENBQVA7QUFDRCxDQVRNOztBQVdQOzs7Ozs7O0FBT08sU0FBU2YsTUFBVCxDQUFpQmdCLEdBQWpCLEVBQTZDO0FBQUEsTUFBdkJDLFdBQXVCLHVFQUFULE9BQVM7O0FBQ2xELE1BQU1DLFdBQVcsQ0FDZixFQUFFQyxTQUFTQyxpQkFBaUJILFdBQWpCLENBQVgsRUFBMENJLE9BQU8sS0FBakQsRUFEZSxFQUVmLEVBQUVGLFNBQVMsT0FBWCxFQUFvQkUsT0FBTyxJQUEzQixFQUZlLEVBR2YsRUFBRUYsU0FBUyxhQUFYLEVBQTBCRSxPQUFPLEtBQWpDLEVBSGUsQ0FBakI7O0FBRGtEO0FBQUE7QUFBQTs7QUFBQTtBQU9sRCx5QkFBaUNILFFBQWpDLDhIQUEyQztBQUFBO0FBQUEsVUFBOUJDLE9BQThCLGVBQTlCQSxPQUE4QjtBQUFBLFVBQXJCRSxLQUFxQixlQUFyQkEsS0FBcUI7O0FBQ3pDLFVBQUk7QUFBRSxlQUFPLElBQUlDLHlCQUFKLENBQWdCSCxPQUFoQixFQUF5QixFQUFFRSxZQUFGLEVBQXpCLEVBQW9DckIsTUFBcEMsQ0FBMkNnQixHQUEzQyxDQUFQO0FBQXdELE9BQTlELENBQStELE9BQU9PLENBQVAsRUFBVSxDQUFHO0FBQzdFO0FBVGlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBV2xELFNBQU9uQixRQUFRWSxHQUFSLENBQVAsQ0FYa0QsQ0FXOUI7QUFDckI7O0FBRUQ7Ozs7Ozs7QUFPTyxJQUFNUSw0QkFBVSxTQUFWQSxPQUFVLENBQUNDLElBQUQsRUFBT1IsV0FBUDtBQUFBLFNBQXVCLE9BQU9RLElBQVAsS0FBZ0IsUUFBaEIsR0FBMkJ4QixPQUFPd0IsSUFBUCxDQUEzQixHQUEwQ3hCLE9BQU9ELE9BQU95QixJQUFQLEVBQWFSLFdBQWIsQ0FBUCxDQUFqRTtBQUFBLENBQWhCOztBQUVQLFNBQVNHLGdCQUFULEdBQThDO0FBQUEsTUFBbkJELE9BQW1CLHVFQUFULE9BQVM7O0FBQzVDLE1BQUlPLGNBQUo7O0FBRUEsTUFBS0EsUUFBUVAsUUFBUU8sS0FBUixDQUFjLGtCQUFkLENBQWIsRUFBaUQ7QUFDL0MsV0FBTyxTQUFTQSxNQUFNLENBQU4sQ0FBaEI7QUFDRDs7QUFFRCxNQUFLQSxRQUFRUCxRQUFRTyxLQUFSLENBQWMsa0JBQWQsQ0FBYixFQUFpRDtBQUMvQyxXQUFPLGFBQWFBLE1BQU0sQ0FBTixDQUFwQjtBQUNEOztBQUVELE1BQUtBLFFBQVFQLFFBQVFPLEtBQVIsQ0FBYyxvQkFBZCxDQUFiLEVBQW1EO0FBQ2pELFdBQU8sY0FBY0EsTUFBTSxDQUFOLENBQXJCO0FBQ0Q7O0FBRUQsU0FBT1AsT0FBUDtBQUNEIiwiZmlsZSI6ImNoYXJzZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RGVjb2RlciwgVGV4dEVuY29kZXIgfSBmcm9tICd0ZXh0LWVuY29kaW5nJ1xuXG4vKipcbiAqIEVuY29kZXMgYW4gdW5pY29kZSBzdHJpbmcgaW50byBhbiBVaW50OEFycmF5IG9iamVjdCBhcyBVVEYtOFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIGJlIGVuY29kZWRcbiAqIEByZXR1cm4ge1VpbnQ4QXJyYXl9IFVURi04IGVuY29kZWQgdHlwZWQgYXJyYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGVuY29kZSA9IHN0ciA9PiBuZXcgVGV4dEVuY29kZXIoJ1VURi04JykuZW5jb2RlKHN0cilcblxuZXhwb3J0IGNvbnN0IGFycjJzdHIgPSBhcnIgPT4ge1xuICBjb25zdCBDSFVOS19TWiA9IDB4ODAwMFxuICBjb25zdCBzdHJzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gQ0hVTktfU1opIHtcbiAgICBzdHJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBhcnIuc3ViYXJyYXkoaSwgaSArIENIVU5LX1NaKSkpXG4gIH1cblxuICByZXR1cm4gc3Rycy5qb2luKCcnKVxufVxuXG4vKipcbiAqIERlY29kZXMgYSBzdHJpbmcgZnJvbSBVaW50OEFycmF5IHRvIGFuIHVuaWNvZGUgc3RyaW5nIHVzaW5nIHNwZWNpZmllZCBlbmNvZGluZ1xuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIEJpbmFyeSBkYXRhIHRvIGJlIGRlY29kZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBCaW5hcnkgZGF0YSBpcyBkZWNvZGVkIGludG8gc3RyaW5nIHVzaW5nIHRoaXMgY2hhcnNldFxuICogQHJldHVybiB7U3RyaW5nfSBEZWNvZGVkIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlIChidWYsIGZyb21DaGFyc2V0ID0gJ3V0Zi04Jykge1xuICBjb25zdCBjaGFyc2V0cyA9IFtcbiAgICB7IGNoYXJzZXQ6IG5vcm1hbGl6ZUNoYXJzZXQoZnJvbUNoYXJzZXQpLCBmYXRhbDogZmFsc2UgfSxcbiAgICB7IGNoYXJzZXQ6ICd1dGYtOCcsIGZhdGFsOiB0cnVlIH0sXG4gICAgeyBjaGFyc2V0OiAnaXNvLTg4NTktMTUnLCBmYXRhbDogZmFsc2UgfVxuICBdXG5cbiAgZm9yIChjb25zdCB7IGNoYXJzZXQsIGZhdGFsIH0gb2YgY2hhcnNldHMpIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IFRleHREZWNvZGVyKGNoYXJzZXQsIHsgZmF0YWwgfSkuZGVjb2RlKGJ1ZikgfSBjYXRjaCAoZSkgeyB9XG4gIH1cblxuICByZXR1cm4gYXJyMnN0cihidWYpIC8vIGFsbCBlbHNlIGZhaWxzLCB0cmVhdCBpdCBhcyBiaW5hcnlcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGZyb20gc3BlY2lmaWMgZW5jb2RpbmcgdG8gVVRGLTggVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfFVpbnQ4QXJyYXl9IGRhdGEgRGF0YSB0byBiZSBlbmNvZGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gU291cmNlIGVuY29kaW5nIGZvciB0aGUgc3RyaW5nIChvcHRpb25hbCBmb3IgZGF0YSBvZiB0eXBlIFN0cmluZylcbiAqIEByZXR1cm4ge1VpbnQ4QXJyYXl9IFVURi04IGVuY29kZWQgdHlwZWQgYXJyYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnQgPSAoZGF0YSwgZnJvbUNoYXJzZXQpID0+IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IGVuY29kZShkYXRhKSA6IGVuY29kZShkZWNvZGUoZGF0YSwgZnJvbUNoYXJzZXQpKVxuXG5mdW5jdGlvbiBub3JtYWxpemVDaGFyc2V0IChjaGFyc2V0ID0gJ3V0Zi04Jykge1xuICBsZXQgbWF0Y2hcblxuICBpZiAoKG1hdGNoID0gY2hhcnNldC5tYXRjaCgvXnV0ZlstX10/KFxcZCspJC9pKSkpIHtcbiAgICByZXR1cm4gJ1VURi0nICsgbWF0Y2hbMV1cbiAgfVxuXG4gIGlmICgobWF0Y2ggPSBjaGFyc2V0Lm1hdGNoKC9ed2luWy1fXT8oXFxkKykkL2kpKSkge1xuICAgIHJldHVybiAnV0lORE9XUy0nICsgbWF0Y2hbMV1cbiAgfVxuXG4gIGlmICgobWF0Y2ggPSBjaGFyc2V0Lm1hdGNoKC9ebGF0aW5bLV9dPyhcXGQrKSQvaSkpKSB7XG4gICAgcmV0dXJuICdJU08tODg1OS0nICsgbWF0Y2hbMV1cbiAgfVxuXG4gIHJldHVybiBjaGFyc2V0XG59XG4iXX0=