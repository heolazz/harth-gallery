import { useState, useEffect, useRef, RefObject, useCallback } from 'react';

export const useHorizontalScroll = (
    ghostContainerRef: RefObject<HTMLDivElement>,
    horizontalTrackRef: RefObject<HTMLDivElement>,
    progressBarRef: RefObject<HTMLDivElement>,
    ghostHeight: number,
    activeId: string | null,
    setActiveId: (id: string | null) => void
) => {
    const [isArtUnlocked, setIsArtUnlocked] = useState(false);

    const scrollTarget = useRef(0);
    const scrollCurrent = useRef(0);
    const requestRef = useRef<number>();
    const lastScrollY = useRef(0);

    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    };

    const syncScroll = useCallback(() => {
        lastScrollY.current = window.scrollY;
        if (ghostContainerRef.current) {
            const relative = window.scrollY - ghostContainerRef.current.offsetTop;
            const capped = Math.max(0, Math.min(relative, ghostHeight));
            scrollTarget.current = capped;
            scrollCurrent.current = capped;
        }
    }, [ghostContainerRef, ghostHeight]);

    useEffect(() => {
        const animate = () => {
            // Lerp untuk kehalusan
            scrollCurrent.current = lerp(scrollCurrent.current, scrollTarget.current, 0.08);

            if (Math.abs(scrollCurrent.current - scrollTarget.current) < 0.01) {
                scrollCurrent.current = scrollTarget.current;
            }

            // OPTIMASI: Manipulasi DOM langsung (Bypass React Re-render)
            if (horizontalTrackRef.current) {
                horizontalTrackRef.current.style.transform = `translate3d(${-scrollCurrent.current}px, 0, 0)`;
            }

            if (progressBarRef.current && ghostHeight > 0) {
                const progress = (scrollCurrent.current / ghostHeight) * 100;
                progressBarRef.current.style.width = `${progress}%`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [ghostHeight, horizontalTrackRef, progressBarRef]);

    useEffect(() => {
        const handleScroll = () => {
            if (!ghostContainerRef.current) return;

            const stickyTop = ghostContainerRef.current.offsetTop;
            const scrollY = window.scrollY;

            if (activeId) {
                const delta = Math.abs(scrollY - lastScrollY.current);
                if (delta > 50) setActiveId(null);
                return;
            }

            lastScrollY.current = scrollY;
            const relativeScroll = scrollY - stickyTop;

            // Update target animation
            scrollTarget.current = Math.max(0, Math.min(relativeScroll, ghostHeight));

            // Binary state change (Hanya re-render saat perlu saja)
            if (relativeScroll > ghostHeight - 50) {
                if (!isArtUnlocked) setIsArtUnlocked(true);
            } else {
                if (isArtUnlocked) setIsArtUnlocked(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ghostHeight, activeId, ghostContainerRef, setActiveId, isArtUnlocked]);

    return { isArtUnlocked, syncScroll };
};
