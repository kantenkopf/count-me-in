import { mount } from "@vue/test-utils";
import IncrementButton from "@/components/IncrementButton.vue";

describe("IncrementButton.vue", () => {
  it("renders the button", () => {
    const wrapper = mount(IncrementButton, {
      props: {
        isLoading: false,
        isError: false,
        handleIncrement: jest.fn(),
      },
    });

    const button = wrapper.find("[data-test='counter-button']");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("COUNTER ++");
  });

  it("disables the button when isLoading is true", () => {
    const wrapper = mount(IncrementButton, {
      props: {
        isLoading: true,
        isError: false,
        handleIncrement: jest.fn(),
      },
    });

    const button = wrapper.find("[data-test='counter-button']");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("disables the button when isError is true", () => {
    const wrapper = mount(IncrementButton, {
      props: {
        isLoading: false,
        isError: true,
        handleIncrement: jest.fn(),
      },
    });

    const button = wrapper.find("[data-test='counter-button']");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("enables the button when isLoading and isError are false", () => {
    const wrapper = mount(IncrementButton, {
      props: {
        isLoading: false,
        isError: false,
        handleIncrement: jest.fn(),
      },
    });

    const button = wrapper.find("[data-test='counter-button']");
    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("calls handleIncrement when the button is clicked", async () => {
    const handleIncrementMock = jest.fn();
    const wrapper = mount(IncrementButton, {
      props: {
        isLoading: false,
        isError: false,
        handleIncrement: handleIncrementMock,
      },
    });

    const button = wrapper.find("[data-test='counter-button']");
    await button.trigger("click");
    expect(handleIncrementMock).toHaveBeenCalled();
  });
});
