# bootstrap-session-timeout
Inspired by [jquery-sessionTimeout-bootstrap by maxfierke](https://github.com/maxfierke/jquery-sessionTimeout-bootstrap)

You can easily upgrade from jquery-sessionTimeout-bootstrap to bootstrap-session-timeout. There have been a number of major upgrades. For example, as long as the user is doing something on the page, he will never get a timeout. The original plugin launched a timeout warning dialog in a fixed amount of time regardless of user activity. See description and documentation for more information.

## Description
After a set amount of idle time, a Bootstrap warning dialog is shown to the user with the option to either log out, or stay connected. If "Logout" button is selected, the page is redirected to a logout URL. If "Stay Connected" is selected, a keep-alive URL is requested through AJAX (optional) to keep the session alive. If no option is selected after another set amount of idle time, the page is automatically redirected to a timeout URL.

Idle time is defined as no mouse, keyboard or touch event activity registered by the browser. As long as the user is active, the keep-alive URL also keeps getting pinged and the session stays alive. Optionally, you can also use this plugin as a simple lock mechanism on its own, if you have no need to keep the server-side session alive.


## Getting Started

1. Include `jQuery`
2. Include `bootstrap.js` and `bootstrap.css`<br>(to support the modal dialog, unless you plan on using your own callback)
3. Include `bootstrap-session-timeout.js` or `bootstrap-session-timeout.min.js`<br>(from the /dist folder)
4. Call `$.sessionTimeout();` after document ready



## Documentation
### Options
**message**<br>

Type: `String`

Default: `'Your session is about to expire.'`

Text shown to user in dialog after warning period.

**keepAliveUrl**

Type: `String`

Default: `'/keep-alive'`

URL to ping via AJAX POST to keep the session alive. This resource should do something innocuous that would keep the session alive, which will depend on your server-side platform.

**keepAlive**

Type: `Boolean`

Default: `true`

If `true`, pings the **keepAliveUrl** if the user clicks "Stay Connected" on the Bootstrap warning dialog. If you have no server-side session timeout to worry about, feel free to set this one to `false` to prevent unnecessary network activity.

**keepAliveInterval**

Type: `Integer`

Default: `5000` (5 seconds)

Minimum time in milliseconds between two keep-alive pings.

**redirUrl**

Type: `String`

Default: `'/timed-out'`

URL to take browser to if no action is take after warning period.

**logoutUrl**

Type: `String`

Default: `'/log-out'`

URL to take browser to if user clicks "Logout" on the Bootstrap warning dialog.

**warnAfter**

Type: `Integer`

Default: `900000` (15 minutes)

Time in milliseconds after page is opened until warning dialog is opened.

**redirAfter**

Type: `Integer`

Default: `1200000` (20 minutes)

Time in milliseconds after page is opened until browser is redirected to redirUrl.

**ignoreUserActivity**

Type: `Boolean`

Default: `false`

If `true`, this will launch the Bootstrap warning dialog / redirect (or callback functions) in a set amounts of time regardless of user activity.

**onWarn**

Type: `Function` or `Boolean`

Default: `false`

Custom callback you can use instead of showing the Bootstrap warning dialog. Note that if you need the keepAlive option, you will need to include it yourself in the callback function. See Examples below.

Redirect action will still occur unless you also use add the onRedir callback.

**onRedir**

Type: `Function` or `Boolean`

Default: false

Custom callback you can use instead of redirectiong the user to **redirUrl**.

## Examples

**Basic Usage**

Shows the warning dialog after one minute. The dialog is visible for another minute. If user takes no action, browser is redirected to `redirUrl`.

```js
$.sessionTimeout({
	message: 'Your session will be locked in one minute.',
	keepAliveUrl: 'keep-alive.html',
	logoutUrl: 'login.html',
	redirUrl: 'locked.html',
	warnAfter: 60000,
	redirAfter: 120000
});
```

**With onWorn Callback**

Shows the "Warning!" alert after one minute. If user takes no action, after one more minute the browser is redirected to `redirUrl`.

```js
$.sessionTimeout({
	redirUrl: 'locked.html',
	warnAfter: 60000,
	redirAfter: 120000,
	onWarn: function{
		alert('Warning!');
	}
});
```

**With both onWorn and onRedir Callback**

Console logs the "Your session will soon expire!" text after one minute. If user takes no action, after two more minutes the "Your session has expired!" alert gets shown. No redirection occurs.

```js
$.sessionTimeout({
	warnAfter: 60000,
	redirAfter: 180000,
	onWarn: function{
		console.log('Your session will soon expire!');
	},
	onRedir: function{
		alert('Your session has expired!');
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add comments for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2012-09-10   v1.0.0   Initial release.

## License
Copyright (c) 2014 [Orange Hill](http://www.orangehilldev.com). Licensed under the MIT license.
