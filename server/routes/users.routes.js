const router = require('express').Router();
const { signup,
        fetchCurrentUser,
        updateUserPointController,
        showAllUsers,
        addFollowerController,
        getUser,
        getAllFollowee,
        getAllFollower,
        createPost,
        updateProfilePicture,
        savePointCont,deleteAllUserCont
     } = require('../controllers/users.controller');

router.post('/', signup);

router.post('/follow', addFollowerController)

router.get('/', fetchCurrentUser);

router.patch('/point', updateUserPointController)

router.get('/users', showAllUsers)

router.get('/users/:id', getUser)

router.get('/followers', getAllFollower)

router.get('/followees', getAllFollowee)

router.post('/post', createPost)

router.post('/profilePicture', updateProfilePicture)
router.delete('/', deleteAllUserCont);
router.post('/point', savePointCont)

module.exports = router;