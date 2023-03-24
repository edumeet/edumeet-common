/**
 * A point in a k-dimensional space. The position array is the coordinates of the point in the space.
 */
export class KDPoint {
	// eslint-disable-next-line no-unused-vars
	constructor(public position: number[], public appData: Record<string, unknown> = {}) {}
}

class KDNode {
	// eslint-disable-next-line no-unused-vars
	constructor(public kdPoint: KDPoint, public axis: number, public left?: KDNode, public right?: KDNode) {}
}

/**
 * A k-dimensional tree. The k parameter is the number of dimensions of the space.
 * The tree is balanced on initial build. The balanceScore method can be used to
 * check the balance of the tree. The rebalance method can be used to rebalance
 * the tree if there has been a lot of insertions and/or removals.
 * 
 * For geographical points, the k parameter should be 2. The distance method
 * will then use the Haversine formula to calculate the distance between two
 * points. For other values of k, the distance method will use the Euclidean
 * distance.
 * 
 * Example:
 * const geoPoints = [
 *		// Oslo
 *		new KDPoint([ 59.9139, 10.7522 ], { name: 'Oslo', load: 0.2 }),
 *		// Trondheim
 *		new KDPoint([ 63.4305, 10.3951 ], { name: 'Trondheim', load: 0 }),
 *		// Stavanger
 *		new KDPoint([ 58.9690, 5.7331 ], { name: 'Stavanger', load: 0 }),
 *		// Bergen
 *		new KDPoint([ 60.3913, 5.3221 ], { name: 'Bergen', load: 0 }),
 *		// Tromsø
 *		new KDPoint([ 69.6496, 18.9553 ], { name: 'Tromsø', load: 0 }),
 *		// Eidfjord
 *		new KDPoint([ 60.4675, 7.0719 ], { name: 'Eidfjord', load: 0 }),
 *		// Ålesund
 *		new KDPoint([ 62.4722, 6.1497 ], { name: 'Ålesund', load: 0 }),
 *		// Mo i Rana
 *		new KDPoint([ 66.3167, 14.1667 ], { name: 'Mo i Rana', load: 0 }),
 *		// Bodø
 *		new KDPoint([ 67.2833, 14.4000 ], { name: 'Bodø', load: 0 }),
 *		// Kristiansund
 *		new KDPoint([ 63.1111, 7.7417 ], { name: 'Kristiansund', load: 0 }),
 *	];
 *
 *	// Create a 2D tree (k = 2) for geographical points
 *	const geoTree = new KDTree(geoPoints);
 *
 *	// Add a new point to the tree
 *	geoTree.addNode(new KDPoint([ 59.65059, 6.35415 ], { name: 'Sauda', load: 0 })); // Sauda, Norway
 *
 *	// 1 is a perfect balance. For a large tree, 1.5 is an unbalanced tree.
 *	const score = geoTree.balanceScore());
 *
 *	// Rebalance the tree
 *	geoTree.rebalance();
 *
 *	// Find the nearest neighbor for a target point
 *	const target = new KDPoint([ 60.5166646, 8.1999992 ], { name: 'Geilo' }); // Geilo, Norway
 *
 *	// Find the 3 nearest neighbors, but points with a load of more than 0.1 will be ignored
 *	const nearest = geoTree.nearestNeighbors(target, 3, (point) => point.appData.load as number <= 0.1);
 */
export class KDTree {
	root?: KDNode;

	// eslint-disable-next-line no-unused-vars
	constructor(points: KDPoint[], private k = 2) {
		this.buildTree(points);
	}

	buildTree(points: KDPoint[], depth = 0): KDNode | undefined {
		if (points.length === 0)
			return;

		const axis = depth % this.k;

		points.sort((a, b) => a.position[axis] - b.position[axis]);

		const median = Math.floor(points.length / 2);
		const node = new KDNode(points[median], axis);

		this.root ??= node;

		node.left = this.buildTree(points.slice(0, median), depth + 1);
		node.right = this.buildTree(points.slice(median + 1), depth + 1);

		return node;
	}

	private distance(a: KDPoint, b: KDPoint): number {
		if (this.k === 2) {
			const toRadians = (degrees: number) => degrees * (Math.PI / 180);
		
			const lat1 = toRadians(a.position[0]);
			const lon1 = toRadians(a.position[1]);
			const lat2 = toRadians(b.position[0]);
			const lon2 = toRadians(b.position[1]);
		
			const dLat = lat2 - lat1;
			const dLon = lon2 - lon1;
		
			const R = 6371; // Earth's radius in km
			const aHaversine = (Math.sin(dLat / 2) ** 2) + (Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dLon / 2) ** 2));
			const c = 2 * Math.atan2(Math.sqrt(aHaversine), Math.sqrt(1 - aHaversine));
		
