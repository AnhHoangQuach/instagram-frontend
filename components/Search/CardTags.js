import { Card, CardMedia, Skeleton, Box, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { SellerPosition, CardSkeleton } from './CardUser';

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

const CardTags = ({ tag, index }) => {
  const classes = useStyles();
  return (
    <Link href={`/hashtag/${tag}`} passHref>
      <Card variant="outlined" className="Card-Container">
        <CardMedia className={classes.cardMedia}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </CardMedia>
        <Box className={classes.box}>
          {index >= 0 && <SellerPosition index={index} />}
          <Avatar className={classes.avatar}>#</Avatar>
          <Box
            sx={{
              flex: '1',
              overflow: 'hidden',
              paddingTop: 1.5,
              marginLeft: 1,
            }}
          >
            <Typography variant="subtitle1" className="text-ellipsis" title={tag}>
              {tag}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

CardTags.Skeleton = CardSkeleton;

export default CardTags;
