import { ArrowPathIcon, ArrowUturnLeftIcon, HomeModernIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

function ErrorFallbackPage() {

    const error = useRouteError();
    const navigate = useNavigate();

    const refreshPageHandler = () => {
        window.location.reload()
    }

    const goToHomeDashboardHandler = () => {
        navigate('/dashboard')
    }
    
    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div className='min-h-scren bg-gray-100 flex flex-col justify-center items-center p-4'>
            <div className='bg-white shadow-xl rounded-lg p-6 w-full'>
                <h2 className='text-2xl font-semibold text-red-600 mb-4'>
                    Oops! Something went wrong.
                </h2>
                <p className='text-gray-600 mb-4'>
                    {error?.message || "Unknown error occurred. Please try again later."}
                </p>
                {error?.stack || (
                    <div className='bg-gray-100 p-4 rounded-md mb-6'>
                        <pre className='text-sm text-gray-800 whitespace-pre-wrap'>
                            {error?.stack}
                        </pre>
                    </div>
                )}
                <div className='flex flex-col space-y-3'>
                    <button type='button' onClick={refreshPageHandler} className='flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
                        <ArrowPathIcon className='w-5 h-5 mr-2' />
                        Refresh Page
                    </button>
                    <button type='button' onClick={goToHomeDashboardHandler} className='flex items-center justify-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'>
                        <HomeModernIcon className='w-5 h-5 mr-2' />
                        Go to Home
                    </button>
                    <button type='button' onClick={goBackHandler} className='flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'>
                        <ArrowUturnLeftIcon className='w-5 h-5 mr-2' />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorFallbackPage