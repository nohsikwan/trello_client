import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";
import Textarea from "react-textarea-autosize";
import useInput from "../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_CARD } from "../Mutation/deleteMutation";
import { UPDATE_TEXT } from "../Mutation/updateMutaion";
/////////////css/////////////

const style = {
  box: {
    marginBottom: 8
  }
};
////////////////////////
const Cards = ({ text, id, index, cardItems, setCardItems }) => {
  const [boolean, setBoolean] = useState(false);
  const [deleteCard] = useMutation(DELETE_CARD);
  const [updateTextCard] = useMutation(UPDATE_TEXT);
  const textInput = useInput("");

  const handleOpen = () => {
    setBoolean(true);
  };

  const handleClose = () => {
    setBoolean(false);
  };
  const handleEnter = e => {
    if (e.key === "Enter") {
      handleEdit();
      handleClose();
    }
  };
  const handleEdit = async () => {
    try {
      const newCard = JSON.stringify(cardItems).replace(text, textInput.value);
      setCardItems(JSON.parse(newCard));

      await updateTextCard({
        variables: {
          id,
          text: textInput.value
        }
      });
      textInput.setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  const handleDelete = async () => {
    try {
      const newDeleteCard = cardItems.filter(value => {
        return value.id !== id;
      });
      setCardItems(newDeleteCard);
      handleClose();
      await deleteCard({
        variables: {
          cardId: id
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!boolean ? (
            <Card style={style.box} onClick={handleOpen}>
              <Typography gutterBottom style={{ wordBreak: "break-all" }}>
                {text}
              </Typography>
            </Card>
          ) : (
            <>
              <Textarea
                placeholder={"Edit Card"}
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
                Edit Card
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
                Delete Card
              </Button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
