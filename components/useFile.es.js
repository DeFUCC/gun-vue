import { reactive } from "./vendor.es.js";
function downloadFile(text, fileType, fileName, isBlob = true) {
  const a = document.createElement("a");
  a.download = fileName;
  if (isBlob) {
    a.href = URL.createObjectURL(new Blob([text], { type: fileType }));
    setTimeout(function() {
      URL.revokeObjectURL(a.href);
    }, 1500);
  } else {
    a.href = `data:${fileType};,${text}`;
  }
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function uploadText(event, callback = (r) => console.log(r)) {
  let file = event.target.files[0];
  const maxBytes = 2e7;
  if (file.size > maxBytes) {
    console.error("File is bigger than " + niceBytes(maxBytes)) + " limit";
    return;
  }
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    callback(reader.result);
  };
}
function usePictureUpload({
  preserveRatio = false,
  picSize = 100,
  maxSize = 1024e4
} = {}) {
  const state = reactive({
    errors: [],
    status: null,
    output: {}
  });
  function handleChange(event) {
    const fileList = event.target.files;
    reset();
    if (!fileList.length)
      return;
    state.status = "loading";
    [...fileList].map((file) => processFile(file));
  }
  function processFile(file) {
    fileToBase64(file).then((res) => {
      state.output = {
        name: sanitizeFileName(file.name),
        content: res,
        size: niceBytes(Math.round(res.length * 3 / 4))
      };
      state.status = "success";
    });
    return null;
  }
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(), readerBase64 = new FileReader(), blob = file.slice(0, 4);
      reader.readAsArrayBuffer(blob);
      reader.onloadend = (e) => {
        let isValidMimeType = checkMimetype(getMimeTypeSignature(e.target.result));
        if (bytesToMegabytes(file.size) > bytesToMegabytes(maxSize)) {
          state.errors.push({
            message: "File size is too large!"
          });
        }
        if (isValidMimeType === false) {
          state.errors.push({
            message: "File type is not supported!"
          });
        }
        if (state.errors.length > 0) {
          flashErrors(state.errors);
          reset();
          return;
        } else {
          readerBase64.readAsDataURL(file);
        }
      };
      readerBase64.onloadend = () => {
        const img = new Image();
        img.src = readerBase64.result;
        img.onload = () => {
          const naturalAspect = preserveRatio ? img.naturalWidth / img.naturalHeight : 1;
          const canvas = document.createElement("canvas");
          canvas.width = picSize;
          canvas.height = picSize / naturalAspect;
          const context = canvas.getContext("2d");
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL());
        };
      };
      reader.onerror = (error) => reject(error);
      readerBase64.onerror = (error) => reject(error);
    });
  }
  function reset() {
    state.status = "";
    state.errors = [];
    state.output = {};
  }
  function bytesToMegabytes(bytes) {
    const value = bytes * Math.pow(10, -6);
    return value;
  }
  function checkMimetype(signature) {
    const signatures2 = [
      "89504E47",
      "47494638",
      "FFD8FFDB",
      "FFD8FFE0",
      "FFD8FFE1",
      "FFD8FFE2",
      "FFD8FFE3",
      "FFD8FFE8",
      "FFD8FFED",
      "3C3F786D",
      "3C737667"
    ];
    return signatures2.includes(signature);
  }
  function getMimeTypeSignature(data) {
    const uint = new Uint8Array(data);
    let bytes = [];
    uint.forEach((byte) => {
      bytes.push(byte.toString(16));
    });
    return bytes.join("").toUpperCase();
  }
  function sanitizeFileName(name) {
    return name.replace(/\.[^/.]+$/, "").toLowerCase();
  }
  function flashErrors(errors) {
    if (errors.length === 2) {
      console.error("File upload failed due to size and type!");
    } else {
      console.error(errors[0].message + errors[0].type);
    }
  }
  return {
    state,
    handleChange
  };
}
const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
function niceBytes(x) {
  let l = 0, n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}
function base64MimeType(encoded) {
  var result = null;
  if (typeof encoded !== "string") {
    return result;
  }
  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = mime[1];
  }
  return result;
}
function base64FileType(encoded) {
  var _a;
  return (_a = encoded.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)) == null ? void 0 : _a[0];
}
function base64Extension(encoded) {
  return encoded.substring(encoded.indexOf("/") + 1, encoded.indexOf(";base64"));
}
var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg"
};
function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}
export { base64Extension, base64FileType, base64MimeType, detectMimeType, downloadFile, uploadText, usePictureUpload };
