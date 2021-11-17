import { useState } from 'react';
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
  setBorder: {
    borderLeft: '1px solid #dbdbdb',
  },
}));

export default function EditProfile() {
  const classes = useStyles();

  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleClickLogin = () => {
    handleSubmit(async ({ fullname, username, website, bio, email }) => {
      console.log(fullname, username, website, bio, email);
    })();
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <Grid
      container
      className={`max-w-5xl ${classes.setBorder}`}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <div className="grid grid-cols-2 p-4 md:w-4/5 items-center justify-evenly">
        <Box position="relative" display="inline-flex">
          <Avatar
            src="/assets/images/45851733.png"
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
                <IconButton className={classes.button} aria-label="upload picture" component="span">
                  <PhotoCameraOutlinedIcon />
                </IconButton>
              </label>
            </Tooltip>
          </Box>
        </Box>
        <Typography variant="h6">anhhoang362k</Typography>
        <Typography className="font-semibold">Full Name</Typography>
        <Controller
          className="mb-4"
          name="fullname"
          defaultValue="hoanganh"
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
          defaultValue="hoanganh"
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
          defaultValue="hoanganh"
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
          defaultValue="hoanganh"
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
          defaultValue="ronaldo"
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
  );
}
