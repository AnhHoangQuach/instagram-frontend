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
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { validatePassword } from '../../utils/validation';
import { userService } from '../../services/user';
import { setMessage } from '../../store/messageSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [hidePassword, setHidePassword] = useState(true);

  //formData
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: changePassword, isLoading } = useMutation(userService.changePassword, {
    onSuccess: (data) => {
      dispatch(setMessage({ type: 'success', message: data.message }));
      router.replace('/');
    },
  });

  const handleChangePassword = () => {
    handleSubmit(async ({ oldPassword, newPassword }) => {
      changePassword({ oldPassword, newPassword });
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
                  <VisibilityOffOutlined onClick={handleShowPassword} className="cursor-pointer" />
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
                  <VisibilityOffOutlined onClick={handleShowPassword} className="cursor-pointer" />
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
          onClick={handleChangePassword}
          onKeyPress={(e) => e.key === 'Enter' && handleChangePassword()}
        >
          Change Password
        </Button>
      </FormGroup>
    </Grid>
  );
}
