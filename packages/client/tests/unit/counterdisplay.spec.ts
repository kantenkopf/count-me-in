import { mount } from "@vue/test-utils";
import CounterDisplay from "@/components/CounterDisplay.vue";

describe("When CounterDisplay component is rendered", () => {
  it("renders the counter value when not loading or in error state", () => {
    const wrapper = mount(CounterDisplay, {
      props: {
        isError: false,
        isLoading: false,
        wasIncremented: false,
        counter: 42,
      },
    });

    const counterElement = wrapper.find("[data-test='counter']");
    expect(counterElement.exists()).toBe(true);
    expect(counterElement.text()).toBe("42");
  });

  it("does not render the counter when isError is true", () => {
    const wrapper = mount(CounterDisplay, {
      props: {
        isError: true,
        isLoading: false,
        wasIncremented: false,
        counter: 42,
      },
    });

    expect(wrapper.find("[data-test='counter']").exists()).toBe(false);
  });

  it("does not render the counter when isLoading is true", () => {
    const wrapper = mount(CounterDisplay, {
      props: {
        isError: false,
        isLoading: true,
        wasIncremented: false,
        counter: 42,
      },
    });

    expect(wrapper.find("[data-test='counter']").exists()).toBe(false);
  });

  it("applies the 'scaled' class when wasIncremented is true", () => {
    const wrapper = mount(CounterDisplay, {
      props: {
        isError: false,
        isLoading: false,
        wasIncremented: true,
        counter: 42,
      },
    });

    const counterElement = wrapper.find("[data-test='counter']");
    expect(counterElement.classes()).toContain("scaled");
  });

  it("does not apply the 'scaled' class when wasIncremented is false", () => {
    const wrapper = mount(CounterDisplay, {
      props: {
        isError: false,
        isLoading: false,
        wasIncremented: false,
        counter: 42,
      },
    });

    const counterElement = wrapper.find("[data-test='counter']");
    expect(counterElement.classes()).not.toContain("scaled");
  });
});
