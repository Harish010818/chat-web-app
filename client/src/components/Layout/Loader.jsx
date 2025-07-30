const LayoutLoader  = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
        <p className="text-xl md:text-4xl font-bold">Loading...</p>
      </div>
    );    
}


export default LayoutLoader ;



