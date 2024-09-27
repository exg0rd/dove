'use client';

import { getSession } from '@/app/actions/actions';
import { useState, useEffect } from 'react'

export function useSession() {
    const [session, setSession] = useState({});

    useEffect(() => {
        const loadSession = async () => {
          const session = await getSession()
          setSession(session)
        }
        loadSession()
      }, [])
    
      return session
}