import { shallowMount } from "@vue/test-utils";
import AboutView from "@/views/AboutView.vue";

describe("AboutView.vue", () => {
  it("renders without crashing", () => {
    const wrapper = shallowMount(AboutView, {
      global: {
        stubs: {
          "router-link": true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
