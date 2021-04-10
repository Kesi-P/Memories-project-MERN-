import express from 'express';
import { getPosts, creatPosts } from '../controllers/posts.js'

const router = express.Router();
//start from localhost/posts
router.get('/',getPosts);
router.post('/',creatPosts);

export default router;