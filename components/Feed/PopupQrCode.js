import { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import QRCode from 'qrcode.react';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

const PopupQrCode = ({ onClose, postId }) => {
  const classes = useStyles();
  const url = `${window.location.href}post/${postId}`;

  const [isCopy, setIsCopy] = useState(false);

  const handleClickCopy = () => {
    try {
      navigator.clipboard.writeText(url);
    } catch {}
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  return (
    <div className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5">Share this page</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary" className="whitespace-pre-line mb-12">
        Scan with your phone’s camera or copy link below
      </Typography>
      <Box className="flex-center mb-16">
        <QRCode value={url} size={240} />
      </Box>
      <Box className={classes.boxLink}>
        <Tooltip
          title={isCopy ? 'Copied!' : 'Copy'}
          placement="top"
          onOpen={() => setIsCopy(false)}
          onClick={handleClickCopy}
        >
          <Typography variant="body2" className="text-ellipsis cursor-pointer">
            {url}
          </Typography>
        </Tooltip>
      </Box>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  boxLink: {
    padding: 8,
    backgroundColor: '#f6f6f6',
    borderRadius: 4,
  },
}));

export default PopupQrCode;
