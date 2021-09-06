import {CID} from 'ipfs-http-client';
import {useEffect, useMemo, useState} from 'react';
import {CommonActions} from './CommonActions';
import {PropertyRenderer} from './PropertyRenderer';
import {TreeItem} from './TreeItem';
import {IpfsNode} from '../service/IpfsNode';
import {ICommonActions} from '../struct/ICommonActions';

export const DagNodeRenderer = (props: DagNodeRendererProps) => {
	const {node, onChange, onRename, onDelete, name} = props;
	const [value, setValue] = useState<any>();
	const [inputValue, setInputValue] = useState('');
	const [inputName, setInputName] = useState('');

	useEffect(() => {
		IpfsNode.getInstance().read(node)
			.then(r => {
				setValue(r.value);
			});
	}, [node]);

	const content = useMemo(() => value && Object.keys(value).map((k) => {
		return <PropertyRenderer
			key={k}
			name={k}
			value={value[k]}
			onChange={(value1) => {
				value[k] = value1;
				update(value);
			}}
			onDelete={() => {
				delete value[k];
				update(value);
			}}
			onRename={(name) => {
				value[name] = value[k];
				delete value[k];
				update(value);
			}}
		/>;
	}), [value]);

	const addAttr = () => {
		let val = value;
		if (inputValue.startsWith('Qm') || inputValue.startsWith('bafy')) {
			const cid = CID.parse(inputValue);
			if (cid) {
				val[inputName] = cid;
			} else {
				alert('fuck'); //TODO: properly log error
			}
		} else {
			val[inputName] = inputValue;
		}

		update(val);
		setInputName('');
		setInputValue('');
	};

	const update = (val: any) => {
		IpfsNode.getInstance().getNode().dag.put(val)
			.then(r => {
				onChange && onChange(r);
			});
	};

	return <TreeItem path={name} value={node.toString()}>
		<CommonActions
			name={name}
			value={value}
			onRename={onRename}
			onDelete={onDelete}
			onAdd={(inputName, inputValue) => {
				let val = value;
				if (inputValue.startsWith('Qm') || inputValue.startsWith('bafy')) {
					const cid = CID.parse(inputValue);
					if (cid) {
						val[inputName] = cid;
					} else {
						alert('fuck'); //TODO: properly log error
					}
				} else {
					val[inputName] = inputValue;
				}

				update(val);
			}}
		/>
		{content}
	</TreeItem>;
};

export interface DagNodeRendererProps extends ICommonActions {
	name: string
	node: CID
}
