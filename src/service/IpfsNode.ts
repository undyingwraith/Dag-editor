import {CID, create, IPFSHTTPClient} from 'ipfs-http-client';

export class IpfsNode {
	private node: IPFSHTTPClient;
	private static instance: IpfsNode | null = null;

	private constructor() {
		this.node = create({url: '/ip4/127.0.0.1/tcp/5001'});
	}

	public static getInstance() {
		if (this.instance === null) {
			this.instance = new IpfsNode();
		}
		return this.instance;
	}

	public getNode() {
		return this.node;
	}

	read(cid: CID) {
		return this.node.dag.get(cid);
	}

	write(data: any) {
		return this.node.dag.put(data)
	}

	initEmpty() {
		return this.write({})
	}
}
