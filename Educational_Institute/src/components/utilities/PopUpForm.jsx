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
                <label>Post</label>
                <input 
                        name='post'
                        value={formValue.post}
                        onChange={formValueChange}
                />
                <label>Tag</label>
                <input
                    name='tag'
                    value={formValue.tag}
                    onChange={formValueChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeForm}>Cancel</Button>
                <Button onClick={formSubmit}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    )
}