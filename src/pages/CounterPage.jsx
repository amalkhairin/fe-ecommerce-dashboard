import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../redux/counter/counterSlice'
import { Button, Card, CardBody, CardHeader, Slider } from '@nextui-org/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CounterPage() {
    const [incementAmount, setIncrementAmount] = useState(0)
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className='flex items-center justify-center h-screen bg-background-gray'>
            <Card className='w-96 shadow-lg' radius='md'>
                <CardHeader className='flex justify-center'>
                    <h2 className='text-2xl font-bold text-primary'>Counter App</h2>
                </CardHeader>
                <CardBody className='flex justify-center flex-col items-center space-y-6'>
                    <h3 className='text-4xl font-bold text-primary-dark'>{count}</h3>
                    <div className='flex space-x-4'>
                        <Button color="danger" variant="shadow" onClick={() => dispatch(decrement())} startContent={<MinusIcon className='h-6 w-6' />}
                        >Decrement</Button>
                        <Button color="success" variant="shadow" onClick={() => dispatch(increment())} startContent={<PlusIcon className='h-6 w-6' />}>Increment</Button>
                    </div>
                    <div className='w-full space-y-2'>
                        <Slider size='sm' step={1} color='primary' label='amount' showSteps={true} maxValue={10} className='max-w-md ' onChange={(value) => setIncrementAmount(value)} />
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-primary-dark'>amount: {incementAmount}</span>
                            <Button color='primary' variant='shadow' onPress={() => {
                                dispatch(incrementByAmount(Number(incementAmount)))
                            }} size='sm' >Add Amount</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}