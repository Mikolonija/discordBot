import { displayValue, formatDate } from '@/utils/helpers';
import { TableStyle } from '@/components/Table/style';
import { ButtonType } from '@/utils/types/buttons';
import { Tooltip } from 'react-tooltip';
import { useId } from 'react';

interface Header<T> {
  name: string;
  colName: keyof T;
}

interface IProps<T> {
  data: T[] | undefined;
  loader: boolean;
  error: unknown;
  header: Header<T>[];
  actions?: {
    testId: string;
    label: string;
    onClick: (row: T) => void;
    btnType: ButtonType;
  }[];
}

const Table = <T,>(props: IProps<T>) => {
  const { data, header, loader, error, actions } = props;

  const renderColumn = <T,>(colName: keyof T, value: T[keyof T]) => {
    const tooltipId = useId();
    if (colName === 'createdAt' && typeof value === 'string') {
      return (
        <>
          <span className="hide-text">
            <span data-tooltip-id={tooltipId} data-tooltip-variant="light">
              {formatDate(value)}
            </span>
            <Tooltip place="bottom" id={tooltipId} content={formatDate(value)}></Tooltip>
          </span>
        </>
      );
    }
    return (
      <>
        <span className="hide-text">
          <span data-tooltip-id={tooltipId} data-tooltip-variant="light">
            {displayValue(value)}
          </span>
          <Tooltip place="bottom" id={tooltipId} content={displayValue(value)}></Tooltip>
        </span>
      </>
    );
  };

  const colSpan = header.length + (actions?.length ? 1 : 0);

  return (
    <TableStyle>
      <thead>
        <tr className="g-font-bold14">
          {header.map((data, i) => (
            <th key={i}>{data.name}</th>
          ))}
          {actions && actions.length > 0 && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {loader && (
          <tr data-testid="cy-table-loader">
            <td colSpan={colSpan} className="g-font-bold14 default-row">
              <p className="skeleton-loader"></p>
            </td>
          </tr>
        )}
        {error !== null && (
          <tr data-testid="cy-table-error">
            <td colSpan={colSpan} className="g-font-bold14 default-row">
              {String(error)}
            </td>
          </tr>
        )}
        {!loader && data && data.length === 0 ? (
          <tr data-testid="cy-table-no-data">
            <td colSpan={colSpan} className="g-font-bold14 default-row">
              No data
            </td>
          </tr>
        ) : (
          !loader &&
          data?.map((row, i) => (
            <tr className="g-font-normal14" key={i}>
              {header.map((col, index) => {
                const value: T[keyof T] = row[col.colName];
                return <td key={index}>{renderColumn(col.colName, value)}</td>;
              })}
              {actions && actions.length > 0 && (
                <td>
                  <span className="btn-positions g-right g-font-normal14 ">
                    {actions.map((action, i) => (
                      <button
                        data-testid={action.testId}
                        className={
                          action.btnType === ButtonType.Edit ? 'g-btn-cancel' : 'g-btn-delete'
                        }
                        key={i}
                        onClick={() => action.onClick(row)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </span>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </TableStyle>
  );
};

export default Table;
