import { mount } from "@vue/test-utils";
import ConnectionLoader from "@/components/ConnectionLoader.vue";

describe("When ConnectionLoader component is rendered", () => {
  it("renders the loading message when isLoading is true and isError is false", () => {
    const wrapper = mount(ConnectionLoader, {
      props: {
        isLoading: true,
        isError: false,
      },
    });

    expect(wrapper.find("[data-test='loading-message']").exists()).toBe(true);
    expect(wrapper.text()).toContain("Establishing connection");
  });

  it("does not render the loading message when isLoading is false", () => {
    const wrapper = mount(ConnectionLoader, {
      props: {
        isLoading: false,
        isError: false,
      },
    });

    expect(wrapper.find("[data-test='loading-message']").exists()).toBe(false);
  });

  it("does not render the loading message when isError is true", () => {
    const wrapper = mount(ConnectionLoader, {
      props: {
        isLoading: true,
        isError: true,
      },
    });

    expect(wrapper.find("[data-test='loading-message']").exists()).toBe(false);
  });
});
