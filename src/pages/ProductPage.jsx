import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductsApi from '../api/ProductsApi';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';

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
            <div className='animate-spin rounded full h-32 w-32 border border-b-2 border-primary'></div>
        </div>
    }

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
                    <button className='block rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark sm:ml-3 sm:w-auto'>Add product</button>
                </div>
            </div>
        </div>
        // <div>
        //     <div className='grid grid-cols-3'>
        //         {items.map((item) => (
        //             <Card key={item.id} className='py-4 shadow-lg m-4'>
        //                 <CardBody className='px-4 flex-col items-start'>
        //                     <h4 className='text-lg font-bold'>{item.name}</h4>
        //                     <p className='text-tiny text-text-gray'>Stock: {item.stock}</p>
        //                     <p className='text-sm'>{item.description}</p>
        //                     <p className='text-sm font-bold'>${item.price}</p>
        //                 </CardBody>
        //             </Card>
        //         ))}
        //     </div>
        //     <div className='flex flex-row'>
        //         <Button onPress={() => setPage(page - 1)} color="primary" className='m-4' disabled={page === 1}>Prev</Button><Button onPress={() => setPage(page + 1)} color="primary" className='m-4' disabled={page === 3}>Next</Button>
        //     </div>
        // </div>
    )
}

export default ProductPage