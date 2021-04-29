#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
process.title = 'ALKS';
var commander_1 = tslib_1.__importDefault(require("commander"));
var underscore_1 = tslib_1.__importDefault(require("underscore"));
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
var package_json_1 = tslib_1.__importDefault(require("../package.json"));
var checkForUpdate_1 = require("../lib/checkForUpdate");
var utils_1 = require("../lib/utils");
var alks_1 = require("../lib/alks");
var developer_1 = require("../lib/developer");
commander_1.default
    .version(package_json_1.default.version)
    .description('configure which accounts are favorites')
    .option('-v, --verbose', 'be verbose')
    .parse(process.argv);
var logger = 'dev-favorites';
(function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var developer, auth, alks, alksAccounts, favorites, choices, deferred, faves;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utils_1.log(commander_1.default, logger, 'getting developer');
                    return [4 /*yield*/, developer_1.getDeveloper()];
                case 1:
                    developer = _a.sent();
                    utils_1.log(commander_1.default, logger, 'getting auth');
                    return [4 /*yield*/, developer_1.getAuth(commander_1.default)];
                case 2:
                    auth = _a.sent();
                    return [4 /*yield*/, alks_1.getAlks(tslib_1.__assign({ baseUrl: developer.server }, auth))];
                case 3:
                    alks = _a.sent();
                    utils_1.log(commander_1.default, logger, 'getting alks accounts');
                    return [4 /*yield*/, alks.getAccounts()];
                case 4:
                    alksAccounts = _a.sent();
                    utils_1.log(commander_1.default, logger, 'getting favorite accounts');
                    return [4 /*yield*/, developer_1.getFavorites()];
                case 5:
                    favorites = _a.sent();
                    choices = [];
                    deferred = [];
                    utils_1.log(commander_1.default, logger, 'rendering favorite accounts');
                    choices.push(new inquirer_1.default.Separator(' = Standard = '));
                    alksAccounts.forEach(function (alksAccount) {
                        if (!alksAccount.iamKeyActive) {
                            var name = [alksAccount.account, alksAccount.role].join(developer_1.getAccountDelim());
                            choices.push({
                                name: name,
                                checked: underscore_1.default.contains(favorites, name),
                            });
                        }
                        else {
                            deferred.push(alksAccount);
                        }
                    });
                    choices.push(new inquirer_1.default.Separator(' = IAM = '));
                    deferred.forEach(function (val) {
                        var name = [val.account, val.role].join(developer_1.getAccountDelim());
                        choices.push({
                            name: name,
                            checked: underscore_1.default.contains(favorites, name),
                        });
                    });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'checkbox',
                                message: 'Select favorites',
                                name: 'favorites',
                                choices: choices,
                                pageSize: 25,
                            },
                        ])];
                case 6:
                    faves = _a.sent();
                    return [4 /*yield*/, developer_1.saveFavorites({ accounts: faves })];
                case 7:
                    _a.sent();
                    console.log('Favorites have been saved!');
                    utils_1.log(commander_1.default, logger, 'checking for update');
                    return [4 /*yield*/, checkForUpdate_1.checkForUpdate()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, developer_1.trackActivity(logger)];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})().catch(function (err) { return utils_1.errorAndExit(err.message, err); });
//# sourceMappingURL=alks-developer-favorites.js.map