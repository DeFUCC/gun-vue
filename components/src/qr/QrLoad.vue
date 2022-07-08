<script setup>
import jsQR from "jsqr";

const emit = defineEmits(["loaded"]);

async function processFile(file) {
  const imageData = await imageDataFromFile(file);
  const result = jsQR(imageData.data, imageData.width, imageData.height);
  emit("loaded", result?.data);
}

async function imageDataFromFile(file) {
  if (/image.*/.test(file.type)) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const result = await asyncListenEvent(reader, "load");
    return imageDataFromUrl(result?.target?.result);
  } else {
    console.log("File is not an image");
  }
}

async function imageDataFromUrl(url) {
  if (!url) return
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
  const scalingRatio = Math.min(
    1,
    canvas.width / width,
    canvas.height / height
  );
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
</script>

<template lang="pug">
input#qr-input(
  type="file",
  accept="image/*",
  @change="processFile($event.target.files[0])"
)
</template>


