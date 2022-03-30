const express = require('express');

const fileController = require('../controllers/file');
const router = express.Router();

router.get('/generate', fileController.generateFile);
router.get('/download', fileController.downloadFile);
router.get('/report', fileController.getReport);

module.exports = router;