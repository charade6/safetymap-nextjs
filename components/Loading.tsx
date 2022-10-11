/* eslint-disable @next/next/no-img-element */

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-full h-screen bg-[#999] opacity-50" />
      <img
        className="absolute z-50 w-10 translate-x-[-50%] translate-y-[-50%] top-2/4 left-2/4"
        src="/loading.gif"
        alt="img"
      />
    </>
  );
};

export default Loading;
