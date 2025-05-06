import { shallowMount } from "@vue/test-utils";
import NotFoundView from "@/views/NotFoundView.vue";

describe("AboutView.vue", () => {
  it("renders without crashing", () => {
    const wrapper = shallowMount(NotFoundView, {
      global: {
        stubs: {
          "router-link": true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
