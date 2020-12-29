const router = require('express').Router();
const { Users } = require('../models');
const passport = require('../middlewares/authentication');
const multer= require('multer');
const upload = multer();
const img= require('../middlewares/imageHandling').upload;

router.post('/signup',upload.any(), (req, res) => {
  let profileImage= req.files[0]
  console.log(profileImage)
  let  content  = (JSON.parse(req.body.json));
  console.log(content.email)
  img("/profileImages",profileImage).then(
    pfp=>{ console.log(pfp.url); return pfp.url}
  ).then(url=>{Users.create({
    userName:content.username,
    userEmail: content.email,
    userPassword: content.password,
    imageURL:url,
  }).then((user) => {
      req.login(user, () => res.status(200).json(user));
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Failed Signup', err });
    });
});
});
router.post('/login',
    passport.authenticate('local'), 
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
   // Users.findAll({where:{userEmail:req.user.userEmail}}).then(user=>console.log(user))
    req.session.user = req.user.id;  
    res.json(req.user.userEmail);
  });

  
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
})

module.exports = router;