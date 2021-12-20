import { Hidden, Divider, Typography, Box } from '@mui/material';

export default function PostCountSection({ postsCount, followingCount, followersCount }) {
  return (
    <>
      <Hidden smUp>
        <Divider />
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            padding: '10px 0',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              justifyItems: 'center',
            }}
          >
            <Typography className="font-semibold">{postsCount}</Typography>
            <Hidden smUp>
              <Typography color="textSecondary" className="text-sm">
                posts
              </Typography>
            </Hidden>
          </Box>
          <Box
            sx={{
              display: 'grid',
              justifyItems: 'center',
            }}
          >
            <Typography className="font-semibold">{followersCount}</Typography>
            <Hidden smUp>
              <Typography color="textSecondary" className="text-sm">
                followers
              </Typography>
            </Hidden>
          </Box>
          <Box
            sx={{
              display: 'grid',
              justifyItems: 'center',
            }}
          >
            <Typography className="font-semibold">{followingCount}</Typography>
            <Hidden smUp>
              <Typography color="textSecondary" className="text-sm">
                following
              </Typography>
            </Hidden>
          </Box>
        </Box>
        <Divider />
      </Hidden>
      <Hidden smDown>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridGap: 40,
            gridTemplateColumns:
              'minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridGap: 5,
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)',
            }}
          >
            <Typography className="font-semibold text-sm">{postsCount}</Typography>
            <Hidden xsDown>
              <Typography className="text-sm">posts</Typography>
            </Hidden>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridGap: 5,
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)',
            }}
          >
            <Typography className="font-semibold text-sm">{followersCount}</Typography>
            <Hidden xsDown>
              <Typography className="text-sm">followers</Typography>
            </Hidden>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridGap: 5,
              gridAutoFlow: 'column',
              gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)',
            }}
          >
            <Typography className="font-semibold text-sm">{followingCount}</Typography>
            <Hidden xsDown>
              <Typography className="text-sm">following</Typography>
            </Hidden>
          </Box>
        </Box>
      </Hidden>
    </>
  );
}
