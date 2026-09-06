# PureBoost Agent Guide

This file defines how coding agents should work in this repository. Read it together with [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) before making changes.

## Mission

Improve PureBoost as a working commerce application. Prioritize correctness, security, data integrity, and tested customer workflows over adding surface features.

## Before Editing

1. Read the relevant section of `docs/IMPLEMENTATION_PLAN.md`.
2. Inspect the owning route, controller, component, or schema before changing a caller.
3. State one local hypothesis about the defect and one focused check that can disprove it.
4. Check the current worktree and preserve unrelated user changes.

## Implementation Rules

- Keep changes focused on the requested workflow.
- Preserve existing public APIs unless a contract correction is required; document contract changes.
- Never trust client-supplied prices, totals, roles, or authenticated user IDs.
- Never return password hashes or accept raw card data for storage or processing.
- Use parameterized SQL and transactions for multi-step order and stock operations.
- Validate request bodies, route parameters, quantities, and ownership at the API boundary.
- Use environment variables for URLs, credentials, JWT secrets, and deployment settings.
- Do not add real secrets, production tokens, or personal data to the repository.
- Prefer existing project patterns over new abstractions, and remove dead code only when it is part of the touched workflow.
- Keep comments short and explain only non-obvious decisions.

## Validation Rules

After every substantive edit, run the narrowest relevant executable check first. Then run broader checks when the change crosses a module boundary.

Backend changes should normally include:

```text
cd backend
npm test
```

Frontend changes should normally include:

```text
cd frontend
npm test -- --watchAll=false
npm run build
```

If a command cannot run because dependencies, database services, or environment variables are missing, report that limitation and run the next useful static or unit check.

## Priority Order

1. Schema and API contract correctness.
2. Authentication, authorization, and sensitive-data handling.
3. Checkout totals, transactions, and inventory integrity.
4. Regression tests for the changed workflow.
5. Frontend integration and usability.
6. Visual polish and non-critical refactoring.

## Completion Checklist

- The change matches the database and API contract.
- Unauthorized and malformed requests are rejected.
- The relevant happy path and failure path are tested.
- No unrelated files were reformatted or reverted.
- Documentation is updated when behavior or setup changes.
- The final report names changed files, validation performed, and any remaining blockers.
