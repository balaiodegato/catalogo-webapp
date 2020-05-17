import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import {
  STATE_COLORS,
  STATE_LABELS,
  GENDER_LABELS,
  TEST_RESULT_LABELS,
  VALID_KINDS,
  DEFAULT_PHOTOS,
  formatDate,
} from '../../../common';

function formatAge(dt) {
  const monthsTotal = moment().diff(moment(dt), 'month')
  const years = Math.floor(monthsTotal/12)
  const months = monthsTotal % 12

  if (years === 0) {
    return `${months} meses`
  } else {
    return `${years} anos e ${months} meses`
  }
}

function formatBirthday(dt) {
  if (!dt) {
    return '-'
  }

  return <span>{formatDate(dt)}<br></br>({formatAge(dt)})</span>
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

function EditableDateField(props) {
  const defaultValue = props.defaultValue ? moment(props.defaultValue).toDate() : new Date()
  const [selectedDate, handleDateChange] = useState(defaultValue)

  const onValueChange = value => {
    handleDateChange(value)
    props.onChange(value.format('YYYY-MM-DD'))
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

function CastrationEditFields(props) {
  const pet = props.pet
  const [castrated, setCastrated] = useState(pet.castrated)

  function onCastratedCheck(e) {
    setCastrated(e.target.checked)
    props.onValueChange('castrated', e.target.checked)
    if (!e.target.checked && pet.castrated) {
      props.onValueChange('castration_date', moment().format('YYYY-MM-DD'))
    } else if (e.target.checked) {
      props.onValueChange('castration_date', pet.castration_date)
    }
  }

  return <>
    <FormControlLabel
      value="castrated"
      control={
        <Checkbox
          color="primary"
          checked={castrated}
          onChange={value => onCastratedCheck(value)}
        />
      }
      label="Castrado"
      labelPlacement="start"
    />
    {!castrated && <EditableDateField
      label="Data prevista para castração"
      defaultValue={pet.castration_date}
      onChange = {
        value => props.onValueChange('castration_date', value)
      }
    />}
  </>
}

function DateField(props) {
  const formatFn = props.format || formatDate
  const optionalProps = {}
  if (props.marginTop) {
    optionalProps.marginTop = props.marginTop
  }
  return <>{props.editMode ?
    <EditableDateField
      label={props.label}
      defaultValue={props.originalValue}
      onChange={value => props.onValueChange(value)}
    />
    : <Box display="flex" {...optionalProps}>
      <span><b>{props.label}:</b> {formatFn(props.originalValue)}</span>
    </Box>
  }</>
}

function MainInfo(props) {
  const [editMode, onEdit, onValueChange, onSave] = useEditMode(props.onSave, !props.pet.id);

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
            {Object.keys(STATE_LABELS).map(code =>
              <option key={code} value={code}>{STATE_LABELS[code]}</option>)}
          </Select>
          : <Box fontSize="25px">({STATE_LABELS[pet.status]})</Box>
        }
      </Box>
      <Box fontSize="20px" marginTop="20px" display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignContent="flex-start">
          <DateField
            label="Data de nascimento"
            originalValue={pet.when_born}
            onValueChange={value => onValueChange('when_born', value)}
            format={formatBirthday}
            editMode={editMode}
          />
          <DateField
            label="Data do resgate"
            originalValue={pet.rescue_date}
            onValueChange={value => onValueChange('rescue_date', value)}
            editMode={editMode}
            marginTop="10px"
          />
          {editMode ?
            <Select
              native
              variant="outlined"
              autoWidth={true}
              label="Teste"
              defaultValue={pet.test_result}
              onChange={e => onValueChange('test_result', e)}>
              {Object.keys(TEST_RESULT_LABELS[pet.kind]).map(code =>
                <option key={code} value={code}>{TEST_RESULT_LABELS[pet.kind][code]}</option>)}
            </Select>
            : <Box display="flex" marginTop="10px">
                <span><b>Teste: </b> {TEST_RESULT_LABELS[pet.kind][pet.test_result]}</span>
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
              <option key='null' value={null}>{GENDER_LABELS[null]}</option>
              <option key='F' value='F'>{GENDER_LABELS['F']}</option>
              <option key='M' value='M'>{GENDER_LABELS['M']}</option>
            </Select>
            : <Box display="flex"><span><b>Sexo:</b> {GENDER_LABELS[pet.gender]}</span></Box>
          }
          <DateField
            label="Data da adoção"
            originalValue={pet.adoption_date}
            onValueChange={value => onValueChange('adoption_date', value)}
            editMode={editMode}
            marginTop="10px"
          />
          {editMode ?
            <CastrationEditFields pet={pet} onValueChange={onValueChange}/>
            : <>
              <Box display="flex" marginTop="10px">
                <span><b>Castrado:</b> {pet.castrated ? 'Sim' : 'Não'}</span>
              </Box>
              {(!pet.castrated && pet.castration_date) &&
                <Box display="flex" marginTop="10px">
                  <span><b>Data prevista para castração:</b> {formatDate(pet.castration_date)}</span>
                </Box>}
            </>
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
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    async function fetchPet() {
      if (props.petId) {
        const pet = await Api.getPet(props.petId);
        console.log(props.petId, pet)
        pet.crop = pet.crop || {x: 0, y: 0, width: 1, height: 1}
        savePet(pet);
      } else if (props.petId === null && VALID_KINDS.includes(props.kind)) {
        savePet({kind: props.kind})
      }
    }
    fetchPet();
  // eslint-disable-next-line
  }, [props.petId, dataTimestamp]);

  async function onSave(newValues) {
    if (props.petId === null) {
      if (newValues.name) {
        setLoading(true);
        const newPet = await Api.createPet({...newValues, kind: props.kind})
        history.push('/details/' + newPet.id);
      }
    } else {
      if (Object.keys(newValues).length > 0) {
        savePet({...pet, ...newValues})
        setLoading(true);
        await Api.savePet(pet.id, newValues);
        saveDataTimestamp(Date.now());
        setLoading(false);
      }
    }
  }

  if (!pet) {
    return <Box>Loading</Box>
  }

  return (
    <Box padding="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#EEEEEE">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Box width="1000px" display="flex" justifyContent="center">
          { pet.id &&
            <ProfilePhoto
              src={pet.img_medium || pet.img || pet.img_original || DEFAULT_PHOTOS[pet.kind]}
              originalSrc={pet.img_original || pet.img}
              width={200}
              height={200}
              crop={pet.crop}
              onSave={onSave}
              borderColor={STATE_COLORS[pet.status]}
            ></ProfilePhoto>
          }
          <MainInfo pet={pet} onSave={onSave}></MainInfo>
        </Box>
      </MuiPickersUtilsProvider>
      {
        pet.id &&
        <>
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
        </>
      }
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default Details;
