const db = {
	user: [
		{
			id: 1,
			name: "Linder Hassinger",
			username: "linder3hs",
		},
	],
};

async function list(table) {
	return db[table] || [];
}

async function get(table, id) {
	let collection = await list(table);
	return collection.find((item) => item.id === id) || null;
}

async function upsert(table, data) {
	if (!db[table]) {
		db[table] = [];
	}

	db[table].push(data);

	console.log(db);
}

async function query(table, q) {
	let collection = await list(table);
	let keys = Object.keys(q);
	let key = keys[0];
	return collection.find((item) => item[key] === q[keys]) || null;
}

async function remove(tabla, id) {
	return true;
}

module.exports = {
	list,
	get,
	upsert,
	remove,
	query,
};
