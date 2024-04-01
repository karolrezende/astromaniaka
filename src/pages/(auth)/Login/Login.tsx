import jupiter from '@/assets/design/jupiter.png'
import slogan from '@/assets/brand/slogan.svg'

import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';


import { userLogin } from '@/types/user.types';
import { userLoginSchema } from '@/schemas/user.schemas';
import { useAuth } from '@/providers/AuthProvider';
import { Link } from 'react-router-dom';
import StarsLayout from '@/layout/StarsLayout/StarsLayout';


const Login = () => {

  const { signin } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<userLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  const handleData = async (data: FieldValues) => {
    const res = await signin(data as userLogin)

    if (res === 200) {
      if (window !== undefined) {
        window.location.href = '/'
      }
    } else if (res === 400) {
      setError(
        'password', {
        type: 'manual',
        message: 'E-mail / senha incorretos'
      })
    }

  }
  return (

    <StarsLayout>
      <div className='bg-white w-full mx-6 rounded-3xl lg:w-[70vw] xl:w-[60vw] h-[70vh] flex items-center justify-between p-10 md:p-16 lg:gap-8'>
        <div className='w-full flex justify-center flex-col'>
          <img src={slogan} alt='Slogan Astromaniaka' />
          <h1 className='text-blue-700 font-bold text-md my-3 mb-5 uppercase'>Bem-vinda(o) de volta!</h1>
          <form onSubmit={handleSubmit(handleData)} className='flex flex-col my-2'>
            <Input label='E-mail' name={'email'} register={register} type='text' errors={errors.email?.message} placeholder='Digite seu email...' />
            <Input name='password' label='Senha' type='password' errors={errors.password?.message} register={register} placeholder='Digite sua senha...' />
            <span className='self-end text-sm hover:font-medium'><Link to={'/password'}>Esqueci minha senha</Link></span>
            <Button >Entrar</Button>
          </form>
          <span className=''>Ainda não possui uma conta? <span className='font-bold text-sm hover:font-extrabold'><Link to={'/register'}>Cadastre-se</Link></span></span>
        </div>
        <div className='w-full hidden lg:flex'>
          <img src={jupiter} alt="Imagem de júpiter" />
        </div>
      </div>
    </StarsLayout>

  );
}

export default Login;