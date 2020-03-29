import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Textarea from "react-textarea-autosize";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { DELETE_BOARD } from "../Mutation/deleteMutation";
import { GET_BOARD } from "../Query/getQuery";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import { UPDATE_NUM, UPDATETEXT_BOARD } from "../Mutation/updateMutaion";
import CardButtonAction from "../Components/CardAction";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardList from "../Components/CardList";
import useInput from "../Hooks/useInput";

///////////////////css///////////////////////////

const Wrapper = styled.div`
  margin-top: 5%;
  margin-left: 2%;
`;
const BoardBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${props => props.color};
`;

/////////////////////////////////////////////////
const Containers = ({ history }) => {
  const [containerItem, setContainerItem] = useState([]);
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [updateCardArr, setUpdateCardArr] = useState(null);
  const [updateNumCard] = useMutation(UPDATE_NUM);
  const [trueFalseBoard, setTrueFalseBoard] = useState(false);
  const [updateBoard] = useMutation(UPDATETEXT_BOARD);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const {
    loading: getByBoardIdLoading,
    data: getByBoardIdData,
    refetch
  } = useQuery(GET_BOARD, {
    variables: {
      id: localStorage.getItem("id")
    }
  });

  const useStyles = makeStyles({
    root: {
      width: 275,
      backgroundColor: color ? color : "#EBECF0",
      borderRadius: 3,
      padding: 8,
      height: "100%",
      marginRight: 8,
      marginTop: 5
    }
  });
  const classes = useStyles();

  const onDragEnd = async ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }
    console.log(destination, source, draggableId);
    const createdAt1 = source.index;
    const createdAt2 = destination.index;
    const cardId1 = source.droppableId;
    const cardId2 = destination.droppableId;
    if (createdAt1 !== createdAt2 && cardId2 !== cardId1) {
      try {
        await updateNumCard({
          variables: {
            cardId1: String(cardId1),
            cardId2: String(cardId2),
            createdAt1: String(createdAt1),
            createdAt2: String(createdAt2)
          }
        });
        setUpdateCardArr([cardId1, cardId2, createdAt1, createdAt2]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const textInput = useInput("");
  const handleBoardOpen = e => {
    setTrueFalseBoard(true);
  };

  const handleClose = () => {
    setTrueFalseBoard(false);
  };
  const handleEnter = e => {
    if (e.key === "Enter") {
      handleEdit();
      handleClose();
    }
  };
  const handleEdit = async () => {
    try {
      await updateBoard({
        variables: {
          id: localStorage.getItem("id"),
          text: textInput.value
        }
      });
      setText(textInput.value);
    } catch (error) {
      console.log(error);
    } finally {
      textInput.setValue("");
      handleClose();
    }
  };
  const handleDelete = async () => {
    try {
      deleteBoard({
        variables: {
          boardId: localStorage.getItem("id")
        }
      });
      history.push("/");
      window.location.reload();
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };
  useEffect(() => {
    if (!getByBoardIdLoading && getByBoardIdData) {
      setColor(getByBoardIdData.getBoard.color);
      setText(getByBoardIdData.getBoard.text);
      setContainerItem(getByBoardIdData.getBoard.containers);
    }
  }, [getByBoardIdData]);

  return (
    <Wrapper>
      {!trueFalseBoard ? (
        <Card onClick={handleBoardOpen} style={{ backgroundColor: color }}>
          <h1
            style={{
              color: "black",
              cursor: "pointer"
            }}
          >
            {text}
          </h1>
        </Card>
      ) : (
        <>
          <Textarea
            placeholder={"Edit Board Text"}
            autoFocus
            onBlur={handleClose}
            onChange={textInput.onChange}
            value={textInput.value}
            style={{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none",
              minHeight: 80,
              overflow: "visible",
              minWidth: 272
            }}
            onKeyPress={handleEnter}
          />
          <Button
            size="small"
            style={{
              color: "white",
              backgroundColor: "#5aac44"
            }}
            onMouseDown={handleEdit}
          >
            Edit Board
          </Button>

          <Button
            size="small"
            style={{
              color: "white",
              backgroundColor: "red",
              marginLeft: "2px"
            }}
            onMouseDown={handleDelete}
          >
            Delete Board
          </Button>
        </>
      )}

      <BoardBoxContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {containerItem &&
            containerItem.map(container => (
              <Card
                className={classes.root}
                variant="outlined"
                key={container.id}
              >
                <CardList
                  cardItem={container.cards && container.cards}
                  containerText={container.text}
                  containerId={container.id}
                  updateCardArr={updateCardArr && updateCardArr}
                  setContainerItem={setContainerItem}
                  containerItem={containerItem}
                />
              </Card>
            ))}
          <CardButtonAction
            setContainerItem={setContainerItem}
            containerItem={containerItem}
          />
        </DragDropContext>
      </BoardBoxContainer>
    </Wrapper>
  );
};

export default withRouter(Containers);
