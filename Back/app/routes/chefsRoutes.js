const express = require('express');
const router = express.Router();
const chefsController = require('../controllers/chefsController');

router.post("/", chefsController.create);

router.get("/", chefsController.findAll);

router.get("/:id", chefsController.findOne);

router.put("/:id", chefsController.update);

router.delete("/:id", chefsController.delete);

module.exports = router;