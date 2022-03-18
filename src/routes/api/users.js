<<<<<<< HEAD
// import express from 'express';
// import { UserControllers } from '../../controllers/userController';
// require('../../middlewares/auth')
// import passport from '../../middlewares/auth'


// const router = express.Router();
// const userControllers = new UserControllers();

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
import express from 'express';
import { UserControllers } from '../../controllers/userController';
require('../../middlewares/auth')
import passport from '../../middlewares/auth'


const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userControllers.registerUser);

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
>>>>>>> 1d72b6059294ac6e527c87f96fafc90244696c8b
