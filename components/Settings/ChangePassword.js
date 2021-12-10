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
import { Controller, useForm } from 'react-hook-form';

export default function ChangePassword() {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  //formData
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleClickSignUp = () => {
    handleSubmit(async ({ email, fullname, username, password }) => {
      setIsLoading(true);
      try {
        const responseSignup = await authService.signup({ email, fullname, username, password });
        if (responseSignup.status === 'success') {
          localStorage.setItem('token', responseSignup.data.token);
          dispatch(setMessage({ type: 'success', message: 'Register success' }));
          setIsLoading(false);
          router.replace('/');
        }
      } catch (error) {
        const message = error.response?.data.message;
        dispatch(setMessage({ type: 'error', message: message }));
        setIsLoading(false);
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
          src="/assets/images/45851733.png"
          style={{
            width: 50,
            height: 50,
            border: '2px solid #e4e6e8',
            marginRight: '1rem',
            backgroundColor: '#fff',
          }}
        />
        <Typography variant="h6">anhhoang362k</Typography>
      </Box>
      <FormGroup className="w-4/5 md:w-2/5 mt-4">
        <Controller
          name="old_password"
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
          name="new_password"
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
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            validate: (value) => validatePassword(value),
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              className="mb-6"
              label="Password"
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
        >
          Change Password
        </Button>
      </FormGroup>
    </Grid>
  );
}
