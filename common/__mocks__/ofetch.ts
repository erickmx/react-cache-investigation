const mockFetch = jest.fn();

const ofetch = {
  create: jest.fn(() => mockFetch),
};

export default ofetch;
export { ofetch };