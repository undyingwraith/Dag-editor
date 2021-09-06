import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IDialogCommonProps} from './IDialogCommonProps';

export const RenameDialog = (props: RenameDialogProps) => {
	const [value, setValue] = useState(props.name)

	useEffect(() => {
		setValue(props.name)
	}, [props.name])

	return <Dialog {...props}>
		<DialogTitle id="form-dialog-title">Rename property</DialogTitle>
		<DialogContent>
			<TextField
				autoFocus
				margin="dense"
				label={`New name for '${props.name}'`}
				fullWidth
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</DialogContent>
		<DialogActions>
			<Button onClick={props.onClose} color="primary">
				Cancel
			</Button>
			<Button onClick={() => props.onSave(value)} color="primary">
				Save
			</Button>
		</DialogActions>
	</Dialog>;
};

export interface RenameDialogProps extends IDialogCommonProps {
	onSave: (value: any) => void
	name: string
}
