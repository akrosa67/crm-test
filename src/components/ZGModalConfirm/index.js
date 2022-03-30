
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export const ZGModalConfirm = (props) => {
    const {
        onClose,
        open,
        ...other } = props;
    let { action } = props;
    action = { title: '', msg: 'Do you want to delete?', confirmTxt: 'Ok', discardTxt: 'Cancel', ...action };
    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>{action.title}</DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="subtitle1" gutterBottom component="div">{action.msg}</Typography>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" autoFocus onClick={handleCancel}>
                    {action.discardTxt}
                </Button>
                <Button variant="contained" onClick={handleOk}>{action.confirmTxt}</Button>
            </DialogActions>
        </Dialog>

    );
}

ZGModalConfirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};