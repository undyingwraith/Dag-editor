import {AppBar, Button, TextField, Toolbar} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeView from '@material-ui/lab/TreeView';
import {CID} from 'ipfs-http-client';
import React, {useState} from 'react';
import './App.css';
import {DagNodeRenderer} from './components/DagNodeRenderer';
import {IpfsNode} from './service/IpfsNode';

function App() {
	const [root, setRoot] = useState<CID | undefined>();
	const [value, setValue] = useState('');

	const loadCid = () => {
		const cid = CID.parse(value);
		if (cid)
			setRoot(cid);
		else
			alert('invalid cid');
	};

	const newCid = () => {
		IpfsNode.getInstance().initEmpty().then(r => {
			setRoot(r);
		});
	};

	return <>
		<AppBar position="static">
			<Toolbar>
				<TextField
					value={value}
					label={'cid'}
					onChange={e => setValue(e.target.value)}
				/>
				<Button onClick={loadCid}>Load</Button>
				<Button onClick={newCid}>New</Button>
			</Toolbar>
		</AppBar>
		<main>
			{root && <TreeView
                defaultCollapseIcon={<ArrowDropDownIcon/>}
                defaultExpandIcon={<ArrowRightIcon/>}
                defaultEndIcon={<div style={{width: 24}}/>}
                defaultExpanded={['root']}
            >
                <DagNodeRenderer
                    name={'root'}
                    node={root}
                    onChange={(cid) => setRoot(cid)}
                />
            </TreeView>}
		</main>
	</>;
}

export default App;
