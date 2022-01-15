import { useState } from 'react';
import {
  TextField,
  Button,
  FormGroup,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { validateEmail, validatePassword } from '../utils/validation';
import { authService } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setMessage } from '../store/messageSlice';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '2.4rem 3.6rem',
    width: '21.875rem',
    textAlign: 'center',
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //formData
  const { control, handleSubmit, getValues } = useForm({ mode: 'onChange' });

  const handleSendCode = async () => {
    const email = getValues('email');
    setIsLoading(true);
    try {
      const responseSendCode = await authService.getVerifyCode({ email });
      if (responseSendCode.status === 'success') {
        dispatch(setMessage({ type: 'success', message: responseSendCode.message }));
        setIsLoading(false);
      }
    } catch (error) {
      const message = error.response?.data.message;
      dispatch(setMessage({ type: 'error', message: message }));
      setIsLoading(false);
    }
  };

  const handleResetPassword = () => {
    handleSubmit(async ({ email, verifyCode, newPassword }) => {
      setIsLoading(true);
      try {
        const responseResetPassword = await authService.resetPassword({
          email,
          verifyCode,
          password: newPassword,
        });
        if (responseResetPassword.status === 'success') {
          dispatch(setMessage({ type: 'success', message: responseResetPassword.message }));
          router.replace('/login');
        }
        setIsLoading(false);
      } catch (error) {
        const message = error.response?.data.message;
        dispatch(setMessage({ type: 'error', message: message }));
        setIsLoading(false);
      }
    })();
  };
  return (
    <Box className="flex flex-col justify-center items-center h-screen">
      <Paper elevation={8} className={classes.form}>
        <div className="mb-8">
          <Typography variant="h5" className="font-semibold">
            Reset Password
          </Typography>
          <LockOutlinedIcon className="mt-4" fontSize="large" />
        </div>
        <FormGroup>
          <Controller
            className="mb-4"
            name="email"
            defaultValue=""
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
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <Controller
              className="mb-4 "
              name="verifyCode"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  label="Verify Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="XXXXXX"
                  required
                  error={invalid}
                  helperText={error?.message}
                />
              )}
            />
            <Button variant="contained" onClick={handleSendCode}>
              Send
            </Button>
          </Box>
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
                    <VisibilityOutlinedIcon
                      onClick={handleShowPassword}
                      className="cursor-pointer"
                    />
                  ),
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleResetPassword()}
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
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </FormGroup>
      </Paper>
    </Box>
  );
}
