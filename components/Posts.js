import Post from './Post';

const posts = [
  {
    id: '123',
    username: 'testtest',
    userImg: 'https://picsum.photos/200/300',
    img: 'https://picsum.photos/200/300',
    caption: 'testtest',
  },
  {
    id: '1234',
    username: 'testtest',
    userImg: 'https://picsum.photos/200/300',
    img: 'https://picsum.photos/200/300',
    caption: 'testtest',
  },
];

export default function Posts() {
  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </div>
  );
}
