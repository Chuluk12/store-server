const express = require('express');
const router = express.Router();
const { index, viewCreate, actionsCreate, viewEdit, actionsEdit, actionsDelete, actionsStatus} = require("./controller");
const multer = require("multer");
const os = require('os');

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)

router.get('/', index);
router.get('/create', viewCreate);
router.post("/create", multer({dest: os.tmpdir()}).single('image'), actionsCreate);
router.get("/edit/:id", viewEdit);
router.put('/edit/:id', multer({ dest: os.tmpdir() }).single('image'), actionsEdit);
router.delete("/delete/:id", actionsDelete);
router.put('/status/:id', actionsStatus);

module.exports = router;