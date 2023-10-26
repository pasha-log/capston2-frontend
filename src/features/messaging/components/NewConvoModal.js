import { Modal, ModalBody, Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/NewConvoModal.css';

import { useState, useEffect } from 'react';
import InstapostApi from '../../../Api';
import SearchBar from '../../../layouts/SearchBar';
import NewConvoUserCard from './NewConvoUserCard';

import { useConversations } from '../../../context/ConversationsProvider';
import { useContacts } from '../../../context/ContactsProvider'

const NewConvoModal = () => {
	const { toggleNewConvoModal, newConvoModal, potentialNewChatUser, setPotentialNewChatUser, setUsers, users } = useContext(CurrentUserContext);
	const { createConversation } = useConversations()
	const { createContact } = useContacts()
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ noUsersFound, setNoUsersFound ] = useState(false);

	useEffect(
		() => {
			async function getAllUsers(name) {
				if (!name) setNoUsersFound(false);
				let users = await InstapostApi.findAllUsers(name);
				users.users.length !== 0 ? setUsers(users.users) : setNoUsersFound(true);
			}
			getAllUsers(searchTerm);
		},
		[ searchTerm ]
	);

	const getSearchTerm = (data) => {
		setSearchTerm(data);
	};

    const handleNewChatUser = async () => {
        toggleNewConvoModal();

		createContact(potentialNewChatUser.username, potentialNewChatUser.fullName, potentialNewChatUser.profileImageURL)
		createConversation([potentialNewChatUser.username]);
    }

	return ReactDOM.createPortal(
		<Modal className="ChatModal" isOpen={newConvoModal} toggle={toggleNewConvoModal} centered={true} size={'md'}>
			<ModalBody className="ModalBody NewChatBody">
				<div className="NewMessageHeader">
					<div style={{ width: '3rem', height: '3rem' }} />
					<h2 className="HeaderTitle">New Message</h2>
					<span
						onClick={() => toggleNewConvoModal()}
						className="material-symbols-outlined NewConvoModalClose"
						style={{ fontSize: '3rem' }}
					>
						close
					</span>
				</div>
				<div className="ConvoSearch">
					<div className="To">To:
                        { potentialNewChatUser &&
                        <div className='NewChatUser'>
                            <div className='NewChatUserInfoDiv'>
                                {potentialNewChatUser.fullName}
                            </div>
                            <span
					        	className="material-symbols-outlined NewChatUserDelete"
					        	style={{ fontSize: '2rem', cursor: 'pointer' }}
                                onClick={() => setPotentialNewChatUser(null)}
					        >
					        	close
					        </span>
                        </div>
                        }
                    </div>
					<div className="SearchConvo">
                        <SearchBar isInExplorePage={false} getSearchTerm={getSearchTerm} />
                    </div>
				</div>
				<div className="ChatSearchResults">
					{noUsersFound && <p className="NoAccountFound">No account found.</p>}
                    {!noUsersFound && users?.map((user, index) => {
						return <NewConvoUserCard user={user} key={index} />;
					})}
				</div>
				<div className="ChatButton">
					<Button disabled={!potentialNewChatUser} className="StartChatButton" onClick={() => handleNewChatUser()}>Chat</Button>
				</div>
			</ModalBody>
		</Modal>,
		document.getElementById('modal')
	);
};

export default NewConvoModal;
