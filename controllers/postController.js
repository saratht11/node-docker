const Post = require("../models/postModels");
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        console.error(`error occured while fetching posts from mongo ${error}`);
        res.status(400).json({
            status: "failed"
        })
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        console.error(`error occured while fetching post ${req.params.id} from mongo ${error} `);
        res.status(400).json({
            status: "failed"
        })
    }
}


exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        console.error(`error occured while creating posts ${error}`);
        res.status(400).json({
            status: "failed"
        })
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        console.error(`error occured while updating ${req.params.id} post ${error}`);
        res.status(400).json({
            status: "failed"
        })
    }
}


exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        console.log(`error occured while deleting ${req.params.id} post ${error}`);
        res.status(400).json({
            status: "failed"
        })
    }
}