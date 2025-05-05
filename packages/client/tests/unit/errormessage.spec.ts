import { mount } from "@vue/test-utils";
import ErrorMessage from "@/components/ErrorMessage.vue";

describe("When ErrorMessage component is rendered", () => {
  it("renders the error message when isError is true", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        isError: true,
      },
    });

    const errorMessage = wrapper.find("[data-test='error-message']");
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain(
      "We could not establish a connection to the Server."
    );
    expect(errorMessage.text()).toContain(
      "Please try to refresh your page or return later."
    );
  });

  it("does not render the error message when isError is false", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        isError: false,
      },
    });

    expect(wrapper.find("[data-test='error-message']").exists()).toBe(false);
  });
});
