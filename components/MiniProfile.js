export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 rounded-full border p-[2px]"
        src="https://picsum.photos/200/300"
        alt=""
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">Hoang Anh</h2>
        <h3 className="text-sm text-gray-400">Welcomte to Instagram</h3>
      </div>

      <button className="text-blue-400 text-sm font-semibold">Switch</button>
    </div>
  );
}
