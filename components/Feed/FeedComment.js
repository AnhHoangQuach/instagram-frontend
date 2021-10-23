import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  noBorder: {
    border: 'none',
  },
}));

export default function FeedComment() {
  const [content, setContent] = useState('');
  const classes = useStyles();
  return (
    <div className="flex">
      <TextField
        fullWidth
        placeholder="Add a comment..."
        multiline
        size="small"
        onChange={(event) => setContent(event.target.value)}
        value={content}
        rowsMax={2}
        rows={1}
        InputProps={{
          classes: { notchedOutline: classes.noBorder },
        }}
      />
      <Button color="primary" className="" disabled={!content.trim()}>
        Post
      </Button>
    </div>
  );
}
