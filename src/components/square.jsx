import React, { Component } from 'react';

const Square = props => {
  if (props.cross) {
    return (
      <button className="square-win" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
};

export default Square;
