// import { useEffect, useState } from 'react';

// const PREFIX = 'instapost-';

// export default function useLocalStorageMessaging(key, initialValue) {
// 	const prefixedKey = PREFIX + key;
// 	const [ value, setValue ] = useState(() => {
// 		const jsonValue = localStorage.getItem(prefixedKey);
// 		console.log(jsonValue)
// 		if (jsonValue !== null && jsonValue !== undefined) {
// 			return JSON.parse(jsonValue);
// 		} else {
// 			console.error("jsonValue is null or undefined.");
// 		}
// 		if (typeof initialValue === 'function') {
// 			return initialValue();
// 		} else {
// 			return initialValue;
// 		}
// 	});

// 	useEffect(
// 		() => {
// 			localStorage.setItem(prefixedKey, JSON.stringify(value));
// 		},
// 		[ prefixedKey, value ]
// 	);

// 	return [ value, setValue ];
// }

import { useEffect, useState } from 'react';

const PREFIX = 'instapost-';

export default function useLocalStorageMessaging(key, initialValue) {
	const prefixedKey = PREFIX + key;

	// Retrieve the initial value from localStorage
	const storedValue = localStorage.getItem(prefixedKey);

	// Set the initial value based on localStorage or provided initialValue
	let initial;
	try {
	  initial = storedValue !== null && storedValue !== undefined
	    ? JSON.parse(storedValue)
	    : typeof initialValue === 'function'
	      ? initialValue()
	      : initialValue;
	} catch (error) {
	  console.error("Error parsing storedValue:", error);
	  initial = typeof initialValue === 'function'
	    ? initialValue()
	    : initialValue;
	}

	// Initialize the state with the calculated initial value
	const [value, setValue] = useState(initial);

	// Update localStorage whenever the value changes
	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);

	return [value, setValue];
}