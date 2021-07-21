"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUpdate = void 0;
var tslib_1 = require("tslib");
var cli_color_1 = require("cli-color");
var npm_registry_client_1 = tslib_1.__importDefault(require("npm-registry-client"));
var semver_1 = require("semver");
var package_json_1 = require("../../package.json");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var log_1 = require("./log");
var showBorderedMessage_1 = require("./showBorderedMessage");
var lastVersion_1 = require("./state/lastVersion");
function noop() { }
function getChangeLog() {
    var file = path_1.default.join(__dirname, '../../', 'changelog.txt');
    return fs_1.default.readFileSync(file, 'utf8');
}
function checkForUpdate() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var currentVersion, app, client, data, latestVersion, needsUpdate, msg, lastVersion;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                default: return [2 /*return*/];
            }
        });
    });
}
exports.checkForUpdate = checkForUpdate;
//# sourceMappingURL=checkForUpdate.js.map
