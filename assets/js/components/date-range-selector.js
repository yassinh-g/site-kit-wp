/**
 * External dependencies
 */
import { Select } from 'SiteKitCore/material-components';
import PropTypes from 'prop-types';
import { useContext as useContextReact } from 'react';

/**
 * Internal dependencies
 */
import DateRangeContext from 'SiteKitCore/contexts/DateRangeContext';

const { useContext: useContextWP } = wp.element;
const { _n, sprintf } = wp.i18n;
const { doAction } = wp.hooks;

let useContext = useContextWP;
if ( useContext === undefined ) {
	useContext = useContextReact;
}

export const lastDaysOption = ( value ) => {
	return {
		// eslint-disable-next-line @wordpress/valid-sprintf
		label: sprintf(
			_n( 'Last 24 hours', 'Last %d days', value, 'google-site-kit' ),
			value
		),
		value,
	};
};

const DateRangeSelector = ( props ) => {
	const { dateRange, updateDateRange } = useContext( DateRangeContext );
	const { defaultValue, options } = props;

	const onChange = ( index, item ) => {
		updateDateRange( item.dataset.value );

		// Trigger a data refresh.
		doAction( 'googlesitekit.moduleDataReset' );
		// doAction( 'googlesitekit.moduleLoaded', context );
		doAction( 'googlesitekit.moduleLoaded', 'Dashboard' );
		doAction( 'googlesitekit.moduleLoaded', 'Single' );
		return false;
	};

	return (
		<Select
			enhanced
			className="mdc-select--minimal"
			name="time_period"
			label="Filter by date range"
			onEnhancedChange={ onChange }
			options={ options }
			value={ dateRange || defaultValue }
		/>
	);
};

DateRangeSelector.defaultProps = {
	defaultValue: '28',
	options: [
		lastDaysOption( '7' ),
		lastDaysOption( '14' ),
		lastDaysOption( '28' ),
		lastDaysOption( '90' ),
	],
};

DateRangeSelector.propTypes = {
	onChange: PropTypes.func,
};

export default DateRangeSelector;
