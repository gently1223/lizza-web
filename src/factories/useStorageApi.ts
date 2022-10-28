import { storage } from 'boot/firebase';

export const useStorageApi = () => {
  const uploadImg = async (user_id: string, img: Blob) => {
    try {
      const date = new Date();
      const newImgRef = storage().ref(
        `${user_id}/${date.getTime()}/product.png`
      );
      const newImg = await newImgRef.put(img);
      const url = (await newImg.ref.getDownloadURL()) as string;
      return url;
    } catch (e) {
      console.log(e);
      return '';
    }
  };
  const isURL = (value: string) => {
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  const uploadImgString = async (user_id: string, img: string) => {
    try {
      if (isURL(img)) {
        return img;
      } else {
        const date = new Date();
        const newImgRef = storage().ref(
          `${user_id}/${date.getTime()}/product.png`
        );
        const count = 19;
        const kind = (img.substring('data:image/'.length, img.indexOf(';base64'))).length;
        const sliced = img.slice(count + kind, img.length);
        console.log('The kind file is ==========: ', img.substring('data:image/'.length, img.indexOf(';base64')));
        console.log('sliced: ', sliced);
        const newImg = await newImgRef.putString(sliced, 'base64');
        const url = (await newImg.ref.getDownloadURL()) as string;
        return url;
      }
    } catch (e) {
      console.log(e);
      return '';
    }
  };

  const convertToBlob = async (image: HTMLImageElement) => {
    try {
      const result = await new Promise<Blob | null>((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        console.log(image.width, image.height);
        canvas.width = image.width;
        canvas.height = image.height;
        // //console.log("image loaded", img.target.appendChild);
        if (ctx) {
          ctx.beginPath();
          ctx.drawImage(image, 0, 0, image.width, image.height);
        }
        canvas.toBlob((blob) => {
          resolve(blob);
        });
      });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const convertIMGtoJPEG = (image: any) => {
    URL.revokeObjectURL(image);             // free up memory
    const img = new Image();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    img.src = image;
    const c = document.createElement('canvas');  // create a temp. canvas
    const ctx = c.getContext('2d');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    c.width = img.width;                      // set size = image, draw
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    c.height = img.height;
    if (ctx) {
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }
    // convert to File object, NOTE: we're using binary mime-type for the final Blob/File
    const jpeg = c.toDataURL('image/jpeg', 0.75);  // mime=JPEG, quality=0.75
    console.log('JPEG vill be: ========= ', jpeg)
    return jpeg;
  }

  return { uploadImg, convertToBlob, uploadImgString, convertIMGtoJPEG };
};
