import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import axios from 'axios';
import useFetch from './useFetch';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('useFetch', () => {
  it('GET: fetches data successfully', async () => {
    const mockData = { message: 'GET success', data: [], success: true };
    mockedAxios.mockResolvedValueOnce({ data: mockData });
    const { result } = renderHook(() => useFetch<typeof mockData>('https://api.test', 'GET'));
    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('POST: sends data and gets response', async () => {
    const mockResponse = { success: true, message: 'POST success', data: null };
    mockedAxios.mockResolvedValueOnce({ data: mockResponse });
    const { result } = renderHook(() => useFetch<typeof mockResponse>('https://api.test', 'POST'));
    await act(async () => {
      await result.current.execute({ username: 'admin' });
    });
    expect(result.current.data).toBe(mockResponse);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('DELETE: deletes data and gets response', async () => {
    const mockResponse = { message: 'DELETE success', data: null, success: true };
    mockedAxios.mockResolvedValueOnce({ data: mockResponse });
    const { result } = renderHook(() =>
      useFetch<typeof mockResponse>('https://api.test/1', 'DELETE'),
    );
    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('PATCH: updates data and gets response', async () => {
    const mockResponse = { message: 'PATCH success', data: null, success: true };
    mockedAxios.mockResolvedValueOnce({ data: mockResponse });
    const { result } = renderHook(() => useFetch<typeof mockResponse>('https://api.test', 'PATCH'));

    await act(async () => {
      await result.current.execute({ isActive: true });
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('Handles errors', async () => {
    const mockResponseError = { success: false, message: 'Fail', data: null };
    mockedAxios.mockRejectedValueOnce({
      response: { data: mockResponseError },
    });
    const { result } = renderHook(() =>
      useFetch<typeof mockResponseError>('https://api.testDS', 'GET'),
    );
    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockResponseError.message);
    expect(result.current.loading).toBe(false);
  });
});
