import Link from "next/link";

const Form = ({ type, post, setPost, adding, handleSubmit }) => {
  return (
    <div className="w-full max-w-full flex flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md ">
        {type} and share useful prompts
      </p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-slate-700">
            Your Prompt
          </span>
          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="enter your prompt..."
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-slate-700">
            Tag{" "}
            <span className="font-normal">
              (#blogging, #webdesign, #idea, #interview)
            </span>
          </span>
          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            placeholder="enter related #tag"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/">
            Clear
          </Link>
          <button
            className="px-5 py-2 bg-violet-600 hover:bg-violet-900 rounded-full text-white font-bold"
            type="submit"
            disabled={adding}
          >
            {adding ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
