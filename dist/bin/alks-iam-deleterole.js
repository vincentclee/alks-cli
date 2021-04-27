#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
process.title = 'ALKS';
var commander_1 = tslib_1.__importDefault(require("commander"));
var cli_color_1 = tslib_1.__importDefault(require("cli-color"));
var underscore_1 = tslib_1.__importDefault(require("underscore"));
var Alks = tslib_1.__importStar(require("../lib/alks"));
var package_json_1 = tslib_1.__importDefault(require("../package.json"));
var Developer = tslib_1.__importStar(require("../lib/developer"));
var utils = tslib_1.__importStar(require("../lib/utils"));
var checkForUpdate_1 = require("../lib/checkForUpdate");
var logger = 'iam-delete';
commander_1.default
    .version(package_json_1.default.version)
    .description('remove an IAM role')
    .option('-n, --rolename [rolename]', 'the name of the role to delete')
    .option('-a, --account [alksAccount]', 'alks account to use')
    .option('-r, --role [alksRole]', 'alks role to use')
    .option('-F, --favorites', 'filters favorite accounts')
    .option('-v, --verbose', 'be verbose')
    .parse(process.argv);
var roleName = commander_1.default.rolename;
var alksAccount = commander_1.default.account;
var alksRole = commander_1.default.role;
var filterFavorites = commander_1.default.favorites || false;
utils.log(commander_1.default, logger, 'validating role name: ' + roleName);
if (underscore_1.default.isEmpty(roleName)) {
    utils.errorAndExit('The role name must be provided.');
}
if (!underscore_1.default.isUndefined(alksAccount) && underscore_1.default.isUndefined(alksRole)) {
    utils.log(commander_1.default, logger, 'trying to extract role from account');
    alksRole = utils.tryToExtractRole(alksAccount);
}
(function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var developer, auth, alks, err_1;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(underscore_1.default.isEmpty(alksAccount) || underscore_1.default.isEmpty(alksRole))) return [3 /*break*/, 2];
                    utils.log(commander_1.default, logger, 'getting accounts');
                    return [4 /*yield*/, Developer.getAlksAccount(commander_1.default, {
                            iamOnly: true,
                            filterFavorites: filterFavorites,
                        })];
                case 1:
                    (_a = _b.sent(), alksAccount = _a.alksAccount, alksRole = _a.alksRole);
                    return [3 /*break*/, 3];
                case 2:
                    utils.log(commander_1.default, logger, 'using provided account/role');
                    _b.label = 3;
                case 3: return [4 /*yield*/, Developer.getDeveloper()];
                case 4:
                    developer = _b.sent();
                    return [4 /*yield*/, Developer.getAuth(commander_1.default)];
                case 5:
                    auth = _b.sent();
                    utils.log(commander_1.default, logger, 'calling api to delete role: ' + roleName);
                    return [4 /*yield*/, Alks.getAlks(tslib_1.__assign({ baseUrl: developer.server }, auth))];
                case 6:
                    alks = _b.sent();
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, alks.deleteRole({
                            account: alksAccount,
                            role: alksRole,
                            roleName: roleName,
                        })];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    return [2 /*return*/, utils.errorAndExit(err_1)];
                case 10:
                    console.log(cli_color_1.default.white(['The role ', roleName, ' was deleted'].join('')));
                    utils.log(commander_1.default, logger, 'checking for updates');
                    return [4 /*yield*/, checkForUpdate_1.checkForUpdate()];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, Developer.trackActivity(logger)];
                case 12:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
})().catch(function (err) { return utils.errorAndExit(err.message, err); });
//# sourceMappingURL=alks-iam-deleterole.js.map