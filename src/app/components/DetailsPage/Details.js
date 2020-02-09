import React from 'react';
import { useState } from 'react';
import './Details.css';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { makeStyles } from '@material-ui/core/styles';

import example_photo from '../../../assets/pet_photo_example.jpeg'
import { yellow } from '@material-ui/core/colors';

function ProfilePhoto(props) {
  return <Box width={props.width} height={props.height} border={20} borderColor={yellow} borderRadius={20}>
    <img width={props.width} height={props.height} alt="Foto do pet" src={props.url}></img>
  </Box>;
}

const STATE_DESCRIPTIONS = {
  "resident": "residente do abrigo",
};

const TEST_RESULT_STRINGS = {
  "negative": "Negativo",
}

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function MainInfo(props) {
  const [editValues, setEditValues] = useState({})
  function onNameChange(event) {
    const name = event.target.name
    setEditValues(editValues => ({
      ...editValues,
      name: name,
    }));
  }

  const pet = props.pet;

  return (
    <Box width="790px" marginLeft="10px" border={20} borderRadius={20} borderColor="#FFFFFF" bgcolor="#FFFFFF">
      <Box display="flex" flexDirection="row">
        {props.editMode ?
          <TextField onChange={onNameChange} label="Nome" variant="outlined" defaultValue={pet.name}/>
          : <Box fontSize="30px"><b>{pet.name}</b></Box>
        }
      </Box>
      <Box display="flex" flexDirection="row">
        <Box fontSize="25px">({STATE_DESCRIPTIONS[pet.current_state]})</Box>
      </Box>
      <Box fontSize="20px" marginTop="20px" display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignContent="flex-start">
          <Box display="flex"><span><b>Idade:</b> {pet.age}</span></Box>
          <Box display="flex" marginTop="10px"><span><b>Data do resgate:</b> {pet.rescue_date}</span></Box>
          <Box display="flex" marginTop="10px"><span><b>Teste: </b> {TEST_RESULT_STRINGS[pet.test_result]}</span></Box>
        </Box>
        <Box marginLeft="20px" display="flex" flexDirection="column" justifyContent="flex-start" alignContent="flex-start">
          <Box display="flex"><span><b>Sexo:</b> {pet.gender}</span></Box>
          <Box display="flex" marginTop="10px"><span><b>Data da adoção:</b> {pet.adoption_date}</span></Box>
          <Box display="flex" marginTop="10px"><span><b>Castrado: </b> {
            pet.castration_date ? `Sim (${pet.castration_date})` : "Não"
          }</span></Box>
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
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()

  function save() {
    setEditMode(false)
  }

  const pet = {
    photo_url: example_photo,
    name: "Renatinho",
    current_state: "resident",
    age: 12,
    rescue_date: "2018-12-09",
    test_result: "negative",
    gender: "M",
    adoption_date: null,
    castration_date: "2018-12-15",
    rescue_info: "Lorem ipsum rescue",
    behaviour_info: "Lorem ipsum behaviour",
  };

  return (
    <Box padding="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#EEEEEE">
      {editMode ?
        <Fab className={classes.fab} color="primary" aria-label="save">
          <SaveAltIcon onClick={() => save()}></SaveAltIcon>
        </Fab>
        :
        <Fab className={classes.fab} color="primary" aria-label="edit">
          <EditIcon onClick={() => setEditMode(true)}></EditIcon>
        </Fab>
      }
      <Box width="1000px" display="flex" justifyContent="center">
        <ProfilePhoto url={pet.photo_url} width="200px" height="200px"></ProfilePhoto>
        <MainInfo pet={pet} editMode={editMode}></MainInfo>
      </Box>
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
