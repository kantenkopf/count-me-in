import { getEnvArgs } from "@/helpers/env.helper";
import { EnvArgs } from "@/types/env.types";

describe("When env helper is invoked", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "log").mockImplementation(() => {});
    delete process.env.PORT;
    delete process.env.NODE_ENV;
    delete process.env.CLIENT_URL;
  });

  afterEach(() => {
    delete process.env.PORT;
    delete process.env.NODE_ENV;
    delete process.env.CLIENT_URL;
  });

  it("returns default values when no environment variables are set", () => {
    const result = getEnvArgs();

    expect(result).toEqual<EnvArgs>({
      PORT: 3000,
      NODE_ENV: "dev",
      CLIENT_URL: "http://localhost:8080",
    });
  });

  it("overrides PORT when it is set in the environment", () => {
    process.env.PORT = "4000";

    const result = getEnvArgs();

    expect(result.PORT).toBe(4000);
  });

  it("sets NODE_ENV to 'prod' and removes CLIENT_URL in production mode", () => {
    process.env.NODE_ENV = "prod";

    const result = getEnvArgs();

    expect(result.NODE_ENV).toBe("prod");
    expect(result.CLIENT_URL).toBeUndefined();
  });

  it("throws an error if CLIENT_URL is not localhost in dev mode", () => {
    process.env.NODE_ENV = "dev";
    process.env.CLIENT_URL = "http://example.com";

    expect(() => getEnvArgs()).toThrowError(
      "CLIENT_URL is restricted to localhost."
    );
  });

  it("allows CLIENT_URL if it is localhost in dev mode", () => {
    process.env.NODE_ENV = "dev";
    process.env.CLIENT_URL = "http://localhost:3001";

    const result = getEnvArgs();

    expect(result.CLIENT_URL).toBe("http://localhost:3001");
  });

  it("ignores CLIENT_URL in production mode", () => {
    process.env.NODE_ENV = "prod";
    process.env.CLIENT_URL = "http://localhost:3001";

    const result = getEnvArgs();

    expect(result.CLIENT_URL).toBeUndefined();
  });

  it("throws an error if NODE_ENV is invalid", () => {
    process.env.NODE_ENV = "invalid";

    expect(() => getEnvArgs()).toThrowError();
  });

  it("handles mixed environment variables correctly", () => {
    process.env.PORT = "5000";
    process.env.NODE_ENV = "dev";
    process.env.CLIENT_URL = "http://localhost:8081";

    const result = getEnvArgs();

    expect(result).toEqual<EnvArgs>({
      PORT: 5000,
      NODE_ENV: "dev",
      CLIENT_URL: "http://localhost:8081",
    });
  });
});