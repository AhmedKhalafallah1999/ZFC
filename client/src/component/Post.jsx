import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Post";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaGrinHearts } from "react-icons/fa";
import { ReactionBox } from "./index";

day.extend(advancedFormat);

const Post = ({
  _id,
  createdAt,
  createdBy,
  post,
  name,
  bio,
  fromWhen = "",
  forDisabled = false,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  // console.log(createdBy);
  return (
    <Wrapper>
      <header>
        <div className="user-info">
          {createdBy.avatar ? (
            <img src={createdBy.avatar} alt="profile" className="img-profile" />
          ) : (
            // <FaGrinHearts className="img" />
            <img
              src="../../public/favicon.jpg"
              alt="profile"
              className="img-profile"
            />
          )}
          <div className="main-icon">{createdBy.name}</div>
        </div>
        <div className="info">
          <h5>{bio}</h5>
          <p>{date}</p>
        </div>
      </header>

      <div className="content">
        {post}
        <footer className="actions">
          {/* <ReactionBox /> */}
          {forDisabled === false ||
            (forDisabled === createdBy._id && (
              <>
                <Link
                  to={
                    fromWhen === true
                      ? `../edit-post/${_id}`
                      : `edit-post/${_id}`
                  }
                  className="btn edit-btn"
                >
                  Edit
                </Link>
                <Form
                  method="post"
                  action={
                    fromWhen === true
                      ? `../delete-post/${_id}`
                      : `delete-post/${_id}`
                  }
                >
                  <button type="submit" className="btn delete-btn">
                    Delete
                  </button>
                </Form>
              </>
            ))}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Post;
