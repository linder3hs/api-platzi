const auth = require("../../../auth");
const bcrypt = require("bcrypt");
const TABLA = "auth";

module.exports = function (injectedStore) {
	let store = injectedStore;

	if (!store) {
		store = require("../../../store/dummy");
	}

	async function login(username, password) {
		const data = await store.query(TABLA, { username: username });

		const succes = await bcrypt.compare(password, data.password);

		if (!succes) {
			throw new Error("Invalid info");
		}
		// Generate token
		return auth.sign(data);
	}

	async function upsert(data) {
		const authData = {
			id: data.id,
		};

		if (data.username) {
			authData.username = data.username;
		}

		if (data.password) {
			authData.password = await bcrypt.hash(data.password, 5);
		}

		return store.upsert(TABLA, authData);
	}

	return {
		upsert,
		login,
	};
};
