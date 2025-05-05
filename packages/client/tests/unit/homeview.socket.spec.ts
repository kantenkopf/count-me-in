import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import { io } from "socket.io-client";

type MockSocket = {
  on: jest.Mock;
  emit: jest.Mock;
  disconnect: jest.Mock;
};

jest.mock("socket.io-client", () => {
  const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  };

  return {
    io: jest.fn(() => mockSocket),
    Socket: jest.fn(),
  };
});

describe("When HomeView mounts", () => {
  let mockSocket: MockSocket;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "log").mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    mockSocket = {
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };
    (io as jest.Mock).mockReturnValue(mockSocket);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("connects to the socket", () => {
    mount(HomeView);

    const connectCallback = mockSocket.on.mock.calls.find(
      (call: string[]) => call[0] === "connect"
    )[1];
    connectCallback();

    expect(io).toHaveBeenCalledWith("http://localhost:3000/counter");
    expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockSocket.emit).toHaveBeenCalledWith("counter:get");
  });

  it("shows an error message when 'connect_error' event is received", async () => {
    const wrapper = mount(HomeView);

    const errorCallback = mockSocket.on.mock.calls.find(
      (call: string[]) => call[0] === "connect_error"
    )[1];
    errorCallback(new Error("Connection failed"));

    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="error-message"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error-message"]').text()).toContain(
      "We could not establish a connection to the Server."
    );
  });

  it("updates the counter when 'counter:update' event is received", async () => {
    const wrapper = mount(HomeView, {
      data() {
        return {
          isError: false,
          isLoading: false,
          counter: null,
        };
      },
      global: {
        stubs: {
          CounterDisplay: {
            template: '<div data-test="counter">{{ counter }}</div>',
            props: ["counter"],
          },
        },
      },
    });

    const updateCallback = mockSocket.on.mock.calls.find(
      (call: string[]) => call[0] === "counter:update"
    )[1];
    updateCallback(42);

    await wrapper.vm.$nextTick();

    const counterElement = wrapper.find('[data-test="counter"]');
    expect(counterElement.exists()).toBe(true);
    expect(counterElement.text()).toBe("42");
  });

  it("emits 'counter:increment' when the button is clicked", async () => {
    const wrapper = mount(HomeView);

    const connectCallback = mockSocket.on.mock.calls.find(
      (call: string[]) => call[0] === "connect"
    )[1];
    connectCallback();

    await wrapper.vm.$nextTick();

    const button = wrapper.find('[data-test="counter-button"]');
    expect(button.exists()).toBe(true);

    expect(button.attributes("disabled")).toBeUndefined();

    await button.trigger("click");

    expect(mockSocket.emit).toHaveBeenCalledWith("counter:increment");
  });

  it("disconnects from socket when unmounted", () => {
    const wrapper = mount(HomeView);
    wrapper.unmount();
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
