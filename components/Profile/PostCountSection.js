import { Hidden, Divider, Typography, Box } from '@mui/material';

export default function PostCountSection() {
  const options = ['posts', 'followers', 'following'];
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
          {options.map((option) => (
            <Box
              key={option}
              sx={{
                display: 'grid',
                justifyItems: 'center',
              }}
            >
              <Typography className="font-semibold">12</Typography>
              <Hidden smUp>
                <Typography color="textSecondary" className="text-sm">
                  {option}
                </Typography>
              </Hidden>
            </Box>
          ))}
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
          {options.map((option) => (
            <Box
              key={option}
              sx={{
                display: 'grid',
                gridGap: 5,
                gridAutoFlow: 'column',
                gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)',
              }}
            >
              <Typography className="font-semibold text-sm">12</Typography>
              <Hidden xsDown>
                <Typography className="text-sm">{option}</Typography>
              </Hidden>
            </Box>
          ))}
        </Box>
      </Hidden>
    </>
  );
}
