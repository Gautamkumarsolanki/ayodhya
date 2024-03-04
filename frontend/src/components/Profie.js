import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
//import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
export default function Profie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:2000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.post);
        setUser(result.user);
        console.log(pic);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
          <h1 className="bio">
            {" "}
            {JSON.parse(localStorage.getItem("user")).userName}
          </h1>
          <h1 className="bio">NIT KURUKSHETRA</h1>
        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <div className="upsidealign">
            <h1 className="name">
              {JSON.parse(localStorage.getItem("user")).name}
            </h1>
            <Button variant="contained" className="followbutton">
              FOLLOW
            </Button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <div className="setNumbers">
              <p className="paragraphdata">posts</p>
              <span>{pic ? pic.length : "0"}</span>
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
          {pic.map((pics) => (
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
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
}

//   {/* Profile frame */}
//   <div className="profile-frame">
//     {/* profile-pic */}
//     <div className="profile-pic">
//       <img
//         onClick={changeprofile}
//         src={user.Photo ? user.Photo : picLink}
//         alt=""
//       />
//     </div>
//     {/* profile-data */}
//     <div className="pofile-data">
//       <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
//       <div className="profile-info" style={{ display: "flex" }}>
//         <p>{pic ? pic.length : "0"} posts</p>
//         <p>{user.followers ? user.followers.length : "0"} followers</p>
//         <p>{user.following ? user.following.length : "0"} following</p>
//       </div>
//     </div>
//   </div>

// </div>

// <div class="container d-flex justify-content-center align-items-center">
//   <hr
//     style={{
//       width: "90%",

//       opacity: "0.8",
//       margin: "25px auto",
//     }}
//   />
//   {/* Gallery */}
//   <div className="gallery">
//     {pic.map((pics) => {
//       return (
//         <img
//           key={pics._id}
//           src={pics.photo}
//           onClick={() => {
//             toggleDetails(pics);
//           }}
//           className="item"
//         ></img>
//       );
//     })}
//   </div>
//   {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
//   {changePic && <ProfilePic changeprofile={changeprofile} />}
// </div>;

// {

// }
