import { GET_TAG } from "../../@types/types";

const Tag: React.FC<any> = ({ tag, setInputState, inputState, index }) => {
  const handleDeleteTag = () => {
    const newItems = inputState.tags.filter((v: any) => v.id !== tag.id);
    setInputState({ ...inputState, tags: newItems });
  };

  return (
    <>
      <li
        key={index}
        className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border cursor-pointer hover:border-red-500"
      >
        <button className="" type="button" onClick={handleDeleteTag}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-flex mx-1 p-1 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        {tag.name}
      </li>
    </>
  );
};

export default Tag;
