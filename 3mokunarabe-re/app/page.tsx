"use client";
import { STORE_KEY_PANEL_SIZE_PREFIX } from 'next/dist/next-devtools/dev-overlay/shared';
import { SegmentPrefixRSCPathnameNormalizer } from 'next/dist/server/normalizers/request/segment-prefix-rsc';
import { useState } from 'react'

function Square({value, onSquareClick}){
    return (
        <button className = "square text-black" onClick={onSquareClick}>{value}</button>
    );
}

function calculateWinner(squares, size){

    const ren = [
        { dx: 1, dy: 0 },  // 右
        { dx: 0, dy: 1 },  // 下
        { dx: 1, dy: 1 },  // 右下
        { dx: -1, dy: 1 }  // 左下
    ];

    for(let i = 0; i < squares.length; i++){
        if(!squares[i]) continue;

        const x = i % size;
        const y = Math.floor(i/size);
        const player = squares[i];
        let count = 1;
        for(const {dx, dy} of ren){
            for(let step = 1; step < 3; step++){
                const nx = x + dx*step;
                const ny = y + dy*step;

                if(nx >= 0 && nx < size && ny >= 0 && ny < size){
                    if(squares[ny *size + nx] === player){
                        count++;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
            if(count == 3) return player;
        }
    }
    return null;
}


function Board({xIsNext, squares, onPlay, size, sizechange}){
    function handleClick(i){
        if(squares[i] || calculateWinner(squares, size)){
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext){
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    let num = 0;
    let column1 = [];
    for(let i = 0; i < size; i++){
        let column2 = [];
        for(let j = 0; j < size; j++){
            const k = num;
            column2.push(<Square key = {k} value={squares[k]} onSquareClick={()=>handleClick(k)}/>);
            num++;
        }
        column1.push(<div key = {i} className = 'board-row'>{column2}</div>);
    }

    const winner = calculateWinner(squares, size);
    let status;
    if(winner){
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div>Bord Size</div>
            <button className = "size-button" onClick={()=>sizechange(3)}>3×3</button>
            <button className = "size-button" onClick={()=>sizechange(4)}>4×4</button>
            <button className = "size-button" onClick={()=>sizechange(5)}>5×5</button>

            <div className = "status">{status}</div>
            {column1}
        </>
    )
}

export default function Game(){
    const [sizenow, setsize] = useState(3);
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(sizenow*sizenow).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    function sizechange(newsize){
        setsize(newsize);
        setHistory([Array(newsize*newsize).fill(null)]);
        setCurrentMove(0);
    }

    const moves = history.map((squares, move)=>{
        let description;
        if(move > 0){
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        
        <div className="game">
            <div className="game-board">
                <Board key = {sizenow} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} size={sizenow} sizechange = {sizechange}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}