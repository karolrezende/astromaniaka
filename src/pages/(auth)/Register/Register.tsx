import slogan from '@/assets/brand/slogan.svg'

// import initialPic from '@/assets/design/initial-profile-pic.jpg'


import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';


import { userRegister } from '@/types/user.types';
import { userRegisterSchema } from '@/schemas/user.schemas';

import { registerUser } from '@/services/user.services';
import Popup from '@/components/common/Popup/Popup';

import { LucideIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../AuthLayout';



const Register = () => {

    const [message, setMessage] = useState('')
    const [icon, setIcon] = useState<LucideIcon>()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userRegister>({
        resolver: zodResolver(userRegisterSchema),
    });

    const handleData = async (data: FieldValues) => {
        const resData = await registerUser(data as userRegister)

        if (resData === 409) {
            setMessage('Esse e-mail já está cadastrado!')
            setIcon(X)
            return
        }

        if (resData === 400) {
            setMessage('Algo deu errado, tente novamente')
            setIcon(X)
            return;
        }

        else
            if (resData) {
                setMessage('Cadastrado com sucesso!')
                setIcon(undefined)
                setTimeout(() => {
                    if (window.location.href !== undefined) {
                        window.location.href = '/login'
                    }
                }, 1000)
            }
    }

    // const imageRef = useRef(null)
    // const [image, setImage] = useState<File | undefined>(undefined)

    // const handleImageClick = () => {
    //     if (!imageRef.current) return
    //     (imageRef.current as any).click();
    // }

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    //     if (!event.target.files) return
    //     const image = event.target.files[0]
    //     setImage(image)
    // }

    return (
        <AuthLayout>
            <div className='bg-white w-full mx-6 rounded-3xl lg:w-[70vw] xl:w-[60vw] h-[85vh] lg:h-[70vh] flex items-center justify-between p-10 md:p-16 lg:gap-8'>

                <div className='w-full flex justify-center flex-col'>
                    <img src={slogan} alt='Slogan Astromaniaka' />
                    <h1 className='text-blue-700 font-bold text-md my-3 mb-5 uppercase'>Cadastro</h1>
                    <form onSubmit={handleSubmit(handleData)} className='flex flex-col my-1'>
                        {/* <div className='flex items-center flex-col'>
                    <label htmlFor="picture" className='text-sm font-semibold text-blue-700 '>Foto</label>
                    {image ? (<Image width={60} height={60} src={URL.createObjectURL(image)} alt="Imagem de perfil" className={`max-w-16 rounded-full border cursor-pointer max-h-16`} onClick={() => handleImageClick()} />) : (<Image src={initialPic} alt="Fofinho" className={`w-16 rounded-full border cursor-pointer ${errors.picture && 'border-red-500'}`} onClick={() => handleImageClick()} />)}
                    <input type="file" id='picture' accept="image/jpeg, image/jpg, image/png, image/webp" {...register('picture')} className='hidden' ref={imageRef} onChange={handleChange} />
                </div> */}
                        <div className='flex flex-col w-full'>
                            <Input label='Nome' name={'name'} register={register} type='text' errors={errors.name?.message} placeholder='Digite seu nome...' />
                        </div>

                        <Input label='E-mail' name={'email'} register={register} type='text' errors={errors.email?.message} placeholder='Digite seu email...' />
                        <div className='lg:flex gap-2'>
                            <div className='w-full flex flex-col'>
                                <Input name='password' label='Senha' type='password' errors={errors.password?.message} register={register} placeholder='Digite sua senha...' />
                            </div>
                            <div className='w-full flex flex-col'>
                                <Input name='confirm_password' label='Confirme a senha' type='password' errors={errors.confirm_password?.message} register={register} placeholder='Digite sua senha...' />
                            </div>
                        </div>
                        <Button style='w-full'>Cadastrar</Button>
                    </form>
                    <div className='w-full text-center'>
                        <span className='text-sm'>ou</span>
                        <br />
                        <span><Link to={'/login'} className='text-blue-900 hover:font-bold'>Faça seu login.</Link></span>
                    </div>
                </div>

                <Popup message={message} setMessage={setMessage} Icon={icon} />
            </div>
        </AuthLayout>
    );
}


export default Register;