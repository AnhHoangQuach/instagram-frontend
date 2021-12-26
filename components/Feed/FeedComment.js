import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Controller, useForm } from 'react-hook-form';
import { commentService } from '../../services/comment';
import { setMessage } from '../../store/messageSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  noBorder: {
    border: 'none',
  },
}));

export default function FeedComment({ postId, parentCallback }) {
  const classes = useStyles();

  // handle event
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const [commentLoading, setCommentLoading] = useState(false);
  const handleCreateComment = (e) => {
    handleSubmit(async ({ content }) => {
      try {
        setCommentLoading(true);
        const commentRes = await commentService.createComment({ postId, content });
        if (commentRes.status === 'success') {
          dispatch(setMessage({ type: 'success', message: commentRes.message }));
        }
        setCommentLoading(false);
      } catch (error) {
        setCommentLoading(false);
        dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
      }
      reset({ content: '' });
    })(e);
  };

  return (
    <div className="flex">
      <Controller
        name="content"
        defaultValue=""
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="Add a comment..."
            multiline
            size="small"
            rows={1}
            InputProps={{
              classes: { notchedOutline: classes.noBorder },
            }}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
      <Button
        color="primary"
        onClick={() => {
          handleCreateComment();
          parentCallback(true);
        }}
        disabled={commentLoading}
      >
        Post
      </Button>
    </div>
  );
}
