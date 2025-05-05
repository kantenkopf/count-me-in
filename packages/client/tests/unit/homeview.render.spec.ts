import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("When HomeView.vue is rendered", () => {
  const wrapper = shallowMount(HomeView);

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
