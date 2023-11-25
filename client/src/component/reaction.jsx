import "../../src/assets/css/reaction.css";
const ReactionBox = () => {
  return (
    <div id="container">
      <div className="content">
        {/* <div className="reaction">
          <div className="emoji">😃</div>
          <div className="count">52</div>
          <div className="text">happy</div>
        </div> */}

        <div className="reaction">
          <div className="emoji">😂</div>
          <div className="text">amused</div>
          <div className="count">1361</div>
        </div>

        <div className="reaction">
          <div className="emoji">😍</div>
          <div className="text">in love</div>
          <div className="count">94</div>
        </div>

        <div className="reaction">
          <div className="emoji">😮</div>
          <div className="text">shocked</div>
          <div className="count">5</div>
        </div>

        {/* <div className="reaction">
          <div className="emoji">😠</div>
          <div className="text">angry</div>
          <div className="count">17</div>
        </div> */}

        <div className="reaction">
          <div className="emoji">😢</div>
          <div className="text">sad</div>
          <div className="count">0</div>
        </div>
      </div>
    </div>
  );
};

export default ReactionBox;