			return R * c;
		} else {
			return Math.sqrt(a.position.reduce((acc, cur, i) => acc + ((cur - b.position[i]) ** 2), 0));
		}
	}

	public addNode(point: KDPoint, node: KDNode | undefined = this.root, depth = 0): void {
		const axis = depth % this.k;

		if (!node) {
			this.root = new KDNode(point, axis);

			return;
		}

		if (point.position[axis] < node.kdPoint.position[axis]) {
			if (!node.left)
				node.left = new KDNode(point, axis);
			else
				this.addNode(point, node.left, depth + 1);
		} else if (!node.right) {
			node.right = new KDNode(point, axis);
		} else {
			this.addNode(point, node.right, depth + 1);
		}
	}

	// eslint-disable-next-line no-unused-vars
	public removeNodeByFilter(filter: (point: KDPoint) => boolean): boolean {
		if (!this.root)
			return false;

		const [ node, parent ] = this.findNodeByFilter(filter, this.root);

		if (!node)
			return false;

		return this.removeNode(node.kdPoint, node, parent);
	}

	// eslint-disable-next-line no-unused-vars
	private findNodeByFilter(filter: (point: KDPoint) => boolean, node: KDNode | undefined = this.root, parent?: KDNode): [ KDNode | undefined, KDNode | undefined ] {
		if (!node)
			return [ undefined, undefined ];

		if (filter(node.kdPoint))
			return [ node, parent ];

		const [ left, leftParent ] = this.findNodeByFilter(filter, node.left, node);

		if (left)
			return [ left, leftParent ];

		return this.findNodeByFilter(filter, node.right, node);
	}

	public removeNode(point: KDPoint, node: KDNode | undefined = this.root, parent?: KDNode): boolean {
		if (!node)
			return false;

		if (this.pointsEqual(point, node.kdPoint)) {
			if (node.left && node.right) {
				const [ successor, parentSuccessor ] = this.findMin(node.right, node, node.axis);

				if (parentSuccessor) {
					if (parentSuccessor.left === successor)
						parentSuccessor.left = successor.right;
					else
						parentSuccessor.right = successor.right;
				}
				node.kdPoint = successor.kdPoint;
			} else {
				const child = node.left ?? node.right;

				if (!parent)
					this.root = child;
				else if (parent.left === node)
					parent.left = child;
				else
					parent.right = child;
			}

			return true;
		}

		const nextParent = node;
		const axis = node.axis;

		if (point.position[axis] < node.kdPoint.position[axis])
			return this.removeNode(point, node.left, nextParent);
		else
			return this.removeNode(point, node.right, nextParent);
	}

	private findMin(node: KDNode, parent: KDNode, axis: number): [KDNode, KDNode | undefined] {
		if (!node.left)
			return [ node, parent ];

		return this.findMin(node.left, node, axis);
	}

	private pointsEqual(a: KDPoint, b: KDPoint): boolean {
		return a.position.every((pos, i) => pos === b.position[i]);
	}

	public rebalance(): void {
		const points: KDPoint[] = [];

		this.traverse((point) => points.push(point), this.root);
		delete this.root;
		this.buildTree(points);
	}
	
	// eslint-disable-next-line no-unused-vars
	private traverse(callback: (point: KDPoint) => void, node?: KDNode): void {
		if (!node) return;
	
		callback(node.kdPoint);
		this.traverse(callback, node.left);
		this.traverse(callback, node.right);
	}

	public balanceScore(): number {
		const numberOfNodes = this.countNodes(this.root);
		const minHeight = Math.floor(Math.log2(numberOfNodes + 1));
		const actualHeight = this.treeHeight(this.root);
	
		return actualHeight / minHeight;
	}
	
	private countNodes(node?: KDNode): number {
		if (!node) return 0;
	
		return 1 + this.countNodes(node.left) + this.countNodes(node.right);
	}
	
	private treeHeight(node?: KDNode): number {
		if (!node) return 0;
	
		return 1 + Math.max(this.treeHeight(node.left), this.treeHeight(node.right));
	}

	public nearestNeighbors(
		target: KDPoint,
		n: number,
		// eslint-disable-next-line no-unused-vars
		filter?: (point: KDPoint) => boolean
	): [KDPoint, number][] | undefined {
		if (!this.root) return;
	
		const maxHeap = new MaxHeap(n);
		const stack: { node?: KDNode; depth: number }[] = [ { node: this.root, depth: 0 } ];
	
		while (stack.length > 0) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { node, depth } = stack.pop()!;

			if (!node) continue;

			if (!filter || filter(node.kdPoint))
				maxHeap.add([ node.kdPoint, this.distance(target, node.kdPoint) ]);
	
			const axis = depth % this.k;
			const nextBranch = target.position[axis] < node.kdPoint.position[axis] ? node.left : node.right;
			const otherBranch = nextBranch === node.left ? node.right : node.left;
	
			stack.push({ node: nextBranch, depth: depth + 1 });
	
			if (maxHeap.heap.length < n || Math.abs(target.position[axis] - node.kdPoint.position[axis]) < maxHeap.heap[0][1])
				stack.push({ node: otherBranch, depth: depth + 1 });
		}

		return maxHeap.heap.sort((a, b) => a[1] - b[1]);
	}
}

class MaxHeap {
	// eslint-disable-next-line no-unused-vars
	constructor(private maxSize: number, public heap: [KDPoint, number][] = []) {}

	add(item: [KDPoint, number]): void {
		if (this.heap.length < this.maxSize) {
			this.heap.push(item);
			this.bubbleUp(this.heap.length - 1);
		} else if (item[1] < this.heap[0][1]) {
			this.heap[0] = item;
			this.bubbleDown(0);
		}
	}

	private bubbleUp(index: number): void {
		const parentIndex = Math.floor((index - 1) / 2);

		if (parentIndex < 0 || this.heap[parentIndex][1] >= this.heap[index][1])
			return;

		[ this.heap[parentIndex], this.heap[index] ] = [ this.heap[index], this.heap[parentIndex] ];
		this.bubbleUp(parentIndex);
	}

	private bubbleDown(index: number): void {
		const leftIndex = (2 * index) + 1;
		const rightIndex = (2 * index) + 2;
		let maxIndex = index;

		if (leftIndex < this.heap.length && this.heap[leftIndex][1] > this.heap[maxIndex][1])
			maxIndex = leftIndex;

		if (rightIndex < this.heap.length && this.heap[rightIndex][1] > this.heap[maxIndex][1])
			maxIndex = rightIndex;

		if (maxIndex !== index) {
			[ this.heap[maxIndex], this.heap[index] ] = [ this.heap[index], this.heap[maxIndex] ];
			this.bubbleDown(maxIndex);
		}
	}
}