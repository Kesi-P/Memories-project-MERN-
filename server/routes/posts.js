import express from 'express';
import { getPosts, creatPosts, updatePost } from '../controllers/posts.js'

const router = express.Router();
//start from localhost/posts
router.get('/',getPosts);
router.post('/',creatPosts);
//updating
router.patch('/:id',updatePost);

export default router;