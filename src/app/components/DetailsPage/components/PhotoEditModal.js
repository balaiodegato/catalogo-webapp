
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

export default function PhotoEditModal(props) {
  const [crop, setCrop] = useState({
    aspect: 1,
  });
  const [image, setImage] = useState();
  const [src, setSrc] = useState(props.src);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
    if (image) {
      props.onValueChange('crop', {
        x: newCrop.x / image.width,
        y: newCrop.y / image.height,
        width: newCrop.width / image.width,
        height: newCrop.width / image.height,
      });
    }
  };

  const onImageLoaded = image => {
    setImage(image);

    setCrop({
      x: image.width * props.crop.x,
      y: image.height * props.crop.y,
      width: image.width * props.crop.width,
      height: image.height * props.crop.height,
      aspect: 1,
    });

    return false;
  };

  function onUpload(dataUrl) {
    setSrc(dataUrl);

    props.onValueChange('photo', dataUrl);
  };

  return <Dialog onClose={() => props.onSave()} open={true}>
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
      <Button onClick={props.onSave} color="primary">
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
}
