import { useState, useLayoutEffect, RefObject } from 'react';

export const useGalleryDimensions = (
    horizontalTrackRef: RefObject<HTMLDivElement>,
    stickyContainerRef: RefObject<HTMLDivElement>
) => {
    const [ghostHeight, setGhostHeight] = useState(0);

    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (horizontalTrackRef.current && stickyContainerRef.current) {
                const trackWidth = horizontalTrackRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;

                // We want the scroll distance to be exactly the overflow width of the track.
                const totalHeight = trackWidth - viewportWidth;

                setGhostHeight(totalHeight > 0 ? totalHeight : 100);
            }
        };

        // Initial calcs
        updateDimensions();

        // Watch for size changes (e.g. images loading expanding the width)
        const observer = new ResizeObserver(() => {
            updateDimensions();
        });

        if (horizontalTrackRef.current) {
            observer.observe(horizontalTrackRef.current);
        }

        window.addEventListener('resize', updateDimensions);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateDimensions);
        };
    }, [horizontalTrackRef, stickyContainerRef]);

    return ghostHeight;
};
