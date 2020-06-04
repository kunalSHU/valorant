# 🩺 Valorant

A medical logistics app that assists family doctos manage their practices

## 📘 Directory Breakdown

```text
├── api-gateway: API gateway src
├── ci-pipeline: Jenkins pipeline (can be deployed locally, will require configuration)
│   ├── ci-pipeline-data: Jenkins container data
│   └── jenkins: Jenkins docker deployment src
├── frontend: React frontend src
└── services: All app microservices (all follow same structure)
    ├── app: Microservice src
    │   ├── __tests__: All service tests
    │   │   ├── e2e: E2E tests
    │   │   ├── integration: Integration tests
    │   │   └── unit: Unit tests
    │   └── src: Microservice app src
    ├── bookings
    ├── business-metrics
    ├── inventory
    ├── logging-and-monitoring
    ├── medical-conditions
    ├── notification
    └── patient-record
```

## 🔨 Installation

### Development Environment

1. Run ```./setup-dev-environment.sh``` to install development environment prerequisites

### Microservices

1. ```cd``` into microservice directory
2. Run ```npm i``` in service directory to install all dependencies
3. Run ```npm start:dev``` to start microservice in development mode

## ⚙️ NPM Tasks

__Usage__: ```npm run <task_name>```

- __start__ - Runs the microservice in PRODUCTION mode
- __start:dev__ - Runs microservice in DEVELOPMENT mode (including autorefreshing on code change)
- __test:all__ - Runs all microservices tests (i.e. integration, unit, e2e)
- __test:unit__ - Runs all microservice unit tests
- __eslint__ - Checks code for consistent styling, documentation, and security holes
- __eslint:fix__ - Attempts to fix code styling, documentation, and security. Commonly requires developer intervention
