export const checkImagePath = (imagePath: string) => {
  const img = new Image();
  img.src = imagePath;
  
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
  });
};