
// When the user submit the form, we won't want the window to scroll to the last clicked
// anchor link (ID) again! Remove that part before document loads.

const lastidx = window.location.href.lastIndexOf('#');
if (lastidx !== -1) {
	const newURL = window.location.href.slice(0, lastidx);
	window.location.assign(newURL); 
}