import React from 'react';

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';


const DatePickerField = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
    </MuiPickersUtilsProvider>
  );
}

export default DatePickerField