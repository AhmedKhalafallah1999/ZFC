import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Post";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Post = ({
  _id,
  createdAt,
  createdBy,
  post,
  name,
  bio,
  fromWhen = "",
  forDisabled = "",
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name}</div>
        <div className="info">
          <h5>{bio}</h5>
          <p>{date}</p>
        </div>
      </header>
      <div className="content">
        {post}
        {forDisabled && forDisabled === createdBy && (
          <footer className="actions">
            <Link
              to={
                fromWhen === true ? `../edit-post/${_id}` : `edit-post/${_id}`
              }
              className="btn edit-btn"
            >
              Edit
            </Link>
            <Form method="post" action={`../delete-post/${_id}`}>
              <button type="submit" className="btn delete-btn">
                Delete
              </button>
            </Form>
          </footer>
        )}
      </div>
    </Wrapper>
  );
};

export default Post;
