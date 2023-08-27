import { query } from 'express'
import handleAsync from 'express-async-handler'
import Post from '../../models/Post.js'
import User from '../../models/User.js'
import Comment from '../../models/Comment.js'

// @desc get all Post
// @route GET/Post
// @private
//This is the controller function that is responsible for providing the required data of the insittuion 
//to the frontend

const getPostList = handleAsync(async (req, res) => {

    const tag = req.query.tag
    const dateSort = req.query.dateSort

    let postListing;
    if(tag === "None" || tag === ""){
        if(dateSort === "Latest"){
            postListing = await Post.find().select().sort({date: -1}).lean()
        }
        else if(dateSort === "Oldest"){
            postListing = await Post.find().select().sort({date: 1}).lean()
        }
    }
    else{
        if(dateSort === "Latest"){
            postListing = await Post.find({tag: tag}).select().sort({date: -1}).lean()
        }
        else if(dateSort === "Oldest"){
            postListing = await Post.find({tag: tag}).select().lean()
        }
    } 


    const commentListing = await Comment.find().select().lean()  
    const userListing = await User.find().select().lean()
    const uniqueTags = await Post.distinct('tag').select().lean();

    let userPosts = [];
    
    for (let i = 0; i < postListing.length; i++) {
        for (let j = 0; j < userListing.length; j++) {
            if (postListing[i].user_id.equals(userListing[j]._id)) { 
                userPosts.push({
                    'user': userListing[j].username,
                    'post': postListing[i]
                });
                break;
            }
        }
    }

    let structuredData = [];
    for (let i = 0; i< userPosts.length; i++){
        let commentGroup = []
        for(let j=0; j<commentListing.length; j++){
            if(userPosts[i].post._id.equals(commentListing[j].post_id)){
                commentGroup.push(commentListing[j])
            }
        }
        structuredData.push({
            'post': userPosts[i].post,
            'user': userPosts[i].user,
            'comments': commentGroup,
        })
    }

    const dataPopular = req.query.popular;
    if(dataPopular === "Unpopular"){
        structuredData.sort((a, b) => a.comments.length - b.comments.length);
    }
    else if(dataPopular === "Popular"){
        structuredData.sort((a, b) => b.comments.length - a.comments.length);
    }

    return res.json({structuredData, uniqueTags})
})

// @desc create new Post
// @route POST/Post
// @private
const createPost = handleAsync(async (req, res) => {

    const params = req.query;

    if(params.commentStatus){
        const comment = await Comment.create({
            comment: params.comment,
            username: params.username,
            post_id: params.institution
        }) 
        res.status(200).json("Post created")
    }

    if(params.posting){
        const user = await User.findOne({username: "Kirito"}).select('_id').lean()
        const post = await Post.create({'post': params.post, 'user_id': user, 'tag': params.tag})
        res.status(200).json("Post created")
    }
})

// @desc update Post
// @route PATCH/Post
// @private
const updatePost = handleAsync(async (req, res) => {

})


// @desc  delete Post
// @route DElETE/Post
// @private
const deletePost = handleAsync(async (req, res) => {

})

export default { getPostList, createPost, updatePost, deletePost};