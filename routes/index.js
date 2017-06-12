const express = require('express')
const router = express.Router()
const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { catchErrors } = require('../handlers/errorHandlers')

// Do work here
router.get('/', catchErrors(storeController.getStores))
router.get('/stores', catchErrors(storeController.getStores))
router.get('/add', storeController.addStore)
router.post('/add',
        storeController.upload,
        catchErrors(storeController.resize),
        catchErrors(storeController.createStore)
)
router.put('/add/:id',
        storeController.upload,
        catchErrors(storeController.resize),
        catchErrors(storeController.updateStore))

router.get('/stores/:id/edit', catchErrors(storeController.editStore)
)

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug))

router.get('/tags', catchErrors(storeController.getStoresByTag))

router.get('/tags/:tag', catchErrors(storeController.getStoresByTag))

router.get('/login', catchErrors(userController.loginForm))
router.get('/register', catchErrors(userController.registerForm))
// 1. Validate the registration data
// 2. Register user
// 3. Log them in
router.post('/login', catchErrors(userController.loginUser))
router.post('/register',
        userController.validateRegister,
        catchErrors(userController.registerUser),
        authController.login)

module.exports = router
