import React from 'react';
import { useState } from 'react';
import './Details.css';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import example_photo from '../../../assets/pet_photo_example.jpeg'
import { yellow } from '@material-ui/core/colors';
import moment from 'moment';

function ProfilePhoto(props) {
  return <Box width={props.width} height={props.height} border={20} borderColor={yellow} borderRadius={20}>
    <img width={props.width} height={props.height} alt="Foto do pet" src={props.url}></img>
  </Box>;
}

const STATE_DESCRIPTIONS = {
  "resident": "residente do abrigo",
  "other_option1": "opção 1",
  "other_option2": "opção 2",
};

const TEST_RESULT_STRINGS = {
  "negative": "Negativo",
  "positive": "Positivo",
}

const useStyles = makeStyles(theme => ({
  editbutton: {
    position: 'absolute',
    top: theme.spacing(0),
    right: theme.spacing(0),
    padding: theme.spacing(1),
    'min-width': 0,
  },
  relativepos: {
    position: 'relative',
  },
}));

function formatDate(dt) {
  if (!dt) {
    return '-'
  }

  return dt.format('DD/MM/YYYY')
}

function EditableDateField(props) {
  const defaultValue = props.defaultValue ? props.defaultValue.toDate() : new Date()
  const [selectedDate, handleDateChange] = useState(defaultValue)

  const onValueChange = value => {
    handleDateChange(value)
    props.onChange(value)
  }

  return <KeyboardDatePicker
    autoOk
    disableToolbar
    variant="inline"
    format="DD/MM/YYYY"
    margin="normal"
    label={props.label}
    value={selectedDate}
    onChange={onValueChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
}

function useEditMode(saveCallback) {
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

function MainInfo(props) {
  const [editMode, onEdit, onValueChange, onSave] = useEditMode(props.onSave);

  const classes = useStyles()

  const pet = props.pet;

  return (
    <Box className={classes.relativepos} width="790px" marginLeft="10px" border={20} borderRadius={20} borderColor="#FFFFFF" bgcolor="#FFFFFF">
      {editMode ?
        <Button color="primary" className={classes.editbutton} onClick={onSave}><SaveAltIcon ></SaveAltIcon></Button>
        : <Button color="primary" className={classes.editbutton} onClick={onEdit}><EditIcon ></EditIcon></Button>
      }
      <Box display="flex" flexDirection="row">
        {editMode ?
          <TextField onChange={e => onValueChange('name', e)} label="Nome" variant="outlined" defaultValue={pet.name}/>
          : <Box fontSize="30px"><b>{pet.name}</b></Box>
        }
      </Box>
      <Box display="flex" flexDirection="row">
        {editMode ?
          <Select
            native
            variant="outlined"
            autoWidth={true}
            label="Situação"
            defaultValue={pet.current_state}
            onChange={e => onValueChange('state', e)}>
            {Object.keys(STATE_DESCRIPTIONS).map(code =>
              <option key={code} value={code}>{STATE_DESCRIPTIONS[code]}</option>)}
          </Select>
          : <Box fontSize="25px">({STATE_DESCRIPTIONS[pet.current_state]})</Box>
        }
      </Box>
      <Box fontSize="20px" marginTop="20px" display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignContent="flex-start">
          {editMode ?
            <TextField
              type="number"
              InputLabelProps={{shrink: true}}
              onChange={e => onValueChange('age', e)}
              label="Idade (meses)"
              variant="outlined"
              defaultValue={pet.age} />
            : <Box display="flex"><span><b>Idade:</b> {pet.age} meses</span></Box>
          }
          {editMode ?
            <EditableDateField
              label="Data do resgate"
              defaultValue={pet.rescue_date}
              onChange={value => onValueChange('rescue_date', value)}
            />
            : <Box display="flex" marginTop="10px"><span><b>Data do resgate:</b> {formatDate(pet.rescue_date)}</span></Box>
          }
          {editMode ?
            <Select
              native
              variant="outlined"
              autoWidth={true}
              label="Teste"
              defaultValue={pet.test_result}
              onChange={e => onValueChange('state', e)}>
              {Object.keys(TEST_RESULT_STRINGS).map(code =>
                <option key={code} value={code}>{TEST_RESULT_STRINGS[code]}</option>)}
            </Select>
            : <Box display="flex" marginTop="10px"><span><b>Teste: </b> {TEST_RESULT_STRINGS[pet.test_result]}</span></Box>
          }
        </Box>
        <Box marginLeft="20px" display="flex" flexDirection="column" justifyContent="flex-start" alignContent="flex-start">
          {editMode ?
            <Select
              native
              variant="outlined"
              autoWidth={true}
              label="Teste"
              defaultValue={pet.gender}
              onChange={e => onValueChange('state', e)}>
              <option key='F' value='F'>Fêmea</option>
              <option key='M' value='M'>Macho</option>
            </Select>
            : <Box display="flex"><span><b>Sexo:</b> {pet.gender}</span></Box>
          }
          {editMode ?
            <EditableDateField
              label="Data da adoção"
              defaultValue={pet.adoption_date}
              onChange={value => onValueChange('adoption_date', value)}
            />
            : <Box display="flex" marginTop="10px"><span><b>Data da adoção:</b> {formatDate(pet.adoption_date)}</span></Box>
          }
          {editMode ?
            <EditableDateField
              label="Data da castração"
              defaultValue={pet.castration_date}
              onChange={value => onValueChange('castration_date', value)}
            />
            : <Box display="flex" marginTop="10px"><span><b>Castrado: </b> {
                pet.castration_date ? `Sim (${formatDate(pet.castration_date)})` : "Não"
              }</span></Box>
          }
        </Box>
      </Box>
    </Box>
  );
}

function InfoBox(props) {
  return <Box
      width="970px"
      marginTop="20px"
      borderLeft={20}
      borderRadius={20}
      borderColor={yellow}
      bgcolor={yellow}
      padding={0}
      paddingLeft="10px"
    >
      <Box
        border={20}
        borderLeft={0}
        borderRadius={20}
        borderColor="#FFFFFF"
        bgcolor="#FFFFFF"
        paddingLeft="15px"
      >
        <Box display="flex"><h2>{props.title}</h2></Box>
        <Box display="flex"><p>{props.text}</p></Box>
      </Box>
  </Box>
}

function Details(props) {
  function onSave(newValues) {
    console.log(newValues);
    // Call update API
  }

  const pet = {
    photo_url: example_photo,
    name: "Renatinho",
    current_state: "resident",
    age: 12,
    rescue_date: moment("2018-12-09"),
    test_result: "negative",
    gender: "M",
    adoption_date: null,
    castration_date: moment("2018-12-15"),
    rescue_info: "Lorem ipsum rescue",
    behaviour_info: "Lorem ipsum behaviour",
  };

  return (
    <Box padding="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#EEEEEE">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Box width="1000px" display="flex" justifyContent="center">
          <ProfilePhoto url={pet.photo_url} width="200px" height="200px"></ProfilePhoto>
          <MainInfo pet={pet} onSave={onSave}></MainInfo>
        </Box>
      </MuiPickersUtilsProvider>
      <InfoBox
        title="Informações comportamentais"
        text={pet.rescue_info}
      >
      </InfoBox>
      <InfoBox
        title="Informações comportamentais"
        text={pet.behaviour_info}
      >
      </InfoBox>
    </Box>
  );
}

export default Details;
