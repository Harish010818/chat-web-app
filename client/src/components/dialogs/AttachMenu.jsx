
import { ImagePlus, Mic } from 'lucide-react';

const AttachMenu = () => {
      return (
            <div
                className=" bg-white border z-10 pb-16 pt-5 border-none shadow-gray-300 shadow rounded-lg"
                >
                  <div
                    className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4 cursor-pointer"
                  >
                  <Mic size={23} />
                    <button>Audio</button>
                  </div>
                  <div
                    className="pl-3 pr-20 py-3 text-black hover:bg-gray-100 flex flex-row gap-4 cursor-pointer"
                  >
                    <ImagePlus size={21} />
                    <button>Image</button>
                  </div>
                </div>             
       )
}

export default AttachMenu;

