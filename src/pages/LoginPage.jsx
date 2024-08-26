
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import reactLogo from '../assets/react.svg';
import PageTitle from '../components/PageTitle';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(8, { message: 'Password is must be at least 8 characters' }),
});


function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        login(data.username, data.password)
        navigate('/dashboard')
    }


    return (
        <div className="flex flex-1 min-h-screen items-center flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background-gray">
            <PageTitle title='Login' />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className='mx-auto h-[80px] w-auto' src={reactLogo} alt="Enigma Company Logo" />
                <h2 className='text-2xl mt-4 text-center font-bold leading-9 tracking-tight text-gray-900'>
                    Dashboard Admin Login
                </h2>
            </div>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
                <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <label htmlFor="username" className='block text-sm font-medium leading-6 text-gray-900'>Username</label>
                            <div className='mt-2'>
                                <input {...register('username')} type="text" autoComplete='username' placeholder='Username' className='block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6' />
                                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                            <div className='mt-2'>
                                <input {...register('password')} type="password" autoComplete='current-password' placeholder='password' className='block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6' />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>
                        </div>
                        <div>
                            <button className='flex w-full justify-center items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-darker' type='submit'>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;