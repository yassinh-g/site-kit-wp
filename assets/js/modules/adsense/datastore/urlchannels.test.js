/**
 * modules/adsense data store: URL channels tests.
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

/**
 * Internal dependencies
 */
import API from 'googlesitekit-api';
import { STORE_NAME } from './constants';
import {
	createTestRegistry,
	muteConsole,
	unsubscribeFromAll,
	untilResolved,
} from 'tests/js/utils';
import * as fixtures from './__fixtures__';

describe( 'modules/adsense URL channels', () => {
	let registry;

	beforeAll( () => {
		API.setUsingCache( false );
	} );

	beforeEach( () => {
		registry = createTestRegistry();
	} );

	afterAll( () => {
		API.setUsingCache( true );
	} );

	afterEach( () => {
		unsubscribeFromAll( registry );
	} );

	describe( 'actions', () => {

	} );

	describe( 'selectors', () => {
		describe( 'getURLChannels', () => {
			it( 'uses a resolver to make a network request', async () => {
				fetchMock.getOnce(
					/^\/google-site-kit\/v1\/modules\/adsense\/data\/urlchannels/,
					{ body: fixtures.urlchannels, status: 200 }
				);

				const accountID = 'pub-12345';
				const clientID = fixtures.clients[ 0 ].id;

				const initialURLChannels = registry.select( STORE_NAME ).getURLChannels( accountID, clientID );

				expect( initialURLChannels ).toEqual( undefined );
				await untilResolved( registry, STORE_NAME ).getURLChannels( accountID, clientID );

				const urlchannels = registry.select( STORE_NAME ).getURLChannels( accountID, clientID );

				expect( fetchMock ).toHaveFetchedTimes( 1 );
				expect( urlchannels ).toEqual( fixtures.urlchannels );
			} );

			it( 'does not make a network request if urlchannels for this account + client are already present', async () => {
				const accountID = 'pub-12345';
				const clientID = fixtures.clients[ 0 ].id;

				// Load data into this store so there are matches for the data we're about to select,
				// even though the selector hasn't fulfilled yet.
				registry.dispatch( STORE_NAME ).receiveGetURLChannels( fixtures.urlchannels, { accountID, clientID } );

				const urlchannels = registry.select( STORE_NAME ).getURLChannels( accountID, clientID );

				await untilResolved( registry, STORE_NAME ).getURLChannels( accountID, clientID );

				expect( fetchMock ).not.toHaveFetched();
				expect( urlchannels ).toEqual( fixtures.urlchannels );
			} );

			it( 'dispatches an error if the request fails', async () => {
				const response = {
					code: 'internal_server_error',
					message: 'Internal server error',
					data: { status: 500 },
				};
				fetchMock.getOnce(
					/^\/google-site-kit\/v1\/modules\/adsense\/data\/urlchannels/,
					{ body: response, status: 500 }
				);

				const fakeAccountID = 'pub-777888999';
				const fakeClientID = 'ca-pub-777888999';

				muteConsole( 'error' );
				registry.select( STORE_NAME ).getURLChannels( fakeAccountID, fakeClientID );
				await untilResolved( registry, STORE_NAME ).getURLChannels( fakeAccountID, fakeClientID );

				expect( fetchMock ).toHaveFetchedTimes( 1 );

				const urlchannels = registry.select( STORE_NAME ).getURLChannels( fakeAccountID, fakeClientID );
				expect( urlchannels ).toEqual( undefined );
			} );
		} );
	} );
} );
