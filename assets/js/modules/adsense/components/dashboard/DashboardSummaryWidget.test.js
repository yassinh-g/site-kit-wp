/**
 * AdSense Dashboard Summary Widget component tests.
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
import DashboardSummaryWidget from './DashboardSummaryWidget';
import { render } from '../../../../../../tests/js/test-utils';
import { STORE_NAME } from '../../datastore/constants';
import { STORE_NAME as CORE_USER } from '../../../../googlesitekit/datastore/user/constants';
// import { STORE_NAME as CORE_MODULES } from '../../../../googlesitekit/modules/datastore/constants';
import { createTestRegistry, provideModules } from '../../../../../../tests/js/utils';
import { dashboardSummaryWidgetData } from '../../datastore/__fixtures__';
import fetchMock from 'fetch-mock';

fetchMock.catch();

describe( 'DashboardSummaryWidget', () => {
	let registry;

	beforeEach( () => {
		const referenceDate = '2020-09-12';
		const options = [
			{
			// Custom start and end date for this widget to match data range: 'today',
				startDate: '2020-09-12',
				endDate: '2020-09-12',
				metrics: [
					'EARNINGS',
					'PAGE_VIEWS_RPM',
					'IMPRESSIONS',
				],
			},
			{
			// getDateRangeDates( { offsetDays: 1 }) for 'last-28-days' and '2020-09-12'.
				startDate: '2020-08-15',
				endDate: '2020-09-11',
				metrics: [
					'EARNINGS',
					'PAGE_VIEWS_RPM',
					'IMPRESSIONS',
				],
			},
			{
			// Custom start and end date for this widget to match data range: 'this-month',
				startDate: '2020-09-01',
				endDate: '2020-09-12',
				metrics: [
					'EARNINGS',
					'PAGE_VIEWS_RPM',
					'IMPRESSIONS',
				],
				dimensions: [
					'DATE',
				],
			},
		];

		registry = createTestRegistry();
		// registry.dispatch( CORE_MODULES ).activateModule( 'adsense' );
		registry.dispatch( CORE_USER ).setReferenceDate( referenceDate );
		registry.dispatch( STORE_NAME ).receiveGetReport( dashboardSummaryWidgetData[ 0 ], { options: options[ 0 ] } );
		registry.dispatch( STORE_NAME ).receiveGetReport( dashboardSummaryWidgetData[ 1 ], { options: options[ 1 ] } );
		registry.dispatch( STORE_NAME ).receiveGetReport( dashboardSummaryWidgetData[ 2 ], { options: options[ 2 ] } );
		provideModules( registry );

		// const adsenseModule = registry.select( STORE_NAME ).getModule( 'adsense' );
		// console.log( 'adsenseModule', adsenseModule );
	} );

	it( 'should render with a valid data and reference date passed', () => {
		// console.debug( render( <DashboardSummaryWidget />, { registry } ) );
		const { debug, getByLabelText } = render( <DashboardSummaryWidget />, { registry } );
		debug();

		// console.debug( "getByLabelText('RPM')", getByLabelText( 'RPM' ) );
		// expect
		expect( getByLabelText( 'RPM' ) ).toBeInTheDocument();
		// expect( container.querySelector( '.googlesitekit-data-block' ) ).toBeInTheDocument();
		// expect( container.querySelector( '.mdc-text-field' ) ).not.toHaveClass( 'mdc-text-field--error' );
	} );

	// it( 'should display an error message with an invalid data passed', () => {
	// 	const { container } = render( <DashboardSummaryWidget />, { registry } );
	// } );

	// it( 'should not display an error message with no data passed', () => {
	// 	const { container } = render( <DashboardSummaryWidget />, { registry } );
	// } );
} );
