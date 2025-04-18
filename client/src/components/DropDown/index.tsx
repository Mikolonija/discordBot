import { useEffect, useRef, useState } from 'react';
import { DropDownStyle } from '@/components/DropDown/style';
import arrow from '@/assets/arrow.svg';
import { IDropdownOptions } from '@/utils/interface/dropdown';

interface IProps {
  placeHolder: string;
  options: IDropdownOptions[];
  onChange: (selected: IDropdownOptions) => void;
  defaultSelected: string;
}

const Dropdown = (props: IProps) => {
  const { placeHolder, options, onChange, defaultSelected } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IDropdownOptions | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.value === '' || defaultSelected === '') {
      return placeHolder;
    }
    return selectedValue.label;
  };

  const onItemClick = (option: IDropdownOptions) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option: IDropdownOptions) => {
    return selectedValue ? selectedValue.value === option.value : false;
  };

  return (
    <DropDownStyle>
      <div className="dropdown g-font-normal14" tabIndex={0}>
        <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
          <p className="dropdown-current-value">{getDisplay()}</p>
          {showMenu ? (
            <div className="dropdown-row-rotate g-center">
              <img src={arrow} alt="arrow" width={24} />
            </div>
          ) : (
            <div className="g-center">
              <img src={arrow} alt="arrow" width={24} />
            </div>
          )}
        </div>
        {showMenu && (
          <div className="dropdown-menu">
            {Array.isArray(options) && options.length > 0 ? (
              options.map((option: IDropdownOptions) => (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.value}
                  className={`dropdown-item ${isSelected(option) ? 'selected' : ''}`}
                >
                  <p>{option.label}</p>
                </div>
              ))
            ) : (
              <div className="dropdown-item no-data">
                <p>No data</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DropDownStyle>
  );
};

export default Dropdown;
