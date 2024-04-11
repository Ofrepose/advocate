// Component is responsible for the Main Board
import React from 'react';
import Cell from './Cell';

const Board = ({ boardState, handleClick, currentPlayer }) => {

    return (
        <div className="bg-secondary p-4 rounded-md w-1/2 mx-auto shadow-2xl w-full">
            <div className="grid grid-cols-3 gap-2">
                {boardState.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell}
                            onClick={() => handleClick(rowIndex, colIndex)}
                            currentPlayer={currentPlayer}
                        />
                    ))
                ))}
            </div>
        </div>

    )
}

export default Board; 