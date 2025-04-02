import { ref, Ref } from 'vue';
//This is a no encrypted version. When using it, please use SEA for encryption before executing the sending instruction.

export function useImageToBase64() {
  const base64String: Ref<string> = ref('');
  const error: Ref<string | null> = ref(null);


  const convertToBase64 = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        error.value = 'only support image file';
        reject(new Error('only support image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        base64String.value = reader.result as string;
        error.value = null;
        resolve();
      };
      reader.onerror = () => {
        error.value = 'image read failed';
        reject(new Error('image read failed'));
      };
      reader.readAsDataURL(file);
    });
  };

  // handle file input
  const handleFileInput = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      error.value = 'no file selected';
      return;
    }

    const file = input.files[0];
    try {
      await convertToBase64(file);
    } catch (err) {
      console.error(err);
    }
  };

  // set Base64 string from text input
  const setBase64FromText = (value: string) => {
    if (isValidBase64Image(value)) {
      base64String.value = value;
      error.value = null;
    } else {
      error.value = 'invalid Base64 image string';
      base64String.value = '';
    }
  };

  // validate if it is a valid Base64 image string
  const isValidBase64Image = (str: string): boolean => {
    const imageRegex = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/i;
    return imageRegex.test(str);
  };

  // clear Base64 and error
  const clear = () => {
    base64String.value = '';
    error.value = null;
  };

  return {
    base64String,
    error,
    convertToBase64,
    handleFileInput,
    setBase64FromText,
    isValidBase64Image,
    clear,
  };
}
