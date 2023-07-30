(function () {
    var noop = function noop() {};
    if ("performance" in window === false) {
      window.performance = {};
    }
    window.performance.mark = performance.mark || noop;
    window.performance.measure = performance.measure || noop;
    if ("now" in window.performance === false) {
      var nowOffset = Date.now();
      if (performance.timing && performance.timing.navigationStart) {
        nowOffset = performance.timing.navigationStart;
      }
      window.performance.now = function now() {
        return Date.now() - nowOffset;
      };
    }
  })();

  (function () {
    var now = Date.now()
    window.initialTimestamps = {
      initialTimestamp: now,
      initialRequestTimestamp: Math.round(performance.timeOrigin ? performance.timeOrigin : now - performance.now())
    }

    window.thunderboltTag = "libs-releases-GA-local"
    window.thunderboltVersion = "1.12612.0"
  })();

  if (
    typeof Promise === 'undefined' ||
    typeof Set === 'undefined' ||
    typeof Object.assign === 'undefined' ||
    typeof Array.from === 'undefined' ||
    typeof Symbol === 'undefined'
  ) {
    // send bi in order to detect the browsers in which polyfills are not working
    window.fedops.phaseStarted('missing_polyfills')
  }

  window.fetchDynamicModel = () => (window.viewerModel.siteFeaturesConfigs.sessionManager.isRunningInDifferentSiteContext ?  Promise.resolve({}) : fetch(window.viewerModel.dynamicModelUrl, { credentials: 'same-origin' }).then(function(r){if(!r.ok)throw new Error(`[${r.status}]${r.statusText}`);return r.json()}))
    window.dynamicModelPromise = window.fetchDynamicModel()
    window.commonConfig = viewerModel.commonConfig

    window.resolveExternalsRegistryPromise = null
    const externalRegistryPromise = new Promise((r) => window.resolveExternalsRegistryPromise = r)
    window.resolveExternalsRegistryModule = (name) => externalRegistryPromise.then(() => window.externalsRegistry[name].onload())

    window.firstPageId = 'c678w'

    if (window.requestCloseWelcomeScreen) {
        window.requestCloseWelcomeScreen()
    }
	if (!window.__browser_deprecation__) {
		window.fedops.phaseStarted('partially_visible', {paramsOverrides: { pageId: firstPageId }})
	}