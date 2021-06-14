module.exports = {
	api: {
		port: process.env.API_PORT || 3000,
	},
	secret: {
		jwt: process.env.SECRET || "secret",
	},
};
