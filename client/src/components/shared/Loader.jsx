const LayoutLoader  = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-blue-500 md:text-2xl">Loading...</p>
      </div>
    );    
}


export default LayoutLoader;



