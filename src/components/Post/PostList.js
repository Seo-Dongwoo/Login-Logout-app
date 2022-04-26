import React, { useEffect, useState } from "react";
import "../css/PostList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const PostList = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/posts");
        setPostList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="ListContainer">
      <div className="ListHeader">
        <h1 className="PostTitle">게시판</h1>
        <button className="Add-btn">
          <Link to="/addpost">추가</Link>
        </button>
      </div>
      <ListGroup className="mt-4">
        {postList &&
          postList.map((data) => {
            return (
              <ListGroupItem
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <strong style={{ paddingTop: "6px" }}>{data.name}</strong>
                <strong style={{ paddingTop: "6px" }}>{data.title}</strong>
                <strong style={{ paddingTop: "6px" }}>
                  {data.description}
                </strong>
                <div className="ml-auto">
                  <Link
                    className="btn btn-warning "
                    style={{ marginRight: "5px" }}
                    to="/updatepost"
                  >
                    변경
                  </Link>
                  <Button color="danger">삭제</Button>
                </div>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default PostList;
