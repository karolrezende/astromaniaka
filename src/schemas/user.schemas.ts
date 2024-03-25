import { z } from "zod";

export const userLoginSchema = z.object(
    {
        email: z.string().email("Digite um e-mail válido").nonempty("Digite um e-mail"),
        password: z.string().nonempty("Digite uma senha")
    }
)
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const userRegisterSchema = z.object(
    {
        name: z.string().nonempty("Digite seu nome"),
        email: z.string().email("Digite um e-mail válido").nonempty("Digite um e-mail").regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "Digite um email válido",),
        password: z.string().nonempty("Digite uma senha").min(8, "Minímo 8 caracteres"),
        confirm_password: z.string().nonempty("Confirme sua senha"),
        picture: z
            .any()
            .nullish()
            .refine((files) => !files || (files[0] && files[0]?.size <= MAX_FILE_SIZE), `Tamanho máximo de 5MB.`)
            .refine(
                (files) => !files || (files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)),
                "Apenas imagens .jpg, .jpeg, .png and .webp"
            ),
    }
).refine((data) => data.password === data.confirm_password, {
    message: "As senhas não conferem",
    path: ['confirm_password']
})