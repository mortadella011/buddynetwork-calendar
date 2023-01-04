# Buddynetwork Calendar

Make the Buddynetwork Google calendar available for everybody.

## Requirements

- docker
- docker compose
- traefik 


## Setup

1) Copy `.env.sample`, rename it to `.env` and set all the attributes.
2) Set the api URL in `environment.ts`.
3) Create a Google service account and generate a key in json format. 
4) In `server/src` copy `google-auth.json.sample`, rename it to `google-auth.json` and copy the content of the downloaded key file into `google-auth.json`.
5) Start services with 
   > docker compose build && docker compose up -d

