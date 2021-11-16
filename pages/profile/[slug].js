import Layout from '../../components/Settings/Layout';
import router from 'next/router';
export default function SettingsProfile() {
  return <Layout url={router.asPath} />;
}
