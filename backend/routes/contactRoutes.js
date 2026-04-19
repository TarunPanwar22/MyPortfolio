const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controller/contactController');
const { validateContact } = require('../middleware/validator');

// POST /api/contact
router.post('/send-mail', validateContact, sendContactEmail);

module.exports = router;