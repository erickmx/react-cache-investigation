'use client';

import { useEffect } from "react";
import { getCachedCharacters, getCachedEpisodes } from 'common';

function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        console.log('ClientLayout');
        (async () => {
            const [characters, episodes] = await Promise.all([
                getCachedCharacters(),
                getCachedEpisodes(),
            ]);
        })()
    }, []);
    return (
        children
    )
}

export default ClientLayout;
