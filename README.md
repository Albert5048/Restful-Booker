# Restful-Booker API Tests

This is a small API testing project I built while learning Playwright. It sends requests to the public [Restful-Booker demo API](https://restful-booker.herokuapp.com) and checks that the responses behave as expected.

The tests use Playwright's `APIRequestContext`, so they talk directly to the API without opening a browser. Booking details are generated with Faker, and AJV checks that responses match the JSON schemas.

## What the tests cover

- Check that the health endpoint is available.
- Create an authentication token and validate the response.
- Create a booking, read it back, update it, and delete it.
- Confirm that a deleted booking can no longer be fetched.

The booking lifecycle test creates its own booking and cleans it up afterward. Restful-Booker is a shared demo service, so it may occasionally be unavailable or behave inconsistently.

## Getting started

You’ll need Node.js 20.19+ (or 22.13+) and npm. From the project folder, install dependencies:

```powershell
npm ci
```

The tests use the demo API URL and credentials by default. To use different values, create a local `.env` file:

```text
API_BASE_URL=https://your-api.example.com
API_TIMEOUT_MS=15000
BOOKER_USERNAME=your-username
BOOKER_PASSWORD=your-password
```

Keep credentials out of source control. The `.env` file is ignored by Git.

## Run the project

Run the API tests:

```powershell
npm run test:api
```

Check the JavaScript with ESLint:

```powershell
npm run lint
```

You can also run Playwright’s interactive test UI:

```powershell
npm run test:api:ui
```

## Test reports

After running the tests, Playwright writes an HTML report to `playwright-report/`. Open it with:

```powershell
npm run report:html
```

The project also produces Allure test results. Generating an Allure report requires Java 17 or newer:

```powershell
npm run report:allure
npm run report:allure:open
```

## Project layout

```text
config/                  API settings and AJV setup
data/payloads/           Faker-generated booking data
data/schemas/            Response schemas
services/                Reusable auth and booking API clients
tests/api/               Health check
tests/fixtures/          Shared Playwright fixtures
tests/auth.spec.js       Token creation test
tests/booking.spec.js    Booking lifecycle test
.github/workflows/       GitHub Actions workflow
```

GitHub Actions runs the API tests and lint check for pull requests and pushes to `main`, then saves the Playwright HTML report as a workflow artifact.
