import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Ignite Your Imagination with
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI Prompts</span>
      </h1>
      <p className="desc text-center">
        Discover, Create, and Collaborate with a Community of AI-Powered Ideas
      </p>
      <Feed />
    </section>
  );
};

export default Home;
