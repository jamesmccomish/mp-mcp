# mp-mcp

A public, npm-publishable Model Context Protocol (MCP) server for UK Parliament data.

Built to let agents use UK Parliament data with intent-led tools, citation-first responses, response-format toggles, structured errors.

## Packages

- [`packages/mp-mcp`](packages/mp-mcp) — the MCP server (this is the library).
- [`apps/westminster-watch`](apps/westminster-watch) — consumer demo (stubbed; see its README).

## Data and attribution

This project queries the UK Parliament public APIs. The data is licensed under the
[Open Parliament Licence v3.0](https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/).

When you surface this MCP's output to end users, you must attribute the data as:

> Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

## Status

Pre-release. See [`implementation-plan.md`](docs/implementation-plan.md) for the
milestone-driven build plan and [`CLAUDE.md`](CLAUDE.md) for project conventions.

## License

MIT — see [`LICENSE`](LICENSE).
