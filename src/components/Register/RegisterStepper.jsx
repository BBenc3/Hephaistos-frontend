import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const RegisterStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} sx={{ mt: 3, marginTop: 1, width: '100%'}}>
      <Step><StepLabel>Lépés 1</StepLabel></Step>
      <Step><StepLabel>Lépés 2</StepLabel></Step>
      <Step><StepLabel>Lépés 3</StepLabel></Step>
    </Stepper>
  );
};

export default RegisterStepper;
