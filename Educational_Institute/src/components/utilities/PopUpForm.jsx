import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function PopUpForm({formPopStatus, formValue, formValueChange, formSubmit, closeForm}) {

    return (
        <Dialog open={formPopStatus} onClose={closeForm}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <div className='posting-div'>
                    <TextField
                        name='post'
                        value={formValue.post}
                        onChange={formValueChange}
                        label="Post"
                        multiline
                        maxRows={10}
                        size='small'
                        variant='standard'
                        required
                        fullWidth
                    />
                </div>
                <div className='posting-div'>
                    <TextField 
                        name='tag'
                        value={formValue.tag}
                        onChange={formValueChange}
                        label="tag"
                        multiline
                        maxRows={10}
                        size='small'
                        required
                        fullWidth
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeForm}>Cancel</Button>
                <Button onClick={formSubmit}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    )
}