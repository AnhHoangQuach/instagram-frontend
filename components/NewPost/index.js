import { Modal, Box, Typography, Divider } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useCallback } from 'react';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import { useDropzone } from 'react-dropzone';
export default function NewPost({}) {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: ['image/*', 'video/*'],
  });
  return (
    <>
      <ControlPointIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        title="Create Post"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            backgroundColor: '#fff',
            borderRadius: '1rem',
            width: !largeScreen ? '90%' : '40%',
            textAlign: 'center',
            border: 'none',
            minHeight: '60%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" className="py-1 font-semibold">
            Create new post
          </Typography>
          <Divider />
          <Box className="p-4 w-full">
            <div className="focus:outline-none w-full" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center h-full">
                {isDragReject ? (
                  <p>Sorry, file type not supported</p>
                ) : (
                  <>
                    <VideoCameraBackOutlinedIcon fontSize="large" />
                    <p>Drag photos and videos here</p>
                  </>
                )}
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
