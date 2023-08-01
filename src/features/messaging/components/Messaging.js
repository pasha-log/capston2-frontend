import { StreamChat } from 'stream-chat';
import {
	Chat,
	Channel,
	Window,
	ChannelHeader,
	MessageList,
	MessageInput,
	Thread,
	LoadingIndicator,
    useChatContext,
    ChannelList
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/Messaging.css';
import EditSquare from '../assets/EditSquare.svg';

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const privateKey = process.env.STREAM_PRIVATE_KEY;

export const theme = {
    messageList: {
      container: {
        backgroundColor: 'black',
      },
    },
};

const Messaging = () => {
    const { currentUser, storedValue } = useContext(CurrentUserContext);
    // console.log(storedValue.token)
    // console.log(currentUser)
    const user = {
        id: currentUser?.username,
        name: currentUser?.username,
        image: currentUser?.profileImageURL
    }
    const [client, setClient] = useState(null);
    const [channel, setChannel] = useState(null);
    
    useEffect(() => {
        async function init() {
            const chatClient = StreamChat.getInstance(apiKey, privateKey)
            // console.log(chatClient);
            // const token = chatClient.createToken(user.id);

            await chatClient.connectUser(user, chatClient.devToken(user.id))
            // await chatClient.connectUser(user, token);

            const channel = chatClient.channel('messaging', 'react-talk', {
                image: user.image,
                name: 'Testing Stream',
                members: [user.id]
            })

            await channel.watch()

            setChannel(channel)
            setClient(chatClient)
        };

        init();

        if(client) return () => {
            // setClient(null);
            client.disconnectUser()
        };
    }, [])

    if(!channel || !client) return <LoadingIndicator />

    return (
        <Chat client={client} theme="messaging dark">
            <ChannelList List={Channels} filters={{members: {$in: [user.id]}}}/>
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}

function Channels({loadedChannels}) {
    const {setActiveChannel, channel: activeChannel} = useChatContext()
    const { currentUser, toggleNewConvoModal } = useContext(CurrentUserContext);

    return (
        <div className='ChannelList'>
            <div className="ChannelListHeader">
            <h1 className='ChannelUsername'>{currentUser?.username}</h1>
            <span id="NewConvo" onClick={() => toggleNewConvoModal()}>
                <img className="NewConvo" src={EditSquare} />
            </span>
            </div>
        </div>
    )
}

export default Messaging;