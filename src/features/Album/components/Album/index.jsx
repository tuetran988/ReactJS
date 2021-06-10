import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
Album.propTypes = {
    
};

function Album(props) {
    const { album } = props;
    return (
      <div className="album">
        <div className="album__img">
          <img src={album.linkImg} />
        </div>
        <p className="album__name">{album.name}</p>
      </div>
    );
}

export default Album;