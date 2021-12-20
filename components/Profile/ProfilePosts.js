import { Typography, Box } from '@mui/material';
import GridPost from './GridPost';
import { makeStyles } from '@mui/styles';
import LinkedCameraOutlinedIcon from '@mui/icons-material/LinkedCameraOutlined';

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

export default function ProfilePosts({ isOwner, posts }) {
  const classes = useStyles();

  if (posts.length === 0) {
    return (
      <Box pt={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 2rem',
          }}
        >
          <LinkedCameraOutlinedIcon fontSize="large" />
          <Typography variant="h6" align="center" className="mt-4">
            {isOwner ? 'Upload a Posts' : 'Once you start making new posts, they will appear here'}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid' }}>
      <Box className={classes.postContainer}>
        {posts.map((post) => (
          <GridPost key={post._id} post={post} />
        ))}
      </Box>
    </Box>
  );
}
