import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Textarea from "react-textarea-autosize";
import CardButtonAction from "./CardAction";
import Cards from "../Routes/Cards";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useInput from "../Hooks/useInput";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DELETE_CONTAINER } from "../Mutation/deleteMutation";
import { UPDATETEXT_CONTAINER } from "../Mutation/updateMutaion";
const CardList = ({
  cardItem,
  containerId,
  containerText,
  updateCardArr,
  containerItem,
  setContainerItem
}) => {
  const textInput = useInput("");
  const [containerTextItem, setContainerTextItem] = useState(containerText);
  const [cardItems, setCardItems] = useState(cardItem ? cardItem : []);
  const [trueFalseContainer, setTrueFalseContainer] = useState(false);

  const [deleteContainer] = useMutation(DELETE_CONTAINER);
  const [updateContainer] = useMutation(UPDATETEXT_CONTAINER);
  const handleContainerOpen = e => {
    setTrueFalseContainer(true);
  };
  const handleClose = () => {
    setTrueFalseContainer(false);
  };
  const handleEnter = e => {
    if (e.key === "Enter") {
      handleEdit();
      handleClose();
    }
  };
  const handleEdit = async () => {
    try {
      await updateContainer({
        variables: {
          id: containerId,
          text: textInput.value
        }
      });
      setContainerTextItem(textInput.value);
    } catch (error) {
      console.log(error);
    } finally {
      textInput.setValue("");
      handleClose();
    }
  };
  const handleDelete = async () => {
    try {
      await deleteContainer({
        variables: {
          containerId
        }
      });
      const filterConatainer = containerItem.filter(value => {
        return value.id !== containerId;
      });
      setContainerItem([...filterConatainer]);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  useEffect(() => {
    if (updateCardArr) {
      const createdAt1 = updateCardArr[2];
      const createdAt2 = updateCardArr[3];
      let replaceCardItem = JSON.stringify(cardItems).replace(
        String(createdAt1),
        String(createdAt2)
      );
      replaceCardItem = replaceCardItem.replace(
        String(createdAt2),
        String(createdAt2 - 1)
      );

      setCardItems(JSON.parse(replaceCardItem));
    }
  }, [updateCardArr]);

  return (
    <>
      <CardContent>
        {!trueFalseContainer ? (
          <Typography
            style={{
              wordBreak: "break-all",
              cursor: "pointer"
            }}
            variant="h5"
            component="h6"
            onClick={handleContainerOpen}
          >
            {containerTextItem}
          </Typography>
        ) : (
          <>
            <Textarea
              placeholder={"Edit Container"}
              autoFocus
              onBlur={handleClose}
              onChange={textInput.onChange}
              value={textInput.value}
              onKeyPress={handleEnter}
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
            />
            <Button
              size="small"
              style={{
                color: "white",
                backgroundColor: "#5aac44"
              }}
              onMouseDown={handleEdit}
            >
              Edit Container
            </Button>

            <Button
              size="small"
              style={{
                color: "white",
                backgroundColor: "red"
              }}
              onMouseDown={handleDelete}
            >
              Delete Container
            </Button>
          </>
        )}
      </CardContent>
      {(cardItems && cardItems)
        .sort(function(b, a) {
          return Number(a.created) - Number(b.created);
        })
        .map((card, index) => (
          <Droppable droppableId={card.id} key={card.id}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Cards
                  key={card.id}
                  id={card.id}
                  text={card.text}
                  index={Number(card.created)}
                  cardItems={cardItems}
                  setCardItems={setCardItems}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      <CardButtonAction
        text={containerText}
        containerId={containerId}
        cardItems={cardItems}
        setCardItems={setCardItems}
      />
    </>
  );
};

export default CardList;
