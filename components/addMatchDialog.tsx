import { Dialog, DialogTitle, List, ListItem } from "@mui/material";

export interface AddMatchDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export function AddMatchDialog(props: AddMatchDialogProps) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
      </Dialog>
    );
  }