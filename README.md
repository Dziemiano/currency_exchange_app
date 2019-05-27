#Currency exchange app

Done with total front-end aproach, but focused on logic rather than looks.

That's first properly working version but it lacks trend lines and unit tests cause i didn't manage to make it on time, but i'm gonna update app with those.

Other than that, future builds should have some backend to manage API calls and store fetched data to not exceed free API calls limit (or at least some redux store).

Issues i'm aware of :
	- setTimeout() on data fetch: have to test it more to check what time value works best with API calls limit
	- lack of loading indicator: should display loading when data is fetched for proper UX (!important)  
	- xAxis labels and grid lines: managed to format chart input data to show grid lines but gave it up for proper labels, thats 	react-google-charts configuration issue   



