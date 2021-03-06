import { Typography, Box } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import GridPost from './GridPost';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  postContainer: {
    [theme.breakpoints.down('sm')]: {
      gridGap: 2,
    },
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
  },
}));

export default function SavedPosts({ savedPosts }) {
  const classes = useStyles();
  return savedPosts.length > 0 ? (
    <Box sx={{ display: 'grid' }}>
      <Box className={classes.postContainer}>
        {savedPosts.map((post) => (
          <GridPost key={post._id} post={post} />
        ))}
      </Box>
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
          see what you have saved.
        </Typography>
      </Box>
    </Box>
  );
}
