import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Explore.css";
import axios from "axios";
import Infinity from "../../../components/Loaders/Infinity";
// import { BASE_URL } from "../../../App";

const Explore = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user._id;

  const [posts, setPosts] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const getPosts = () => {
      // axios
      //   .get(`${BASE_URL}/others/${userID}`)
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/others/${userID}`)
        .then((result) => {
          setPosts(result.data);
        })
        .catch((error) => {
          console.error(error);
          navigate("/error");
        });
    };
    setTimeout(() => {
      setShowLoader(false);
    }, 7000);
    getPosts();
  }, [navigate, userID]);

  return (
    <div>
      {posts.length > 0 ? (
        <div className="other-posts">
          {posts.map((post) => (
            <div
              className="other-post"
              key={post._id}
              onClick={() => {
                navigate("/others/" + post._id);
              }}
            >
              <img className="other-postImg" src={post.photo} alt="img" />
              <div className="other-postInfo">
                <span className="other-postTitle">
                  <Link to={"/others/" + post._id} className="link">
                    {post.title}
                  </Link>
                </span>
                <span className="other-postDate">by {post.author}</span>
              </div>
              <p className="other-postDesc">{post.desc}</p>
            </div>
          ))}
        </div>
      ) : showLoader ? (
        <div className="infinite_loader">
          <Infinity />
        </div>
      ) : (
        <div className="infinite_loader">
          <h1>No Posts Found</h1>
        </div>
      )}
    </div>
  );
};

export default Explore;
