const { Router } = require('express');
const axios = require('axios');
const db = require('../firebase');

const API_KEY = 'C45712D00DB5534D16B224E7F05E2192';
const APP_ID = '381210' // App ID for Dead by Daylight

const router = Router();

const steamIDExists = async (steamID) => {
    const snapshot = await db.collection('users').where('steamID', '==', steamID).get();
    return !snapshot.empty;
}

async function addUser(steamID){
    try{
        await db.collection('users').doc(steamID).set({
            steamID: steamID
        });
        console.log("User Added successfully!");
        return true;
    } catch(error){
        console.error("Error adding user: ", error);
        return false;
    }
}

async function addStats(steamID){
    try{
        console.log("Fetching stats");
        const url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${APP_ID}&key=${API_KEY}&steamid=${steamID}`;
        const response = await axios.get(url);
        const playerStats = response.data.playerstats;
        console.log(playerStats);

        await db.collection('playerStats').doc(steamID).set(playerStats);
    } catch(error){
        console.error("Error adding stats", error);
    }
}

router.post('/addUser', async (req, res) => {
    try{
        const {steamID} = req.body;

        if(!steamID){
            return res.status(400).send('Missing required fields');
        }

        const exists = await steamIDExists(steamID);
        if(exists){
            console.log("User alreayd exists.");
            return res.status(401).send("SteamID already exists. Fetching statistics...");
        } else{
            const success = await addUser(steamID);
            if(success){
                await addStats(steamID);
                res.status(200).json({message: "User added successfully"});
            } else{
                res.status(500).send("Error adding user");
            }
        }
    } catch(error){
        console.error("Error adding or verifying steamID: ", error);
        res.status(500).send("Error adding or verifying steamID");
    }
});

router.get('/player-stats/:steamid', async (req, res) => {
    try{
        const steamID = req.params.steamid;
        console.log("SteamID: ", steamID);
        // const exists = await steamIDExists(steamID);
        // if(exists){
        // console.log("SteamID already in database, returning stats");
        const docSnapshot = await db.collection('playerStats').doc(steamID).get();
        if(docSnapshot.exists){
            const playerstats = docSnapshot.data();
            res.status(200).json(playerstats);
        }
        //}
        
    } catch(error){
        console.error("Error fetching player stats: ", error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

module.exports = router;