/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormGroup, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setMessage } from '../store/messageSlice';
import Seo from '../components/Seo';
import { validateEmail, validatePassword } from '../utils/validation';
import { authService } from '../services/auth';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import clsx from 'clsx';

const screenshots = [1, 2, 3, 4];

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  //formData
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const handleClickLogin = () => {
    handleSubmit(async ({ email, password }) => {
      setIsLoading(true);
      try {
        const responseLogin = await authService.login({ email, password });
        if (responseLogin.status === 'success') {
          localStorage.setItem('token', responseLogin.data.token);
          dispatch(setMessage({ type: 'success', message: 'Login success' }));
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

  //state
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  useEffect(() => {
    // redirect to home if already logged in
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setMessage({ type: 'warning', message: 'You are already logged in' }));
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex >= screenshots.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Seo title="Login" description="Login" />
      <div className="container flex mx-auto max-w-screen-md items-center h-full pt-20">
        <div className={clsx('relative', 'hidden lg:block h-[581.15px]')}>
          <img src="/assets/images/empty-screenshot.png" alt="Screenshot" draggable={false} />
          {screenshots.map((number, index) => (
            <img
              className={clsx(
                'absolute right-[60px] bottom-[16px]',
                'transition-all duration-[1.5s] ease-out',
                index === visibleIndex ? 'opacity-100 visible' : 'opacity-0 invisible'
              )}
              key={number}
              src={`/assets/images/screenshot${number}.png`}
              alt="Screenshot"
              draggable={false}
            />
          ))}
        </div>
        <div className="flex flex-col px-16 md:w-2/5 md:px-0">
          <div className="flex flex-col items-center p-4 border border-gray-primary mb-4 rounded">
            <div className="my-4">
              <Image src="/assets/images/logo-auth.png" alt="" width="175" height="62" />
            </div>
            <FormGroup className="w-full">
              <Controller
                className="mb-4 "
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
                    onKeyPress={(e) => e.key === 'Enter' && handleClickLogin()}
                    InputProps={{
                      endAdornment: hidePassword ? (
                        <VisibilityOffOutlined
                          onClick={handleShowPassword}
                          className="cursor-pointer"
                        />
                      ) : (
                        <VisibilityOutlined
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
                onClick={handleClickLogin}
              >
                Login
              </Button>
            </FormGroup>
            <Link href="/forgot-password" underline="none">
              <Typography className="text-xs text-blue-medium cursor-pointer">
                Forgot Password?
              </Typography>
            </Link>
          </div>
          <div className="flex justify-center items-center w-full p-4 rounded border border-gray-primary">
            <Typography variant="subtitle2 text-sm">Not have an account?</Typography>
            <Link href="/signup" underline="none">
              <Typography className="text-sm ml-1 text-blue-medium cursor-pointer">
                Sign up
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
