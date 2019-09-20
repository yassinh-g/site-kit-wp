const DateRangeContext = React.createContext( {
	dateRange: undefined,
	updateDateRange: () => {
		console.warn( 'updateDateRange() NO-OP' );
	},
} );

export default DateRangeContext;
