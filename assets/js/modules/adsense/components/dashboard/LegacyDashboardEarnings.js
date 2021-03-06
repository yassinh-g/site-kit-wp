/**
 * LegacyDashboardEarnings component.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
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
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DashboardModuleHeader from '../../../../components/dashboard/DashboardModuleHeader';
import LegacyDashboardAdSenseTopEarningPagesSmall from './LegacyDashboardAdSenseTopEarningPagesSmall';
import LegacyAdSenseDashboardMainSummary from './LegacyAdSenseDashboardMainSummary';
import ModuleSettingsWarning from '../../../../components/legacy-notifications/module-settings-warning';

class LegacyDashboardEarnings extends Component {
	render() {
		return (
			<Fragment>
				<div className="
					mdc-layout-grid__cell
					mdc-layout-grid__cell--span-12
				">
					<DashboardModuleHeader
						title={ __( 'Earnings', 'google-site-kit' ) }
						description={ __( 'How much you’re earning from your content through AdSense.', 'google-site-kit' ) }
					/>
					<ModuleSettingsWarning slug="adsense" />
				</div>
				<LegacyAdSenseDashboardMainSummary />
				<LegacyDashboardAdSenseTopEarningPagesSmall />
			</Fragment>
		);
	}
}

export default LegacyDashboardEarnings;
