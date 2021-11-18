export default function FeedImage({ img, caption, isCreatePost = false }) {
  return (
    <img
      src={img}
      alt={caption}
      className={`object-contain mx-auto ${isCreatePost ? '' : 'w-full'}`}
    />
  );
}
