import React from 'react';
import { TextField, Button, Divider, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from 'next/image';

export default function SignUp() {
  return (
    <div className="container mx-auto max-w-screen-md items-center h-full pt-20 w-2/3 md:w-1/6">
      <div className="flex flex-col items-center border border-gray-primary mb-4 rounded py-8">
        <div className="my-4">
          <Image src="/assets/images/logo.png" alt="" width="175" height="51" />
        </div>
        <Typography variant="subtitle1" className="mx-4 text-gray-400" align="center">
          Sign up to see photos and videos from your friends.
        </Typography>
        <Button
          startIcon={<FacebookIcon />}
          className="my-2 text-white hover:text-blue-medium bg-blue-medium"
        >
          Login with facebook
        </Button>
        <Divider>OR</Divider>
        <form className="m-4">
          <TextField
            className="mb-4"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            required
          />
          <TextField
            className="mb-6"
            label="Full Name"
            variant="outlined"
            size="small"
            fullWidth
            required
          />
          <TextField
            className="mb-6"
            label="Username"
            variant="outlined"
            size="small"
            fullWidth
            required
          />
          <TextField
            className="mb-6"
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            required
          />
          <Button variant="contained" size="large" fullWidth className="mb-4">
            Sign Up
          </Button>
        </form>
        <Typography variant="caption" align="center" className="mx-4">
          By signing up, you agree to our Terms , Data Policy and Cookies Policy .
        </Typography>
      </div>
      <div className="flex justify-center items-center w-full p-4 rounded border border-gray-primary">
        <Typography className="subtitle2">Have an account?</Typography>
        <Link href="/" underline="none" className="font-bold text-sm ml-1 text-blue-medium">
          Login
        </Link>
      </div>
    </div>
  );
}
