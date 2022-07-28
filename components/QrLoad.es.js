import { openBlock, createElementBlock, jsQR } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    id: "qr-input",
    type: "file",
    accept: "image/*",
    onChange: _cache[0] || (_cache[0] = ($event) => $setup.processFile($event.target.files[0]))
  }, null, 32);
}
const _sfc_main = {
  __name: "QrLoad",
  emits: ["loaded"],
  setup(__props, { expose, emit }) {
    expose();
    async function processFile(file) {
      const imageData = await imageDataFromFile(file);
      const result = jsQR(imageData.data, imageData.width, imageData.height);
      emit("loaded", result == null ? void 0 : result.data);
    }
    async function imageDataFromFile(file) {
      var _a;
      if (/image.*/.test(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const result = await asyncListenEvent(reader, "load");
        return imageDataFromUrl((_a = result == null ? void 0 : result.target) == null ? void 0 : _a.result);
      } else {
        console.log("File is not an image");
      }
    }
    async function imageDataFromUrl(url) {
      if (!url)
        return;
      const image = document.createElement("img");
      image.src = url;
      await asyncListenEvent(image, "load");
      return imageDataFromImage(image);
    }
    function imageDataFromImage(imageElement) {
      const width = imageElement.naturalWidth;
      const height = imageElement.naturalHeight;
      return imageDataFromCanvas(imageElement, width, height);
    }
    function imageDataFromCanvas(canvasImageSource, width, height) {
      const canvas = document.createElement("canvas");
      const canvasCtx = canvas.getContext("2d");
      canvas.width = 1920;
      canvas.height = 1080;
      const scalingRatio = Math.min(1, canvas.width / width, canvas.height / height);
      const widthScaled = scalingRatio * width;
      const heightScaled = scalingRatio * height;
      canvasCtx.drawImage(canvasImageSource, 0, 0, widthScaled, heightScaled);
      return canvasCtx.getImageData(0, 0, widthScaled, heightScaled);
    }
    function asyncListenEvent(eventTarget, successEvent, errorEvent) {
      let _resolve, _reject;
      const promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      });
      eventTarget.addEventListener(successEvent, _resolve);
      eventTarget.addEventListener(errorEvent, _reject);
      promise.finally(() => {
        eventTarget.removeEventListener(successEvent, _resolve);
        eventTarget.removeEventListener(errorEvent, _reject);
      });
      return promise;
    }
    const __returned__ = { emit, processFile, imageDataFromFile, imageDataFromUrl, imageDataFromImage, imageDataFromCanvas, asyncListenEvent, jsQR };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/qr/QrLoad.vue";
var __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/qr/QrLoad.vue"]]);
export { __unplugin_components_4 as default };
