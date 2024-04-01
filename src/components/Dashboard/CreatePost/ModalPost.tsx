import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useData } from "@/providers/DataProvider";
import { Image, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ModalEmoji from "./TypePost/ModalEmoji";

const ModalPost = ({ handleModalPost }: { handleModalPost: () => void }) => {
    const { userData } = useData()

    const [isOpenEmoji, setIsOpenEmoji] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);



    // const [isOpenPic, setIsOpenPic] = useState(false)


    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value); // Atualiza o estado com o texto digitado
    };

    // Função para lidar com a submissão do formulário
    // const handleSubmit = () => {
    //     // Aqui você pode lidar com a submissão do formulário, por exemplo, enviar o texto e o emoji para o backend
    //     console.log("Texto:", text);
    //     console.log("Emoji:", selectedEmoji);
    //     // Aqui você pode adicionar lógica para fechar o modal de postagem após a submissão
    // };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleOpenImage = () => {

    }

    const handleOpenEmoji = (emoji?:any) => {
        setIsOpenEmoji(!isOpenEmoji)
        if(emoji){
            setSelectedEmoji(emoji)
            console.log(selectedEmoji)
        }
    }

    return (<ModalPostLayout handleModalPost={handleModalPost}>
        <div className="flex flex-col gap-6 md:w-[30rem]">
            <header className="flex items-center gap-2">
                <ProfilePic bg={'bg-slate-900 text-white'} />
                <h2 className="font-bold text-slate-900 text-xl ">{userData ? userData.name : 'Astromaniako'}</h2>
            </header>
            <section className="flex flex-col gap-3">
                <textarea
                    ref={inputRef}
                    value={text}
                    onChange={handleTextChange}
                    className="py-4 rounded-xl resize-none placeholder:text-base outline-none"
                    placeholder="Deixe suas ideias brilharem como estrelas ☆"></textarea>
                <div className="border p-1 flex justify-between gap-2 border-slate-900/60 rounded-lg items-center">
                    <p className="px-1">
                        Adicionar a publicação
                    </p>

                    <div className="flex gap-3">
                        <div
                            onClick={() => handleOpenImage()}
                            title='Imagem'
                            className="border border-slate-900/60 hover:border-slate-900/80 rounded-full p-1 text-slate-900/50 hover:text-slate-900/80  cursor-pointer">
                            <Image size={20} />
                        </div>
                        <div
                            onClick={() => handleOpenEmoji()}
                            title='Emoji'
                            className="border border-slate-900/60 hover:border-slate-900/80 rounded-full p-1 text-slate-900/50 hover:text-slate-900/80 cursor-pointer">
                            <Smile size={20} />
                        </div>
                    </div>
                </div>
                <button className="bg-slate-800/90 text-white rounded-md py-2 active:bg-slate-900">Publicar</button>
            </section>


        </div>
        {
           isOpenEmoji && <ModalEmoji handleOpenEmoji={handleOpenEmoji}/>
        }
    </ModalPostLayout>);
}

export default ModalPost;