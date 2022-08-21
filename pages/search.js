import { useState } from 'react';
import Seo from '../components/Seo';
import Header from '../components/Header';
import CardUser from '../components/Search/CardUser';
import CardTags from '../components/Search/CardTags';
import { Grid, Tabs, Tab, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { systemService } from '../services/system';
import { useQuery } from 'react-query';

export default function Search() {
  const router = useRouter();
  const { keywords } = router.query;

  const { data: dataSearch, isLoading } = useQuery(
    ['systemService.search', { keywords: keywords }],
    () => systemService.search({ keywords })
  );

  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Seo title="Search" description="Search Page" />
      <Header />
      <Grid container className="max-w-5xl mx-auto">
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
          <Tab label="Users" />
          <Tab label="Hashtags" />
        </Tabs>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        {activeTab === 0 && (
          <Grid
            container
            className="max-w-5xl mx-auto mt-8"
            columns={{ xxs: 4, xs: 8, sm: 12, md: 12 }}
          >
            {isLoading ? (
              <Grid item p={2} xxs={2} xs={4} sm={6} md={4}>
                <CardUser.Skeleton />
              </Grid>
            ) : (
              dataSearch.data.users.map((user, index) => (
                <Grid item p={2} xxs={2} xs={4} sm={6} md={4} key={index}>
                  <CardUser user={user} index={index} />
                </Grid>
              ))
            )}
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid
            container
            className="max-w-5xl mx-auto mt-8"
            columns={{ xxs: 4, xs: 8, sm: 12, md: 12 }}
          >
            {isLoading ? (
              <Grid item p={2} xxs={2} xs={4} sm={6} md={4}>
                <CardTags.Skeleton />
              </Grid>
            ) : (
              dataSearch.data.hashtags.map((tag, index) => (
                <Grid item p={2} xxs={2} xs={4} sm={6} md={4} key={index}>
                  <CardTags tag={tag} index={index} />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </>
  );
}
