export default function FeedImage({ img, caption }) {
  return <img src={img} alt={caption} className="w-full object-fill h-96" />
}
