import React from 'react';
import { addToInterests, addToFuture } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ResultItem = ({
  title,
  poster,
  year,
  showID,
  addToInterests,
  addToFuture,
}) => {
  return (
    <div className="card">
      <div className="card-image">
        {' '}
        {poster !== null && <img className="poster" src={poster} />}
      </div>
      <h2>{title}</h2>
      <div className="card-stats">
        <div className="stat">
          <div className="value">
            <button onClick={() => addToInterests(showID)}>
              <span>Interested? </span>
            </button>
          </div>
        </div>

        <div className="stat">
          <div className="value">
            <button onClick={() => addToFuture(showID)}>
              <span>Future?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ResultItem.propTypes = {
  addToInterests: PropTypes.func.isRequired,
  addToInterests: PropTypes.func.isRequired,
};

export default connect(null, { addToFuture, addToInterests })(ResultItem);
