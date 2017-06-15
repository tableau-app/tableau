const Router = require('express').Router;
const router = Router();
const Post = require('../models/post');

router
  .post('/:id/likes', (req, res, next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, { $addToSet: { likes: req.user.id } }, { new: true })
      .then(post =>
        res.send({
          likes: post.likes.length
        }))
      .catch(next);
  })

  .post('/:id/comments', (req, res, next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, {
      $push: {
        comments: {
          user: req.user.id,
          text: req.body //is this right?
        }
      }
    })
      .then(post => res.send(post))
      .catch(next);
  });