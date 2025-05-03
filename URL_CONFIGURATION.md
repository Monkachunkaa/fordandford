# URL Configuration for Ford and Ford Properties Website

This document explains how to configure your web server to hide `index.html` in URLs.

## Apache Server Configuration

The `.htaccess` file contains rules for Apache servers to:
- Hide `index.html` from URLs
- Remove trailing slashes
- Set up proper redirects

Make sure mod_rewrite is enabled on your Apache server.

### Testing .htaccess Configuration

1. Upload the `.htaccess` file to your web root directory
2. Try accessing `https://yourdomain.com/index.html`
3. You should be redirected to `https://yourdomain.com/`
4. Try accessing `https://yourdomain.com/properties/index.html`
5. You should be redirected to `https://yourdomain.com/properties/`

## IIS Server Configuration (Windows Hosting)

The `web.config` file contains rules for IIS servers to:
- Hide `index.html` from URLs
- Remove trailing slashes
- Set up proper redirects

### Testing web.config Configuration

1. Upload the `web.config` file to your web root directory
2. Try accessing `https://yourdomain.com/index.html`
3. You should be redirected to `https://yourdomain.com/`
4. Try accessing `https://yourdomain.com/properties/index.html`
5. You should be redirected to `https://yourdomain.com/properties/`

## Nginx Server Configuration

If you're using Nginx, add the following to your server block configuration:

```nginx
server {
    # Other server configurations...
    
    # Set index file
    index index.html;
    
    # Redirect /index.html to /
    if ($request_uri ~* "^(.*/)index\.html$") {
        return 301 $1;
    }
    
    # Remove trailing slash
    rewrite ^/(.*)/$ /$1 permanent;
    
    # Handle 404 errors
    error_page 404 /index.html;
}
```

## Updating Internal Links (Optional)

For even cleaner URLs, you can update internal links in your HTML to remove `index.html`:

Example:
- Change `<a href="properties/index.html">` to `<a href="properties/">`
- Change `<a href="contact/index.html#contactform">` to `<a href="contact/#contactform">`

This step is optional since the server redirects will handle the URLs either way. 