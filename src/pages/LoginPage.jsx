
import reactLogo from '../assets/react.svg'
import PageTitle from '../components/PageTitle';

function LoginPage() {
    return (
        <div className="flex flex-1 min-h-screen items-center flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background-gray">
            <PageTitle />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className='mx-auto h-[80px] w-auto' src={reactLogo} alt="Enigma Company Logo" />
                <h2 className='text-2xl mt-4 text-center font-bold leading-9 tracking-tight text-gray-900'>
                    Dashboard Admin Login
                </h2>
            </div>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
                <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
                    <form className='space-y-6'>
                        <div>
                            <label htmlFor="username" className='block text-sm font-medium leading-6 text-gray-900'>Username</label>
                            <div className='mt-2'>
                                <input type="text" id='username' autoComplete='username' name='username' placeholder='Username' className='block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                            <div className='mt-2'>
                                <input type="password" id='password' name='password' autoComplete='current-password' placeholder='password' className='block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6' />
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