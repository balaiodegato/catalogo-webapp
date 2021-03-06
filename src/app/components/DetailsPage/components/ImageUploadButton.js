
import React from 'react';
import { useRef } from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
})

export default function ImageUploadButton(props) {
  const inputElement = useRef()

  function onClick() {
    inputElement.current.click()
  }

  function onUploadClick(e) {
    e.target.value = null;
  }

  async function onChange(e) {
    const files = e.target.files;
    props.onUpload(files[0]);
  }

  const classes = useStyles(props);

  return <div>
    <Button variant="contained" color="primary" onClick={onClick}>
      Upload
    </Button>
    <input
      className={classes.input}
      type="file"
      ref={inputElement}
      name={'imageupload'}
      multiple={false}
      onChange={onChange}
      onClick={onUploadClick}
      accept={'image/*'}
    />
  </div>
}
