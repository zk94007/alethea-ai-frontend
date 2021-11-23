import React from 'react';
import './styles.scss';
import {TextField, FormControl, MenuItem, Select, Button} from '@material-ui/core';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

export default function AvatarVoiceForm({
  index,
  name,
  language,
  voice,
  src,
  onNameChange,
  onLangChange,
  onVoiceChange
}) {
  return (
    <div key={index} className="d-flex flex-column w-100">
      <label className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
        What is the name of your AI Avatar?
      </label>
      <TextField
        id="name-input"
        variant="outlined"
        className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-3"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        placeholder="Please enter your name here"
      />
      <label className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
        Which language should your AI Avatar speak?
      </label>
      <FormControl variant="outlined" className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-3">
        <Select
          labelId="avatar-language-label-id"
          id="avatar-language-id"
          value={language}
          onChange={event => onLangChange(event.target.value)}
          // label="Age"
        >
          <MenuItem value={'V-1.mp4'}>English (American Accent)</MenuItem>
          <MenuItem value={'V-2.mp4'}>English (England Accent)</MenuItem>
          <MenuItem value={'V-3.mp4'}>English (Australian Accent)</MenuItem>
        </Select>
      </FormControl>
      <label className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
        Please select a voice for your AI Avatar
      </label>
      <FormControl variant="outlined" className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-4">
        <Select
          labelId="avatar-language-label-id"
          id="avatar-language-id"
          value={voice}
          onChange={event => onVoiceChange(event.target.value)}
          // label="Age"
        >
          <MenuItem value={'Kimberly'}>Male</MenuItem>
          <MenuItem value={'Joey'}>Female</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" className="mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-4">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h5 className="font-weight-medium">AI Avatar’s Voice sample</h5>
          <PlayCircleFilledWhiteOutlinedIcon />
        </div>
      </Button>
    </div>
  );
}
