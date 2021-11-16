import { Grid, Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { makeStyles } from '@mui/styles';

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles(() => ({
  button: {
    padding: 6,
    border: '2px solid #fff',
    backgroundColor: '#e4e6e8',
  },
  setBorder: {
    borderLeft: '1px solid #dbdbdb',
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={`max-w-5xl mx-auto ${classes.setBorder}`}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box position="relative" display="inline-flex">
        <Avatar
          src="/assets/images/45851733.png"
          style={{
            width: 100,
            height: 100,
            border: '6px solid #fff',
            backgroundColor: '#fff',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        >
          <Tooltip title="Update Avatar">
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton className={classes.button} aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Tooltip>
        </Box>
      </Box>
    </Grid>
  );
}
