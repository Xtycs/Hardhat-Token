# Hardhat Token Project (my first contract practice)

This is a basic custom token project (not a fully compliant ERC20 token) created using the Hardhat development environment. It demonstrates the basic workflow of writing, testing, and deploying a Solidity smart contract.

## Project Overview

This project contains a Solidity smart contract named `Token` ([`contracts/token.sol`](contracts/token.sol)). The contract implements the following basic functionalities:

*   Defines a token name (`My Hardhat Token`) and symbol (`MHT`).
*   Sets a fixed total supply (1,000,000).
*   Assigns the entire token supply to the contract deployer upon deployment.
*   Allows accounts to transfer tokens to one another.
*   Provides a function to query the token balance of an account.

The project also includes unit tests written using Ethers.js and Waffle ([`test/Token.js`](test/Token.js)), a script for deploying the contract to a network ([`scripts/deploy.js`](scripts/deploy.js)), and a GitHub Actions workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) for continuous integration, ensuring that code changes do not break existing functionality.

## Tech Stack

*   **Solidity:** Language for writing smart contracts ([`^0.8.28`](contracts/token.sol)).
*   **Hardhat:** Ethereum development environment for compiling, deploying, testing, and debugging smart contracts.
*   **Ethers.js:** JavaScript library for interacting with the Ethereum blockchain and its smart contracts.
*   **Waffle:** Framework for writing and running smart contract tests, integrated with Hardhat.
*   **Chai:** BDD / TDD assertion library used for testing.
*   **Mocha:** JavaScript test framework runner.
*   **Node.js:** JavaScript runtime environment.
*   **npm:** Node.js package manager.
*   **dotenv:** Module for managing environment variables.
*   **GitHub Actions:** Platform for automating CI/CD workflows.

## Directory Structure

```
hardhat-token/
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI configuration
├── contracts/
│   └── token.sol          # Smart contract source code
├── scripts/
│   └── deploy.js          # Contract deployment script
├── test/
│   └── Token.js           # Contract test file
├── .env.example           # Environment variable example file
├── .gitignore             # Git ignore configuration
├── hardhat.config.js      # Hardhat configuration file
├── package-lock.json      # npm locked dependency versions
├── package.json           # Project metadata and dependencies
└── README.md              # Project description file (this file)
```

*   **`.github/workflows/`**: Contains GitHub Actions workflow configurations for automation.
*   **`contracts/`**: Holds the Solidity smart contract source files.
*   **`scripts/`**: Contains scripts for interacting with or deploying the contract.
*   **`test/`**: Contains the test files for the contract.
*   **`.env.example`**: Template file for environment variables. You'll need to copy this to `.env` and fill in your details.
*   **`.gitignore`**: Specifies intentionally untracked files that Git should ignore (e.g., `node_modules`, `.env`).
*   **`hardhat.config.js`**: Configuration file for Hardhat, including Solidity version, network settings, etc.
*   **`package.json`**: Defines project dependencies, scripts, and metadata.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd hardhat-token
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    Or, to ensure exact versions from `package-lock.json` are installed:
    ```bash
    npm ci
    ```

3.  **Set up environment variables:**
    *   Copy the `.env.example` file to a new file named `.env`.
        ```bash
        # In Windows CMD
        copy .env.example .env
        # In Windows PowerShell or Linux/macOS
        cp .env.example .env
        ```
    *   Edit the `.env` file and add your Alchemy API key and the private key of the wallet you want to use for deployment.
        ```
        # .env
        ALCHEMY_API_KEY=YourAlchemyApiKey
        PRIVATE_KEY=YourWalletPrivateKey
        ```
        **Important:** Never commit your `.env` file containing private keys to version control. The `.gitignore` file is already configured to ignore it.

## Usage

### Compile Contracts

Compile the smart contracts located in the `contracts/` directory:

```bash
npx hardhat compile
```

Compiled artifacts (ABI and bytecode) will be saved in the `artifacts/` directory.

### Run Tests

Execute the test suite located in the `test/` directory:

```bash
npx hardhat test
```

### Deploy Contract

Deploy the contract to a specified network (e.g., Sepolia testnet) using the `scripts/deploy.js` script:

```bash
# Replace 'sepolia' with your desired network name configured in hardhat.config.js
npx hardhat run scripts/deploy.js --network sepolia
```

Ensure you have configured the `sepolia` (or your chosen network) in your `hardhat.config.js` file and provided a valid Alchemy API key and corresponding private key in your `.env` file. Upon successful deployment, the script will print the deployed contract address to the console.

## Continuous Integration (CI)

This project uses GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) for continuous integration. The CI workflow automatically runs whenever code is pushed to the `main` branch or a pull request is opened against `main`. It performs the following steps:

1.  Checks out the code.
2.  Sets up the Node.js environment.
3.  Installs dependencies.
4.  Compiles the contracts and runs the tests (`npx hardhat test`).

You can view the status of the CI runs in the "Actions" tab of your GitHub repository.