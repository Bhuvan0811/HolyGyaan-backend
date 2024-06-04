const express = require("express");
const {User} = require("../db");
const router = express.Router();
const zod = require("zod");
const JWT_secret = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware.js");
const api_key = "u2c4745K6rwM2RJkrC6s4GsgVGpVPkhp";

router.use(express.json());

router.post("/query", async (req, res)=>{

    const query = "Get all chapters of bhagavad and answer the following query. Query: [ " + req.body.query + " ]";

    const externalUserId = "ewifjie9u2eqi0";

    try {
        // 1. Create Chat Session
        const sessionResponse = await fetch('https://gateway-dev.on-demand.io/chat/v1/sessions', {
            method: 'POST',
            headers: {
                'apikey': api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "pluginIds": [],
                "externalUserId": externalUserId
            })
        });

        const sessionData = await sessionResponse.json();
        const sessionId = sessionData.chatSession.id;

        // 2. Answer Query
        const queryResponse = await fetch(`https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'apikey': api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": query,
                "pluginIds": ["plugin-1717438583"],
                "responseMode": "sync"
            })
        });

        const queryData = await queryResponse.json();
        res.json(queryData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
