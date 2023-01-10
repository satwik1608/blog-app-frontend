import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
