/**
 * A point in a k-dimensional space. The position array is the coordinates of the point in the space.
 */
export declare class KDPoint {
    position: number[];
    appData: Record<string, unknown>;
    constructor(position: number[], appData?: Record<string, unknown>);
}
declare class KDNode {
    kdPoint: KDPoint;
    axis: number;
    left?: KDNode;
    right?: KDNode;
    constructor(kdPoint: KDPoint, axis: number, left?: KDNode, right?: KDNode);
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
export declare class KDTree {
    private k;
    root?: KDNode;
    constructor(points: KDPoint[], k?: number);
    buildTree(points: KDPoint[], depth?: number): KDNode | undefined;
    private distance;
    addNode(point: KDPoint, node?: KDNode | undefined, depth?: number): void;
    removeNodeByFilter(filter: (point: KDPoint) => boolean): boolean;
    private findNodeByFilter;
    removeNode(point: KDPoint, node?: KDNode | undefined, parent?: KDNode): boolean;
    private findMin;
    private pointsEqual;
    rebalance(): void;
    private traverse;
    balanceScore(): number;
    private countNodes;
    private treeHeight;
    nearestNeighbors(target: KDPoint, n: number, filter?: (point: KDPoint) => boolean): [KDPoint, number][] | undefined;
}
export {};
