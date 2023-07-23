import Link from "next/link";

interface ItemProps {
  id: number;
  name: string;
  content: string;
  hearts: number;
}

export default function Item({ name, content, hearts, id }: ItemProps) {
  return (
    <Link href={`/tweet/${id}`}>
      <a className="border-[1px] border-slate-400 flex cursor-pointer justify-between mx-5 mt-5 px-5 py-2">
        <div className="flex space-x-4">
          <div className="flex flex-col pt-2">
            <h3 className="text-sm text-white font-extrabold">{name}</h3>
            <br />
            <p className="text-white">{content}</p>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <div className="flex items-center space-x-0.5 text-sm  text-gray-600">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span className="text-white">{hearts}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
