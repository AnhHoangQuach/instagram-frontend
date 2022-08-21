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
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { validateEmail, validatePassword } from '../utils/validation';
import { authService } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setMessage } from '../store/messageSlice';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

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

  const router = useRouter();

  //formData
  const { control, handleSubmit, getValues } = useForm({ mode: 'onChange' });

  const { mutate: getVerifyCode, isLoading: isLoadingGetVerifyCode } = useMutation(
    authService.getVerifyCode,
    {
      onSuccess: (data) => {
        dispatch(setMessage({ type: 'success', message: data.message }));
      },
    }
  );

  const { mutate: resetPassword, isLoading: isLoadingResetPassword } = useMutation(
    authService.resetPassword,
    {
      onSuccess: (data) => {
        dispatch(setMessage({ type: 'success', message: data.message }));
        router.replace('/login');
      },
    }
  );

  const handleSendCode = async () => {
    const email = getValues('email');
    getVerifyCode({ email });
  };

  const handleResetPassword = () => {
    handleSubmit(async ({ email, verifyCode, newPassword }) => {
      resetPassword({ email, verifyCode, newPassword });
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
                    <VisibilityOffOutlined
                      onClick={handleShowPassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <VisibilityOutlined onClick={handleShowPassword} className="cursor-pointer" />
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
            disabled={isLoadingGetVerifyCode || isLoadingResetPassword}
            startIcon={
              isLoadingGetVerifyCode || isLoadingResetPassword ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
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
