// const { nanoid } = require('nanoid');
const URL = require("../models/url")

exports.generateNewShortUrl = async(req, res) => {
    try {
        const {url} = req.body;
        if(!url) {
            return res.status(400).json({
                success: false,
                message: "url is required"
            })
        }

        // Using dynamic import for nanoid
        const { nanoid } = await import('nanoid');

        const shortId = nanoid(8)
        await URL.create({
            shortId: shortId,
            redirectUrl: url,
            visitHistory: []
        })

        return res.status(200).json({
            success: true,
            message: "ShortId generated",
            id: shortId
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

exports.redirectUrl = async(req, res) => {
    try {
        const shortId = req.params.shortId
        const entry = await URL.findOneAndUpdate({shortId}, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })

        // Check if entry exists
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: "short id not found"
            })
        }

        res.redirect(entry.redirectUrl)
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.getAnalytics = async(req, res) => {
    try {
        const {shortId} = req.params
        const result = await URL.findOne({shortId})

        if(!result) {
            return res.status(404).json({
                success: false,
                message: "URL not found"
            })
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }

}