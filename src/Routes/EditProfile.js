import useInput from "../Hooks/useInput";
import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { GET_ME } from "../Query/getQuery";
import { EDIT_ME } from "../Mutation/updateMutaion";
import { Link, withRouter } from "react-router-dom";
import { DELETE_ME } from "../Mutation/deleteMutation";
const EditProfile = ({ history }) => {
  const nameInput = useInput("");
  const emailInput = useInput("");
  const bioInput = useInput("");
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const { loading: getMeLoading, data: getMeData } = useQuery(GET_ME);
  const [editMe] = useMutation(EDIT_ME);
  const [deleteME] = useMutation(DELETE_ME);
  const handleClick = () => {
    history.push(`/`);
  };

  const handleSubmitClick = async () => {
    try {
      const newName = nameInput.value ? nameInput.value : name;
      const newBio = bioInput.value ? bioInput.value : bio;
      const newEmail = emailInput.value ? emailInput.value : email;
      await editMe({
        variables: {
          name: newName,
          email: newEmail,
          bio: newBio
        }
      });
      localStorage.setItem("name", newName);
    } catch (error) {
      console.log(error);
    } finally {
      history.push(`/`);
      window.location.reload();
    }
  };
  const deleteUser = async () => {
    try {
      await deleteME({});
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
    } catch (error) {
      console.log(error);
    } finally {
      history.push(`/`);
      window.location.reload();
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push(`/`);
    window.location.reload();
  };
  //user 가져오기
  useEffect(() => {
    if (!getMeLoading && getMeData.getMe) {
      console.log(getMeData.getMe);

      setName(getMeData.getMe.name);
      setEmail(getMeData.getMe.email);
      setBio(getMeData.getMe.bio);
    }
  }, [getMeData]);

  return (
    <>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Edit User </DialogTitle>

        <DialogContent>
          <TextField
            label={name}
            type="text"
            name="name"
            onChange={nameInput.onChange}
            value={nameInput.value}
          />
          <br />
          <CssBaseline />
          <TextField
            label={email}
            type="text"
            name="email"
            onChange={emailInput.onChange}
            value={emailInput.value}
          />
          <br />
          <CssBaseline />
          <TextField
            label={bio}
            type="text"
            name="bio"
            value={bioInput.value}
            onChange={bioInput.onChange}
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
            수정
          </Button>

          <Button variant="outlined" color="primary" onClick={handleClick}>
            닫기
          </Button>
          <Button variant="outlined" color="primary" onClick={handleLogOut}>
            로그아웃
          </Button>
          <Button
            variant="outlined"
            onClick={deleteUser}
            style={{ backgroundColor: "red" }}
          >
            회원탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withRouter(EditProfile);
