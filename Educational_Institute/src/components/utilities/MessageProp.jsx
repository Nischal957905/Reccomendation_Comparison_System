import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

const PopMessage = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageProp({stateValue,messageType,message,destroy}){

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={stateValue} autoHideDuration={6000} onClose={destroy}>
            <PopMessage onClose={destroy} severity={messageType} sx={{ width: '100%' }}>
              {message}
            </PopMessage>
          </Snackbar>
              {/* <Alert severity="error">This is an error message!</Alert>
              <Alert severity="warning">This is a warning message!</Alert>
              <Alert severity="info">This is an information message!</Alert>
              <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    )
}