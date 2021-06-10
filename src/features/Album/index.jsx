import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {

    const albumList = [
      {
        id: 1,
        name: "Nhạc Phật remix",
        linkImg:
          "https://spaceplace.nasa.gov/templates/featured/sun/sunburn300.png",
      },
      {
        id: 2,
        name: "Nhạc cách mạng",
        linkImg:
          "https://spaceplace.nasa.gov/templates/featured/sun/sunburn300.png",
      },
      {
        id: 3,
        name: "Nhạc vàng bollerro",
        linkImg:
          "https://spaceplace.nasa.gov/templates/featured/sun/sunburn300.png",
      },
    ];



    return (
      <div>
        <h2>can you like this ?</h2>
        <AlbumList albumList={albumList} />
      </div>
    );
}

export default AlbumFeature;