const express = require("express");
const router = express.Router();
const DocsController = require("../app/controllers/DocsControllers");

router.get("/:Docs", DocsController.Doc);
module.exports = router;
