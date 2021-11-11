import { useState } from 'react';
import { TextField, Button, Divider, Typography, FormGroup, CircularProgress } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';
import { authService } from '../services/auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  validateEmail,
  validateFullName,
  validateUsername,
  validatePassword,
} from '../utils/validation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getMe } from '../store/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default function SignUp() {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickSignUp = () => {
    handleSubmit(({ email, fullname, username, password }) => {
      setIsLoading(true);
      authService
        .signup({ email, fullname, username, password })
        .then(async (result) => {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log('Logged in user: ', currentUser);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  };

  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <Seo title="Sign Up" description="Sign Up" />
      <div className="container mx-auto max-w-screen-md items-center h-full pt-3 md:pt-20 w-2/3 md:w-1/5">
        <div className="flex flex-col items-center border border-gray-primary mb-4 rounded py-8">
          <div className="my-4">
            <Image src="/assets/images/logo-auth.png" alt="" width="175" height="62" />
          </div>
          <Typography variant="subtitle1" className="mx-4 text-gray-400" align="center">
            Sign up to see photos and videos from your friends.
          </Typography>
          <Button
            startIcon={<FacebookIcon />}
            className="my-2 text-white text-xs md:text-sm hover:text-blue-medium bg-blue-medium"
            href={authService.loginByFacebook}
          >
            Signup with facebook
          </Button>
          <Divider>OR</Divider>
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
            <Typography className="text-sm ml-1 font-bold text-blue-medium cursor-pointer">
              Login
            </Typography>
          </Link>
        </div>
      </div>
    </>
  );
}
