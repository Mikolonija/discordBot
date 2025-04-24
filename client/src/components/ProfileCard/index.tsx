import { useEffect, useState } from 'react';
import { ProfileCardStyle } from '@/components/ProfileCard/style';
import useFetch from '@/hooks/useFetch';
import { BACK_END_URL } from '@/config';
import { IProfile } from '@/utils/interface/profile';
import avatar from '@/assets/avatar.svg';
import { displayValue } from '@/utils/helpers';
import Dropdown from '@/components/DropDown';
import { ISprint, ISprintResult } from '@/utils/interface/sprint';
import { IDropdownOptions } from '@/utils/interface/dropdown';
import { toast } from 'react-toastify';
import {
  IMessageBody,
  messageSendDefaultValues,
  IMessageSendValues,
} from '@/utils/interface/message';
import { ITemplateResult, ITemplates } from '@/utils/interface/template';

interface IProps {
  refreshMessages: () => void;
}

const ProfileCard = (props: IProps) => {
  const { refreshMessages } = props;
  const [sendValues, setSendValues] = useState<IMessageSendValues>(messageSendDefaultValues);
  const [lastFailedValues, setLastFailedValues] = useState<IMessageSendValues | null>(null);

  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
    execute: executeProfileInfo,
  } = useFetch<IProfile>(`${BACK_END_URL}/profile`, 'GET');

  const {
    data: sprints,
    loading: sprintLoading,
    error: sprintsError,
    execute: executesSprints,
  } = useFetch<{ success: boolean; message: string; data: ISprintResult }>(
    `${BACK_END_URL}/sprints`,
    'GET',
  );

  const {
    data: templates,
    loading: templatesLoading,
    error: templatesError,
    execute: executesTemplates,
  } = useFetch<{ success: boolean; message: string; data: ITemplateResult }>(
    `${BACK_END_URL}/templates`,
    'GET',
  );

  const { loading: messageLoading, execute: executeSendMessage } = useFetch(
    `${BACK_END_URL}/messages`,
    'POST',
  );

  const sendCelebrationMessage = async () => {
    const messageBody: IMessageBody = {
      username: profile?.username,
      sprintCode: sendValues.sprintCode,
      channelId: sendValues.channelId,
      templateId: sendValues.templateId,
    };

    const { data, error } = await executeSendMessage(messageBody);

    if (data) {
      setSendValues({ channelId: '', sprintCode: '', templateId: '' });
      setLastFailedValues(null);
      toast.success('Message sent successfully!', {
        position: 'top-right',
        theme: 'colored',
        closeOnClick: true,
      });
      refreshMessages();
    }
    if (error) {
      setLastFailedValues({ ...sendValues });
      toast.error(String(error), {
        position: 'top-right',
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };

  const isDisabled =
    messageLoading ||
    sendValues.channelId.trim() === '' ||
    sendValues.templateId === '' ||
    sendValues.sprintCode === '' ||
    (lastFailedValues &&
      lastFailedValues.channelId === sendValues.channelId.trim() &&
      lastFailedValues.templateId === sendValues.templateId &&
      lastFailedValues.sprintCode === sendValues.sprintCode);

  const isLoadingData = sprintLoading || templatesLoading;
  const hasErrorData = sprintsError || templatesError;
  const isReadyData = !isLoadingData && !hasErrorData && sprints && templates;

  useEffect(() => {
    executeProfileInfo();
    executesSprints();
    executesTemplates();
  }, []);

  return (
    <ProfileCardStyle>
      <div className="header">
        <div className="avatar">
          <img className="avatar-img" src={avatar} alt="avatar" width={50} height={50} />
        </div>
      </div>
      {profileLoading && <div className="body">Loading Profile...</div>}
      <>
        {profileError && (
          <div className="body">
            <p className=" g-font-normal14">Failed to get profile:{String(profileError)}</p>
          </div>
        )}
      </>
      {profile && (
        <div className="body">
          <div className="profile-info">
            <h2 className=" g-font-bold20">{displayValue(profile.global_name)}</h2>
            <p className=" g-font-normal14">{displayValue(profile.username)}</p>
          </div>
          <div className="action">
            <h2 className="g-font-bold20 action-title-position">Send celebration message</h2>
            <>{isLoadingData && <p className="g-font-normal14">Loading...</p>}</>
            <>
              {sprintsError && (
                <p className="g-font-normal14"> Failed to get sprints: {String(sprintsError)} </p>
              )}
            </>
            <>
              {templatesError && (
                <p className="g-font-normal14">Failed to get templates: {String(templatesError)}</p>
              )}
            </>
            {isReadyData && (
              <>
                <div className="input-block">
                  <label htmlFor="channelID" className="g-font-normal12">
                    Discord channel id*
                  </label>
                  <input
                    id="channelID"
                    value={sendValues?.channelId}
                    className="g-input g-font-normal14"
                    type="text"
                    onChange={(e) =>
                      setSendValues((prev) => ({ ...prev, channelId: e.target.value }))
                    }
                    placeholder="Type here"
                    maxLength={130}
                  />
                </div>
                <div className="input-block">
                  <p className="g-font-normal12">Sprint code*</p>
                  <Dropdown
                    defaultSelected={sendValues.sprintCode}
                    placeHolder="Select here"
                    options={sprints.data.items.map((sprint: ISprint) => ({
                      value: sprint.code,
                      label: `${sprint.code} (${sprint.title})`,
                    }))}
                    onChange={(selected: IDropdownOptions) => {
                      setSendValues((prev) => ({ ...prev, sprintCode: selected.value }));
                    }}
                  />
                </div>

                <div className="input-block">
                  <p className="g-font-normal12">Template id*</p>
                  <Dropdown
                    defaultSelected={sendValues.templateId}
                    placeHolder="Select here"
                    options={templates.data.items.map((data: ITemplates) => ({
                      value: data.id,
                      label: `${data.id}`,
                    }))}
                    onChange={(selected: IDropdownOptions) => {
                      setSendValues((prev) => ({ ...prev, templateId: selected.value }));
                    }}
                  />
                </div>

                <div className="btn-submit-position">
                  <button
                    disabled={isDisabled === true}
                    className="g-btn-submit g-font-bold14"
                    onClick={() => sendCelebrationMessage()}
                  >
                    {!messageLoading ? 'Send message' : '...'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </ProfileCardStyle>
  );
};

export default ProfileCard;
