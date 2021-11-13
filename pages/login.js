import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import Image from 'next/image';
import Link from 'next/link';
import { TextField, Button, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useSelector } from 'react-redux';

export default function Login() {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    // redirect to home if already logged in
    if (isLoggedIn) {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {};

  const isInvalid = password === '' || emailAddress === '';
  return (
    <>
      <Seo title="Login" description="Login" />
      <div className="container flex mx-auto max-w-screen-md items-center h-full pt-20">
        <div className="hidden md:flex md:w-3/5">
          <Image src="/assets/images/iphone-with-profile.png" alt="" width="454" height="618" />
        </div>
        <div className="flex flex-col px-16 md:w-2/5 md:px-0">
          <div className="flex flex-col items-center p-4 border border-gray-primary mb-4 rounded">
            <div className="my-4">
              <Image src="/assets/images/logo-auth.png" alt="" width="175" height="62" />
            </div>
            <form onSubmit={handleLogin}>
              <TextField
                className="mb-4 "
                label="Email"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
                variant="outlined"
                size="small"
                fullWidth
                required
              />
              <TextField
                className="mb-6"
                label="Password"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                variant="outlined"
                size="small"
                fullWidth
                required
              />
              <Button
                variant="contained"
                disabled={isInvalid}
                size="large"
                fullWidth
                className="mb-4"
              >
                Login
              </Button>
            </form>
            <Divider>OR</Divider>
            <Button
              fullWidth
              startIcon={<FacebookIcon />}
              className="my-2 text-white hover:text-blue-medium bg-blue-medium"
            >
              Login with facebook
            </Button>
            <Link href="/" underline="none">
              <Typography className="text-xs text-blue-medium cursor-pointer">
                Forgot Password?
              </Typography>
            </Link>
          </div>
          <div className="flex justify-center items-center w-full p-4 rounded border border-gray-primary">
            <Typography variant="subtitle2 text-sm">Don't have an account?</Typography>
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
