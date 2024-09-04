# Data Collection System

![Static Badge](https://img.shields.io/badge/ErikBjornson-DataCollectionSystem-DataCollectionSystem)
![GitHub top language](https://img.shields.io/github/languages/top/ErikBjornson/DataCollectionSystem)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ErikBjornson/DataCollectionSystem)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/ErikBjornson/DataCollectionSystem)

This repository contains a web application developed for collecting specific data.

## Project Overview

The structure of the data to be collected is defined by a JSON file, such as the example below:

```JSON
{
	"name" : "Meter Readings",
	"apartment" : "string",
	"resources" : [
        {
            "name" : "Water",
            "meter reading" : "number"
        },
        {
            "name" : "Electricity",
            "Day Rate" : "number",
            "Night Rate" : "number",
        },
        {
            "name" : "Gas",
            "meter reading" : "number"
        }
	]
}
```

In this JSON file, the "name" property is used to specify the label for each data block that the user will input. The provided example is just a sample, and the system should be able to handle any file of this type.

This file is also contained in the project (`/jsons/example.json`) as an example and can be used for informational purposes to check the health of the system.

The JSON file is read either from a database or from a specific directory on the server. The data entered by the user is saved in the database. The user has the ability to view all previously entered data (the system should provide a list of previously entered data), but cannot modify it.

## Getting started

### Prerequisites

- Node.js
- npm
- PostgreSQL (I used this one with pgAdmin4)

### Installing

1. Clone the repository:

```
git clone https://github.com/ErikBjornson/DataCollectionSystem.git
```

2. Navigate into the project directory:

```
cd DataCollectionSystem
```

3. Install the dependencies:

```
npm install
```

4. Set up your environment variables. You can do this by creating a `.env` file in the root directory of the project and adding your variables there. Also don't forget to add the database settings into the `/src/databasefile.js` file.

5. Start the server:

```
npm start
```

Now you can open your browser and navigate to `http://localhost:3000` to see the application in action.

## Built With

- Node.js - the JavaScript runtime used
- Express - the web framework used
- PostgreSQL - the database used
