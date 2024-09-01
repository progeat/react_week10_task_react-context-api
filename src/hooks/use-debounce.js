import { useState, useEffect } from 'react';

export const useDebonce = (value, delay) => {
	const [debouncedValue, setDeboncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDeboncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return { debouncedValue };
};
