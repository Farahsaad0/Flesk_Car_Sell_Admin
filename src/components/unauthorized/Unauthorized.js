import { useNavigate } from "react-router-dom";
import "./style.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    // <section>
    //   <h1>Unauthorized</h1>
    //   <br />
    //   <p>You do not have access to the requested page.</p>
    //   <div className="flexGrow">
    //     <button onClick={goBack}>Go Back</button>
    //   </div>
    // </section>
    <div className="unauth_Body">
      <div>
        <div className="message">You are not authorized.</div>
        <div className="message2">
          You tried to access a page you did not have prior authorization for.
        </div>
        <button type="button" className="btn btn-primary" onClick={goBack}>
          Go back
        </button>
      </div>

      <div className="unauth_container">
        <div className="neon">403</div>
        <div className="door-frame">
          <div className="door">
            <div className="rectangle"></div>
            <div className="handle"></div>
            <div className="window">
              <div className="eye"></div>
              <div className="eye eye2"></div>
              <div className="leaf"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
