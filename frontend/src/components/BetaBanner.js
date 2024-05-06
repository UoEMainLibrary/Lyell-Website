import React from 'react';

const BetaBanner = () => {
  return (
    <div className="alert alert-warning text-center mb-0 py-2" role="alert">
      <strong>This website is currently in beta. Feedback is welcome at <a href="mailto:HeritageCollections@ed.ac.uk">HeritageCollections@ed.ac.uk</a> .</strong>
    </div>
  );
};

export default BetaBanner;
