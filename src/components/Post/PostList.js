import React, { useState } from "react";
import "../css/PostList.css";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const PostList = ({ postList }) => {
  return (
    <div className="ListContainer">
      <div className="ListHeader">
        <h1 className="PostTitle">게시판</h1>
        <button className="Add-btn">
          <Link to="/addpost">추가</Link>
        </button>
      </div>
      {/* {setPostList &&
        setPostList.map((data) => {
          return (
            <div>
              <h1>{data.name}</h1>
            </div>
          );
        })} */}
      <ListGroup className="mt-4">
        {postList &&
          postList.map((data) => {
            return (
              <ListGroupItem
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <strong style={{ paddingTop: "6px" }}>{data.name}</strong>
                <div className="ml-auto">
                  <Link
                    className="btn btn-warning "
                    style={{ marginRight: "5px" }}
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
