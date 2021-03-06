/**
 * DashboardDetailsEntityView component.
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
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { decodeHTMLEntity } from '../../util';
import Link from '../Link';
import WidgetContextRenderer from '../../googlesitekit/widgets/components/WidgetContextRenderer';
import DashboardDetailsModules from './DashboardDetailsModules';
import DashboardDetailsEntityHeaderContainer from './DashboardDetailsEntityHeaderContainer';
import { CORE_SITE } from '../../googlesitekit/datastore/site/constants';
import { useFeature } from '../../hooks/useFeature';
const { useSelect } = Data;

export default function DashboardDetailsEntityView() {
	const pageDashboardWidgetsEnabled = useFeature( 'widgets.pageDashboard' );
	const currentEntityURL = useSelect( ( select ) => select( CORE_SITE ).getCurrentEntityURL() );
	const currentEntityTitle = useSelect( ( select ) => select( CORE_SITE ).getCurrentEntityTitle() );

	return (
		<Fragment>
			<DashboardDetailsEntityHeaderContainer>
				<h3 className="
					googlesitekit-heading-3
					googlesitekit-dashboard-single-url__title
				">
					{ decodeHTMLEntity( currentEntityTitle ) }
				</h3>
				<Link href={ currentEntityURL } inherit external>
					{ currentEntityURL }
				</Link>
			</DashboardDetailsEntityHeaderContainer>

			{ pageDashboardWidgetsEnabled && (
				<div className="
					mdc-layout-grid__cell
					mdc-layout-grid__cell--span-12
				">
					<WidgetContextRenderer slug="pageDashboard" />
				</div>
			) }

			{ ! pageDashboardWidgetsEnabled && (
				<DashboardDetailsModules />
			) }
		</Fragment>
	);
}
