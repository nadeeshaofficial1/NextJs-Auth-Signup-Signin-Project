"use client";

import { SessionProvider } from 'next-auth/react';
import { FC, ProviderProps, ReactNode } from 'react';

const Provider: FC<ProviderProps<ReactNode>> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
