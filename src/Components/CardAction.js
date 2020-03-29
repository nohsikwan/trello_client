import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { FullPlus } from "../Components/Icons";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import useInput from "../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CARD, CREATE_CONTAINER } from "../Mutation/createMutation";

/////////////////css///////////////////
const Container = styled.div`
  opacity: ${props => (props.opacity ? 1 : 0.8)};
  color: ${props => (props.Color ? "white" : "inherit")};
  background-color: ${props =>
    props.backGround ? "rgba(0,0,0,0.05)" : "inherit"};
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

//////////////////////////////////////

const CardButtonAction = ({
  text,
  containerId,
  cardItems,
  setCardItems,
  setContainerItem,
  containerItem
}) => {
  const cardButtonText = text ? "Add another Card" : "Add another list";
  const [boolean, setBoolean] = useState(false);

  const placeholder = text ? "Enter list title..." : "Enter a for this card..";
  const buttonTitle = !text ? "Add List" : "Add Card";
  const textInput = useInput("");
  const [createCard] = useMutation(CREATE_CARD);
  const [createContainer] = useMutation(CREATE_CONTAINER);
  const handleOpen = () => {
    setBoolean(true);
  };

  const handleClose = () => {
    setBoolean(false);
  };

  const handleCreate = async e => {
    try {
      if (text) {
        const { data: newCard } = await createCard({
          variables: {
            text: textInput.value,
            containerId
          }
        });

        setCardItems([...cardItems, newCard.createCard]);
      } else {
        const { data: newContainer } = await createContainer({
          variables: {
            text: textInput.value,
            boardId: localStorage.getItem("id")
          }
        });
        setContainerItem([...containerItem, newContainer.createContainer]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      textInput.setValue("");
      handleClose();
    }
  };
  const handleEnter = e => {
    if (e.key === "Enter") {
      handleCreate();
      handleClose();
    }
  };

  return (
    <Container opacity={text} Color={text} backGround={text}>
      {!boolean ? (
        <FlexContainer>
          <Button size="small" onClick={handleOpen}>
            <FullPlus /> &nbsp; {cardButtonText}
          </Button>
        </FlexContainer>
      ) : (
        <>
          <Textarea
            placeholder={placeholder}
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
            onMouseDown={handleCreate}
          >
            {buttonTitle}
          </Button>
        </>
      )}
    </Container>
  );
};

export default CardButtonAction;
