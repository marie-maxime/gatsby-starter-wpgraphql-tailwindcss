
# A starter Gatsby template for a Wordpress blog with graphql and tailwincss

Still WIP. Inspired by various gatsby starter theme for Wordpress.

## Using the environment variables

- GATSBY_GITHUB_USER (Mandatory)
This is the username of your Github account

- GATSBY_GITHUB_REPO (Mandatory)
This is the Github repository URL

- GATSBY_SITE_NAME (Mandatory)
This is the title of the generated Gatsby site

- GATSBY_SITE_DESCRIPTION (Mandatory)
This is the description of the generated Gatsby site

- GATSBY_SITE_URL_PATH (Mandatory)
This is the URL where you will be deploying the generated Gatsby site, but without the http protocol
For example `mywebsite.com` or `localhost:8000`

- GATSBY_SITE_URL_PROTOCOL (Mandatory)
This is the http protocol of the URL where you will be deploying the generated Gatsby site, i.e. `http` or `https`

- GATSBY_WORDPRESS_URL_PATH (Mandatory)
This is the URL of your wordpress site from where you will fetch your posts/pages etc, but without the http protocol
For example `mywebsite-wordpress.com` or `localhost:8001`

- GATSBY_WORDPRESS_URL_PROTOCOL (Mandatory)
This is the http protocol of the URL of your wordpress site from where you will fetch your posts/pages etc, i.e. `http` or `https`

- GATSBY_SITE_AUTHOR
This is the name of the Gatsby site author

- GATSBY_GOOGLE_ANALYTICS (Optional)
This is your Google Analytics tracking id.

Note: Any new environment variables you want to define MUST have the `GATSBY_` prefix. You can access them using `process.env.GATSBY_MY_ENVIRONMENT_VARIABLE`. Also, `process.env` object cannot be de-structured. To access any variable from this object, use the full variable name.

For example, the following code will NOT work.

```javascript
const { GATSBY_MY_ENVIRONMENT_VARIABLE } = process.env;
```

## Using existing Wordpress blog as your source instead of setting up local installation

If you're planning to use an already existing Wordpress blog as your CMS instead of setting everything up on your local machine, then simply ignore the instructions given in the section above. You might still want to consider installing the Wordpress plugins recommended above if you haven't already.


## Git Hooks using Husky

This Gatsby starter template uses [Husky](https://github.com/typicode/husky) to create Git hooks. Husky can prevent bad git commit, git pushes etc. You can use the husky hooks in the `package.json` file to execute custom scripts and tasks before each git commit and git push. For example, this project uses the `pre-commit` hook to run the lint script, and the `pre-push` hook to create gatsby build and verify that everything works before git push happens to the repository. This is optional though, and you can opt out of it by simply commenting out the `husky` object in the `package.json` file.

## PWA

This Gatsby starter template uses `gatsby-plugin-offline` plugin. If you don't want your site to work offline, simply comment this plugin out from the `gatsby-config.js` file.

## SEO

This Gatsby starter template has some basic SEO capabilities out of the box such as robots.txt file, sitemap.xml file, meta tags defined in `react-helmet` etc.

## License

This project is licensed under the [MIT License](https://github.com/marie-maxime/gatsby-starter-wpgraphql-tailwindcss/blob/master/LICENSE) - see the LICENCE.md file for details
