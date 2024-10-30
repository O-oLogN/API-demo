# API-Demo

A freeCodeCamp Backend & API project which introduces fundamental API calls and how to handle them

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)


## Installation

Follow these steps to install the project:

1. Clone the repository:

       git clone https://github.com/yourusername/API-demo.git

2. Navigate to your project directory:

       cd API-demo

3. Install dependencies:
   
       npm install

5. Create a .env file in the root directory and add your configuration settings, such as:
   
       MONGO_URI='mongodb+srv://<username>:<password>@<clusterAddress>/?retryWrites=true&w=majority&appName=<clusterName>'
      
       PORT=3000

## Usage
To start your server, run:

    npm run

## API Endpoints
<h3>Users</h3>
Get user list:


    curl -X GET http://localhost:3000/api/users
    
Post a new user:

    curl -X POST http://localhost:3000/api/users

<h3>Exercise</h3>
Post a new exercise to with specific user_id:

    curl -X POST http://localhost:3000/api/users/:_id/exercises


