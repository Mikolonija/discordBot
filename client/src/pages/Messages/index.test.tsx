import Messages from '@/pages/Messages';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { vi, describe, it, expect, beforeAll } from 'vitest';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Message page', () => {
  it('Check does data not empty', async () => {
    const mockData = { message: 'GET success', data: { total: 0, items: [{}] }, success: true };
    mockedAxios.mockReturnValue(Promise.resolve({ data: mockData }));
    render(<Messages />);
    await screen.findByTestId('cy-table-loader');
    expect(screen.queryByTestId('cy-table-error')).toBeNull();
    expect(screen.queryByTestId('cy-table-no-data')).toBeNull();
  });

  it('Check does data empty', async () => {
    const mockData = { message: 'GET success', data: { total: 0, items: [] }, success: true };
    mockedAxios.mockReturnValue(Promise.resolve({ data: mockData }));
    render(<Messages />);
    await screen.findByTestId('cy-table-loader');
    const emptyState = await screen.findByTestId('cy-table-no-data');
    expect(emptyState).toBeInTheDocument();
  });

  it('Check does get error', async () => {
    const mockData = { success: false, message: 'Error' };
    mockedAxios.mockRejectedValue(Promise.resolve({ data: mockData }));
    render(<Messages />);
    await screen.findByTestId('cy-table-loader');
    const errorState = screen.queryByTestId('cy-table-error');
    expect(errorState).toBeInTheDocument();
  });
});
