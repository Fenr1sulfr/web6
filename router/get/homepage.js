const express = require('express')
const router = express.Router()
const path = require('path')

const db =require('../../server')
const UserModel = require('../../models/user')
const { permittedCrossDomainPolicies } = require('helmet')

router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../views/pages/home.html'))
})
router.delete('/delete/:username', async (req, res) => {
  const usernameToDelete = req.params.username;

  try {
    const getUser = await UserModel.findOne({ username: usernameToDelete });

    if (!getUser) {
      return res.status(400).json({ message: "Can't find user" });
    }

    const deletedUser = await UserModel.findOneAndDelete({ username: usernameToDelete });
    res.json({ success: true, deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports=router