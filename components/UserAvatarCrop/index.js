import { useEffect, useMemo, useState, useRef } from 'react';
import { Box, Button, Slider, CircularProgress } from '@mui/material';
import { userService } from '../../services/user';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/messageSlice';

const UserAvatarCrop = ({ file, onSuccess, onCancel }) => {
  const inputEl = useRef();
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const image = useMemo(
    () => ({
      width: innerWidth > 536 ? 470 : innerWidth - 64,
      height: innerWidth > 536 ? 470 : innerWidth - 64,
      border: 1,
      borderRadius: 235,
    }),
    [innerWidth]
  );

  const handleClickSave = async () => {
    if (inputEl) {
      const canvasScaled = inputEl.current.getImage();
      const imageUrl = canvasScaled.toDataURL();
      const blob = await fetch(imageUrl).then((res) => res.blob());

      const formData = new FormData();
      formData.append('avatar', new File([blob], file.name));

      try {
        setIsLoading(true);
        const res = await userService.changeAvatar(formData);
        if (res.status === 'success') {
          onSuccess();
          dispatch(setMessage({ type: 'success', message: res.message }));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box className="p-6">
      <Box className="mb-6">
        <AvatarEditor ref={inputEl} image={file} scale={scale} {...image} />
        <Slider
          size="small"
          defaultValue={1}
          step={0.001}
          min={1}
          max={2}
          onChange={(_, value) => setScale(value)}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="ml-3"
          variant="outlined"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size="1rem" />}
          onClick={handleClickSave}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UserAvatarCrop;
