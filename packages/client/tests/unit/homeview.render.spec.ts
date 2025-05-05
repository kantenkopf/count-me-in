import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("When HomeView.vue is rendered", () => {
  const wrapper = mount(HomeView);

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  const counter = wrapper.get('[data-test="counter"]');

  it("initially renders the empty counter", () => {
    expect(counter.text()).toBe("");
  });

  const counterBoutton = wrapper.get('[data-test="counter-button"]');

  it("renders the counter button correctly", () => {
    expect(counterBoutton.text()).toBe("Counter ++");
  });
});
