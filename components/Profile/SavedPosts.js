import { Typography, Box } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

export default function SavedPosts() {
  return (
    <Box sx={{ display: 'grid', justifyContent: 'center' }} pt={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 2rem',
        }}
      >
        <SaveAltOutlinedIcon fontSize="large" />
        <Typography variant="h4" className="mt-4">
          Save
        </Typography>
        <Typography align="center">
          Save photos and videos that you want to see again. No one is notified, and only you can
          see what you've saved.
        </Typography>
      </Box>
    </Box>
  );
}
