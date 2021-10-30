import React from "react";
import { Grid } from "@material-ui/core";
import "./Caro.css";
import chunk from "lodash/chunk";
import { useState, Fragment } from "react";
import { width } from "dom-helpers";

const Caro = () => {
  const [count, setCount] = useState(0);
  const [checkwin, setCheckwin] = useState("");
  const [state, setState] = useState([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ]);

  const handleClick = (row, col) => {
    setCount(count + 1);

    if (count % 2 == 0) {
      state[row][col] = state[row][col] == "" ? "O" : "O";
      Checkwin_row(row, col, "O");
      Checkwin_col(row, col, "O");
      Checkwin_diagonal(row, col, "O");
    } else {
      state[row][col] = state[row][col] == "" ? "X" : "X";
      setState([...state]);

      Checkwin_row(row, col, "X");
      Checkwin_col(row, col, "X");
      Checkwin_diagonal(row, col, "X");
    }
  };

  //Dòng
  const Checkwin_row = (row, col, type) => {
    let left = 0;
    let right = 0;
    //Check Left
    for (let i = col; i >= 0; i--) {
      if (state[row][i] == type) left++;
      else break;
    }

    //Check Right
    for (let i = col; i < 8; i++) {
      if (state[row][i] == type) right++;
      else break;
    }

    if (left == 5 || right == 5) {
      setCheckwin(type);
    }

    // console.log("Type", type, "Left Count", left);
    // console.log("Type", type, "Right Count", right);
  };

  //Cột
  const Checkwin_col = (row, col, type) => {
    let up = 0;
    let down = 0;

    //Up
    for (let i = row; i >= 0; i--) {
      if (state[i][col] == type) {
        up++;
      } else break;
    }

    //down
    for (let i = row; i < 8; i++) {
      if (state[i][col] == type) {
        down++;
      } else break;
    }

    if (up === 5 || down == 5) setCheckwin(type);
    // console.log("Type", type, "Up Count", up);
    // console.log("Type", type, "Down Count", down);
  };

  //Chéo
  // const Checkwin_diagonal
  const Checkwin_diagonal = (row, col, type) => {
    let leftup = 0;
    let leftdown = 0;
    let leftucount = col;
    let leftdcount = col;

    let rightup = 0;
    let rightdown = 0;
    let rightucount = col;
    let rightdcount = col;

    //Left side up

    for (let i = row - 1; i >= 0; i--) {
      leftucount = leftucount - 1;
      if (state[i][leftucount] == type) {
        leftup++;
      } else break;
    }

    //Left side down

    for (let i = row + 1; i < 8; i++) {
      leftdcount = leftdcount - 1;
      if (state[i][leftdcount] == type) {
        leftdown++;
      } else break;
    }

    //////////

    //Right side up

    for (let i = row - 1; i >= 0; i--) {
      rightucount = rightucount + 1;

      if (state[i][rightucount] == type) {
        rightup++;
      } else break;
    }

    for (let i = row + 1; i < 8; i++) {
      rightdcount = rightdcount + 1;
      if (state[i][rightdcount] == type) {
        rightdown++;
      } else break;
    }

    if (leftup == 4 || leftdown == 4) {
      setCheckwin(type);
    }

    if (rightup == 4 || rightdown == 4) {
      setCheckwin(type);
    }

    // console.log("Type", type, "Left Diagonal", left);
    // console.log("Type", type, "Right Diagonal", right);
  };

  return (
    <Fragment>
      <div className="flex jus-center ">
        <div className="">
          {state.map((row, row_indx) => {
            return (
              <div
                style={{
                  width: "100%",
                  margin: "0% 0% 0 0%",
                  display: "flex",
                }}
              >
                {row.map((col, col_indx) => {
                  return (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid black",
                        margin: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        fontSize: "22px",
                      }}
                      onClick={() => handleClick(row_indx, col_indx)}
                    >
                      {state[row_indx][col_indx]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ width: "15%", fontSize: "1.5rem" }}>
          {" "}
          Winner is :{" "}
          <label style={{ color: "red", fontSize: "2.5rem" }}>{checkwin}</label>
        </div>
      </div>
    </Fragment>
  );
};

export default Caro;
