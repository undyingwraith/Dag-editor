import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';
import {IAddAction} from '../struct/actions';
import {IDialogCommonProps} from './IDialogCommonProps';

export const AddDialog = (props: AddDialogProps) => {
	const [name, setName] = useState('');
	const [value, setValue] = useState('');

	const reset = () => {
		setName('')
		setValue('')
	}

	const cancel = () => {
		props.onClose()
		reset()
	}

	const add = () => {
		props.onAdd(name, value);
		reset()
	}

	return <Dialog {...props}>
		<DialogTitle id="form-dialog-title">Add entry</DialogTitle>
		<DialogContent>
			<TextField
				autoFocus
				margin="dense"
				label={'Name'}
				fullWidth
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<TextField
				margin="dense"
				label={'Value'}
				fullWidth
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</DialogContent>
		<DialogActions>
			<Button onClick={cancel} color="primary">
				Cancel
			</Button>
			<Button onClick={add} color="primary">
				Add
			</Button>
		</DialogActions>
	</Dialog>;
};

export interface AddDialogProps extends IDialogCommonProps {
	onAdd: IAddAction
}
