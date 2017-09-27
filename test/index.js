// import * as m from "ajax-worker";
SystemJS.import('../dist/ajax-worker.js');


SystemJS.import('../dist/ajax-worker.js').then(function (m) {
	console.log(m);
});

ajaxWorker.fetch("/teste1.json", () =>
{
	console.log("callback1");
},
{
	cache: "no-cache"
});
