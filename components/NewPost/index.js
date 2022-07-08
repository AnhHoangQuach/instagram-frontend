import { useState, useCallback, useEffect } from 'react';
import { Box, Button, IconButton, CircularProgress, Select, MenuItem } from '@mui/material';
import { AddIcon } from '../../utils/icons';
import { VideoCameraBackOutlined, ArrowBackOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import FeedImage from '../Feed/FeedImage';
import ModalCommon from '../ModalCommon';
import defaultStyle from './defaultStyle';
import { postService } from '../../services/post';
import { useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { useDropzone } from 'react-dropzone';
import { Mention, MentionsInput } from 'react-mentions';
import { setMessage } from '../../store/messageSlice';
import { getHashTag } from '../../utils/helpers';

//fake data
const users = [
  { display: 'ronaldo', id: 'ronaldo@gmail.com' },
  { display: 'messi', id: 'messi@gmail.com' },
];

export default function NewPost({}) {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('files');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFiles([]);
    setStep('files');
  };

  const [typePost, setTypePost] = useState('public');

  const handleTypeChange = (event) => {
    setTypePost(event.target.value);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append('pictures', file);
    }

    const hashtags = getHashTag(caption);

    if (hashtags) {
      for (const tag of hashtags) {
        formData.append('hashtags', tag);
      }
    }

    formData.append('caption', caption);
    formData.append('type', typePost);
    try {
      setLoading(true);
      const postRes = await postService.createPost(formData);
      if (postRes.status === 'success') {
        dispatch(setMessage({ type: 'success', message: 'Created Post successfully' }));
        router.push('/');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  };

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

  const renderSections = () => {
    switch (step) {
      case 'caption':
        return (
          <ModalCommon
            title="Caption"
            actions={
              <div className="flex w-full justify-between">
                <IconButton aria-label="close" onClick={() => setStep('filters')}>
                  <ArrowBackOutlined />
                </IconButton>
                <Button autoFocus disabled={loading} onClick={handleCreatePost}>
                  {loading && <CircularProgress size="1rem" className="m-1" />}
                  Share
                </Button>
              </div>
            }
            open={open}
            onClose={handleClose}
          >
            <div className="flex justify-between">
              <MentionsInput
                className="mentions w-4/5"
                value={caption}
                spellCheck="false"
                placeholder="Describe everything about this post here"
                a11ySuggestionsListLabel={'Suggested mentions'}
                onChange={(event) => setCaption(event.target.value)}
                style={defaultStyle}
              >
                <Mention
                  markup="@[__display__,__id__]"
                  trigger="@"
                  data={users}
                  appendSpaceOnAdd={true}
                  style={{
                    backgroundColor: '#daf4fa',
                  }}
                />
              </MentionsInput>
              {files.length > 0 && (
                <Carousel
                  className="w-1/5"
                  responsive={responsive}
                  showDots={true}
                  keyBoardControl={true}
                  itemClass
                >
                  {files.map((item) =>
                    item.type.startsWith('image') ? (
                      <FeedImage key={item.name} img={item.preview} isCreatePost={true} />
                    ) : (
                      <video src={item.preview} key={item.name} controls />
                    )
                  )}
                </Carousel>
              )}
            </div>
          </ModalCommon>
        );
      case 'filters':
        return (
          <ModalCommon
            title="Filters"
            actions={
              <div className="flex w-full justify-between">
                <IconButton aria-label="close" onClick={() => setStep('files')}>
                  <VideoCameraBackOutlined />
                </IconButton>
                <Button autoFocus onClick={() => setStep('caption')}>
                  Next
                </Button>
              </div>
            }
            open={open}
            onClose={handleClose}
          >
            <Select value={typePost} onChange={handleTypeChange}>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </ModalCommon>
        );
    }
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

  return (
    <>
      <AddIcon onClick={handleOpen} className="cursor-pointer" />
      {renderSections()}
      {step === 'files' && (
        <ModalCommon
          title="Create new post"
          actions={
            <Button autoFocus onClick={() => setStep('filters')}>
              Next
            </Button>
          }
          open={open}
          onClose={handleClose}
        >
          {files.length > 0 ? (
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
          ) : (
            <Box className="p-4 w-full">
              <div className="focus:outline-none w-full" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center h-full">
                  <VideoCameraBackOutlined fontSize="large" />
                  {isDragReject ? (
                    <p className="text-red-500">Sorry, file type not supported</p>
                  ) : (
                    <p>Drag photos and videos here</p>
                  )}
                </div>
              </div>
            </Box>
          )}
        </ModalCommon>
      )}
    </>
  );
}
