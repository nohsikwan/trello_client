import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import { GET_BOARDS, GET_ME } from "../Query/getQuery";
import { SUBSCRIPTION_BOARD } from "../Subscription/subsciption";
import CreateNewBoard from "../Routes/CreateNewBoard";
import { Link, withRouter } from "react-router-dom";
import Store from "../store";
/////////css///////////////////////////

const Wrapper = styled.div`
  margin-top: 5%;
  margin-left: 25%;
  max-width: 935px;
  width: 100%;
`;
const BoardBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BoardBox = styled.span`
  width: 24%;
  height: 150px;
  background-color: ${props => props.color};
  border: 2px solid whitesmoke;
  border-radius: 5px;
`;
const BoardBoxButton = styled.button`
  width: 24.45%;
  height: 154px;
  background-color: #273c75;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #40739e;
  }
`;

////////////////////////////////////////////////

const Board = ({ history }) => {
  const store = useContext(Store);
  const item = store[2];
  const setItem = store[3];

  const { loading, data, refetch } = useQuery(GET_BOARDS);
  const { loading: getMeLoading, data: getMeData } = useQuery(GET_ME);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const {
    loading: subsciptionLoading,
    error,
    data: realTimeData
  } = useSubscription(SUBSCRIPTION_BOARD, {
    variables: {
      email: email
    }
  });
  //쿼리로 getBoard
  useEffect(() => {
    refetch();
    if (!loading && data.getBoards) {
      setItem([...data.getBoards]);
    }
  }, [data]);

  //newBoard에 대한 data 감시
  useEffect(() => {
    if (!subsciptionLoading && realTimeData.subscriptionBoard) {
      setItem([...item, realTimeData.subscriptionBoard]);
    }
  }, [realTimeData]);

  //내 email 가져오기
  useEffect(() => {
    if (!getMeLoading && getMeData.getMe) {
      localStorage.setItem("name", getMeData.getMe.name);
      setEmail(getMeData.getMe.email);
    }
  }, [getMeData]);

  const handleContainerRoute = (text, id) => {
    localStorage.setItem("id", id);
    history.push(`/container?term=${text}`);
  };
  return (
    <>
      <Wrapper>
        <h2> 📌 Personal Boards</h2>
        <BoardBoxContainer>
          {!loading &&
            item.length >= 1 &&
            item.map(board => (
              <BoardBox
                key={board.id}
                createdAt={board.createdAt}
                containers={board.containers}
                color={board.color}
                onClick={e => {
                  e.preventDefault();
                  handleContainerRoute(board.text, board.id);
                }}
              >
                {board.text}
              </BoardBox>
            ))}
          <BoardBoxButton onClick={() => setOpen(true)}>
            Create new Board
          </BoardBoxButton>
        </BoardBoxContainer>
      </Wrapper>
      <CreateNewBoard open={open} setOpen={setOpen} />
    </>
  );
};

export default withRouter(Board);
