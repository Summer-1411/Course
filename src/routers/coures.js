const express = require("express");
const router = express.Router();
const couerControllers = require("../app/controllers/coures");

router.patch("/:id", couerControllers.updateCoures);
router.get("/:id", couerControllers.getCoures);
router.delete("/:id", couerControllers.deleteCoures);
router.get("/", couerControllers.getAllCoures);
router.post("/", couerControllers.newCoures);

module.exports = router;
