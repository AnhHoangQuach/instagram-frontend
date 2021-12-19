import { useState, useEffect } from 'react';
import { Tab, Hidden, Tabs, Divider } from '@mui/material';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { makeStyles } from '@mui/styles';
import ProfilePosts from './ProfilePosts';
import SavedPosts from './SavedPosts';
import GlobalLoading from '../GlobalLoading';
import { postService } from '../../services/post';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/messageSlice';

const useStyles = makeStyles((theme) => ({
  tabsIndicator: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    top: 0,
    backgroundColor: '#000000 !important',
  },
  tabWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 20px',
    color: 'black !important',
  },
  tabLabelIcon: {
    minHeight: 'unset',
  },
}));

export default function ProfileTabs({ isOwner, profile }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      setLoading(true);
      const postRes = await postService.getPosts({
        page: 1,
        limit: 5,
        orderBy: 'desc',
        user: profile._id,
      });
      if (postRes.status === 'success') {
        setPosts(postRes.data.posts);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setMessage({ type: 'error', message: error.response?.data.message }));
    }
  }, []);

  return loading ? (
    <GlobalLoading />
  ) : (
    <>
      <section className="mt-6">
        <Hidden smDown>
          <Divider />
        </Hidden>
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab
              icon={<GridOnOutlinedIcon style={{ margin: '0 0.3125rem', fontSize: '0.875rem' }} />}
              label="POSTS"
              classes={{ root: classes.tabWrapper, labelIcon: classes.tabLabelIcon }}
            />
            {isOwner && (
              <Tab
                icon={
                  <BookmarkBorderOutlinedIcon
                    style={{ margin: '0 0.3125rem', fontSize: '0.875rem' }}
                  />
                }
                label="SAVED"
                classes={{ root: classes.tabWrapper, labelIcon: classes.tabLabelIcon }}
              />
            )}
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            className={classes.tabs}
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab icon={<GridOnOutlinedIcon />} />
            {isOwner && <Tab icon={<BookmarkBorderOutlinedIcon />} />}
          </Tabs>
        </Hidden>
        {value === 0 && <ProfilePosts isOwner={isOwner} posts={posts} />}
        {value === 1 && <SavedPosts savedPosts={profile.savedPosts} />}
      </section>
    </>
  );
}
