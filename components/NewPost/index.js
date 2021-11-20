import { useState, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  Button,
  TextareaAutosize,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CloseIcon from '@mui/icons-material/Close';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import FeedImage from '../Feed/FeedImage';
import { convertHashTag } from '../../utils/validation';
import Carousel from 'react-multi-carousel';
import { useDropzone } from 'react-dropzone';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function NewPost({}) {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFiles([]);
  };

  const handleChangeCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = () => {
    console.log(files, caption);
    try {
    } catch (err) {}
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: ['image/*', 'video/mp4'],
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <ControlPointIcon onClick={handleOpen} className="cursor-pointer" />
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {files.length > 0 ? (
            <>
              <Carousel responsive={responsive} showDots={true} keyBoardControl={true} itemClass>
                {files.map((item) =>
                  item.type.startsWith('image') ? (
                    <FeedImage key={item.name} img={item.preview} isCreatePost={true} />
                  ) : (
                    <video
                      src={item.preview}
                      key={item.name}
                      className="object-contain h-full mx-auto"
                      controls
                    />
                  )
                )}
              </Carousel>
            </>
          ) : (
            <Box className="p-4 w-full">
              <div className="focus:outline-none w-full" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center h-full">
                  <VideoCameraBackOutlinedIcon fontSize="large" />
                  {isDragReject ? (
                    <p className="text-red-500">Sorry, file type not supported</p>
                  ) : (
                    <p>Drag photos and videos here</p>
                  )}
                </div>
              </div>
            </Box>
          )}
        </DialogContent>
        <DialogActions className="flex justify-between">
          <TextareaAutosize
            placeholder="Add Caption"
            className="w-full outline-none"
            maxRows={2}
            onChange={handleChangeCaption}
          />
          <Button autoFocus onClick={handleSubmit}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
