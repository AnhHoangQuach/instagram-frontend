import Head from 'next/head';

export default function Seo({ title, description, image, url }) {
  const titleText = title ? `${title} · Instagram` : 'Instagram';
  const descriptionText = description ? description : 'Instagram';
  const urlPreview = url ? url : '';
  const previewImage = image ? image : '';
  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content={descriptionText} />
      <meta property="og:image" content={previewImage} key="ogimage" />
      <meta property="og:url" content={urlPreview} key="ogurl" />
      <link rel="icon" href="/assets/images/instagram_icon.png" />
    </Head>
  );
}
