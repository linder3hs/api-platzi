const jwt = require("jsonwebtoken");
const config = require("../config");
const secret = config.secret.jwt;

function sign(data) {
	return jwt.sign(data, secret);
}

function verify(token) {
	return jwt.verify(token, secret);
}

const check = {
	own: function (req, owner) {
		const decoded = decodeHeader(req);
		console.log(decoded);
	},
};

function getToken(authorization) {
	if (!authorization) {
		throw new Error("Invalid authorization");
	}

	if (authorization.indexOf("Bearer") === -1) {
		throw new Error("Format invalid");
	}

	let token = authorization.replace("Bearer", "");

	return token;
}

function decodeHeader(req) {
	const authorization = req.headers.authorization || "";
	const token = getToken(authorization);
	const decoded = verify(token);

	req.user = decoded;

	return decoded;
}

module.exports = {
	sign,
};
