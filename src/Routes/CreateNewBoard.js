import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import useInput from "../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_BOARD } from "../Mutation/createMutation";

const CreateNewBoard = ({ setOpen, open }) => {
  const boardText = useInput("");
  const [boardColor, setBoardColor] = useState("white");
  const [trueFalse1, setTrueFalse1] = useState(false);
  const [trueFalse2, setTrueFalse2] = useState(false);
  const [trueFalse3, setTrueFalse3] = useState(false);
  const [trueFalse4, setTrueFalse4] = useState(false);
  const [trueFalse5, setTrueFalse5] = useState(false);
  const [createBoard] = useMutation(CREATE_BOARD);

  const handleSubmitClick = async e => {
    try {
      if (boardText.value !== "") {
        await createBoard({
          variables: {
            text: boardText.value,
            color: boardColor
          }
        });
        setOpen(false);
        boardText.setValue("");
      } else {
        alert("text를 입력해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setOpen(false);
  };
  //////////selectColor/////////////
  const handleColorClick1 = e => {
    setBoardColor(e.target.style.backgroundColor);

    if (trueFalse2 || trueFalse3 || trueFalse4 || trueFalse5) {
      setTrueFalse2(false);
      setTrueFalse3(false);
      setTrueFalse4(false);
      setTrueFalse5(false);
    }
    trueFalse1 ? setTrueFalse1(false) : setTrueFalse1(true);
  };
  const handleColorClick2 = e => {
    setBoardColor(e.target.style.backgroundColor);

    if (trueFalse1 || trueFalse3 || trueFalse4 || trueFalse5) {
      setTrueFalse1(false);
      setTrueFalse3(false);
      setTrueFalse4(false);
      setTrueFalse5(false);
    }
    trueFalse2 ? setTrueFalse2(false) : setTrueFalse2(true);
  };
  const handleColorClick3 = e => {
    setBoardColor(e.target.style.backgroundColor);

    if (trueFalse2 || trueFalse1 || trueFalse4 || trueFalse5) {
      setTrueFalse2(false);
      setTrueFalse1(false);
      setTrueFalse4(false);
      setTrueFalse5(false);
    }
    trueFalse3 ? setTrueFalse3(false) : setTrueFalse3(true);
  };
  const handleColorClick4 = e => {
    setBoardColor(e.target.style.backgroundColor);

    if (trueFalse2 || trueFalse3 || trueFalse1 || trueFalse5) {
      setTrueFalse2(false);
      setTrueFalse3(false);
      setTrueFalse1(false);
      setTrueFalse5(false);
    }
    trueFalse4 ? setTrueFalse4(false) : setTrueFalse4(true);
  };
  const handleColorClick5 = e => {
    setBoardColor(e.target.style.backgroundColor);

    if (trueFalse2 || trueFalse3 || trueFalse4 || trueFalse1) {
      setTrueFalse2(false);
      setTrueFalse3(false);
      setTrueFalse4(false);
      setTrueFalse1(false);
    }
    trueFalse5 ? setTrueFalse5(false) : setTrueFalse5(true);
  };
  ////////////////////////////////////////
  return (
    <>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Add Board Color & Title </DialogTitle>

        <DialogContent>
          <Typography
            component="div"
            style={{
              backgroundColor: "#f53b57",
              height: "80px",
              border: trueFalse1 && "6px solid #ffc048"
            }}
            onClick={handleColorClick1}
          />
          <Typography
            component="div"
            style={{
              backgroundColor: "#575fcf",
              height: "80px",
              border: trueFalse2 && "6px solid #ffc048"
            }}
            onClick={handleColorClick2}
          />
          <Typography
            component="div"
            style={{
              backgroundColor: "#34e7e4",
              height: "80px",
              border: trueFalse3 && "6px solid #ffc048"
            }}
            onClick={handleColorClick3}
          />
          <Typography
            component="div"
            style={{
              backgroundColor: "#0be881",
              height: "80px",
              border: trueFalse4 && "6px solid #ffc048"
            }}
            onClick={handleColorClick4}
          />
          <Typography
            component="div"
            style={{
              backgroundColor: "#1e272e",
              height: "80px",
              border: trueFalse5 && "6px solid #ffc048"
            }}
            onClick={handleColorClick5}
          />
          <br />

          <TextField
            label="Add board title"
            type="text"
            name="title"
            onChange={boardText.onChange}
            value={boardText.value}
          />
          <br />
          <CssBaseline />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
          >
            추가
          </Button>

          <Button variant="outlined" color="primary" onClick={handleClick}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateNewBoard;
