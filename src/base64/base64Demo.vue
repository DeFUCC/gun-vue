<template>

  <div class="content-wrapper">

    <div class="input-section">
      <label class="label">Upload Image</label>
      <div class="file-input-wrapper">
        <input type="file" id="imageInput" accept="image/*" ref="fileInputRef" @change="handleFileInput" />
        <button class="modern-button upload-btn" @click="triggerFileInput" :disabled="isProcessing">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2l-5.5 9h11zm0 2.83v6.17h2v-6.17zm-1 9.17h2v6h-2z" />
          </svg>
        </button>
      </div>
    </div>


    <div class="input-section">
      <label class="label">Base64 Input</label>
      <textarea v-model="inputBase64" placeholder="Paste Base64 string here..." class="liquid-textarea"
        @input="updateBase64FromText" :disabled="isProcessing"></textarea>
    </div>


    <p v-if="error" class="error-text">{{ error }}</p>


    <div class="output-section" v-if="base64String">
      <label class="label">Base64 Output</label>
      <div class="output-wrapper">
        <textarea :value="base64String" readonly class="liquid-textarea output"></textarea>
        <button class="modern-button copy-btn" @click="copyBase64" :disabled="isProcessing">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M16 1H4v16h2V3h10zm-1 4l6 6v10H8V5zm2 14h2v-6h-6v6h4z" />
          </svg>
        </button>
      </div>
    </div>


    <div class="preview-section" v-if="base64String && isValidBase64Image(base64String)">
      <label class="label">Preview</label>
      <div class="image-wrapper">
        <img :src="base64String" alt="Preview" class="liquid-image" @load="onImageLoad" />
      </div>
    </div>


    <button v-if="base64String || error" class="modern-button clear-btn" @click="clear1" :disabled="isProcessing">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </button>



    <transition name="liquid-fade">
      <div v-if="isProcessing" class="fullscreen-loader">
        <div class="liquid-circle"></div>
        <div class="liquid-circle delayed"></div>
      </div>
    </transition>


    <div class="glow-circle glow-1"></div>
    <div class="glow-circle glow-2"></div>
    <div class="glow-circle glow-3"></div>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useImageToBase64 } from './useImageToBase64';

const { base64String, error, convertToBase64, setBase64FromText, isValidBase64Image, clear } = useImageToBase64();
const router = useRouter();
const fileInputRef = ref<HTMLInputElement | null>(null);
const inputBase64 = ref('');
const isProcessing = ref(false);


const triggerFileInput = () => {
  if (fileInputRef.value && !isProcessing.value) {
    fileInputRef.value.click();
  }
};

const handleFileInput = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  isProcessing.value = true;

  try {
    await convertToBase64(file);
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (err) {
    console.error(err);
  } finally {
    isProcessing.value = false;
    if (input) input.value = '';
  }
};

const updateBase64FromText = async () => {
  if (isProcessing.value) return;
  isProcessing.value = true;
  try {
    setBase64FromText(inputBase64.value.trim());
    await new Promise(resolve => setTimeout(resolve, 1000));
  } finally {
    isProcessing.value = false;
  }
};

const copyBase64 = () => {
  if (base64String.value && !isProcessing.value) {
    navigator.clipboard.writeText(base64String.value).then(() => {
      console.log('Base64 copied to clipboard');
    }).catch(() => {
      console.log('Copy failed', 'error');
    });
  }
};

const onImageLoad = () => {
  isProcessing.value = false;
};

const clear1 = () => {
  if (!isProcessing.value) {
    isProcessing.value = false;
    clear();
  }
};


watch(base64String, (newValue) => {
  if (newValue !== inputBase64.value) {
    inputBase64.value = newValue;
  }
});
</script>

<style scoped>
.converter-content {
  --background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  height: 100%;
  overflow-y: auto;
}

.image-to-base64-converter {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.i-material-symbols-arrow-back-ios-new-rounded {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: #ffffff;
  width: 1.2em;
  height: 1.2em;
}

.content-wrapper {
  margin-top: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-bottom: 40px;
}


.input-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 400;
}

.file-input-wrapper {
  position: relative;
}

input[type="file"] {
  display: none;
}

.liquid-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 14px;
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.liquid-textarea:focus {
  outline: none;
  border-color: rgba(0, 205, 137, 0.5);
  box-shadow: 0 0 8px rgba(0, 205, 137, 0.2);
}

.liquid-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.liquid-textarea.output {
  background: rgba(255, 255, 255, 0.05);
  cursor: not-allowed;
}

.output-section {
  position: relative;
}

.output-wrapper {
  position: relative;
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.liquid-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.error-text {
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  background: rgba(255, 107, 107, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.modern-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.modern-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.modern-button:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.modern-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.upload-btn {
  align-self: flex-start;
}

.copy-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}

.clear-btn {
  align-self: center;
  margin-top: 20px;
}

.icon {
  width: 18px;
  height: 18px;
  fill: #ffffff;
}

.fullscreen-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.liquid-circle {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(0, 205, 137, 0.5) 10%, transparent 70%);
  border-radius: 50%;
  animation: liquidMorph 2s ease-in-out infinite;
}

.liquid-circle.delayed {
  animation-delay: 0.5s;
  background: radial-gradient(circle, rgba(35, 213, 171, 0.5) 10%, transparent 70%);
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: float 8s ease-in-out infinite;
  z-index: 1;
}

.glow-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #00cd89 0%, transparent 70%);
  top: 10%;
  left: 20%;
  animation-delay: 0s;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #23d5ab 0%, transparent 70%);
  bottom: 15%;
  right: 15%;
  animation-delay: 2s;
}

.glow-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #52eed1 0%, transparent 70%);
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

.custom-toast.success {
  --background: rgba(46, 204, 113, 0.9);
  --color: #ffffff;
  --border-radius: 12px;
  backdrop-filter: blur(10px);
}

.custom-toast.error {
  --background: rgba(231, 76, 60, 0.9);
  --color: #ffffff;
  --border-radius: 12px;
  backdrop-filter: blur(10px);
}

.liquid-fade-enter-active,
.liquid-fade-leave-active {
  transition: opacity 0.3s ease;
}

.liquid-fade-enter-from,
.liquid-fade-leave-to {
  opacity: 0;
}

@keyframes liquidMorph {
  0% {
    transform: scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }

  25% {
    transform: scale(1.1) rotate(90deg);
    border-radius: 60% 40% 50% 50%;
  }

  50% {
    transform: scale(1) rotate(180deg);
    border-radius: 50% 50% 40% 60%;
  }

  75% {
    transform: scale(1.1) rotate(270deg);
    border-radius: 40% 60% 60% 40%;
  }

  100% {
    transform: scale(1) rotate(360deg);
    border-radius: 50% 50% 50% 50%;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }

  50% {
    transform: translateY(-20px) scale(1.05);
    opacity: 0.5;
  }

  100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }
}
</style>
