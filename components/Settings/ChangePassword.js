import { useState } from 'react';
import {
  Grid,
  FormGroup,
  TextField,
  CircularProgress,
  Avatar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { validatePassword } from '../../utils/validation';
import { userService } from '../../services/user';
import { setMessage } from '../../store/messageSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

export default function ChangePassword() {
  const { currentUser } = useSelector((state) => state.user);
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  //formData
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleClickSignUp = () => {
    handleSubmit(async ({ oldPassword, newPassword }) => {
      try {
        setIsLoading(true);
        const resChangePassword = await userService.changePassword({
          oldPassword,
          newPassword,
        });
        if (resChangePassword.status === 'success') {
          dispatch(setMessage({ type: 'success', message: resChangePassword.message }));
          router.replace('/');
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
      }
    })();
  };
  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };
  return (
    <Grid
      container
      className="max-w-5xl"
      justifyContent="center"
      alignItems="center"
      direction={largeScreen ? 'column' : 'row'}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
        <Avatar
          src={currentUser?.avatar}
          style={{
            width: 50,
            height: 50,
            border: '2px solid #e4e6e8',
            marginRight: '1rem',
            backgroundColor: '#fff',
          }}
        />
        <Typography variant="h6">{currentUser?.username}</Typography>
      </Box>
      <FormGroup className="w-4/5 md:w-2/5 mt-4">
        <Controller
          name="oldPassword"
          defaultValue=""
          control={control}
          rules={{
            validate: (value) => validatePassword(value),
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              className="mb-6"
              label="Old Password"
              variant="outlined"
              size="small"
              type={hidePassword ? 'password' : 'text'}
              InputProps={{
                endAdornment: hidePassword ? (
                  <VisibilityOffOutlinedIcon
                    onClick={handleShowPassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOutlinedIcon onClick={handleShowPassword} className="cursor-pointer" />
                ),
              }}
              required
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="newPassword"
          defaultValue=""
          control={control}
          rules={{
            validate: (value) => validatePassword(value),
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              className="mb-6"
              label="New Password"
              variant="outlined"
              size="small"
              type={hidePassword ? 'password' : 'text'}
              InputProps={{
                endAdornment: hidePassword ? (
                  <VisibilityOffOutlinedIcon
                    onClick={handleShowPassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOutlinedIcon onClick={handleShowPassword} className="cursor-pointer" />
                ),
              }}
              required
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Button
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          size="large"
          fullWidth
          className="mb-4"
          onClick={handleClickSignUp}
          onKeyPress={(e) => e.key === 'Enter' && handleClickSignUp()}
        >
          Change Password
        </Button>
      </FormGroup>
    </Grid>
  );
}
