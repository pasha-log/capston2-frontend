import React, { useContext } from 'react';
import useLocalStorageMessaging from '../hooks/useLocalStorageMessaging';

const ContactsContext = React.createContext();

export function useContacts() {
	return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
	const [ contacts, setContacts ] = useLocalStorageMessaging('contacts', []);

	function createContact(username, fullName, profileImageURL) {
		setContacts((prevContacts) => {
			console.log(username, fullName, profileImageURL);
			return [ ...prevContacts, { username, fullName, profileImageURL } ];
		});
	}

	return <ContactsContext.Provider value={{ contacts, createContact }}>{children}</ContactsContext.Provider>;
}
