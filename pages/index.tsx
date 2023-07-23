import { NextPage } from "next";
import useUser from "../lib/useUser";
import { Post } from "@prisma/client";
import useSWR, { mutate, useSWRConfig } from "swr";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";
import Item from "../components/item";
import { useEffect } from "react";

interface PostForm {
  content?: string;
}
interface PostWithCount extends Post {
  _count: {
    favs: number;
  };
}

interface PostsResponse {
  ok: boolean;
  tweets: PostWithCount[];
}

interface UploadPostForm {
  content?: string;
}

interface UploadPostMuation {
  ok: boolean;
  post: Post;
}

const Index: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<PostsResponse>("/api/tweet");

  const [uploadPost, { loading }] =
    useMutation<UploadPostMuation>("/api/tweet");

  const { register, handleSubmit, reset } = useForm<PostForm>();

  const onValid = (data: UploadPostForm) => {
    if (loading) return;
    uploadPost(data);
    reset();
  };

  useEffect(() => {
    mutate("/api/tweet");
  }, [loading]);

  console.log("메인페이지");
  console.log(data);

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-slate-600 p-5">
      <h1 className="text-white font-bold">Home</h1>
      {/* 입력 */}
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("content", {
            required: true,
          })}
          name="content"
          type="text"
          placeholder="What is happening?"
          required
        />
        <button className="px-4 py-2 rounded-full bg-blue-400 text-white font-bold">
          Tweet
        </button>
      </form>
      {/* 리스트 페이지 */}
      <div>
        <div>
          {data?.tweets?.map((tweet) => (
            <Item
              id={tweet.id}
              key={tweet.id}
              name={tweet.name}
              content={tweet.content}
              hearts={tweet._count.favs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
