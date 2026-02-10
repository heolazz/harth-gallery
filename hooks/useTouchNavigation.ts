import { useEffect, useRef, RefObject } from 'react';

export const useTouchNavigation = (
    containerRef: RefObject<HTMLDivElement>,
    activeId: string | null
) => {
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStart.current || activeId) return; // Disable swipe when item active

            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;

            const deltaX = touchStart.current.x - touchX;
            const deltaY = touchStart.current.y - touchY;

            // If horizontal movement is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Prevent native back/forward swipe navigation
                if (e.cancelable) e.preventDefault();

                // Scroll the window vertically based on horizontal finger movement
                // Multiplier 1.5 for slightly faster feel
                window.scrollBy(0, deltaX * 1.5);

                // Update reference to create continuous drag effect
                touchStart.current = { x: touchX, y: touchY };
            }
        };

        const handleTouchEnd = () => {
            touchStart.current = null;
        };

        // Use non-passive listener to allow preventDefault
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [containerRef, activeId]); // Re-bind if activeId changes
};
