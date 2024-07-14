'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'
// import { useRouter } from 'next/router';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // const router = useRouter();
    const storeRef = useRef<AppStore>(makeStore())
    // useEffect(()=>{
    //     if(typeof window === 'undefined'){
    //         router.reload();
    //     }
    // },[])
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={storeRef.current.__persistor}>
            {children}
        </PersistGate>
    </Provider>
}