import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

export const createPost = async (req, res) => {
  const post = req.body;
  post.createdBy = req.user.id;
  await Post.create(post);
  res.status(StatusCodes.CREATED).json({ msg: 'post created' });
};

export const search = async (req, res) => {
  const { query, createdBy, topic, sort } = req.query;

  const query_obj = {};
  if (createdBy) query_obj.createdBy = createdBy;
  if (topic) query_obj.topic = topic;
  if (query) query_obj.title = { $regex: query, $options: 'i' };

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    asc: 'title',
    desc: '-title',
  };
  const sortOption = sortOptions[sort] || sortOptions['newest'];

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find(query_obj)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const numPosts = await Post.countDocuments(query_obj);
  const numPages = Math.ceil(numPosts / limit);

  res
    .status(StatusCodes.OK)
    .json({ numPosts, numPages, currentPage: page, posts });
};
