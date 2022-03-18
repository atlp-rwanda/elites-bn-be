<<<<<<< HEAD
// import express from 'express';
// import { UserControllers } from '../../controllers/userController';
// require('../../middlewares/auth')
// import passport from '../../middlewares/auth'
<<<<<<< HEAD
=======
import express from 'express';
import { UserControllers } from '../../controllers/userController';
require('../../middlewares/auth')
import passport from '../../middlewares/auth'

>>>>>>> c663a64 (login with google and fb)
=======
>>>>>>> 03d2558a6e5f3722258371b6b91b52cc3bec55a8


// const router = express.Router();
// const userControllers = new UserControllers();

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 03d2558a6e5f3722258371b6b91b52cc3bec55a8
// router.post('/register', userControllers.registerUser);

// router.get('/auth/google',
// passport.authenticate('google',{ session:false ,scope:['email','profile'],prompt: 'select_account',
// }))

// router.get('/auth/google/login',passport.authenticate('google',{ session:false ,failureRedirect:'auth/google/failed'}),userControllers.authGoogleLogin)


// router.get('/auth/google/failed',(req,res,next)=>{
//     res.send('oops!failed to login with Google')
// })


// router.get('/auth/facebook',
// passport.authenticate('facebook',{ session: false,
//      scope: ['email', 'public_profile']

// }),userControllers.authFacebookLogin)



// router.get('/auth/facebook/failed',(req,res,next)=>{
//     res.send('oops!failed to login with Facebook')
// })


// export default router;
=======
<<<<<<< HEAD
=======
import express from 'express';
import { UserControllers } from '../../controllers/userController';
require('../../middlewares/auth')
import passport from '../../middlewares/auth'


const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userControllers.registerUser);

>>>>>>> 03d2558a6e5f3722258371b6b91b52cc3bec55a8
router.get('/auth/google',
passport.authenticate('google',{ session:false ,scope:['email','profile'],prompt: 'select_account',
}))

router.get('/auth/google/login',passport.authenticate('google',{ session:false ,failureRedirect:'auth/google/failed'}),userControllers.authGoogleLogin)


router.get('/auth/google/failed',(req,res,next)=>{
    res.send('oops!failed to login with Google')
})


router.get('/auth/facebook',
passport.authenticate('facebook',{ session: false,
     scope: ['email', 'public_profile']

}),userControllers.authFacebookLogin)

// router.get('/auth/facebook/login',passport.authenticate('facebook',{ session:false ,failureRedirect:'auth/facebook/failed'}),userControllers.authFacebookLogin)

router.get('/auth/facebook/failed',(req,res,next)=>{
    res.send('oops!failed to login with Facebook')
})


export default router;
<<<<<<< HEAD
>>>>>>> c663a64 (login with google and fb)
=======
>>>>>>> 1d72b6059294ac6e527c87f96fafc90244696c8b
>>>>>>> 03d2558a6e5f3722258371b6b91b52cc3bec55a8
