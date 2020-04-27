
import React from 'react';
import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import ImageUploadButton from './ImageUploadButton';

function absoluteCropToRelative(crop, image) {
  return {
    x: crop.x / image.width,
    y: crop.y / image.height,
    width: crop.width / image.width,
    height: crop.height / image.height,
  }
}

function relativeCropToAbsolute(crop, image) {
  return {
    x: image.width * crop.x,
    y: image.height * crop.y,
    width: image.width * crop.width,
    height: image.height * crop.height,
  }
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      resolve(image)
    };
  });
};

async function generateImageWithSize(src, crop, maxSize) {
  const image = await loadImage(src);

  console.log(image.naturalWidth, image.naturalHeight)
  console.log(crop)
  crop = relativeCropToAbsolute(crop, image);
  console.log(crop)

  const canvas = document.createElement('canvas');

  const ratio = crop.width / crop.height;
  canvas.width = (ratio >= 1 ? maxSize : ratio*maxSize);
  canvas.height = (ratio < 1 ? maxSize : maxSize/ratio);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  console.log(canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob(blob => {
      blob.name = 'image.jpeg';
      resolve(blob);
    }, 'image/jpeg', 1);
  });
}

export default function PhotoEditModal(props) {
  const [crop, setCrop] = useState({
    aspect: 1,
  });
  const [image, setImage] = useState();
  const [src, setSrc] = useState(props.src);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
    if (image) {
      props.onValueChange('crop', absoluteCropToRelative(newCrop, image));
    }
  };

  const onImageLoaded = image => {
    setImage(image);

    setCrop({
      ...relativeCropToAbsolute(props.crop, image),
      aspect: 1,
    });

    return false;
  };

  function onUpload(file) {
    setSrc(URL.createObjectURL(file));

    props.onValueChange('img_original', file);
  };

  async function save() {
    const relativeCrop = absoluteCropToRelative(crop, image);
    const imgMedium = await generateImageWithSize(src, relativeCrop, 500);
    const imgSmall = await generateImageWithSize(src, relativeCrop, 200);

    props.onValueChange('img_medium', imgMedium);
    props.onValueChange('img', imgSmall);

    props.onSave()
  }

  return <Dialog onClose={() => props.onCancel()} open={true}>
    <DialogTitle >Editar imagem</DialogTitle>
    <DialogContent>
      <Box><ImageUploadButton onUpload={onUpload}/></Box>
      <Box>
        <ReactCrop src={src} crop={crop} onChange={onCropChange} onImageLoaded={onImageLoaded}/>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel} color="primary">
        Cancelar
      </Button>
      <Button onClick={save} color="primary">
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
}
