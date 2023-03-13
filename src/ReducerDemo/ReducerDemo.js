import React from 'react'
import { TestingContext, TestingProvider } from '../Context/TestingContext'
import TestingPage from './TestingPage'

const ReducerDemo = () => {
    return (
        <TestingProvider>
            <TestingPage />
        </TestingProvider>
    )
}

export default ReducerDemo
