import React, { FC } from 'react';

import classes from './InputTxt.module.scss';

interface InputTxtProps {
  label: string;
  handleKeypress: (newValue: string) => void;
}

const InputTxt: FC<InputTxtProps> = ({ label, handleKeypress }) => {
  return (
    <div className={classes.container}>
      <label>{label}:</label>
      <input onChange={(val) => handleKeypress(val.target.value)} />
    </div>
  );
};

export default InputTxt;
