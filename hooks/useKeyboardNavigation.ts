import { useEffect } from 'react';

export const useKeyboardNavigation = (isDisabled: boolean = false) => {
    useEffect(() => {
        if (isDisabled) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Amount to scroll per key press. 
            // Using a fixed amount for consistent feel.
            const SCROLL_AMOUNT = 300;

            switch (e.key) {
                case 'ArrowRight':
                    window.scrollBy({ top: SCROLL_AMOUNT, behavior: 'smooth' });
                    break;
                case 'ArrowLeft':
                    window.scrollBy({ top: -SCROLL_AMOUNT, behavior: 'smooth' });
                    break;
                default:
                    return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDisabled]);
};
