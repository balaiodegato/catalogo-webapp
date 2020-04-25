
import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { yellow } from '@material-ui/core/colors';

import { useEditMode } from '../hooks';

import CroppedImage from './CroppedImage';
import PhotoEditModal from './PhotoEditModal';

const useStyles = makeStyles(theme => ({
  box: {
    borderWidth: 20,
    borderStyle: 'solid',
    borderColor: props => props.borderColor,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    width: props => props.width,
    height: props => props.height,
    '&:hover $editbutton': { display: 'block' },
  },
  editbutton: {
    position: 'absolute',
    top: theme.spacing(0),
    right: theme.spacing(0),
    padding: theme.spacing(1),
    'min-width': 0,
    zIndex: 1,
    display: 'none',
  },
}));

function ProfilePhoto(props) {
  const classes = useStyles(props);
  const [editMode, onEdit, onValueChange, onSave, onCancel] = useEditMode(props.onSave);

  return (<div>
    {editMode &&
      <PhotoEditModal
        src={props.originalSrc}
        crop={props.crop}
        onValueChange={onValueChange}
        onSave={onSave}
        onCancel={onCancel}/>
    }
    <Box className={classes.box}>
      {!editMode &&
        <Button color="primary" className={classes.editbutton} onClick={onEdit}>
          <EditIcon ></EditIcon>
        </Button>
      }
      <img src={props.src} width={props.width} height={props.height} alt='animal'/>
    </Box>
  </div>);
}

export default ProfilePhoto;
