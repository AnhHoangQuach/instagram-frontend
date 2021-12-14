import { Typography, Box, ImageList, ImageListItem } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import GridPost from './GridPost';

export default function SavedPosts({ savedPosts }) {
  return savedPosts.length > 0 ? (
    <Box className="max-w-5xl xl:mx-auto mt-8">
      <ImageList
        sx={{
          width: '100%',
          height: '100%',
        }}
        variant="quilted"
        cols={3}
      >
        {savedPosts.map((item, index) => (
          <ImageListItem key={index} cols={item.image?.cols || 1} rows={item.image?.rows || 1}>
            <GridPost post={item} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  ) : (
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
