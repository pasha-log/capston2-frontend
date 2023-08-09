import '../assets/CreateChatSection.css';
import EditSquare from '../assets/EditSquare.svg';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { useContext } from 'react';

import Conversations from './Conversations';
import { useConversations } from '../../../context/ConversationsProvider';

function CreateChatSection() {
    const { conversations } = useConversations();
    const { currentUser, toggleNewConvoModal } = useContext(CurrentUserContext);

    return (
        <div className='ChannelList'>
            <div className="ChannelListHeader">
                <h1 className='ChannelUsername'>{currentUser?.username}</h1>
                <span id="NewConvo" onClick={() => toggleNewConvoModal()}>
                    <img className="NewConvo" src={EditSquare} alt=""/>
                </span>
            </div>
            <div className='ListOfChats'>
                { conversations.length === 0 ?
                    (
                <div className='NoChats'>
                    <span style={{fontSize: '3rem'}} className="material-symbols-outlined">sms</span>
                    <h2>People who you message</h2>
                    <p>Start messaging people from the pen button above. Users will be here.</p>
                </div>
                ) : (
                <Conversations />
                )}
            </div>
        </div>
    )
}

export default CreateChatSection;