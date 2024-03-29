const { Router } = require('express');
const db = require('../firebase');

const router = Router();

async function addPerk(id, name, pictureUrl){
    try{
        await db.collection('perks').add({
            id: id,
            name: name,
            pictureUrl: pictureUrl
        });
        console.log("Perk Added successfully!");
        return true;
    } catch(error){
        console.error("Error adding perk: ", error);
        return false; //Indicate failure
    }
}

// Example route to add a perk
router.post('/addPerk', async (req, res) => {
    try{
        const success = await addPerk('1', 'Ace in the Hole', '');
        if (success){
            res.send('Perk added successfully');
        } else {
            res.status(500).send('Error adding perk');
        }
    } catch(error){
        console.error("Error adding perk: ", error);
        res.status(500).send("Error adding perk");
    }
})


module.exports = router;