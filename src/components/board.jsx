import React, { Component } from 'react';
import Square from './square';

const Board = props => {
  const renderSquare = i => {
    if (props.locationWin.indexOf(i) !== -1) {
      return (
        <Square
          key={i}
          value={props.squares[i]}
          cross={true}
          onClick={() => props.onClick(i)}
        />
      );
    } else {
      return (
        <Square
          key={i}
          value={props.squares[i]}
          cross={false}
          onClick={() => props.onClick(i)}
        />
      );
    }
  };
  const renderBoard = () => {
    const row = [];
    let stt = 0;
    for (let i = 0; i < 3; i++) {
      const contentRow = [];
      for (let j = 0; j < 3; j++) {
        contentRow.push(renderSquare(stt));
        stt++;
      }
      row.push(
        <div key={stt} className="board-row">
          {contentRow}
        </div>
      );
    }
    return row;
  };

  return <div>{renderBoard()}</div>;
};

export default Board;
