import { useState, useEffect } from 'react';
import {
  Grid,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { makeStyles } from '@mui/styles';
import {
  validateEmail,
  validateFullName,
  validateUsername,
  validateBio,
  validateWebsite,
} from '../../utils/validation';
import { getMe, addToken } from '../../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles(() => ({
  button: {
    padding: 6,
    border: '2px solid #fff',
    backgroundColor: '#e4e6e8',
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleClickLogin = () => {
    handleSubmit(async ({ fullname, username, website, bio, email }) => {
      console.log(fullname, username, website, bio, email);
    })();
  };

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(getMe()), dispatch(addToken())]).then(() => {
      setLoading(false);
    });
  }, [!currentUser]);

  const { currentUser } = useSelector((state) => state.user);

  return (
    !isLoading && (
      <Grid
        container
        className="max-w-5xl"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div className="grid grid-cols-2 p-4 md:w-4/5 items-center justify-evenly">
          <Box position="relative" display="inline-flex">
            <Avatar
              src={currentUser?.avatar}
              style={{
                width: 100,
                height: 100,
                border: '2px solid #e4e6e8',
                backgroundColor: '#fff',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: 60,
                bottom: 0,
              }}
            >
              <Tooltip title="Update Avatar">
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                    className={classes.button}
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraOutlinedIcon />
                  </IconButton>
                </label>
              </Tooltip>
            </Box>
          </Box>
          <Typography variant="h6">{currentUser?.username}</Typography>
          <Typography className="font-semibold">Full Name</Typography>
          <Controller
            className="mb-4"
            name="fullname"
            defaultValue={currentUser?.fullname}
            control={control}
            rules={{
              validate: {
                validator: (value) => validateFullName(value),
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                className="mb-4"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Typography className="font-semibold">Username</Typography>
          <Controller
            className="mb-4"
            name="username"
            defaultValue={currentUser?.username}
            control={control}
            rules={{
              validate: {
                validator: (value) => validateUsername(value),
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                className="mb-4"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Typography className="font-semibold">Website</Typography>
          <Controller
            className="mb-4"
            name="website"
            defaultValue={currentUser?.website}
            control={control}
            rules={{
              validate: {
                validator: (value) => validateWebsite(value),
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                className="mb-4"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Typography className="font-semibold">Bio</Typography>
          <Controller
            className="mb-4 "
            name="bio"
            defaultValue={currentUser?.bio}
            control={control}
            rules={{
              validate: {
                validator: (value) => validateBio(value),
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                className="mb-4"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Typography className="font-semibold">Email</Typography>
          <Controller
            className="mb-4 "
            name="email"
            defaultValue={currentUser?.email}
            control={control}
            rules={{
              validate: {
                validator: (value) => validateEmail(value),
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                className="mb-4"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
        </div>
        <Button
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          size="large"
          fullWidth
          className="mb-4 w-2/5"
          onClick={handleClickLogin}
        >
          Save
        </Button>
      </Grid>
    )
  );
}
