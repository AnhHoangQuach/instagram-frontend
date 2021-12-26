import { Card, CardMedia, Skeleton, Box, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { CrownIcon } from '../../utils/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 8,
  },
  cardMedia: {
    height: 100,
    zIndex: 1,
  },
  box: {
    position: 'relative',
    display: 'flex',
    padding: '8px 12px',
    marginTop: -16,
  },
  avatar: {
    width: 60,
    height: 60,
    border: '2px solid #fff',
    zIndex: 1,
  },
  position: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    position: 'absolute',
    bottom: 6,
    left: 50,
    zIndex: 2,
    backgroundColor: '#fff',
  },
  textGradient: {
    background: 'linear-gradient(#ffde00 0%, #fd5900 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

export const SellerPosition = ({ index }) => {
  const classes = useStyles();
  return (
    <Box className={classes.position}>
      <Box
        className="flex-center"
        sx={{
          position: 'absolute',
          inset: -1,
          background: `url(${
            index < 3 ? '/assets/icons/icon-frame-top3.svg' : '/assets/icons/icon-frame-top10.svg'
          })`,
        }}
      >
        <span
          className={classes.textGradient}
          style={{ fontSize: index < 9 ? 12 : 10, marginBottom: 1 }}
        >
          {index === 0 ? <CrownIcon /> : index + 1}
        </span>
      </Box>
    </Box>
  );
};

const CardUser = ({ user, index }) => {
  const classes = useStyles();
  return (
    <Link href={`/profile/${user._id}`} passHref>
      <Card variant="outlined" className="Card-Container">
        <CardMedia className={classes.cardMedia}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </CardMedia>
        <Box className={classes.box}>
          {index >= 0 && <SellerPosition index={index} />}
          <Avatar src={user.avatar} className={classes.avatar} />
          <Box
            sx={{
              flex: '1',
              overflow: 'hidden',
              paddingTop: 1.5,
              marginLeft: 1,
            }}
          >
            <Typography variant="subtitle1" className="text-ellipsis" title={user.username}>
              {user.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.fullname}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export const CardSkeleton = () => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
      <CardMedia className={classes.cardMedia}>
        <Skeleton variant="rect" width="100%" height="100%" />
      </CardMedia>
      <Box className={classes.box}>
        <Avatar className={classes.avatar} style={{ marginRight: 8, opacity: 0.75 }} />
        <Box flex={1} pt={1.5}>
          <Skeleton />
          <Skeleton />
        </Box>
      </Box>
    </Card>
  );
};

CardUser.Skeleton = CardSkeleton;

export default CardUser;
