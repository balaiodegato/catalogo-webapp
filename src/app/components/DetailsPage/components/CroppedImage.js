
import React from 'react';
import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  img: props => ({
    position: 'absolute',
    left: -(props.crop.x * (props.width / props.crop.width)),
    top: -(props.crop.y * (props.height / props.crop.height)),
    transform: `scale(${(props.width/props.crop.width)}, ${(props.height/props.crop.height)})`,
    transformOrigin: 'top left',
  }),
})

export default function CroppedImage(props) {
  const [crop, setCrop] = useState(props.crop)

  useEffect(() => {
    const srcImage = new Image();
    srcImage.onload = () => {
      setCrop({
        x: props.crop.x * srcImage.width,
        y: props.crop.y * srcImage.height,
        width: props.crop.width * srcImage.width,
        height: props.crop.height * srcImage.height,
      })
    };
    srcImage.src = props.src;
  }, [props.src, props.crop])

  const classes = useStyles({ ...props, crop });

  return <img className={classes.img} alt="Foto do pet" src={props.src}></img>
}
