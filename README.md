# Book catalog / reading tracker API

Serverless API for cloudflare workers. Serverless was chosen to focus more on app development rather than managing infrastructure. The chosen DB will be SQL which is D1 on cloudflare.

## Getting started

- Initialize a cloudflare worker project with `npm create cloudflare@latest`. Originally, following the [example for building a rest API](https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/) suggested to use `npx wrangler init book-catalog-serverless` but this is deprecated in favour for `npm create cloudflare`
- Whilst the project was initiliazed using cloudflare `3.52.0`, the version on npm is `3.0.0`
- Install Hono, an express style web framework to build the API. I didn't didn't follow their template because this is purely a backend API rather than a web app / site

### Creating a D1 database

- `wrangler create d1 book-catalog-db`
- Add the relevant binding. Note the binding ID is pointing to the remote D1 instance.
- Create a table and seed some data with `wrangler d1 execute <DB_NAME> --file=<SCHEMA_FILE>.sql`. Very basic data validation for now with no relationships or null checks
- By default, `wrangler dev` users local dev. From the previous step, In order to access the D1 database remotely, we need to run our dev server with the remote flag `wrangler dev --remote`. Cloudflare recommends to create a separate instance and configure a `previous_database_id` in the wrangler.toml

## Notes

- Cloudflare workers come with basic logging
- Cloudflare hono does automatic error handling for internal server errors
- Cloudflare hono will throw 404 error if the resource is not found

## DB Schema

Data types are based off SQL data types

### Books

Books that a user is interested track reading progress

| field_name       | data_type    | description                                                                   |
| ---------------- | ------------ | ----------------------------------------------------------------------------- |
| title            | varchar()    | book title keyed in by user                                                   |
| isbn             | varchar(13)  | unique identifier for a book                                                  |
| author           | varchar(100) | name of book author keyed in by user                                          |
| genre            | varchar(100) | genre of book keyed in by user                                                |
| number_of_pages  | smallint     | number of pages of the book, also referenced to the pages covered by the user |
| publication_year | smallint     | genre of book keyed in by user                                                |
| user_id          | serial[^1]   | user id that the book belongs to                                              |

[^1]: ["What is the right data type for unique key in postgresql DB?"](https://stackoverflow.com/questions/11778102/what-is-the-right-data-type-for-unique-key-in-postgresql-db)
