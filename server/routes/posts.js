import express from 'express';

const router = express.Router();
//start from localhost/posts
router.get('/', (req, res) => {
    res.send('This works')
})

export default router;