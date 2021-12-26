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
  Dialog,
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { makeStyles } from '@mui/styles';
import { validateFullName, validateUsername } from '../../utils/validation';
import { userService } from '../../services/user';
import { setMessage } from '../../store/messageSlice';
import GlobalLoading from '../GlobalLoading';
import UserAvatarCrop from '../UserAvatarCrop';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getMe } from '../../store/userSlice';

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
  const { currentUser } = useSelector((state) => state.user);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const [file, setFile] = useState();

  const handleChooseFile = ({ target }) => {
    const file = target.files[0];
    if (!file.type.startsWith('image')) {
      dispatch(setMessage({ type: 'error', message: 'File type is not allowed' }));
    } else {
      setFile(file);
      setIsOpenAvatar(true);
    }
  };

  const handleSuccess = async () => {
    await dispatch(getMe());
    setIsOpenAvatar(false);
  };

  const handleEditProfile = () => {
    handleSubmit(async ({ fullname, username, website, bio }) => {
      try {
        setIsLoading(true);
        const resEditProfile = await userService.editProfile({
          fullname,
          username,
          website,
          bio,
        });
        if (resEditProfile.status === 'success') {
          dispatch(setMessage({ type: 'success', message: resEditProfile.message }));
          router.replace('/');
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
      }
    })();
  };

  return isLoading ? (
    <GlobalLoading />
  ) : (
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
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleChooseFile}
                />
                <IconButton className={classes.button} aria-label="upload picture" component="span">
                  <PhotoCameraOutlinedIcon />
                </IconButton>
              </label>
            </Tooltip>
            {file && (
              <Dialog open={isOpenAvatar} maxWidth="sm">
                <UserAvatarCrop
                  file={file}
                  onSuccess={handleSuccess}
                  onCancel={() => setIsOpenAvatar(false)}
                />
              </Dialog>
            )}
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
        <TextField
          className="mb-4"
          variant="outlined"
          size="small"
          value={currentUser?.email}
          disabled={true}
          fullWidth
        />
      </div>
      <Button
        variant="contained"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        size="large"
        fullWidth
        className="mb-4 w-2/5"
        onClick={handleEditProfile}
      >
        Save
      </Button>
    </Grid>
  );
}
