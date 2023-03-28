import { KDTree, KDPoint } from '../../src/KDTree'; 

let geoPoints: KDPoint[];
let additionalGeoPoints: KDPoint[];

beforeEach(() => {
	geoPoints = [
		new KDPoint([ 59.9139, 10.7522 ], { name: 'Oslo', load: 0 }),
		new KDPoint([ 63.4305, 10.3951 ], { name: 'Trondheim', load: 0 }),
		new KDPoint([ 58.9690, 5.7331 ], { name: 'Stavanger', load: 0 }),
		new KDPoint([ 60.3913, 5.3221 ], { name: 'Bergen', load: 0 }),
		new KDPoint([ 69.6496, 18.9553 ], { name: 'Tromsø', load: 0 }),
	];
	additionalGeoPoints = [
		new KDPoint([ 60.4675, 7.0719 ], { name: 'Eidfjord', load: 0 }),
		new KDPoint([ 62.4722, 6.1497 ], { name: 'Ålesund', load: 0 }),
		new KDPoint([ 66.3167, 14.1667 ], { name: 'Mo i Rana', load: 0 }),
		new KDPoint([ 67.2833, 14.4000 ], { name: 'Bodø', load: 0 }),
		new KDPoint([ 63.1111, 7.7417 ], { name: 'Kristiansund', load: 0 }),
	];
});

test('Constructor should work', () => {
	expect(() => new KDTree(geoPoints)).not.toThrow();
});

test('Should be able to add new node to tree', () => {
	const sut = new KDTree([]);
	const point = new KDPoint([ 59.65059, 6.35415 ],
		{ name: 'Sauda', load: 0 });

	expect(sut.root).toBe(undefined);
	sut.addNode(point);

	expect(sut.root.kdPoint).toBe(point);
});

test('Rebalance should work', () => {
	const sut = new KDTree(geoPoints);
	let score = sut.balanceScore();

	expect(score).toBe(1.5);

	additionalGeoPoints.forEach((point) => {
		sut.addNode(point);
	});

	score = sut.balanceScore();
	expect(score).toBeGreaterThan(1.6);

	sut.rebalance();
	
	score = sut.balanceScore();
	expect(score).toBeLessThan(1.34);
});

test('Should return closest point', () => {
	const target = new KDPoint(
		[ 60.5166646, 8.1999992 ],
		{ name: 'Geilo' }
	);

	const sut = new KDTree(geoPoints);
	const nearest = sut.nearestNeighbors(
		target, 1, (point) => point.appData.load as number <= 0.8);

	expect(nearest[0][0].appData).toBe(geoPoints[1].appData);
});

test('Should diqualify on filter', () => {
	const target = new KDPoint(
		[ 60.5166646, 8.1999992 ],
		{ name: 'Geilo' }
	);

	const sut = new KDTree(geoPoints);

	sut.root.left.kdPoint.appData.load = 0.9;
	const nearest = sut.nearestNeighbors(
		target, 1, (point) => point.appData.load as number <= 0.8);

	expect(nearest[0][0].appData).toBe(geoPoints[2].appData);
});

test('Should return distance', () => {
	const target = new KDPoint(
		[ 60.5166646, 8.1999992 ],
		{ name: 'Geilo' }
	);

	let distance = KDTree.getDistance(target, geoPoints[0]);

	expect(distance).toBeGreaterThan(156.0);
	expect(distance).toBeLessThan(156.1);
	
	distance = KDTree.getDistance(target, geoPoints[1]);

	expect(distance).toBeGreaterThan(343.6);
	expect(distance).toBeLessThan(343.7);
});