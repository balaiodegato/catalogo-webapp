import React from 'react';
import { useState, useEffect } from 'react';
import './Details.css';

import Api from '../../../api';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { yellow } from '@material-ui/core/colors';
import moment from 'moment';

import { useEditMode } from './hooks';
import ProfilePhoto from './components/ProfilePhoto';
import { STATE_COLORS } from '../../../common';

const GENDER_MAP = {
  'M': 'Macho',
  'F': 'Fêmea',
  null: '-',
}

const STATE_DESCRIPTIONS = {
  'star': 'Estrelinha',
  'available': 'Para adoção',
  'adopted': 'Adotado',
  'resident': 'Residente',
};

const TEST_RESULT_STRINGS = {
  cat: {
    'fiv-positive': 'Positivo fiv',
    'felv-positive': 'Positivo felv',
    'fiv-felv-positive': 'Positivo fiv e felv',
    'negative': 'Negativo',
    null: 'Não testado',
  },
  dog: {
    true: 'Positivo leishmaniose',
    false: 'Negativo',
    null: 'Não testado',
  },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function formatDate(dt) {
  if (!dt) {
    return '-'
  }

  return moment(dt).format('DD/MM/YYYY')
}

function EditableDateField(props) {
  const defaultValue = props.defaultValue ? moment(props.defaultValue).toDate() : new Date()
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
            defaultValue={pet.status}
            onChange={e => onValueChange('status', e)}>
            {Object.keys(STATE_DESCRIPTIONS).map(code =>
              <option key={code} value={code}>{STATE_DESCRIPTIONS[code]}</option>)}
          </Select>
          : <Box fontSize="25px">({STATE_DESCRIPTIONS[pet.status]})</Box>
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
              onChange={e => onValueChange('test_result', e)}>
              {Object.keys(TEST_RESULT_STRINGS[pet.kind]).map(code =>
                <option key={code} value={code}>{TEST_RESULT_STRINGS[pet.kind][code]}</option>)}
            </Select>
            : <Box display="flex" marginTop="10px">
                <span><b>Teste: </b> {TEST_RESULT_STRINGS[pet.kind][pet.test_result]}</span>
              </Box>
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
              onChange={e => onValueChange('gender', e)}>
              <option key='null' value={null}>{GENDER_MAP[null]}</option>
              <option key='F' value='F'>{GENDER_MAP['F']}</option>
              <option key='M' value='M'>{GENDER_MAP['M']}</option>
            </Select>
            : <Box display="flex"><span><b>Sexo:</b> {GENDER_MAP[pet.gender]}</span></Box>
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
  const [editMode, onEdit, onValueChange, onSave] = useEditMode(props.onSave);

  const classes = useStyles()

  return <Box
      width="970px"
      marginTop="20px"
      borderLeft={20}
      borderRadius={20}
      borderColor={props.borderColor}
      bgcolor={props.borderColor}
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
        className={classes.relativepos}
      >
        {editMode ?
          <Button color="primary" className={classes.editbutton} onClick={onSave}><SaveAltIcon ></SaveAltIcon></Button>
          : <Button color="primary" className={classes.editbutton} onClick={onEdit}><EditIcon ></EditIcon></Button>
        }
        <Box display="flex"><h2>{props.title}</h2></Box>
        {editMode ?
          <TextField multiline fullWidth onChange={e => onValueChange('text', e)} label={props.title} variant="outlined" defaultValue={props.text}/>
          : <Box display="flex"><p>{props.text}</p></Box>
        }
      </Box>
  </Box>
}

function Sponsorship(props) {
  const [editMode, onEdit, onValueChange, onSave] = useEditMode(props.onSave);
  const [editChecked, setEditChecked] = useState(!!props.text)

  const classes = useStyles()

  function onTextChange(e) {
    setEditChecked(!!e.target.value)
    onValueChange('text', e.target.value)
  }

  return <Box
      width="970px"
      marginTop="20px"
      borderLeft={20}
      borderRadius={20}
      borderColor={props.borderColor}
      bgcolor={props.borderColor}
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
        className={classes.relativepos}
      >
        {editMode ?
          <Button color="primary" className={classes.editbutton} onClick={onSave}><SaveAltIcon ></SaveAltIcon></Button>
          : <Button color="primary" className={classes.editbutton} onClick={onEdit}><EditIcon ></EditIcon></Button>
        }
        <Box display="flex"><h2>Apadrinhamento</h2></Box>
        <Box display="flex">
          <Checkbox
            checked={editMode ? editChecked : !!props.text}
            color="primary"
            disabled
          />
          {editMode ?
            <Box flexGrow={1}><TextField fullWidth flexGrow={1} onChange={onTextChange} variant="outlined" defaultValue={props.text}/></Box>
            : <Box display="flex"><p>{props.text}</p></Box>
          }
        </Box>
      </Box>
  </Box>
}

function Details(props) {
  const [pet, savePet] = useState(null)
  const [dataTimestamp, saveDataTimestamp] = useState(Date.now())
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    async function fetchPet() {
      const pet = await Api.getPet(props.petId);
      pet.crop = pet.crop || {x: 0, y: 0, width: 1, height: 1}
      savePet(pet);
    }
    fetchPet();
  // eslint-disable-next-line
  }, [props.petId, dataTimestamp]);

  async function onSave(newValues) {
    savePet({...pet, ...newValues})
    setLoading(true);
    await Api.savePet(pet.id, newValues);
    saveDataTimestamp(Date.now());
    setLoading(false);
  }

  if (!pet) {
    return <Box>Loading</Box>
  }

  return (
    <Box padding="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#EEEEEE">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Box width="1000px" display="flex" justifyContent="center">
          <ProfilePhoto
            src={pet.img_medium || pet.img || pet.img_original}
            originalSrc={pet.img_original || pet.img}
            width={200}
            height={200}
            crop={pet.crop}
            onSave={onSave}
            borderColor={STATE_COLORS[pet.status]}
          ></ProfilePhoto>
          <MainInfo pet={pet} onSave={onSave}></MainInfo>
        </Box>
      </MuiPickersUtilsProvider>
      <InfoBox
        title="Informações sobre resgate"
        text={pet.rescue_info}
        onSave={data => onSave({rescue_info: data.text})}
        borderColor={STATE_COLORS[pet.status]}
      >
      </InfoBox>
      <InfoBox
        title="Informações comportamentais"
        text={pet.behaviour_info}
        onSave={data => onSave({behaviour_info: data.text})}
        borderColor={STATE_COLORS[pet.status]}
      >
      </InfoBox>
      <Sponsorship
        text={pet.sponsorship}
        onSave={data => onSave({sponsorship: data.text})}
        borderColor={STATE_COLORS[pet.status]}
      >
      </Sponsorship>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default Details;
