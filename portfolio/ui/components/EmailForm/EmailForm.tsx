import { buttonKind } from '@/constants/globalConstants';
import React, { FC, useState } from 'react';
import BtnMain from '../buttons/BtnMain/BtnMain';
import InputTxt from '../inputs/InputTxt/InputTxt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import classes from './EmailForm.module.scss';

const EmailForm: FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  return (
    <div className={classes.container}>
      <div>
        <h2>Send an email</h2>
        <div>
          <InputTxt
            label={'Subject'}
            handleKeypress={(val) => setSubject(val)}
          />
        </div>
        <div>
          <InputTxt
            label={'Message'}
            handleKeypress={(val) => setMessage(val)}
          />
        </div>
        <BtnMain
          text={'Send email'}
          kind={buttonKind.LINK}
          linkHref={`mailto:renekrajnc@hotmail.com?subject=${subject}&body=${message}`}
          icon={faEnvelope}
        />
      </div>
    </div>
  );
};

export default EmailForm;
