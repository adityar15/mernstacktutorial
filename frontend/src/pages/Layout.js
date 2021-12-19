import React from 'react'
import Header from '../components/Header'

export default function Layout({children}) {
    return (
        <div>
            <Header />
            <div className="h-[90vh] overflow-hidden flex">
                {children}
            </div>
        </div>
    )
}
