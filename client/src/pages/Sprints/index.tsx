import { Modal } from '@/components/Modal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { BACK_END_URL } from '@/config';
import useFetch from '@/hooks/useFetch';
import { SprintsStyle } from '@/pages/Sprints/style';
import { defaultModal, IModalBody } from '@/utils/interface/modal';
import { defaultPagination, IPagination } from '@/utils/interface/pagination';
import {
  defaultSendSprintValues,
  ISprint,
  ISprintBody,
  ISprintResult,
} from '@/utils/interface/sprint';
import { ButtonType } from '@/utils/types/buttons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Sprints = () => {
  const [showAddSprintModal, setShowAddSprintModal] = useState<IModalBody>(defaultModal);
  const [showDeleteSprintModal, setShowDeleteSprintModal] = useState<IModalBody>(defaultModal);
  const [showEditSprintModal, setShowEditSprintModal] = useState<IModalBody>(defaultModal);

  const [sprintsPagination, setSprintsPagination] = useState<IPagination>(defaultPagination);

  const [sendValues, setSendValues] = useState<ISprintBody>(defaultSendSprintValues);
  const [lastFailedValues, setLastFailedValues] = useState<ISprintBody>(defaultSendSprintValues);

  const [sprintDeletePath, setSprintDeletePath] = useState<string>('');
  const [sprintPatchPath, setSprintPatchPath] = useState<string>('');

  const {
    data: sprints,
    loading: sprintsLoading,
    error: sprintsError,
    execute: executeSprintsInfo,
  } = useFetch<{ success: boolean; message: string; data: ISprintResult }>(
    `${BACK_END_URL}/sprints?limit=${sprintsPagination.limit}&offset=${sprintsPagination.offset}`,
    'GET',
  );

  const { loading: newSprintLoading, execute: executeCreateNewSprint } = useFetch(
    `${BACK_END_URL}/sprints`,
    'POST',
  );

  const { loading: editSprintLoading, execute: executedUpdateSprint } = useFetch(
    sprintPatchPath,
    'PATCH',
  );

  const { loading: deleteSprintLoading, execute: executedDeleteSprint } = useFetch(
    sprintDeletePath,
    'DELETE',
  );

  const createNewSprint = async () => {
    const sprintBody: ISprintBody = {
      code: sendValues.code,
      title: sendValues.title,
    };
    const { data, error } = await executeCreateNewSprint(sprintBody);
    if (data) {
      setShowAddSprintModal(defaultModal);
      toast.success('Sprint created successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      executeSprintsInfo();
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const updateSprint = async () => {
    const sprintBody: ISprintBody = {
      code: sendValues.code,
      title: sendValues.title,
    };

    const { data, error } = await executedUpdateSprint(sprintBody);
    if (data) {
      setShowEditSprintModal(defaultModal);
      toast.success('Sprint updated successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      executeSprintsInfo();
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const deleteSprint = async () => {
    const { data, error } = await executedDeleteSprint();
    if (data) {
      setShowDeleteSprintModal(defaultModal);
      toast.success('Sprint deleted successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      setSprintsPagination(defaultPagination);
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const openAddSprintModal = (show: boolean, titleText: string): void => {
    setSendValues(defaultSendSprintValues);
    setShowAddSprintModal({ showDialog: show, title: titleText });
  };

  const openEditSprintModal = (row: ISprint, show: boolean, titleText: string): void => {
    setSprintPatchPath(`${BACK_END_URL}/sprints/${row.id}`);
    setSendValues(row);
    setLastFailedValues(row);
    setShowEditSprintModal({ showDialog: show, title: titleText });
  };

  const openDeleteSprintModal = (row: ISprint, show: boolean, titleText: string): void => {
    setSprintDeletePath(`${BACK_END_URL}/sprints/${row.id}`);
    setShowDeleteSprintModal({ showDialog: show, title: titleText });
  };

  useEffect(() => {
    executeSprintsInfo();
  }, [sprintsPagination]);

  return (
    <SprintsStyle>
      <div className="g-container">
        <Table<ISprint>
          data={sprints?.data.items}
          loader={sprintsLoading}
          error={sprintsError}
          header={[
            { name: 'ID', colName: 'id' },
            { name: 'Title', colName: 'title' },
            { name: 'Code', colName: 'code' },
          ]}
          actions={[
            {
              testId: 'cy-update-sprint-btn',
              label: 'Edit',
              onClick: (row) => openEditSprintModal(row, true, 'Edit Sprint'),
              btnType: ButtonType.Edit,
            },
            {
              testId: 'cy-delete-sprint-btn',
              label: 'Delete',
              onClick: (row) => openDeleteSprintModal(row, true, 'Delete Sprint'),
              btnType: ButtonType.Delete,
            },
          ]}
        />
        {!sprintsLoading && (
          <div className="sprints-footer">
            <Pagination
              total={sprints?.data.total || 0}
              limit={sprintsPagination.limit}
              offset={sprintsPagination.offset}
              onPageChange={(newOffset) =>
                setSprintsPagination((prev) => ({ ...prev, offset: newOffset }))
              }
            />
            <div className="btn-add-position">
              <button
                disabled={sprintsError !== null}
                data-testid="cy-add-sprint-btn"
                className="g-btn-submit g-font-bold14"
                onClick={() => openAddSprintModal(true, 'Create New Sprint')}
              >
                Add Sprint
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        activeDiscardModal={
          sendValues.code.trim().length !== 0 || sendValues.title.trim().length !== 0
        }
        loader={newSprintLoading}
        cancelDefaultText="Cancel"
        modal={showAddSprintModal}
        submitButton={
          <button
            disabled={sendValues.code.trim().length === 0 || sendValues.title.trim().length === 0}
            className="g-btn-submit g-font-bold14"
            onClick={() => createNewSprint()}
            data-testid="cy-confirm-create-sprint-btn"
          >
            Create
          </button>
        }
      >
        <div className="sprint-form g-left">
          <div>
            <label htmlFor="code" className="sprint-form-label g-font-normal12">
              Sprint Code*
              <span className="g-font-normal12">{sendValues.code.length}/20</span>
            </label>
            <input
              id="code"
              data-testid="cy-new-sprintCode-field"
              value={sendValues.code}
              className="g-input g-font-normal14"
              type="text"
              onChange={(e) => setSendValues((prev) => ({ ...prev, code: e.target.value }))}
              placeholder="Type here"
              maxLength={20}
            />
          </div>
          <div>
            <label htmlFor="title" className="sprint-form-label g-font-normal12">
              Sprint Title*
              <span className="g-font-normal12">{sendValues.title.length}/130</span>
            </label>
            <input
              id="title"
              data-testid="cy-new-sprintTitle-field"
              value={sendValues.title}
              className="g-input g-font-normal14"
              type="text"
              onChange={(e) => setSendValues((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Type here"
              maxLength={130}
            />
          </div>
        </div>
      </Modal>

      <Modal
        activeDiscardModal={
          sendValues.code.trim() !== lastFailedValues.code.trim() ||
          sendValues.title.trim() !== lastFailedValues.title.trim()
        }
        loader={editSprintLoading}
        cancelDefaultText="Cancel"
        modal={showEditSprintModal}
        submitButton={
          <button
            disabled={sendValues.code.trim().length === 0 || sendValues.title.trim().length === 0}
            className="g-btn-submit g-font-bold14"
            data-testid="cy-confirm-update-sprint-btn"
            onClick={() => updateSprint()}
          >
            Update
          </button>
        }
      >
        <div className="sprint-form g-left">
          <div>
            <label htmlFor="code" className="sprint-form-label g-font-normal12">
              Sprint Code*
              <span className="g-font-normal12">{sendValues.code.length}/20</span>
            </label>
            <input
              id="code"
              data-testid="cy-update-sprintCode-field"
              value={sendValues.code}
              className="g-input g-font-normal14"
              type="text"
              onChange={(e) => setSendValues((prev) => ({ ...prev, code: e.target.value }))}
              placeholder="Type here"
              maxLength={20}
            />
          </div>
          <div>
            <label htmlFor="title" className="sprint-form-label g-font-normal12">
              Sprint Title*
              <span className="g-font-normal12">{sendValues.title.length}/130</span>
            </label>
            <input
              id="title"
              data-testid="cy-update-sprintTitle-field"
              value={sendValues.title}
              className="g-input g-font-normal14"
              type="text"
              onChange={(e) => setSendValues((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Type here"
              maxLength={130}
            />
          </div>
        </div>
      </Modal>

      <Modal
        activeDiscardModal={false}
        loader={deleteSprintLoading}
        cancelDefaultText="Cancel"
        modal={showDeleteSprintModal}
        submitButton={
          <button
            disabled={deleteSprintLoading}
            data-testid="cy-confirm-delete-sprint-btn"
            className="g-btn-delete-confirm g-font-bold14"
            onClick={() => deleteSprint()}
          >
            Delete
          </button>
        }
      >
        <div>
          <p className="g-font-normal14">Are you sure wand to delete?</p>
        </div>
      </Modal>
    </SprintsStyle>
  );
};

export default Sprints;
