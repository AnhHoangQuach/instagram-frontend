import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram App" />
        <link rel="icon" href="/assets/images/instagram_icon.png" />
      </Head>

      <Header />
    </div>
  );
}
