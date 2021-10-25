import { useState } from 'react';
import { Tab, Hidden, Tabs, Divider, Typography, Box } from '@mui/material';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
export default function ProfileTabs({ isOwner }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <section className="mt-6">
        <Hidden xsDown>
          <Divider />
        </Hidden>
        <Hidden xsDown>
          <Tabs value={value} onChange={(_, value) => setValue(value)} centered>
            <Tab icon={<GridOnOutlinedIcon />} label="POSTS" />
            {isOwner && <Tab icon={<BookmarkBorderOutlinedIcon />} label="SAVED" />}
          </Tabs>
        </Hidden>
      </section>
    </>
  );
}
