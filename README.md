# VCommerce
<p align="center">
    <img alt="Static Badge" src="https://img.shields.io/badge/node-light">
    <img alt="Static Badge" src="https://img.shields.io/badge/express-yellow">
    <img alt="Static Badge" src="https://img.shields.io/badge/mongod-darkgreen">
    <img alt="Static Badge" src="https://img.shields.io/badge/mysql-orange">
    <img alt="Static Badge" src="https://img.shields.io/badge/react-blue">
    <img alt="Static Badge" src="https://img.shields.io/badge/contributions-welcome-light">
    <img alt="Static Badge" src="https://img.shields.io/badge/license-GPLv3-blue">
</p>

<p align="center">
    <img alt="Banner" src="./frontend/src/assets/VcommerceLogo.png" width="300"/>
</p>

Welcome to VCommerce, the ultimate platform for VIT University students to buy and sell their second-hand products. This project aims to create a connection ground between senior students looking to sell their items and juniors seeking cost-effective solutions for their needs, whether it's textbooks, bicycles, electronics, or electrical devices.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)


## Features

- **User Profiles**: Users can create personalized profiles, making it easy to track their activities and interact with others.

- **Product Listings**: Post detailed product listings with images, descriptions, and prices.

- **Marking Favourites**: Mark products as favourites to review them later.

## Getting Started

These instructions will help you set up a local development or production environment of VCommerce.

### Prerequisites

To run the project, you will need:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js installation)
- [MongoDB](https://www.mongodb.com/) (either installed locally or use a cloud-based solution)
- [MySQL](https://www.mysql.com/) (either installed locally or use a cloud-based solution)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Tech-Taxi/vcommerce.git
   ```
2. Navigate to the project directory:
   ```bash
   cd vcommerce
   ```
3. Install the required dependencies:
   ```bash
   cd backend && npm i
   cd ..
   cd fronend && npm i
   ```
4. Create a config.env file in the backend directory and set the necessary environment variables mentioned in backend/config.env.example
5. Start the backend and frontend server
   ```bash
    cd backend && npm run dev
    cd ..
    cd frontend && npm run dev
   ```
6. Access the application in your browser at http://localhost:5173.

## Usage

1. **User Registration and Login**: Users can register and log in to their accounts.

2. **User Profile Management**: Users can manage their profiles and update their information on the application.

3. **Product Listing**: Post products you want to sell with detailed descriptions and images.

4. **Product Management**: Update product information that have been listed by you, and delete them once sold.

5. **Enjoy Buying and Selling!**: VCommerce is your platform for all your buying and selling needs within the VIT University community.

## Work in Progress
1. [Frontend Issues](./frontend/README.md)
2. [Backend Issues](./backend/README.md)

Feel free to contribute to the project
