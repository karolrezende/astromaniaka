import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { X } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalEmoji = ({ handleOpenEmoji }: { handleOpenEmoji: (emoji?:any) => void }) => {

    return (<section className="absolute inset-x-0 bottom-0 z-30 flex justify-center p-4">
        <div className='glass-strong flex animate-fade-in flex-col p-2'>
            <button type="button" aria-label="Fechar" className='icon-btn self-end' onClick={() => handleOpenEmoji()}>
                <X size={16} />
            </button>
            <Picker data={data}
                theme="dark"
                locale_ui
                onEmojiSelect={handleOpenEmoji}
                emoji="point_up"
                showPreview={false}
                i18n={{
                    "search": "Procurar",
                    "search_no_results_1": "Oh não!",
                    "search_no_results_2": "Esse emoji não foi encontrado",
                    "pick": "Escolha um emoji...",
                    "add_custom": "Adicione um emoji customizado",
                    "categories": {
                      "activity": "Atividade",
                      "custom": "Customizado",
                      "flags": "Bandeiras",
                      "foods": "Comidas & Bebidas",
                      "frequent": "Usados recentemente",
                      "nature": "Animais & Natureza",
                      "objects": "Objetos",
                      "people": "Carinhas & Pessoas",
                      "places": "Viagens & Lugares",
                      "search": "Resultados encontrados",
                      "symbols": "Símbolos"
                    },
                    "skins": {
                      "choose": "Escolha a cor de pele padrão",
                      "1": "Padrão",
                      "2": "Clara",
                      "3": "Morena-Clara",
                      "4": "Morena",
                      "5": "Morena-Escura",
                      "6": "Escura"
                    }
                  }}
                />
        </div>
    </section>);
}

export default ModalEmoji;