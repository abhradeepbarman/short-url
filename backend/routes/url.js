const express = require("express")
const { generateNewShortUrl, redirectUrl, getAnalytics } = require("../controllers/url")
const router = express.Router()

router.post("/", generateNewShortUrl)
router.get("/:shortId", redirectUrl)
router.get("/analytics/:shortId", getAnalytics)

module.exports = router;