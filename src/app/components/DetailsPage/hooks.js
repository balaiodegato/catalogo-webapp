
import { useState } from 'react';

export function useEditMode(saveCallback) {
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState({});
  function onValueChange(name, event) {
    const value = (event && event.target && event.target.value) ? event.target.value : event;
    setEditValues(editValues => ({
      ...editValues,
      [name]: value,
    }));
  }
  function onSave() {
    saveCallback(editValues);
    setEditMode(false);
  }
  function onEdit() {
    setEditValues({});
    setEditMode(true);
  }

  return [editMode, onEdit, onValueChange, onSave];
}
