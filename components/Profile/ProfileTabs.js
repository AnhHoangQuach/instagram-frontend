import { useState } from 'react';
import { Tab, Hidden, Tabs, Divider, Typography, Box } from '@mui/material';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { makeStyles } from '@mui/styles';

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
  },
  tabLabelIcon: {
    minHeight: 'unset',
  },
}));

export default function ProfileTabs({ isOwner }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
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
              icon={<GridOnOutlinedIcon style={{ margin: '0 5px' }} />}
              label="POSTS"
              iconPosition="start"
              classes={{ root: classes.tabWrapper, labelIcon: classes.tabLabelIcon }}
            />
            {isOwner && (
              <Tab
                icon={<BookmarkBorderOutlinedIcon style={{ margin: '0 5px' }} />}
                iconPosition="start"
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
        <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
      </section>
    </>
  );
}
