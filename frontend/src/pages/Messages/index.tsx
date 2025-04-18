import { Modal } from '@/components/Modal';
import ProfileCard from '@/components/ProfileCard';
import Table from '@/components/Table';
import { BACK_END_URL } from '@/config';
import useFetch from '@/hooks/useFetch';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MessagesStyle } from '@/pages/Messages/style';
import { displayValue } from '@/utils/helpers';
import { IMessage } from '@/utils/interface/message';
import { defaultModal, IModalBody } from '@/utils/interface/modal';
import { media } from '@/utils/media/devices_media';
import { ButtonType } from '@/utils/types/buttons';
import { useEffect, useState } from 'react';

const Messages = () => {
  const [search, setSearch] = useState<{ submitSearch: string | null; inputSearch: string }>({
    submitSearch: null,
    inputSearch: '',
  });
  const [messageText, setMessageText] = useState<{ message: string; gipthy: string }>({
    message: '',
    gipthy: '',
  });

  const [showMessageTextModal, setShowMessageTextModal] = useState<IModalBody>(defaultModal);

  const isTablet = useMediaQuery(media.tablet);
  const {
    data: message,
    loading: messagesLoading,
    error: messagesError,
    execute: executeMessagesInfo,
  } = useFetch<{ success: boolean; message: string; data: IMessage[] }>(
    `${BACK_END_URL}/messages?sprintCode=${search.submitSearch ? search.submitSearch : ''}`,
    'GET',
  );

  const headers: { name: string; colName: keyof IMessage }[] = isTablet
    ? [
        { name: 'ID', colName: 'id' },
        { name: 'Sprint Code', colName: 'sprintCode' },
      ]
    : [
        { name: 'ID', colName: 'id' },
        { name: 'Username', colName: 'username' },
        { name: 'Sprint Code', colName: 'sprintCode' },
        { name: 'Channel ID', colName: 'channelId' },
        { name: 'Template ID', colName: 'templateId' },
        { name: 'Created At', colName: 'createdAt' },
      ];

  const findMessages = () => {
    setSearch((prev) => ({ ...prev, submitSearch: prev.inputSearch }));
  };

  const openInfoMessageModal = (row: IMessage, show: boolean, titleText: string): void => {
    setMessageText({ message: row.message, gipthy: row.giphy });
    setShowMessageTextModal({ showDialog: show, title: titleText });
  };

  useEffect(() => {
    executeMessagesInfo();
  }, [search.submitSearch]);

  return (
    <MessagesStyle>
      <div className="g-container page-layout">
        <div className="message-search-container">
          <input
            data-testid="cy-message-search-input"
            className="g-search g-font-normal14"
            onChange={(e) => setSearch((prev) => ({ ...prev, inputSearch: e.target.value }))}
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && findMessages()}
            placeholder="Sprint code"
          />
          <button
            disabled={messagesError !== null || search.inputSearch === search.submitSearch}
            data-testid="cy-message-search-btn"
            className="g-btn-submit g-font-bold14"
            onClick={() => findMessages()}
          >
            Search
          </button>
        </div>
        <div className="message-table">
          <Table<IMessage>
            data={message?.data}
            error={messagesError}
            header={headers}
            loader={messagesLoading}
            actions={[
              {
                testId: 'cy-info-message-btn',
                label: 'Message text',
                onClick: (row) => openInfoMessageModal(row, true, 'Message text'),
                btnType: ButtonType.Edit,
              },
            ]}
          />
        </div>
        <div className="profile-card">
          <ProfileCard refreshMessages={executeMessagesInfo} />
        </div>

        <Modal
          activeDiscardModal={false}
          loader={false}
          cancelDefaultText="Close"
          modal={showMessageTextModal}
        >
          <div>
            <p className="g-font-normal14 message-text">{displayValue(messageText.message)}</p>
            {messageText.gipthy && <img src={messageText.gipthy} alt="" className="message-gif" />}
          </div>
        </Modal>
      </div>
    </MessagesStyle>
  );
};

export default Messages;
