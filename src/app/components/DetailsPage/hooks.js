
import { useState, useRef } from 'react';

export function useEditMode(saveCallback) {
  const [editMode, setEditMode] = useState(false);
  const editValues = useRef({});
  function onValueChange(name, event) {
    const value = (event && event.target && event.target.value) ? event.target.value : event;
    editValues.current = {
      ...editValues.current,
      [name]: value,
    };
  }
  function onSave() {
    saveCallback(editValues.current);
    setEditMode(false);
  }
  function onEdit() {
    editValues.current = {};
    setEditMode(true);
  }

  return [editMode, onEdit, onValueChange, onSave];
}
