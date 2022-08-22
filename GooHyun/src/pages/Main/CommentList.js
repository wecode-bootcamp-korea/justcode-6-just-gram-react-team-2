import Comment from "./Comment";

function CommentList({ commentData }) {
  console.log(commentData);
  return (
    <li className="feed-comment-list" key={commentData.userID}>
      <Comment
        userName={commentData.userName}
        content={commentData.content}
        createdAt={commentData.createdAt || "2022-01-01"}
      />
    </li>
  );
}

export default CommentList;
