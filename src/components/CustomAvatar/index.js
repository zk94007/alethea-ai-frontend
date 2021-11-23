import React from 'react';
import './styles.scss';
import {ReactSVG} from 'react-svg';

const OPTIONS = [
  {
    icon: require('../../assets/looking_straight.svg'),
    name: 'Looking Straight'
  },
  {
    icon: require('../../assets/no_smile.svg'),
    name: 'No smiles'
  },
  {
    icon: require('../../assets/full_face_visibility.svg'),
    name: 'Full face visibility'
  },
  {
    icon: require('../../assets/show_upper_body.svg'),
    name: 'Show upper body'
  }
];

export default function CustomAvatar({src, name, onClick}) {
  return (
    <div className="w-100">
      <div className="row m-md-0">
        <div className="col-6 col-md-12">
          <div className="item-container custom-avatar-image-width mx-auto">
            <div className="d-flex align-items-center item-header">
              <label className="font-weight-bold flex-fill text-center my-2">A Good Image</label>
            </div>
            <div className="custom-avatar-image-container">
              <img src={src ?? require('../../assets/face2.png')} alt={name} className="item-image h-100 object-fit" />
            </div>
          </div>
        </div>
        <div className="row col-6 col-md-12 p-0 m-0 align-items-center">
          {OPTIONS.map((e, index) => (
            <div key={index} className="col-12 col-md-6 d-flex align-items-center flex-row mt-md-3 p-0 m-0">
              <ReactSVG src={e.icon} />
              <label className="mx-2">{e.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
