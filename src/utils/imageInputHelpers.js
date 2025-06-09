export function validateImage(file, maxSize) {
  if (!file) return "No file selected";

  if (!file.type.startsWith("image/")) return "Please select an image file";

  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  }
}

export function getImageInputUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve(e.target?.result);
    reader.onerror = (e) => reject(e);
  });
}

// const handleFileSelect = (event) => {
//   const file = event.target.files[0];

//   setError(validateImage(file, maxSize));

//   console.log("@handleFileSelect --- error state:", error);
//   if (error) return;

//   setSelectedImage(file);

//   setPreview(null); // Reset preview before loading new image

//   getImageInputUrl(file)
//     .then((url) => {
//       setPreview(url);
//     })
//     .catch((err) => {
//       console.error("Error loading image:", err);
//       setError("Failed to load image preview");
//     });
// };
