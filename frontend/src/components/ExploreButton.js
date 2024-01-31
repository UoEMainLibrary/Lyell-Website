import react from "react";
import {Link} from "react-router-dom";

export default function ExploreButton() {
    const buttonStyle = {
      padding: '10px',
      display: 'flex',
      margin: '0 auto',
      alignItems: 'center',
      backgroundColor: '#1a4664',
      color: 'white',
      width: '260px',
    };
  return (
      <Link to="/collections/explore">
    <div style={buttonStyle}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27a6.53 6.53 0 0 0 1.41-4.13c0-3.59-2.91-6.5-6.5-6.5S2 5.01 2 8.6s2.91 6.5 6.5 6.5a6.49 6.49 0 0 0 4.08-1.42l.28.28v.79l4.25 4.24 1.49-1.49-4.24-4.25zm-7 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
        </svg>
        <p className="my-1 mx-2" style={{fontSize: "20px", textDecoration: 'none',}}>Search the Notebooks</p>
    </div>
      </Link>
  );
};