import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerBody } from '../themed';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  // const [messages, setMessages] = useState<string[]>(['dupa']);
  // const [unread, setUnread] = useState<number>(0);
  //
  // useEffect(() => {
  //   console.info(setMessages);
  // }, []);

  return (
    <Container>
      <ContainerBody onClick={(): void => navigate('/chat')}>
        {/* {messages.length > 0 ? messages[messages.length - 1] : 'Game chat'} */}
        Game chat
      </ContainerBody>

      {/* Show small icon of user's unread messages */}
      {/* <Counter unread={unread} /> */}
    </Container>
  );
};

export default Chat;
