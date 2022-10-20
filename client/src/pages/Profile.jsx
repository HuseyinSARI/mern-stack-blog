import { useState, useEffect } from 'react'
import {
  Container, Stack, TextField, Box, Button
} from "@mui/material"
import { useAuth } from "../middleware/contextHooks"
// #region --------------- Components ---------------
import MainContainer from "../components/MainContainer"
// #endregion

function Profile() {
  const { currentUser, getProfile } = useAuth();
  const [profile, setProfile] = useState({});
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      getProfile();
    }

    if (currentUser) {
      setProfile(currentUser);
    }


  }, [currentUser, getProfile]);

  const handleDisabled = () => {
    setIsDisabled(false)
  }

  const handleCancel = () => {
    setIsDisabled(true)
  }

  const handleUpdate = () => {
    setIsDisabled(true)
  }


  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ my: 3 }}>
        <Stack spacing={2}>
          {
            isDisabled
              ?
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleDisabled}>Edit</Button>
              </Box>
              : null
          }
          <TextField
            label="First Name" name="firstName"
            value={profile.firstName} disabled={isDisabled}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <TextField
            label="Last Name" name="lastName"
            value={profile.lastName} disabled={isDisabled}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <TextField
            label="Location" name="location"
            value={profile.location} disabled={isDisabled}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          {
            !isDisabled
              ?
              <Stack spacing={2} direction="row">
                <Button onClick={handleUpdate}>Update</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Stack>
              : null
          }
        </Stack>
      </Container>
    </MainContainer>
  )
}

export default Profile