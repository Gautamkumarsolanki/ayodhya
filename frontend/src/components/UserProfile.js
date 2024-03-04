import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import { useParams } from "react-router-dom";
import "./Profile.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
export default function UserProfie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };
  // to follow user
  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  // to unfollow user
  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:2000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            //onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
          <h1 className="bio"> {user.userName}</h1>
          <h1 className="bio">NIT KURUKSHETRA</h1>
        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <div className="upsidealign">
            <h1 className="name">{user.name}</h1>
            <Button
              variant="contained"
              className="followbutton"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </Button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <div className="setNumbers">
              <p className="paragraphdata">posts</p>
              <span>{posts.length}</span>
            </div>
            <div className="setNumbers">
              <p className="paragraphdata">following</p>
              <span>{user.following ? user.following.length : "0"} </span>
            </div>
            <div className="setNumbers">
              <p className="paragraphdata">followers</p>
              <span>{user.followers ? user.followers.length : "0"}</span>
            </div>
          </div>

          <div className="bottomheading">
            <Button variant="outlined" color="error" className="deletebutton">
              Unfollow
            </Button>
            <Button
              variant="outlined"
              endIcon={<SendIcon />}
              className="sendbuttons"
            >
              message
            </Button>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "40rem",
          opacity: "0.8",
          margin: "17px auto",
          position: "relative",
          right: "3rem",
          top: "1.2rem",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        <div className="hrbottom">
          <AddToPhotosIcon />
          <p>POSTS</p>
        </div>{" "}
        <ImageList cols={3} rowHeight={164}>
          {posts.map((pics) => (
            <ImageListItem key={pics._id}>
              <img
                srcSet={`${pics.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${pics.photo}?w=164&h=164&fit=crop&auto=format`}
                className="imageset"
                alt={pics.title}
                loading="lazy"
                onClick={() => {
                  toggleDetails(pics);
                }}
                style={{ width: "10rem", height: "16rem" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {/* {changePic && <ProfilePic changeprofile={changeprofile} />} */}
    </div>
  );
}
