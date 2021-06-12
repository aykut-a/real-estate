import React from 'react'

export const SingleFlat = ({ flat }) => {

  return (
    <div className="single-flat">

      <img src={require(`./images/${flat.room_type.label}.jpg`).default} alt="" className="flat-image" />
      <p className="flat-title">{flat.code}</p>

      <div className="horizontal-line-junior"></div>

      <div className="attribute">
        <p className="attribute-type">FLOOR TYPE</p>
        <p className="attribute-value">{flat.room_type.label}</p>
      </div>

      <div className="horizontal-line-junior"></div>

      <div className="attribute">
        <p className="attribute-type">INTERNAL</p>
        <p className="attribute-value">{flat.net_area} <span className="square-meter">&#13217;</span></p>
      </div>

      <div className="horizontal-line-junior"></div>

      <div className="attribute">
        <p className="attribute-type">EXTERNAL</p>
        <p className="attribute-value">{flat.out_area} <span className="square-meter">&#13217;</span></p>
      </div>

      <div className="horizontal-line-junior"></div>

      <div className="attribute">
        <p className="attribute-type">GROSS</p>
        <p className="attribute-value">{flat.gross_area} <span className="square-meter">&#13217;</span></p>
      </div>

      <div className="horizontal-line-junior"></div>

      <div className="attribute">
        <p className="attribute-type">POOL</p>
        <p className="attribute-value">{flat.pool_area} <span className="square-meter">&#13217;</span></p>
      </div>

      <div className="horizontal-line-junior"></div>

      <div className="attribute">
        <p className="attribute-type">ROOF</p>
        <p className="attribute-value">{flat.roof_area} <span className="square-meter">&#13217;</span></p>
      </div>

    </div>
  )
}
