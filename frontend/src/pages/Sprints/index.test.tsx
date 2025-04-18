import { render, screen } from '@testing-library/react';
import Sprints from '@/pages/Sprints';
import { vi, describe, it, expect } from 'vitest';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Sprint page', () => {
  it('Check does data not empty', async () => {
    const mockData = { message: 'GET success', data: [{}], success: true };
    mockedAxios.mockReturnValue(Promise.resolve({ data: mockData }));
    render(<Sprints />);
    await screen.findByTestId('cy-table-loader');
    expect(screen.queryByTestId('cy-table-error')).toBeNull();
    expect(screen.queryByTestId('cy-table-no-data')).toBeNull();
  });

  it('Check does data empty', async () => {
    const mockData = { message: 'GET success', data: [], success: true };
    mockedAxios.mockReturnValue(Promise.resolve({ data: mockData }));
    render(<Sprints />);
    await screen.findByTestId('cy-table-loader');
    const emptyState = await screen.findByTestId('cy-table-no-data');
    expect(emptyState).toBeInTheDocument();
  });

  it('Check does get error', async () => {
    const mockData = { success: false, message: 'Error' };
    mockedAxios.mockRejectedValue(Promise.resolve({ data: mockData }));
    render(<Sprints />);
    await screen.findByTestId('cy-table-loader');
    const errorState = screen.queryByTestId('cy-table-error');
    expect(errorState).toBeInTheDocument();
  });
});
