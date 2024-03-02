const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin = require("../middlewares/requireLogin");

// to get user profile
router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                .exec((err, post) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.status(200).json({ user, post })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})

// to follow user
router.put("/follow", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        USER.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).then(result => {
            res.json(result)

        })
            .catch(err => { return res.status(422).json({ error: err }) })
    }
    )
})

// to unfollow user
router.put("/unfollow", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    }
    )
})

// to upload profile pic
router.put("/uploadProfilePic", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: er })
        } else {
            res.json(result)
        }
    })
})

// to update bio or name
router.put("edit-profile", requireLogin, async (req, res) => {
    try {
        const editData = {}
        if (req.body["bio"]) {
            editData["bio"] = req.body["bio"];
        }
        if (req.body["name"]) {
            editData["name"] = req.body["name"];
        }
        await USER.findByIdAndUpdate(req.user._id, {
            $set: {
                ...editData
            }
        });

    } catch (error) {

    }
})


// to update username
router.put("update-username", requireLogin, async (req, res) => {
    try {
        const { userName } = req.body;
        if (!userName) {

        }
        const userNameExist = await USER.findOne({ userName });
        if (userNameExist) {
            return res.status(200).json({
                error: "UserName not available"
            })
        }
        await USER.updateOne({ userName }, {
            $set: {
                userName
            }
        });

        return res.status(200).json({
            success: true,
            message: "Updated Successfully"
        })

    } catch (error) {

    }
})

module.exports = router;