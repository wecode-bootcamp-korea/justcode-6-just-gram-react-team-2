import "./Comment.scss";

function Comment(props) {
  const { content, writer, createdAt } = props;

  return (
    <span>
      {content}-{writer} <span className="createdAt">{createdAt}</span>
    </span>
  );
}

export default Comment;
