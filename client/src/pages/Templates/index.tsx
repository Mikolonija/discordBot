import { Modal } from '@/components/Modal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { BACK_END_URL } from '@/config';
import useFetch from '@/hooks/useFetch';
import { TemplatesStyle } from '@/pages/Templates/style';
import { defaultModal, IModalBody } from '@/utils/interface/modal';
import { defaultPagination } from '@/utils/interface/pagination';
import {
  defaultTemplateBody,
  ITemplateBody,
  ITemplateResult,
  ITemplates,
} from '@/utils/interface/template';
import { ButtonType } from '@/utils/types/buttons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Templates = () => {
  const [showAddTemplateModal, setShowAddTemplateModal] = useState<IModalBody>(defaultModal);
  const [showDeleteTemplateModal, setShowDeleteTemplateModal] = useState<IModalBody>(defaultModal);
  const [showEditTemplateModal, setShowEditTemplateModal] = useState<IModalBody>(defaultModal);
  const [sendValues, setSendValues] = useState<ITemplateBody>(defaultTemplateBody);
  const [lastFailedValues, setLastFailedValues] = useState<ITemplateBody>(defaultTemplateBody);
  const [templatesPagination, setTemplatesPagination] = useState(defaultPagination);
  const [templateDeletePath, setTemplateDeletePath] = useState<string>('');
  const [templatePatchPath, setTemplatePatchPath] = useState<string>('');

  const {
    data: templates,
    loading: templatesLoading,
    error: templatesError,
    execute: executeTemplatesInfo,
  } = useFetch<{ success: boolean; message: string; data: ITemplateResult }>(
    `${BACK_END_URL}/templates?limit=${templatesPagination.limit}&offset=${templatesPagination.offset}`,
    'GET',
  );

  const { loading: newTemplateLoading, execute: executeCreateNewTemplate } = useFetch(
    `${BACK_END_URL}/templates`,
    'POST',
  );

  const { loading: editSprintLoading, execute: executedUpdateTemplate } = useFetch(
    templatePatchPath,
    'PATCH',
  );

  const { loading: deleteTemplateLoading, execute: executedDeleteTemplate } = useFetch(
    templateDeletePath,
    'DELETE',
  );

  const createNewTemplate = async () => {
    const templateBody: ITemplateBody = {
      text: sendValues.text,
    };
    const { data, error } = await executeCreateNewTemplate(templateBody);
    if (data) {
      setShowAddTemplateModal(defaultModal);
      toast.success('Template created successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      executeTemplatesInfo();
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const updateTemplate = async () => {
    const templateBody: ITemplateBody = {
      text: sendValues.text,
    };
    const { data, error } = await executedUpdateTemplate(templateBody);
    if (data) {
      setShowEditTemplateModal(defaultModal);
      toast.success('Sprint updated successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      executeTemplatesInfo();
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const deleteTemplate = async () => {
    const { data, error } = await executedDeleteTemplate();
    if (data) {
      setShowDeleteTemplateModal(defaultModal);
      toast.success('Template deleted successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      setTemplatesPagination({ limit: defaultPagination.limit, offset: defaultPagination.offset });
    }
    if (error) {
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const openAddTemplateModal = (show: boolean, titleText: string) => {
    setSendValues(defaultTemplateBody);
    setShowAddTemplateModal({ showDialog: show, title: titleText });
  };

  const openEditTemplateModal = (row: ITemplates, show: boolean, titleText: string): void => {
    setTemplatePatchPath(`${BACK_END_URL}/templates/${row.id}`);
    setSendValues(row);
    setLastFailedValues(row);
    setShowEditTemplateModal({ showDialog: show, title: titleText });
  };

  const openDeleteTemplateModal = (row: ITemplates, show: boolean, titleText: string): void => {
    setTemplateDeletePath(`${BACK_END_URL}/templates/${row.id}`);
    setShowDeleteTemplateModal({ showDialog: show, title: titleText });
  };

  useEffect(() => {
    executeTemplatesInfo();
  }, [templatesPagination]);

  return (
    <TemplatesStyle>
      <div className="g-container ">
        <Table<ITemplates>
          data={templates?.data.items}
          loader={templatesLoading}
          error={templatesError}
          header={[
            { name: 'ID', colName: 'id' },
            { name: 'Text', colName: 'text' },
          ]}
          actions={[
            {
              testId: 'cy-update-template-btn',
              label: 'Edit',
              onClick: (row) => openEditTemplateModal(row, true, 'Edit Template'),
              btnType: ButtonType.Edit,
            },
            {
              testId: 'cy-delete-template-btn',
              label: 'Delete',
              onClick: (row) => openDeleteTemplateModal(row, true, 'Delete Template'),
              btnType: ButtonType.Delete,
            },
          ]}
        />
        {!templatesLoading && (
          <div className="template-footer">
            <Pagination
              total={templates?.data.total || 0}
              limit={templatesPagination.limit}
              offset={templatesPagination.offset}
              onPageChange={(newOffset) =>
                setTemplatesPagination((prev) => ({ ...prev, offset: newOffset }))
              }
            />

            <div className="btn-add-position">
              <button
                disabled={templatesError !== null}
                data-testid="cy-add-template-btn"
                className="g-btn-submit g-font-bold14"
                onClick={() => openAddTemplateModal(true, 'Create New Template')}
              >
                Add Template
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        activeDiscardModal={sendValues.text.trim().length !== 0}
        loader={newTemplateLoading}
        cancelDefaultText="Cancel"
        modal={showAddTemplateModal}
        submitButton={
          <button
            disabled={sendValues.text.trim().length === 0}
            className="g-btn-submit g-font-bold14"
            onClick={() => createNewTemplate()}
            data-testid="cy-confirm-create-sprint-btn"
          >
            Create
          </button>
        }
      >
        <div className="template-form g-left">
          <div>
            <label htmlFor="text" className="template-form-label g-font-normal12">
              Template text*
              <span className="g-font-normal12">{sendValues.text.length}/300</span>
            </label>
            <textarea
              data-testid="cy-new-template-text-field"
              id="text"
              value={sendValues.text}
              className="g-textarea g-font-normal14"
              onChange={(e) => setSendValues((prev) => ({ ...prev, text: e.target.value }))}
              placeholder="Type here"
              maxLength={300}
            />
            <p className="tags g-font-normal12">
              {'{sprintName}'} - Optional tag to insert the sprint name in your message.
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        activeDiscardModal={sendValues.text.trim() !== lastFailedValues.text.trim()}
        loader={editSprintLoading}
        cancelDefaultText="Cancel"
        modal={showEditTemplateModal}
        submitButton={
          <button
            data-testid="cy-confirm-update-template-btn"
            disabled={sendValues.text.trim().length === 0}
            className="g-btn-submit g-font-bold14"
            onClick={() => updateTemplate()}
          >
            Update
          </button>
        }
      >
        <div className="template-form g-left">
          <div>
            <label htmlFor="code" className="template-form-label g-font-normal12">
              Sprint Text*
              <span className="g-font-normal12">{sendValues.text.length}/300</span>
            </label>
            <textarea
              data-testid="cy-update-template-text-field"
              id="text"
              value={sendValues.text}
              className="g-textarea g-font-normal14"
              onChange={(e) => setSendValues((prev) => ({ ...prev, text: e.target.value }))}
              placeholder="Type here"
              maxLength={300}
            />
            <p className="tags g-font-normal12">
              {'{sprintCode}'} - Optional tag to insert the sprint name in your message.
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        activeDiscardModal={false}
        loader={deleteTemplateLoading}
        cancelDefaultText="Cancel"
        modal={showDeleteTemplateModal}
        submitButton={
          <button
            disabled={deleteTemplateLoading}
            data-testid="cy-confirm-delete-template-btn"
            className="g-btn-delete-confirm g-font-bold14"
            onClick={() => deleteTemplate()}
          >
            Delete
          </button>
        }
      >
        <div>
          <p className="g-font-normal14">Are you sure wand to delete?</p>
        </div>
      </Modal>
    </TemplatesStyle>
  );
};

export default Templates;
