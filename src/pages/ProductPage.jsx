import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductsApi from '../api/ProductsApi';
import { Button, Card, CardBody, CardHeader, Pagination } from '@nextui-org/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';

const columns = [
    { id: "no", label: "No.", className: "py-3.5 pl-4 pr-3 sm:pl-6" },
    { id: "name", label: "Name", className: "py-3.5 pr-3" },
    { id: "price", label: "Price", className: "py-3.5 pr-3" },
    { id: "stock", label: "Stock", className: "py-3.5 pr-3" },
    { id: "category", label: "Category", className: "py-3.5 pr-3" },
    { id: "actions", label: "Actions", className: "py-3.5 pl-3 pr-4 sm:pr-6 text-center" },
]

function ProductPage() {
    // const { product, setProduct } = useState(null);
    const isLoading = useSelector((state) => state.products.isLoading);
    const productList = useSelector((state) => state.products.items);
    const total = useSelector((state) => state.products.total);
    const error = useSelector((state) => state.products.error);

    const [page, setPage] = useState(1);

    useEffect(() => {
        ProductsApi.getProducts(page, 10);
    }, [page])

    if (isLoading) {
        return <div className='flex justify-center items-center h-full'>
            <div className='animate-spin rounded-full h-32 w-32 border border-b-2 border-primary'></div>
        </div>
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    }

    const totalPages = Math.ceil(total / 10);

    if (error) {
        return <div className='text-red-600 text-center'>{error}</div>
    }

    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                    <h1 className='text-xl font-semibold text-gray-900'>List of all products</h1>
                </div>
                <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
                    <button className='flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-light sm:ml-3 sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition duration-150 ease-in-out'>Add product</button>
                </div>
            </div>

            <div className='mt-5 flow-root'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                        <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-300'>
                                <thead className='bg-primary-dark'>
                                    <tr>
                                        {columns.map((column) => (
                                            <th key={column.id} scope='col' className={`text-left text-sm font-semibold text-white ${column.className}`}>
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 bg-white'>
                                    {productList.map((productItem, index) => {
                                        return <tr key={productItem.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                                {(page - 1) * 10 + index + 1}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                {productItem.name}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                {formatPrice(productItem.price)}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                {productItem.stock}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                {productItem.categories[0].name}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center'>
                                                <div className='flex justify-center items-center space-x-2'>
                                                    <button onClick={() => { alert('edit') }}>
                                                        <PencilIcon className="h-5 w-5 text-primary hover:text-primary-light transition duration-150 ease-in-out" />
                                                    </button>
                                                    <button onClick={() => { alert('delete') }}>
                                                        <TrashIcon className="h-5 w-5 text-red-900 hover:text-red-600 transition duration-150 ease-in-out" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4 flex items-center justify-between'>
                <div>
                    <p className='text-md text-text-gray'>
                        Showing{" "}
                        <span className='font-medium'>{(page - 1) * 10 + 1}{" "}to</span>
                        <span className='font-medium'>{Math.min(page * 10, total)}</span>{" "} of
                        <span className='font-medium'>{total}</span> results
                    </p>
                </div>
                <Pagination total={totalPages} color='primary' page={page} onChange={setPage} showControls showShadow size='md'/>
            </div>
        </div>
    )
}

export default ProductPage