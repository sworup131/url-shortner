const shortid = require('shortid');
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req,res){
    const shortId = shortid.generate();
    const body = req.body
    if(!body.url) return res.status(400).json({message:"url is required"})
    await  URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory : [{
            timestamp : Date.now()
        }],
    })
    return res.json({id:shortId})
}

async function handleGetAnalysis(req,res){
    const {shortid} = req.params;
    const result =await URL.findOne({shortId:shortid})
    if (!result) {
    return res.status(404).json({ message: "Short URL not found" });
    }
    res.redirect(result.redirectURL)
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalysis,
}