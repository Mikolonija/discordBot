import { useCallback, useEffect, useRef, useState } from 'react';
import { ModalStyle } from '@/components/Modal/style';
import { useOutsideClickAndEscape } from '@/hooks/useOutsideClickAndEscape';
import { IModalBody } from '@/utils/interface/modal';

interface Props {
  activeDiscardModal?: boolean;
  loader: boolean;
  children?: React.ReactNode;
  cancelDefaultText: string;
  modal: IModalBody;
  submitButton?: React.ReactNode;
}

export const Modal = (props: Props) => {
  const { activeDiscardModal, loader, cancelDefaultText, modal, children, submitButton } = props;
  const [idModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDiscardModal, setIsDiscardModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeDialog = useCallback(() => {
    if (!loader) {
      activeDiscardModal ? setIsDiscardModal(true) : setIsModalOpen(false);
    }
  }, [activeDiscardModal]);

  useOutsideClickAndEscape(closeDialog, idModalOpen, modalRef);

  useEffect(() => {
    setIsModalOpen(modal.showDialog);
  }, [modal]);

  useEffect(() => {
    if (idModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [idModalOpen]);

  return (
    <>
      {idModalOpen === true && (
        <ModalStyle>
          <div ref={modalRef} className="dialog g-center-in-all-window">
            <div className="dialog-header">
              <h1 className="g-font-bold20 g-left-center">{modal.title}</h1>
              <div
                className={`g-center ${loader === false ? 'close-icon' : 'close-icon-disable'}  `}
                onClick={() => closeDialog()}
              >
                X
              </div>
            </div>
            <div className="dialog-main">{children}</div>
            <div className="g-right dialog-footer">
              <button
                disabled={loader}
                onClick={() => closeDialog()}
                className="g-btn-cancel g-font-bold14"
              >
                {cancelDefaultText}
              </button>
              {submitButton}
            </div>
          </div>
        </ModalStyle>
      )}
      {isDiscardModal === true && (
        <ModalStyle>
          <div className="dialog g-center-in-all-window">
            <div className="dialog-header">
              <h1 className="g-font-bold20 g-left-center">Discard changes</h1>
            </div>
            <div className="dialog-main">
              <p className="dialog-description-discard">
                Are you sure you want to close the modal? Any unsaved changes will be lost.
              </p>
            </div>
            <div className="dialog-footer g-right">
              <button
                onClick={() => setIsDiscardModal(false)}
                className="g-btn-cancel g-font-bold14"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsDiscardModal(false);
                }}
                className="g-btn-submit g-font-bold14"
              >
                Yes
              </button>
            </div>
          </div>
        </ModalStyle>
      )}
    </>
  );
};
