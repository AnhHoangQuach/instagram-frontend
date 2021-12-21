import Link from 'next/link';
import { Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  avatar: {
    width: ({ avatarSize = 44 }) => avatarSize,
    height: ({ avatarSize = 44 }) => avatarSize,
    cursor: 'pointer',
  },
  typography: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'min-content auto',
    gridGap: 12,
    alignItems: 'center',
    width: '100%',
  },
  nameWrapper: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

export default function UserCard({ user, avatarSize = 44 }) {
  const classes = useStyles({ avatarSize });

  return (
    <div className={classes.wrapper}>
      <Link href={`/profile/${user?._id}`} passHref>
        <Avatar src={user?.avatar} alt="User avatar" className={classes.avatar} />
      </Link>
      <div className={classes.nameWrapper}>
        <Typography variant="subtitle2" className={classes.typography}>
          {user?.username}
        </Typography>
        <Typography color="textSecondary" variant="body2" className={classes.typography}>
          {user?.fullname}
        </Typography>
      </div>
    </div>
  );
}
