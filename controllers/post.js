import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

export const createPost = async (req, res) => {
  await Post.create(req.body);
  res.status(StatusCodes).send({ msg: 'post created' });
};

export const getAll = async (req, res) => {
  res.send('all posts');
};

export const getAllFromUser = async (req, res) => {
  res.send('all posts from user');
};
