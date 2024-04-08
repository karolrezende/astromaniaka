/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageOff, X } from "lucide-react";
import { useRef, useState } from "react";

const TypePic = ({ handleOpenPic }: { handleOpenPic: () => void }) => {
  //carregar a imagem
  const imageRef = useRef(null);
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleImageClick = () => {
    if (!imageRef.current) return;
    (imageRef.current as any).click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = event.target.files[0];
    setImage(image);
  };

  const handleRemoveImage = () => {
    setImage(undefined);
    if (imageRef.current) {
      (imageRef.current as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="border border-slate-500 rounded-lg">
      <div className="m-2 items-center flex justify-center">
        <div className="flex items-center flex-col w-full">
          <X className="self-end m-3 bg-slate-200/70 rounded-full text-slate-500 cursor-pointer hover:bg-slate-300/80"  onClick={()=> handleOpenPic()}/>
          <div className="my-2">
            {image ? (
              <div>
                <X
                  className="relative top-8 left-24 md:top-8 md:left-56 bg-white/50 text-black rounded-full cursor-pointer hover:bg-slate-300/80"
                  onClick={() => handleRemoveImage()}
                />
                <img
                  src={URL.createObjectURL(image)}
                  alt="Imagem de perfil"
                  className="w-32 h-32 md:w-64 md:h-64 rounded-lg"
                />
              </div>
            ) : (
              <div className="border-2 flex items-center justify-center border-slate-400 rounded-lg w-24 h-24 md:w-64 md:h-64 ">
                <ImageOff size={44} className="text-slate-400" />
              </div>
            )}
          </div>

          <label
            htmlFor="file-input"
            className="text-center  bg-slate-300 p-2 font-medium rounded-lg text-slate-700 cursor-pointer "
          >
            Selecione uma foto
            <input
              id="file-input"
              className="hidden"
              ref={imageRef}
              onChange={handleChange}
              onClick={() => handleImageClick()}
              accept="image/jpeg, image/jpg, image/png, image/webp"
              type="file"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default TypePic;
