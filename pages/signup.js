import { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormGroup, CircularProgress } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setMessage } from '../store/messageSlice';
import { logout } from '../store/userSlice';
import Seo from '../components/Seo';
import {
  validateEmail,
  validateFullName,
  validateUsername,
  validatePassword,
} from '../utils/validation';
import { authService } from '../services/auth';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  //state
  const [hidePassword, setHidePassword] = useState(true);

  const { mutate: signup, isLoading } = useMutation(authService.signup, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      dispatch(setMessage({ type: 'success', message: 'Register success' }));
      router.replace('/');
    },
  });

  //formData
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleClickSignUp = () => {
    handleSubmit((values) => {
      signup(values);
    })();
  };

  useEffect(() => {
    // log out when user return route to sign up
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(logout());
      dispatch(setMessage({ type: 'success', message: 'You are logged out' }));
    }
  }, []);

  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <Seo title="Sign Up" description="Sign Up" />
      <div className="container mx-auto max-w-screen-sm items-center h-full pt-3 md:pt-20 w-3/4 md:w-1/3 2xl:w-1/5">
        <div className="flex flex-col items-center border border-gray-primary mb-4 rounded py-8">
          <div className="mt-4">
            <Image src="/assets/images/logo-auth.png" alt="" width="175" height="62" />
          </div>
          <Typography variant="subtitle1" className="mx-4 mb-4 text-gray-400" align="center">
            Sign up to see photos and videos from your friends.
          </Typography>
          <FormGroup className="w-4/5">
            <Controller
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
            <Controller
              name="fullname"
              defaultValue=""
              control={control}
              rules={{
                validate: (value) => validateFullName(value),
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  className="mb-6"
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  error={invalid}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="username"
              defaultValue=""
              control={control}
              rules={{
                validate: (value) => validateUsername(value),
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  className="mb-6"
                  label="Username"
                  variant="outlined"
                  size="small"
                  fullWidth
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
                  onKeyPress={(e) => e.key === 'Enter' && handleClickSignUp()}
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
              Sign Up
            </Button>
          </FormGroup>
          <Typography variant="caption" align="center" className="mx-4">
            By signing up, you agree to our Terms , Data Policy and Cookies Policy .
          </Typography>
        </div>
        <div className="flex justify-center items-center w-full p-4 rounded border border-gray-primary">
          <Typography className="subtitle2 text-sm">Have an account?</Typography>
          <Link href="/login">
            <Typography className="text-sm ml-1 text-blue-medium cursor-pointer">Login</Typography>
          </Link>
        </div>
      </div>
    </>
  );
}
