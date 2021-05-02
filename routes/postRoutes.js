const express = require("express");
const postController = require("../controllers/postController");
const protectMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .get(protectMiddleware, postController.getAllPosts)
    .post(protectMiddleware, postController.createPost);

router.route("/:id")
    .get(protectMiddleware, postController.getPost)
    .patch(protectMiddleware, postController.updatePost)
    .delete(protectMiddleware, postController.deletePost);

module.exports = router;