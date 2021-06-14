const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);

async function list(req, res) {
	try {
		const list = await Controller.list();
		response.success(req, res, list);
	} catch (err) {
		response.error(req, res, err.toString(), 500);
	}

	// Controller.list()
	// 	.then((list) => {
	// 		response.success(req, res, list);
	// 	})
	// 	.catch((err) => {
	// 		response.error(req, res, err.toString(), 500);
	// 	});
}

function get(req, res) {
	Controller.get(req.params.id)
		.then((user) => {
			response.success(req, res, user);
		})
		.catch((err) => {
			response.error(req, res, err.toString(), 500);
		});
}

function upsert(req, res) {
	Controller.upsert(req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch((err) => {
			response.error(req, res, err.toString(), 500);
		});
}

module.exports = router;
