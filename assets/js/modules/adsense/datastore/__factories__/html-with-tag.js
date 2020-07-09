/**
 * Adsense datastore test factory: html-with-tag.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function tagBodyHTML( adsenseID ) {
	return `<script data-ad-client="${ adsenseID }" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`;
}

/**
 * Generates valid HTML with an Adsense tag.
 *
 * @since n.e.x.t
 *
 * @param {string} adsenseID Adsense Client ID to generate tag with.
 * @return {string} HTML.
 */
export function generateHTMLWithTag( adsenseID ) {
	return `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Test Title</title>
	</head>
	<body>
	${ adsenseID && tagBodyHTML( adsenseID ) }
	<h1>Test Title</h1>
	</body>
	</html>
	`;
}

