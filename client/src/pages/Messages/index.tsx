import { Modal } from '@/components/Modal';
import Pagination from '@/components/Pagination';
import ProfileCard from '@/components/ProfileCard';
import Table from '@/components/Table';
import { BACK_END_URL } from '@/config';
import useFetch from '@/hooks/useFetch';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MessagesStyle } from '@/pages/Messages/style';
import { displayValue } from '@/utils/helpers';
import { IMessage, IMessageResult } from '@/utils/interface/message';
import { defaultModal, IModalBody } from '@/utils/interface/modal';
import { defaultPagination, IPagination } from '@/utils/interface/pagination';
import { media } from '@/utils/media/devices_media';
import { ButtonType } from '@/utils/types/buttons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Messages = () => {
  const [search, setSearch] = useState<{ submitSearch: string | null; inputSearch: string }>({
    submitSearch: null,
    inputSearch: '',
  });
  const [messageText, setMessageText] = useState<{ message: string; gif: string }>({
    message: '',
    gif: '',
  });

  const [messagePagination, setMessagePagination] = useState<IPagination>(defaultPagination);
  const [showMessageTextModal, setShowMessageTextModal] = useState<IModalBody>(defaultModal);
  const [messageDeletePath, setMessageDeletePath] = useState<string>('');
  const [showMessageDeleteModal, setShowMessageDeleteModal] = useState<IModalBody>(defaultModal);

  const isTablet = useMediaQuery(media.tablet);
  const {
    data: message,
    loading: messagesLoading,
    error: messagesError,
    execute: executeMessagesInfo,
  } = useFetch<{ success: boolean; message: string; data: IMessageResult }>(
    `${BACK_END_URL}/messages?limit=${messagePagination.limit}&offset=${messagePagination.offset}${search.submitSearch ? `&sprintCode=${search.submitSearch}` : ''}`,
    'GET',
  );

  const { loading: deleteMessageLoading, execute: executedDeleteMessage } = useFetch(
    messageDeletePath,
    'DELETE',
  );

  const headers: { name: string; colName: keyof IMessage }[] = isTablet
    ? [
        { name: 'ID', colName: 'id' },
        { name: 'Sprint Code', colName: 'sprintCode' },
      ]
    : [
        { name: 'ID', colName: 'id' },
        { name: 'User ID', colName: 'userID' },
        { name: 'Sprint Code', colName: 'sprintCode' },
        { name: 'Channel ID', colName: 'channelId' },
        { name: 'Template ID', colName: 'templateId' },
        { name: 'Created At', colName: 'createdAt' },
      ];

  const findMessages = () => {
    if (messagesError === null) {
      setSearch((prev) => ({ ...prev, submitSearch: prev.inputSearch }));
      setMessagePagination(defaultPagination);
    }
  };

  const openInfoMessageModal = (row: IMessage, show: boolean, titleText: string): void => {
    setMessageText({ message: row.message, gif: row.gif });
    setShowMessageTextModal({ showDialog: show, title: titleText });
  };

  const openDeleteMessageModal = (row: IMessage, show: boolean, titleText: string): void => {
    setMessageDeletePath(`${BACK_END_URL}/messages/${row.id}`);
    setShowMessageDeleteModal({ showDialog: show, title: titleText });
  };

  const deleteMessage = async () => {
    const { data, error } = await executedDeleteMessage();
    if (data) {
      setShowMessageDeleteModal(defaultModal);
      toast.success('Message deleted successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      setMessagePagination({ limit: defaultPagination.limit, offset: defaultPagination.offset });
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  useEffect(() => {
    executeMessagesInfo();
  }, [search.submitSearch, messagePagination]);

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
            disabled={messagesError !== null}
            data-testid="cy-message-search-btn"
            className="g-btn-submit g-font-bold14"
            onClick={() => findMessages()}
          >
            Search
          </button>
        </div>
        <div className="message-table">
          <Table<IMessage>
            data={message?.data.items}
            error={messagesError}
            header={headers}
            loader={messagesLoading}
            actions={[
              {
                testId: 'cy-info-message-btn',
                label: 'Message',
                onClick: (row) => openInfoMessageModal(row, true, 'Message'),
                btnType: ButtonType.Edit,
              },

              {
                testId: 'cy-delete-message-btn',
                label: 'Delete',
                onClick: (row) => openDeleteMessageModal(row, true, 'Delete message'),
                btnType: ButtonType.Delete,
              },
            ]}
          />

          {message?.data && message?.data.total > defaultPagination.limit && !messagesLoading && (
            <div className="messages-footer">
              <Pagination
                total={message?.data.total || 0}
                limit={messagePagination.limit}
                offset={messagePagination.offset}
                onPageChange={(newOffset) =>
                  setMessagePagination((prev) => ({ ...prev, offset: newOffset }))
                }
              />
            </div>
          )}
        </div>
        <div className="profile-card">
          <ProfileCard refreshMessages={executeMessagesInfo} />
        </div>
      </div>
      <Modal
        activeDiscardModal={false}
        loader={false}
        cancelDefaultText="Close"
        modal={showMessageTextModal}
      >
        <div>
          <p className="g-font-normal14 message-text">{displayValue(messageText.message)}</p>
          {messageText.gif && <img src={messageText.gif} alt="" className="message-gif" />}
        </div>
      </Modal>
      <Modal
        activeDiscardModal={false}
        loader={deleteMessageLoading}
        cancelDefaultText="Cancel"
        modal={showMessageDeleteModal}
        submitButton={
          <button
            disabled={deleteMessageLoading}
            data-testid="cy-confirm-delete-sprint-btn"
            className="g-btn-delete-confirm g-font-bold14"
            onClick={() => deleteMessage()}
          >
            Delete
          </button>
        }
      >
        <div>
          <p className="g-font-normal14">Are you sure wand to delete?</p>
        </div>
      </Modal>
    </MessagesStyle>
  );
};

export default Messages;
