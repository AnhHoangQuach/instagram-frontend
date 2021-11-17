import { Grid, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Header from '../../components/Header';
import Seo from '../../components/Seo';
import ChangePassword from '../../components/Settings/ChangePassword';
import EditProfile from '../../components/Settings/EditProfile';

const useStyles = makeStyles(() => ({
  sidebarLink: {
    padding: '16px 16px 16px 30px',
    cursor: 'pointer',
  },
  active: {
    fontWeight: '600',
    borderLeft: '1px solid black',
  },
}));

export default function Layout({ url, children }) {
  const classes = useStyles();
  const isEditProfile = url === '/profile/edit';
  return (
    <>
      <Seo title="Edit Profile" description="Edit Profile" />
      <Header />

      <Grid container className="max-w-5xl mx-auto mt-8 border ">
        <Hidden smDown>
          <Grid item sm={3}>
            <Link href="/profile/edit" passHref>
              <div className={`${classes.sidebarLink} ${isEditProfile ? classes.active : ''}`}>
                Edit Profile
              </div>
            </Link>
            <Link href="/profile/password" passHref>
              <div className={`${classes.sidebarLink} ${!isEditProfile ? classes.active : ''}`}>
                Change Password
              </div>
            </Link>
          </Grid>
        </Hidden>
        <Grid item sm={9}>
          {isEditProfile ? <EditProfile /> : <ChangePassword />}
        </Grid>
      </Grid>
      {children}
    </>
  );
}
