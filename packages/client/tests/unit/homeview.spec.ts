import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import { io } from 'socket.io-client';

/*eslint-disable */

jest.mock('socket.io-client', () => {
  const emitMock = jest.fn();
  const onMock = jest.fn();
  const disconnectMock = jest.fn();

  return {
    io: jest.fn(() => ({
      emit: emitMock,
      on: onMock,
      disconnect: disconnectMock,
    })),
    emitMock,
    onMock,
    disconnectMock,
  };
});

describe('HomeView.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(HomeView);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initially displays null counter', () => {
    expect(wrapper.find('div').text()).toBe('');
  });

  it('calls socket.emit("counter:get") on mount', () => {
    const { emitMock } = io as any;
    expect(emitMock).toHaveBeenCalledWith('counter:get');
  });

  it('updates counter when "counter:update" event is received', async () => {
    const { onMock } = io as any;
    const updateCallback = onMock.mock.calls.find(
      (call: string[]) => call[0] === 'counter:update'
    )[1];
    updateCallback(42); // Simulate receiving a counter update
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').text()).toBe('42');
  });

  it('emits "counter:increment" when button is clicked', async () => {
    const { emitMock } = io as any;
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(emitMock).toHaveBeenCalledWith('counter:increment');
  });

  it('disconnects socket on unmount', () => {
    const { disconnectMock } = io as any;
    wrapper.unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
