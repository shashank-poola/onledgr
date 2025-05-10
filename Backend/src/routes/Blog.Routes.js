import express from 'express'
import { create, deleteBlog, getAllBlogs } from '../controllers/blogController.js';

const routes = express.Router();

routes.post('/create',create);
routes.get('/all',getAllBlogs);
routes.delete('/delete/:id',deleteBlog)

export default routes;