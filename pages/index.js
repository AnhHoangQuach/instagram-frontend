import Head from 'next/head';
import Header from '../components/Header';
import Stories from '../components/Stories';
import Posts from '../components/Posts';
import MiniProfile from '../components/MiniProfile';
import Suggestions from '../components/Suggestions';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram App" />
        <link rel="icon" href="/assets/images/instagram_icon.png" />
      </Head>

      <Header />
      <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
        <section className="col-span-2">
          <Stories />
          <Posts />
        </section>
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      </main>
    </div>
  );
}
